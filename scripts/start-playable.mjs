#!/usr/bin/env node
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { patchLegacyPlayableHtml } from '../src/legacy-playable-patch.js';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outDir = join(root, '.playable');
const patchedGameName = 'Helvetic_Freight_playable.html';
const patchedGamePath = join(outDir, patchedGameName);
const port = Number(process.env.HELVETIC_FREIGHT_PORT || 4173);
const writeOnly = process.argv.includes('--write-only');
const noOpen = process.argv.includes('--no-open') || writeOnly;

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml; charset=utf-8']
]);

async function writePatchedGame() {
  const legacyHtml = await readFile(join(root, 'legacy/Helvetic_Freight_v1.1.5.html'), 'utf8');
  await mkdir(outDir, { recursive: true });
  await writeFile(patchedGamePath, patchLegacyPlayableHtml(legacyHtml));
  return patchedGamePath;
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const relative = decoded === '/' ? '/.playable/Helvetic_Freight_playable.html' : decoded;
  const candidate = normalize(join(root, relative));
  if (!candidate.startsWith(root)) return null;
  return candidate;
}

function openBrowser(url) {
  const command = process.platform === 'darwin'
    ? 'open'
    : process.platform === 'win32'
      ? 'cmd'
      : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
  const child = spawn(command, args, { detached: true, stdio: 'ignore' });
  child.unref();
}

await writePatchedGame();

if (writeOnly) {
  console.log(`Playable game written to ${patchedGamePath}`);
  process.exit(0);
}

const server = createServer(async (request, response) => {
  try {
    const path = safePath(request.url || '/');
    if (!path) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    const info = await stat(path);
    if (!info.isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'content-type': contentTypes.get(extname(path)) || 'application/octet-stream' });
    createReadStream(path).pipe(response);
  } catch (error) {
    response.writeHead(error?.code === 'ENOENT' ? 404 : 500);
    response.end(error?.code === 'ENOENT' ? 'Not found' : 'Internal server error');
  }
});

server.listen(port, () => {
  const url = `http://localhost:${port}/`;
  console.log(`Helvetic Freight playable is running: ${url}`);
  console.log('Press Ctrl+C to stop.');
  if (!noOpen) openBrowser(url);
});
