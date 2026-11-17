# Town Depot: courier arms and postal slide

Requested 17 November 2026 after the Depot source merge. The user identified
crossed/distorted courier arms and an incoherent inclined postal lift/slide.

Branch `codex/depot-arms-slide`, worktree
`/workspace/cosysortie-depot-paper`, base
`e1d902ee9d1c17585acd254a15e6fa9d40c2529b` (current main at task start).
Original Depot base `8a3c8827` remains the historical study manifest base.

Runtime SHA256:
`11c8449233c5564081a5948e015a571ed9a8b2f746fccbb5c5754c5b3ed27c9e`.

## Correction

The elbow solve now considers depth before projecting into the room. Its bend
side belongs to the shoulder; it no longer flips when the hand crosses the
shoulder's screen position. Sleeves retain their paper width, and palms have
their own fixed-size binding. The sleeve is clipped at the cuff and meets the
same wrist on the separate palm. The torso crop closes the shoulder seam.

The tea hand keeps its grip aligned with the upright cup handle. Independent
review found that deriving its angle from a nearly zero projected forearm
vector produced a spin at frames 1915–1916 and 2605–2606. The final grip is
sampled directly from the pose, without frame history or a new animation clock.
The mug handle is on the side occupied by the original hand contact.

The conveyor now has a continuous channel along the existing postal stations,
with solid rails, shared crest sections, enclosed roller ends, crossheads,
braces and planted feet. The receiving tray floor is at the parcel's existing
44-unit arrival height. Its widened footprint and the support feet are recorded
in the room's clearance bounds. The path and its timing are unchanged.

Raised machinery paints above the counter in a baked `transport` layer. Its
near guards and receiving lips paint over the parcel in `transportFront`,
before the nearer people. Parcel pitch is baked into 25 small cards and eased
through the feed, crest and outlet; the cat stays upright within its box.
All new geometry/cards are baked once. The frame loop reuses the existing
pose buffers and cached card keys.

## Ownership and integration

Changed room source: `architecture.js`, `paper-puppet.js`, `postal-life.js`,
`renderer.js`, `room-finish.js`, and the fixture bounds in `workday.js`, all under
`src/fidelity/depot-paper/`. Tests, generated study and review evidence remain
under the Depot-owned paths. All 27 accepted asset files are unchanged,
including the latest imported worker artwork.

No new module or shared host API is needed. The existing Depot renderer owns
the two added static transport layers and their caches. The integration owner
continues to own the production host, lifecycle, shared renderer/build/bridge,
interface and final integration. Office, other rooms and native files are
unchanged. This correction is a review branch, not a new game-source merge.

## Evidence

`evidence/` in the published review (or
`docs/review-images/depot-paper/arms-slide/` in source) contains:

- Actual before/final Canvas closeups and 16 working poses, plus the maximum
  board and phone/desktop study captures.
- The full 48-second round and focused dispatch/tea recordings. These are
  deterministic renderer frames encoded at 24 fps, not a live-device FPS claim.
- All 25 original solutions, 721 cell picks and equality of all four board
  rasters against the merged base.
- Trusted controls, planning reload, protected production saves, chapter
  intro/growth/exit, reduced motion and cache stability.
- Exact equality of all 11,520 quarter-frame postal samples against the base;
  ten unchanged canonical inputs, 27 unchanged assets and the exact unchanged
  shared build (`dedb812743`).
- Focused regression records, paired software rendering timings
  and the independent review disposition.

The old screen-space bone-length lower bound was inappropriate for an arm
pointing toward the camera. The dense rig test retains finite/reach checks;
new checks cover stable elbow sides, continuity, fixed sleeve width, palm size
and tea-hand orientation instead. The original defects were observed failing
before implementation; their red logs are retained in the source evidence.

Physical iPhone/Safari rendering and artistic acceptance remain human review.
The standalone study still uses its isolated save key and existing study UI.

## Preview

Reserved in the integration thread (PR42):
`cats-by-post-depot-paper/arms-slide/`. Publication is additive under the Depot's
previously authorised preview area. Earlier previews and the other chat's
`black-postal-workers` preview are retained unchanged.

The review index links to the playable study and both targeted movement clips.
`manifest.json` binds every published payload; `PUBLICATION.md` in source records
the publication commit and deployment verification.
