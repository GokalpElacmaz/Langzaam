import { practiceGoals } from '../src/curriculum/levels.js';
import { practiceArt } from '../src/curriculum/practice/art.js';
/**
 * Curriculum validator. Every lesson — whether written by a person or an
 * authoring agent — must pass this before it is published.
 *
 *   node scripts/validate-content.mjs            all lessons
 *   node scripts/validate-content.mjs ik-woon    one lesson (plus the plan)
 *
 * It enforces the course's rules mechanically: only introduced Dutch, ten
 * targets heavily repeated and then recycled forever, extra vocabulary used
 * enough to be learnt, grammar that keeps coming back, and pages that are
 * well formed. Exit code 1 on any error.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { grammarPoints, lessonPlan, words as plannedWords } from '../src/curriculum/plan.js';
import { allowedForms, images, lessons, stepTexts, wordsIn } from '../src/content.js';
import { tokenize } from '../src/curriculum/text.js';
import { practiceModules } from '../src/curriculum/practice/index.js';

export const RULES = {
  targetsPerLesson: 10,
  minOwnTargetUses: 12, // each new target, within its own lesson
  minPreviousTargetUses: 4, // targets of the lesson just before
  minEarlierTargetUses: 2, // every older target, in every later lesson
  minOwnGrammarSteps: 5,
  minEarlierGrammarSteps: 2,
  // From volume three on (lesson index 18+), targets and grammar points from more than twelve
  // lessons back (two volumes) must still return in every lesson, but once is enough.
  distantFrom: 18,
  distantAfter: 12,
  minDistantTargetUses: 1,
  minDistantGrammarSteps: 1,
  minOwnExtraUses: 3, // extra vocabulary (vocabulary/<lesson-id>.js), within its own lesson
  maxExtrasPerLesson: [12, 12, 30, 35, 40, 45], // by volume: 0–2, 3, 4, 5, 6 (index = volume)
  minSteps: 30,
  minAnswers: 130,
  // Share of answers the learner must type (not tap). Rises as the book goes on.
  minTypedShare: [0.5, 0.6, 0.65, 0.7, 0.7, 0.7],
};

/** “Eén” at the start of a sentence lowercases to “eén”; the word is “één”. */
const lower = (token) => token.toLowerCase().replace(/^eén$/u, 'één');
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publishedOnly = process.argv.includes('--published');
const only = process.argv.slice(2).find((arg) => !arg.startsWith('--'));
const errors = [];
const warnings = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);

// The plan itself.
const planned = new Map();
for (const lesson of lessonPlan) {
  const targetCount = lesson.targets.length;
  if (lesson.track === 'practice') {
    if (targetCount < practiceGoals.minWords || targetCount > practiceGoals.maxWords) fail(lesson.id, 'practice needs 15–25 targets');
  } else if (targetCount !== RULES.targetsPerLesson) fail(lesson.id, `must have exactly ${RULES.targetsPerLesson} targets`);
  if (new Set(lesson.targets).size !== targetCount) fail(lesson.id, 'targets must be distinct entries');
  const maxExtras = RULES.maxExtrasPerLesson[Math.min((lesson.volume || 0), RULES.maxExtrasPerLesson.length - 1)];
  if (lesson.vocabulary.length > maxExtras) fail(lesson.id, `has ${lesson.vocabulary.length} extra words; volume ${lesson.volume || 0} allows ${maxExtras}`);
  for (const id of [...lesson.targets, ...lesson.structure, ...lesson.vocabulary]) {
    if (!planned.has(id)) planned.set(id, lesson.id);
    if (!plannedWords.some((word) => word.id === id)) fail(lesson.id, `word ${id} is not defined in words`);
  }
  for (const id of lesson.grammar) if (!grammarPoints.some((point) => point.id === id)) fail(lesson.id, `unknown grammar point ${id}`);
}
for (const word of plannedWords) if (!planned.has(word.id)) fail('plan', `word ${word.id} is not in any lesson`);
for (const word of plannedWords) {
  const expected = { target: 'targets', structure: 'structure', extra: 'vocabulary' }[word.kind];
  const lesson = lessonPlan.find((l) => l.id === planned.get(word.id));
  if (lesson && !lesson[expected].includes(word.id)) fail('plan', `${word.id} is kind ${word.kind} but listed outside ${expected}`);
}

// One spelling, one word: a form may belong to only one word (true homographs are listed here).
const homographs = new Set(['reis', 'reden', 'douche', 'fiets', 'fietsen', 'open', 'pak', 'pakt', 'kom', 'mist', 'nodig', 'sluit', 'sluiten', 'sport', 'sporten', 'vertrek']); // noun/adjective / conjugated verb; resolved contextually by wordsIn
const formOwner = new Map();
for (const word of plannedWords) {
  for (const form of [word.dutch, ...(word.forms || []), ...Object.values(word.laterForms || {}).flat()]) {
    const key = form.toLowerCase();
    if (formOwner.has(key) && formOwner.get(key) !== word.id && !homographs.has(key)) fail('plan', `form “${form}” belongs to both ${formOwner.get(key)} and ${word.id}`);
    formOwner.set(key, word.id);
  }
  for (const lessonId of Object.keys(word.laterForms || {})) if (!lessonPlan.some((l) => l.id === lessonId)) fail('plan', `${word.id} unlocks forms in unknown lesson ${lessonId}`);
}

const stepIds = new Set();
const report = [];
if (only && !lessons.some((lesson) => lesson.id === only)) fail('selection', `unknown lesson ${only}`);
lessons.forEach((lesson, index) => {
  if (only && lesson.id !== only) return;
  if (publishedOnly && !lesson.available) return;
  const practice = lesson.track === 'practice';
  const known = allowedForms(index);
  const grammarSoFar = new Set(lessonPlan.slice(0, index + 1).flatMap((l) => l.grammar));
  const uses = {};
  const grammarSteps = {};
  if (lesson.steps.length < RULES.minSteps) fail(lesson.id, `has ${lesson.steps.length} pages; needs at least ${RULES.minSteps}`);
  if (lesson.answers < RULES.minAnswers) fail(lesson.id, `has ${lesson.answers} answers; needs at least ${RULES.minAnswers}`);
  const typed = lesson.steps.filter((s) => s.type === 'drill').flatMap((s) => s.items.filter((item) => !(item.choices || s.choices))).length;
  const typedShare = lesson.answers ? typed / lesson.answers : 0;
  const minTyped = practice ? 0.7 : RULES.minTypedShare[Math.min(lesson.coreIndex, RULES.minTypedShare.length - 1)];
  if (typedShare < minTyped) fail(lesson.id, `only ${Math.round(typedShare * 100)}% of answers are typed; needs ${minTyped * 100}%`);
  if (lesson.steps.at(-1)?.type !== 'complete') fail(lesson.id, 'last page must be type "complete"');

  for (const step of lesson.steps) {
    const at = `${lesson.id} › ${step.id} (${step.type})`;
    if (stepIds.has(step.id)) fail(at, 'duplicate page id');
    stepIds.add(step.id);
    if (!step.title) fail(at, 'missing title');
    checkShape(step, at);

    const texts = stepTexts(step);
    for (const text of [...texts.spoken, ...texts.checked]) {
      for (const token of tokenize(text)) {
        if (!known.has(lower(token))) fail(at, `“${token}” in “${text}” has not been introduced yet`);
      }
    }
    for (const text of texts.spoken) for (const id of wordsIn(text)) uses[id] = (uses[id] || 0) + 1;
    for (const id of step.grammar || []) {
      if (!grammarSoFar.has(id)) fail(at, `grammar tag ${id} is not taught yet`);
      grammarSteps[id] = (grammarSteps[id] || 0) + 1;
    }
    for (const key of imageKeys(step)) {
      if (!images[key]) fail(at, `unknown image key ${key}`);
      else if (!existsSync(practiceArt[key] ? join(root, 'public', practiceArt[key].file) : join(root, 'public', 'images', `${key}.svg`))) warnings.push(`${at}: image ${key}.svg is not drawn yet`);
    }
  }

  for (const id of lesson.targets) if ((uses[id] || 0) < RULES.minOwnTargetUses) fail(lesson.id, `target “${id}” is used ${uses[id] || 0}× in spoken Dutch; needs ${RULES.minOwnTargetUses}`);
  const coreBefore = lessonPlan.slice(0, index).filter((l) => l.track === 'core');
  const earlier = practice ? lesson.reviewWordIds : coreBefore.flatMap((l) => l.targets);
  const previous = new Set(coreBefore.at(-1)?.targets || []);
  const distant = (lessonIndex) => lesson.coreIndex >= RULES.distantFrom && lesson.coreIndex - lessonIndex > RULES.distantAfter;
  const introducedAt = (key, id) => lessonPlan.find((l) => l.track === 'core' && l[key].includes(id))?.coreIndex;
  for (const id of practice ? [] : earlier) {
    const needed = previous.has(id) ? RULES.minPreviousTargetUses : distant(introducedAt('targets', id)) ? RULES.minDistantTargetUses : RULES.minEarlierTargetUses;
    if ((uses[id] || 0) < needed) fail(lesson.id, `earlier target “${id}” is recycled ${uses[id] || 0}×; needs ${needed}`);
  }
  for (const id of lesson.vocabulary) if ((uses[id] || 0) < RULES.minOwnExtraUses) fail(lesson.id, `extra word “${id}” is used ${uses[id] || 0}× in spoken Dutch; needs ${RULES.minOwnExtraUses}`);
  for (const id of lesson.grammar) if ((grammarSteps[id] || 0) < RULES.minOwnGrammarSteps) fail(lesson.id, `grammar “${id}” is practised on ${grammarSteps[id] || 0} pages; needs ${RULES.minOwnGrammarSteps}`);
  for (const id of practice ? [] : coreBefore.flatMap((l) => l.grammar)) {
    const needed = distant(introducedAt('grammar', id)) ? RULES.minDistantGrammarSteps : RULES.minEarlierGrammarSteps;
    if ((grammarSteps[id] || 0) < needed) fail(lesson.id, `earlier grammar “${id}” returns on ${grammarSteps[id] || 0} pages; needs ${needed}`);
  }

  if (practice) {
    const module = practiceModules.find((item) => item.id === lesson.id);
    if (lesson.steps.length < 30 || lesson.steps.length > 50) fail(lesson.id, 'practice needs 30–50 pages');
    if (lesson.answers < practiceGoals.minAnswers || lesson.answers > practiceGoals.maxAnswers) fail(lesson.id, 'practice needs 245–300 answers');
    if (lesson.newWordIds.length !== lesson.targets.length) fail(lesson.id, 'every practice target must be a genuinely new entry');
    if (new Set(lesson.reviewWordIds).size !== 20) fail(lesson.id, 'practice needs twenty distinct earlier words to review');
    for (const id of lesson.reviewWordIds) {
      if (!lessonPlan.slice(0, index).some((l) => l.introducedWordIds.includes(id))) fail(lesson.id, `review word ${id} has not been introduced`);
      if (!uses[id]) fail(lesson.id, `scheduled review word ${id} is missing`);
    }
    for (const id of lesson.reviewGrammar) {
      if (!grammarSoFar.has(id)) fail(lesson.id, `review grammar ${id} has not been taught`);
      if ((grammarSteps[id] || 0) < 2) fail(lesson.id, `review grammar ${id} needs two practice pages`);
    }
    for (const entry of module.entries) {
      const art = practiceArt[entry.word.image];
      if (!art?.alt || !existsSync(join(root, 'public', art.file))) fail(lesson.id, `${entry.word.id} needs a described, installed vocabulary illustration`);
      if (new Set(entry.examples.map((example) => example.nl)).size < 2) fail(lesson.id, `${entry.word.id} needs two distinct contexts`);
      for (const example of entry.examples) {
        if (!example.en || !wordsIn(example.nl).includes(entry.word.id)) fail(lesson.id, `invalid or untranslated context for ${entry.word.id}`);
      }
    }
  }

  report.push({
    lesson: `${lesson.number} ${lesson.id}`, pages: lesson.steps.length, answers: lesson.answers, typed: `${Math.round(typedShare * 100)}%`,
    targets: lesson.targets.map((id) => `${id}×${uses[id] || 0}`).join(' '),
    extras: lesson.vocabulary.length ? `${lesson.vocabulary.length} (min ${Math.min(...lesson.vocabulary.map((id) => uses[id] || 0))}×)` : '–',
    recycledMin: earlier.length ? Math.min(...earlier.map((id) => uses[id] || 0)) : '–',
  });
});

function imageKeys(step) {
  return [step.image, ...(step.cards || []).map((c) => c.image), ...(step.lines || []).map((l) => l.image),
    ...(step.type === 'picture' ? step.choices.map((c) => c.image) : []), ...(step.items || []).map((item) => item.image)].filter(Boolean);
}

function checkShape(step, at) {
  const need = (condition, message) => { if (!condition) fail(at, message); };
  switch (step.type) {
    case 'observe': need(step.cards?.length, 'needs cards'); step.cards?.forEach((c) => need(c.nl && c.en, 'each card needs nl and en')); break;
    case 'picture':
      need(step.nl && step.en, 'needs nl and en');
      need(step.choices?.length >= 3, 'needs at least 3 choices');
      need(step.choices?.some((c) => c.image === step.answer), 'answer must be one of the choice images');
      need(new Set(step.choices?.map((c) => c.image)).size === step.choices?.length, 'choice images must differ');
      break;
    case 'grammar': need(step.body?.length, 'needs body paragraphs'); break;
    case 'drill':
      need(step.items?.length, 'needs items');
      step.items?.forEach((item, i) => {
        const where = `item ${i + 1}`;
        need(item.answer || item.listen, `${where} needs an answer`);
        need([item.label, item.nl, item.en, item.listen, item.image].filter(Boolean).length >= 1, `${where} needs label, nl, en, listen or image`);
        if (item.nl?.includes('___')) need(item.nl.split('___').length === 2, `${where} may contain only one blank`);
        const choices = item.choices || step.choices;
        if (choices) need(choices.includes(item.answer), `${where}: answer “${item.answer}” is not among the choices`);
        if (item.label) need(step.layout === 'table', `${where}: label items belong in a table layout`);
      });
      break;
    case 'arrange': {
      need(step.nl && step.en, 'needs nl and en'); need(tokenize(step.nl).length >= 3, 'needs at least three words');
      // Another correct order may be accepted, but it must be built from exactly the same tiles.
      const tiles = (text) => tokenize(text).map((t) => t.toLowerCase()).sort().join(' ');
      for (const alternative of step.accept || []) need(tiles(alternative) === tiles(step.nl), `accepted order “${alternative}” must use exactly the words of nl`);
      break;
    }
    case 'story': need(step.lines?.length >= 4, 'needs at least four lines'); step.lines?.forEach((l) => need(l.nl && l.en, 'each line needs nl and en')); break;
    case 'complete': break;
    default: fail(at, `unknown page type ${step.type}`);
  }
}

console.table(report);
if (warnings.length) console.warn(`\n${warnings.length} warning(s):\n  ${[...new Set(warnings)].slice(0, 30).join('\n  ')}`);
if (errors.length) {
  console.error(`\n${errors.length} error(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log('\nContent is valid.');
