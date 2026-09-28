import test from 'node:test';
import assert from 'node:assert/strict';
import { audioTexts, lessons, words } from '../src/content.js';
import {
  completeLesson, completeStep, createInitialState, getDueWords,
  getLearningSummary, getLessonProgress, isAnswerCorrect, recordEncounter,
  REVIEW_INTERVALS,
} from '../src/learning.js';

const now = Date.UTC(2026, 8, 29, 12);

test('reading adds an exposure without inventing a successful recall', () => {
  const initial = createInitialState();
  const next = recordEncounter(initial, ['huis', 'huis'], null, now, 'read:first-page');
  assert.equal(next.words.huis.encounters, 1);
  assert.equal(next.words.huis.correctCount, 0);
  assert.equal(next.words.huis.stage, 0);
  assert.equal(next.words.huis.mastered, false);
  assert.deepEqual(initial.words, {}, 'previous state stays immutable');
  assert.deepEqual(getDueWords(next, words, now).map((word) => word.id), ['huis']);
});

test('stable page events prevent repeat clicks and revisits inflating progress', () => {
  const once = recordEncounter(createInitialState(), ['huis'], true, now, 'passed:first-words-build');
  const revisited = recordEncounter(once, ['huis'], true, now + 60_000, 'passed:first-words-build');
  assert.equal(revisited, once);
  assert.equal(revisited.words.huis.encounters, 1);
  assert.equal(revisited.words.huis.correctCount, 1);
});

test('rapid practice cannot turn a newly encountered word into a mastered word', () => {
  let state = createInitialState();
  for (let i = 0; i < 20; i += 1) {
    state = recordEncounter(state, ['huis'], true, now + i * 1_000, `practice:${i}`);
  }
  assert.equal(state.words.huis.correctCount, 20);
  assert.equal(state.words.huis.stage, 1);
  assert.equal(state.words.huis.mastered, false);
  assert.equal(state.words.huis.dueAt, now + REVIEW_INTERVALS[1]);
});

test('the queue contains due known words in time order, never unseen vocabulary', () => {
  let state = recordEncounter(createInitialState(), ['huis'], true, now);
  state = recordEncounter(state, ['boom'], null, now + 1_000);
  assert.deepEqual(getDueWords(state, words, now + 2_000).map((word) => word.id), ['boom']);
  assert.deepEqual(getDueWords(state, words, now + REVIEW_INTERVALS[1]).map((word) => word.id), ['boom', 'huis']);
  assert.equal(getDueWords(state, words, now + REVIEW_INTERVALS[1])[1], words.find((word) => word.id === 'huis'));
});

test('successful spaced recalls advance stages and mastery requires enough evidence', () => {
  let state = recordEncounter(createInitialState(), ['huis'], true, now);
  state = recordEncounter(state, ['huis'], true, now + 1_000);
  state = recordEncounter(state, ['huis'], true, now + 2_000);
  state = recordEncounter(state, ['huis'], true, state.words.huis.dueAt);
  assert.equal(state.words.huis.stage, 2);
  assert.equal(state.words.huis.mastered, false);
  state = recordEncounter(state, ['huis'], true, state.words.huis.dueAt);
  assert.equal(state.words.huis.correctCount, 5);
  assert.equal(state.words.huis.stage, 3);
  assert.equal(state.words.huis.mastered, true);
  assert.equal(getLearningSummary(state, words, state.words.huis.lastSeenAt).mastered, 1);
});

test('a wrong recall removes mastery and returns the word to immediate practice', () => {
  let state = createInitialState();
  for (let i = 0; i < 5; i += 1) {
    state = recordEncounter(state, ['bank'], true, state.words.bank?.dueAt ?? now);
  }
  assert.equal(state.words.bank.mastered, true);
  const wrongAt = state.words.bank.lastSeenAt + 1_000;
  const next = recordEncounter(state, ['bank'], false, wrongAt);
  assert.equal(next.words.bank.mastered, false);
  assert.equal(next.words.bank.streak, 0);
  assert.equal(next.words.bank.stage, 4);
  assert.equal(next.words.bank.incorrectCount, 1);
  assert.equal(next.words.bank.dueAt, wrongAt);
  assert.deepEqual(getDueWords(next, words, wrongAt).map((word) => word.id), ['bank']);
});

test('reading a word again never pushes a scheduled review into the future', () => {
  const state = recordEncounter(createInitialState(), ['boom'], true, now);
  const next = recordEncounter(state, ['boom'], null, now + 100);
  assert.equal(next.words.boom.dueAt, state.words.boom.dueAt);
  assert.equal(next.words.boom.correctCount, 1);
});

test('lesson and page completion are idempotent and use globally unique page IDs', () => {
  const lesson = lessons[0];
  let state = createInitialState();
  state = completeStep(state, lesson.steps[0].id);
  assert.equal(completeStep(state, lesson.steps[0].id), state);
  assert.equal(getLessonProgress(state, lesson).completed, 1);
  assert.equal(getLessonProgress(state, lessons[1]).completed, 0);
  for (const step of lesson.steps) state = completeStep(state, step.id);
  assert.equal(getLessonProgress(state, lesson).percent, 100);
  state = completeLesson(state, lesson.id);
  assert.equal(completeLesson(state, lesson.id), state);
  assert.equal(getLessonProgress(state, lesson).isComplete, true);
});

test('dictation accepts punctuation and spacing variations while preserving word order', () => {
  assert.equal(isAnswerCorrect('  dit   is een huis! ', 'Dit is een huis.'), true);
  assert.equal(isAnswerCorrect('de MAN loopt', 'De man loopt.'), true);
  assert.equal(isAnswerCorrect('Dit een is huis.', 'Dit is een huis.'), false);
  assert.equal(isAnswerCorrect('De man loop.', 'De man loopt.'), false);
  assert.equal(isAnswerCorrect('', 'Dit is een huis.'), false);
});

test('each chapter adds only its planned words and every Dutch exercise stays in that vocabulary', () => {
  assert.deepEqual(lessons.map((lesson) => lesson.newWordIds), [
    ['dit', 'is', 'een', 'huis', 'boom', 'bank'], ['de', 'man', 'vrouw'], ['loopt', 'zit'],
  ]);
  const known = new Set();
  const stepIds = new Set();
  const vocabularyIds = new Set(words.map((word) => word.id));

  for (const lesson of lessons) {
    for (const id of lesson.newWordIds) known.add(id);
    assert.equal(lesson.steps.length, 8);
    for (const step of lesson.steps) {
      assert.equal(stepIds.has(step.id), false, `${step.id} must be globally unique`);
      stepIds.add(step.id);
      for (const id of step.wordIds) assert.ok(known.has(id), `${step.id}: unintroduced tracking word ${id}`);

      const texts = [
        step.sentence, step.fullSentence, ...(step.tokens || []),
        ...(step.cards || []).map((card) => card.sentence),
        ...(step.lines || []).map((line) => line.sentence),
        ...(step.choices || []).map((choice) => choice.label),
        ...(['arrange', 'dictation'].includes(step.type) ? [step.answer] : []),
      ].filter(Boolean);
      for (const text of texts) {
        const tokens = text.toLowerCase().match(/[\p{L}]+/gu) || [];
        for (const token of tokens) assert.ok(known.has(token), `${step.id}: unintroduced Dutch word ${token}`);
      }
      if (step.choices) assert.ok(step.choices.some((choice) => choice.id === step.answer));
      if (step.type === 'arrange') {
        const expected = step.answer.toLowerCase().match(/[\p{L}]+/gu).sort();
        assert.deepEqual(step.tokens.map((token) => token.toLowerCase()).sort(), expected);
      }
    }
  }
  assert.deepEqual(known, vocabularyIds);
  assert.equal(words.find((word) => word.id === 'bank').english, 'bench');
  assert.ok(audioTexts.includes('De vrouw zit.'));
  assert.equal(audioTexts.some((text) => text.includes('___')), false);
});
