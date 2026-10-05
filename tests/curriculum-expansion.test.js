import test from 'node:test';
import assert from 'node:assert/strict';
import { allowedForms, lessons, publishedLessons, volumeCoverage, words, wordsIn, stepTexts } from '../src/content.js';
import { createInitialState, isLessonUnlocked, isAnswerCorrect, collectedForms } from '../src/learning.js';
import { practiceModules } from '../src/curriculum/practice/index.js';
import { practiceArt } from '../src/curriculum/practice/art.js';
import { existsSync } from 'node:fs';

test('practice introduces 15–25 unique entries and reviews earlier words at a bounded workload', () => {
  const introduced = new Set();
  for (const lesson of lessons) {
    if (lesson.track === 'practice') {
      assert.ok(lesson.targets.length >= 15 && lesson.targets.length <= 25);
      assert.equal(new Set(lesson.targets).size, lesson.targets.length);
      assert.ok(lesson.targets.every(id => !introduced.has(id)));
      assert.ok(lesson.steps.length >= 30 && lesson.steps.length <= 50);
      assert.ok(lesson.answers >= 245 && lesson.answers <= 300);
      assert.equal(new Set(lesson.reviewWordIds).size, 20);
      assert.ok(lesson.reviewWordIds.every(id => introduced.has(id)));
      const texts = lesson.steps.flatMap(step => stepTexts(step).spoken);
      for (const id of lesson.targets) assert.ok(texts.filter(text => wordsIn(text).includes(id)).length >= 12, id);
    }
    lesson.newWordIds.forEach(id => introduced.add(id));
  }
});

test('each practice target has an existing illustration with valid, described crop bounds', () => {
  for (const module of practiceModules) for (const { word } of module.entries) {
    const art = practiceArt[word.image];
    assert.ok(art?.alt, word.id);
    assert.ok(existsSync(new URL('../public' + art.file, import.meta.url)), art.file);
    const [x, y, width, height] = art.bounds || [art.column * 100 / art.columns, art.row * 100 / art.rows, 100 / art.columns, 100 / art.rows];
    assert.ok(x >= 0 && y >= 0 && width > 0 && height > 0 && x + width <= 100 && y + height <= 100, word.id);
  }
});

test('vocabulary counts use first introductions, not inflections or later revisits', () => {
  assert.equal(words.filter(w => w.id === 'bed').length, 1);
  assert.equal(words.find(w => w.id === 'bed').lessonId, 'a1-thuis');
  assert.ok(!lessons.find(l => l.id === 'ik-heb').newWordIds.includes('bed'));
  const a1 = new Set(publishedLessons.filter(l => l.volume === 0).flatMap(l => l.newWordIds));
  assert.equal(volumeCoverage[0].words, a1.size);
  assert.ok(a1.size >= 500, 'The first-stage vocabulary target must be preserved.');
  assert.equal(a1.size, new Set(publishedLessons.filter(l => l.volume === 0).flatMap(l => [...l.targets, ...l.structure, ...l.vocabulary])).size);
  assert.ok(!a1.has('bedden'));
});

test('earlier word introductions do not leak future plurals, participles or comparatives', () => {
  const atHome = allowedForms(lessons.findIndex(l => l.id === 'a1-thuis'));
  assert.ok(atHome.has('tafel') && atHome.has('douche'));
  assert.ok(!atHome.has('tafels') && !atHome.has('douches'));
  assert.ok(allowedForms(lessons.findIndex(l => l.id === 'twee-katten')).has('tafels'));
});

test('homographs distinguish owning a shower from showering and a trip from travelling', () => {
  assert.deepEqual(wordsIn('De douche is nieuw.'), ['de', 'douche', 'zijn', 'nieuw']);
  assert.ok(wordsIn('Ik douche.').includes('douchen'));
  assert.ok(!wordsIn('Ik douche.').includes('douche'));
  assert.ok(wordsIn('De reis is mooi.').includes('reis'));
  assert.ok(wordsIn('Ik reis.').includes('reizen'));
});

test('all published lessons stay available to the learner regardless of sequence', () => {
  const state = createInitialState();
  const home = lessons.find(l => l.id === 'a1-thuis');
  const oldThird = lessons.find(l => l.id === 'ik-woon');
  assert.equal(isLessonUnlocked(state, home, lessons), true);
  state.completedLessons = ['wat-is-dit', 'ik-ben'];
  assert.equal(isLessonUnlocked(state, home, lessons), true);
  assert.equal(isLessonUnlocked(state, oldThird, lessons), true);
  state.positions = { 'ik-woon': 8 };
  assert.equal(isLessonUnlocked(state, oldThird, lessons), true);
  assert.equal(oldThird.steps[0].id, 'ik-woon-01');
  for (const draft of lessons.filter(l => !l.available)) {
    assert.equal(isLessonUnlocked({ ...state, completedLessons: lessons.map(l => l.id) }, draft, lessons), false);
  }
});

test('story checks accept an explicitly correct negative answer as well as the story adjective', () => {
  const question = practiceModules.find(m => m.id === 'a1-thuis').questions[0];
  assert.ok(isAnswerCorrect('Nee, het huis is niet nieuw.', question.answer, question.accept));
  assert.ok(!isAnswerCorrect('Ja, het huis is nieuw.', question.answer, question.accept));
});

test('the word collection only shows later forms from opened lessons', () => {
  const word = words.find(w => w.id === 'tafel');
  assert.ok(!collectedForms(word, new Set(['a1-thuis'])).includes('tafels'));
  assert.ok(collectedForms(word, new Set(['a1-thuis', 'twee-katten'])).includes('tafels'));
});

test('cycling and opening do not steal noun or adjective encounters', () => {
  assert.ok(wordsIn('De fiets is nieuw.').includes('fiets'));
  assert.ok(!wordsIn('De fiets is nieuw.').includes('fietsen'));
  assert.ok(wordsIn('Ik fiets naar school.').includes('fietsen'));
  assert.ok(wordsIn('De fietsen zijn nieuw.').includes('fiets'));
  assert.ok(wordsIn('Wij fietsen naar school.').includes('fietsen'));
  assert.ok(wordsIn('Ik open het raam.').includes('openen'));
  assert.ok(wordsIn('Het raam is open.').includes('open'));
  assert.ok(wordsIn('Bram pakt een pen.').includes('pakken'));
  assert.ok(wordsIn('Tom pakt de dozen uit.').includes('uitpakken'));
  assert.ok(wordsIn('Ik heb een jas nodig.').includes('nodig'));
  assert.ok(!wordsIn('Ik heb een jas nodig.').includes('uitnodigen'));
  assert.ok(wordsIn('Ik nodig Bram uit.').includes('uitnodigen'));
  assert.ok(!wordsIn('Ik nodig Bram uit.').includes('nodig'));
  assert.ok(wordsIn('Het vertrek is om acht uur.').includes('vertrek'));
  assert.ok(!wordsIn('Het vertrek is om acht uur.').includes('vertrekken'));
  assert.ok(wordsIn('Ik vertrek morgen.').includes('vertrekken'));
  assert.ok(wordsIn('Ik sport graag.').includes('sporten'));
  assert.ok(wordsIn('Wij sporten hier.').includes('sporten'));
  assert.ok(wordsIn('De sport is mooi.').includes('sport'));
  assert.ok(wordsIn('Lotte sluit de deur.').includes('sluiten'));
  assert.ok(wordsIn('Lotte sluit het huis af.').includes('afsluiten'));
});

test('fog does not count as missing someone, including inverted weather questions', () => {
  for (const text of ['Er is mist.', 'Is er mist?', 'Er is geen mist.', 'De mist is hier.']) {
    assert.ok(wordsIn(text).includes('mist'), text);
    assert.ok(!wordsIn(text).includes('missen'), text);
  }
  for (const text of ['Bram mist zijn moeder.', 'Mijn vader mist de trein.', 'Mist hij zijn familie?']) {
    assert.ok(wordsIn(text).includes('missen'), text);
    assert.ok(!wordsIn(text).includes('mist'), text);
  }
});

test('the know lesson accepts familiarity with an answer or name while retaining weten before clauses', () => {
  const items = lessons.find(l => l.id === 'die-dat').steps.flatMap(s => s.items || []);
  for (const [expected, alternative] of [
    ['Ik ken de buurman, maar ik weet zijn naam niet.', 'Ik ken de buurman, maar ik ken zijn naam niet.'],
    ['Weet Noor het antwoord?', 'Kent Noor het antwoord?'],
    ['De leraar weet het antwoord.', 'De leraar kent het antwoord.'],
    ['Hij was een student die altijd het antwoord wist.', 'Hij was een student die altijd het antwoord kende.'],
  ]) {
    const item = items.find(item => item.answer === expected);
    assert.ok(item, expected);
    assert.ok(isAnswerCorrect(alternative, item.answer, item.accept), alternative);
  }
  const past = items.find(item => item.nl === 'Bram ___ het antwoord niet.');
  assert.ok(isAnswerCorrect('kende', past.answer, past.accept));
  const clause = items.find(item => item.answer === 'Weet jij waar de buurman woont?');
  assert.ok(!isAnswerCorrect('Ken jij waar de buurman woont?', clause.answer, clause.accept));
});
