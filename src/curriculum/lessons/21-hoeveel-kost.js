/**
 * Lesson 21 — Hoeveel kost het?
 * Targets: betalen, huren, zoeken, verdienen, sparen, lenen, geld, bedrag, rekening, eigenaar.
 * Structure: dertien … negentien, twintig … negentig, honderd, duizend (with the compounds listed in plan.js),
 * eerste, tweede, derde, vierde (zesde … twaalfde), vijfde, laatste.
 * Extra vocabulary (vocabulary/hoeveel-kost.js): the twelve months, datum, contract, waarborg, badkamer, slaapkamer,
 * woonkamer, per, ongeveer, cent, geboren, tekenen, keer, ander, genoeg, hoog, weinig, ticket, internet — and
 * “hoeveelste” (De hoeveelste is het vandaag?).
 * Grammar: big numbers and prices · dates and ordinals · er with a number (Ik heb er twee).
 * Story: how Tom found and rented his flat near the station — searching, three visits, the owner (de eigenaar,
 * mevrouw Claes, who is never named in a sentence because “mevrouw” arrives in lesson 26), 750 euro per month,
 * a deposit of two months, the contract signed on 1 October; birthdays and prices.
 * Teaching choices: numbers the plan does not list as forms (750, 1425, 2025) are written in digits and only spelled
 * out in the English explanations; dictation uses number words only. “welke datum” waits for lesson 24, so the
 * lesson asks “De hoeveelste is het vandaag?” and “Wat is de datum van vandaag?”.
 */
export default [
  // ——— Words ———
  {
    part: 'Words', type: 'observe', title: 'How Tom found his flat', grammar: ['perfect-hebben', 'er-is-zijn', 'comparative', 'numbers-big'],
    instruction: 'Look and listen. Say every sentence out loud after the voice — twice. The numbers are written in digits; listen to how they sound.',
    cards: [
      { nl: 'Tom verhuist naar Leuven. Hij zoekt een appartement.', en: 'Tom is moving to Leuven. He is looking for a flat.', image: 'moving-boxes' },
      { nl: 'In augustus zoekt hij elke avond op internet.', en: 'In August he searches online every evening.', image: 'phone' },
      { nl: 'In één week bezoekt hij drie appartementen.', en: 'In one week he visits three flats.', image: 'flat' },
      { nl: 'Het eerste appartement is te duur: de huur is 900 euro per maand.', en: 'The first flat is too expensive: the rent is 900 euros a month.', image: 'price-tags' },
      { nl: 'Het tweede is goedkoper, maar het heeft maar één kamer.', en: 'The second is cheaper, but it has only one room.', image: 'house-small' },
      { nl: 'Het derde appartement is bij het station, op de tweede verdieping.', en: 'The third flat is near the station, on the second floor.', image: 'station' },
      { nl: 'De eigenaar is een vrouw. Zij heeft de sleutels.', en: 'The owner is a woman. She has the keys.', image: 'landlady' },
      { nl: 'Tom huurt het appartement. Hij betaalt 750 euro per maand.', en: 'Tom rents the flat. He pays 750 euros a month.', image: 'landlady' },
      { nl: 'Tom verdient genoeg geld: ongeveer 2000 euro per maand.', en: 'Tom earns enough money: about 2,000 euros a month.', image: 'money' },
      { nl: 'Op 1 oktober tekent hij het contract.', en: 'On 1 October he signs the contract.', image: 'form' },
    ],
    note: 'zoeken = to look for (no “for” in Dutch: ik zoek een appartement). op internet = online. huren = to rent; de huur = the rent (the same spelling as “ik huur”). de eigenaar = the owner (here: the landlady). per maand = a month, per month. ongeveer = about. genoeg = enough. het contract, tekenen = to sign (a contract) — tekenen also means to draw. Numbers above twelve are written in digits, as Dutch does; this lesson teaches how to say them.',
  },
  {
    type: 'observe', title: 'Money', grammar: ['object-pronouns', 'van-voor-bij', 'comparative', 'numbers-big'],
    instruction: 'Money words. Listen for the difference between lenen van (borrow from) and someone + lenen (lend to).',
    cards: [
      { nl: 'Dit is geld: euro en cent.', en: 'This is money: euros and cents.', image: 'money' },
      { nl: 'Een koffie kost 3 euro. Bram betaalt de koffie.', en: 'A coffee costs 3 euros. Bram pays for the coffee.', image: 'coffee' },
      { nl: 'Na het eten betaalt Lotte de rekening.', en: 'After the meal Lotte pays the bill.', image: 'woman-buying' },
      { nl: 'Bram verdient meer dan Lotte. Zij is student en verdient weinig.', en: 'Bram earns more than Lotte. She is a student and earns little.', image: 'man-working' },
      { nl: 'Bram en Lotte sparen voor de reis naar Spanje.', en: 'Bram and Lotte are saving for the trip to Spain.', image: 'plane' },
      { nl: 'Elke maand sparen ze 200 euro.', en: 'Every month they save 200 euros.', image: 'money' },
      { nl: 'Tom heeft niet genoeg geld voor de waarborg.', en: 'Tom doesn’t have enough money for the deposit.', image: 'money' },
      { nl: 'Lotte leent hem 500 euro. Tom leent 500 euro van Lotte.', en: 'Lotte lends him 500 euros. Tom borrows 500 euros from Lotte.', image: 'money' },
      { nl: 'Het bedrag van de waarborg is hoog: 1500 euro.', en: 'The amount of the deposit is high: 1,500 euros.', image: 'money' },
      { nl: 'De waarborg staat op een rekening op naam van Tom.', en: 'The deposit is in an account in Tom’s name.', image: 'landlady' },
    ],
    note: 'het geld is a het-word with no plural. betalen = to pay. de rekening = the bill, and also the (bank) account: de bankrekening. het bedrag = the amount (of money), de bedragen. verdienen = to earn; sparen = to save; lenen = to borrow AND to lend. weinig = little, few — the opposite of veel. hoog = high: een hoge huur. de waarborg = the deposit (Belgian; in the Netherlands de borg). In Belgium the deposit goes into an account in the tenant’s name — “op naam van Tom”.',
  },
  {
    type: 'observe', title: 'Months, dates and birthdays', grammar: ['dates', 'days-op-om', 'er-quantity', 'indirect-object'],
    instruction: 'The twelve months, first and second, and when everyone has a birthday. Months have no capital in Dutch.',
    cards: [
      { nl: 'januari, februari, maart, april, mei, juni', en: 'January, February, March, April, May, June', image: 'calendar' },
      { nl: 'juli, augustus, september, oktober, november, december', en: 'July, August, September, October, November, December', image: 'calendar' },
      { nl: 'Bram is op 14 maart jarig. Dit jaar is dat een zaterdag.', en: 'Bram’s birthday is on 14 March. This year that is a Saturday.', image: 'birthday' },
      { nl: 'Voor zijn verjaardag krijgt hij een cadeau van Lotte, en hij geeft een feest.', en: 'For his birthday he gets a present from Lotte, and he throws a party.', image: 'gift' },
      { nl: 'Lotte is in oktober geboren.', en: 'Lotte was born in October.', image: 'birthday' },
      { nl: 'De hoeveelste is het vandaag? — Het is de eerste oktober.', en: 'What’s the date today? — It is the first of October.', image: 'calendar' },
      { nl: 'Het appartement heeft een woonkamer, een slaapkamer, een keuken en een badkamer.', en: 'The flat has a living room, a bedroom, a kitchen and a bathroom.', image: 'living-room' },
      { nl: 'Hoeveel slaapkamers heeft het? — Het heeft er één.', en: 'How many bedrooms does it have? — It has one.', image: 'flat' },
      { nl: 'Tom heeft het appartement twee keer bezocht.', en: 'Tom visited the flat twice.', image: 'flat' },
      { nl: 'Het eerste appartement was te duur; de andere twee waren goedkoper.', en: 'The first flat was too expensive; the other two were cheaper.', image: 'price-tags' },
    ],
    note: 'de datum = the date. jarig zijn = to have your birthday (that day); geboren = born: Ik ben in oktober geboren. eerste, tweede, derde = first, second, third. “De hoeveelste is het?” = what’s the date? (literally “the how-manieth”). de woonkamer, de slaapkamer, de badkamer: living room, bedroom, bathroom — all de-words, like de kamer. de keer = the time, the occasion: twee keer = twice. ander / andere = other. “Het heeft er één”: er stands for the noun that is left out — the grammar pages explain it.',
  },
  {
    type: 'picture', title: 'Read and point', grammar: ['numbers-big'],
    instruction: 'Read the sentence and choose its picture.',
    nl: 'Tom betaalt de huur met geld van zijn rekening.', en: 'Tom pays the rent with money from his account.', answer: 'money',
    choices: [{ image: 'money', nl: 'geld' }, { image: 'calendar', nl: 'een kalender' }, { image: 'price-tags', nl: 'twee jassen' }, { image: 'moving-boxes', nl: 'dozen' }],
  },
  {
    type: 'picture', listen: true, title: 'Listen and point', grammar: ['present-regular'],
    instruction: 'Listen without reading. Who is it?',
    nl: 'De eigenaar van het appartement geeft Tom de sleutels.', en: 'The owner of the flat gives Tom the keys.', answer: 'landlady',
    choices: [{ image: 'landlady', nl: 'de eigenaar' }, { image: 'old-woman', nl: 'de buurvrouw' }, { image: 'doctor', nl: 'de dokter' }, { image: 'woman-buying', nl: 'Lotte in de winkel' }],
  },
  {
    type: 'picture', listen: true, title: 'Once more, by ear', grammar: ['dates'],
    instruction: 'Listen. What do you see?',
    nl: 'Lotte kijkt welke dag het is: het is de eerste oktober.', en: 'Lotte checks what day it is: it is the first of October.', answer: 'calendar',
    choices: [{ image: 'clock', nl: 'een klok' }, { image: 'calendar', nl: 'een kalender' }, { image: 'money', nl: 'geld' }, { image: 'flat', nl: 'een appartement' }],
  },
  {
    type: 'drill', title: 'Write the words', grammar: ['de-het', 'plural'],
    instruction: 'Type the Dutch. Nouns with their article.',
    items: [
      { image: 'money', en: 'the money', answer: 'het geld' },
      { en: 'the amount', answer: 'het bedrag' },
      { en: 'the amounts', answer: 'de bedragen' },
      { en: 'the bill / the account', answer: 'de rekening' },
      { en: 'the bills', answer: 'de rekeningen' },
      { image: 'landlady', en: 'the owner', answer: 'de eigenaar' },
      { en: 'the owners', answer: 'de eigenaars' },
      { en: 'the rent', answer: 'de huur' },
      { image: 'form', en: 'the contract', answer: 'het contract' },
      { en: 'the deposit (Belgium)', answer: 'de waarborg' },
      { en: 'the bedroom', answer: 'de slaapkamer' },
      { en: 'the bathroom', answer: 'de badkamer' },
      { image: 'living-room', en: 'the living room', answer: 'de woonkamer' },
      { image: 'calendar', en: 'the date', answer: 'de datum' },
      { image: 'train', en: 'the ticket', answer: 'het ticket' },
    ],
    explanation: 'Four het-words: het geld, het bedrag, het contract, het ticket. Everything else is a de-word — every -kamer word takes de, because the last part of a compound decides. bedrag → bedragen: the a stays short, so one g is enough before -en? No: dra-gen already has an open syllable, which makes the a long; bedrag has a short a … in the plural the g simply follows: be-dra-gen. Learn it by ear. eigenaar → eigenaars, with -s.',
  },
  {
    type: 'drill', title: 'Hear and spell', grammar: ['numbers-big', 'dates'],
    instruction: 'Play each one and type it. Numbers are written in words here.',
    items: [
      { listen: 'dertien' },
      { listen: 'veertig' },
      { listen: 'tachtig' },
      { listen: 'augustus' },
      { listen: 'de eigenaar' },
      { listen: 'Hoeveel kost het?' },
      { listen: 'Ik betaal de rekening.' },
      { listen: 'Het heeft er twee.' },
    ],
    explanation: 'dertien with er (not drie), veertig with ee (not vier), tachtig with a t at the front. augustus: au-GUS-tus. eigenaar: EI-ge-naar — the ei of trein.',
  },
]
