import test from 'node:test';
import assert from 'node:assert/strict';
import { answerFormat, splitDrillPages } from '../src/curriculum/drill-pages.js';
import { lessonById, publishedLessons } from '../src/content.js';
import { createInitialState, lessonPosition, recordEncounter, setLessonPosition, isAnswerCorrect } from '../src/learning.js';
import firstLesson from '../src/curriculum/lessons/01-wat-is-dit.js';

test('every published drill page has one answer format', () => {
  for (const lesson of publishedLessons) for (const step of lesson.steps.filter(s => s.type === 'drill')) {
    assert.equal(new Set(step.items.map(answerFormat)).size, 1, step.id);
  }
});

test('splitting pages preserves every authored answer, page ID and recall event identity', () => {
  const steps = splitDrillPages(firstLesson, 'wat-is-dit');
  firstLesson.forEach((source, sourceIndex) => {
    const id = `wat-is-dit-${String(sourceIndex + 1).padStart(2, '0')}`;
    assert.ok(steps.some(step => step.id === id), id);
    const items = steps.filter(step => step.sourceIndex === sourceIndex).flatMap(step => step.items || []);
    assert.equal(items.length, source.items?.length || 0);
    for (const [i, original] of (source.items || []).entries()) {
      const item = items.find(item => item.progressId === `${id}:${i}`);
      assert.ok(item, `${id}:${i}`);
      for (const [key, value] of Object.entries(original)) assert.deepEqual(item[key], value);
    }
  });
  const moved = steps.find(step => step.id === 'wat-is-dit-35-dictation').items[0];
  const state = recordEncounter(createInitialState(), ['vrouw'], true, 1, `passed:${moved.progressId}`);
  assert.equal(recordEncounter(state, ['vrouw'], true, 2, 'passed:wat-is-dit-35:9'), state);
});

test('legacy bookmarks after a split resolve to the same authored page', () => {
  const lesson = lessonById['ik-lees'];
  const state = { ...createInitialState(), positions: { 'ik-lees': 8 } };
  const index = lessonPosition(state, lesson);
  assert.equal(lesson.steps[index].id, 'ik-lees-09');
  assert.ok(index > 8, 'the preceding drill gained a page');
  const saved = setLessonPosition(state, lesson, index);
  assert.equal(lessonPosition(JSON.parse(JSON.stringify(saved)), lesson), index);
  const before = setLessonPosition(saved, lesson, index - 1);
  assert.equal(lesson.steps[lessonPosition(before, lesson)].id, 'ik-lees-08-gaps');
  assert.equal(lessonPosition(before, { ...lesson, steps: [{ id: 'new-page' }, ...lesson.steps] }), index);
  assert.equal(state.positionStepIds, undefined, 'migration does not mutate old state');
});

test('a child can be referred to with a personal pronoun as well as generic het', () => {
  const items = lessonById['ik-ben'].steps.flatMap(step => step.items || []);
  for (const prompt of ['Het kind is ziek. ___ is moe.', 'Het kind is lief.']) {
    const item = items.find(item => item.nl === prompt && ['Het', 'Het is lief.'].includes(item.answer));
    for (const pronoun of ['Hij', 'Zij', 'Ze']) {
      assert.ok(isAnswerCorrect(prompt.includes('___') ? pronoun : `${pronoun} is lief.`, item.answer, item.accept), prompt);
    }
  }
});

test('the table accepts both masculine and feminine reference used in Dutch', () => {
  const item = lessonById['ik-kan'].steps.flatMap(step => step.items || [])
    .find(item => item.nl === 'De tafel is klein. ___ is klein.');
  for (const answer of ['Hij', 'Zij', 'Ze']) assert.ok(isAnswerCorrect(answer, item.answer, item.accept));
  assert.equal(isAnswerCorrect('Het', item.answer, item.accept), false);
});
