import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const legacyUrl = new URL('../legacy/Helvetic_Freight_v1.1.5.html', import.meta.url);
const outputRoot = new URL('../public/assets/legacy/', import.meta.url);
const expectedLegacySha256 = '559737fe4dfe0611afe62a2ce9629451dff28b02e44348975eff82d6d560d9c5';
const vehicles = new Set(['van', 'lightTruck', 'heavyTruck', 'artic', 'freightTrain', 'reefer', 'tipper', 'reeferSmall', 'tipperSmall']);
const facilities = new Set(['farm', 'forestry', 'mine', 'chemical', 'foodplant', 'furniture', 'toolworks', 'electronics', 'pharma', 'textile', 'pigfarm', 'slaughterhouse', 'fishery', 'tomatofarm', 'zucchinifarm', 'appleorchard', 'potatofarm', 'cannery', 'aluminumworks', 'ravioli_meat_factory', 'ravioli_veg_factory', 'cornfarm', 'pearorchard', 'peafarm']);
const mimeExt = new Map([['image/webp', 'webp'], ['image/png', 'png'], ['image/jpeg', 'jpg']]);

function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
function sanitize(value) { return String(value).replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-|-$/g, '') || 'asset'; }
function classify(id, fallback) {
  const base = id.replace(/-\d+$/, '');
  if (vehicles.has(base)) return 'vehicles';
  if (facilities.has(base)) return 'facilities';
  return fallback === 'vehicles' || fallback === 'facilities' ? fallback : 'goods';
}

const legacyBytes = await readFile(legacyUrl);
const sourceSha256 = sha256(legacyBytes);
if (sourceSha256 !== expectedLegacySha256) {
  throw new Error(`Refusing to extract from unexpected legacy file ${sourceSha256}.`);
}
const html = legacyBytes.toString('utf8');
await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const pattern = /(?<prefix>(?:ASSETS(?:\.[a-zA-Z0-9_]+|\[['"][^'"]+['"]){2}|['"][^'"]+['"]\s*:\s*)\s*=?)\s*['"]data:(?<mime>image\/[^;]+);base64,(?<data>[A-Za-z0-9+/=]+)['"]/g;
const counts = new Map();
const assets = [];
let match;
while ((match = pattern.exec(html))) {
  const { prefix, mime, data } = match.groups;
  const line = html.slice(0, match.index).split('\n').length;
  const ext = mimeExt.get(mime) ?? 'bin';
  let group = 'goods';
  let id = `asset-${String(assets.length + 1).padStart(3, '0')}`;
  const dot = prefix.match(/ASSETS\.([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)/);
  const key = prefix.match(/['"]([^'"]+)['"]\s*:/);
  if (dot) {
    group = dot[1];
    id = dot[2];
  } else if (key) {
    id = key[1];
  }
  id = sanitize(id);
  group = classify(id, group);
  const countKey = `${group}/${id}`;
  const next = (counts.get(countKey) ?? 0) + 1;
  counts.set(countKey, next);
  if (next > 1) id = `${id}-${next}`;

  const raw = Buffer.from(data, 'base64');
  const relativePath = `assets/legacy/${group}/${id}.${ext}`;
  const outputPath = new URL(`../public/${relativePath}`, import.meta.url);
  await mkdir(dirname(fileURLToPath(outputPath)), { recursive: true });
  await writeFile(outputPath, raw);
  assets.push({ id, group, path: relativePath, mime, bytes: raw.length, sha256: sha256(raw), sourceLine: line, dataUriSha256: sha256(data) });
}

const manifest = { source: 'legacy/Helvetic_Freight_v1.1.5.html', sourceSha256, assetCount: assets.length, assets };
await writeFile(new URL('manifest.json', outputRoot), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Extracted ${assets.length} legacy assets to ${fileURLToPath(outputRoot)}`);
