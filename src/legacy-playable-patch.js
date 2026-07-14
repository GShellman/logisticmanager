const LEGACY_BUILD_URL = 'legacy/Helvetic_Freight_v1.1.5.html';
export const PLAYABLE_FORCED_WIPE_KEY = 'helveticFreightPlayableForcedWipe_2';
const LEGACY_SAVE_KEY_PREFIX = 'helveticFreightSave_stable';
const LEGACY_INDEXED_DB = 'helveticFreightPersistentStore';

function replaceRequired(source, search, replacement, label) {
  if (!source.includes(search)) {
    throw new Error(`Legacy playable patch target not found: ${label}`);
  }
  return source.replace(search, replacement);
}

export function clearLegacyLocalSaves(storage) {
  if (!storage) return;
  const keys = [];
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (key?.startsWith(LEGACY_SAVE_KEY_PREFIX)) keys.push(key);
  }
  for (const key of keys) storage.removeItem(key);
}

function deleteLegacyIndexedDb() {
  if (typeof indexedDB === 'undefined') return Promise.resolve();
  return new Promise((resolve) => {
    const request = indexedDB.deleteDatabase(LEGACY_INDEXED_DB);
    request.addEventListener('success', () => resolve());
    request.addEventListener('error', () => resolve());
    request.addEventListener('blocked', () => resolve());
  });
}

export async function createAndLaunchFreshPlayableSave(storage = globalThis.localStorage) {
  if (!storage || storage.getItem(PLAYABLE_FORCED_WIPE_KEY) === 'done') return false;
  clearLegacyLocalSaves(storage);
  await deleteLegacyIndexedDb();
  storage.setItem(PLAYABLE_FORCED_WIPE_KEY, 'done');
  return true;
}

export const runOneTimePlayableForcedWipe = createAndLaunchFreshPlayableSave;

export function patchLegacyPlayableHtml(source, { forceNewGame = false } = {}) {
  let patched = source;

  patched = replaceRequired(
    patched,
    "function vehicleCanUseEdge(vehicleId,e){const v=VEHICLES[vehicleId],t=transportSpec(e);if(!v||v.mode!==t.mode)return false;if(v.mode==='rail')return true;return roadRank(e.type)>=roadRank(v.minRoad)}",
    "function vehicleCanUseEdge(vehicleId,e){const v=VEHICLES[vehicleId],t=transportSpec(e);if(!v||v.mode!==t.mode)return false;return v.mode==='rail'||t.mode==='road'}",
    'vehicle road-class compatibility'
  );

  patched = replaceRequired(
    patched,
    "  VEHICLES.tipperSmall = {name:'Kleiner Kipplaster',icon:'🚛',mode:'road',load:8000,speed:76,minRoad:'localroad',cost:88000,daily:560,kmCost:6.8,desc:'Kompakter Kipplaster für kleinere Mengen Schüttgut.',_physicalLoad:true};\n",
    '',
    'small tipper vehicle definition'
  );

  patched = replaceRequired(
    patched,
    "  for(const id of ['reeferSmall','tipperSmall']){\n",
    "  for(const id of ['reeferSmall']){\n",
    'small vehicle state initialisation list'
  );

  patched = replaceRequired(
    patched,
    "    if(HF_BULK_GOODS_V12.has(goodId)) return ['tipperSmall','tipper','freightTrain'].includes(vehicleId);\n    if(vehicleId==='tipperSmall' || vehicleId==='tipper') return HF_BULK_GOODS_V12.has(goodId);\n",
    "    if(HF_BULK_GOODS_V12.has(goodId)) return ['tipper','freightTrain'].includes(vehicleId);\n    if(vehicleId==='tipper') return HF_BULK_GOODS_V12.has(goodId);\n    if(vehicleId==='tipperSmall') return false;\n",
    'small tipper cargo compatibility'
  );

  patched = replaceRequired(
    patched,
    "    return ['van','lightTruck','heavyTruck','tipperSmall','tipper','artic','reeferSmall','reefer','freightTrain'].filter(id=>VEHICLES[id]);\n",
    "    return ['van','lightTruck','heavyTruck','tipper','artic','reeferSmall','reefer','freightTrain'].filter(id=>VEHICLES[id]);\n",
    'vehicle shop ordering'
  );

  patched = replaceRequired(
    patched,
    "  if(HF_BULK_CORE_V114.has(goodId))return ['tipperSmall','tipper','freightTrain'].includes(vehicleId);\n  if(goodId==='potatoes')return ['van','lightTruck','heavyTruck','artic','tipperSmall','tipper','freightTrain'].includes(vehicleId);\n  if(HF_FRESH_PRODUCE_V114.has(goodId))return ['van','lightTruck','heavyTruck','artic','reeferSmall','reefer','freightTrain'].includes(vehicleId);\n  if(vehicleId==='tipperSmall'||vehicleId==='tipper')return false;\n  if(vehicleId==='reeferSmall'||vehicleId==='reefer')return false;\n",
    "  if(HF_BULK_CORE_V114.has(goodId))return ['tipper','freightTrain'].includes(vehicleId);\n  if(goodId==='potatoes')return ['van','lightTruck','heavyTruck','artic','tipper','freightTrain'].includes(vehicleId);\n  if(HF_FRESH_PRODUCE_V114.has(goodId))return ['van','lightTruck','heavyTruck','artic','freightTrain'].includes(vehicleId);\n  if(vehicleId==='tipperSmall')return false;\n  if(vehicleId==='tipper')return false;\n  if(vehicleId==='reeferSmall'||vehicleId==='reefer')return false;\n",
    'final cargo compatibility rules'
  );

  patched = replaceRequired(
    patched,
    `        location.hash='hf-new-game-v115';
        location.reload();`,
    `        location.hash='hf-new-game-v115';
        if(window.parent&&window.parent!==window){window.parent.location.hash='hf-new-game-v115';window.parent.location.reload();}
        else location.reload();`,
    'title new-game reload target'
  );

  if (forceNewGame) {
    patched = replaceRequired(
      patched,
      'let state=window.__HF_FORCE_CLEAN_START__?freshState():(load()||freshState());',
      `window.__HF_FORCE_CLEAN_START__=true;
let state=window.__HF_FORCE_CLEAN_START__?freshState():(load()||freshState());`,
      'forced clean state before save loading'
    );
    patched = replaceRequired(
      patched,
      "    const isNewGame=location.hash==='#hf-new-game-v115';",
      '    const isNewGame=true;',
      'forced title new-game boot flag'
    );
  }

  return patched;
}

async function loadPatchedLegacyBuild() {
  const frame = document.querySelector('[data-legacy-playable-frame]');
  if (!frame) return;
  try {
    const response = await fetch(LEGACY_BUILD_URL, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const forcedWipe = await createAndLaunchFreshPlayableSave();
    const forceNewGame = forcedWipe || window.location.hash === '#hf-new-game-v115';
    frame.srcdoc = patchLegacyPlayableHtml(await response.text(), { forceNewGame });
    if (forceNewGame) history.replaceState(null, '', window.location.pathname + window.location.search);
  } catch (error) {
    console.error('Unable to prepare patched playable legacy build.', error);
    frame.src = LEGACY_BUILD_URL;
    document.body.classList.add('legacy-patch-failed');
  }
}

if (typeof document !== 'undefined') {
  loadPatchedLegacyBuild();
}
