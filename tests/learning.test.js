import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { allowedForms, audioClips, audioTexts, lessons, words, wordsIn } from '../src/content.js';
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

test('answers ignore capitals and punctuation, accept pronoun pairs, but never word order or spelling', () => {
  assert.equal(isAnswerCorrect('  dit   is een huis! ', 'Dit is een huis.'), true);
  assert.equal(isAnswerCorrect('Dit een is huis.', 'Dit is een huis.'), false);
  assert.equal(isAnswerCorrect('Woont jij hier?', 'Woon jij hier?'), false);
  assert.equal(isAnswerCorrect('woon je hier', 'Woon jij hier?'), true);
  assert.equal(isAnswerCorrect('Ze is moe.', 'Zij is moe.'), true);
  assert.equal(isAnswerCorrect('We wonen in Leuven.', 'Wij wonen in Leuven.'), true);
  assert.equal(isAnswerCorrect('Het is een boom.', 'Dit is een boom.', ['Het is een boom.']), true);
  assert.equal(isAnswerCorrect('', 'Dit is een huis.'), false);
});

test('the whole book passes the curriculum validator', () => {
  const result = spawnSync(process.execPath, ['scripts/validate-content.mjs'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
});

test('ten targets per lesson, derived word tracking, and a clean speech corpus', () => {
  for (const lesson of lessons) assert.equal(lesson.targets.length, 10, lesson.id);
  assert.deepEqual(wordsIn('Hij woont niet in Gent.'), ['hij', 'wonen', 'niet', 'in']);
  assert.deepEqual(wordsIn('Ben jij moe?'), ['zijn', 'jij', 'moe']);
  assert.equal(audioTexts.some((text) => /___|[[\]]/.test(text)), false);
  assert.ok(audioTexts.includes('jij woont'));
  const known = allowedForms(0);
  assert.ok(known.has('is') && !known.has('ben') && !known.has('zijn'));
  assert.ok(allowedForms(1).has('bent') && !allowedForms(2).has('grote') && allowedForms(3).has('grote'));
});

test('every spoken Dutch text has normal and slow recordings, in the voice each line needs', () => {
  const manifest = JSON.parse(readFileSync(new URL('../src/audio-manifest.json', import.meta.url)));
  const missing = audioClips.filter(({ text, voice }) => !manifest[text]?.[voice]?.normal || !manifest[text]?.[voice]?.slow);
  assert.deepEqual(missing.slice(0, 5), [], `${missing.length} clips have no recording; run node scripts/generate-audio.mjs`);
  for (const entry of Object.values(manifest)) {
    assert.ok(entry[entry.default], 'each text has its default voice');
    for (const speeds of Object.values(entry).filter((v) => typeof v === 'object')) for (const path of Object.values(speeds)) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path);
  }
  assert.ok(new Set(audioClips.map((clip) => clip.voice)).size >= 2, 'the course uses more than one voice');
});
