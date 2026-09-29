import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Check, Sprout } from 'lucide-react';
import { formToWord, itemTexts, lessons, wordById, words, wordsIn } from './content.js';
import { getDueWords } from './learning.js';
import { seededShuffle } from './curriculum/text.js';
import { useAudio } from './audio.jsx';
import { DrillItem, checkItem } from './Exercises.jsx';

const SESSION_SIZE = 12;

/** Typed practice items from lessons the learner has opened. Conjugation rows become “jij ___ (wonen)”. */
function practiceBank(state) {
  const opened = lessons.filter(l => state.completedLessons.includes(l.id) || l.steps.some(s => state.completedSteps[s.id]));
  return opened.flatMap(lesson => lesson.steps.filter(step => step.type === 'drill' && !step.choices).flatMap(step => step.items.map((raw, i) => {
    if (raw.choices) return null;
    const verb = raw.label && wordById[formToWord[raw.answer?.toLowerCase()]];
    const item = raw.label ? (verb ? { nl: `${raw.label} ___`, cue: verb.dutch, en: raw.gloss, answer: raw.answer } : null) : { ...raw, task: raw.task || step.task };
    if (!item) return null;
    const texts = itemTexts(item);
    return { item, key: `${step.id}:${i}`, lesson: lesson.number, words: wordsIn(...texts.spoken, ...texts.checked) };
  }))).filter(Boolean);
}

function buildQueue(state, practice, seed) {
  const bank = practiceBank(state);
  if (practice) {
    // Newer lessons weigh a little more, but everything opened can come back.
    const weighted = bank.flatMap(entry => Array(entry.lesson).fill(entry));
    const picked = [];
    for (const entry of seededShuffle(weighted, seed)) if (!picked.some(p => p.key === entry.key) && picked.push(entry) >= SESSION_SIZE) break;
    return picked;
  }
  const used = new Set();
  return getDueWords(state, words).slice(0, SESSION_SIZE).map(word => {
    const entry = seededShuffle(bank.filter(e => e.words.includes(word.id) && !used.has(e.key)), seed + word.id)[0];
    if (entry) { used.add(entry.key); return entry; }
    return { item: { image: word.image, en: word.english, answer: word.article ? `${word.article} ${word.dutch}` : word.dutch, task: word.article ? 'With its article' : undefined }, key: `word:${word.id}`, words: [word.id] };
  });
}

export default function Review({ state, encounter, navigate }) {
  const { stop } = useAudio();
  const [queue, setQueue] = useState(null);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [results, setResults] = useState({ right: 0, again: 0 });
  const due = getDueWords(state, words);
  const encountered = words.filter(w => state.words[w.id]?.encounters > 0);
  const entry = queue?.[index];
  function start(practice = false) { stop(); const id = String(Date.now()); setQueue(buildQueue(state, practice, id)); setIndex(0); setValue(''); setStatus(null); setSessionId(id); setResults({ right: 0, again: 0 }); }
  function check(e, giveUp = false) {
    e?.preventDefault();
    if (status || (!giveUp && !value.trim())) return;
    const right = !giveUp && checkItem(entry.item, value);
    setStatus(right ? 'correct' : 'wrong');
    encounter(entry.words, right, `review:${sessionId}:${index}`);
    setResults(r => ({ right: r.right + Number(right), again: r.again + Number(!right) }));
  }
  function next() { stop(); setIndex(index + 1); setValue(''); setStatus(null); }

  if (queue && index === queue.length) return <div className="standard-page review-page page-enter"><div className="review-complete-mark"><Sprout size={40} strokeWidth={1.3} /></div><h1>Review done.</h1><p className="page-intro">{results.right} of {queue.length} right first time. {results.again ? `${results.again} will come back soon.` : 'A good place to pause.'}<br />Mistakes make a word due again straight away.</p><button className="primary-button" onClick={() => navigate('book')}>Back to the book <ArrowRight size={17} /></button>{results.again > 0 && <button className="text-link review-again" onClick={() => start(false)}><RotateCcw size={15} /> Practise the missed ones now</button>}</div>;

  return <div className="standard-page review-page page-enter"><div className="eyebrow">FAMILIAR THINGS, MET AGAIN</div><h1>Review.</h1><p className="page-intro">Due words come back inside sentences you have written before.<br />Type every answer; there is no multiple choice here.</p>
    {entry ? <form className="review-card review-sentence" onSubmit={status ? e => { e.preventDefault(); next(); } : check}><div className="review-card-top"><span className="small-caps">{entry.lesson ? `FROM LESSON ${entry.lesson}` : 'WORD RECALL'}</span><span>{index + 1} / {queue.length}</span></div>
      <div className="drill-items"><DrillItem key={entry.key + index} item={entry.item} index={0} value={value} onChange={v => { if (!status) setValue(v); }} status={status} revealed translations autoFocus={!entry.item.listen} step={{ id: `review-${index}` }} /></div>
      {status === 'wrong' && <p className="review-note">It will come back sooner. Say the correct answer out loud once, then move on.</p>}
      {status ? <button type="submit" className="primary-button full-width">{index + 1 === queue.length ? 'Finish the review' : 'Next'}<ArrowRight size={17} /></button> : <><button className="primary-button full-width" type="submit" disabled={!value.trim()}>Check <Check size={17} /></button><button type="button" className="subtle-link" onClick={e => check(e, true)}>I don’t know yet — show me</button></>}
    </form>
      : <div className="review-start"><div className="review-icon"><RotateCcw size={30} strokeWidth={1.3} /></div><h2>{due.length ? `${due.length} ${due.length === 1 ? 'word is' : 'words are'} due.` : encountered.length ? 'Nothing is due right now.' : 'First, a lesson.'}</h2><p>{due.length ? `Up to ${SESSION_SIZE} sentences, chosen for the words you are about to forget.` : encountered.length ? 'Your next review unlocks as time passes. You can still practise a mixed set now; it will not move your schedule forward.' : 'Your review fills as you work through the book.'}</p>{due.length ? <button className="primary-button" onClick={() => start()}>Start the review <ArrowRight size={17} /></button> : encountered.length ? <button className="primary-button" onClick={() => start(true)}>Practise a mixed set <ArrowRight size={17} /></button> : <button className="primary-button" onClick={() => navigate('book')}>Open the book <ArrowRight size={17} /></button>}<div className="review-explanation">Words return after 10 minutes, then 1, 3, 7 and 14 days.<br />A missed word is due again immediately.</div></div>}</div>;
}
