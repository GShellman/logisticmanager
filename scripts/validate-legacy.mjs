import { readFile, stat } from 'node:fs/promises';

const path = new URL('../legacy/Helvetic_Freight_v1.1.5.html', import.meta.url);
const info = await stat(path);
const html = await readFile(path, 'utf8');

const requiredMarkers = [
  '<!doctype html>',
  'Helvetic',
  'localStorage',
  'Leaflet',
  'Depot'
];

const missing = requiredMarkers.filter((marker) => !html.toLowerCase().includes(marker.toLowerCase()));

if (info.size < 1_000_000) {
  throw new Error(`Legacy file is unexpectedly small: ${info.size} bytes`);
}

if (missing.length) {
  throw new Error(`Legacy file is missing expected markers: ${missing.join(', ')}`);
}

console.log(`Legacy reference validated: ${info.size.toLocaleString('en-US')} bytes`);
