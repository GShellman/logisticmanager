import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';

const legacyPath = new URL('../legacy/Helvetic_Freight_v1.1.5.html', import.meta.url);
const manifestPath = new URL('../public/assets/legacy/manifest.json', import.meta.url);
const playablePath = new URL('../playable.html', import.meta.url);
const expectedLegacySha256 = '559737fe4dfe0611afe62a2ce9629451dff28b02e44348975eff82d6d560d9c5';

function sha256(value) { return createHash('sha256').update(value).digest('hex'); }

const info = await stat(legacyPath);
const htmlBuffer = await readFile(legacyPath);
const html = htmlBuffer.toString('utf8');
const digest = sha256(htmlBuffer);

const requiredMarkers = ['<!doctype html>', 'Helvetic', 'localStorage', 'Leaflet', 'Depot', 'hfBootV115'];
const missing = requiredMarkers.filter((marker) => !html.toLowerCase().includes(marker.toLowerCase()));

if (info.size < 1_000_000) throw new Error(`Legacy file is unexpectedly small: ${info.size} bytes`);
if (digest !== expectedLegacySha256) throw new Error(`Legacy file changed. Expected ${expectedLegacySha256}, received ${digest}`);
if (missing.length) throw new Error(`Legacy file is missing expected markers: ${missing.join(', ')}`);

const playable = await readFile(playablePath, 'utf8');
if (!playable.includes('legacy/Helvetic_Freight_v1.1.5.html') || !playable.includes('<iframe')) {
  throw new Error('playable.html must launch the immutable legacy reference.');
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
if (manifest.sourceSha256 !== expectedLegacySha256) throw new Error('Asset manifest points at a different legacy source hash.');
if (manifest.assetCount !== 60 || manifest.assets.length !== 60) throw new Error(`Expected 60 extracted assets, received ${manifest.assets.length}.`);

for (const asset of manifest.assets) {
  const bytes = await readFile(new URL(`../public/${asset.path}`, import.meta.url));
  if (bytes.length !== asset.bytes) throw new Error(`${asset.path} byte count changed.`);
  if (sha256(bytes) !== asset.sha256) throw new Error(`${asset.path} hash changed.`);
}

const fixtureNames = ['new-game.json', 'road-built.json', 'depot-open.json', 'pre-midnight.json'];
for (const name of fixtureNames) {
  const raw = await readFile(new URL(`../tests/fixtures/legacy-saves/${name}`, import.meta.url), 'utf8');
  const parsed = JSON.parse(raw);
  const state = parsed.state ?? parsed;
  if (!state || !Array.isArray(state.connections) || !Array.isArray(state.routes) || !Array.isArray(state.shipments)) {
    throw new Error(`Fixture ${name} is not structurally valid.`);
  }
}

console.log(`Legacy reference validated: ${info.size.toLocaleString('en-US')} bytes, sha256 ${digest}`);
console.log('Playable file validated: playable.html');
console.log(`Extracted assets validated: ${manifest.assets.length} files`);
console.log(`Legacy save fixtures validated: ${fixtureNames.length} files`);
