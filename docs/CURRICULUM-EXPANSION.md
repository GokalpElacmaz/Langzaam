# Curriculum expansion checkpoint

Updated 2026-10-05. Existing lessons are categorized as A1, A2, B1 and B2 without changing lesson
contents. Eight new A2 practice lessons follow transport, bringing published A2 coverage to its
1,000-entry minimum. The earlier review record remains in [LESSON-REVIEW-2026-10-04.md](LESSON-REVIEW-2026-10-04.md).

## User requirements

Preserve all existing lesson content. Cumulative goals: **A1 500–1,000; A2 1,000–1,500;
B1 2,000–2,500; B2 4,000–5,000 words**. Continue A2 with approximately **20 new entries and
250 answers** per lesson; permitted variation is **15–25 entries and 245–300 answers**. Goals include
prior levels and count inflections/revisits once. Preserve the first lecture’s muted outlined illustrations,
check image meaning and cropping, and keep each exercise page’s answer format consistent.

## Available course

**56 lessons: 18 core grammar lessons and 38 vocabulary-practice lessons.** Every practice lesson has
36 stable page IDs, 250 answers, 208 typed answers (83%), twenty target entries and twenty earlier
entries for review. The builder and validator also support variable topic sizes.

| Level | Available lessons | New distinct entries | Cumulative coverage | Cumulative goal |
| --- | ---: | ---: | ---: | ---: |
| A1 | 28 | 510 | 510 | 500–1,000 |
| A2 | 28 | 494 | 1,004 | 1,000–1,500 |
| B1 | 0 | 0 | 1,004 | 2,000–2,500 |
| B2 | 0 | 0 | 1,004 | 4,000–5,000 |

Volumes 0 / 1–2 / 3–4 / 5–6 map to A1 / A2 / B1 / B2. Keep volume numbers for the original authoring
rules and saved navigation. `levels.js` defines goals; `levelCoverage` derives published coverage.

### 2026-10-05 batch: eight A2 topics after transport

All eight are anchored after `die-dat` (volume 2) and appended after `a2-onderweg`, so no earlier lesson’s
scheduled reviews change. Each has twenty new entries, two contexts per entry, twenty grammar tasks
(ten complete rewrites, ten gaps), an eight-line story continuing the story bible and eight questions.
All Dutch stays within published vocabulary and forms; the validator confirms every target has 12+ uses.

| Module | Topic | Grammar revisited |
| --- | --- | --- |
| a2-dieren | Farm and zoo animals | plurals, er is/zijn, relative clauses, comparatives |
| a2-beroepen | Jobs and work | job names without een, als, zullen, relative clauses |
| a2-karakter | Character and feelings | adjective endings (-en adjectives), comparisons, reflexive voelen |
| a2-koken | Cooking and quantities | imperative, participles, gram/liter after numbers |
| a2-verzorging | Body and personal care | reflexive scheren/wassen/aankleden, pijn hebben in |
| a2-tuin | The garden | perfect with hebben vs zijn (groeien), water geven, relative clauses |
| a2-onweer | Weather and the sky | het-weather verbs, zullen forecasts, als-inversion |
| a2-sport | Sport and a match | modal + infinitive, perfect participles, goed → beter |

Two draft-lesson extras move earlier as their first introduction, as oma/opa/ontbijt did before:
`eerlijk` (had-gedaan) and `bakken` (hem-haar). Their later forms stay deferred to the original lessons.
Homographs were avoided rather than tracked: `voeren` was replaced by `poot` (its forms collide with the
draft `uitvoeren`), present `groei/groeit` stay with `opgroeien`, hair sentences avoid `haar`, and the
comparative `hoger` (deferred to a draft) became `beter`.

The 160 pictures are hand-drawn SVG sheets in the first lesson’s flat, muted, grainy style, built by
`scripts/practice-art/build.mjs` from one module per topic (`animals`, `jobs`, `character`, `cooking`, `care`,
`garden`, `weather`, `sport`). Bram and Lotte reuse man.svg / woman.svg path data; the old man and Noor reuse
old-man.svg and child.svg. Each sheet is a 4 × 5 grid of 400 × 300 cells (no crop table needed) and was
reviewed at full size and at lesson thumbnail size; `art.js` lists each cell’s description.

Corrections to earlier practice lessons in this batch: the clothing superlative now names the blue coat,
which the story makes the cheaper one; the hotel receptionist no longer asks for “de identiteitskaart” in
direct speech, and Bram puts his bag in the cupboard instead of “having” it there; the digital story now
says whose battery is empty.

### Earlier batches

Eleven additions in the current A1→A2/A2 batch provide **220 lesson targets, 2,750 answers and 220 illustrations (217 net new published entries: oma, opa and ontbijt move earlier from core grammar lessons)**:

| Module | Anchor | Topic |
| --- | --- | --- |
| a2-wonen | gisteren | Housing and renting |
| a2-familie-feest | gisteren | Extended family and celebrations |
| a2-markt | gisteren | Fruit, vegetables and market purchases |
| a2-restaurant | omdat | Ordering and paying for a meal |
| a2-vrije-tijd | omdat | Hobbies, sport, music and culture |
| a2-hotel | omdat | Reservations, rooms and hotel requests |
| a2-huishouden | ik-sta-op | Household chores |
| a2-kleding-kiezen | groter | Clothing details and comparisons |
| a2-buiten | toen | Outdoors and past-tense stories |
| a2-afspraak | ik-voel-me | Health vocabulary and changing appointments |
| a2-digitaal | die-dat | Devices, messages and digital tasks |

The first eighteen core grammar lessons are published (`coreIndex < 18`); the remaining twenty-four are drafts. Do not promote them without reviewing and validating them. Vocabulary counts are editorial coverage measures, not CEFR certification or evidence of spontaneous speaking ability.

## Earlier verification and assets (47-lesson checkpoint)

- All 47 available lessons pass content validation.
- `npm test`: **37 passed** on the final 47-lesson snapshot, including content validation, complete audio coverage, prompt consistency and bookmark migration.
- `npm run build`: passed after the final corrections (17.09 seconds). The existing large-JavaScript-chunk warning remains.
- Full browser walkthrough: **10 passed (6.0 minutes)** across all 47 lessons. After the last grammar wording/accepted-answer edits, 3 focused checks passed (18.3 seconds). All sixty digital/hotel/market phone crops were visually reviewed. The market crop correction passed a focused image check.
- Audio is complete: **26,956 verified recordings for 13,343 Dutch texts**. The final correction run generated 18 recordings and removed 18 unused. No audio job is running.
- All **580 practice illustrations** are installed in `public/images/practice/`; `art.js` stores reviewed row/column crop bounds and original sheet aspect ratios. `Illustration.jsx` clips the SVG viewport to prevent neighbouring cells appearing. All outdoors, digital, hotel and market phone crops have been visually reviewed. Screenshots: `/tmp/langzaam-a2-shots`.
- Image-generation prompts and current-batch source IDs: `docs/image-prompts/a2-batch-2026-10.md`, `a2-restaurant-health.md`, `a2-hobbies.md`, `a2-outdoors.md`, `a2-digital.md`, `a2-hotel.md`, `a2-market.md`. Originals live under `~/.codex/generated_images/01a0f8b8-7c60-7c90-8b99-755f7881dc27/`.
- Image corrections already made include apartment versus storey, gate versus fence, uncle/aunt family relationships, cold versus sneezing, and course-order highlights on restaurant dishes.

## Shared behaviour and authoring rules

- `practice/entry.js` creates authored entries with two example contexts. `build-lesson.js` builds practice pages from those examples, twenty grammar tasks, eight story lines and eight comprehension questions. Optional `extraTranslations` add authored complete-sentence retrieval for smaller topics; see the authoring guide.
- Digital vocabulary examples avoid leaving a relative die/dat directly beside a hidden target noun; relative clauses remain in grammar practice and in sentences where their antecedent is an earlier word.
- Whole-noun recall hides articles, quantity/adjective modifiers and unambiguous possessive determiners. Explicit `example.gap` spans are validated. Grammar gaps and full-sentence rewrites are on separate pages. The former third arrangement page is now an aloud example page, retaining its saved page ID.
- Tokenization now keeps apostrophe plurals intact, with straight and curly apostrophes handled equally. `paprika’s` no longer credits the unrelated later time-expression word `’s`. Existing `foto’s` and `collega’s` forms are explicitly declared and stay deferred until their original lessons; regression tests are in `tests/text.test.js`.
- Arrangements accept only alternative sentences using exactly the supplied tiles; typed translations retain equivalent alternatives. Regression tests are in `tests/practice-prompts.test.js`.
- `integrate.js` moves word ownership to its earliest introduction and defers later inflections to their original lessons. Every practice target must be new at its anchor. `woning` and `uitnodiging` are separate nouns, no longer forms of `woningnood` and `uitnodigen`.
- Encounter tracking distinguishes contextual homographs such as shower/showering, bicycle/cycling, fog/missing, and open/opening. Avoid casually adding split verb forms that collide with nouns/adjectives; use joined forms where needed and review tracking if new ambiguity arises.
- Thirty mixed core drill pages have been split by response format, adding 68 focused pages and retaining all 12,741 course answers. Original page IDs and per-item recall IDs are preserved; numeric bookmarks migrate via sourceIndex and navigation now saves positionStepIds. Grammar accuracy corrections and sources are in the review record.
- All published lessons remain available regardless of completion sequence. Saved lesson/page IDs stay stable. The word collection reveals later forms only when their lesson is opened.
- Header/sidebar volume reflects the open lesson. First-stage journey text now says over 500 entries.
- Keep Dutch vocabulary and grammar within what is taught by the insertion point. Validator output checks that boundary, recurrence, illustration existence and answer counts; it does not certify natural language quality.

## Current verification

- 2026-10-05: all 56 available lessons pass content validation (`--published`); `npm test` 42 passed;
  `npx playwright test` 12 passed (7.2 minutes), solving every published lesson, loading every new picture
  at phone width and checking the level goals; `npm run build` passed (the large-chunk warning remains).
- Audio: 2,252 new recordings; 29,474 verified for 14,602 Dutch texts in two voices; 14 unused removed.
- A before/after snapshot of every lesson's title, targets, steps, reviews and introduced words showed no
  change to any pre-existing lesson except the intended corrections listed above, plus the two drafts
  (hem-haar, had-gedaan) that no longer first introduce bakken and eerlijk.

## Next work

1. A2 has reached 1,004 entries. Further A2 topics (for example furniture once lesson 20 introduces
   liggen/zetten/hangen, holidays, media, services) can take it towards 1,500 before B1 begins.
2. Keep existing lesson text and exercises intact. Append new modules after current A2 practice to
   preserve the earlier review schedule, or explicitly preserve review selections if inserting elsewhere.
3. Use 15–25 entries and 245–300 answers as the authoring bounds; 20/250 remains the default.
4. Keep README and curriculum counts current. Do not alter imported source, public assets or the audio
   manifest during a full browser walkthrough: Vite reload can reset typed answers.

## Commands and repository cautions

- Content: `node scripts/validate-content.mjs --published`. The unrestricted audit includes unfinished drafts and intentionally does not pass.
- Audio: `caffeinate -i node scripts/generate-audio.mjs` with approved escalation for macOS speech. The incremental job verifies existing recordings, retries failures, writes the manifest and prunes unused clips.
- Checks: `npm test`, `npm run build`, `npx playwright test` (browser needs approved escalation), `git diff --check`.
- Work is local; no commit, push or publishing requested. Preserve pre-existing dirty changes and `package-lock.json`. Avoid printing full status because thousands of audio files are untracked.
- Do not spawn subagents unless explicitly requested by the user or applicable instructions.

## Earlier illustration provenance

The eighteen first-stage sheets were generated under `~/.codex/generated_images/01a0ecd1-6eab-75f3-a4f2-af92a9969ad8/`. Filenames use `exec-` plus the following ID plus `.png`:

| Installed sheet | Generated source ID |
| --- | --- |
| home | ed75fabd-c800-4fb8-9a27-50a85702539f |
| clothing | e260b305-714e-450c-aff7-b61d498ae01c |
| colours | 615e7ba5-dda9-4e82-85e7-718bbf1e1f0c |
| food | 0a3cb12a-d72a-49db-b164-f40a50655ec7 |
| actions | 44198067-6485-452a-a0f9-24e237319e0c |
| places | 0a12856c-d1b8-4aec-9493-be9e7061eadc |
| household | 1505e512-d39d-49e7-b1c4-d85ed6918d88 |
| personal | e792b56d-e6f4-46be-bb9b-0ecd02289dfb |
| body | 54a4e633-ef77-44ed-8cc9-8386c6b09c1c |
| weather | ec1ff566-832c-4cb2-b362-0479bb832477 |
| shopping | 9a3f2734-6fc4-49a4-b761-4e7337b13c1c |
| numbers | dcc5f1b6-4cf4-4ab8-bce7-86605121ec3a |
| calendar | 6f16adf4-8980-4fc3-a6ef-05b71eeac165 |
| directions | 154303db-6751-474f-a4c4-597a5afc75c2 |
| routines | ab6796aa-4957-474c-83f1-ec34abed2258 |
| school | 21091e44-e2e9-4073-87cd-9d6a18352289 |
| travel | 4a234004-bac2-42e0-96b0-0d8475a570e6 |
| descriptions | e647bff5-d844-413f-99a8-1ff2c7621d74 |

