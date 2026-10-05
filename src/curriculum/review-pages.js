/**
 * Review pages for the later core lessons. From volume three every earlier target must come back in every
 * lesson; besides the stories and drills that reuse old words in context, a lesson can end its Combine part
 * with short retrieval rounds: recall an earlier word from its English meaning, then hear it and write it.
 * The pages are built from the curriculum's own glosses, so a word keeps the meaning it was taught with.
 */
import { words as plannedWords } from './plan.js';
import { practiceModules } from './practice/index.js';

const glosses = new Map([
  ...practiceModules.flatMap((module) => module.entries.map(({ word }) => [word.id, word])),
  ...plannedWords.map((word) => [word.id, word]),
]);
const groups = (items, size) => Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, i * size + size));
/** The English cue without the course notes in brackets: “to invite (nodig hebben …)” → “to invite”. */
const cue = (word) => word.english.replace(/\s*\([^)]*\)/gu, '').split(' / ')[0].split(' · ')[0].trim();
const head = (word) => [word.article, word.dutch].filter(Boolean).join(' ');

function entries(ids) {
  return ids.map((id) => {
    const word = glosses.get(id);
    if (!word) throw new Error('Unknown review word: ' + id);
    return word;
  });
}

/** Recall each word from its English meaning; nouns with de or het. */
export function recallPages(ids, { title = 'Words from earlier lessons', grammar = ['de-het'], size = 12 } = {}) {
  return groups(entries(ids), size).map((batch, i, all) => ({
    type: 'drill', title: all.length > 1 ? `${title} (${i + 1})` : title, grammar,
    instruction: 'Type the Dutch word from an earlier lesson. Nouns with de or het, verbs as the infinitive.',
    items: batch.map((word) => ({ en: cue(word), answer: head(word) })),
    explanation: 'These words come from earlier lessons. Retrieve each one before you check; a word you find hard comes back in A little review.',
  }));
}

/** Hear each word in a short phrase and write it. */
export function listenPages(ids, { title = 'Hear the earlier words', grammar = ['de-het'], size = 12 } = {}) {
  return groups(entries(ids), size).map((batch, i, all) => ({
    type: 'drill', title: all.length > 1 ? `${title} (${i + 1})` : title, grammar,
    instruction: 'Listen and write each word or phrase. Capitals do not matter.',
    items: batch.map((word) => ({ listen: head(word) })),
  }));
}
