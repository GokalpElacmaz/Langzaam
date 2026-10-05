/** Pure text helpers shared by the app, the validator and the audio script. */

/** Grammar pages may mark an ending with brackets: “hij woon[t]”. */
export const stripMarkup = (text) => String(text).replace(/[[\]]/g, '');

/** Keep internal apostrophes in words such as paprika's; ignore surrounding punctuation. */
export const tokenize = (text) => stripMarkup(text).replace(/’/gu, "'").match(/\p{L}+(?:'\p{L}+)*/gu) || [];

/** Put the answer into the blank of a cloze prompt. */
export const fillBlank = (text, answer) => stripMarkup(text).replace('___', answer);

/** Ignore casing, accents (één = een), punctuation and extra whitespace, but preserve spelling and word order. */
export function normalizeAnswer(value) {
  return String(value).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('nl-NL')
    .replace(/[.,!?;:“”"'‘’]/gu, '')
    .replace(/\s+/gu, ' ').trim();
}

/** Full and reduced subject pronouns are interchangeable in answers: jij/je, zij/ze, wij/we. */
const pronounPairs = { jij: 'je', je: 'jij', zij: 'ze', ze: 'zij', wij: 'we', we: 'wij' };
export function answerVariants(answer) {
  let variants = [normalizeAnswer(answer)];
  const tokens = variants[0].split(' ');
  tokens.forEach((token, i) => {
    if (!pronounPairs[token]) return;
    variants = variants.flatMap((variant) => {
      const parts = variant.split(' ');
      parts[i] = pronounPairs[token];
      return [variant, parts.join(' ')];
    });
  });
  return [...new Set(variants)];
}

export function isAnswerCorrect(actual, expected, accept = []) {
  const given = normalizeAnswer(actual);
  if (!given) return false;
  return [expected, ...accept].some((option) => answerVariants(option).includes(given));
}

/** Deterministic shuffle so a page looks the same on every visit. */
export function seededShuffle(list, seedText) {
  let seed = [...seedText].reduce((hash, ch) => (hash * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; };
  const result = [...list];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
