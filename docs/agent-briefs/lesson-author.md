# Lesson Author brief — Langzaam (illustrated Dutch course)

Project: /Users/gokalpelacmaz/Downloads/langzaam. You are one of several Lesson Author agents working in
parallel; each writes exactly ONE lesson file. The learner (an adult, English-speaking, moving to study in
Belgium; wants to reach academic Dutch eventually) tried an earlier version and said it was "too much like
Duolingo": too easy, too short, not enough grammar and conjugation practice, grammar felt separate, lessons
did not build on each other. Your lesson must fix that: long, demanding, conjugation-heavy, cumulative.

## Read first (all of them, fully)
1. docs/CURRICULUM.md — principles, story bible, lesson anatomy, the complete page schema.
2. src/curriculum/plan.js — the curriculum model: which words/forms/grammar points exist in which lesson.
3. src/curriculum/lessons/01-wat-is-dit.js — the reference lesson. Match its structure, tone, and quality,
   but your lesson must be LONGER and HARDER (lesson 1 is deliberately the gentlest).
4. src/content.js and scripts/validate-content.mjs — how pages are processed and checked.

## Your deliverable
Write only your lesson file (path given below) as `export default [ ...pages ];`. Do not edit any other file
(not plan.js, not other lessons, not the app). If you believe the plan should change, say so in your final reply.

Targets for your lesson:
- 36–45 pages, 180–260 answers (validator minimum is 30 pages / 130 answers).
- Typed answers ≥ 70% (validator minimum rises by lesson; don't hover at the limit).
- Each of your 10 targets used 15+ times in spoken Dutch; the previous lesson's targets 4+ times, older targets 2+; every earlier grammar
  point tagged on 3+ pages. Earlier material must appear *combined* with your new grammar, not in separate review pages.
- Conjugation: EVERY verb the learner knows by your lesson gets drilled, and your new verbs get massive volume:
  conjugation tables (layout 'table', all persons incl. zij with gloss 'she'/'they', jullie), cloze with the
  infinitive as cue, inversion questions (jij loses -t after the verb), negatives, change-the-subject transforms,
  and translations. Include at least one "all verbs so far" mixed conjugation drill.
- Grammar pages: clear, precise, adult explanations in English (not cutesy), with tables and examples. Explain
  the WHY and the traps. Then drill immediately; then combine with everything earlier.
- Arrange pages must have tempting distractors (wrong verb form, wrong article, geen/niet).
- A Read part with an 8–12 line story/dialogue continuing the story bible, then comprehension + full-sentence answers.
- Write part: dictation (5+), translation EN→NL (8+), and a final 12+ item mixed drill.
- Instructions and explanations in English; all other content Dutch. Keep the calm, adult tone of lesson 1.

## Dutch quality
- Only use forms the validator allows at your lesson (it will tell you). If you need a word that is not
  available, rephrase — never add vocabulary. Names in plan.js `names` are always allowed.
- Natural, idiomatic, grammatically correct standard Dutch that sounds normal in Flanders. jij/je for "you"
  (never u, ge, gij). No sentences that are grammatical but odd or unnatural; no contradictions of the story bible
  or of the picture shown next to a sentence.
- Typed items must have ONE clearly correct answer, or list the alternatives in `accept`. Give an English
  cue (`en`) or a `cue` whenever the expected answer would otherwise be ambiguous. Remember jij/je, zij/ze,
  wij/we swaps are accepted automatically; word order and spelling must match exactly.
- Every `image` must be a key from `images` in plan.js, and the picture must actually show what the sentence says.
  Some image files are still being drawn by illustrators; the validator only warns about missing files — that's fine.

## Loop until clean
Run `node scripts/validate-content.mjs <your-lesson-id>` from the project root, fix every error, repeat.
Then re-read your whole file once as a strict Dutch teacher would and fix anything unnatural.

Final reply: page count, answer count, typed share, the target/recycling numbers from the validator table,
and a short list of any judgement calls or suggested plan changes.

## Volume one (lessons 7–12) — extra rules
- Ten targets per lesson; aim for 40–46 pages and 220–280 answers, typed share ≥ 80%. The learner has said the
  length and difficulty of lessons 1–6 are right — match them, do not go easier.
- Read lessons 1–6 (at least their grammar pages, stories and final drills) so you know exactly what the learner
  has practised, and the volume-one story bible in docs/CURRICULUM.md.
- Tokenizer limits: never write apostrophe forms (auto's, 's ochtends, 's avonds, zo'n) — rephrase. Plurals of
  earlier nouns unlock in lesson 7 via `laterForms`; participles unlock in lesson 11 (see plan.js). "één" (one)
  is spelled with accents; answers ignore accents.
- Possessive "zijn" (his) is the same written form as the verb "zijn"; it is allowed from lesson 8 on.
- Every earlier grammar point needs ≥2 tagged pages in your lesson: plan mixed "everything so far" drills
  (conjugation of all verbs, de/het + plurals, geen/niet, V2 after a time word, adjective -e, questions).
- Voices: dialogue lines are recorded in the speaker's voice (see `speakerVoices` in plan.js: Bram, Lotte,
  De oude man, Tom, Jonas, Emma, Sofie, Noor, Moeder, Vader). Use exactly those speaker labels for dialogues,
  and prefer real dialogues between two or more characters — the learner hears a male Netherlands voice and a
  female Belgian voice.

## Volume two (lessons 13–18) — extra rules
- Everything from volume one applies. Lessons now sit at A2: sentences may be longer, stories 14–20 lines,
  and grammar pages can assume the learner knows the terms (subject, verb, participle, subclause).
- New forms unlock by lesson (plan.js): separable-verb compounds (opsta, opgestaan …) in lesson 13, comparatives in 14,
  simple-past forms of every verb in 15. A form you need but the validator rejects is not available — rephrase.
- The word "vroeg" (early) and the simple past of vragen ("hij vroeg") share one spelling; both are allowed from lesson 15.
