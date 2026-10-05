/**
 * Lesson 28 — De baan waarvoor ik solliciteer.
 * Targets: solliciteren, vacature, ervaring, opleiding, diploma, functie, geschikt, beschrijven, motivatie, cv.
 * Structure: geachte.
 * Extra vocabulary (vocabulary/sollicitatie.js): taal, vriendelijk, groet, bijlage, ingenieur, elektrisch, ontwerpen,
 * kennis, computer, enthousiast.
 * Grammar: a preposition in a relative clause (waarvoor, waarmee …; met wie, aan wie) · wat after alles / iets / niets
 * and a superlative, waar for places · a formal letter (Geachte mevrouw …, u / uw, Met vriendelijke groeten).
 * Story: the vacancy at a small Leuven company that designs electric bikes (engineer). Bram reads it, updates his CV
 * and writes a motivation letter with Lotte's help to the contact person, mevrouw Janssens. The joke: Bram has
 * never had a bike.
 */
import { listenPages, recallPages } from '../review-pages.js';

export default [
  // ——— Words ———
  {
    part: 'Words', type: 'observe', title: 'De vacature', grammar: ['relative-preposition', 'relative-wat-waar', 'formal-letter', 'relative-clause'],
    instruction: 'Bram has found a vacancy. Look and listen, and say every sentence out loud after the voice — twice. Listen for waar + a preposition.',
    cards: [
      { nl: 'Een klein bedrijf in Leuven ontwerpt elektrische fietsen.', en: 'A small company in Leuven designs electric bikes.', image: 'bike' },
      { nl: 'Het bedrijf heeft een vacature: het zoekt een ingenieur.', en: 'The company has a vacancy: it is looking for an engineer.', image: 'practice-bedrijf' },
      { nl: 'Dit is de baan waarvoor Bram solliciteert.', en: 'This is the job Bram is applying for.', image: 'man-laptop' },
      { nl: 'De vacature beschrijft de functie: wat moet de ingenieur doen?', en: 'The vacancy describes the position: what must the engineer do?', image: 'man-reading' },
      { nl: 'Bram heeft een diploma van de universiteit en vijf jaar ervaring.', en: 'Bram has a university degree and five years of experience.', image: 'university' },
      { nl: 'Zijn opleiding is goed, en hij is geschikt voor de functie.', en: 'His education is good, and he is suitable for the position.', image: 'man-working' },
      { nl: 'Bram schrijft zijn cv: alles wat hij gedaan en geleerd heeft.', en: 'Bram writes his CV: everything he has done and learnt.', image: 'man-laptop' },
      { nl: 'In zijn motivatiebrief schrijft hij waarom hij de baan wil.', en: 'In his motivation letter he writes why he wants the job.', image: 'man-writing' },
      { nl: 'Mevrouw Janssens is de vrouw aan wie hij schrijft.', en: 'Mrs Janssens is the woman he is writing to.', image: 'woman-working' },
      { nl: 'Geachte mevrouw Janssens, … Met vriendelijke groeten, Bram Claes', en: 'Dear Mrs Janssens, … Kind regards, Bram Claes', image: 'practice-brief' },
    ],
    note: 'solliciteren = to apply for a job (gesolliciteerd; de sollicitatie = the application). de vacature = vacancy; de functie = position; de ervaring = experience; de opleiding = education, training; het diploma = degree certificate; het cv = CV; de motivatie = motivation (de motivatiebrief). geschikt = suitable; beschrijven = to describe (beschreef, beschreven). ontwerpen = to design; elektrisch = electric; de ingenieur = engineer. waarvoor = for which; aan wie = to whom; alles wat = everything that. Geachte … = Dear … (formal).',
  },
  {
    type: 'observe', title: 'What the company wants', grammar: ['relative-preposition', 'relative-wat-waar', 'formal-u'],
    instruction: 'The vacancy and the letter: more words you need when you look for work.',
    cards: [
      { nl: 'Wij zoeken een enthousiaste ingenieur.', en: 'We are looking for an enthusiastic engineer.', image: 'practice-bedrijf' },
      { nl: 'U heeft kennis van computers en van fietsen.', en: 'You have knowledge of computers and of bikes.', image: 'man-laptop' },
      { nl: 'U spreekt minstens twee talen: Nederlands en Engels.', en: 'You speak at least two languages: Dutch and English.', image: 'students' },
      { nl: 'U bent vriendelijk en werkt graag in een klein team.', en: 'You are friendly and like working in a small team.', image: 'colleagues' },
      { nl: 'Stuur uw cv en uw motivatiebrief naar mevrouw Janssens.', en: 'Send your CV and your motivation letter to Mrs Janssens.', image: 'woman-working' },
      { nl: 'Het cv zit in de bijlage van de mail.', en: 'The CV is in the attachment to the email.', image: 'man-laptop' },
      { nl: 'De computer waarmee Bram werkt, is oud.', en: 'The computer Bram works with is old.', image: 'man-laptop' },
      { nl: 'Leuven is de stad waar Bram wil werken.', en: 'Leuven is the city where Bram wants to work.', image: 'city' },
      { nl: 'Het enige wat Bram niet heeft, is een fiets!', en: 'The only thing Bram doesn’t have is a bike!', image: 'man-happy' },
    ],
    note: 'enthousiast = enthusiastic; de kennis = knowledge (kennis van); de taal, de talen = language; vriendelijk = friendly; de bijlage = attachment; de computer. minstens = at least. de groet = greeting: Met vriendelijke groeten = Kind regards. waarmee = with which; waar = where; het enige wat = the only thing that.',
  },
  {
    type: 'picture', title: 'Read and point', grammar: ['relative-preposition'],
    instruction: 'Read the sentence and choose its picture.',
    nl: 'Dit is het bedrijf waar Bram wil werken: het ontwerpt fietsen.', en: 'This is the company where Bram wants to work: it designs bikes.', answer: 'bike',
    choices: [{ image: 'car', nl: 'een auto' }, { image: 'bike', nl: 'een fiets' }, { image: 'train', nl: 'een trein' }, { image: 'plane', nl: 'een vliegtuig' }],
  },
  {
    type: 'picture', listen: true, title: 'Listen and point', grammar: ['relative-preposition'],
    instruction: 'Listen without reading. What is Bram writing with?',
    nl: 'De computer waarmee Bram zijn cv schrijft, is oud.', en: 'The computer Bram is writing his CV with is old.', answer: 'man-laptop',
    choices: [{ image: 'man-laptop', nl: 'een computer' }, { image: 'phone', nl: 'een telefoon' }, { image: 'book', nl: 'een boek' }, { image: 'man-writing', nl: 'een pen' }],
  },
  {
    type: 'picture', listen: true, title: 'Once more, by ear', grammar: ['relative-preposition', 'formal-letter'],
    instruction: 'Listen. Who is Bram writing to?',
    nl: 'Mevrouw Janssens is de vrouw aan wie Bram zijn brief stuurt.', en: 'Mrs Janssens is the woman Bram is sending his letter to.', answer: 'woman-working',
    choices: [{ image: 'woman', nl: 'Lotte' }, { image: 'old-woman', nl: 'oma' }, { image: 'woman-working', nl: 'mevrouw Janssens' }, { image: 'nurse', nl: 'de verpleegster' }],
  },
  {
    type: 'drill', title: 'Write the words', grammar: ['de-het', 'plural'],
    instruction: 'Type the Dutch. Nouns with their article.',
    items: [
      { en: 'the vacancy', answer: 'de vacature' },
      { en: 'the vacancies', answer: 'de vacatures' },
      { en: 'the experience', answer: 'de ervaring' },
      { en: 'the education, training', answer: 'de opleiding' },
      { en: 'the degree certificate', answer: 'het diploma' },
      { en: 'the position, job', answer: 'de functie' },
      { image: 'man-laptop', en: 'the CV', answer: 'het cv' },
      { en: 'the motivation', answer: 'de motivatie' },
      { en: 'the motivation letter', answer: 'de motivatiebrief' },
      { en: 'the engineer', answer: 'de ingenieur' },
      { en: 'the language', answer: 'de taal' },
      { en: 'the languages', answer: 'de talen' },
      { en: 'the knowledge', answer: 'de kennis' },
      { en: 'the attachment', answer: 'de bijlage' },
      { en: 'suitable', answer: 'geschikt' },
      { en: 'enthusiastic', answer: 'enthousiast' },
    ],
    explanation: 'het diploma and het cv are het-words; the -ing nouns (ervaring, opleiding) and the -tie nouns (functie, motivatie) are de-words. taal → talen: one a.',
  },
  {
    type: 'drill', title: 'Hear and spell', grammar: ['relative-preposition', 'formal-letter'],
    instruction: 'Play each one and type it.',
    items: [
      { listen: 'de vacature' },
      { listen: 'solliciteren' },
      { listen: 'de ingenieur' },
      { listen: 'de baan waarvoor ik solliciteer' },
      { listen: 'Geachte mevrouw Janssens' },
      { listen: 'Met vriendelijke groeten' },
      { listen: 'elektrische fietsen' },
      { listen: 'enthousiast' },
    ],
    explanation: 'sol-li-ci-TEE-ren: c sounds like s. in-ge-NIEUR, va-ca-TU-re, en-thou-si-AST: words from French. ge-ACH-te.',
  },

  // ——— Grammar: target verbs ———
  {
    part: 'Grammar', type: 'grammar', title: 'Applying, describing, designing', grammar: ['present-regular', 'imperfect-weak', 'imperfect-strong', 'participle', 'participle-no-ge', 'verb-preposition'],
    body: [
      '**solliciteren** (to apply for a job) is weak and regular: *ik solliciteer, hij solliciteert; solliciteerde; heeft **gesolliciteerd***. You apply **voor** or **naar** a job — in Belgium mostly *voor*, in the Netherlands *naar* — and **bij** a company: *Bram solliciteert **voor** de functie van ingenieur **bij** een bedrijf in Leuven.* The application is **de sollicitatie**.',
      '**beschrijven** (to describe) goes like schrijven, without ge-: *beschrijft; **beschreef**; heeft **beschreven***. **ontwerpen** (to design) is strong and has no ge- either: *ontwerpt; **ontwierp**; heeft **ontworpen***.',
      '**geschikt** (suitable) takes **voor**: *Bram is **geschikt voor** de functie.* **kennis** takes **van**: *kennis **van** computers*. **ervaring** takes **met** or **in**: *ervaring **met** fietsen*, *vijf jaar ervaring*.',
    ],
    tables: [
      { caption: 'The forms', rows: [
        { nl: 'solliciteren — solliciteer[de] — heeft ge[solliciteerd]', en: 'apply' },
        { nl: 'beschrijven — [beschreef] — heeft [beschreven]', en: 'describe' },
        { nl: 'ontwerpen — [ontwierp] — heeft [ontworpen]', en: 'design' },
      ] },
      { caption: 'Words with their preposition', rows: [
        { nl: 'solliciteren [voor] / [naar] een functie, [bij] een bedrijf', en: 'apply for a job, at a company' },
        { nl: 'geschikt [voor]', en: 'suitable for' },
        { nl: 'kennis [van]', en: 'knowledge of' },
        { nl: 'ervaring [met]', en: 'experience with' },
      ] },
    ],
    examples: [
      { nl: 'Bram heeft bij een bedrijf in Leuven gesolliciteerd.', en: 'Bram has applied at a company in Leuven.' },
      { nl: 'Kunt u uw ervaring beschrijven?', en: 'Can you describe your experience?' },
      { nl: 'Het bedrijf heeft een nieuwe fiets ontworpen.', en: 'The company has designed a new bike.' },
    ],
  },
  {
    type: 'drill', layout: 'table', title: 'The verbs of applying', grammar: ['present-regular', 'imperfect-weak', 'imperfect-strong', 'participle-no-ge', 'participle'],
    instruction: 'Type the form the small word asks for.',
    items: [
      { label: 'ik', gloss: 'solliciteren', answer: 'solliciteer' },
      { label: 'Bram', gloss: 'he · solliciteren', answer: 'solliciteert' },
      { label: 'solliciteren', gloss: 'past, one', answer: 'solliciteerde' },
      { label: 'solliciteren', gloss: 'participle', answer: 'gesolliciteerd' },
      { label: 'de vacature', gloss: 'it · beschrijven', answer: 'beschrijft' },
      { label: 'beschrijven', gloss: 'past, one', answer: 'beschreef' },
      { label: 'beschrijven', gloss: 'participle', answer: 'beschreven' },
      { label: 'het bedrijf', gloss: 'it · ontwerpen', answer: 'ontwerpt' },
      { label: 'ontwerpen', gloss: 'past, one', answer: 'ontwierp' },
      { label: 'ontwerpen', gloss: 'participle', answer: 'ontworpen' },
    ],
    explanation: 'solliciteer: the long ee of solliciteren. gesolliciteerd: an ordinary weak participle. beschreef, beschreven and ontwierp, ontworpen: strong, and no ge- after be- and ont-.',
  },
  {
    type: 'drill', title: 'Applying in sentences', grammar: ['verb-preposition', 'perfect-hebben', 'adjective-e', 'participle-no-ge'],
    instruction: 'Type the missing word.',
    items: [
      { nl: 'Bram solliciteert ___ de functie van ingenieur.', en: 'for (Belgium)', answer: 'voor', accept: ['naar'] },
      { nl: 'Hij solliciteert ___ een bedrijf in Leuven.', en: 'at a company', answer: 'bij' },
      { nl: 'Bram is geschikt ___ de functie.', answer: 'voor' },
      { nl: 'Hij heeft kennis ___ computers.', answer: 'van' },
      { nl: 'Hij heeft vijf jaar ___.', en: 'five years of experience', answer: 'ervaring' },
      { nl: 'Bram heeft ___.', cue: 'solliciteren', answer: 'gesolliciteerd' },
      { nl: 'De vacature ___ de functie.', cue: 'beschrijven', answer: 'beschrijft' },
      { nl: 'Het bedrijf heeft een nieuwe fiets ___.', cue: 'ontwerpen', answer: 'ontworpen' },
      { nl: 'Wij zoeken een ___ ingenieur.', cue: 'enthousiast', answer: 'enthousiaste' },
      { nl: 'Het bedrijf maakt ___ fietsen.', cue: 'elektrisch', answer: 'elektrische' },
      { nl: 'Bram is de ___ man voor deze baan.', cue: 'geschikt', answer: 'geschikte' },
      { nl: 'Mevrouw Janssens is heel ___.', cue: 'vriendelijk', answer: 'vriendelijk' },
    ],
    explanation: 'solliciteren voor (or naar) a job, bij a company; geschikt voor; kennis van. een enthousiaste ingenieur, elektrische fietsen: -e before the noun; after is no -e: Zij is vriendelijk.',
  },

  // ——— Grammar: relative clauses with a preposition ———
  {
    type: 'grammar', title: 'De baan waarvoor ik solliciteer', grammar: ['relative-preposition', 'relative-clause', 'waar-preposition', 'er-preposition', 'verb-preposition', 'verb-final'],
    body: [
      'You know relative clauses with **die** and **dat** (lesson 18): *de baan **die** ik wil*. But what if the verb needs a preposition — *solliciteren **voor***, *werken **met***, *schrijven **aan***? English moves the preposition to the end (*the job I’m applying **for***). Dutch puts it **at the front of the clause**, and then die and dat change.',
      'For **things**, die / dat become **waar + preposition**, written as one word: ***waarvoor***, ***waarmee***, ***waarover***, ***waarop***, ***waaraan***. *De baan **waarvoor** ik solliciteer. De computer **waarmee** Bram werkt. Het project **waarover** zij praten.* You know these words from questions (lesson 22: *Waar wacht je op?*). In speech the two parts often split, just as in questions: *de baan **waar** ik **voor** solliciteer.*',
      'For **people**, Dutch uses **preposition + wie**: *de vrouw **met wie** ik praat*, *de collega **aan wie** hij schrijft*, *de man **voor wie** zij werkt*. Never *met die*.',
      'The verb goes to the end of the relative clause, as always, and a comma usually closes it: *De computer **waarmee** Bram werkt, **is** oud.*',
    ],
    tables: [
      { caption: 'Things: waar + preposition', rows: [
        { nl: 'Ik solliciteer voor de baan. → de baan [waarvoor] ik solliciteer', en: 'the job I’m applying for' },
        { nl: 'Bram werkt met de computer. → de computer [waarmee] Bram werkt', en: 'the computer Bram works with' },
        { nl: 'Zij praten over het project. → het project [waarover] zij praten', en: 'the project they talk about' },
        { nl: 'Max wacht op het eten. → het eten [waarop] Max wacht', en: 'the food Max is waiting for' },
      ] },
      { caption: 'People: preposition + wie', rows: [
        { nl: 'Bram schrijft aan de vrouw. → de vrouw [aan wie] Bram schrijft', en: 'the woman Bram is writing to' },
        { nl: 'Lotte werkt met de collega. → de collega [met wie] Lotte werkt', en: 'the colleague Lotte works with' },
      ] },
    ],
    examples: [
      { nl: 'Dat is het bedrijf waarvoor Bram wil werken.', en: 'That is the company Bram wants to work for.' },
      { nl: 'Mevrouw Janssens is de vrouw met wie Bram zal praten.', en: 'Mrs Janssens is the woman Bram will talk to.' },
      { nl: 'De fiets waarover Bram droomt, is elektrisch.', en: 'The bike Bram dreams about is electric.' },
    ],
  },
  {
    type: 'drill', title: 'waar + preposition', grammar: ['relative-preposition', 'verb-preposition', 'waar-preposition'],
    instruction: 'Type the one word: waarvoor, waarmee, waarover, waarop, waaraan or waarvan.',
    items: [
      { nl: 'Dit is de baan ___ Bram solliciteert.', en: 'solliciteren voor', answer: 'waarvoor' },
      { nl: 'De computer ___ Bram werkt, is oud.', en: 'werken met', answer: 'waarmee' },
      { nl: 'Het project ___ zij praten, is groot.', en: 'praten over', answer: 'waarover' },
      { nl: 'Het eten ___ Max wacht, staat op de tafel.', en: 'wachten op', answer: 'waarop' },
      { nl: 'De fiets ___ Bram droomt, is elektrisch.', en: 'dromen van', answer: 'waarvan' },
      { nl: 'Het huis ___ Lotte denkt, staat aan zee.', en: 'denken aan', answer: 'waaraan' },
      { nl: 'De pen ___ Bram schrijft, is blauw.', en: 'schrijven met', answer: 'waarmee' },
      { nl: 'De muziek ___ Lotte luistert, is mooi.', en: 'luisteren naar', answer: 'waarnaar' },
    ],
    explanation: 'The preposition of the verb decides: solliciteren voor → waarvoor, werken met → waarmee, dromen van → waarvan, luisteren naar → waarnaar.',
  },
  {
    type: 'drill', title: 'Join the sentences', grammar: ['relative-preposition', 'relative-clause', 'verb-final'],
    instruction: 'Join the two sentences into one. Use waar + preposition for a thing, preposition + wie for a person.',
    items: [
      { nl: 'Dit is de baan. Bram solliciteert voor de baan.', answer: 'Dit is de baan waarvoor Bram solliciteert.' },
      { nl: 'Dit is de computer. Bram werkt met de computer.', answer: 'Dit is de computer waarmee Bram werkt.' },
      { nl: 'Dit is het bedrijf. Bram droomt van het bedrijf.', answer: 'Dit is het bedrijf waarvan Bram droomt.' },
      { nl: 'Dit is mevrouw Janssens. Bram schrijft aan mevrouw Janssens.', answer: 'Dit is mevrouw Janssens, aan wie Bram schrijft.', accept: ['Dit is mevrouw Janssens aan wie Bram schrijft.'] },
      { nl: 'Dit is de vrouw. Bram zal met de vrouw praten.', answer: 'Dit is de vrouw met wie Bram zal praten.' },
      { nl: 'Dit is de collega. Lotte werkt met de collega.', answer: 'Dit is de collega met wie Lotte werkt.' },
      { nl: 'Dit is de vacature. Lotte heeft over de vacature verteld.', answer: 'Dit is de vacature waarover Lotte verteld heeft.', accept: ['Dit is de vacature waarover Lotte heeft verteld.'] },
      { nl: 'Dit is de man. Bram werkt voor de man.', answer: 'Dit is de man voor wie Bram werkt.' },
    ],
    explanation: 'waarvoor, waarmee, waarvan, waarover for things; aan wie, met wie, voor wie for people. The verb at the end: … waarover Lotte verteld heeft.',
  },
  {
    type: 'drill', title: 'die, dat, waarmee or met wie?', grammar: ['relative-preposition', 'relative-clause', 'de-het'],
    instruction: 'Type the missing word or words.',
    items: [
      { nl: 'De vacature ___ Lotte gevonden heeft, is perfect.', answer: 'die' },
      { nl: 'Het bedrijf ___ fietsen ontwerpt, is klein.', answer: 'dat' },
      { nl: 'De computer ___ Bram werkt, is oud.', answer: 'waarmee' },
      { nl: 'De vrouw ___ Bram praat, heet Janssens.', answer: 'met wie' },
      { nl: 'Het cv ___ Bram geschreven heeft, is goed.', answer: 'dat' },
      { nl: 'De functie ___ Bram solliciteert, is ingenieur.', answer: 'waarvoor' },
      { nl: 'De collega’s ___ Bram zal werken, zijn jong.', answer: 'met wie' },
      { nl: 'De ingenieur ___ zij zoeken, moet Engels spreken.', answer: 'die' },
    ],
    explanation: 'No preposition: die for de-words and plurals, dat for het-words. With a preposition: waar + preposition for things, preposition + wie for people.',
  },
  {
    type: 'arrange', title: 'The job he is applying for', grammar: ['relative-preposition'],
    instruction: 'Build: “This is the job Bram is applying for.” Two tiles are traps.',
    nl: 'Dit is de baan waarvoor Bram solliciteert.', en: 'This is the job Bram is applying for.', image: 'man-laptop', distractors: ['die', 'voor'],
  },

  // ——— Grammar: wat and waar ———
  {
    type: 'grammar', title: 'alles wat, iets wat, de stad waar', grammar: ['relative-wat-waar', 'relative-clause', 'indefinite-pronouns', 'superlative'],
    body: [
      'After **alles, iets, niets** and **het enige** (the only thing), a relative clause starts with **wat**, not dat: *alles **wat** ik geleerd heb* — everything I have learnt; *iets **wat** ik niet weet*; *niets **wat** hij zegt*; *het enige **wat** Bram niet heeft*.',
      'After a **superlative** used as a noun, also **wat**: *het mooiste **wat** ik ooit gezien heb* — no: keep it simple: *Dat is het mooiste **wat** ik ken.* — That is the most beautiful thing I know.',
      'For a **place**, use **waar**: *de stad **waar** Bram wil werken*, *het huis **waar** wij wonen*. It replaces *in / op + which*: *het bedrijf **waar** hij werkt* = *het bedrijf **waarin** hij werkt* — but waar is much more usual. For a **time** you can also use waar or **toen**: *de dag **waarop** Bram zijn brief stuurde*.',
    ],
    tables: [
      { caption: 'wat', rows: [
        { nl: 'alles [wat] Bram geleerd heeft', en: 'everything Bram has learnt' },
        { nl: 'iets [wat] ik niet weet', en: 'something I don’t know' },
        { nl: 'niets [wat] je zegt', en: 'nothing you say' },
        { nl: 'het enige [wat] Bram niet heeft', en: 'the only thing Bram doesn’t have' },
        { nl: 'het mooiste [wat] ik ken', en: 'the most beautiful thing I know' },
      ] },
      { caption: 'waar for a place', rows: [
        { nl: 'de stad [waar] Bram wil werken', en: 'the city where Bram wants to work' },
        { nl: 'het bedrijf [waar] hij werkt', en: 'the company where he works' },
      ] },
    ],
    examples: [
      { nl: 'In zijn cv staat alles wat Bram gedaan heeft.', en: 'His CV contains everything Bram has done.' },
      { nl: 'Is er iets wat u wilt vragen?', en: 'Is there anything you would like to ask?' },
      { nl: 'Leuven is de stad waar Lotte studeert.', en: 'Leuven is the city where Lotte studies.' },
    ],
  },
  {
    type: 'drill', title: 'wat, waar, die or dat?', grammar: ['relative-wat-waar', 'relative-clause', 'indefinite-pronouns'],
    instruction: 'Type the missing word.',
    items: [
      { nl: 'In zijn cv staat alles ___ Bram geleerd heeft.', answer: 'wat' },
      { nl: 'Is er iets ___ u wilt vragen?', answer: 'wat' },
      { nl: 'Er is niets ___ Bram niet kan leren.', answer: 'wat' },
      { nl: 'Het enige ___ Bram niet heeft, is een fiets.', answer: 'wat' },
      { nl: 'Leuven is de stad ___ Bram wil werken.', answer: 'waar' },
      { nl: 'Het huis ___ wij wonen, is klein.', answer: 'waar' },
      { nl: 'Het diploma ___ Bram heeft, is van de universiteit.', answer: 'dat' },
      { nl: 'De ervaring ___ Bram heeft, is groot.', answer: 'die' },
      { nl: 'Dat is het mooiste ___ ik ken.', answer: 'wat' },
      { nl: 'Het bedrijf ___ Bram nu werkt, is in Brussel.', answer: 'waar' },
    ],
    explanation: 'wat after alles, iets, niets, het enige and het mooiste. waar for a place: de stad waar, het huis waar. die / dat after an ordinary noun.',
  },
  {
    type: 'drill', title: 'Say it in Dutch: everything, where, the only thing', grammar: ['relative-wat-waar', 'relative-preposition', 'verb-final', 'perfect-hebben'],
    instruction: 'Translate.',
    items: [
      { en: 'everything Bram has learnt', answer: 'alles wat Bram geleerd heeft', accept: ['alles wat Bram heeft geleerd'] },
      { en: 'Is there anything you would like to ask? (polite)', answer: 'Is er iets wat u wilt vragen?', accept: ['Is er iets wat u wil vragen?'] },
      { en: 'Leuven is the city where Bram wants to work.', answer: 'Leuven is de stad waar Bram wil werken.' },
      { en: 'The only thing Bram doesn’t have is a bike.', answer: 'Het enige wat Bram niet heeft, is een fiets.' },
      { en: 'the job Bram is applying for', answer: 'de baan waarvoor Bram solliciteert', accept: ['de baan waar Bram voor solliciteert'] },
      { en: 'the woman Bram is writing to', answer: 'de vrouw aan wie Bram schrijft' },
    ],
    explanation: 'alles wat, iets wat, het enige wat; de stad waar; waarvoor for a thing, aan wie for a person.',
  },

  // ——— Grammar: a formal letter ———
  {
    type: 'grammar', title: 'A formal letter', grammar: ['formal-letter', 'formal-u', 'polite-zou', 'relative-preposition', 'relative-wat-waar'],
    body: [
      'A letter or e-mail to a company follows a few fixed rules. It opens with **Geachte** + **mevrouw / heer** + the surname, and a comma: *Geachte mevrouw Janssens,* — if you don’t know the name: *Geachte mevrouw, geachte heer,*. (To a friend: *Beste Tom,* or *Dag Tom,*.)',
      'In the letter you always say **u** and **uw**, and you write full, polite sentences. Useful lines: *Ik solliciteer **voor** de functie van ingenieur.* — *In de bijlage **vindt u** mijn cv.* — *Ik **zou** graag op gesprek **komen**.* — *Ik hoop **van u** te horen.*',
      'It closes with **Met vriendelijke groeten,** and your full name on the next line. Between the opening and the close: who you are (opleiding, diploma, ervaring), why you want the job (motivatie) and why you are geschikt.',
    ],
    tables: [
      { caption: 'The frame of the letter', rows: [
        { nl: '[Geachte] mevrouw Janssens,', en: 'Dear Mrs Janssens,' },
        { nl: 'Ik solliciteer voor de functie van ingenieur.', en: 'I am applying for the position of engineer.' },
        { nl: 'In de [bijlage] vindt [u] mijn cv.', en: 'Please find my CV attached.' },
        { nl: 'Ik hoop van [u] te horen.', en: 'I hope to hear from you.' },
        { nl: '[Met vriendelijke groeten],', en: 'Kind regards,' },
      ] },
    ],
    examples: [
      { nl: 'Geachte mevrouw, geachte heer,', en: 'Dear Sir or Madam,' },
      { nl: 'Ik heb uw vacature met veel interesse gelezen.', en: 'I read your vacancy with great interest.' },
      { nl: 'Met vriendelijke groeten, Bram Claes', en: 'Kind regards, Bram Claes' },
    ],
  },
  {
    type: 'drill', title: 'Formal or informal?', grammar: ['formal-letter', 'formal-u', 'possessives'],
    instruction: 'Rewrite each line for a formal letter to mevrouw Janssens.',
    items: [
      { nl: 'Dag Sofie,', answer: 'Geachte mevrouw Janssens,' },
      { nl: 'Ik heb jouw vacature gelezen.', answer: 'Ik heb uw vacature gelezen.' },
      { nl: 'In de bijlage vind je mijn cv.', answer: 'In de bijlage vindt u mijn cv.' },
      { nl: 'Kun je mij bellen?', answer: 'Kunt u mij bellen?', accept: ['Zou u mij kunnen bellen?'] },
      { nl: 'Ik hoop van jou te horen.', answer: 'Ik hoop van u te horen.' },
      { nl: 'Groetjes, Bram', answer: 'Met vriendelijke groeten, Bram Claes', accept: ['Met vriendelijke groeten, Bram'] },
    ],
    explanation: 'Geachte + mevrouw + surname. u and uw: vindt u, kunt u — the -t stays. Met vriendelijke groeten and your full name.',
  },
  {
    type: 'drill', title: 'Complete the letter', grammar: ['formal-letter', 'relative-preposition', 'relative-wat-waar', 'formal-u', 'polite-zou'],
    instruction: 'Type the missing word in Bram’s letter.',
    items: [
      { nl: '___ mevrouw Janssens,', answer: 'Geachte' },
      { nl: 'Ik solliciteer voor de ___ van ingenieur.', en: 'position', answer: 'functie' },
      { nl: 'Ik heb een ___ van de universiteit van Leuven.', en: 'degree certificate', answer: 'diploma' },
      { nl: 'Ik heb vijf jaar ___ bij een groot bedrijf.', en: 'experience', answer: 'ervaring' },
      { nl: 'Fietsen zijn iets ___ ik erg interessant vind.', answer: 'wat' },
      { nl: 'Uw bedrijf is het bedrijf ___ ik graag zou werken.', answer: 'waar' },
      { nl: 'Ik denk dat ik ___ ben voor deze functie.', en: 'suitable', answer: 'geschikt' },
      { nl: 'In de ___ vindt u mijn cv.', en: 'attachment', answer: 'bijlage' },
      { nl: 'Ik ___ graag op gesprek komen.', en: 'I would like to …', answer: 'zou' },
      { nl: 'Met vriendelijke ___,', answer: 'groeten' },
    ],
    explanation: 'Geachte …, de functie van, een diploma, ervaring bij, iets wat, het bedrijf waar, geschikt voor, in de bijlage, Ik zou graag …, Met vriendelijke groeten.',
  },

  // ——— Combine ———
  {
    part: 'Combine', type: 'drill', title: 'Last lessons: dreams and offices', grammar: ['hypothetical-zou', 'advice-zou', 'wishes', 'formal-u', 'polite-zou', 'modal-particles'],
    instruction: 'Lessons 26 and 27 again. Answer each question with a complete sentence, using the words in brackets.',
    items: [
      { nl: 'Waar droomt Bram van? (van een baan in Leuven)', answer: 'Bram droomt van een baan in Leuven.', accept: ['Hij droomt van een baan in Leuven.'] },
      { nl: 'Wat zou Bram doen, als hij de baan kreeg? (met de fiets naar zijn werk gaan)', answer: 'Als Bram de baan kreeg, zou hij met de fiets naar zijn werk gaan.', accept: ['Hij zou met de fiets naar zijn werk gaan.', 'Bram zou met de fiets naar zijn werk gaan.'] },
      { nl: 'Wat zou Bram nog moeten kopen? (een fiets)', answer: 'Bram zou nog een fiets moeten kopen.', accept: ['Hij zou nog een fiets moeten kopen.'] },
      { nl: 'Wat wenst Bram? (had ik maar een fiets)', answer: 'Had ik maar een fiets!' },
      { nl: 'Is het loon in Leuven even hoog? (nee, maar het geluk is groter)', answer: 'Nee, maar het geluk is groter.', accept: ['Nee, het loon is niet even hoog, maar het geluk is groter.'] },
      { nl: 'Is dit een grote kans voor Bram? (ja)', answer: 'Ja, dit is een grote kans voor Bram.', accept: ['Ja, dit is een grote kans voor hem.'] },
      { nl: 'Zal het leven van Bram veranderen? (ja, misschien)', answer: 'Ja, misschien zal het leven van Bram veranderen.', accept: ['Ja, misschien verandert het leven van Bram.', 'Misschien.'] },
      { nl: 'Is Bram rijk? (nee, maar hij heeft een goede baan)', answer: 'Nee, maar hij heeft een goede baan.', accept: ['Nee, Bram is niet rijk, maar hij heeft een goede baan.'] },
      { nl: 'Is de wereld van Bram klein? (ja, trein, werk en huis)', answer: 'Ja, trein, werk en huis.', accept: ['Ja, de wereld van Bram is klein.'] },
      { nl: 'Heeft Bram een vrije dag voor het gesprek? (ja, op vrijdag)', answer: 'Ja, Bram heeft op vrijdag een vrije dag.', accept: ['Ja, hij heeft op vrijdag een vrije dag.'] },
      { nl: 'Moet Bram een formulier invullen bij het bedrijf? (nee, alleen zijn cv sturen)', answer: 'Nee, Bram moet alleen zijn cv sturen.', accept: ['Nee, hij moet alleen zijn cv sturen.'] },
      { nl: 'Waar ligt het bedrijf? (op een adres dichtbij het station)', answer: 'Het bedrijf ligt op een adres dichtbij het station.', accept: ['Dichtbij het station.'] },
      { nl: 'Wat zegt Bram tegen mevrouw Janssens: u of jij? (u)', answer: 'Bram zegt u tegen mevrouw Janssens.', accept: ['Hij zegt u.', 'U.'] },
    ],
    explanation: 'zou … gaan, zou … moeten kopen, had ik maar: dreams, advice and wishes. Tegen mevrouw Janssens: u.',
  },
];
