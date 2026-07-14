import { SAVE_KEY, freshState, unwrapSave, validateState, wrapSave } from './state.js';

export function loadState(storage = window.localStorage) {
  const raw = storage.getItem(SAVE_KEY);
  if (!raw) return freshState();
  try { return unwrapSave(raw); } catch { return freshState(); }
}

export function saveState(state, storage = window.localStorage) {
  if (!validateState(state)) throw new Error('Refusing to save invalid state.');
  storage.setItem(SAVE_KEY, wrapSave(structuredClone(state)));
  return true;
}
