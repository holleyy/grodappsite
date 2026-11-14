# Taller host presentation

This follow-up starts at `7fb02f95` on `codex/depot-paper-fidelity`, originally
branched from main `8a3c8827`. The Office guide was read at `0d845552` in PR42;
the Office branch remains untouched.

The user explicitly approved extending the Depot backdrop after comparing
Office Explore on iPhone. They clarified that the full-game interface has more
height than this temporary study. Do not carry the study controls into the game.

Room implementation: load `backdrop.js` after `town-finish.js` and before
`renderer.js`. `DepotRenderer.load()` bakes it once. `structure()` draws it before
the retained architecture background. Its coverage follows the supplied
`config.width`, `config.height` and camera; it reserves no UI space. Existing
fit bounds, board projection, near geometry and original artwork remain exact.
The host still owns its actual available canvas dimensions and camera policy.
The static continuation caches one viewport raster, invalidated by camera,
dimensions or DPR. Ordinary ambient/game motion reuses that image.

Study implementation: Explore hides the study play panel and exposes a return
button. Hidden gameplay controls are inert, and Explore taps/shortcuts cannot
edit or send routes. Chapter entry targets the eventual Board viewport so the
panel's return does not shift the board. Those behaviours are local examples,
not shared interface changes.

Owned paths: `src/fidelity/depot-paper/`, `studies/depot-paper/`,
`tests/depot-paper-*`, `docs/review-images/depot-paper/`. Shared renderer/build/
bridge/UI, canonical data, accepted Office, other rooms and native are untouched.
The integration owner handles any shared adaptation and final integration.

Preview child reserved in PR42 comment 6882736306:
`cats-by-post-depot-paper/tall-backdrop/`. Previous preview files are preserved.
User publication permission persists; no game-source push, merge or native work
is authorised by this deliverable.
