# Migration plan

## Phase 1: Preserve and audit

- Keep the legacy build unchanged.
- Inventory all globals, data definitions, systems, patches, and save formats.
- Extract assets.
- Add behaviour-focused smoke tests.

## Phase 2: Establish a canonical core

- Create one startup sequence.
- Create one save store.
- Separate build version and save-schema version.
- Move static definitions into `src/data/`.
- Move simulation systems into pure modules.

## Phase 3: Safe persistence

Startup order:

1. Read the stored save and backups.
2. Clone the selected source save.
3. Migrate the clone.
4. Validate and repair the candidate.
5. Initialise the simulation.
6. Render the complete interface.
7. Only after success, commit the candidate as the current save.

A failed migration or render must never overwrite the previous valid save.

## Phase 4: UI extraction

- Map UI
- City UI
- Network UI
- Logistics UI
- Depot dispatch centre
- Company UI
- Title screen

## Phase 5: Android

- Create a regular Android project.
- Use a reproducible Gradle build.
- Keep one permanent application ID.
- Secure and back up the signing key.
- Add lifecycle-aware save flushing.
- Never patch an APK by editing the archive.
