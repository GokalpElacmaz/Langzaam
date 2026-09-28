# Langzaam — a little Dutch, often.

A working, illustrated Dutch textbook demo. Three deliberately small Pre-A1 lessons introduce **11 words** across **24 pages**, with eight recurring illustrations and Belgian Dutch audio. Mathematics and physics remain on the roadmap **after B2**; no later-volume content is claimed to exist yet.

## Open locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173). To build a static release, run `npm run build`; the output is in `dist/`. `npm run preview` serves that release locally.

## Try the demo

1. Open the first lesson. Look and listen before turning the page.
2. Match pictures, listen without text, arrange words, fill a gap, and write what you hear.
3. Finish the little reading page and the lesson to unlock the next one.
4. Open **Your words** to search your collection, or **A little review** for recall practice.
5. Reading settings provide slower audio, optional English translations, a progress export, and a confirmed reset.

The next lesson adds three words; the last adds two. All exercise sentences reuse only vocabulary already introduced. There are no timers or streaks. Mistakes invite another attempt. Hints and transcripts are available, and assisted answers do not earn unassisted recall credit.

## Progress and repetition

Progress, preferences, and your reading position are saved in this browser's `localStorage`. There is no account, database, or cross-device sync. Clearing browser data removes progress; use the settings export to retain a readable JSON copy. Import/restore is not implemented yet.

The deterministic review scheduler distinguishes exposure from successful recall. Words return after 10 minutes, 1 day, 3 days, 7 days, and 14 days. Wrong answers make a word immediately due. Early practice is welcome but does not advance its review interval. Reopening the same lesson page cannot repeatedly inflate credit. This is a simple demo scheduler, not a validated proficiency assessment.

## Content and audio

- `src/content.js`: vocabulary, lessons, exercise data, and the speech corpus.
- `src/learning.js`: pure learner-state and review functions.
- `src/Lesson.jsx`: shared exercise renderer.
- `src/Review.jsx`: active recall flow.
- `src/audio-manifest.json`: exact text → audio mappings.
- `public/images/`: original matching SVG illustrations.
- `public/audio/`: bundled AAC audio at two speaking rates.
- `docs/CURRICULUM.md`: content contract and progression rules.

Audio is synthetic **Belgian Dutch, Ellen**, generated with macOS speech synthesis. Normal and slower clips were synthesized separately. The short phrases have modest rate differences. Recordings work without a paid API or an installed Dutch browser voice; browser speech is only a fallback. Regeneration on macOS: `node scripts/generate-audio.mjs` (requires the Ellen voice and access to macOS speech services).

For a full book, a Dutch language specialist should review the curriculum and recorded pronunciation before publication. The demo is authored content, with no live AI generation or automated agent publishing pipeline.

## Verify

```sh
npm test
npm run build
npx playwright install chromium
# Keep npm run dev running in another terminal:
npx playwright test
```

Learner-model tests cover scheduling, deduplication, mastery, wrong-answer recovery, normalization, and cumulative vocabulary. Browser tests cover the full book, answer feedback, saving/resume, the word collection, review, audio, and mobile layout.

## Scale after the demo

Keep the lesson schema and deterministic exercise engine. Next, agree the pacing and art/audio direction, expand one reviewed lesson batch, and evaluate the learner experience. A later publishing workflow can add vocabulary/grammar dependencies, content validators, audio/image production, and editorial approval. A database and account sync become useful once the curriculum and learning experience are established.
