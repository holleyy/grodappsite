# Town Depot · street section

The selected Station Street direction now has a playable measured section:
front steps, continuous pavement, bicycle parking, parcel trolley, return-crate
shelter, goods ramp, upper service road and railway boundary. This is the agreed
construction checkpoint before the complete surrounding town and station pass.

## Source and ownership

Runtime commit: `a1b499aefbd9f759d13eb590c9bc9c274173b3ef` on
`codex/depot-paper-fidelity`, `/workspace/cosysortie-depot-paper`.
Stage base: `aa72a746`; original main: `8a3c8827`. Accepted hall/runtime:
`e95567bdef0e68c498ee961eacba9b452ffb3ee7`.

Owned paths remain `src/fidelity/depot-paper/`, `tests/depot-paper-*.test.js`,
`studies/depot-paper/` and `docs/review-images/depot-paper/`.
No canonical, shared renderer/interface/build, Office, other-room or native
changes. No game-source push or merge. The user authorised separate Depot
publication earlier in this chat; the new child prefix was coordinated in
[PR 42](https://github.com/holleyy/cosysortie/pull/42#issuecomment-6880230962).

Runtime SHA256:
`8940f53c4f46b5dde3474717443f09145db1164b280a840d5b2ac099858bf432`
(17,711,623 bytes).

## Construction

The hall and upper loading road stay at height 0; the pavement is -70 and the
street -76. A 2.5-unit-wide straight ramp connects the lower street to the
existing apron. Its brick retaining wall, raking coping and end piers join the
upper-road retaining edge. The front five steps keep their accepted dimensions.
Pedestrian routes from the stair and neighbouring doors are supported and clear.

Near geometry uses the existing paper-face renderer and projection. The quiet
distant dawn is one new unmodified generated image, with its original prompt
and provenance retained beside this handover. The retained flower and lantern
images are registered by their actual visible contact points. Crates stand
inside the shelter; parcels sit on a wheeled trolley; bicycle tyres meet the
pavement. The shelter posts and braces support its folded roof.

The van still follows its accepted horizontal route on the upper service road.
It does not drive down the new ramp. The 2,880-frame/48-second round, parcel/bag
exchange and worker schedule are unchanged. Tyre support and clearance are
checked every half frame, and the departed van stays beyond the scene bounds.

## Preservation and checks

- 1,714/1,714 broad tests pass; baseline was 1,708/1,708. The broad run began
  before the final load-only atlas isolation; final focused and browser checks
  follow that correction. All 59 focused tests pass on the frozen runtime.
- All 25 original solutions, 721 pointer picks and four board sizes pass.
  All four board bitmaps are pixel-identical to the accepted runtime.
- Ten canonical inputs and 38 retained Depot source/assets are byte-identical
  to the stage base. Projection, structural layout, gameplay, chapter controller,
  motion schedule and save logic are unchanged.
- All four retained hall layers match the accepted renderer when both decode
  the original detail atlas independently. Chromium's shared image sampling
  cache previously made 2,050 tiny flower pixels differ with a maximum channel
  delta of 20 when the exterior drew new sizes first. An independent Blob-backed
  ImageBitmap now isolates hall sampling at load. This is not a claim of literal
  pixel identity to the legacy page's unnormalised atlas cache.
- Trusted browser controls cover placement/reload, production-save isolation,
  Send/Stop, rehearsal restoration, chapter isolation, blur pause, reduced
  motion, dragging and zoom. Scenery/board caches stay stable during playback.
- At 390 × 844 CSS pixels, all twelve finale queue cats and Send fit without
  horizontal overflow. This is Chromium emulation, not physical Safari testing.

The paired software-rendering comparison measures median draws of 24.0/20.7 ms
for the accepted room and 27.2/21.5 ms for this section (paired means 22.35 and
24.35 ms). Counter and support caches retain their exact tight dimensions.
An earlier concurrent capture/test run produced a noisy 25.1/80.2 ms sample;
the repeated alternating comparison is the reported result. These are headless
machine-load measurements, not physical-device frame-rate certification.

The evidence JSON records exact runtime hashes. The videos contain actual
seekable renderer frames at 24 fps, encoded to H.264 without interpolation:
van exchange/departure/return, chapter teaching, growth and exit. They are
visual evidence rather than device performance measurements.

## Review and limits

One fresh independent review found no critical issues and one important
preservation concern: the flower sampling difference described above. The final
isolation and comparison address that concern; no second whole-change review
was requested. The reviewer independently checked construction, contacts,
clearance, board picking, controls and stable caches. Modest neighbour facades
and the small street lantern are further art refinements, not geometry defects.

The full station, richer layered town, matching window views, foliage and further
exterior activity remain the next pass. This checkpoint does not claim the
complete backdrop has reached the reference's richness. The accepted hall stays
the visual anchor. Physical iPhone/Safari performance remains unverified.

The integration chat owns production lifecycle, shared services and final
integration. This remains a silent, isolated visual study; production saves and
the original game are untouched. No shared change is required by this section.

Review: `index.html`; runtime: `playable.html`; full/focused comparisons and
phone evidence: `evidence/`; preservation: `evidence/preservation.json`;
test results: `evidence/tests.json`; design assessment: `design-qa.md`.
