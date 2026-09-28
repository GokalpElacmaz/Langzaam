/**
 * A deliberately small, cumulative vocabulary. English glosses are contextual:
 * bank means a park bench here; loopt and zit are singular present-tense forms.
 * Images are semantic keys resolved by the presentation layer.
 */
export const words = [
  { id: 'dit', dutch: 'dit', english: 'this', lessonId: 'first-words' },
  { id: 'is', dutch: 'is', english: 'is', lessonId: 'first-words' },
  { id: 'een', dutch: 'een', english: 'a / an', lessonId: 'first-words' },
  { id: 'huis', dutch: 'huis', english: 'house', lessonId: 'first-words', image: 'house' },
  { id: 'boom', dutch: 'boom', english: 'tree', lessonId: 'first-words', image: 'tree' },
  { id: 'bank', dutch: 'bank', english: 'bench', lessonId: 'first-words', image: 'bench' },
  { id: 'de', dutch: 'de', english: 'the', lessonId: 'people' },
  { id: 'man', dutch: 'man', english: 'man', article: 'de', lessonId: 'people', image: 'man' },
  { id: 'vrouw', dutch: 'vrouw', english: 'woman', article: 'de', lessonId: 'people', image: 'woman' },
  { id: 'loopt', dutch: 'loopt', english: 'walks / is walking', lessonId: 'small-actions', image: 'man-walking' },
  { id: 'zit', dutch: 'zit', english: 'sits / is sitting', lessonId: 'small-actions', image: 'woman-sitting' },
];

export const lessons = [
  {
    id: 'first-words',
    title: 'A small beginning',
    subtitle: 'A house. A tree. A bench.',
    description: 'Six little words, met again and again. Look, listen, and get comfortable with one simple sentence.',
    newWordIds: ['dit', 'is', 'een', 'huis', 'boom', 'bank'],
    image: 'house',
    duration: '8–12 min',
    grammar: 'Meet the pattern “Dit is een …” through repetition: “This is a …”.',
    steps: [
      {
        id: 'first-words-look', type: 'observe', title: 'A little world',
        instruction: 'Look at each picture. Listen as often as you like. There is no need to memorise everything yet.',
        wordIds: ['dit', 'is', 'een', 'huis', 'boom', 'bank'],
        sentence: 'Dit is een huis.', translation: 'This is a house.', image: 'house',
        cards: [
          { wordId: 'huis', sentence: 'Dit is een huis.', translation: 'This is a house.', image: 'house' },
          { wordId: 'boom', sentence: 'Dit is een boom.', translation: 'This is a tree.', image: 'tree' },
          { wordId: 'bank', sentence: 'Dit is een bank.', translation: 'This is a bench.', image: 'bench' },
        ],
        note: '“Dit” means “this”, “is” means “is”, and “een” means “a” or “an”. Only the last word changes.',
      },
      {
        id: 'first-words-recognise', type: 'picture-choice', title: 'A familiar shape',
        instruction: 'Read the sentence and choose the matching picture.',
        sentence: 'Dit is een boom.', translation: 'This is a tree.',
        choices: [
          { id: 'huis', label: 'een huis', image: 'house' },
          { id: 'boom', label: 'een boom', image: 'tree' },
          { id: 'bank', label: 'een bank', image: 'bench' },
        ],
        answer: 'boom', wordIds: ['dit', 'is', 'een', 'boom'],
        explanation: '“Boom” means “tree”. The beginning stays the same: “Dit is een …”.',
      },
      {
        id: 'first-words-listen', type: 'listen-choice', title: 'Let your ears lead',
        instruction: 'Listen to the sentence. Which picture belongs to it?',
        sentence: 'Dit is een bank.', translation: 'This is a bench.',
        choices: [
          { id: 'boom', label: 'een boom', image: 'tree' },
          { id: 'bank', label: 'een bank', image: 'bench' },
          { id: 'huis', label: 'een huis', image: 'house' },
        ],
        answer: 'bank', wordIds: ['dit', 'is', 'een', 'bank'],
        explanation: 'Here, “bank” is a bench, like the one in the picture.',
      },
      {
        id: 'first-words-build', type: 'arrange', title: 'Build a familiar sentence',
        instruction: 'Tap the words in order to say: “This is a house.”',
        sentence: 'Dit is een huis.', translation: 'This is a house.', image: 'house',
        tokens: ['huis', 'een', 'Dit', 'is'], answer: 'Dit is een huis.',
        wordIds: ['dit', 'is', 'een', 'huis'],
        explanation: 'The pattern is “Dit” + “is” + “een” + the thing you see.',
      },
      {
        id: 'first-words-complete-sentence', type: 'cloze', title: 'One small missing word',
        instruction: 'Choose the word that completes the sentence.',
        sentence: 'Dit ___ een bank.', fullSentence: 'Dit is een bank.', translation: 'This is a bench.', image: 'bench',
        choices: [{ id: 'een', label: 'een' }, { id: 'is', label: 'is' }, { id: 'dit', label: 'dit' }],
        answer: 'is', wordIds: ['dit', 'is', 'een', 'bank'],
        explanation: '“Is” connects “this” to what it is: “Dit is een bank.”',
      },
      {
        id: 'first-words-write', type: 'dictation', title: 'Listen, then write',
        instruction: 'Listen and type the sentence. Replay it slowly whenever you need to.',
        sentence: 'Dit is een boom.', translation: 'This is a tree.', image: 'tree',
        answer: 'Dit is een boom.', wordIds: ['dit', 'is', 'een', 'boom'],
        hint: 'Four words. Start with “Dit”. Capitals and the full stop do not matter.',
        explanation: '“Dit is een boom.” You have heard this same sentence shape several times now.',
      },
      {
        id: 'first-words-read', type: 'story', title: 'Your first little page',
        instruction: 'Read at your own pace. Listen to each line, or read it aloud yourself.',
        image: 'neighbourhood', wordIds: ['dit', 'is', 'een', 'huis', 'boom', 'bank'],
        lines: [
          { sentence: 'Dit is een huis.', translation: 'This is a house.', image: 'house' },
          { sentence: 'Dit is een boom.', translation: 'This is a tree.', image: 'tree' },
          { sentence: 'Dit is een bank.', translation: 'This is a bench.', image: 'bench' },
          { sentence: 'Dit is een huis.', translation: 'This is a house.', image: 'house' },
        ],
      },
      {
        id: 'first-words-finish', type: 'complete', title: 'A beginning worth repeating',
        instruction: 'You have met six words and one sentence pattern. Come back to them before adding more.',
        wordIds: ['dit', 'is', 'een', 'huis', 'boom', 'bank'], image: 'house',
      },
    ],
  },
  {
    id: 'people',
    title: 'Someone in the picture',
    subtitle: 'The same world, two new faces.',
    description: 'Keep your familiar sentence. Add a man, a woman, and one small word for “the”.',
    newWordIds: ['de', 'man', 'vrouw'],
    image: 'woman', duration: '8–12 min',
    grammar: '“Een” introduces a person; “de” points to a particular person: “een man”, then “de man”.',
    steps: [
      {
        id: 'people-look', type: 'observe', title: 'Two people to meet',
        instruction: 'Your sentence is already familiar. Notice the new words at the end.',
        sentence: 'Dit is een man.', translation: 'This is a man.', image: 'man',
        wordIds: ['dit', 'is', 'een', 'de', 'man', 'vrouw'],
        cards: [
          { wordId: 'man', sentence: 'Dit is een man.', translation: 'This is a man.', image: 'man' },
          { wordId: 'vrouw', sentence: 'Dit is een vrouw.', translation: 'This is a woman.', image: 'woman' },
          { wordId: 'de', sentence: 'Dit is de man.', translation: 'This is the man.', image: 'man' },
        ],
        note: '“Een man” is “a man”. “De man” is “the man”. The same change works with “vrouw”.',
      },
      {
        id: 'people-recognise', type: 'picture-choice', title: 'A familiar face',
        instruction: 'Choose the picture that matches the sentence.',
        sentence: 'Dit is een vrouw.', translation: 'This is a woman.',
        choices: [
          { id: 'man', label: 'een man', image: 'man' },
          { id: 'bank', label: 'een bank', image: 'bench' },
          { id: 'vrouw', label: 'een vrouw', image: 'woman' },
        ],
        answer: 'vrouw', wordIds: ['dit', 'is', 'een', 'vrouw'],
        explanation: '“Vrouw” means “woman”. Everything before it is a pattern you already know.',
      },
      {
        id: 'people-listen', type: 'listen-choice', title: 'A familiar sound, a new face',
        instruction: 'Listen and choose the matching picture.',
        sentence: 'Dit is de man.', translation: 'This is the man.',
        choices: [
          { id: 'vrouw', label: 'de vrouw', image: 'woman' },
          { id: 'man', label: 'de man', image: 'man' },
          { id: 'boom', label: 'de boom', image: 'tree' },
        ],
        answer: 'man', wordIds: ['dit', 'is', 'de', 'man'],
        explanation: 'Listen for “man”. “De man” means “the man”.',
      },
      {
        id: 'people-build', type: 'arrange', title: 'You know how this begins',
        instruction: 'Build the sentence: “This is a woman.”',
        sentence: 'Dit is een vrouw.', translation: 'This is a woman.', image: 'woman',
        tokens: ['een', 'vrouw', 'is', 'Dit'], answer: 'Dit is een vrouw.',
        wordIds: ['dit', 'is', 'een', 'vrouw'],
        explanation: 'The familiar four-word pattern works for people too.',
      },
      {
        id: 'people-complete-sentence', type: 'cloze', title: 'A person becomes the person',
        instruction: 'Complete “This is the woman.” Choose the word for “the”.',
        sentence: 'Dit is ___ vrouw.', fullSentence: 'Dit is de vrouw.', translation: 'This is the woman.', image: 'woman',
        choices: [{ id: 'is', label: 'is' }, { id: 'een', label: 'een' }, { id: 'de', label: 'de' }],
        answer: 'de', wordIds: ['dit', 'is', 'de', 'vrouw'],
        explanation: '“De” means “the”. “Een vrouw” is a woman; “de vrouw” is the woman.',
      },
      {
        id: 'people-write', type: 'dictation', title: 'Write what you hear',
        instruction: 'Listen, replay, and type the sentence.',
        sentence: 'Dit is de man.', translation: 'This is the man.', image: 'man',
        answer: 'Dit is de man.', wordIds: ['dit', 'is', 'de', 'man'],
        hint: 'Four words. The small word before “man” means “the”.',
        explanation: '“Dit is de man.” The new word “de” fits into your familiar sentence.',
      },
      {
        id: 'people-read', type: 'story', title: 'The world gets a little fuller',
        instruction: 'Read the old words beside the new ones. Take your time with each line.',
        image: 'neighbourhood', wordIds: ['dit', 'is', 'een', 'de', 'huis', 'boom', 'bank', 'man', 'vrouw'],
        lines: [
          { sentence: 'Dit is een huis.', translation: 'This is a house.', image: 'house' },
          { sentence: 'Dit is een boom.', translation: 'This is a tree.', image: 'tree' },
          { sentence: 'Dit is een bank.', translation: 'This is a bench.', image: 'bench' },
          { sentence: 'Dit is een man.', translation: 'This is a man.', image: 'man' },
          { sentence: 'Dit is een vrouw.', translation: 'This is a woman.', image: 'woman' },
          { sentence: 'Dit is de vrouw.', translation: 'This is the woman.', image: 'woman' },
        ],
      },
      {
        id: 'people-finish', type: 'complete', title: 'Only three new words',
        instruction: 'You have made room for two people and the word “the”. A little repetition will help them feel familiar.',
        wordIds: ['de', 'man', 'vrouw'], image: 'woman',
      },
    ],
  },
  {
    id: 'small-actions',
    title: 'A little movement',
    subtitle: 'One person walks. One person sits.',
    description: 'Meet just two actions, using people and places you already recognise.',
    newWordIds: ['loopt', 'zit'],
    image: 'man-walking', duration: '8–12 min',
    grammar: 'Meet the person + action pattern: “De man loopt.” In this scene it means “The man is walking.”',
    steps: [
      {
        id: 'small-actions-look', type: 'observe', title: 'Something is happening',
        instruction: 'Look at what each person is doing. Listen to the two short sentences.',
        sentence: 'De man loopt.', translation: 'The man is walking.', image: 'man-walking',
        wordIds: ['de', 'man', 'vrouw', 'loopt', 'zit'],
        cards: [
          { wordId: 'loopt', sentence: 'De man loopt.', translation: 'The man is walking.', image: 'man-walking' },
          { wordId: 'zit', sentence: 'De vrouw zit.', translation: 'The woman is sitting.', image: 'woman-sitting' },
        ],
        note: '“Loopt” tells us the person walks. “Zit” tells us the person sits. For now, just enjoy these two patterns.',
      },
      {
        id: 'small-actions-recognise', type: 'picture-choice', title: 'Notice the action',
        instruction: 'Choose the picture that matches the whole sentence.',
        sentence: 'De man loopt.', translation: 'The man is walking.',
        choices: [
          { id: 'woman-sitting', label: 'De vrouw zit.', image: 'woman-sitting' },
          { id: 'man-walking', label: 'De man loopt.', image: 'man-walking' },
          { id: 'bench', label: 'een bank', image: 'bench' },
        ],
        answer: 'man-walking', wordIds: ['de', 'man', 'loopt'],
        explanation: '“De man” tells you who. “Loopt” tells you what he is doing.',
      },
      {
        id: 'small-actions-listen', type: 'listen-choice', title: 'Hear the quiet moment',
        instruction: 'Listen to the sentence and choose its picture.',
        sentence: 'De vrouw zit.', translation: 'The woman is sitting.',
        choices: [
          { id: 'man-walking', label: 'De man loopt.', image: 'man-walking' },
          { id: 'bench', label: 'een bank', image: 'bench' },
          { id: 'woman-sitting', label: 'De vrouw zit.', image: 'woman-sitting' },
        ],
        answer: 'woman-sitting', wordIds: ['de', 'vrouw', 'zit'],
        explanation: '“Zit” means “sits” or, in this picture, “is sitting”.',
      },
      {
        id: 'small-actions-build', type: 'arrange', title: 'Three words are enough',
        instruction: 'Build the sentence: “The man is walking.”',
        sentence: 'De man loopt.', translation: 'The man is walking.', image: 'man-walking',
        tokens: ['loopt', 'De', 'man'], answer: 'De man loopt.',
        wordIds: ['de', 'man', 'loopt'],
        explanation: 'Dutch uses “loopt” here. You do not need an extra word for the English “is”.',
      },
      {
        id: 'small-actions-complete-sentence', type: 'cloze', title: 'One word for the action',
        instruction: 'Look at the picture. Complete “The woman is sitting.”',
        sentence: 'De vrouw ___.', fullSentence: 'De vrouw zit.', translation: 'The woman is sitting.', image: 'woman-sitting',
        choices: [{ id: 'zit', label: 'zit' }, { id: 'loopt', label: 'loopt' }, { id: 'is', label: 'is' }],
        answer: 'zit', wordIds: ['de', 'vrouw', 'zit'],
        explanation: 'The picture shows the woman sitting: “De vrouw zit.”',
      },
      {
        id: 'small-actions-write', type: 'dictation', title: 'Listen to a little movement',
        instruction: 'Listen and type the three words you hear.',
        sentence: 'De man loopt.', translation: 'The man is walking.', image: 'man-walking',
        answer: 'De man loopt.', wordIds: ['de', 'man', 'loopt'],
        hint: 'Start with “De man”. The last word has a double “o”.',
        explanation: '“De man loopt.” This sentence now belongs to your little collection.',
      },
      {
        id: 'small-actions-read', type: 'story', title: 'An ordinary, lovely moment',
        instruction: 'All the words on this page are words you have met. Read, listen, and picture the scene.',
        image: 'neighbourhood', wordIds: ['dit', 'is', 'een', 'de', 'huis', 'boom', 'bank', 'man', 'vrouw', 'loopt', 'zit'],
        lines: [
          { sentence: 'Dit is een huis.', translation: 'This is a house.', image: 'house' },
          { sentence: 'Dit is een boom.', translation: 'This is a tree.', image: 'tree' },
          { sentence: 'Dit is een bank.', translation: 'This is a bench.', image: 'bench' },
          { sentence: 'De vrouw zit.', translation: 'The woman is sitting.', image: 'woman-sitting' },
          { sentence: 'De man loopt.', translation: 'The man is walking.', image: 'man-walking' },
          { sentence: 'De vrouw zit.', translation: 'The woman is sitting.', image: 'woman-sitting' },
        ],
      },
      {
        id: 'small-actions-finish', type: 'complete', title: 'A small world you can describe',
        instruction: 'Eleven words. Three short chapters. Keep revisiting this world before making it bigger.',
        wordIds: ['loopt', 'zit'], image: 'neighbourhood',
      },
    ],
  },
];

export const wordById = Object.fromEntries(words.map((word) => [word.id, word]));
export const lessonById = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson]));

/** Explicit speech corpus. Cloze prompts use their completed sentence. */
export const audioTexts = [...new Set([
  ...words.map((word) => word.dutch),
  ...lessons.flatMap((lesson) => lesson.steps.flatMap((step) => [
    step.fullSentence || step.sentence,
    ...(step.cards || []).map((card) => card.sentence),
    ...(step.lines || []).map((line) => line.sentence),
    ...(step.choices || []).map((choice) => choice.label),
  ])),
].filter(Boolean))];
