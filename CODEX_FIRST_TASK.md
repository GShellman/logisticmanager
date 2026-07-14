# First Codex task

Work in planning mode first.

Analyse `legacy/Helvetic_Freight_v1.1.5.html` completely. The file is an immutable reference and must not be edited.

## Objectives

1. Document the existing architecture, systems, data models, global state, and startup sequence.
2. Identify appended patches, duplicate functions, conflicting save keys, forced wipes, and likely startup or rendering failures.
3. Extract every Base64 asset losslessly into organised folders under `public/assets/`.
4. Create a minimally structured development build that reproduces the legacy behaviour without changing game mechanics.
5. Add automated smoke tests for:
   - title screen
   - new game
   - save and load
   - opening every main menu
   - road construction
   - depot opening
   - one complete day transition through 00:00
6. Create representative legacy save fixtures.
7. Do not redesign or add gameplay in this task.

## Done when

- The legacy reference runs locally.
- Extracted assets load from normal files.
- Smoke tests run reproducibly.
- `docs/legacy-audit.md` contains a concrete audit.
- No legacy feature has been removed.
- The legacy reference file is unchanged.

Show the implementation plan before making changes.
