import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw, Eye, Headphones, Sparkles, BookOpen, Sprout, HelpCircle } from 'lucide-react';
import { lessons, wordById } from './content.js';
import { completeStep, completeLesson, isAnswerCorrect } from './learning.js';
import { AudioButton, useAudio } from './audio.jsx';

const labels = { observe: 'Look & listen', 'picture-choice': 'Look & recognise', 'listen-choice': 'Listen & recognise', arrange: 'Build a sentence', cloze: 'Notice the pattern', dictation: 'Listen & write', story: 'Read a little', complete: 'A moment to pause' };
export default function Lesson({ lesson, state, setState, preferences, setPreferences, navigate, encounter }) {
  const [index, setIndex] = useState(() => Math.max(0, Math.min(state.positions?.[lesson.id] || 0, lesson.steps.length - 1)));
  const step = lesson.steps[index];
  const { stop } = useAudio();
  useEffect(() => { setState(s => ({ ...s, positions: { ...s.positions, [lesson.id]: index } })); }, [index, lesson.id]);
  useEffect(() => { stop(); window.scrollTo({ top: 0, behavior: 'instant' }); }, [index]);
  function next() {
    setState(s => completeStep(s, step.id));
    if (index < lesson.steps.length - 1) setIndex(index + 1);
    else { setState(s => ({ ...completeLesson(s, lesson.id), positions: { ...s.positions, [lesson.id]: 0 } })); navigate('book'); }
  }
  return <div className="lesson-page page-enter"><div className="reader-nav"><button className="text-link" onClick={() => navigate('book')}><ArrowLeft size={15} /> The book</button><span>LESSON 0{lessons.indexOf(lesson) + 1} <span className="reader-nav-divider">/</span> {lesson.title}</span><span>{index + 1} <span className="muted">/ {lesson.steps.length}</span></span></div><div className="reader-progress" aria-label={`Page ${index + 1} of ${lesson.steps.length}`}>{lesson.steps.map((s, i) => <span key={s.id} className={i <= index ? 'filled' : ''} />)}</div><div className="reader-toolbar"><span className="small-caps">{labels[step.type]}</span><div><button className={preferences.slow ? 'tool-toggle selected' : 'tool-toggle'} onClick={() => setPreferences(p => ({ ...p, slow: !p.slow }))} aria-pressed={preferences.slow}><Headphones size={15} />{preferences.slow ? 'Slow audio' : 'Normal audio'}</button><button className={preferences.translations ? 'tool-toggle selected' : 'tool-toggle'} onClick={() => setPreferences(p => ({ ...p, translations: !p.translations }))} aria-pressed={preferences.translations}><Eye size={15} /> English</button></div></div><ExercisePage key={step.id} {...{ step, lesson, preferences, encounter, next }} back={index > 0 ? () => setIndex(index - 1) : null} /></div>;
}
function ExercisePage({ step, lesson, preferences, encounter, next, back }) {
  const [selected, setSelected] = useState('');
  const [arranged, setArranged] = useState([]);
  const [typed, setTyped] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hint, setHint] = useState(false);
  const [transcript, setTranscript] = useState(false);
  const [assisted, setAssisted] = useState(false);
  const [noticed, setNoticed] = useState(false);
  const interactive = ['picture-choice', 'listen-choice', 'arrange', 'cloze', 'dictation'].includes(step.type);
  const isListening = ['listen-choice', 'dictation'].includes(step.type);
  useEffect(() => {
    if (step.type === 'observe' || step.type === 'story') encounter(step.wordIds, null, `exposure:${step.id}`);
  }, [step.id]);
  const answer = step.type === 'arrange' ? arranged.map(i => step.tokens[i]).join(' ') : step.type === 'dictation' ? typed : selected;
  const ready = step.type === 'arrange' ? arranged.length === step.tokens.length : !!answer.trim();
  function check(e) {
    e?.preventDefault();
    if (!ready || feedback === 'correct') return;
    const correct = isAnswerCorrect(answer, step.answer);
    setFeedback(correct ? 'correct' : 'retry');
    // Seeing a transcript supports practice, but does not count as unassisted recall.
    encounter(step.wordIds, correct ? assisted ? null : true : false, correct ? `${assisted ? 'assisted' : 'passed'}:${step.id}` : `retry:${step.id}:${Date.now()}`);
  }
  function choose(value) { setSelected(value); setFeedback(null); }
  if (step.type === 'complete') return <section className="completion-page"><div className="completion-art"><img src={`/images/${step.image}.svg`} alt="A familiar scene from this lesson" /><span><Check size={23} /></span></div><div className="eyebrow">A LITTLE MORE FAMILIAR</div><h1>{step.title}.</h1><p>{step.instruction}</p><div className="collected-words">{lesson.newWordIds.map(id => <span lang="nl" key={id}>{wordById[id].dutch}</span>)}</div><p className="completion-note">You don’t need to feel ready for the next lesson.<br />This one will always be here to read again.</p><button className="primary-button" onClick={next}>Finish this lesson <Check size={17} /></button>{back && <button className="text-link completion-back" onClick={back}><ArrowLeft size={15} /> Read the last page again</button>}</section>;
  return <section className="exercise-page"><div className="exercise-heading"><h1>{step.title}.</h1><p>{step.instruction}</p></div>
    {step.type === 'observe' && <><div className={`observation-grid cards-${step.cards.length}`}>{step.cards.map((card, i) => <article className="observation-card" key={`${card.wordId}-${i}`}><img src={`/images/${card.image}.svg`} alt={card.translation} /><div className="observation-text"><span lang="nl">{card.sentence}</span><AudioButton text={card.sentence} />{preferences.translations && <small>{card.translation}</small>}</div></article>)}</div><div className="gentle-note"><Sprout size={22} /><p>{step.note}</p></div></>}
    {isListening && <div className="listening-player"><span className="waveform" aria-hidden="true">{[10, 21, 31, 16, 39, 25, 45, 29, 17, 36, 23, 12].map((h, i) => <i key={i} style={{ height: h }} />)}</span><AudioButton text={step.sentence} label="Listen to the sentence" className="audio-wide" conceal={!transcript && feedback !== 'correct'} /><p>Replay as often as you need.</p><button className="subtle-link" onClick={() => { setTranscript(!transcript); setAssisted(true); }}>{transcript ? 'Hide text' : 'Need the text? Show transcript'}</button>{(transcript || feedback === 'correct') && <p className="transcript" lang="nl">{step.sentence}</p>}</div>}
    {step.type === 'picture-choice' && <div className="sentence-prompt"><span lang="nl">{step.sentence}</span><AudioButton text={step.sentence} /></div>}
    {(step.type === 'picture-choice' || step.type === 'listen-choice') && <div className="picture-options" role="group" aria-label="Choose a picture">{step.choices.map((choice, i) => <button key={choice.id} className={`picture-option ${selected === choice.id ? 'selected' : ''} ${feedback === 'correct' && selected === choice.id ? 'correct' : ''}`} onClick={() => choose(choice.id)} disabled={feedback === 'correct'} aria-pressed={selected === choice.id} aria-label={`Picture ${i + 1}: ${imageDescription(choice.image)}`}><img src={`/images/${choice.image}.svg`} alt="" /><span className="option-index">{feedback === 'correct' && selected === choice.id ? <Check size={15} /> : i + 1}</span>{feedback === 'correct' && <span lang="nl" className="revealed-label">{choice.label}</span>}</button>)}</div>}
    {step.type === 'arrange' && <div className="arrange-exercise"><img src={`/images/${step.image}.svg`} alt={step.translation} /><div className="sentence-builder"><div className={`answer-slot ${feedback === 'correct' ? 'correct' : ''}`} aria-label="Your sentence" aria-live="polite">{arranged.length ? arranged.map((tokenIndex, i) => <button key={tokenIndex} lang="nl" className="word-token" disabled={feedback === 'correct'} onClick={() => { setArranged(arranged.filter((_, j) => j !== i)); setFeedback(null); }}>{step.tokens[tokenIndex]}</button>) : <span>Your sentence goes here…</span>}</div><div className="token-bank">{step.tokens.map((token, i) => <button key={i} lang="nl" className="word-token" disabled={arranged.includes(i) || feedback === 'correct'} onClick={() => { setArranged([...arranged, i]); setFeedback(null); }}>{token}</button>)}</div><button className="subtle-link" onClick={() => { setArranged([]); setFeedback(null); }} disabled={feedback === 'correct'}><RotateCcw size={13} /> Start the sentence again</button></div></div>}
    {step.type === 'cloze' && <div className="cloze-exercise"><img src={`/images/${step.image}.svg`} alt={step.translation} /><p lang="nl">{step.sentence.split('___')[0]}<span className="blank-word">{selected ? step.choices.find(c => c.id === selected)?.label : '…'}</span>{step.sentence.split('___')[1]}</p><div className="cloze-options">{step.choices.map(choice => <button key={choice.id} lang="nl" className={`word-token ${selected === choice.id ? 'selected' : ''}`} onClick={() => choose(choice.id)} aria-pressed={selected === choice.id} disabled={feedback === 'correct'}>{choice.label}</button>)}</div></div>}
    {step.type === 'dictation' && <form id="dictation-form" className="dictation-form" onSubmit={check}><label htmlFor="dictation-input">The sentence you hear</label><input id="dictation-input" lang="nl" placeholder="Type in Dutch…" autoComplete="off" autoCapitalize="sentences" spellCheck="false" value={typed} onChange={e => { setTyped(e.target.value); setFeedback(null); }} disabled={feedback === 'correct'} /><span>Capital letters and punctuation don’t matter.</span><button type="button" className="subtle-link" onClick={() => { setHint(!hint); setAssisted(true); }}><HelpCircle size={14} />{hint ? 'Hide hint' : 'A little help'}</button>{hint && <p className="hint-text">{step.hint}</p>}</form>}
    {step.type === 'story' && <div className="story-page"><img className="story-scene" src={`/images/${step.image}.svg`} alt="The familiar little neighbourhood" /><div className="story-lines">{step.lines.map((line, i) => <div className="story-line" key={i}><img src={`/images/${line.image}.svg`} alt="" /><div><span lang="nl">{line.sentence}</span>{preferences.translations && <small>{line.translation}</small>}</div><AudioButton text={line.sentence} /></div>)}</div><button className="pattern-disclosure" onClick={() => setNoticed(!noticed)} aria-expanded={noticed}><Sparkles size={16} /> A pattern you might have noticed <span>{noticed ? '−' : '+'}</span></button>{noticed && <div className="pattern-note">{lesson.grammar}</div>}</div>}
    {feedback && <div className={`answer-feedback ${feedback}`} role="status"><span className="feedback-icon">{feedback === 'correct' ? <Check size={19} /> : <RotateCcw size={19} />}</span><div><strong>{feedback === 'correct' ? 'Yes, exactly. You’ve got it.' : 'Almost. Let’s have another look.'}</strong><p>{feedback === 'correct' ? step.explanation : 'Take your time. Try a different answer, or listen again.'}</p></div></div>}
    <div className="reader-bottom"><button className="text-link" disabled={!back} onClick={back}><ArrowLeft size={16} /> Previous page</button><span className="reader-bottom-note">A little repetition goes a long way.</span>{!interactive || feedback === 'correct' ? <button className="primary-button" onClick={next}>Turn the page <ArrowRight size={17} /></button> : <button className="primary-button" disabled={!ready} onClick={check}>Check my answer <Check size={17} /></button>}</div>
  </section>;
}
function imageDescription(image) { return { house: 'a house', tree: 'a tree', bench: 'a bench', man: 'a man', woman: 'a woman', 'man-walking': 'a man walking', 'woman-sitting': 'a woman sitting' }[image] || 'a neighbourhood'; }
