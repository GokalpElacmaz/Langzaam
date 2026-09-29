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
  ],
};
