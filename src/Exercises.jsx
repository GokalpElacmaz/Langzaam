import Illustration from './Illustration.jsx';
import React, { Fragment } from 'react';
import { Check, X } from 'lucide-react';
import { AudioButton } from './audio.jsx';
import { images, itemModel } from './content.js';
import { isAnswerCorrect } from './curriculum/text.js';

/** “**bold**”, “*italic*” and “[ending]” highlights, nestable, as React nodes. */
export function Rich({ text }) {
  const parts = [];
  let bold = false, italic = false, mark = false, buffer = '';
  const flush = () => { if (buffer) parts.push({ text: buffer, bold, italic, mark }); buffer = ''; };
  for (let i = 0; i < text.length; i += 1) {
    if (text.startsWith('**', i)) { flush(); bold = !bold; i += 1; }
    else if (text[i] === '*') { flush(); italic = !italic; }
    else if (text[i] === '[' || text[i] === ']') { flush(); mark = text[i] === '['; }
    else buffer += text[i];
  }
  flush();
  return parts.map((part, i) => {
    let node = part.text;
    if (part.mark) node = <mark>{node}</mark>;
    if (part.bold) node = <strong>{node}</strong>;
    if (part.italic) node = <em>{node}</em>;
    return <Fragment key={i}>{node}</Fragment>;
  });
}

export const imageAlt = (key) => images[key] || 'an illustration';

export { itemModel };
export const checkItem = (item, value, step) => isAnswerCorrect(value, itemModel(item, step).answer, item.accept);

/**
 * One drill item. `status` is null | 'correct' | 'wrong'; `revealed` shows the answer under a wrong item.
 * Used by lesson drills and by the review.
 */
export function DrillItem({ item, step = {}, index, value, onChange, status, revealed, translations, autoFocus }) {
  const { kind, choices, answer, spoken, task } = itemModel(item, step);
  const locked = status === 'correct';
  const inputId = `${step.id || 'review'}-item-${index}`;
  const width = '12ch';
  const input = (className = '', extra = {}) => <input id={inputId} className={`drill-input ${className} ${status || ''}`} lang="nl" autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck="false" value={value} disabled={locked} onChange={e => onChange(e.target.value)} autoFocus={autoFocus} {...extra} />;
  const buttons = choices && <div className="drill-choices" role="group" aria-label="Choose an answer">{choices.map(choice => <button type="button" key={choice} lang="nl" className={`word-token ${value === choice ? 'selected' : ''} ${locked && value === choice ? 'correct' : ''}`} aria-pressed={value === choice} disabled={locked} onClick={() => onChange(choice)}>{choice}</button>)}</div>;
  const mark = status && <span className={`drill-mark ${status}`} aria-label={status === 'correct' ? 'Correct' : 'Not yet right'}>{status === 'correct' ? <Check size={14} /> : <X size={14} />}</span>;

  if (kind === 'row') return <div className={`drill-row ${status || ''}`}>
    <label htmlFor={inputId} lang="nl" className="drill-row-label">{item.label}{item.gloss && <small>{item.gloss}</small>}</label>
    {choices ? buttons : input('row-input')}
    <span className="drill-row-end">{mark}{locked && <AudioButton text={spoken} />}</span>
    {revealed && status === 'wrong' && <span className="drill-reveal">→ <b lang="nl">{answer}</b></span>}
  </div>;

  return <div className={`drill-item ${status || ''} ${item.image ? 'has-image' : ''}`}>
    <span className="drill-number">{index + 1}</span>
    {item.image && <Illustration className="drill-image" image={item.image} alt={imageAlt(item.image)} />}
    <div className="drill-body">
      {kind === 'listen' && <div className="drill-listen"><AudioButton text={item.listen} label="Play" className="audio-wide" conceal={!locked} />{locked && <span lang="nl">{item.listen}</span>}</div>}
      {kind === 'cloze' && <p className="drill-sentence" lang="nl">{item.nl.split('___')[0]}{choices ? <span className="blank-word">{value || '…'}</span> : <label className="inline-blank"><span className="sr-only">Missing word</span>{input('inline', { style: { width } })}</label>}{item.nl.split('___')[1]}{item.cue && <span className="drill-cue">({item.cue})</span>}</p>}
      {kind === 'transform' && <p className="drill-sentence" lang="nl">{item.nl} <AudioButton text={item.nl} />{item.cue && <span className="drill-cue">{item.cue}</span>}</p>}
      {kind === 'translate' && <p className="drill-english">{item.en}</p>}
      {item.en && kind !== 'translate' && (kind === 'cloze' || translations) && <p className="drill-gloss">{item.en}</p>}
      {task && kind !== 'cloze' && <span className="drill-task">{task}</span>}
      {choices && kind !== 'row' ? buttons : kind !== 'cloze' && <label className="block-answer"><span className="sr-only">{kind === 'translate' ? 'Dutch translation' : kind === 'listen' ? 'What you hear' : 'Your answer'}</span>{input('block', { placeholder: kind === 'translate' ? 'In Dutch…' : kind === 'listen' ? 'Type what you hear…' : 'Your answer…' })}</label>}
      {revealed && status === 'wrong' && <p className="drill-reveal">Answer: <b lang="nl">{answer}</b></p>}
      {locked && spoken && kind !== 'listen' && <p className="drill-done" lang="nl"><AudioButton text={spoken} />{spoken}</p>}
    </div>
    {mark}
  </div>;
}
