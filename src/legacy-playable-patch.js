const LEGACY_BUILD_URL = 'legacy/Helvetic_Freight_v1.1.5.html';

function replaceRequired(source, search, replacement, label) {
  if (!source.includes(search)) {
    throw new Error(`Legacy playable patch target not found: ${label}`);
  }
  return source.replace(search, replacement);
}

export function patchLegacyPlayableHtml(source) {
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
        if(window.parent&&window.parent!==window)window.parent.location.reload();
        else location.reload();`,
    'title new-game reload target'
  );

  return patched;
}

async function loadPatchedLegacyBuild() {
  const frame = document.querySelector('[data-legacy-playable-frame]');
  if (!frame) return;
  try {
    const response = await fetch(LEGACY_BUILD_URL, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    frame.srcdoc = patchLegacyPlayableHtml(await response.text());
  } catch (error) {
    console.error('Unable to prepare patched playable legacy build.', error);
    frame.src = LEGACY_BUILD_URL;
    document.body.classList.add('legacy-patch-failed');
  }
}

if (typeof document !== 'undefined') {
  loadPatchedLegacyBuild();
}
