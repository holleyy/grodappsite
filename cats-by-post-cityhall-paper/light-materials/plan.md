# City Hall — lighting and material contrast

17 November 2026. Approved direction: the user's “Ok let’s do lighting and
material contrast to close the remaining quality gap”. Continue the selected
vault and connected district from `5cfce675`; canonical main remains `923b40d7`.
Spec: the next checkpoint in `cityhall-paper-civic-district.md`, together with
the original City Hall brief and `parallel-fidelity-work.md`.

## Visual contract

- Warm ivory interior, honey timber and restrained brass highlights; richer green
  recesses. Walls remain warm stone on both sides, with one consistent sun.
- Cooler, quieter neighbouring roofs and distant stone distinguish the setting
  from the hall. Retain the panorama and its continuous ground transition.
- Clearer contact and cast shadows under galleries, stairs, desks and benches;
  all marks belong to receiving surfaces. Keep the whole board and its pieces clear.
- Break up broad paving with coherent stone colour groups and quiet large-scale
  variation, not extra decorative props. Maintain the completed civic plan.
- Retain every asset byte, Black worker, camera, route, level and board raster.
  All light/material changes are prepared during existing static bakes, with no
  new per-frame work or canvas caches. No shared/native/other-room changes.

## Tasks

- [x] Establish exact baseline, fresh room captures and focused checks.
- [x] Refine room-owned paper surface shading and timber/stone/green separation.
  Add measured static receiving shadows and coherent warm/cool wall/glass light.
- [x] Quiet civic roofs/distance and enrich paving tones at the unchanged scale.
- [x] Inspect matched desktop, wide district, grayscale finale and actual sparse
  phone views. Iterate on the visible result, not colour values alone.
- [x] Build and verify all 15 deliveries, phone controls, resource/disposal/offline
  behaviour; compare board and protected-file hashes. Run final full npm suite.
- [x] One fresh whole-change Astra review, resolve material findings and preserve
  evidence, source archive and handoff. Prepare a new additive review PR; merge
  only after explicit approval for that PR.

## Verification and review focus

New receiver geometry needs tests that catch off-plane or overextended shadows.
Reversible palette/opacity choices use matched render evidence, not tests of colour
constants. Board images and all retained artwork must remain byte-exact. Inspect
warm stone on BOTH walls, window transparency, staircase depth, gallery foot contact,
maximum-board contrast, phone sky/ground coverage, and a seamless panorama join.
The final review must distinguish actual visual improvement from functional success.

## Ledger

Pre-flight: paper stock and clock-bay texture shading are shared inside this room;
board stock must stay unchanged. Scope any material treatment to scene construction.
Floor shadows are behind live actors/board. Exterior colour changes share the
panorama transition and must be evaluated together.

Ruling: proceed with the already approved checkpoint, without a new concept vote.
Ruling: preserve the 1,719-test baseline result from the exact unchanged runtime
`c772ee9b0a42f8c58635894665aafe48a09888b97069ca234f17e536c7121323` and rerun the focused
baseline now. Only packaging/receipt commits followed that full run. The final
full suite will run again after this checkpoint's implementation changes.

Visual iteration: first candidate paving was too patterned. Narrowed only the two stone palettes; kept the cooler mean tone. Independent reviewer inspected the final b2084fbb candidate and approved with no defects. Remaining artistic softness/edge coherence is documented rather than labelled parity.

## User refinement — rolled-paper pipes

During final qualification the user identified the pipes as cartoonish/lo-fi rather
than papercraft. This extends the current material checkpoint: replace screen-space
coloured strokes with textured faceted tubes, rounded polygonal elbows and raised
folded collars. Keep the exact centreline graph and the existing 3.1-unit clearance
envelope, all artwork, and the static-bake ownership. Geometry tests must catch
holes and envelope violations. Refresh pipe close-ups and the final build checks.
The earlier lighting review stands for its unchanged scope; the new pipe work
needs a targeted extension of that review before this checkpoint is ready.

Pipe review: the first faceted candidate read too flat. Strengthened broad
matte face shade and separated collar stock; no glossy stripe. Final 9c54a0ca
captures approved by the targeted Astra review, with no blockers. Geometry is
unchanged by this colour-only adjustment; all 56 focused tests rerun afterward.
The full suite had already started against the new tube/shadow geometry.
Final browser receipts and captures are refreshed after the material adjustment.

Final verification: 1,723 full-suite tests, 56 focused tests, 72 browser checks/15
wins, 44 phone checks, 26 qualification checks and five coverage checks pass.
All 195 protected paths, 209 assets/registration records and three board rasters
remain exact. Source-archive preflight rebuilds the final runtime and passes all
56 focused tests. Packet publication remains gated on its own user approval.
