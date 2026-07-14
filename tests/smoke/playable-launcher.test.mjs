import assert from 'node:assert/strict';
import { access, readFile, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);

test('playable launcher executable can write a patched standalone game', async () => {
  await rm(new URL('../../.playable/', import.meta.url), { recursive: true, force: true });
  await access(new URL('../../HelveticFreight.exe', import.meta.url), constants.X_OK);

  const { stdout } = await execFileAsync('node', ['scripts/start-playable.mjs', '--write-only'], {
    cwd: new URL('../..', import.meta.url)
  });

  assert.match(stdout, /Playable game written/);
  const generated = await readFile(new URL('../../.playable/Helvetic_Freight_playable.html', import.meta.url), 'utf8');
  assert.doesNotMatch(generated, /Kleiner Kipplaster/);
  assert.match(generated, /return v\.mode==='rail'\|\|t\.mode==='road'/);
});
