/**
 * Assembles the book: the curriculum plan (src/curriculum/plan.js) plus one
 * authored file of pages per lesson (src/curriculum/lessons/*). Everything the
 * app needs that can be derived — tracked words per page, the audio corpus,
 * the vocabulary each lesson may use — is derived here, never hand-maintained.
 * The page schema is documented in docs/CURRICULUM.md.
 */
import { grammarPoints, images, lessonPlan, names, speakerVoices, voices, words as plannedWords } from './curriculum/plan.js';
import { fillBlank, stripMarkup, tokenize } from './curriculum/text.js';
import lesson1 from './curriculum/lessons/01-wat-is-dit.js';
import lesson2 from './curriculum/lessons/02-ik-ben.js';
import lesson3 from './curriculum/lessons/03-ik-woon.js';
import lesson4 from './curriculum/lessons/04-ik-heb.js';
import lesson5 from './curriculum/lessons/05-ik-lees.js';
import lesson6 from './curriculum/lessons/06-vandaag.js';
import lesson7 from './curriculum/lessons/07-twee-katten.js';
import lesson8 from './curriculum/lessons/08-mijn-familie.js';
import lesson9 from './curriculum/lessons/09-ik-kan.js';
import lesson10 from './curriculum/lessons/10-op-maandag.js';
import lesson11 from './curriculum/lessons/11-gisteren.js';
import lesson12 from './curriculum/lessons/12-omdat.js';
import lesson13 from './curriculum/lessons/13-ik-sta-op.js';
import lesson14 from './curriculum/lessons/14-groter.js';
import lesson15 from './curriculum/lessons/15-toen.js';
import lesson16 from './curriculum/lessons/16-ik-voel-me.js';
import lesson17 from './curriculum/lessons/17-volgende-zomer.js';
import lesson18 from './curriculum/lessons/18-die-dat.js';

export { grammarPoints, images, names, voices };
const authored = { 'wat-is-dit': lesson1, 'ik-ben': lesson2, 'ik-woon': lesson3, 'ik-heb': lesson4, 'ik-lees': lesson5, vandaag: lesson6, 'twee-katten': lesson7, 'mijn-familie': lesson8, 'ik-kan': lesson9, 'op-maandag': lesson10, gisteren: lesson11, omdat: lesson12, 'ik-sta-op': lesson13, groter: lesson14, toen: lesson15, 'ik-voel-me': lesson16, 'volgende-zomer': lesson17, 'die-dat': lesson18 };

const lessonOf = Object.fromEntries(lessonPlan.flatMap((lesson) => [...lesson.targets, ...lesson.structure].map((id) => [id, lesson.id])));
export const words = plannedWords.map((word) => ({ ...word, lessonId: lessonOf[word.id] }));
export const wordById = Object.fromEntries(words.map((word) => [word.id, word]));

/** Every written form → its word id (“woont” → “wonen”). */
export const formToWord = Object.fromEntries(words.flatMap((word) => [
  word.dutch, ...(word.forms || []), ...Object.values(word.laterForms || {}).flat(),
].map((form) => [form.toLowerCase(), word.id])));

const nameSet = new Set(names.map((name) => name.toLowerCase()));

/** Word ids behind a Dutch text; names and unknown tokens are ignored. */
export function wordsIn(...texts) {
  return [...new Set(texts.flatMap((text) => tokenize(text ?? ''))
    .map((token) => token.toLowerCase().replace(/^eén$/u, 'één'))
    .filter((token) => !nameSet.has(token))
    .map((token) => formToWord[token])
    .filter(Boolean))];
}

/** What a drill item shows, what the learner answers, and what is spoken afterwards. */
export function itemModel(item, step = {}) {
  const choices = item.choices || step.choices || null;
  const answer = item.listen && !item.answer ? item.listen : item.answer;
  const blank = item.nl?.includes('___');
  const kind = item.listen ? 'listen' : item.label ? 'row' : blank ? 'cloze' : item.nl ? 'transform' : item.en ? 'translate' : 'picture';
  const spoken = item.listen || (item.label ? `${item.label} ${answer}` : blank ? item.nl.replace('___', answer) : kind === 'transform' && !choices ? answer : kind === 'translate' || kind === 'picture' ? answer : null);
  return { kind, choices, answer, spoken, task: item.task || step.task };
}

/** The Dutch a single drill item shows or expects, split into what is spoken and what is only checked. */
export function itemTexts(item, sharedChoices = []) {
  const spoken = [];
  const checked = [...(item.choices || []), ...sharedChoices, ...(item.accept || [])];
  if (item.listen) spoken.push(item.listen);
  else if (item.label) spoken.push(`${item.label} ${item.answer}`);
  else if (item.nl?.includes('___')) spoken.push(fillBlank(item.nl, item.answer));
  else if (item.nl) { spoken.push(item.nl); (item.choices || sharedChoices).length ? checked.push(item.answer) : spoken.push(item.answer); }
  else spoken.push(item.answer);
  if (item.cue) checked.push(item.cue);
  return { spoken: spoken.map(stripMarkup), checked };
}

/** All Dutch on a page. `spoken` gets a recording; `checked` is only validated. */
export function stepTexts(step) {
  const spoken = [];
  const checked = [];
  if (step.nl) spoken.push(step.nl);
  for (const card of step.cards || []) spoken.push(card.nl);
  for (const line of step.lines || []) spoken.push(line.nl);
  for (const row of (step.tables || []).flatMap((table) => table.rows)) spoken.push(row.nl);
  for (const example of step.examples || []) spoken.push(example.nl);
  for (const choice of step.type === 'picture' ? step.choices : []) spoken.push(choice.nl);
  checked.push(...(step.distractors || []));
  for (const item of step.items || []) {
    const texts = itemTexts(item, step.choices && step.type === 'drill' ? step.choices : []);
    spoken.push(...texts.spoken); checked.push(...texts.checked);
  }
  return { spoken: spoken.map(stripMarkup), checked: checked.map(stripMarkup) };
}

export const lessons = lessonPlan.map((plan, lessonIndex) => {
  let part = 'Words';
  const steps = (authored[plan.id] || []).map((step, i) => {
    part = step.part || part;
    const texts = stepTexts(step);
    return { ...step, id: step.id || `${plan.id}-${String(i + 1).padStart(2, '0')}`, part, wordIds: wordsIn(...texts.spoken, ...texts.checked) };
  });
  const answers = steps.reduce((sum, step) => sum + (step.type === 'drill' ? step.items.length : ['picture', 'arrange'].includes(step.type) ? 1 : 0), 0);
  return { ...plan, number: lessonIndex + 1, newWordIds: [...plan.targets, ...plan.structure], steps, answers, minutes: Math.round(answers * 0.3 + steps.length * 0.4) };
});
export const lessonById = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson]));

/** Every form a learner may meet by the end of the given lesson, plus names. */
export function allowedForms(lessonIndex) {
  const known = new Set(names.map((name) => name.toLowerCase()));
  const open = new Set(lessonPlan.slice(0, lessonIndex + 1).map((lesson) => lesson.id));
  for (const word of words) {
    const later = Object.entries(word.laterForms || {});
    // A base form listed under laterForms (zijn) unlocks with that lesson, not with the word.
    const baseIsLater = later.some(([, forms]) => forms.includes(word.dutch));
    if (open.has(word.lessonId)) [...(baseIsLater ? [] : [word.dutch]), ...(word.forms || [])].forEach((form) => known.add(form.toLowerCase()));
    for (const [lessonId, forms] of later) if (open.has(lessonId)) forms.forEach((form) => known.add(form.toLowerCase()));
  }
  return known;
}

/** The voice for a text: the speaker's own voice in a dialogue, otherwise a stable pick from the text. */
export function voiceFor(text, speaker) {
  if (speaker && speakerVoices[speaker]) return speakerVoices[speaker];
  const ids = Object.keys(voices);
  const hash = [...String(text)].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 11);
  return ids[hash % ids.length];
}

/** Explicit speech corpus: every word and every spoken Dutch sentence, once. */
export const audioTexts = [...new Set([
  ...words.map((word) => word.dutch),
  ...words.flatMap((word) => word.forms || []),
  ...words.filter((word) => word.article).map((word) => `${word.article} ${word.dutch}`),
  ...lessons.flatMap((lesson) => lesson.steps.flatMap((step) => stepTexts(step).spoken)),
].map((text) => text.trim()).filter(Boolean))];

/** Every recording needed: each text in its default voice, plus dialogue lines in their speaker's voice. */
export const audioClips = [...new Map([
  ...audioTexts.map((text) => [text, voiceFor(text)]),
  ...lessons.flatMap((lesson) => lesson.steps.flatMap((step) => (step.lines || []).filter((line) => line.speaker).map((line) => [stripMarkup(line.nl).trim(), voiceFor(line.nl, line.speaker)]))),
].map(([text, voice]) => [`${voice}|${text}`, { text, voice }])).values()];
