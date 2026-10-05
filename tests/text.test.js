import test from 'node:test';
import assert from 'node:assert/strict';
import { tokenize } from '../src/curriculum/text.js';
import { allowedForms, lessons, wordsIn } from '../src/content.js';

test('apostrophe plurals stay whole in sentence tiles with either apostrophe style', () => {
  assert.deepEqual(tokenize("Ik koop paprika's."), ['Ik', 'koop', "paprika's"]);
  assert.deepEqual(tokenize('Ik koop paprika’s.'), ['Ik', 'koop', "paprika's"]);
  assert.deepEqual(tokenize("‘Bram’ zegt: 'ik woon[t] hier.' ___"), ['Bram', 'zegt', 'ik', 'woont', 'hier']);
});

test('plural paprika is tracked and unlocked without exposing the later time expression ’s', () => {
  const known = allowedForms(lessons.findIndex(lesson => lesson.id === 'a2-markt'));
  assert.ok(known.has("paprika's"));
  assert.ok(!known.has('s'));
  assert.ok(wordsIn('Ik koop paprika’s.').includes('paprika'));
  assert.ok(!wordsIn('Ik koop paprika’s.').includes('s'));
  assert.ok(wordsIn('Ik werk ’s ochtends.').includes('s'));
  assert.deepEqual(wordsIn('foto’s'), ['foto']);
  assert.deepEqual(wordsIn('collega’s'), ['collega']);
  assert.ok(!known.has("foto's"));
  assert.ok(!known.has("collega's"));
  assert.ok(allowedForms(lessons.findIndex(lesson => lesson.id === 'toen')).has("foto's"));
  assert.ok(allowedForms(lessons.findIndex(lesson => lesson.id === 'die-dat')).has("collega's"));
});
