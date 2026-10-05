/** One answer format per page; retain the authored IDs for existing learner progress. */
export function answerFormat(item) {
  if (item.listen) return 'dictation';
  if (item.label) return 'conjugation';
  if (item.nl?.includes('___')) return 'gaps';
  if (item.nl) return 'sentences';
  return 'recall';
}

const formats = {
  gaps: ['Missing words', 'Type only the missing word or phrase in each blank.'],
  sentences: ['Whole sentences', 'Write a complete Dutch sentence for each prompt. Follow the task beside it.'],
  dictation: ['Dictation', 'Listen and type exactly what you hear. Replay as often as you like.'],
  conjugation: ['Verb forms', 'Type the verb form for each subject.'],
  recall: ['Translation', 'Translate each English prompt into Dutch.'],
};

export function splitDrillPages(pages, lessonId) {
  let part = 'Words';
  return pages.flatMap((page, sourceIndex) => {
    part = page.part || part;
    const id = page.id || `${lessonId}-${String(sourceIndex + 1).padStart(2, '0')}`;
    const step = { ...page, id, part, sourceIndex };
    if (page.type !== 'drill') return [step];
    const groups = new Map();
    page.items.forEach((item, i) => {
      const format = answerFormat(item);
      if (!groups.has(format)) groups.set(format, []);
      groups.get(format).push({ ...item, progressId: `${id}:${i}` });
    });
    if (groups.size === 1) return [{ ...step, items: [...groups.values()][0] }];
    return [...groups].map(([format, items], groupIndex) => {
      const [title, instruction] = formats[format];
      const picturedWords = format === 'recall' && items.some(item => !item.en);
      return {
        ...step,
        id: groupIndex === 0 ? id : `${id}-${format}`,
        title: `${page.title} — ${title.toLowerCase()}`,
        instruction: picturedWords
          ? 'Name each pictured noun without an article. Translate the English verbs in their infinitive form.'
          : instruction,
        items: items.map(item => format === 'sentences' && !item.task && !page.task
          ? { ...item, task: 'Answer in full' } : item),
      };
    });
  });
}
