# Langzaam — a little Dutch, often.

An illustrated Dutch textbook you work through, not a streak app. Two volumes, **twelve long lessons**
(36–46 pages each). Each lesson has **ten target words**, all of which keep
coming back in later lessons, and grammar taught explicitly: de/het, zijn, every present-tense ending with
its spelling rules, hebben, geen/niet, adjective -e, verb-second word order, plurals, possessives, modal verbs,
the perfect tense and subordinate clauses. Every sentence has a picture or a recording in two voices. Mathematics and physics remain on the roadmap after B2.

## Open locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. `npm run build` writes a static release to `dist/`.

## How a lesson works

Each lesson moves through **Words → Grammar → Combine → Read → Write**:

- **Words**: see and hear the ten targets, recognise them by reading and by ear, then write and spell them.
- **Grammar**: a real explanation page with tables and audio, followed at once by conjugation tables and
  typed drills. From then on every grammar point is practised combined with everything before it.
- **Combine**: rewrite sentences (make it a question, make it negative, change the subject, start with
  “Vandaag”), and build sentences from word tiles with deliberately tempting spare words.
- **Read**: a dialogue or story that continues Bram and Lotte's life in Leuven, then questions answered in full sentences.
- **Write**: dictation, translation from English, and a long mixed final drill.

Most answers are typed, and the share rises from 60% in lesson 1 to 80–90% later. Capitals and punctuation
never matter; spelling and word order always do. jij/je, zij/ze and wij/we are interchangeable. After a
mistake you can reveal the answers, but you then type them in yourself.

## Progress and review

Progress is saved in this browser's `localStorage` (`langzaam-v2`). There is no account or sync.
Every answer records an encounter for each word in it. For example, “woont” counts for *wonen*.
Correct first attempts schedule a word for 10 minutes, then 1, 3, 7 and 14 days later. A mistake makes it
due again straight away. **Review** turns due words back into typed sentence tasks drawn from lessons you
have opened, including conjugation rows like “jij ___ (wonen)”. The scheduler is deterministic, with no AI in it.

## Content, validation, agents

- `src/curriculum/plan.js` is the curriculum model: every word, its forms and when each unlocks, the grammar points and the picture descriptions.
- `src/curriculum/lessons/*.js` holds the pages of each lesson. `src/content.js` derives everything else (tracked words, audio corpus).
- `scripts/validate-content.mjs` enforces the course rules: only introduced Dutch, target recurrence, grammar recurrence, typed share and page shape.
- `docs/CURRICULUM.md` covers the principles, story bible, page schema and publishing workflow.
- `.claude/agents/` and `docs/agent-briefs/` hold the illustrator, lesson-author and dutch-reviewer agents that produced the lessons.

Audio uses two synthetic macOS voices, **Ellen** (Belgian Dutch) and **Xander** (Netherlands Dutch), each at
normal and slow speed. In dialogues each character keeps one voice (Bram, Tom and the old man are Xander;
Lotte, Emma and Noor are Ellen). Every other sentence gets one of the voices, picked from its text, so you hear
both accents throughout. Voices and the speaker map live in `src/curriculum/plan.js`; install another Dutch voice
(System Settings › Accessibility › Spoken Content) and add it there to widen the mix. Regenerate with
`node scripts/generate-audio.mjs` (incremental; it also removes unused clips). A human Dutch teacher should
still review the course before any real publication.

## Verify

```sh
npm test                 # learner model, answer checking, validator, audio coverage
npx playwright test      # starts the dev server; walks lesson 1 by typing every answer, solves every later lesson, phone width
```
