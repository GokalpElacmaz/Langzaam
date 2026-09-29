import React, { createContext, useContext, useRef, useState } from 'react';
import { Volume2, Square, Play } from 'lucide-react';
import manifest from './audio-manifest.json';
import { stripMarkup } from './curriculum/text.js';

const Context = createContext(null);
const lookup = (text) => manifest[text] || manifest[Object.keys(manifest).find(k => k.toLowerCase() === text.toLowerCase())];

export function AudioProvider({ children, slow }) {
  const player = useRef(null);
  const queue = useRef([]);
  const [playing, setPlaying] = useState('');
  const [error, setError] = useState('');
  function stop() {
    queue.current = [];
    if (player.current) { player.current.pause(); player.current = null; }
    window.speechSynthesis?.cancel();
    setPlaying('');
  }
  async function play(text, key, onDone, voice) {
    setPlaying(key);
    const entry = lookup(text);
    const recording = entry && (entry[voice] || entry[entry.default]);
    if (recording) {
      const audio = new Audio(recording[slow ? 'slow' : 'normal']);
      player.current = audio;
      audio.onended = () => { if (player.current === audio) { player.current = null; onDone(); } };
      try { await audio.play(); return; } catch { if (player.current !== audio) return; }
    }
    if ('speechSynthesis' in window) {
      const browserVoice = window.speechSynthesis.getVoices().find(v => v.lang.replace('_', '-').startsWith('nl'));
      if (browserVoice) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = browserVoice; utterance.lang = browserVoice.lang; utterance.rate = slow ? .7 : .9;
        utterance.onend = onDone;
        utterance.onerror = () => { setPlaying(''); setError('Audio is unavailable. You can still use the written exercises.'); };
        window.speechSynthesis.speak(utterance); return;
      }
    }
    setPlaying(''); setError('This recording could not play. Check your connection and try again.');
  }
  function speak(raw, voice) {
    const text = stripMarkup(raw);
    const wasPlaying = playing === text;
    stop(); setError('');
    if (!wasPlaying) play(text, text, () => setPlaying(''), voice);
  }
  /** Play several lines in order, e.g. a whole dialogue. Lines are strings or { text, voice }. `key` identifies the button. */
  function speakAll(texts, key) {
    const wasPlaying = playing === key;
    stop(); setError('');
    if (wasPlaying) return;
    queue.current = texts.map(line => typeof line === 'string' ? { text: stripMarkup(line) } : { ...line, text: stripMarkup(line.text) });
    const nextLine = () => {
      const line = queue.current.shift();
      if (!line) { setPlaying(''); return; }
      play(line.text, key, () => setTimeout(() => { if (queue.current.length) nextLine(); else setPlaying(''); }, 450), line.voice);
    };
    nextLine();
  }
  return <Context.Provider value={{ speak, speakAll, stop, playing }}>{children}{error && <div className="audio-error" role="alert">{error}<button onClick={() => setError('')} aria-label="Dismiss audio message">×</button></div>}</Context.Provider>;
}
export const useAudio = () => useContext(Context);
export function AudioButton({ text, label, className = '', conceal = false, voice }) {
  const { speak, playing } = useAudio();
  const clean = stripMarkup(text);
  const active = playing === clean;
  return <button type="button" className={`audio-button ${active ? 'playing' : ''} ${className}`} onClick={() => speak(clean, voice)} aria-label={conceal ? active ? 'Stop Dutch audio' : 'Play Dutch audio' : active ? `Stop ${clean}` : `Listen to ${clean}`} title="Listen in Dutch">{active ? <Square size={17} /> : <Volume2 size={19} />}{label && <span>{label}</span>}</button>;
}
export function PlayAllButton({ texts, id, label = 'Play all' }) {
  const { speakAll, playing } = useAudio();
  const active = playing === id;
  return <button type="button" className={`audio-button audio-wide ${active ? 'playing' : ''}`} onClick={() => speakAll(texts, id)}>{active ? <Square size={16} /> : <Play size={16} />}<span>{active ? 'Stop' : label}</span></button>;
}
