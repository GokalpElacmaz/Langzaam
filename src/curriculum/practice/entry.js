import { wordIllustration } from './art.js';

/** Authored meanings and contexts; inflections are forms of one vocabulary entry. */
export function entry(id, article, english, first, second, details = {}) {
  return {
    word: { id, dutch: id, english, ...(article ? { article } : {}), ...(wordIllustration(id) ? { image: wordIllustration(id) } : {}), forms: [], ...details },
    examples: [first, second].map(([nl, en, accept = []]) => ({ nl, en, accept })),
  };
}

export const line = (nl, en) => ({ nl, en });
export const question = (nl, answer, en, accept = []) => ({ nl, answer, en, accept,
  task: 'Answer in a full sentence using the noun or names from the question. Include Ja or Nee for a yes/no question.',
});
