# City Hall — civic district and structural weight

17 November 2026. Continues from the approved Black postal workers checkpoint
`34ea6d0e`; canonical remote base remains `923b40d7c3ef2b9e4fab49d290267f0094a1a9bb`.

## What changed

The hall sits between connected civic frontages, with a library wing on the left
and records/registry terrace behind it. Shared walls, recessed doors, continuous
pavements and narrower streets give the buildings a common ground plane.
Two larger planted areas frame the entrance approach; their trees and low
planting soften the foreground without closing the steps or courier route.

Stone pier bases, stepped window reveals, continuous cornices and solid roof
ribs give the existing vault more depth. Bearing plates, shoes and ties now
connect the ribs to the original piers. The height, silhouette and board
projection remain the selected design. A segmented roof-shading fault found in
the first capture was corrected by painting each complete soffit behind its web.

The distant panorama has complete building bases and planted edges. Its quiet
ground fades into the measured paving, removing the previous horizontal cutoff.
The new native ImageGen master is retained unchanged; a full-image WebP conversion
is registered under the existing skyline key. The prior master remains in source.
All scene additions are baked once through the existing rendering layers.

## Assessment against the references

This is a stronger setting and more substantial building. It does not yet match
Town Depot or Sorting Office throughout. Their lighting separates foreground,
interior and distance more decisively; their materials and props have a more
consistent finish. City Hall still exposes a broad, fairly uniform paving field
when zoomed out. The nearby roofs also need quieter colour grouping so that the
hall's vault always reads first.

The next checkpoint is light and materials: a warmer interior, cooler distance,
richer green shadows, clearer contact beneath cornices and benches, and more
controlled stone/glass/floor response to the existing sun direction. Review that
pass beside the references at matched board size and in the actual sparse phone
layout. Further small props are lower priority than those broad relationships.

## Preserved contracts and checks

The crown remains 180, spring 138, floor 224 × 192, and projection 2:1. All three
board rasters, all Black worker assets and 195 protected source/export files stay
exact. No changes to Town Depot, Sorting Office, shared originals, canonical game
HTML, rules, data, saves, worker movement or native code.

The evidence packet contains matched before/after room, district, detail,
maximum-board, grayscale and full-height phone views. `verification.json` is the
authoritative receipt for the completed test counts and runtime hash. It includes
all 15 deliveries, phone controls, offline loading, resource stability and disposal.
Browser checks cover both panorama alpha boundaries and opaque ground underneath,
and confirm that foreground trees/shadows fit inside their baked canvas.

At the matched 320 × 568 capture the owned-canvas estimate is 74,374,760 bytes,
55 buffers and 13 bakes: 1,456,000 bytes above the previous checkpoint because
of the enlarged foreground layer. There are no new buffers/bakes or warm-draw
canvas allocations. This estimate excludes decoded images and browser/GPU memory.
Cloud Chromium checks do not establish physical-device or Safari performance.

## Ownership and publication

Room-owned files only, in the existing isolated worktree. Original assets and
previous preview folders remain. Source is committed locally; no game-source push
or production integration. The proposed additive public child is
`cats-by-post-cityhall-paper/civic-district/` in grodappsite. The original brief
requires explicit authorisation for merge/deploy; PR #9 permission covered the
previous checkpoint. This checkpoint's public merge is a separate final step.
