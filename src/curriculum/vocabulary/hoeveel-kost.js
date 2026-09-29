/** Lesson 21 — extra vocabulary: months, dates and renting a flat. */
const month = (id, english) => ({ id, dutch: id, english, image: 'calendar' });
export default {
  words: [
    month('januari', 'January'), month('februari', 'February'), month('maart', 'March'), month('april', 'April'),
    month('mei', 'May'), month('juni', 'June'), month('juli', 'July'), month('augustus', 'August'),
    month('september', 'September'), month('oktober', 'October'), month('november', 'November'), month('december', 'December'),
    { id: 'datum', dutch: 'datum', article: 'de', english: 'date', image: 'calendar', forms: ['data'] },
    { id: 'contract', dutch: 'contract', article: 'het', english: 'contract', forms: ['contracten', 'huurcontract'] },
    { id: 'waarborg', dutch: 'waarborg', article: 'de', english: 'deposit (Belgium; NL: borg)' },
    { id: 'badkamer', dutch: 'badkamer', article: 'de', english: 'bathroom', forms: ['badkamers'] },
    { id: 'slaapkamer', dutch: 'slaapkamer', article: 'de', english: 'bedroom', forms: ['slaapkamers'] },
    { id: 'woonkamer', dutch: 'woonkamer', article: 'de', english: 'living room', image: 'living-room', forms: ['woonkamers'] },
    { id: 'per', dutch: 'per', english: 'per / a (per maand)' },
    { id: 'ongeveer', dutch: 'ongeveer', english: 'about / roughly' },
    { id: 'cent', dutch: 'cent', article: 'de', english: 'cent (vijftig cent — no plural after a number)', image: 'money', forms: ['centen'] },
    { id: 'geboren', dutch: 'geboren', english: 'born (Ik ben geboren op …)' },
    { id: 'tekenen', dutch: 'tekenen', english: 'to sign (a contract) / to draw', forms: ['teken', 'tekent', 'getekend', 'tekende', 'tekenden'] },
    { id: 'keer', dutch: 'keer', article: 'de', english: 'time, occasion (twee keer: twice · de eerste keer)', forms: ['keren'] },
    { id: 'ander', dutch: 'ander', english: 'other / different (een ander huis, de andere kamer)', forms: ['andere'] },
    { id: 'genoeg', dutch: 'genoeg', english: 'enough' },
    { id: 'hoog', dutch: 'hoog', english: 'high', forms: ['hoge', 'hoger', 'hogere', 'hoogst', 'hoogste'] },
    { id: 'weinig', dutch: 'weinig', english: 'little / few (the opposite of veel)' },
    { id: 'ticket', dutch: 'ticket', article: 'het', english: 'ticket (Belgium; NL also: kaartje)', image: 'train', forms: ['tickets', 'treinticket', 'treintickets'] },
    { id: 'internet', dutch: 'internet', article: 'het', english: 'the internet (op internet: online)' },
  ],
  // “De hoeveelste is het vandaag?” — what is the date today? (welke only arrives in lesson 24)
  forms: { hoeveel: ['hoeveelste'] },
};
