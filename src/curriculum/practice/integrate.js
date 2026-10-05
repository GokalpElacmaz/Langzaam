import { publishedCoreLessons } from '../levels.js';
/** Insert practice without renaming a grammar lesson or its saved page IDs. */
export function expandCurriculum(corePlan, catalog, modules) {
  const anchors = new Set(corePlan.map((lesson) => lesson.id));
  for (const module of modules) if (!anchors.has(module.after)) throw new Error('Unknown practice anchor: ' + module.after);
  // A word listed in several core lessons belongs to the first of them.
  const originalOwner = new Map();
  for (const lesson of corePlan) for (const id of [...lesson.targets, ...lesson.structure, ...lesson.vocabulary]) if (!originalOwner.has(id)) originalOwner.set(id, lesson.id);
  const lessonPlan = corePlan.flatMap((lesson, coreIndex) => [
    { ...lesson, track: 'core', coreIndex, status: coreIndex < publishedCoreLessons ? 'published' : 'draft', volume: coreIndex < 10 ? 0 : (lesson.volume || 0) },
    ...modules.filter((module) => module.after === lesson.id).map((module) => ({
      id: module.id, title: module.title, subtitle: module.subtitle, image: module.image,
      volume: module.volume, track: 'practice', status: 'published', targets: module.entries.map((entry) => entry.word.id),
      structure: [], vocabulary: [], grammar: [], reviewGrammar: module.reviewGrammar,
    })),
  ]);
  const dictionary = new Map(catalog.map((word) => [word.id, { ...word }]));
  for (const module of modules) for (const { word } of module.entries) {
    const previous = dictionary.get(word.id);
    const laterForms = { ...previous?.laterForms, ...word.laterForms };
    // Moving a word earlier must not also unlock a past tense or comparative early.
    const deferred = (previous?.forms || []).filter((form) => !word.forms.includes(form));
    if (deferred.length) {
      const owner = originalOwner.get(word.id);
      laterForms[owner] = [...new Set([...(laterForms[owner] || []), ...deferred])];
    }
    dictionary.set(word.id, { ...previous, ...word, laterForms });
  }
  const introduced = new Map();
  const previousPractice = [];
  const earlierTargets = [];
  for (const lesson of lessonPlan) {
    lesson.introducedWordIds = [];
    if (lesson.track === 'practice') {
      for (const id of lesson.targets) if (introduced.has(id)) throw new Error('Practice target was already introduced: ' + id);
      // Four small returns, followed by the app's due-word reviews.
      const scheduled = [1, 2, 4, 7].flatMap((lag, group) => previousPractice.at(-lag)?.targets.slice(group * 5, group * 5 + 5) || []);
      lesson.reviewWordIds = [...new Set([...scheduled, ...earlierTargets.slice().reverse()])].slice(0, 20);
      previousPractice.push(lesson);
    }
    for (const [category, kind] of [['targets', 'target'], ['structure', 'structure'], ['vocabulary', 'extra']]) {
      for (const id of lesson[category]) if (!introduced.has(id)) {
        if (!dictionary.has(id)) throw new Error('Undefined curriculum word: ' + id);
        introduced.set(id, lesson.id);
        lesson.introducedWordIds.push(id);
        dictionary.set(id, { ...dictionary.get(id), kind, lessonId: lesson.id });
      }
    }
    earlierTargets.push(...lesson.targets);
  }
  return { lessonPlan, words: [...dictionary.values()] };
}
