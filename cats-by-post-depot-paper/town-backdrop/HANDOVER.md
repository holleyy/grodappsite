# Town Depot · station and town backdrop

The approved Station Street direction now extends to a wider station, layered
paper town and continuous views through all three Depot windows. The accepted
hall, street connection and maximum board remain the scene's anchor.

## Source and ownership

Runtime commit `20174d329c701ba5e59940c2772b407656983c8e` on the existing
`codex/depot-paper-fidelity` branch, `/workspace/cosysortie-depot-paper`.
Stage base `5998a07e`; previous runtime `a1b499ae`; original main `8a3c8827`.
The guide and room brief were read at `0d845552` on the Office continuity
branch through GitHub; no Office checkout or branch was changed.

Owned paths: `src/fidelity/depot-paper/`, `tests/depot-paper-*.test.js`,
`studies/depot-paper/`, `docs/review-images/depot-paper/`. No canonical,
shared renderer/interface/build, Office, other-room or native changes.
No game-source push or merge. Earlier separate publication permission persists.
The child `cats-by-post-depot-paper/town-backdrop/` was coordinated in
[PR42 comment6881323252](https://github.com/holleyy/cosysortie/pull/42#issuecomment-6881323252).

Runtime SHA256 `ba0abfd531a72d6ed6c0030c27b4012e4fd31f2016017b7553e7e59a5a8df2aa`,
20,216,163 bytes, self-contained and without runtime requests.

## Construction and activity

Pure `town-layout.js` defines platform, booking room, canopy supports,
furniture, wagon/gauge, planting and original window apertures. `town-finish.js`
extends the retained exterior finish using its projection and paper-face
renderer. Platform parts follow the actual room footing and front forecourt.
The station has a folded teal roof, supported canopy/valance, bench, outgoing
parcels, sack stand and manifest desk. Wagon wheels meet both rails; the retained
near railway wall correctly hides their lower view from this camera.

One new original town panorama supplies roofs, church, trees and fading hills.
A separate transparent tree original supplies grounded near planting. Source
images are unmodified; prompts, originals and provenance remain in this study.
The raised panorama is the selected runtime asset. Window masking preserves the
original stone and gold frame, drawing the same cached world background inside
all three glass openings. Narrow original cool-glass edges beside fan spokes
remain visible at close zoom to preserve the accepted frame antialiasing.

A stationary manifest reader reuses the accepted paper puppet on the same
ambient clock. Its platform position clears the nearer wagon roof in projection;
feet remain planted and the hands hold the paper through a quiet 48-second loop.
Reduced motion selects an exact static pose. The original driver, van, parcel
and bag exchange, growth activity and chapter clock remain unchanged. The van
continues along the upper road rather than driving down the side goods ramp.

Porting mapping: DepotTown is immutable scene geometry; windowPoint is a pure
projection; TownFinish emits cached scenery faces; TownLife samples caller-owned
pose state on the existing ambient time. No per-frame allocation or scenery
rebake is introduced. Shared lifecycle/bridge and final production integration
remain the integration owner's work. No shared change is required by this pass.

## Preservation and verification

- Ten canonical inputs and 43 retained Depot/study files are byte-identical to
  the accepted street stage. Projection, structural layout, chapter controller,
  movement schedule, rules/levels, interface and save code are exact.
- All 25 original deliveries solve, with 721 successful board picks across the
  four existing sizes. All four board images remain pixel-identical.
- The counter/support layers remain exact. Hall differences are confined to
  defined glass masks, allowing 8 source pixels of antialias margin; all 27
  sampled original gold-spoke/mullion landmarks remain exact. Full figures are
  in `evidence/window-preservation.json`.
- Trusted controls cover placement/reload, production-save isolation, Send/Stop,
  rehearsal restoration, chapter isolation, blur pause, reduced motion, dragging
  and zoom. Scenery/board caches remain stable during playback.
- At 390 × 844 CSS pixels all twelve finale queue cats and Send fit without
  horizontal overflow. This is Chromium emulation, not a physical Safari test.
- Final focused suite 65/65 and broad suite 1,720/1,720 pass; baseline was
  1,714/1,714. The broad run began before the final reader-position adjustment;
  final focused and browser checks follow that adjustment on the frozen runtime.
- The nested packet passes at 390 and 1440 CSS pixels: all 11 images and six
  videos decode, all 17 links respond, and phone play controls work. Browser,
  motion, preservation, interactions and performance evidence bind to this SHA.

The actual renderer videos record the full ambient round, station reader, van
exchange/return, chapter teaching, growth and exit at 24 fps H.264. They establish
visible motion/contacts, not physical-device frame-rate qualification.

The alternating software-draw comparison records medians 30.4/29.0 ms for the
accepted street runtime and 29.0/29.4 ms for this backdrop (paired means 29.7
and 29.2 ms). It finds no material regression under this machine load. Counter
cache remains 514×360; supports remain 93×263 and 94×272. These are headless
measurements, not physical-device frame-rate certification.

## Review and remaining qualification

One fresh independent review found no Critical or Important issue. Its Minor
missing interaction hash was addressed in the final packaging evidence binding;
the rerun passes on this runtime. Full review and dispositions are in `REVIEW.md`.
Human artistic acceptance and physical iPhone/Safari
performance remain user review steps. The distant town is one baked dawn scene;
this study does not add time-of-day transitions or an animated train service.
Those are not changes to the existing gameplay or schedule.

Review `index.html`; play `playable.html`; evidence under `evidence/`.
`design-qa.md` records full and focused comparisons, corrections and limitations.
