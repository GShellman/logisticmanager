# Helvetic Freight

Helvetic Freight is a mobile-first logistics management game set on a real-world map of Switzerland. The player builds roads, rail links, junctions, factories, depots, fleets, production chains, and automated delivery schedules.

## Repository purpose

This repository is a clean starting point for moving the existing project into Codex and then into a maintainable codebase.

The current playable build is preserved unchanged at:

```text
legacy/Helvetic_Freight_v1.1.5.html
```

Do not edit that file directly. It is the visual and behavioural reference used while the project is modularised.

## Quick start

Requirements:

- Node.js 20 or newer
- A modern Chromium-based browser

Run:

```bash
npm run validate
npm run dev
```

Then open the local URL shown in the terminal and choose **Open playable legacy build**.

### Playable launcher

For the patched playable game, use the platform launcher instead of opening the legacy HTML directly:

- Windows: double-click `HelveticFreight.cmd` or run `HelveticFreight.cmd` from Command Prompt.
- macOS/Linux: run `./HelveticFreight.exe` from a terminal.

Both launchers start a local server and open the playable game in your browser. Node.js 20 or newer is required.

## Recommended Codex workflow

1. Read `AGENTS.md`.
2. Read `CODEX_FIRST_TASK.md`.
3. Run `npm run validate`.
4. Start the legacy build with `npm run dev`.
5. Audit the legacy file before changing game logic.
6. Extract Base64 assets into `public/assets/`.
7. Add smoke tests before modularising systems.

## Target architecture

```text
src/
├── data/          Static game definitions: goods, facilities, vehicles, cities
├── simulation/    Production, demand, routing, depots, time progression
├── persistence/   Save store, validation, backups, migrations
├── platform/      Browser and Android integration
└── ui/            Map, depot, logistics and general interface modules
```

## Important

The legacy user interface is still in German because the reference build must remain byte-for-byte unchanged during the first audit. All new source files, documentation, identifiers, tests, and future UI copy should be written in English.
