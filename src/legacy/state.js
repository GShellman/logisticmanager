export const SAVE_KEY = 'helveticFreightSave_stable';
export const SAVE_SCHEMA = 1;

export const tabs = [
  { id: 'city', label: 'ORT' },
  { id: 'network', label: 'NETZ' },
  { id: 'logistics', label: 'LOGISTIK' },
  { id: 'company', label: 'FIRMA' }
];

export const cities = [
  { id: 'zurich', name: 'Zürich', lat: 47.3769, lng: 8.5417 },
  { id: 'winterthur', name: 'Winterthur', lat: 47.4988, lng: 8.7241 },
  { id: 'basel', name: 'Basel', lat: 47.5596, lng: 7.5886 },
  { id: 'bern', name: 'Bern', lat: 46.948, lng: 7.4474 },
  { id: 'luzern', name: 'Luzern', lat: 47.0502, lng: 8.3093 },
  { id: 'geneva', name: 'Genève', lat: 46.2044, lng: 6.1432 }
];

export const goods = ['grain', 'food', 'tools', 'electronics', 'medicine', 'corn'];

export function freshState() {
  return {
    schemaVersion: SAVE_SCHEMA,
    buildVersion: '1.1.5-dev',
    cash: 500000,
    day: 1,
    minute: 7 * 60,
    selected: 'zurich',
    tab: 'city',
    cities: Object.fromEntries(cities.map((city, index) => [city.id, {
      unlocked: index === 0,
      inventory: { grain: index === 0 ? 10 : 0 },
      demands: { food: { need: index === 0 ? 8 : 0, max: 20 } },
      facilities: index === 0 ? ['farm'] : [],
      sales: 0
    }])),
    connections: [],
    shipments: [],
    routes: [],
    depots: [],
    fleet: { van: 1 },
    usedVehicles: {},
    usedCapacity: {},
    history: []
  };
}

export function validateState(value) {
  return Boolean(value && typeof value === 'object' && Number.isFinite(Number(value.day)) && Number.isFinite(Number(value.cash)) && value.cities && Array.isArray(value.connections) && Array.isArray(value.shipments) && Array.isArray(value.routes));
}

export function wrapSave(state) {
  return JSON.stringify({ schemaVersion: SAVE_SCHEMA, buildVersion: '1.1.5-dev', savedAt: new Date().toISOString(), state });
}

export function unwrapSave(raw) {
  const parsed = JSON.parse(raw);
  const state = parsed?.state && typeof parsed.state === 'object' ? parsed.state : parsed;
  if (!validateState(state)) throw new Error('Save fixture is structurally invalid.');
  return state;
}
