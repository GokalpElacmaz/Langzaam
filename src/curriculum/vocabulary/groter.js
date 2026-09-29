/** Lesson 14 — extra vocabulary: weather, prices and comparing. */
export default {
  words: [
    { id: 'weer', dutch: 'weer', article: 'het', english: 'weather (het weer) · again' },
    { id: 'zon', dutch: 'zon', article: 'de', english: 'sun', image: 'sun' },
    { id: 'sneeuw', dutch: 'sneeuw', article: 'de', english: 'snow', image: 'snow' },
    { id: 'zo', dutch: 'zo', english: 'so / as (niet zo groot als)' },
    { id: 'prijs', dutch: 'prijs', article: 'de', english: 'price', image: 'price-tags', forms: ['prijzen'] },
    { id: 'sneeuwen', dutch: 'sneeuwen', english: 'to snow (het sneeuwt)', image: 'snow', forms: ['sneeuwt', 'gesneeuwd', 'sneeuwde'] },
    { id: 'schijnen', dutch: 'schijnen', english: 'to shine (de zon schijnt)', image: 'sun', forms: ['schijnt', 'geschenen', 'scheen'] },
    { id: 'buiten', dutch: 'buiten', english: 'outside (naar buiten: out, outside)' },
    { id: 'kosten', dutch: 'kosten', english: 'to cost', image: 'price-tags', forms: ['kost', 'gekost', 'kostte', 'kostten'] },
    { id: 'euro', dutch: 'euro', article: 'de', english: 'euro (drie euro — no plural after a number)' },
    { id: 'minder', dutch: 'minder', english: 'less / fewer (the opposite of meer)' },
    { id: 'slak', dutch: 'slak', article: 'de', english: 'snail', image: 'snail', forms: ['slakken'] },
  ],
  // Comparatives take the adjective -e before a noun: een duurdere jas, het grotere huis.
  forms: {
    groot: ['grotere'], klein: ['kleinere'], oud: ['oudere'], jong: ['jongere'], mooi: ['mooiere'], nieuw: ['nieuwere'],
    duur: ['duurdere'], goedkoop: ['goedkopere'], snel: ['snellere'], langzaam: ['langzamere'], warm: ['warmere'],
    koud: ['koudere'], lang: ['langere'], kort: ['kortere'], makkelijk: ['makkelijkere'], moeilijk: ['moeilijkere'],
    beter: ['betere'], liefst: ['liefste'],
  },
};
