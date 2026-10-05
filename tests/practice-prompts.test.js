import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPracticeLesson } from '../src/curriculum/practice/build-lesson.js';
import { practiceModules } from '../src/curriculum/practice/index.js';
import { itemModel, lessons } from '../src/content.js';

const home = practiceModules.find(module => module.id === 'a1-thuis');
const reviews = home.entries.map(entry => entry.word);
const build = (module = home) => buildPracticeLesson(module, reviews);
const gapFor = (steps, english) => steps.filter(step => step.id.includes('-fill-'))
  .flatMap(step => step.items).find(item => item.en === english);
const withExample = (word, example) => ({
  ...home,
  entries: [{ word, examples: [example, example] }, ...home.entries.slice(1)],
});

test('balcony recall hides the whole article and noun, including indefinite contexts', () => {
  const steps = build();
  assert.deepEqual(gapFor(steps, 'The balcony is small.'), {
    nl: '___ is klein.', answer: 'Het balkon', en: 'The balcony is small.',
  });
  assert.deepEqual(gapFor(steps, 'This is a balcony.'), {
    nl: 'Dit is ___.', answer: 'een balkon', en: 'This is a balcony.',
  });
  for (const step of steps.filter(step => step.id.includes('-recall-'))) {
    const balcony = step.items.find(item => item.en === 'The balcony is small.');
    if (balcony) assert.equal(balcony.answer, 'Het balkon');
  }
});

test('noun gaps hide articles across adjective and quantity modifiers', () => {
  const word = { id: 'balkon', dutch: 'balkon', article: 'het', forms: ['balkons'] };
  for (const [nl, answer] of [
    ['Het grote balkon is mooi.', 'Het grote balkon'],
    ['Dit is een mooi balkon.', 'een mooi balkon'],
    ['De vijf kleine balkons zijn mooi.', 'De vijf kleine balkons'],
    ['Het bijzonder comfortabele balkon is mooi.', 'Het bijzonder comfortabele balkon'],
    ['Dit is geen nieuw balkon.', 'geen nieuw balkon'],
    ['Ons kleine balkon is mooi.', 'Ons kleine balkon'],
    ['Jouw balkon is mooi.', 'Jouw balkon'],
  ]) {
    const example = { nl, en: 'A distinct English cue.' };
    const gap = gapFor(build(withExample(word, example)), example.en);
    assert.equal(gap.answer, answer, nl);
    assert.equal(gap.nl.replace('___', gap.answer), nl);
    assert.equal(gap.nl.match(/___/g).length, 1);
  }
});

test('noun gaps retain the surrounding sentence and match whole words', () => {
  for (const [word, nl, answer] of [
    [{ id: 'melk', dutch: 'melk', article: 'de', forms: [] }, 'Het kind drinkt melk.', 'melk'],
    [{ id: 'kom', dutch: 'kom', article: 'de', forms: [] }, 'Bram komt met een kom.', 'een kom'],
    [{ id: 'balkon', dutch: 'balkon', article: 'het', forms: [] }, 'Het balkon is mooi.', 'Het balkon'],
  ]) {
    const example = { nl, en: 'A distinct English cue.' };
    const gap = gapFor(build(withExample(word, example)), example.en);
    assert.equal(gap.answer, answer, nl);
    assert.equal(gap.nl.replace('___', gap.answer), nl);
  }
});

test('authored gap spans support unusual phrases and reject a span without its target', () => {
  const word = { id: 'balkon', dutch: 'balkon', article: 'het', forms: [] };
  const example = { nl: 'Het pas geverfde balkon is mooi.', en: 'The newly painted balcony is beautiful.', gap: 'Het pas geverfde balkon' };
  const item = gapFor(build(withExample(word, example)), example.en);
  assert.equal(item.nl, '___ is mooi.');
  assert.equal(item.answer, example.gap);
  assert.throws(() => build(withExample(word, { ...example, gap: 'is mooi' })), /Gap must contain the target/);
});

test('practice grammar and recall pages each use one answer format', () => {
  for (const module of practiceModules) {
    const steps = build(module);
    const grammar = steps.filter(step => /-grammar-\d+$/u.test(step.id));
    assert.equal(grammar.length, 2, module.id);
    assert.deepEqual(grammar.flatMap(step => step.items).sort((a, b) => a.nl.localeCompare(b.nl)),
      [...module.grammarItems].sort((a, b) => a.nl.localeCompare(b.nl)), module.id);
    for (const step of steps.filter(step => step.type === 'drill')) {
      assert.equal(new Set(step.items.map(item => itemModel(item, step).kind)).size, 1, step.id);
      if (step.title === 'Recall the word and its article') {
        assert.ok(step.items.every(item => !item.nl && item.en), step.id);
        assert.match(step.instruction, /Include de or het/);
      }
      if (step.title === 'Recall the missing phrase') {
        assert.ok(step.items.every(item => item.nl.includes('___')), step.id);
        assert.match(step.instruction, /Complete only the gap/);
      }
    }
  }
});

test('sentence tiles keep valid word orders while typed translations accept equivalent wording', () => {
  const example = {
    nl: 'Er staan vijf stoelen in de wachtkamer.', en: 'There are five chairs in the waiting room.',
    accept: ['In de wachtkamer staan er vijf stoelen.', 'Vijf stoelen staan in de wachtkamer.'],
  };
  const module = { ...home, entries: home.entries.map((entry, index) => index === 2
    ? { word: { id: 'wachtkamer', dutch: 'wachtkamer', article: 'de', forms: [] }, examples: [example, example] }
    : entry) };
  const steps = build(module);
  assert.deepEqual(steps.find(step => step.id.endsWith('-arrange-0')).accept, [example.accept[0]]);
  const translation = steps.filter(step => step.id.includes('-translate-')).flatMap(step => step.items)
    .find(item => item.en === example.en);
  assert.deepEqual(translation.accept, example.accept);
});

test('standard twenty-word practice keeps stable page IDs and all target contexts', () => {
  const suffixes = [
    ...[0, 1, 2, 3].map(i => 'notice-' + i),
    ...[0, 1, 2, 3].map(i => 'recognise-' + i),
    ...[0, 1, 2, 3].map(i => 'fill-' + i),
    'grammar-reminder', 'grammar-0', 'grammar-1',
    ...[0, 1, 2, 3].map(i => 'translate-' + i),
    ...[0, 1, 2, 3].map(i => 'listen-' + i),
    ...[0, 1, 2, 3].map(i => 'recall-' + i),
    'review-0', 'review-1', 'story', 'story-questions',
    'arrange-0', 'arrange-1', 'arrange-2', 'last-look', 'complete',
  ];
  for (const module of practiceModules) {
    const steps = build(module);
    if (module.entries.length === 20 && !module.extraTranslations?.length) assert.deepEqual(steps.map(step => step.id), suffixes.map(suffix => module.id + '-' + suffix));
    const answerCount = steps.reduce((count, step) => count + (step.items?.length || (step.type === 'arrange' ? 1 : 0)), 0);
    assert.ok(answerCount >= 245 && answerCount <= 300, module.id);
    assert.equal(lessons.find(lesson => lesson.id === module.id).answers, answerCount, module.id);
    const fill = steps.filter(step => step.id.includes('-fill-')).flatMap(step => step.items);
    for (const entry of module.entries) for (const example of entry.examples) {
      const forms = [entry.word.dutch, ...entry.word.forms].map(form => form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const visibleTarget = new RegExp('(?<![\\p{L}])(?:' + forms.join('|') + ')(?![\\p{L}])', 'iu');
      const item = fill.find(item => item.en === example.en && item.nl.replace('___', item.answer) === example.nl && visibleTarget.test(item.answer));
      assert.ok(item, module.id + ': ' + example.nl);
      assert.ok(!visibleTarget.test(item.nl), module.id + ': target is given away in ' + item.nl);
    }
  }
});

test('15–25 word topics keep answer formats separate and can reach the requested workload', () => {
  const pool = [...home.entries, ...practiceModules.find(module => module.id === 'a1-kleding').entries];
  for (const count of [15, 17, 21, 25]) {
    const extraCount = Math.max(0, 250 - (count * 10 + 50));
    const module = { ...home, entries: pool.slice(0, count), extraTranslations: Array.from({ length: extraCount }, (_, index) => {
      const example = pool[index % count].examples[1];
      return { en: example.en, answer: example.nl };
    }) };
    const steps = build(module);
    const answers = steps.reduce((sum, step) => sum + (step.items?.length || (step.type === 'arrange' ? 1 : 0)), 0);
    assert.ok(answers >= 245 && answers <= 300, `${count} words: ${answers} answers`);
    for (const step of steps.filter(step => step.type === 'drill')) {
      assert.equal(new Set(step.items.map(item => itemModel(item, step).kind)).size, 1, step.id);
    }
    assert.equal(steps.filter(step => step.type === 'observe').at(-1).title, `Words ${Math.floor((count - 1) / 5) * 5 + 1}–${count}`);
    assert.match(steps.at(-1).instruction, new RegExp(`practised ${count} vocabulary entries`));
    const recognised = steps.filter(step => /-recognise-/.test(step.id)).flatMap(step => step.items);
    assert.equal(recognised.length, count * 2);
    const recall = steps.filter(step => /-recall-/.test(step.id)).flatMap(step => step.items);
    assert.equal(recall.length, count * 2);
  }
  assert.throws(() => build({ ...home, entries: pool.slice(0, 14) }), /15–25/);
  assert.throws(() => build({ ...home, entries: pool.slice(0, 26) }), /15–25/);
});
