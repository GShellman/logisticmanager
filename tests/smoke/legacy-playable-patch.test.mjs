import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { patchLegacyPlayableHtml } from '../../src/legacy-playable-patch.js';

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

  assert.match(patched, /const isNewGame=true;/);
  assert.doesNotMatch(patched, /const isNewGame=location\.hash==='#hf-new-game-v115';/);
});
