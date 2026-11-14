# Depot street-section design QA

final result: passed

This result covers the approved measured street section. It does not certify
the complete town/station backdrop, which is explicitly the following pass.
The user's requirement to retain the accepted hall, projection and live
gameplay takes precedence over recreating the generated concept's redrawn hall.

## Comparison inputs

- Source visual truth: `studies/depot-paper/exterior/station-street.png`, the
  selected Option 1, 1576 × 998. The additional modest crate shelter comes from
  the approved refinement, rather than a change of selected direction.
- Actual implementation: `docs/review-images/depot-paper/street-section/maximum.webp`,
  1800 × 1140; direct Canvas capture, density 1, 4-15 maximum 7 × 5 board,
  ambient second 7, same accepted board and actors.
- Full comparison: `comparison-full.jpg`; focused stair/pavement/bicycle
  comparison: `comparison-focused.jpg` in that evidence directory. Both source
  and actual appear together, at equal CSS width and their natural aspect.
  The comparison page is 1800 CSS pixels wide at deviceScaleFactor 1.
  Crops use the same relative scene region. No artificial image painting.
- Additional inspected actual views: `loading.webp` (1300 × 1100),
  `shelter.webp` (1100 × 1100), `pavement.webp` (1500 × 950), `grayscale.webp`,
  and `phone.png` (780 × 1688 at 390 × 844 CSS, density 2).

The concept is an exterior art-direction reference, not a pixel specification
for the already accepted room. Its curved ramp and expanded rail platform do
not describe the existing van route. The implementation deliberately uses a
measured straight ramp, retains the real hall/board proportions and reserves the
wider station for the next pass. Comparison therefore judges contacts,
construction, material compatibility and legibility within this section.

## Findings and fixes

No actionable P0/P1/P2 findings remain within the section.

- Earlier P2: lantern and planter rectangles were anchored rather than their
  visible soles, making the exterior decorations float. Fixed with measured
  source contact coordinates. The revised pavement/full captures show grounded
  bases; no duplicate planter box remains.
- Earlier P2: the raised loading road showed a raw slab edge beside the ramp.
  Fixed with a continuous retaining wall, coping and supported end connection.
  The revised loading close-up shows the wall reaching the upper road.
- Earlier P2: a wider scene frame revealed the van's offstage resting edge.
  The right scene bound is now 1880. The departed-van geometry test and actual
  route recording cover departure, the empty interval and return.
- Independent review preservation concern: small indoor flower sampling changed
  after new exterior atlas sizes. Fixed by independent hall atlas decoding;
  final browser comparison passes. The exact legacy sampling qualification is
  recorded in HANDOVER.md and browser.json; source art/geometry never changed.

The initial findings were checked in actual whole-scene/close captures, fixed,
then recaptured at the same framing. The final combined comparisons above are
the post-fix evidence, inspected alongside the full-resolution close views.

## Required fidelity surfaces

- **Typography:** accepted Georgia-style room signage and existing interface
  fonts remain unchanged. The crate label is attached to the shelter beam and
  stays secondary. The gallery uses readable serif headings and system body
  type; there is no overflow or obscured action at phone width. No new font or
  icon dependency is needed.
- **Spacing/layout:** steps reach the continuous flagstones. The trolley and
  bikes hug the foundation while the walking strip remains clear. Shelter
  posts avoid crates and the route. The maximum board remains the clearest
  bounded plane; every board size is separately captured. The concept's extra
  foliage/station framing is intentionally absent at this checkpoint.
- **Colour:** warm stone, kraft brick and muted teal continue the hall's
  materials, with a rose dawn distance. The street has lower contrast than the
  blue board and cream seams; grayscale retains the board hierarchy. The
  concept's richer terracotta paving is a possible later colour refinement.
- **Image quality/assets:** near construction uses the approved measured paper
  renderer; existing cats, workers, bikes, flowers and van remain original
  artwork. The one distant image is generated to the selected dawn palette.
  Its native aspect is preserved. Source contact registration removes floating
  bases. Actual raster captures are sharp at review size, without cutout halos.
- **Copy/content:** original delivery titles, queues, rules and chapter copy
  remain unchanged. The review page explains the street section and explicitly
  distinguishes it from the later full town pass. No implementation controls
  have entered normal play.

## Interaction and responsive evidence

All 25 deliveries solve; 721 cell picks and all four board bitmaps pass. Trusted
controls verify route placement/reload, Send/Stop, chapter/demo, rehearsal,
production-save isolation, blur pause, drag/zoom and reduced motion. There are
no browser page errors. At 390 × 844 all twelve finale queue tickets are shown,
Send ends at CSS y=744 and the document has no horizontal overflow.

## Follow-up art and qualification

- P3: give the neighbours more distinct joinery/window dressing, and consider a
  larger street lantern head when balancing the finished foreground foliage.
- Next scoped deliverable: station platform, layered town, consistent window
  views and richer exterior life. Those are substantive remaining backdrop
  work, not claimed as minor polish or completed here.
- Physical Safari performance and human visual acceptance remain review steps.

Implementation checklist complete: selected direction retained; measured
connections and contacts checked; same-state full/focused comparison inspected;
gameplay and save preservation verified; bounded review packet prepared.
