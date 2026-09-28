import React, { createContext, useContext, useRef, useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import manifest from './audio-manifest.json';

const Context = createContext(null);
export function AudioProvider({ children, slow }) {
  const player = useRef(null);
  const [playing, setPlaying] = useState('');
  const [error, setError] = useState('');
  function stop() {
    if (player.current) { player.current.pause(); player.current = null; }
    window.speechSynthesis?.cancel();
    setPlaying('');
  }
  async function speak(text) {
    const wasPlaying = playing === text;
    stop(); setError('');
    if (wasPlaying) return;
    setPlaying(text);
    const entry = manifest[text] || manifest[Object.keys(manifest).find(k => k.toLowerCase() === text.toLowerCase())];
    if (entry) {
      const audio = new Audio(entry[slow ? 'slow' : 'normal']);
      player.current = audio;
      audio.onended = () => { if (player.current === audio) { setPlaying(''); player.current = null; } };
      try { await audio.play(); return; } catch { if (player.current !== audio) return; }
    }
    if ('speechSynthesis' in window) {
      const voice = window.speechSynthesis.getVoices().find(v => v.lang.replace('_', '-').startsWith('nl'));
      if (voice) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice; utterance.lang = voice.lang; utterance.rate = slow ? .7 : .9;
        utterance.onend = () => setPlaying('');
        utterance.onerror = () => { setPlaying(''); setError('Audio is unavailable. You can still use the written exercises.'); };
        window.speechSynthesis.speak(utterance); return;
      }
    }
    setPlaying(''); setError('This recording could not play. Check your connection and try again.');
  }
  return <Context.Provider value={{ speak, stop, playing }}>{children}{error && <div className="audio-error" role="alert">{error}<button onClick={() => setError('')} aria-label="Dismiss audio message">×</button></div>}</Context.Provider>;
}
export const useAudio = () => useContext(Context);
export function AudioButton({ text, label, className = '', conceal = false }) {
  const { speak, playing } = useAudio();
  const active = playing === text;
  return <button className={`audio-button ${active ? 'playing' : ''} ${className}`} onClick={() => speak(text)} aria-label={conceal ? active ? 'Stop Dutch audio' : 'Play Dutch audio' : active ? `Stop ${text}` : `Listen to ${text}`} title="Listen in Dutch">{active ? <Square size={17} /> : <Volume2 size={19} />}{label && <span>{label}</span>}</button>;
}
