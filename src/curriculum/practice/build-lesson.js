import { practiceGoals } from '../levels.js';
import { seededShuffle, tokenize } from '../text.js';

const groups = (items, size = 5) => Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, (i + 1) * size));
const head = (word) => [word.article, word.dutch].filter(Boolean).join(' ');
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Ons/onze also reveal noun gender. Blank unambiguous possessives with the
// noun; leave zijn alone because it can be the sentence's finite verb.
const article = /^(?:de|het|een|geen|mijn|jouw|haar|ons|onze|hun)$/iu;
// Inflected adjectives can be new to a later module. The uninflected forms
// below also occur after een (een mooi hemd) and in quantities (de twee borden).
const modifier = /^(?:[\p{L}-]+e|\d+|één|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf|twaalf|twintig|honderd|nieuw|oud|mooi|groot|klein|goed|slecht|lang|kort|hoog|laag|dik|dun|breed|smal|zwaar|licht|zacht|hard|warm|koud|nat|droog|leeg|vol|schoon|vuil|duur|goedkoop|rood|blauw|groen|geel|wit|zwart|bruin|grijs|blij|heel|erg|zeer|bijzonder|nogal|veel|weinig)$/iu;
const gapInstruction = 'Complete only the gap using the English sentence. Include the article and any describing words inside the missing phrase.';

function nounPhraseStart(text, nounStart) {
  const before = text.slice(0, nounStart);
  const tokens = [...before.matchAll(/[\p{L}\d-]+/gu)];
  let end = nounStart;
  for (let i = tokens.length - 1; i >= 0; i -= 1) {
    const token = tokens[i];
    if (!/^\s+$/u.test(text.slice(token.index + token[0].length, end))) break;
    if (article.test(token[0])) return token.index;
    if (!modifier.test(token[0])) break;
    end = token.index;
  }
  return nounStart;
}

/** Blank an explicitly taught form, never an arbitrary substring of another word. */
function cloze(entry, example) {
  const forms = [...new Set([entry.word.dutch, ...(entry.word.forms || [])])].sort((a, b) => b.length - a.length);
  const pattern = new RegExp('(?<![\\p{L}])(' + forms.map(escape).join('|') + ')(?![\\p{L}])', 'iu');
  const match = example.nl.match(pattern);
  if (!match) throw new Error('No target form in context: ' + entry.word.id + ' / ' + example.nl);
  let start = entry.word.article ? nounPhraseStart(example.nl, match.index) : match.index;
  let end = match.index + match[0].length;
  // Authors may specify an exact phrase for contexts with unusual modifiers.
  if (example.gap) {
    start = example.nl.indexOf(example.gap);
    end = start + example.gap.length;
    if (start < 0 || start > match.index || end < match.index + match[0].length) {
      throw new Error('Gap must contain the target form: ' + entry.word.id + ' / ' + example.gap);
    }
  }
  return { nl: example.nl.slice(0, start) + '___' + example.nl.slice(end), answer: example.nl.slice(start, end), en: example.en };
}

/** Layout is shared; meanings, contexts, grammar tasks and stories are authored separately. */
export function buildPracticeLesson(module, reviewWords) {
  const count = module.entries.length;
  if (count < practiceGoals.minWords || count > practiceGoals.maxWords) throw new Error('Practice lessons need 15–25 entries');
  const wordPages = Math.ceil(count / 10);
  const steps = [];
  const add = (id, step) => steps.push({ ...step, id: module.id + '-' + id });
  const drill = (id, title, items, extra = {}) => add(id, { type: 'drill', title, items, ...extra });
  const batches = groups(module.entries);
  const mixed = seededShuffle(module.entries, module.id + '-recall');
  const grammar = module.reviewGrammar;
  batches.forEach((batch, i) => add('notice-' + i, {
    part: 'Meet the words', type: 'observe', title: 'Words ' + (i * 5 + 1) + '–' + Math.min(i * 5 + 5, count),
    instruction: 'Listen to the word and its example. Say both aloud. Learn each noun with de or het.',
    cards: batch.map((entry) => ({ term: head(entry.word), gloss: entry.word.english, image: entry.word.image, ...entry.examples[0] })),
  }));
  const recognise = [
    ...batches.flatMap(batch => batch.map(entry => ({ en: entry.word.english, image: entry.word.image, answer: head(entry.word), choices: seededShuffle(batch.map(e => head(e.word)), entry.word.id) }))),
    ...batches.flatMap(batch => batch.map(entry => ({ en: entry.examples[0].en, answer: entry.examples[0].nl, choices: seededShuffle(batch.map(e => e.examples[0].nl), entry.word.id + '-context') }))),
  ];
  [...groups(recognise.slice(0, count), 10), ...groups(recognise.slice(count), 10)].forEach((items, i) => drill('recognise-' + i, i < wordPages ? 'Choose the Dutch word' : 'Choose the Dutch sentence', items, {
    part: 'Recognise and recall', instruction: i < wordPages ? 'Choose the Dutch word that matches the English meaning. Nouns include their article.' : 'Choose the complete Dutch sentence that matches the English.',
  }));
  // Revisit all twenty targets before repeating a context for any one of them.
  const contexts = (entries, make) => [0, 1].flatMap(n => entries.map(entry => make(entry, entry.examples[n])));
  groups(contexts(mixed, cloze), 10).forEach((items, i) => drill('fill-' + i, 'Use the word in context', items, {
    instruction: gapInstruction, grammar,
  }));
  add('grammar-reminder', { part: 'Familiar grammar', type: 'grammar', title: 'The grammar you already know', body: module.reminders, grammar,
    examples: module.entries.slice(0, 3).map((entry) => entry.examples[1]),
  });
  const isGap = item => item.nl?.includes('___');
  const grammarKinds = [...new Set(module.grammarItems.map(isGap))];
  // A page always asks for either the missing words or a complete rewrite.
  // Keep the two existing page IDs and every authored answer.
  const grammarPages = grammarKinds.length === 1 ? groups(module.grammarItems, 10)
    : grammarKinds.map(kind => module.grammarItems.filter(item => isGap(item) === kind));
  grammarPages.forEach((items, i) => drill('grammar-' + i, isGap(items[0]) ? 'Complete the grammar gaps' : 'Rewrite the complete sentence', items, {
    instruction: isGap(items[0]) ? 'Type only the missing words. Use the English meaning and any base-form cue to choose the correct grammar.' : 'Follow each instruction and write the complete new sentence.', grammar,
  }));
  groups(contexts(seededShuffle(module.entries, module.id + '-translate'), (entry, example) => ({
    en: example.en, answer: example.nl, accept: example.accept,
  })), 10).forEach((items, i) => drill('translate-' + i, 'Write it in Dutch', items, {
    part: 'Write and listen', instruction: 'Translate the complete sentence into Dutch. Use the vocabulary and grammar you have learned.', grammar,
  }));
  groups(contexts(seededShuffle(module.entries, module.id + '-listen'), (entry, example) => ({ listen: example.nl })), 10).forEach((items, i) => drill('listen-' + i, 'Listen and write', items, {
    instruction: 'Type exactly what you hear. Replay at either speed; punctuation and capital letters do not affect the answer.', grammar,
  }));
  const recall = seededShuffle(module.entries, module.id + '-recall-again');
  [
    ...groups(recall.map(entry => ({ en: entry.word.english, answer: head(entry.word), task: 'Type the target word. Include de or het for a noun.' })), 10),
    ...groups(recall.map(entry => cloze(entry, entry.examples[1])), 10),
  ].forEach((items, i) => drill('recall-' + i, i < wordPages ? 'Recall the word and its article' : 'Recall the missing phrase', items, {
    part: 'Mix and remember', instruction: i < wordPages ? 'Type the Dutch word from its English meaning. Include de or het for every noun.' : gapInstruction, grammar,
  }));
  groups(reviewWords, 10).forEach((batch, i) => drill('review-' + i, 'Bring earlier words back', batch.map((word) => ({
    en: word.english, answer: head(word), task: 'Recall the earlier Dutch word, with its article if it has one.',
  })), { instruction: 'These words come from earlier lessons. Retrieve them before looking back.' }));
  // Optional authored contexts allow smaller or trickier topics extra retrieval.
  groups(module.extraTranslations || [], 10).forEach((items, i) => drill('extra-translate-' + i, 'Use the words again', items, {
    instruction: 'Translate the complete sentence into Dutch. Use the vocabulary and grammar you have learned.', grammar,
  }));
  add('story', { part: 'Read and respond', type: 'story', title: module.title, image: module.image, instruction: 'Read once for meaning, then listen without the English. Notice how familiar grammar joins the words together.', lines: module.story, grammar });
  drill('story-questions', 'Check the story', module.questions, { instruction: 'Answer using the story. Use a complete sentence with the noun or names from the question.', grammar });
  [2, 9].forEach((index, i) => {
    const example = module.entries[index].examples[1];
    const tiles = text => tokenize(text).map(token => token.toLowerCase()).sort().join(' ');
    // Translation alternatives may omit or replace words; tile exercises can
    // only accept alternative orders that use the tiles actually on the page.
    const accept = (example.accept || []).filter(text => tiles(text) === tiles(example.nl));
    add('arrange-' + i, { type: 'arrange', title: 'Build the sentence', instruction: 'Arrange the Dutch words to match the English.', ...example, accept, grammar });
  });
  // Keep this page's ID and vocabulary encounter while bringing the workload
  // to 250 answers: 248 drill answers and two sentence arrangements.
  add('arrange-2', { type: 'grammar', title: 'Say the sentence aloud', instruction: 'Read, listen and say the complete sentence aloud.',
    body: ['Notice the word order and any articles or verb endings. Say the sentence once more without looking.'],
    examples: [module.entries[Math.min(16, count - 1)].examples[1]], grammar,
  });
  add('last-look', { type: 'grammar', title: 'One last grammar check', body: module.reminders, grammar,
    examples: [module.entries[7].examples[1], module.entries[Math.min(18, count - 1)].examples[1]],
  });
  add('complete', { type: 'complete', title: `${count === 20 ? 'Twenty' : count} words, ready to revisit`, instruction: `You have practised ${count === 20 ? 'twenty' : count} vocabulary entries in context. Use A little review to bring them back after a break.` });
  return steps;
}
