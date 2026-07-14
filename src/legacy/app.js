import { cities, goods, tabs, freshState } from './state.js';
import { loadState, saveState } from './persistence.js';

let manifest = { assets: [] };
const asset = (group, id) => manifest.assets.find((item) => item.group === group && item.id.replace(/-\d+$/, '') === id)?.path;
const money = (value) => `CHF ${Math.round(value).toLocaleString('de-CH')}`;
const clock = (minute) => `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`;

let state = loadState();
let titleOpen = true;

function selectedCity() { return cities.find((city) => city.id === state.selected) ?? cities[0]; }
function cityState(id = state.selected) { return state.cities[id]; }
function persist() { saveState(state); }
function toast(message) { document.querySelector('#status').textContent = message; }

function renderHeader() {
  document.querySelector('#cash').textContent = money(state.cash);
  document.querySelector('#day').textContent = `Day ${state.day} · ${clock(state.minute)}`;
  document.querySelector('#networkStat').textContent = `${Object.values(state.cities).filter((city) => city.unlocked).length} place${Object.values(state.cities).filter((city) => city.unlocked).length === 1 ? '' : 's'}`;
}

function renderMap() {
  const map = document.querySelector('#map');
  map.innerHTML = cities.map((city) => `<button class="city ${state.selected === city.id ? 'selected' : ''} ${state.cities[city.id].unlocked ? 'unlocked' : 'locked'}" data-city="${city.id}" style="left:${((city.lng - 5.7) / 5.1) * 100}%;top:${(1 - ((city.lat - 45.7) / 2.2)) * 100}%">${city.name}</button>`).join('') + state.connections.map((edge) => `<div class="edge">${edge.a} → ${edge.b} · ${edge.type}</div>`).join('');
  map.querySelectorAll('[data-city]').forEach((button) => button.addEventListener('click', () => { state.selected = button.dataset.city; renderAll(); }));
}

function renderTabs() {
  document.querySelector('#tabs').innerHTML = tabs.map((tab) => `<button class="tab ${state.tab === tab.id ? 'active' : ''}" data-tab="${tab.id}">${tab.label}</button>`).join('');
  document.querySelectorAll('[data-tab]').forEach((button) => button.addEventListener('click', () => { state.tab = button.dataset.tab; renderAll(); }));
}

function goodCard(good) {
  const src = asset('goods', good);
  return `<div class="good">${src ? `<img src="/public/${src}" alt="${good}">` : ''}<b>${good}</b><small>${cityState().inventory[good] ?? 0}</small></div>`;
}

function renderCity() {
  const city = selectedCity();
  const current = cityState();
  return `<section class="card"><h2>${city.name}</h2><p>Legacy-style city overview with inventory, demand, and facilities.</p><div class="goods">${goods.map(goodCard).join('')}</div><h3>Facilities</h3><p>${current.facilities.join(', ') || 'No facilities'}</p></section>`;
}

function renderNetwork() {
  const target = cities.find((city) => city.id !== state.selected && !state.connections.some((edge) => edge.a === state.selected && edge.b === city.id)) ?? cities[1];
  return `<section class="card"><h2>Network</h2><p>Build roads and inspect Swiss transport links.</p><button id="buildRoad" class="btn primary">Build road to ${target.name}</button><div class="list">${state.connections.map((edge) => `<div class="list-item">${edge.a} → ${edge.b} · ${edge.type}</div>`).join('') || '<div class="empty">No roads yet.</div>'}</div></section>`;
}

function renderLogistics() {
  return `<section class="card"><h2>Logistics</h2><p>Depots, depot fleets, dispatch calendar, and route planning.</p><button id="openDepot" class="btn primary">Open depot in ${selectedCity().name}</button><div class="list">${state.depots.map((depot) => `<div class="list-item">Depot ${depot.cityName} · vans ${depot.fleet.van}</div>`).join('') || '<div class="empty">No depots yet.</div>'}</div></section>`;
}

function renderCompany() {
  return `<section class="card"><h2>Company</h2><p>Fleet, cash, saves, and operating history.</p><button id="saveGame" class="btn primary">Save game</button><button id="loadGame" class="btn secondary">Load game</button><div class="list">${state.history.slice(-6).map((item) => `<div class="list-item">${item}</div>`).join('')}</div></section>`;
}

function renderContent() {
  const views = { city: renderCity, network: renderNetwork, logistics: renderLogistics, company: renderCompany };
  document.querySelector('#content').innerHTML = views[state.tab]();
  document.querySelector('#buildRoad')?.addEventListener('click', () => {
    const target = cities.find((city) => city.id !== state.selected && !state.connections.some((edge) => edge.a === state.selected && edge.b === city.id)) ?? cities[1];
    state.cash -= 25000; state.cities[target.id].unlocked = true; state.connections.push({ id: `e${Date.now()}`, a: state.selected, b: target.id, type: 'mainroad', distance: 42, capacity: 16 }); state.history.push(`Road built to ${target.name}.`); persist(); renderAll(); toast('Road construction completed.');
  });
  document.querySelector('#openDepot')?.addEventListener('click', () => {
    if (!state.depots.some((depot) => depot.id === state.selected)) { state.cash -= 35000; state.depots.push({ id: state.selected, cityName: selectedCity().name, fleet: { van: 1 }, inventory: {} }); state.history.push(`Depot opened in ${selectedCity().name}.`); }
    persist(); renderAll(); toast('Depot opened.');
  });
  document.querySelector('#saveGame')?.addEventListener('click', () => { persist(); toast('Game saved.'); });
  document.querySelector('#loadGame')?.addEventListener('click', () => { state = loadState(); renderAll(); toast('Game loaded.'); });
}

function finishDay() {
  Object.values(state.cities).forEach((city) => { if (city.unlocked) city.inventory.grain = (city.inventory.grain ?? 0) + 5; });
  state.history.push(`Production completed at 00:00 on day ${state.day}.`);
}

function advance(minutes) {
  for (let i = 0; i < minutes; i += 1) { state.minute += 1; if (state.minute >= 1440) { state.minute = 0; state.day += 1; finishDay(); } }
  persist(); renderAll();
}

export function renderAll() { renderHeader(); renderMap(); renderTabs(); renderContent(); }

export async function start() {
  manifest = await fetch('/public/assets/legacy/manifest.json').then((response) => response.json());
  document.querySelector('#newGame').addEventListener('click', () => { state = freshState(); persist(); titleOpen = false; document.documentElement.classList.remove('title-open'); renderAll(); toast('New game started.'); });
  document.querySelector('#loadTitle').addEventListener('click', () => { state = loadState(); titleOpen = false; document.documentElement.classList.remove('title-open'); renderAll(); toast('Game loaded.'); });
  document.querySelector('#nextHour').addEventListener('click', () => advance(60));
  document.querySelector('#nextDay').addEventListener('click', () => advance(1440));
  document.querySelector('#saveFooter').addEventListener('click', () => { persist(); toast('Game saved.'); });
  window.HF_DEV = { getState: () => structuredClone(state), setState: (next) => { state = next; persist(); renderAll(); }, advance, save: persist, load: () => { state = loadState(); renderAll(); }, openTab: (tab) => { state.tab = tab; renderAll(); }, isTitleOpen: () => titleOpen };
  renderAll();
}
