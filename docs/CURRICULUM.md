# Curriculum and authoring guide

Seven volumes, forty-two long lessons, from “Dit is een huis” to reading and writing academic Dutch at a
Flemish university. The volumes follow the CEFR grammar and topic syllabus (the level on each volume is the
target of its syllabus, not a certified level):

| Volume | Lessons | Level | Theme |
|---|---|---|---|
| 0 | 1–6 | Pre-A1 → A1 | First things first |
| 1 | 7–12 | A1 → A2 | A life in Dutch |
| 2 | 13–18 | A2 | More to say |
| 3 | 19–24 | A2+ → B1 | A new year in Leuven |
| 4 | 25–30 | B1 | Work and the city |
| 5 | 31–36 | B1+ → B2 | City and society |
| 6 | 37–42 | B2 | Academic Dutch |

## Principles

1. **Ten target words per lesson.** Each lesson introduces exactly ten content words. They are used
   at least 12 times in their own lesson (most far more), the previous lesson's targets return at least
   4 times, and **every older target returns at least twice in every later lesson** — so nothing leaves
   the cycle. A few structure words (pronouns, prepositions, negation) come with the grammar that needs them.
   From volume three on, targets and grammar from more than twelve lessons back must still return in every
   lesson, but once is enough.
   **Extra vocabulary.** From volume two on, ten targets cannot carry a topic (a flat, a job application, the
   climate), so each lesson also owns a file of extra words, `src/curriculum/vocabulary/<lesson-id>.js`: each is
   used at least three times in its lesson and may be used freely afterwards, but it is not recycled by rule.
   The cap rises by volume (12 in volume two, 30 → 45 in volumes three to six). One spelling belongs to one word;
   the few true homographs (de reis / ik reis) are listed in the validator.
2. **Grammar is taught, then never left alone.** A lesson may start a grammar point on its own page
   with tables and examples, but from then on it is practised *combined* with everything before it.
   Every earlier grammar point must return on at least two pages of every later lesson.
3. **Conjugation gets volume.** Every verb is drilled across all persons, in statements, questions
   (where “jij woont” becomes “woon jij”), and negatives, typed — not tapped.
4. **Production over recognition.** Multiple choice is for first contact only. The share of answers
   the learner must type rises from 50% (lesson 1) to 70% (lessons 4–6).
5. **The lessons build one language.** The same people, places and sentences grow from lesson to
   lesson; a later story re-tells earlier facts with new grammar.

All of these are enforced by `node scripts/validate-content.mjs`, not by good intentions.

## The lessons

| # | Lesson | Targets | Structure words | Grammar |
|---|---|---|---|---|
| 1 | Wat is dit? | huis, boom, bank, man, vrouw, kind, deur, raam, auto, straat | dit, is, een, de, het, wat, ja, nee, geen, en | dit is · de/het · yes/no questions · geen |
| 2 | Ik ben moe | groot, klein, oud, jong, moe, blij, ziek, mooi, nieuw, lief | ik, jij/je, hij, zij/ze, wij/we, jullie, niet, ook (+ ben, bent, zijn) | pronouns · zijn · verb-first questions · niet · hij/het for things |
| 3 | Waar woon jij? | wonen, werken, lopen, zitten, slapen, koken, spelen, leren, praten, wachten | in, op, hier, waar, thuis | regular present tense · stem spelling · question words |
| 4 | Ik heb een hond | hebben, hond, kat, boek, fiets, tas, sleutel, telefoon, jas, bed | mijn, maar, of (+ grote, kleine, oude, jonge, mooie, nieuwe, lieve) | hebben · geen vs niet · adjective -e |
| 5 | Wat eet je graag? | lezen, eten, drinken, schrijven, koffie, thee, water, brood, kaas, appel | graag, altijd, nooit | z→s and v→f spelling · adverb position |
| 6 | Vandaag ga ik naar het park | gaan, komen, vandaag, morgen, park, winkel, school, station, stad, trein | naar, nu, dan, met | gaan · verb-second inversion · time before place |
| 7 | Twee katten, vier stoelen | twee, drie, vier, vijf, kamer, tafel, stoel, keuken, tuin, veel | er, hoeveel, één (+ plurals of every noun) | plurals · er is / er zijn · counting |
| 8 | Hoe heet jouw broer? | vader, moeder, broer, zus, vriend, vriendin, familie, naam, heten, jaar | jouw, haar, ons/onze, hun, wie, hoe | possessives · wie/hoe |
| 9 | Ik kan een beetje Nederlands | kunnen, willen, moeten, mogen, zwemmen, spreken, rijden, helpen, Nederlands, goed | Engels, beetje, heel | modal verbs · infinitive at the end · d+t |
| 10 | Op maandag om acht uur | maandag … zondag, week, dag, uur | om, laat, half, elke, zes … twaalf | telling the time · op/om |
| 11 | Gisteren heb ik gekookt | gisteren, vorige, weekend, maken, kopen, zien, doen, vinden, zeggen, film | al, nog (+ a participle for every verb) | perfect with hebben · participles · perfect with zijn |
| 12 | Ik ga niet, omdat het regent | omdat, want, als, denken, weten, hopen, begrijpen, vragen, regenen, examen | dat, wanneer, misschien | want vs omdat · verb at the end · dat · als + inversion |

The machine-readable version — every word, every allowed verb form and when it unlocks, every grammar
point — is `src/curriculum/plan.js`.

## Story bible

- **Bram** (man.svg) and **Lotte** (woman.svg) are a young couple. They live together in a brick house
  in **Leuven**.
- Bram works in **Brussel**; Lotte works **thuis**, at her desk. Bram is often **moe**; Lotte rarely is.
- An old man (old-man.svg) often sits on the bench in the street. He is friendly and old; he has no name.
- From lesson 4: Bram has a big dog called **Max** (dog-big). Lotte has a small cat (cat). Lotte has a
  bike; Bram has no bike. Lotte has a book she loves.
- From lesson 5: Bram always drinks coffee; Lotte never does. Lotte reads a lot; Bram eats bread.
- From lesson 6: Bram commutes to Brussel by train. Today they go to the park with Max; tomorrow Bram goes to the shop.
- In Flanders de straat, de deur, de bank and de tas are traditionally “ze”; the course only uses “hij” for
  things that are masculine everywhere (boom, auto, sleutel, trein, winkel …).

### Volume one (lessons 7–12)

- **Lesson 7, the house:** Bram and Lotte's house has three rooms upstairs (kamers), a kitchen (keuken) with a
  table and four chairs, and a small garden (tuin) with one tree. The old man next door has two cats. Lotte's
  small cat is called **Mimi**.
- **Lesson 8, family and friends:** Bram's parents live in **Gent**; his father is 62, his mother 60 (numbers above
  twelve are never written out, only said as "oud"/"jong" or avoided). Bram has a sister, **Sofie**. Lotte has a
  brother, **Tom**, who lives in **Antwerpen**. Lotte's best friend is **Emma**; Bram's friend is **Jonas**.
  The child in the street is **Noor**; she is five.
- **Lesson 9, abilities:** Bram swims well and drives; Lotte cannot drive (she cycles) but speaks English and Dutch
  very well. Bram helps the old man. The learner's own voice appears: "Ik spreek een beetje Nederlands."
- **Lesson 10, the week:** Bram works in Brussel Monday to Thursday and at home on Friday. Lotte studies every day.
  On Saturday they go to the shop and the park; on Sunday they visit Bram's parents in Gent, by train at ten o'clock.
- **Lesson 11, last weekend:** they went to Gent, Bram's mother cooked, they saw a film on Saturday, Lotte bought a
  new coat, and Bram made a bench for the garden.
- **Lesson 12, because:** Lotte has an exam on Friday. It rains a lot this week; she stays at home because she has to
  study; she hopes the exam will be easy (keep within allowed words); Bram thinks she will pass.

### Volume two (lessons 13–18)

- **Lesson 13, a morning:** Bram gets up at seven (opstaan), has breakfast, takes his bag and key along
  (meenemen), rings his mother (opbellen), the train arrives late (aankomen); on Friday evening Bram and Lotte go out
  with Emma and Jonas (uitgaan).
- **Lesson 14, comparing:** Leuven versus Brussel and Gent; the train is faster than the bike, the bike cheaper than
  the car; Max is bigger than Mimi; Bram is taller than Lotte; coats in the shop (dure / goedkope jas); warm and cold days, sun and snow (zomer and winter only arrive in lesson 17).
- **Lesson 15, the past:** Bram's childhood: when he was small he lived in **Oostende**, by the sea; every summer
  he went on holiday with oma and opa; they played on the beach; old photos. Lotte grew up in Antwerpen with Tom.
- **Lesson 16, health:** Lotte has a headache before her exam; Bram has back pain from building the bench; the doctor
  (a woman) says: rest, take this medicine; the pharmacy; Bram hurries (zich haasten) to the train; Bram remembers his
  grandparents (zich herinneren).
- **Lesson 17, plans:** next summer Bram and Lotte will fly to **Spanje** and stay in a hotel by the sea; in winter
  they go by train to **Oostende** on the Belgian coast. After her exam Lotte will begin a new course; Bram tries to cook
  better. “over drie weken” (future) against “drie weken geleden” (past).
- **Lesson 18, people:** the old man next door is **de buurman** (from now on he has that name), his wife is de buurvrouw;
  Lotte is a student at the university in Leuven; her teacher; Bram's colleagues in Brussel; "Ken jij de man die …?"
  — relative clauses about everyone met in the book.

### Volume three (lessons 19–24) · A2+ → B1 · Een nieuw jaar

Autumn to spring of the next academic year. Lotte is a student at the university in Leuven (lesson 18); Bram still
works in Brussel and commutes by train. **Tom**, Lotte's brother, moves from Antwerpen to Leuven: he is a nurse
(verpleegkundige) at the hospital (het ziekenhuis) in Leuven and works shifts, including nights.

- **Lesson 19, the birthday:** Lotte is jarig (in October — but month names only arrive in lesson 21, so lesson 19 says “vandaag”, “zaterdag”). Bram gives her
  a book and flowers; Tom gives her a cake he bought (he cannot bake); Emma, who is away that week, sends a card; Bram's parents
  ring from Gent (Bram's grandparents belong to his childhood in lesson 15 — leave them in the past). The party is at home with Jonas, Tom, de buurman and de buurvrouw; they sing,
  there are candles; Max gets a piece of cake he should not have. Object pronouns everywhere: “Ik geef haar een boek.”
- **Lesson 20, the flat:** Tom moves into a flat (een appartement) on the second floor near the station in Leuven.
  Bram and Lotte help him carry boxes up the stairs; where does everything go — the bookcase against the wall,
  the lamp next to the bed, the mirror in the bathroom, the plant in the corner. Things lie, stand and hang.
- **Lesson 21, the rent:** how Tom found the flat: he searched, visited three flats, the owner (de eigenaar,
  a woman, **mevrouw Claes** — use “de eigenaar” in sentences; the speaker label is “De eigenaar”) asks 750 euro
  per month plus costs; a deposit (waarborg) of two months; he signs the contract on 1 October. Prices in the shop,
  dates, birthdays of everyone (Lotte: in October; Bram: 14 March), how much Bram's train ticket costs. Digits are
  fine in writing (750, 2025); number words are taught and dictated.
- **Lesson 22, free time and work:** Tom works in the hospital and takes care of patients; he loves music and
  listens to it after a night shift; Bram watches football on television and waits for the train every morning;
  Lotte is interested in history and in languages; Noor is afraid of big dogs — but not of Max. What are you thinking of?
  Who are you waiting for? “Waar heb je zin in?”
- **Lesson 23, the project:** Lotte does a group project for her course with three other students; they arrange to
  meet, divide the work, write a report; while Lotte studies, Bram cooks; before the deadline they work late; as
  soon as it is finished they celebrate. Although it rains, Bram walks to the station (he still has no bike).
  “Ik weet niet of …” questions about the project.
- **Lesson 24, market day:** on Saturday Bram and Lotte go to the market in Leuven to buy vegetables, fruit and
  fish; which tomatoes, these or those; Bram cooks soup for Tom, Emma and Jonas from a recipe of his mother's; you
  don't have to bring anything; Lotte cuts the vegetables — carefully, Max is waiting under the table.

### Volume four (lessons 25–30) · B1 · Werk en stad

Winter to summer. Bram is tired of commuting to Brussel; he is an engineer (ingenieur) at a large company there.
This volume he applies for — and gets — a job at a small Leuven company that designs electric bikes (the joke the
book enjoys: Bram, who has never had a bike, will work for a bike company). Tom settles in Leuven; Lotte continues
her studies. From lesson 26 the formal **u** appears in offices, letters and with strangers; friends and family
always stay jij/je.

- **Lesson 25, a bad day:** Bram oversleeps, runs for the bus, misses it; when he arrives at the station his train
  has already left; in the next train he notices he has lost his wallet. Nobody has seen it; he searches everywhere.
  That evening someone rings: a woman has found it on the bus. Everything is still in it. Told in the past with
  had/was + participle for what had already happened.
- **Lesson 26, the town hall:** Tom registers his new address at the gemeente (het stadhuis in Leuven): he needs
  an appointment, fills in a form, shows his identity card, signs. The clerk (speaker “De bediende”) speaks u; Tom is
  polite and asks her to repeat. A café scene with a waiter (“De ober”): “Ik zou graag een koffie willen.”
  Bram drinks coffee, Lotte tea — as always.
- **Lesson 27, dreams:** after the bad day Bram dreams aloud: if he worked in Leuven he would not have to commute;
  if he were rich he would … ; Lotte and Tom give advice (“Je zou eens moeten solliciteren”); wishes (“Had ik maar een
  baan in Leuven!”). He sees a vacancy at a Leuven bike company.
- **Lesson 28, the application:** the vacancy (engineer, electric bikes), Bram's CV, his experience and degree,
  the motivation letter he writes with Lotte's help (Geachte mevrouw …, Met vriendelijke groeten). “De baan waarvoor
  ik solliciteer”, “het bedrijf waar ik wil werken”, “alles wat ik geleerd heb”. The contact person is a woman.
- **Lesson 29, the city is changing:** the station square and a new bike bridge are being built; there is noise and
  a diversion; Lotte's bike is stolen from outside the library (her bike from lesson 4!) — she reports it to the police
  (speaker “De agent”); a camera filmed the thief, but the bike is not found (yet).
- **Lesson 30, history:** Tom and Lotte give Emma a tour of Leuven: the university was founded in 1425; the
  University Library was destroyed in 1914, rebuilt with American help (opened 1928), burnt again in 1940 and
  rebuilt; the town hall and Sint-Pieterskerk (write “de kerk”); a guide (speaker “De gids”). The passive in past
  and perfect. Stay factual: only these widely known dates.

### Volume five (lessons 31–36) · B1+ → B2 · Stad en samenleving

The following autumn and winter. Bram got the job: he is now an engineer at the Leuven bike company (small team,
electric bikes). His boss is **Sarah**; his closest colleague is **Karim**, who has worked there for years. Bram buys
his first bike — an electric one, at a staff price. Lotte starts her final year and chooses her thesis subject:
student housing in Leuven (koten). The texts get longer and more like real Belgian texts: e-mails, a newspaper
article, an interview, a debate, an information page about Belgium.

- **Lesson 31, the new job:** the interview (“het sollicitatiegesprek”) is told in the perfect with modals
  (“Ik heb lang moeten wachten”, “Ik ben gaan zitten”); his first day: meetings, his team, tasks, customers, the
  test department; Sarah lets him test a prototype; Bram has his (new) bike repaired by the bike repairer after a
  flat battery; Karim sits reading the plans; “laat maar”.
- **Lesson 32, the debate:** in a café Tom, Emma, Jonas, Bram and Lotte argue about the car-free city centre of
  Leuven: shopkeepers, safety, traffic, parking; opinions, agreeing and disagreeing politely; Bram has changed his
  mind since he cycles. Keep it balanced — the book does not take sides.
- **Lesson 33, the climate:** the warm, dry summer that just ended; Leuven's climate plans; solar panels on the
  house of de buurman; recycling; “Hoe meer we fietsen, hoe schoner de lucht”; not only … but also; Lotte and Tom
  disagree about flying to Spanje (lesson 17!).
- **Lesson 34, in the newspaper:** a journalist (speaker “De journaliste”) interviews Lotte about her thesis on
  student rooms; next day the article reports what she said (reported speech); a rumour in the news that rents will
  rise “zou”; Lotte is annoyed that the paper got one figure wrong. Invented figures must be plausible and stay the
  same across the lesson.
- **Lesson 35, choices:** Tom was offered a job in a hospital in Spanje last year and refused it; would he have been
  happier? “Als ik het aanbod had aangenomen, …”; Bram's regrets that he did not leave Brussel earlier; Lotte's
  choice of subject; “mocht je twijfelen, …”. The tone is reflective, not sad.
- **Lesson 36, Belgium:** Emma's cousin from abroad asks how Belgium works: three official languages (Dutch, French,
  German), communities and regions (Vlaanderen, Wallonië, Brussel), the federal government, the king, compulsory
  voting, the language border. Word formation throughout (regeren → regering, veilig → veiligheid, begrijpen →
  begrijpelijk). Stay factual and neutral.

### Volume six (lessons 37–42) · B2 · Academisch Nederlands

Lotte's final semester: lectures, her master's thesis (**de masterproef**) on student housing in Leuven, her
supervisor **professor Janssens** (a woman; speaker “De promotor”), a survey among students, a presentation, and
graduation in June. Bram is settled at the bike company; Tom is thinking about his future. The texts are now what a
student at a Flemish university reads and writes: lecture notes, an argumentative essay, a research summary with
figures, a presentation, a speech. The learner writes long translations and formal rewrites; answers accept
reasonable word-order variants.

- **Lesson 37, the lecture:** a lecture on the history of Leuven's student housing (connects to lesson 30): Lotte
  takes notes, summarises; the professor (speaker “De professor”, a man) gives examples and definitions; students
  ask questions; nominalised style (“Het huren van een kot werd …”), present participles, iets nieuws, de ouderen,
  houten tafels in the old library.
- **Lesson 38, the essay:** Lotte writes an argumentative essay for a seminar: “Studenten hebben recht op
  betaalbare huisvesting” — thesis statement, introduction, arguments, counter-arguments, conclusion; aangezien,
  doordat, dankzij, ondanks; Bram's spoken Dutch versus Lotte's written Dutch (register).
- **Lesson 39, the research:** Lotte's survey: 400 students took part; the data she collected; results: rents rose,
  most students pay more than a third of their budget; “Uit de gegevens blijkt dat …”; “de door Lotte verzamelde
  gegevens”; every function of er. Figures invented but consistent and plausible, and consistent with lesson 34.
- **Lesson 40, the presentation:** Lotte presents her results to her supervisor and fellow students; careful claims
  (“Het lijkt erop dat …”, “Dit zou kunnen betekenen dat …”); questions from the audience; modal particles in the
  friendly chat afterwards with Bram and Tom (“Dat was toch goed, hoor!”).
- **Lesson 41, expressions:** at Bram's work Karim uses idioms Bram does not understand; Flemish versus
  Netherlands expressions; collocations (een besluit nemen, rekening houden met); Tom makes a decision: he will do
  a further training (specialisation) — voorkómen versus vóórkomen, verhuren (the owner of lesson 21 rents out a new
  flat), ontdekken.
- **Lesson 42, graduation:** Lotte graduates (met onderscheiding); the ceremony; Bram's speech at the party for
  family and friends (everyone from the book: Bram's parents from Gent, Sofie, Tom, Emma, Jonas, Noor — now older,
  de buurman and de buurvrouw, Karim, Max and Mimi); looking back at the first day (“Dit is een huis.”) and ahead: by
  next year Lotte will have found a job — future perfect; every tense in one final story. The end of the book.

Sentences must be true to this bible and to the pictures they sit next to.

## Lesson anatomy (30–40 pages, 120+ answers)

Each lesson moves through the same parts (set `part` on the first page of each):

1. **Words** — `observe` pages with the ten targets in sentences built from *known* grammar;
   picture recognition by reading and by ear; “write the word”; “hear and spell”.
2. **Grammar** — one explicit `grammar` page per point (tables, examples), each followed immediately
   by heavy drills: conjugation tables for *every* verb, choice drills for first contact, then typed
   cloze drills with the infinitive as cue.
3. **Combine** — the new grammar mixed with every earlier point: transform drills (make it a
   question / negative / change the subject / use “the”), arrange with distractor words that are
   deliberately tempting (“woont” when “woon” is right).
4. **Read** — an 8–12 line story or dialogue that continues the story bible, then comprehension
   questions and full-sentence answers.
5. **Write** — dictation, translation from English (8+ sentences), and a final 12-item mixed drill.
6. **complete** — the closing page.

## Page schema

Lesson files live in `src/curriculum/lessons/NN-id.js` and default-export an array of pages. Page
ids are generated (`lessonId-01` …). Every page has `type`, `title`, and usually `instruction`
(English) and `grammar` (ids of the grammar points it practises — the validator counts these).

| type | fields |
|---|---|
| `observe` | `cards: [{ nl, en, image }]`, optional `note` |
| `picture` | `nl`, `en`, `listen` (hide the text, audio only), `choices: [{ image, nl }]` (3–4), `answer` = the right image key |
| `grammar` | `body: [paragraphs]` (supports `**bold**` and `*italic*`), `tables: [{ caption, rows: [{ nl, en }] }]`, `examples: [{ nl, en }]`. In `nl`, square brackets highlight an ending: `hij woon[t]` |
| `drill` | `items: [...]`, optional shared `choices: [...]` (buttons instead of typing), `layout: 'table'` (conjugation table), `task` (shown on every item), `image`, `explanation` |
| `arrange` | `nl`, `en`, `image`, `distractors: [...]` — the word tiles are generated from `nl` |
| `story` | `image`, `lines: [{ nl, en, image, speaker }]` |
| `complete` | `title`, `instruction` |

Drill items — the shape decides how the item is shown:

| item | shows | learner gives |
|---|---|---|
| `{ label: 'jij', gloss: 'you', answer: 'woont' }` | a conjugation row (needs `layout: 'table'`) | the verb form |
| `{ nl: 'Jij ___ in Gent.', cue: 'wonen', en: 'You live in Ghent.', answer: 'woont' }` | a sentence with one blank | the missing word |
| `{ nl: 'Ik woon hier.', task: 'Change to hij', answer: 'Hij woont hier.' }` | a Dutch sentence to rewrite | the whole new sentence |
| `{ nl: 'Is Bram moe?', answer: 'Ja' }` + `choices` | a spoken question | a button |
| `{ en: 'I live here.', answer: 'Ik woon hier.' }` | English | the Dutch translation |
| `{ listen: 'Hij woont in Gent.' }` | a play button only | what they hear |
| `{ image: 'tree', answer: 'boom' }` | a picture (can combine with `nl`) | the word or answer |

`accept: [...]` adds other correct answers. The pronoun pairs jij/je, zij/ze, wij/we are accepted
automatically. Capitals and punctuation never matter; spelling and word order always do.

Every Dutch string is tokenized and checked against the forms introduced so far, and every spoken
string gets a recording. Proper names (`names` in plan.js) are always allowed.

## Dutch standard

Standard Dutch that is natural in Flanders: “jij/je” for you (no “ge/gij”), no
Netherlands-only or Flemish-only colloquialisms. From lesson 26 the formal “u” is taught and used with officials,
in letters and in lectures; friends and family always say jij/je. Where Flanders and the Netherlands differ in
standard usage (waarborg / borg, kot, proficiat, masterproef), the course uses the Belgian word and names the other. Belgian place names. Audio uses a Belgian (Ellen) and a Netherlands (Xander) voice;
dialogue speakers keep their own voice (`speakerVoices` in plan.js). A human Dutch teacher should review before real publication; the linguistic QA agent is
a first pass, not a substitute.

## Learner model

`src/learning.js` is deterministic and has no AI in it. Every answer records an encounter for each
word in it (derived from the text, so “woont” counts for *wonen*). Exposure never counts as recall.
Correct first attempts schedule reviews after 10 minutes, 1, 3, 7 and 14 days; mistakes make a word
due immediately; early practice never advances the schedule. The review page turns due words back
into typed sentence tasks drawn from lessons already completed.

## The publishing team (agents)

The lessons were produced the way the original plan described: agents working against one curriculum model,
never generating content live for the learner. Their definitions live in `.claude/agents/` and their full
briefs in `docs/agent-briefs/`, so the same workflow can be rerun for the next volume:

- **illustrator** — draws missing pictures in the house style (40+ so far).
- **lesson-author** — writes or revises one lesson file until `validate-content.mjs` passes.
- **dutch-reviewer** — a strict Flemish-Dutch teacher that fixes grammar, naturalness, answer keys and story consistency.

The validator is the curriculum QA: the agents cannot publish vocabulary the learner has not met, or let
a target or grammar point fall out of the cycle. In Claude Code, ask for them by name, e.g. “use the
lesson-author agent to write lesson 7 from plan.js, then the dutch-reviewer agent on it”.

## Adding a lesson

1. Add the lesson to `lessonPlan` and its words to `words` in `src/curriculum/plan.js`.
2. Write `src/curriculum/lessons/NN-id.js` and import it in `src/content.js`.
3. Run `node scripts/validate-content.mjs <id>` until it passes.
4. Commission missing pictures (see `.claude/agents/illustrator.md`) and regenerate audio with
   `node scripts/generate-audio.mjs`.
5. Run the linguistic and curriculum QA agents, fix what they find, then `npm test`.
