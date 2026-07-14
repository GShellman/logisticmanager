import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { clearLegacyLocalSaves, createAndLaunchFreshPlayableSave, patchLegacyPlayableHtml, PLAYABLE_FORCED_WIPE_KEY } from '../../src/legacy-playable-patch.js';

test('playable legacy patch removes small tipper, relaxes road classes, and reloads new games from iframe launchers', async () => {
  const legacy = await readFile(new URL('../../legacy/Helvetic_Freight_v1.1.5.html', import.meta.url), 'utf8');
  const patched = patchLegacyPlayableHtml(legacy);

  assert.doesNotMatch(patched, /VEHICLES\.tipperSmall =/);
  assert.doesNotMatch(patched, /Kleiner Kipplaster/);
  assert.match(patched, /function vehicleCanUseEdge\(vehicleId,e\)\{const v=VEHICLES\[vehicleId\],t=transportSpec\(e\);if\(!v\|\|v\.mode!==t\.mode\)return false;return v\.mode==='rail'\|\|t\.mode==='road'\}/);
  assert.match(patched, /if\(vehicleId==='reeferSmall'\|\|vehicleId==='reefer'\)return false;/);
  assert.match(patched, /window\.parent\.location\.hash='hf-new-game-v115';window\.parent\.location\.reload/);
});

test('playable legacy patch can force a new-game boot for iframe reloads', async () => {
  const legacy = await readFile(new URL('../../legacy/Helvetic_Freight_v1.1.5.html', import.meta.url), 'utf8');
  const patched = patchLegacyPlayableHtml(legacy, { forceNewGame: true });

  assert.match(patched, /window\.__HF_FORCE_CLEAN_START__=true;/);
  assert.match(patched, /const isNewGame=true;/);
  assert.doesNotMatch(patched, /const isNewGame=location\.hash==='#hf-new-game-v115';/);
});

class MemoryStorage {
  constructor(entries = []) { this.map = new Map(entries); }
  get length() { return this.map.size; }
  key(index) { return [...this.map.keys()][index] ?? null; }
  getItem(key) { return this.map.get(key) ?? null; }
  setItem(key, value) { this.map.set(key, String(value)); }
  removeItem(key) { this.map.delete(key); }
}

test('playable forced wipe removes legacy saves once and leaves its marker', async () => {
  const storage = new MemoryStorage([
    ['helveticFreightSave_stable', 'primary'],
    ['helveticFreightSave_stable_backup1', 'backup'],
    ['unrelated', 'keep']
  ]);

  assert.equal(await createAndLaunchFreshPlayableSave(storage), true);
  assert.equal(storage.getItem('helveticFreightSave_stable'), null);
  assert.equal(storage.getItem('helveticFreightSave_stable_backup1'), null);
  assert.equal(storage.getItem('unrelated'), 'keep');
  assert.equal(storage.getItem(PLAYABLE_FORCED_WIPE_KEY), 'done');
  assert.equal(await createAndLaunchFreshPlayableSave(storage), false);
});

test('local save clearing only removes Helvetic Freight stable save keys', () => {
  const storage = new MemoryStorage([
    ['helveticFreightSave_stable_tmp', 'tmp'],
    ['helveticFreightOther', 'keep']
  ]);

  clearLegacyLocalSaves(storage);
  assert.equal(storage.getItem('helveticFreightSave_stable_tmp'), null);
  assert.equal(storage.getItem('helveticFreightOther'), 'keep');
});
