/** Course goals count distinct entries cumulatively, including earlier levels. */
export const courseLevels = [
  { id: 'A1', name: 'Everyday foundations', volumes: [0], minWords: 500, maxWords: 1000, description: 'Everyday words and present-tense grammar for home, family, food, shopping and travel.' },
  { id: 'A2', name: 'A life in Dutch', volumes: [1, 2], minWords: 1000, maxWords: 1500, description: 'Talk about everyday situations, past experiences and future plans, and explain your choices.' },
  { id: 'B1', name: 'More independent Dutch', volumes: [3, 4], minWords: 2000, maxWords: 2500, description: 'Handle longer conversations about work, study and life in the city.' },
  { id: 'B2', name: 'Ideas and arguments', volumes: [5, 6], minWords: 4000, maxWords: 5000, description: 'Discuss society, follow lectures and develop arguments in speech and writing.' },
];

export const levelForVolume = volume => courseLevels.find(level => level.volumes.includes(volume)).id;
export const vocabularyGoal = level => `${level.minWords.toLocaleString('en-US')}–${level.maxWords.toLocaleString('en-US')}`;
export const practiceGoals = { minWords: 15, targetWords: 20, maxWords: 25, minAnswers: 245, targetAnswers: 250, maxAnswers: 300 };

/** Core grammar lessons are published in order; later ones stay drafts until written and reviewed. */
export const publishedCoreLessons = 27;
