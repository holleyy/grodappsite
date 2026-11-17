# City Hall civic district implementation plan

**Goal:** complete the next checkpoint approved on 17 November: a connected
civic setting and more substantial hall architecture, at the established height.

**Spec:** `cityhall-paper-black-workers.md`, proposed checkpoint 1. The user's
“Amazing, can you head to your next City Hall checkpoint pls” authorises that
already presented direction. This is refinement of the selected vault, not a
new composition-selection round. Existing isolated worktree and branch continue
from `34ea6d0e`.

**Architecture:** keep the existing world projection and static scenery bakes.
A room-owned civic-district module supplies measured connected building groups,
street/square surfaces and planted boundaries. The existing vault module gains
stronger base, arch and roof construction. Neither change touches game rules,
board images, motion routes, worker art or shared source.

**Tech stack:** plain JavaScript, Canvas paper geometry and retained materials;
Python standalone builder; Node/browser checks and matched Chromium captures.

## Constraints and visual decisions

- Keep the vault spring 138, crown 180, floor 224 × 192 and exact 2:1 projection.
- Keep all 15 authored deliveries, 7×5/7×6/8×6 boards and chapter states.
- Retain Black worker artwork and every existing working/grip route.
- Keep nearby buildings outside the hall/arrival route; connected frontage must
  have a continuous usable pavement. Separate street, square and planted areas
  with broad material groups, not additional scattered ornaments.
- Hall stays the dominant silhouette. Use warm muted masonry for neighbouring
  civic terraces and quieter distant facades; retain green/slate roofs.
- Work in existing room-owned paths. Town Depot, Sorting Office, shared source,
  native code, canonical HTML and hash baselines remain exact.
- User selection and publication are distinct: prepare the entire review first;
  earlier PR #9 permission applied to that publication, not an automatic new merge.

## Tasks

- [x] Capture the exact starting desktop, square, finale and sparse phone views;
  run the required baseline suite and preserve board raster hashes.
- [x] Add `src/fidelity/cityhall-paper/civic-district.js`: connected civic
  frontages, differentiated street/square paving and substantial planted edges.
  Integrate through `environment.js`, `street-life.js`, `daylight.js`,
  `civic-square.js` and the room-owned `build.py`. Tests in
  `tests/cityhall-paper-civic-district.test.js` check receiving surfaces, shared
  frontage joins, route clearances, deterministic bounds and preserved approach.
- [x] Strengthen `vault-and-walls.js` columns, arch reveals and roof ribs/joints,
  with `architecture.js` changes only if needed. Tests in
  `tests/cityhall-paper-structural-mass.test.js` check spring/crown preservation,
  supports and clear worker/stair corridors. Parent owns district files; Astra
  implementer owns these structural files. The neighbour-building function in
  vault-and-walls stays unchanged to avoid an overlapping contract.
- [x] Rebuild and inspect matched full-room, detail, grayscale and phone captures.
  Refine broad composition until the square reads as a place, the structure has
  credible mass, and the new shapes do not hide workers, pipework or board.
- [x] Run focused/broad required tests, 72 delivery/browser checks, 44 phone
  checks and resource/disposal qualification. Compare all board hashes and 195
  protected paths; check new routes and foreground occlusion visually.
- [x] One fresh Astra whole-checkpoint review. Record findings and resolve
  blocking regressions. Commit source, evidence, remaining limits and handoff.
- [x] Prepare an additive review packet under a new City Hall child; publication
  approval is the last step after the result is concrete and reviewable.

## Review focus

1. Portrait phones reveal more ground/sky: avoid paving deserts, hard backdrop
   seams and foreground foliage through the board at both zoom extremes.
2. The large 8×6 finale must remain as legible as 7×5 without changing its camera.
3. Deeper piers/ribs must meet supports and avoid workers, stair headroom and pipes.
4. Connected neighbours must not become a competing wall of identical houses.
5. Scenery work must stay in the prepared bakes, with no new per-frame allocation
   or unaccounted canvas resources; reduced-motion poses remain supported.

## Ledger

Pre-flight: district and structural work share the painter/projection, but own
separate files; build integration belongs to parent. Existing tests and raster
hashes cover the preserved board and worker contracts. Visual comparison is an
additional gate, not a substitute for those checks.

Ruling: use the already approved checkpoint and proceed without another design
approval cycle. Concrete frontage and masonry proportions are implementation
choices to be evaluated in the next review; the selected vault remains fixed.

Implementation note: the retained skyline cut buildings off at its lower edge. A new ImageGen panorama retains complete building bases and quiet lower ground; static alpha blending joins it to the measured paving. Original master is retained unchanged.
