# The first three chapters

This demo is the opening of a much longer Dutch reading course, not a complete proficiency level. It starts before A1. Finishing these chapters does not imply A1 or B2 proficiency.

The reader sees a house, a tree, a bench, and two people repeatedly. New vocabulary grows slowly: six words in chapter 1, three in chapter 2, and two in chapter 3. Every Dutch sentence uses only words introduced in that chapter or an earlier chapter. English instructions and translations reduce the initial burden.

| Chapter | New vocabulary | Repeated pattern |
| --- | --- | --- |
| A small beginning | dit, is, een, huis, boom, bank | Dit is een … |
| Someone in the picture | de, man, vrouw | Dit is een … / Dit is de … |
| A little movement | loopt, zit | De man loopt. / De vrouw zit. |

“Bank” means a bench in this setting. “Loopt” and “zit” are singular present-tense forms, with contextual English translations “is walking” and “is sitting”. Noun gender and the article “het” are deliberately deferred. The indefinite article is written “een”; the numeral “één” is not introduced.

Each chapter has eight pages: observe, select a picture, listen and select, arrange a sentence, fill a gap, listen and write, read a short illustrated page, and finish. Readers should be able to repeat audio, request a translation, and revisit pages. A gentle correction is practice, not a failure state.

## Content contract

`src/content.js` exports `words`, `lessons`, `wordById`, `lessonById`, and `audioTexts`.

- Words contain `id`, `dutch`, `english`, and `lessonId`. Concrete nouns and actions have an optional semantic `image` key; function words use text instead of a potentially misleading illustration. Optional `article` metadata is used only for articles introduced with that word.
- Lessons contain `id`, `title`, `subtitle`, `description`, `newWordIds`, `grammar`, `image`, `duration`, and `steps`.
- Every step has a globally unique `id`, `type`, English `title` and `instruction`, and `wordIds` describing the words encountered or assessed. Most have `sentence`, `translation`, and `image`.
- `observe` adds `cards: [{wordId, sentence, translation, image}]` and an optional English `note`.
- `picture-choice` and `listen-choice` add `choices: [{id, label, image}]` and `answer` equal to a choice ID.
- `arrange` adds scrambled `tokens` and `answer` equal to the complete Dutch sentence.
- `cloze` contains a `sentence` with `___`, a `fullSentence` for playback, choices, and a choice-ID `answer`.
- `dictation` uses the complete `sentence` as its audio prompt and `answer`; an English `hint` is optional.
- `story` contains `lines: [{sentence, translation, image}]`.
- `complete` supplies the text for a completion page; completion and navigation are handled by the interface.
- `explanation` fields supply targeted English feedback for assessed exercises.
- `audioTexts` is an explicit, unique corpus of all vocabulary, full sentences, and choice labels. Blanked cloze prompts are excluded in favour of full sentences.

Image keys are `house`, `tree`, `bench`, `man`, `woman`, `man-walking`, `woman-sitting`, and `neighbourhood`.

## Progress and repetition

`src/learning.js` contains pure helpers; it does not read or write browser storage. The application owns persistence. `createInitialState()` returns:

```js
{
  version: 1,
  words: {},
  completedSteps: {}, // Globally unique step ID -> true
  completedLessons: [], // Lesson IDs
  processedEvents: {} // Stable encounter event ID -> true
}
```

`recordEncounter(state, wordIds, correct, now, eventId)` returns new state and leaves old state intact. `correct` is `true` for a successful recall, `false` for a correction, or `null` for an unscored encounter. `now` is a millisecond timestamp and defaults to `Date.now()`. Duplicate word IDs in one event count only once. Reusing an `eventId` returns the unchanged state; pass a stable ID such as `passed:first-words-build` for one-time lesson progress and a fresh ID for an intentional review attempt.

Each word record has `encounters`, `correctCount`, `incorrectCount`, `streak`, `stage`, `dueAt`, `firstSeenAt`, `lastSeenAt`, and `mastered`. An exposure alone does not count as successful recall. The initial successful recall schedules ten minutes; subsequent successful recalls when due schedule one day, three days, seven days, and fourteen days. Practice before the due time cannot advance a stage. A correction reduces the stage by one, resets the successful streak, and makes the word immediately available for practice.

The internal `mastered` flag requires stage 3, at least five successful recalls, and a current streak of three. This is a deliberately conservative demo indicator of familiarity with an individual item, not a validated language proficiency measurement. One sitting of rapid correct answers cannot produce it. `getDueWords(state, words, now)` returns encountered words whose due time has arrived, sorted by due time; it does not introduce unseen words.

`completeStep(state, stepId)` and `completeLesson(state, lessonId)` update their respective completion records idempotently. `getLessonProgress(state, lesson)` counts all eight pages, including completion, and `getLearningSummary(state, words, now)` reports encountered words, internal mastery count, due words, exposures, and completed lessons. The app must call `completeLesson` only when the learner finishes that lesson.

`normalizeAnswer` and `isAnswerCorrect` tolerate capitalisation, spacing, and common punctuation while preserving Dutch spelling and word order.

## Extending the book

Future chapters should reuse known scenes and sentence patterns before adding a small set of words. Keep a cumulative vocabulary budget and validate Dutch exercise text against it. Expand grammar through many meaningful examples before naming a rule. Add human Dutch-language review before growing the curriculum extensively.

The later course should progress through everyday A1/A2 reading and listening, then broader B1/B2 contexts. Mathematics and physics should form a subsequent, separately reviewed track after demonstrated B2 readiness. The demo does not yet implement a B2 assessment, long-term curriculum, pronunciation scoring, or a scientifically calibrated retention model.

Run the learner and content checks with `node --test tests/learning.test.js` from the project directory.
