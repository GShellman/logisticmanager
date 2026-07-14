# AGENTS.md

## Project

Helvetic Freight is a mobile-first logistics management game on a real-world map. It includes cities, roads, railways, junctions, factories, goods, depots, fleet management, production chains, automated dispatching, multi-stop routes, and persistent save games.

## Language

- Write all new code, comments, documentation, test names, commit messages, and user-facing text in English.
- Keep `legacy/Helvetic_Freight_v1.1.5.html` unchanged until the legacy audit and extraction task is complete.
- Do not perform an unreviewed bulk translation inside the legacy file.

## Critical rules

- `legacy/Helvetic_Freight_v1.1.5.html` is an immutable reference.
- Never append another patch block to the legacy HTML.
- Implement new logic in modules under `src/`.
- Never add a forced save wipe unless the task explicitly requests it.
- Separate application version from save-schema version.
- Save migrations must operate on a cloned candidate state.
- Validate the migrated candidate before committing it.
- Never overwrite the last known good save until startup and rendering succeed.
- Preserve automatic backups and rollback capability.
- Do not patch APK files manually. Android builds must use a reproducible Android build pipeline.
- Store assets as normal files under `public/assets/`, never as new Base64 blobs.

## Required checks before completing a task

1. Run validation, tests, and the production build.
2. Start the application locally.
3. Check the browser console for errors.
4. Open every main navigation section.
5. Start a new game.
6. Save, reload, and load the save again.
7. Advance through at least one midnight production cycle.
8. Test at least one previous save fixture when persistence changes.
9. Inspect the final diff for accidental data deletion or forced wipes.

## Core functionality that must remain available

- Real map with Swiss cities and towns
- Multiple road types with capacities and construction costs
- Junctions and shared road segments
- Rail links
- Factories and production chains
- Production once per day at 00:00
- Goods demand and actual daily consumption
- Depots built on roads
- Depot-specific fleets
- Depot dispatch calendar and multi-trip scheduling
- Multi-stop routes and mixed cargo
- Automatic depot replenishment
- Refrigerated and specialist transport restrictions
- Stable persistent saves, backups, migration, and recovery

## Preferred implementation style

- Small modules with explicit inputs and outputs
- Pure functions for simulation and migration logic
- Schema validation at save boundaries
- Deterministic tests for time and routing
- No hidden global mutation in migrations
- No direct persistence calls from render functions
