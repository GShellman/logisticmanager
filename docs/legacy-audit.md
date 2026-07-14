# Legacy audit: Helvetic Freight v1.1.5

## Reference integrity

- Immutable file: `legacy/Helvetic_Freight_v1.1.5.html`.
- Size at audit time: 10,562,434 bytes.
- SHA-256: `559737fe4dfe0611afe62a2ce9629451dff28b02e44348975eff82d6d560d9c5`.
- The reference file remains the runnable historical build and was not edited during extraction.

## Existing architecture

The legacy build is a single HTML document containing CSS, markup, data definitions, simulation logic, persistence logic, and appended patch blocks. The main DOM shell consists of a title screen, a full-screen map, a right/mobile side sheet, four top-level tabs, footer time/save controls, toast container, and modal host. Leaflet is loaded from the unpkg CDN before the main script, so map startup depends on network availability unless the browser has cached Leaflet.

The runtime is enclosed in an immediately invoked function expression. Most modules are represented by shared global constants and functions rather than separate files. Later appended patch blocks mutate the same objects and replace functions in-place.

## Startup sequence

1. Early bootstrap script sets build and boot flags such as `window.__HF_BUILD__`, `window.__HF_BOOT_COMPLETE__`, and pending save flags.
2. Leaflet is loaded from `https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`.
3. The main IIFE creates safe storage wrappers, save keys, state validators, and one-time stability wipe logic.
4. Base game assets and data tables are declared: assets, goods, facilities, transport types, vehicles, allowed raw facilities, cities, and demand goods.
5. The initial game state is created or restored, then migrations and patch blocks mutate it into the latest shape.
6. Rendering functions initialize the map, side-panel content, markers, routes, modals, logistics views, and company views.
7. Many appended patch IIFEs add content, replace functions, and install event listeners.
8. The final v1.1.5 boot routine restores the best persistent candidate from local storage or IndexedDB, validates the candidate, calls `renderAll()`, verifies that main content rendered, marks boot complete, installs autosave hooks, refreshes save mirrors, and installs the stable title controller.

## Global state and runtime objects

Important global or closure-scoped state includes:

- `state`: canonical game state.
- `map`: Leaflet map instance.
- selected city and current tab through `state.selected` and `state.tab`.
- `pendingProject`: road/rail construction or upgrade awaiting confirmation.
- shipment, capacity, route, depot, and fleet arrays under `state`.
- boot flags under `window.__HF_*`.
- public compatibility hooks under `window.HF`.

The state model includes cities, city inventories, demands, facilities, connections, shipments, persistent routes, depots, depot fleets, used vehicles, used capacity, cash, day, and clock minutes.

## Data models and systems

The legacy file defines these major systems:

- Swiss city/town map with fixed coordinates and tiers.
- Road and rail transport types with capacity, speed, build cost, maintenance, color, and vehicle restrictions.
- Fleet definitions for vans, trucks, specialist vehicles, and freight trains.
- Goods, physical measures, prices, perishability, and no-retail flags.
- Raw and processing facilities with recipes and daily production.
- Demand, population-based daily consumption, and sales.
- Road construction, route hydration, junction reuse, and network pathfinding.
- Manual shipments, return cargo, persistent routes, multi-stop routes, mixed cargo, and depot scheduling.
- Depots with inventory, depot-specific fleets, replenishment logic, and dispatch planning.
- Daily production and consumption at midnight.
- Save migration, validation, backups, rollback, and IndexedDB mirroring.

## Save keys and schemas

Canonical persistence keys in v1.1.5:

- `helveticFreightSave_stable`
- `helveticFreightSave_stable_tmp`
- `helveticFreightSave_stable_lastGood`
- `helveticFreightSave_stable_backup1`
- `helveticFreightSave_stable_backup2`
- IndexedDB database: `helveticFreightPersistentStore`
- IndexedDB object store: `saves`
- IndexedDB records: `primary`, `lastGood`, `backup1`
- Current save schema constant: `HF_SAVE_SCHEMA = 1`

The save envelope stores `schemaVersion`, `buildVersion`, `savedAt`, and `state`. v1.1.5 writes a fast local-storage cache and queues an IndexedDB write. Restore candidates are sorted by `savedAt`, cloned, migrated, structurally validated, and only then assigned to `state`.

## Appended patches and duplicate functions

The file contains many appended patch sections. Detected duplicate function names include:

- `initMap` twice.
- `renderShipmentMarkers` three times.
- `renderMap` twice.
- `goodCard` twice.
- `renderCity` three times.
- `renderNetwork` twice.
- `renderLogistics` four times.
- `initShippingForm` four times.
- `refreshGoods` eight times.
- `refreshReturnGoods` seven times.
- `dispatchCore` three times.
- `createPersistentRoute` three times.
- `runPersistentRoutes` three times.
- `openFacility` twice.
- `produce` twice.
- `finishDay` twice.
- `advanceMinutes` twice.
- `reset` five times.
- `renderCompany` three times.

Because all of these live in one script scope, later function declarations and assignments override earlier behavior. This explains why the exact source order is part of the game logic and must be preserved during migration.

## Forced wipes and save-risk findings

The legacy file includes a v1.1.0 stability block that performs a one-time cleanup of older Helvetic Freight save keys and records `helveticFreightStabilityWipe_1_1_0`. It archives one recoverable raw save to `helveticFreightLegacyArchive_1_1_0`, removes matching legacy keys, and sets `window.__HF_FORCE_CLEAN_START__`.

The v1.1.5 title-screen new-game path explicitly removes the canonical local-storage save, temp, last-good, and backup keys, clears IndexedDB saves, changes the hash, and reloads. This is appropriate for an explicit new-game action but would be dangerous if called automatically.

Likely startup or rendering failure modes:

- Leaflet CDN unavailable or blocked.
- IndexedDB unavailable, blocked, or denied.
- localStorage unavailable in private/local-file contexts.
- A later duplicate function overriding a previous patch unexpectedly.
- A save candidate passing JSON parse but failing structural validation after migration.
- `renderAll()` throwing before `window.__HF_BOOT_COMPLETE__` is set, which intentionally prevents save overwrite.
- Map rendering requiring Leaflet while tests or offline environments lack it.

## Asset inventory

The audit found 60 embedded Base64 image assets:

- 25 goods images.
- 26 facility/building images.
- 9 vehicle images.
- MIME types: 59 WebP files and 1 PNG file.

All assets are extracted losslessly by `scripts/extract-assets.mjs` into generated files under `public/assets/legacy/`, with hashes and source line numbers recorded in the generated `public/assets/legacy/manifest.json`. The generated binary files are intentionally not committed because this review system does not support binary files.

## Development build scope

The structured development build added in this task is intentionally minimal. It provides the same main surface needed for migration smoke coverage: title screen, new game, save/load, city tab, network tab, logistics tab, company tab, road construction, depot opening, extracted asset loading, and midnight production transition. It does not redesign or add gameplay; the immutable reference remains available as the complete legacy behavior source.

## Recommended extraction order for future migration

1. Persistence and migration boundaries.
2. Static data tables and asset manifest.
3. Pure production/demand simulation.
4. Network graph, pathfinding, and construction.
5. Fleet and shipment simulation.
6. Depot scheduling and automatic replenishment.
7. Rendering and Leaflet integration.
8. Mobile sheet, modals, and user interaction polish.
