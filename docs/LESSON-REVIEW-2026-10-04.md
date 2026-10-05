# Existing-lesson review — 4 October 2026

The user's latest priority is to fix existing lessons before adding more A2 content. This review covers the 47 available lessons (18 core, 29 practice). The unregistered transport draft remains outside the course.

## Corrections

- Separated 30 mixed core drill pages into pages with one response format: missing words, whole sentences, translation/word recall, or dictation. This adds 68 short pages while retaining all 12,741 course answers. Practice lessons retain their 36 pages, 250 answers and 20 targets.
- Preserved authored page IDs and individual answer event IDs. Numeric bookmarks migrate using the original page index; subsequent navigation saves page IDs. Revisiting a regrouped answer does not count it as a new successful recall.
- Corrected the article-based pronoun rule for people, and accepted hij/zij alongside generic het for children. Added feminine reference to tafel alongside masculine reference. [Taaladvies: pronoun reference](https://taaladvies.net/verwijzingsproblemen-met-voornaamwoorden-van-de-derde-persoon-enkelvoud-algemeen/), [Team Taaladvies: tafel](https://www.vlaanderen.be/team-taaladvies/taaladviezen/tafel-hem-haar-ze).
- Corrected dag → dagen: the vowel changes from short to long. Corrected been → benen, which follows the regular long-vowel spelling pattern. [Onze Taal: vowel changes in plurals](https://onzetaal.nl/taalloket/dag-dagen-schip-schepen).
- Clarified the subject change and jij-inversion instructions, and narrowed overly absolute explanations about adverbs, neutral negation, subordinate clauses, requests and word order. Removed the inaccurate comparison with German possessives and the unnecessary historical explanation grouping all four modal verbs together.
- Clarified that jaar stays singular for the age exercises, while jaren can occur with a number in other contexts. [Taaladvies: jaar/jaren](https://taaladvies.net/jaar-of-jaren-enkelvoud-of-meervoud-na-telwoord/).
- Corrected the claim that moet niet cannot express a prohibition; mag niet remains the clear pattern requested in those exercises. [Team Taaladvies: hoeven/moeten](https://www.vlaanderen.be/team-taaladvies/taaladviezen/hoeven-moeten).
- Clarified that a comma before omdat is not compulsory. [Team Taaladvies: omdat and commas](https://www.vlaanderen.be/team-taaladvies/taaladviezen/omdat-komma).
- Retained standard jullie + je after checking the rule; no correction was needed. [Taaladvies: reflexive je](https://taaladvies.net/jullie-vergissen-zich-of-jullie-of-je/).

## Prompts, illustrations and audio

The existing whole-noun gap fix is verified across every practice module: balcony recall asks for the complete article/noun phrase. The checks cover adjective and quantity modifiers, explicit gap spans, hidden target words, sentence-tile alternatives and page consistency.

Digital examples no longer leave a relative die/dat beside the hidden target noun. A hotel story reference now explicitly names Bram. Market card crop bounds have been corrected and rechecked at phone width. All sixty digital/hotel/market crops were reviewed.

Rechecked the older counting illustrations (two cats, three apples, four chairs), clock, family, young tree and old man at full and thumbnail sizes. Also inspected the directions, numbers, calendar and body sheets and the calendar's phone crop. No further defect was found in this selected visual review; this is not a guarantee that all artwork is error-free.

Audio generation finished: 26,956 verified recordings for 13,343 Dutch texts in two voices. The last correction run generated 18 recordings and removed 18 unused recordings. Subsequent changes to grammar prose and accepted alternatives do not change the spoken corpus.

## Validation

- 37 unit/content/audio checks pass on the final edits.
- Full browser suite: 10 passed in 6.0 minutes, including solving every published lesson, phone layout, images, audio, and bookmark migration.
- After the final grammar wording and accepted-answer changes, 3 focused browser checks passed (18.3 seconds), and a fresh production build passed (17.09 seconds).
- The existing build warning about large JavaScript chunks remains.
- No commit, push or deployment was performed.

Regression coverage: tests/drill-pages.test.js, tests/practice-prompts.test.js, tests/text.test.js, and tests/e2e.spec.js.

