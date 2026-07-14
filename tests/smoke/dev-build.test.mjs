import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { freshState, tabs, unwrapSave, validateState } from '../../src/legacy/state.js';

const fixtures = [
  'new-game.json',
  'road-built.json',
  'depot-open.json',
  'pre-midnight.json'
];

test('title screen markup is present', async () => {
  const html = await readFile(new URL('../../index.html', import.meta.url), 'utf8');
  assert.match(html, /id="titleScreen"/);
  assert.match(html, /id="newGame"/);
  assert.match(html, /id="loadTitle"/);
});



test('playable file launches the immutable legacy reference', async () => {
  const html = await readFile(new URL('../../playable.html', import.meta.url), 'utf8');
  assert.match(html, /legacy\/Helvetic_Freight_v1\.1\.5\.html/);
  assert.match(html, /<iframe/);
});

test('every main menu is declared for smoke navigation', () => {
  assert.deepEqual(tabs.map((tab) => tab.id), ['city', 'network', 'logistics', 'company']);
});

test('new game state is structurally valid', () => {
  const state = freshState();
  assert.equal(state.day, 1);
  assert.equal(state.selected, 'zurich');
  assert.ok(validateState(state));
});

test('save fixtures load as representative legacy saves', async () => {
  for (const name of fixtures) {
    const raw = await readFile(new URL(`../fixtures/legacy-saves/${name}`, import.meta.url), 'utf8');
    assert.ok(validateState(unwrapSave(raw)), name);
  }
});

test('road construction fixture contains a built road', async () => {
  const raw = await readFile(new URL('../fixtures/legacy-saves/road-built.json', import.meta.url), 'utf8');
  const state = unwrapSave(raw);
  assert.equal(state.connections.length, 1);
  assert.equal(state.connections[0].type, 'mainroad');
});

test('depot fixture contains an opened depot', async () => {
  const raw = await readFile(new URL('../fixtures/legacy-saves/depot-open.json', import.meta.url), 'utf8');
  const state = unwrapSave(raw);
  assert.equal(state.depots.length, 1);
  assert.equal(state.depots[0].id, 'zurich');
});

test('pre-midnight fixture can advance through a complete day transition', async () => {
  const raw = await readFile(new URL('../fixtures/legacy-saves/pre-midnight.json', import.meta.url), 'utf8');
  const state = unwrapSave(raw);
  for (let i = 0; i < 10; i += 1) {
    state.minute += 1;
    if (state.minute >= 1440) {
      state.minute = 0;
      state.day += 1;
      state.cities.zurich.inventory.grain += 5;
    }
  }
  assert.equal(state.day, 4);
  assert.equal(state.minute, 5);
  assert.ok(state.cities.zurich.inventory.grain >= 15);
});
