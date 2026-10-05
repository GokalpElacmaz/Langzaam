import Illustration from './Illustration.jsx';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw, Eye, Headphones, Sprout, BookOpen } from 'lucide-react';
import { grammarPoints, lessons, voiceFor, wordById, wordsIn } from './content.js';
import { completeStep, completeLesson, lessonPosition, setLessonPosition } from './learning.js';
import { isAnswerCorrect, seededShuffle, tokenize } from './curriculum/text.js';
import { names } from './curriculum/plan.js';
import { AudioButton, PlayAllButton, useAudio } from './audio.jsx';
import { DrillItem, Rich, checkItem, imageAlt, itemModel } from './Exercises.jsx';

function label(step) {
  if (step.type === 'picture') return step.listen ? 'Listen & recognise' : 'Read & recognise';
  if (step.type !== 'drill') return { observe: 'Look & listen', grammar: 'Grammar', arrange: 'Build a sentence', story: 'Read', complete: 'A moment to pause' }[step.type];
  if (step.layout === 'table') return 'Conjugate';
  if (step.items.every(item => item.listen)) return 'Dictation';
  if (step.items.every(item => item.en && !item.nl)) return 'Translate';
  return step.choices ? 'Choose' : 'Write';
}

export default function Lesson({ lesson, state, setState, preferences, setPreferences, navigate, encounter }) {
  const index = lessonPosition(state, lesson);
  const step = lesson.steps[index];
  const { stop } = useAudio();
  useEffect(() => { setState(s => s.positionStepIds?.[lesson.id] === step.id ? s : setLessonPosition(s, lesson, index)); }, [lesson.id, step.id]);
  useEffect(() => { stop(); window.scrollTo({ top: 0, behavior: 'instant' }); }, [index]);
  function next() {
    const finished = index === lesson.steps.length - 1;
    setState(s => setLessonPosition(completeStep(finished ? completeLesson(s, lesson.id) : s, step.id), lesson, finished ? 0 : index + 1));
    if (finished) navigate('book');
  }
  const parts = [...new Set(lesson.steps.map(s => s.part))];
  return <div className="lesson-page page-enter">
    <div className="reader-nav"><button className="text-link" onClick={() => navigate('book')}><ArrowLeft size={15} /> The book</button><span>LESSON {String(lesson.number).padStart(2, '0')} <span className="reader-nav-divider">/</span> {lesson.title}</span><span>{index + 1} <span className="muted">/ {lesson.steps.length}</span></span></div>
    <div className="reader-progress" aria-label={`Page ${index + 1} of ${lesson.steps.length}`}>{lesson.steps.map((s, i) => <span key={s.id} className={`${i <= index ? 'filled' : ''} ${i > 0 && lesson.steps[i - 1].part !== s.part ? 'part-start' : ''}`} />)}</div>
    <div className="reader-toolbar"><span className="small-caps">PART {parts.indexOf(step.part) + 1} · {step.part.toUpperCase()} <span className="reader-nav-divider">/</span> {label(step).toUpperCase()}</span><div><button className={preferences.slow ? 'tool-toggle selected' : 'tool-toggle'} onClick={() => setPreferences(p => ({ ...p, slow: !p.slow }))} aria-pressed={preferences.slow}><Headphones size={15} />{preferences.slow ? 'Slow audio' : 'Normal audio'}</button><button className={preferences.translations ? 'tool-toggle selected' : 'tool-toggle'} onClick={() => setPreferences(p => ({ ...p, translations: !p.translations }))} aria-pressed={preferences.translations}><Eye size={15} /> English</button></div></div>
    <ExercisePage key={step.id} {...{ step, lesson, preferences, encounter, next }} back={index > 0 ? () => setState(s => setLessonPosition(s, lesson, index - 1)) : null} />
  </div>;
}

function ExercisePage({ step, lesson, preferences, encounter, next, back }) {
  const [done, setDone] = useState(!['picture', 'arrange', 'drill'].includes(step.type));
  const [skippable, setSkippable] = useState(false);
  useEffect(() => { if (['observe', 'story', 'grammar'].includes(step.type)) encounter(step.wordIds, null, `exposure:${step.id}`); }, [step.id]);
  const props = { step, preferences, encounter, onDone: () => setDone(true), onStuck: () => setSkippable(true) };
  if (step.type === 'complete') return <Complete {...{ step, lesson, next, back }} />;
  return <section className="exercise-page">
    <div className="exercise-heading"><h1>{step.title}.</h1>{step.instruction && <p>{step.instruction}</p>}</div>
    {step.type === 'observe' && <Observe step={step} preferences={preferences} />}
    {step.type === 'grammar' && <Grammar step={step} preferences={preferences} />}
    {step.type === 'story' && <Story step={step} preferences={preferences} />}
    {step.type === 'picture' && <Picture {...props} />}
    {step.type === 'arrange' && <Arrange {...props} />}
    {step.type === 'drill' && <Drill {...props} />}
    <div className="reader-bottom"><button className="text-link" disabled={!back} onClick={back}><ArrowLeft size={16} /> Previous page</button><span className="reader-bottom-note">{done ? 'Say it out loud once more before you move on.' : 'Mistakes are part of the practice.'}</span>{done ? <button className="primary-button" onClick={next}>Turn the page <ArrowRight size={17} /></button> : <span className="reader-actions">{skippable && <button className="secondary-button" onClick={next}>Move on anyway</button>}<button className="primary-button" type="submit" form={`check-${step.id}`}>Check my answers <Check size={17} /></button></span>}</div>
  </section>;
}

function Observe({ step, preferences }) {
  return <><div className={`observation-grid cards-${Math.min(step.cards.length, 3)}`}>{step.cards.map((card, i) => <article className="observation-card" key={i}>{card.image ? <Illustration image={card.image} alt={imageAlt(card.image)} /> : <div className="word-typography" lang="nl">{card.term || card.nl.split(/[ .?!]/)[0]}</div>}<div className="observation-text">{card.term && <div className="vocabulary-term"><strong lang="nl">{card.term}</strong><AudioButton text={card.term} />{preferences.translations && <small>{card.gloss}</small>}</div>}<span lang="nl">{card.nl}</span><AudioButton text={card.nl} />{preferences.translations && <small>{card.en}</small>}</div></article>)}</div>{step.note && <div className="gentle-note"><Sprout size={22} /><p>{step.note}</p></div>}</>;
}

function Grammar({ step, preferences }) {
  return <article className="grammar-page">
    <div className="grammar-body">{step.body.map((paragraph, i) => <p key={i}><Rich text={paragraph} /></p>)}</div>
    {step.tables?.length > 0 && <div className="grammar-tables">{step.tables.map((table, t) => <table key={t} className="grammar-table">{table.caption && <caption>{table.caption}</caption>}<tbody>{table.rows.map((row, r) => <tr key={r}><td lang="nl"><Rich text={row.nl} /></td>{row.en && <td className="muted">{row.en}</td>}<td><AudioButton text={row.nl} /></td></tr>)}</tbody></table>)}</div>}
    {step.examples?.length > 0 && <div className="grammar-examples"><div className="grammar-examples-head"><span className="small-caps">EXAMPLES</span><PlayAllButton id={`examples-${step.id}`} texts={step.examples.map(e => e.nl)} /></div>{step.examples.map((example, i) => <div className="grammar-example" key={i}><div><span lang="nl"><Rich text={example.nl} /></span><small>{example.en}</small></div><AudioButton text={example.nl} /></div>)}</div>}
    {step.note && <div className="gentle-note"><BookOpen size={20} /><p><Rich text={step.note} /></p></div>}
  </article>;
}

function Story({ step, preferences }) {
  const [english, setEnglish] = useState(false);
  const show = preferences.translations && english;
  return <div className="story-page"><Illustration className="story-scene" image={step.image} alt={imageAlt(step.image)} />
    <div className="story-tools"><PlayAllButton id={`story-${step.id}`} texts={step.lines.map(l => ({ text: l.nl, voice: voiceFor(l.nl, l.speaker) }))} label="Listen to it all" /><button type="button" className="subtle-link" onClick={() => setEnglish(!english)} disabled={!preferences.translations}>{english ? 'Hide the English' : 'Show the English'}</button></div>
    <div className="story-lines">{step.lines.map((line, i) => <div className="story-line" key={i}>{line.image && <Illustration image={line.image} />}<div>{line.speaker && <b className="story-speaker">{line.speaker}</b>}<span lang="nl">{line.nl}</span>{show && <small>{line.en}</small>}</div><AudioButton text={line.nl} voice={voiceFor(line.nl, line.speaker)} /></div>)}</div>
    {step.note && <div className="pattern-note"><Rich text={step.note} /></div>}
  </div>;
}

function Feedback({ status, explanation, wrongCount, total, onReveal, revealed }) {
  if (!status) return null;
  const correct = status === 'correct';
  return <div className={`answer-feedback ${correct ? 'correct' : 'retry'}`} role="status"><span className="feedback-icon">{correct ? <Check size={19} /> : <RotateCcw size={19} />}</span><div>
    <strong>{correct ? 'Correct.' : total > 1 ? `${wrongCount} of ${total} still need work.` : 'Not yet.'}</strong>
    <p>{correct ? explanation || 'Read it once more, out loud.' : revealed ? 'The answers are shown. Type them in yourself — writing them is how they stick.' : 'Look at the marked answers again: verb ending, article, word order.'}</p>
    {!correct && !revealed && <button type="button" className="subtle-link" onClick={onReveal}>Show me the answers</button>}
  </div></div>;
}

function Picture({ step, encounter, onDone, onStuck }) {
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const missed = useRef(false);
  function check(e) {
    e.preventDefault();
    if (!selected || status === 'correct') return;
    const correct = selected === step.answer;
    setStatus(correct ? 'correct' : 'wrong');
    if (correct) { encounter(step.wordIds, revealed || missed.current ? null : true, `passed:${step.id}`); onDone(); }
    else if (!missed.current) { missed.current = true; encounter(step.wordIds, false, `missed:${step.id}:${Date.now()}`); }
  }
  return <form id={`check-${step.id}`} onSubmit={check}>
    {step.listen ? <div className="listening-player"><AudioButton text={step.nl} label="Listen to the sentence" className="audio-wide" conceal={status !== 'correct'} />{status === 'correct' && <p className="transcript" lang="nl">{step.nl}</p>}</div>
      : <div className="sentence-prompt"><span lang="nl">{step.nl}</span><AudioButton text={step.nl} /></div>}
    <div className="picture-options" role="group" aria-label="Choose a picture">{step.choices.map((choice, i) => <button type="button" key={choice.image} className={`picture-option ${selected === choice.image ? 'selected' : ''} ${status === 'correct' && selected === choice.image ? 'correct' : ''} ${revealed && choice.image === step.answer ? 'revealed' : ''}`} onClick={() => { setSelected(choice.image); setStatus(null); }} disabled={status === 'correct'} aria-pressed={selected === choice.image} aria-label={`Picture ${i + 1}: ${imageAlt(choice.image)}`}><Illustration image={choice.image} /><span className="option-index">{status === 'correct' && selected === choice.image ? <Check size={15} /> : i + 1}</span>{status === 'correct' && <span lang="nl" className="revealed-label">{choice.nl}</span>}</button>)}</div>
    <Feedback status={status} explanation={step.explanation || step.en} total={1} wrongCount={1} revealed={revealed} onReveal={() => { setRevealed(true); onStuck(); }} />
  </form>;
}

function Arrange({ step, encounter, onDone, onStuck }) {
  const tokens = useRef(seededShuffle([...tokenize(step.nl), ...(step.distractors || [])].map(t => names.includes(t) ? t : t.toLowerCase()), step.id)).current;
  const needed = tokenize(step.nl).length;
  const [arranged, setArranged] = useState([]);
  const [status, setStatus] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const missed = useRef(false);
  function check(e) {
    e.preventDefault();
    if (arranged.length !== needed || status === 'correct') return;
    const correct = isAnswerCorrect(arranged.map(i => tokens[i]).join(' '), step.nl, step.accept);
    setStatus(correct ? 'correct' : 'wrong');
    if (correct) { encounter(step.wordIds, revealed || missed.current ? null : true, `passed:${step.id}`); onDone(); }
    else if (!missed.current) { missed.current = true; encounter(step.wordIds, false, `missed:${step.id}:${Date.now()}`); }
  }
  const edit = (list) => { setArranged(list); setStatus(null); };
  return <form id={`check-${step.id}`} onSubmit={check} className="arrange-exercise">{step.image && <Illustration image={step.image} alt={imageAlt(step.image)} />}<div className="sentence-builder">
    <p className="arrange-english">{step.en}</p>
    <div className={`answer-slot ${status === 'correct' ? 'correct' : ''}`} aria-label="Your sentence" aria-live="polite">{arranged.length ? arranged.map((tokenIndex, i) => <button type="button" key={tokenIndex} lang="nl" className="word-token" disabled={status === 'correct'} onClick={() => edit(arranged.filter((_, j) => j !== i))}>{tokens[tokenIndex]}</button>) : <span>Tap the words in order… {step.distractors?.length ? `(${step.distractors.length === 1 ? 'one word is' : `${step.distractors.length} words are`} not needed)` : ''}</span>}</div>
    <div className="token-bank">{tokens.map((token, i) => <button type="button" key={i} lang="nl" className="word-token" disabled={arranged.includes(i) || status === 'correct' || arranged.length >= needed} onClick={() => edit([...arranged, i])}>{token}</button>)}</div>
    <button type="button" className="subtle-link" onClick={() => edit([])} disabled={status === 'correct'}><RotateCcw size={13} /> Start the sentence again</button>
    {status === 'correct' && <p className="drill-done" lang="nl"><AudioButton text={step.nl} />{step.nl}</p>}
    {revealed && status !== 'correct' && <p className="drill-reveal">Answer: <b lang="nl">{step.nl}</b></p>}
    <Feedback status={status} explanation={step.explanation} total={1} wrongCount={1} revealed={revealed} onReveal={() => { setRevealed(true); onStuck(); }} />
  </div></form>;
}

function Drill({ step, preferences, encounter, onDone, onStuck }) {
  const [values, setValues] = useState(() => step.items.map(() => ''));
  const [statuses, setStatuses] = useState(() => step.items.map(() => null));
  const [revealed, setRevealed] = useState(false);
  const [checked, setChecked] = useState(false);
  const missed = useRef(new Set());
  const allCorrect = statuses.every(s => s === 'correct');
  function check(e) {
    e.preventDefault();
    if (allCorrect) return;
    const next = step.items.map((item, i) => statuses[i] === 'correct' ? 'correct' : values[i].trim() ? (checkItem(item, values[i], step) ? 'correct' : 'wrong') : 'wrong');
    next.forEach((status, i) => {
      if (statuses[i] === 'correct') return;
      const words = wordsIn(...[itemModel(step.items[i], step).spoken, step.items[i].nl, step.items[i].listen, step.items[i].answer].filter(Boolean));
      const progressId = step.items[i].progressId || `${step.id}:${i}`;
      if (status === 'correct') encounter(words, revealed || missed.current.has(i) ? null : true, `passed:${progressId}`);
      else if (!missed.current.has(i)) { missed.current.add(i); encounter(words, false, `missed:${progressId}:${Date.now()}`); }
    });
    setStatuses(next); setChecked(true);
    if (next.every(s => s === 'correct')) onDone();
  }
  const wrong = statuses.filter(s => s === 'wrong').length;
  const firstOpen = statuses.findIndex(s => s !== 'correct');
  return <form id={`check-${step.id}`} onSubmit={check} className={`drill ${step.layout === 'table' ? 'drill-table' : ''}`} noValidate>
    {step.image && <Illustration className="drill-hero" image={step.image} alt={imageAlt(step.image)} />}
    {step.layout === 'table' && step.verb && <div className="drill-table-head" lang="nl">{step.verb}{step.verbEn && <small>{step.verbEn}</small>}</div>}
    <div className="drill-items">{step.items.map((item, i) => <DrillItem key={i} {...{ item, step, index: i, value: values[i], status: statuses[i], revealed, translations: preferences.translations }} autoFocus={i === 0 && !item.listen && !step.choices && !item.choices} onChange={value => { setValues(v => v.map((old, j) => j === i ? value : old)); setStatuses(s => s.map((old, j) => j === i && old === 'wrong' ? null : old)); }} />)}</div>
    {checked && <Feedback status={allCorrect ? 'correct' : 'wrong'} explanation={step.explanation} total={step.items.length} wrongCount={wrong || statuses.filter(s => s !== 'correct').length} revealed={revealed} onReveal={() => { setRevealed(true); onStuck(); document.getElementById(`${step.id}-item-${firstOpen}`)?.focus(); }} />}
  </form>;
}

function Complete({ step, lesson, next, back }) {
  const nextLesson = lessons[lesson.number];
  return <section className="completion-page"><div className="completion-art"><Illustration image={lesson.image} alt={imageAlt(lesson.image)} /><span><Check size={23} /></span></div><div className="eyebrow">LESSON {lesson.number} COMPLETE</div><h1>{step.title}.</h1><p>{step.instruction}</p>
    <div className="completion-columns"><div><span className="small-caps">YOUR {lesson.targets.length} TARGET WORDS</span><div className="collected-words">{lesson.targets.map(id => <span lang="nl" key={id}>{wordById[id].article ? `${wordById[id].article} ` : ''}{wordById[id].dutch}</span>)}</div></div>
      <div><span className="small-caps">GRAMMAR TO KEEP PRACTISING</span><ul className="completion-grammar">{(lesson.reviewGrammar || lesson.grammar).map(id => { const point = grammarPoints.find(g => g.id === id); return <li key={id}><strong>{point.title}</strong> — {point.summary}</li>; })}</ul></div></div>
    <p className="completion-note">{lesson.answers} answers in this lesson. {nextLesson?.available ? `Continue with “${nextLesson.title}”, and revisit these words in A little review.` : 'Keep these words active with A little review while the next lessons are prepared.'}<br />Come back tomorrow for a review — that is when it really sticks.</p>
    <button className="primary-button" onClick={next}>Finish this lesson <Check size={17} /></button>{back && <button className="text-link completion-back" onClick={back}><ArrowLeft size={15} /> Read the last page again</button>}</section>;
}
