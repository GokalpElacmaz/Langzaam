import test from 'node:test';
import assert from 'node:assert/strict';
import { courseLevels, levelForVolume, practiceGoals } from '../src/curriculum/levels.js';
import { lessons, publishedLessons, levelCoverage } from '../src/content.js';

test('all existing volumes belong to one of the four course levels', () => {
  assert.deepEqual(courseLevels.map(level => level.id), ['A1', 'A2', 'B1', 'B2']);
  assert.deepEqual(Array.from({ length: 7 }, (_, index) => levelForVolume(index)), ['A1', 'A2', 'A2', 'B1', 'B1', 'B2', 'B2']);
  for (const lesson of lessons) assert.equal(lesson.level, levelForVolume(lesson.volume));
});

test('level goals are cumulative and published coverage excludes drafts and repeated forms', () => {
  assert.deepEqual(courseLevels.map(({ minWords, maxWords }) => [minWords, maxWords]), [[500, 1000], [1000, 1500], [2000, 2500], [4000, 5000]]);
  const seen = new Set();
  for (const coverage of levelCoverage) {
    const atLevel = publishedLessons.filter(lesson => lesson.level === coverage.id);
    atLevel.flatMap(lesson => lesson.newWordIds).forEach(id => seen.add(id));
    assert.equal(coverage.cumulative, seen.size);
    assert.equal(coverage.lessons, atLevel.length);
    assert.equal(coverage.remaining, Math.max(0, coverage.minWords - seen.size));
  }
  assert.equal(levelCoverage[0].cumulative, 510);
  assert.ok(levelCoverage[1].cumulative >= 1000, 'A2 reaches its minimum cumulative goal');
  // B1 is being published lesson by lesson; B2 is still entirely draft.
  assert.ok(levelCoverage[2].lessons >= 1);
  assert.equal(levelCoverage[3].lessons, 0);
  assert.equal(levelCoverage[3].words, 0);
  assert.equal(practiceGoals.minAnswers, 245);
  assert.equal(practiceGoals.maxAnswers, 300);
});

test('transport extends the published A2 sequence without moving earlier practice', () => {
  const lesson = lessons.find(lesson => lesson.id === 'a2-onderweg');
  assert.equal(lesson.available, true);
  assert.equal(lesson.level, 'A2');
  assert.equal(lesson.targets.length, 20);
  assert.equal(lesson.answers, 250);
  assert.equal(lessons[lessons.indexOf(lesson) - 1].id, 'a2-digitaal');
});

test('the eight later A2 topics follow transport in order, each with twenty new words and 250 answers', () => {
  const ids = ['a2-onderweg', 'a2-dieren', 'a2-beroepen', 'a2-karakter', 'a2-koken', 'a2-verzorging', 'a2-tuin', 'a2-onweer', 'a2-sport'];
  const start = lessons.findIndex(lesson => lesson.id === ids[0]);
  assert.deepEqual(lessons.slice(start, start + ids.length).map(lesson => lesson.id), ids);
  for (const lesson of lessons.slice(start + 1, start + ids.length)) {
    assert.equal(lesson.available, true);
    assert.equal(lesson.level, 'A2');
    assert.equal(lesson.targets.length, 20);
    assert.equal(lesson.newWordIds.length, 20);
    assert.equal(lesson.answers, 250);
  }
});
