import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, Leaf, RotateCcw, Library, Map, Settings, Check, LockKeyhole, ChevronRight, Volume2, Sprout, Menu, X, Download, Search, Headphones, Clock3 } from 'lucide-react';
import { lessons, words, wordById } from './content.js';
import { createInitialState, getDueWords, recordEncounter } from './learning.js';
import { loadState, saveState, loadPreferences, savePreferences } from './storage.js';
import { AudioProvider, AudioButton, useAudio } from './audio.jsx';
import Lesson from './Lesson.jsx';
import Review from './Review.jsx';

export default function App() {
  const [state, setState] = useState(loadState);
  const [preferences, setPreferences] = useState(loadPreferences);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => { setStorageError(!saveState(state)); }, [state]);
  useEffect(() => { savePreferences(preferences); }, [preferences]);
  return <AudioProvider slow={preferences.slow}><Shell {...{ state, setState, preferences, setPreferences, storageError }} /></AudioProvider>;
}
function Shell({ state, setState, preferences, setPreferences, storageError }) {
  const [route, setRoute] = useState(() => location.hash.slice(1) || 'book');
  const [settings, setSettings] = useState(false);
  const [menu, setMenu] = useState(false);
  const { stop } = useAudio();
  useEffect(() => {
    const onHash = () => { setRoute(location.hash.slice(1) || 'book'); setMenu(false); stop(); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = (path) => { location.hash = path; };
  const due = getDueWords(state, words);
  const collected = words.filter(w => state.words[w.id]?.encounters > 0).length;
  const section = route.startsWith('lesson/') ? 'book' : route;
  const current = lessons.find(l => !state.completedLessons.includes(l.id)) || lessons[0];
  const lesson = lessons.find(l => route === `lesson/${l.id}`);
  const unlocked = (l) => lessons.indexOf(l) === 0 || state.completedLessons.includes(lessons[lessons.indexOf(l) - 1].id);
  function encounter(ids, correct, eventId) { setState(s => recordEncounter(s, ids, correct, Date.now(), eventId)); }
  return <div className="app-shell">
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content').focus(); }}>Skip to content</a>
    <button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close navigation' : 'Open navigation'}>{menu ? <X /> : <Menu />}</button>
    {menu && <div className="sidebar-scrim" onClick={() => setMenu(false)} />}
    <aside className={`sidebar ${menu ? 'is-open' : ''}`}>
      <a href="#book" className="brand"><span className="brand-mark"><Sprout size={28} strokeWidth={1.6} /></span><span>langzaam<span className="brand-caption">A LITTLE DUTCH, OFTEN.</span></span></a>
      <div className="sidebar-label">YOUR LEARNING SPACE</div>
      <nav aria-label="Main navigation">{[{ id: 'book', icon: BookOpen, name: 'The book' }, { id: 'review', icon: RotateCcw, name: 'A little review' }, { id: 'words', icon: Library, name: 'Your words' }, { id: 'journey', icon: Map, name: 'The journey' }].map(({ id, icon: Icon, name }) => <a key={id} href={`#${id}`} className={`nav-link ${section === id ? 'active' : ''}`} aria-current={section === id ? 'page' : undefined}><Icon size={19} strokeWidth={1.6} /><span>{name}</span>{id === 'review' && due.length > 0 && <span className="nav-count">{due.length}</span>}</a>)}</nav>
      <div className="volume-nav"><div className="sidebar-label">ON YOUR BOOKSHELF</div><button onClick={() => navigate('book')} className="volume-active"><span className="mini-book">00</span><span>First things first<small>Volume zero · Pre-A1</small></span></button><div className="volume-progress"><span style={{ width: `${state.completedLessons.length / lessons.length * 100}%` }} /></div><div className="volume-progress-text">{state.completedLessons.length} of {lessons.length} lessons complete</div></div>
      <div className="sidebar-bottom"><Leaf size={25} strokeWidth={1.2} /><p>Slow is a good pace.</p><span>A few familiar words.<br />A little more, every day.</span><div className="local-status"><span />{storageError ? 'Progress could not be saved' : 'Your place is saved on this device'}</div></div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><div className="breadcrumb"><span>{section === 'book' ? 'The book' : section === 'review' ? 'A little review' : section === 'words' ? 'Your words' : 'The journey'}</span><ChevronRight size={14} /><strong>{section === 'book' ? 'Volume 00' : 'Your Dutch, growing'}</strong></div><div className="topbar-actions"><span className="level-indicator"><span /> Pre-A1</span><button className="icon-button" onClick={() => setSettings(true)} aria-label="Open reading settings"><Settings size={19} strokeWidth={1.6} /></button></div></header>
      <main id="main-content" tabIndex={-1}>
        {lesson && unlocked(lesson) ? <Lesson key={lesson.id} {...{ lesson, state, setState, preferences, setPreferences, navigate, encounter }} /> : section === 'review' ? <Review {...{ state, encounter, navigate }} /> : section === 'words' ? <WordCollection {...{ state, preferences }} /> : section === 'journey' ? <Journey navigate={navigate} /> : <Book {...{ state, current, navigate, unlocked, preferences, collected }} />}
      </main>
      <footer className="site-footer"><span>Langzaam <span className="footer-dot">·</span> One page at a time.</span><span>Volume zero · An interactive Dutch book</span></footer>
    </div>
    {settings && <SettingsPanel {...{ preferences, setPreferences, state, setState }} close={() => setSettings(false)} />}
  </div>;
}
function Book({ state, current, navigate, unlocked, preferences, collected }) {
  const started = Object.keys(state.completedSteps).length > 0;
  return <div className="book-page page-enter">
    <div className="book-heading"><div><div className="eyebrow">VOLUME ZERO <span /> FIRST THINGS FIRST</div><h1>A little world.<br /><em>A whole new language.</em></h1><p>{lessons.length} long lessons. Ten target words each, recycled until they are yours —<br />and the grammar to use them: de/het, every verb ending, word order, the perfect tense.</p></div><div className="edition-stamp"><Sprout size={33} strokeWidth={1.2} /><span>GROW AT<br />YOUR OWN PACE</span></div></div>
    <section className="book-spread" aria-label="A first look inside the book"><div className="scene-panel"><img src="/images/neighbourhood.svg" alt="An illustrated brick house in a quiet green neighbourhood, beside a tree and a wooden bench" /><div className="scene-caption"><span>01 — A FAMILIAR LITTLE WORLD</span><span>Look. Listen. Notice.</span></div></div><div className="first-words"><span className="small-caps">YOUR FIRST DUTCH</span><h2>It starts with<br />a little noticing.</h2>{[{ text: 'Dit is een huis.', translation: 'This is a house.' }, { text: 'Dit is een boom.', translation: 'This is a tree.' }, { text: 'Dit is een bank.', translation: 'This is a bench.' }].map(line => <div className="first-sentence" key={line.text}><div><span lang="nl">{line.text}</span>{preferences.translations && <small>{line.translation}</small>}</div><AudioButton text={line.text} /></div>)}<span className="audio-footnote"><Headphones size={13} /> Press a speaker. Take your time.</span></div></section>
    <div className="start-strip"><div><span className="small-leaf"><Leaf size={20} /></span><div><strong>{started ? 'Your next small step is waiting.' : 'No rush. No streaks. Just a beginning.'}</strong><p>{started ? `${collected} words encountered. Reviews bring them back as sentences to write.` : `${lessons.length} lessons · ${lessons.length * 10} target words · ${lessons.reduce((n, l) => n + l.answers, 0)} answers to write. Take a lesson over two or three sittings.`}</p></div></div><button className="primary-button" onClick={() => navigate(`lesson/${current.id}`)}>{started ? state.completedLessons.length === lessons.length ? 'Read the book again' : 'Continue reading' : 'Open the first lesson'}<ArrowRight size={18} /></button></div>
    <section className="contents-section"><div className="section-heading"><h2>In this little volume</h2><span>THE TABLE OF CONTENTS</span></div><div className="lesson-list">{lessons.map((lesson, i) => { const done = state.completedLessons.includes(lesson.id); const volumeStart = i === 0 || lessons[i - 1].volume !== lesson.volume; const available = unlocked(lesson); return <React.Fragment key={lesson.id}>{volumeStart && <h3 className="volume-heading">{['VOLUME ZERO · PRE-A1 → A1 · FIRST THINGS FIRST', 'VOLUME ONE · A1 → A2 · A LIFE IN DUTCH', 'VOLUME TWO · A2 · MORE TO SAY'][lesson.volume || 0]}</h3>}<button className={`lesson-row ${!available ? 'locked' : ''}`} disabled={!available} onClick={() => navigate(`lesson/${lesson.id}`)}><span className="lesson-number">{String(i + 1).padStart(2, '0')}</span><img src={`/images/${lesson.image}.svg`} alt="" /><div className="lesson-row-title"><h3>{lesson.title}</h3><p>{lesson.subtitle}</p><p className="lesson-targets" lang="nl">{lesson.targets.map(id => wordById[id].dutch).join(' · ')}</p></div><span className="lesson-word-count">{lesson.steps.length} pages<br />{lesson.answers} answers</span><span className="lesson-state">{done ? <><Check size={16} /> Read again</> : available ? <>Begin <ArrowRight size={16} /></> : <><LockKeyhole size={14} /><span>After lesson {i}</span></>}</span></button></React.Fragment>; })}</div></section>
    <div className="book-note"><span>“</span><p>You don’t have to remember everything.<br /><em>You’ll meet it all again.</em></p><div>A NOTE BEFORE YOU BEGIN</div></div>
  </div>;
}
function WordCollection({ state, preferences }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const collected = words.filter(w => state.words[w.id]?.encounters > 0);
  const visible = collected.filter(w => (filter === 'all' || state.words[w.id].dueAt <= Date.now()) && `${w.dutch} ${(w.forms || []).join(' ')} ${w.english}`.toLowerCase().includes(query.toLowerCase()));
  const groups = lessons.map(lesson => ({ lesson, words: visible.filter(w => w.lessonId === lesson.id).sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'target' ? -1 : 1)) })).filter(g => g.words.length);
  return <div className="standard-page page-enter"><div className="eyebrow">A GROWING COLLECTION</div><h1>Your words.</h1><p className="page-intro">Every word you have met, with its article or verb forms.<br />Target words carry a lesson; structure words hold the sentences together.</p><div className="collection-toolbar"><div className="segmented"><button className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>All collected <span>{collected.length}</span></button><button className={filter === 'due' ? 'selected' : ''} onClick={() => setFilter('due')}>Ready to revisit</button></div><label className="search-box"><Search size={17} /><input aria-label="Search your words" placeholder="Find a word…" value={query} onChange={e => setQuery(e.target.value)} /></label></div>{groups.length ? groups.map(({ lesson, words: list }) => <section key={lesson.id} className="word-group"><h2 className="word-group-title"><span>0{lesson.number}</span>{lesson.title}</h2><div className="word-grid">{list.map(word => { const record = state.words[word.id]; const head = `${word.article ? `${word.article} ` : ''}${word.dutch}`; return <article className={`word-card ${word.kind}`} key={word.id}>{word.image ? <img src={`/images/${word.image}.svg`} alt={word.english} /> : <div className="word-typography" lang="nl">{word.dutch}</div>}<div className="word-card-body"><div><h2 lang="nl">{head}</h2>{word.forms && <p className="word-forms" lang="nl">{[...word.forms, ...Object.values(word.laterForms || {}).flat()].filter(f => f !== word.dutch).join(' · ')}</p>}{preferences.translations && <p>{word.english}</p>}</div><AudioButton text={head} /></div><div className="word-card-footer"><span>{word.kind === 'target' ? 'TARGET' : 'STRUCTURE'} · {record.encounters} encounters</span><span>{record.mastered ? 'Growing familiar' : record.correctCount ? `${record.correctCount} right · ${record.incorrectCount} missed` : 'Seen, not yet recalled'}</span></div></article>; })}</div></section>) : <div className="empty-state"><Sprout size={44} strokeWidth={1} /><h2>{collected.length ? 'A little quiet here.' : 'Your first words are waiting.'}</h2><p>{collected.length ? 'Try another search or return when a review is due.' : 'Open the first lesson to start your collection.'}</p><a href="#book" className="text-link">Back to the book <ArrowRight size={16} /></a></div>}</div>;
}
function Journey({ navigate }) {
  const stages = [{ level: 'Pre-A1', title: 'First things first', description: 'Images, sounds, and a small familiar world. This is where we begin.', available: true }, { level: 'A1 → A2', title: 'A life in Dutch', description: 'Home, family, the week, what you did yesterday and why: plurals, possessives, modal verbs, the perfect tense and subordinate clauses.', available: true }, { level: 'A2 → B1', title: 'More to say', description: 'Separable verbs, comparisons, the simple past, reflexive verbs, the future and relative clauses — with longer stories.', available: true }, { level: 'B1 → B2', title: 'A wider world', description: 'Reading, discussing, and explaining ideas with confidence.' }, { level: 'After B2', title: 'The language of your universe', description: 'A bridge to academic Dutch, then mathematics and physics: from functions and proofs to energy and fields.' }];
  return <div className="standard-page journey-page page-enter"><div className="eyebrow">THE LONG VIEW</div><h1>From a little house<br />to a bigger universe.</h1><p className="page-intro">A book that grows with you.<br />Two volumes so far: {lessons.length} lessons, {lessons.length * 10} target words.</p><div className="journey-timeline">{stages.map((s, i) => <div key={s.level} className={`journey-stage ${s.available ? 'available' : ''}`}><div className="journey-dot">{s.available ? <Sprout size={19} /> : <span>{i + 1}</span>}</div><div className="journey-stage-content"><span className="small-caps">{s.level} {s.available ? ' · IN THE BOOK' : ' · PLANNED'}</span><h2>{s.title}</h2><p>{s.description}</p>{s.available && <button className="text-link" onClick={() => navigate('book')}>Open the book <ArrowRight size={16} /></button>}</div></div>)}</div><div className="gentle-note"><BookOpen size={21} /><p>Volumes zero and one contain {lessons.length} lessons. Later volumes are a curriculum roadmap, and will be written and reviewed before they enter your book.</p></div></div>;
}
function SettingsPanel({ preferences, setPreferences, state, setState, close }) {
  const [reset, setReset] = useState(false);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = document.getElementById('settings-dialog');
    dialog?.focus();
    const onKey = e => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const elements = dialog.querySelectorAll('button, input, a[href], [tabindex="0"]');
        const first = elements[0], last = elements[elements.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey); return () => { document.removeEventListener('keydown', onKey); previous?.focus(); };
  }, []);
  function download() { const url = URL.createObjectURL(new Blob([JSON.stringify({ progress: state, preferences }, null, 2)], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'langzaam-progress.json'; a.click(); URL.revokeObjectURL(url); }
  return <div className="modal-backdrop" onClick={close}><section className="settings-panel" id="settings-dialog" tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={e => e.stopPropagation()}><div className="modal-heading"><h2 id="settings-title">Make yourself at home.</h2><button className="icon-button" onClick={close} aria-label="Close settings"><X size={21} /></button></div><p>A few small things to make reading yours.</p><label className="setting-row"><span><strong>Slower audio</strong><small>A gentler speaking pace.</small></span><input type="checkbox" checked={preferences.slow} onChange={e => setPreferences(p => ({ ...p, slow: e.target.checked }))} /></label><label className="setting-row"><span><strong>English underneath</strong><small>Show translations on reading pages.</small></span><input type="checkbox" checked={preferences.translations} onChange={e => setPreferences(p => ({ ...p, translations: e.target.checked }))} /></label><div className="settings-audio"><Volume2 size={18} /><p>Ellen (Belgian Dutch) and Xander (Netherlands Dutch)<br /><small>Two synthetic voices, each with normal and slow recordings. In dialogues every character keeps one voice.</small></p></div><p className="settings-local">Your place and practice history are stored in this browser. They do not sync across devices.</p><button className="secondary-button full-width" onClick={download}><Download size={17} /> Download my progress</button>{reset ? <div className="reset-confirm"><p>Clear all your progress on this device?</p><button onClick={() => { setState(createInitialState()); setReset(false); close(); location.hash = 'book'; }}>Yes, start again</button><button onClick={() => setReset(false)}>Keep my progress</button></div> : <button className="reset-link" onClick={() => setReset(true)}>Start this book again</button>}</section></div>;
}
