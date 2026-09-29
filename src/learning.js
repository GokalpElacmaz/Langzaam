/** Pure learner-state helpers. The application decides when and where to save. */
export const REVIEW_INTERVALS = [0, 10 * 60_000, 24 * 60 * 60_000, 3 * 24 * 60 * 60_000, 7 * 24 * 60 * 60_000, 14 * 24 * 60 * 60_000];

export function createInitialState() {
  return {
    version: 2,
    words: {},
    completedSteps: {},
    completedLessons: [],
    processedEvents: {},
  };
}

/**
 * correct: true = recalled, false = needs practice, null = reading/listening only.
 * Give lesson events a stable eventId to prevent revisits inflating progress.
 * Give intentional review attempts unique eventIds so they remain countable.
 * Repetitions before dueAt count as practice but cannot advance a review stage.
 */
export function recordEncounter(state, wordIds, correct = null, now = Date.now(), eventId) {
  if (correct !== null && typeof correct !== 'boolean') {
    throw new TypeError('correct must be true, false, or null');
  }
  if (!Number.isFinite(now)) throw new TypeError('now must be a finite timestamp');
  if (eventId && state.processedEvents?.[eventId]) return state;

  const uniqueWordIds = [...new Set(wordIds)].filter((id) => typeof id === 'string' && id.length > 0);
  if (uniqueWordIds.length === 0) return state;
  const nextWords = { ...state.words };

  for (const id of uniqueWordIds) {
    const previous = state.words[id] ?? {
      encounters: 0, correctCount: 0, incorrectCount: 0, streak: 0,
      stage: 0, dueAt: now, firstSeenAt: now, lastSeenAt: now, mastered: false,
    };
    const next = { ...previous, encounters: previous.encounters + 1, lastSeenAt: now };

    if (correct === true) {
      next.correctCount += 1;
      next.streak += 1;
      if (previous.dueAt <= now) {
        next.stage = Math.min(previous.stage + 1, REVIEW_INTERVALS.length - 1);
        next.dueAt = now + REVIEW_INTERVALS[next.stage];
      }
    } else if (correct === false) {
      next.incorrectCount += 1;
      next.streak = 0;
      next.stage = Math.max(0, previous.stage - 1);
      next.dueAt = now;
    }

    next.mastered = next.stage >= 3 && next.correctCount >= 5 && next.streak >= 3;
    nextWords[id] = next;
  }

  return {
    ...state,
    words: nextWords,
    processedEvents: eventId ? { ...state.processedEvents, [eventId]: true } : state.processedEvents,
  };
}

/** Only encountered words can be due. Unknown words are taught by lessons. */
export function getDueWords(state, vocabulary, now = Date.now()) {
  return vocabulary
    .filter((word) => state.words[word.id] && state.words[word.id].dueAt <= now)
    .sort((a, b) => state.words[a.id].dueAt - state.words[b.id].dueAt || a.id.localeCompare(b.id));
}

/** Completing a page is independent of getting a scored answer right. */
export function completeStep(state, stepId) {
  if (state.completedSteps[stepId]) return state;
  return { ...state, completedSteps: { ...state.completedSteps, [stepId]: true } };
}

/** The caller should invoke this only after the learner reaches the final page. */
export function completeLesson(state, lessonId) {
  if (state.completedLessons.includes(lessonId)) return state;
  return { ...state, completedLessons: [...state.completedLessons, lessonId] };
}

export function getLessonProgress(state, lesson) {
  const completed = lesson.steps.filter((step) => state.completedSteps[step.id]).length;
  return {
    completed,
    total: lesson.steps.length,
    percent: lesson.steps.length ? Math.round((completed / lesson.steps.length) * 100) : 0,
    isComplete: state.completedLessons.includes(lesson.id),
  };
}

export function getLearningSummary(state, vocabulary, now = Date.now()) {
  const records = vocabulary.map((word) => state.words[word.id]).filter(Boolean);
  return {
    encountered: records.length,
    mastered: records.filter((word) => word.mastered).length,
    due: getDueWords(state, vocabulary, now).length,
    encounters: records.reduce((sum, word) => sum + word.encounters, 0),
    lessonsCompleted: state.completedLessons.length,
  };
}

export { normalizeAnswer, isAnswerCorrect } from './curriculum/text.js';
