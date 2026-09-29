import { createInitialState } from './learning.js';
const KEY = 'langzaam-v2';
export function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    if (!stored || stored.version !== 2 || !stored.words || !stored.completedSteps || !Array.isArray(stored.completedLessons)) return createInitialState();
    return { ...createInitialState(), ...stored };
  } catch { return createInitialState(); }
}
export function saveState(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch { return false; }
}
export function loadPreferences() {
  try { return { slow: false, translations: true, ...JSON.parse(localStorage.getItem(`${KEY}-preferences`) || '{}') }; }
  catch { return { slow: false, translations: true }; }
}
export function savePreferences(preferences) { try { localStorage.setItem(`${KEY}-preferences`, JSON.stringify(preferences)); } catch {} }
