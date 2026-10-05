/** Lesson 22 — extra vocabulary: Tom's work and free time; the er/daar/waar + preposition forms. */
const join = (first, parts) => parts.map((part) => first + part);
const preps = ['op', 'aan', 'mee', 'over', 'voor', 'in', 'bij', 'naar', 'van', 'uit', 'om', 'tegen', 'onder', 'naast', 'achter', 'tussen', 'door', 'zonder'];
export default {
  words: [
    { id: 'zin', dutch: 'zin', article: 'de', english: 'sentence · zin hebben in: to feel like', forms: ['zinnen'] },
    { id: 'lachen', dutch: 'lachen', english: 'to laugh (lachen om)', forms: ['lach', 'lacht', 'gelachen', 'lachte', 'lachten'] },
    { id: 'verpleegkundige', dutch: 'verpleegkundige', article: 'de', english: 'nurse', image: 'nurse', forms: ['verpleegkundigen'] },
    { id: 'dienst', dutch: 'dienst', article: 'de', english: 'shift / service', forms: ['diensten', 'nachtdienst'] },
    { id: 'programma', dutch: 'programma', article: 'het', english: 'programme' },
    { id: 'concert', dutch: 'concert', article: 'het', english: 'concert', forms: ['concerten'] },
    { id: 'voetbal', dutch: 'voetbal', article: 'het', english: 'football' },
    { id: 'wedstrijd', dutch: 'wedstrijd', article: 'de', english: 'match / competition', forms: ['wedstrijden'] },
    { id: 'boos', dutch: 'boos', english: 'angry (boos op)', forms: ['boze'] },
    { id: 'trots', dutch: 'trots', english: 'proud (trots op)' },
    { id: 'verliefd', dutch: 'verliefd', english: 'in love (verliefd op)' },
    { id: 'af', dutch: 'af', english: 'off (separable part: afhangen, afspreken)' },
    { id: 'afhangen', dutch: 'afhangen', english: 'to depend (afhangen van: dat hangt ervan af)', forms: ['afhangt', 'afgehangen'] },
    { id: 'taal', dutch: 'taal', article: 'de', english: 'language', forms: ['talen'] },
    { id: 'soms', dutch: 'soms', english: 'sometimes' },
  ],
  // erop, daarop, waarop … (and ermee, daarmee, waarmee: met becomes mee). waarom is its own word (why, lesson 19).
  // daarom and daarnaast are words of their own (that is why; in addition), so daar skips om and naast.
  // “de hele nacht”: heel (very) as an adjective means whole.
  forms: { heel: ['hele'], er: join('er', preps), daar: join('daar', preps.filter((p) => !['om', 'naast'].includes(p))), waar: join('waar', preps.filter((p) => p !== 'om')) },
};
