# Black postal workers and the remaining City Hall quality gap

17 November 2026. User requested Black postal workers so their child can see
himself in the game, then clarified City Hall and Town Depot; Sorting Office
is being handled separately. This checkpoint changes those two review builds.

## Candid assessment

City Hall does not yet match the overall scene quality of Town Depot and
Sorting Office. The tall vault, green-and-brass identity, clock and staircase
are good foundations. Passing interaction and animation checks did not establish
artistic parity. The supplied references have more convincing material weight,
stronger colour grouping and a setting that explains the building's place in
the town. The freshly captured City Hall still has broad, similar-value paving,
lightweight repeated facades and thin roof members. Small improvements to
flowers, pipes or street props cannot close that compositional gap alone.

| Gap | Evidence in the references | Next action | Visible acceptance criterion |
|---|---|---|---|
| Surrounding town feels assembled around the hall | Depot station, tracks and street continue the postal story; Office canal, terraces and quay form one setting | Compose a coherent civic block: connected street fronts, a square with planted edges, a clear approach to the entrance, overlapping near/middle/distant layers | At full-room and tall-phone sizes, the hall belongs to a town; no large leftover concrete corners or abrupt backdrop seams |
| Architecture lacks enough mass | Depot brick piers, deep window surrounds and structural joints; Office strong wall and support hierarchy | Keep the selected height, board projection and vault silhouette; give piers, arch reveals, cornices, roof connections and plinths believable depth | Main structure reads before ornament, both walls feel made from the same materials, roof and galleries visibly meet their supports |
| Too many surfaces share pale cream values | Warm brick, blue board and coral sky at Depot; teal water and warm lit windows at Office | Establish warm directional interior light, cooler receding exterior layers, richer green shadows and consistent contact shade; tune large colour groups before grain | Building, board, street and distance separate at thumbnail size and in grayscale; bright detail does not flatten the whole room |
| Finish and activity vary in scale/style | Reference props support clear work areas and streets rather than filling gaps | After composition and structure, unify paper texture, edge weight, prop scale and human activity; check hands/cargo/feet in motion | Workers and objects sit in the same scene, routes stay legible, no added detail crowds the board |

## Proposed next checkpoints

1. **Civic setting and structural weight together.** One whole-scene composition
   pass, shown at the same displayed board size as the references, plus the
   actual sparse phone UI. Resolve the square, nearby buildings and major hall
   supports before adding ornament. Keep the board's established 2:1 projection.
2. **Light and materials across the whole room.** Apply the approved large-scale
   composition consistently to both walls, roof, floor and exterior. Inspect
   contact shadows, glass, masonry and colour grouping in desktop/phone views.
3. **Character and activity polish.** Consistent prop scale, purposeful work,
   supported feet and grips; then side-by-side artistic review against both
   references. Technical success remains a separate gate from visual acceptance.

This checkpoint delivers the requested representation change now. The larger
scene work above is the proposed next sequence, not a claim that it is complete.

## Implementation and ownership

- City Hall: three new ImageGen masters (front head, rear head, hand), registered
  through the established paper composer. 24 normal poses, 16 carry variants,
  24 articulated bases and the joint hand updated. All feet, wrist, shoulder,
  head and pose anchors stay exact. Clothing and shoes remain the existing art.
- Town Depot: two new ImageGen atlases, including the seated clerk, walking
  worker, driver and station reader. Native masters retained unchanged. Browser
  Canvas registers each figure to the original alpha bounds before the existing
  clipping/animation rig consumes it. All exposed skin and hair are represented
  consistently in front/rear/working views.
- Depot input is the exact published `final-review/playable.html`, SHA-256
  `5f0d1e9c2f0094d33b5a6830ae13dbcfa21c8b7814b7ab7cb1a981a918b44240`.
  Reversing the two atlas URL replacements reproduces every original byte.
  This is an additive review variant; another chat's source tree is not edited.
- Native masters, registration metadata, builders and reports are retained in
  `studies/cityhall-paper/black-workers/` and this checkpoint's review folder.
- Sorting Office and all shared character originals are untouched. No game
  source push or production integration. Publication remains inside a new child
  of the already authorised City Hall review prefix on grodappsite.

## Verification

- 43 focused City Hall tests; 72 browser checks including 15 real delivery wins.
- 44 phone checks, including safe areas, touch, controls and full-height scenery.
- Depot: 25 real delivery wins and 721 board picks; reduced-motion path checked.
- All three City Hall and four Depot board rasters remain identical to before.
- City Hall resource estimate unchanged: 72,918,760 bytes in 55 owned canvas
  buffers, 13 bakes. This is not a process/GPU memory measurement.
- All 195 protected source/export files remain exact. No browser errors in
  matched room captures or delivery checks.
- Physical devices and artistic parity are not established by these checks.

## Decisions

Ruling: integrate generated assets through existing sprite registration, not a
skin-colour filter — this provides authored Black faces and textured hair while
preserving character motion. Generated Depot figures drifted slightly, so each
was registered to its original bounds and inspected in the actual rig. Small
differences in the paper contours remain part of the new artwork.

Ruling: publish Depot as an additive variant in this checkpoint — the Depot
source worktree is not present, but the exact public runtime is available and
its two-asset-only change can be verified byte-for-byte. Applying these assets
back to that room's development branch remains an explicit integration step.
