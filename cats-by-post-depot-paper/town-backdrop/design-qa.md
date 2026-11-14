# Depot station and town · visual assessment

final result: passed for the scoped backdrop deliverable

This pass implements the approved wider station, layered dawn town and coherent
window views. The accepted hall, board, street connection and game remain the
basis of the scene. The generated concept guides the exterior rather than
replacing the accepted room proportions.

## Comparison inputs and actual captures

Selected direction: `studies/depot-paper/exterior/station-street.png`,1576×998.
Actual renderer: `docs/review-images/depot-paper/town-backdrop/maximum.webp`,
1800×1140 at density 1, delivery 4-15, maximum 7 × 5, ambient second 7. This is the
live Canvas renderer on a detached review canvas, with no image retouching.
`comparison-full.jpg` shows both at equal CSS width and natural aspect.
`comparison-focused.jpg` compares previous/current windows at identical crops.
The comparison page uses 1800 CSS pixels and deviceScaleFactor 1.

Inspected actual close views: station1400×1100, windows1300×1200,
neighbours1100×1100, pavement1500×950. All four boards, grayscale and the
390×844 CSS phone capture are separately recorded. Full and close motion clips
use actual seekable renderer frames at 24 fps, without interpolated artwork.

## Construction corrections made during this pass

- Reduced the initial station roof and rear platform footing so the station
  reads as a neighbouring building and fits the retained camera bounds.
- Painted platform furniture and hanging lanterns before the canopy roof.
  Canopy posts, braces, beam, valance and cast shadow share measured heights.
- Added uprights behind the bench back slats and retained all parcel soles on
  the platform. The wagon wheel soles meet both existing rails at height 6.
- Moved the manifest reader from x 5.8 to 4.7 after the actual crop exposed a
  projected overlap with the nearer wagon roof. Its feet now read on the
  platform. A projected-clearance regression failed before and passes after.
- Replaced equal-angle fan masking with source-measured spoke angles and
  conservative insets. The final comparison retains all sampled gold bars and
  hall pixels outside the glass mask, including its small antialias margin.
- Added a courtyard tree to give the nearest window a supported foreground
  view. Raised the distant town in a new original asset to reveal more roofs,
  complete clouds and the modest church landmark above the hall.
- Kept a single supported flower box beneath each neighbour window; enlarged
  the street lantern head on its existing supported shaft.

## Fidelity surfaces

Typography stays with the accepted room lettering and interface. Station and
wagon labels are secondary to delivery information. No font/network dependency
or new technical control enters normal play.

The station, track, forecourt and gardens use the existing world projection.
The station platform is height 12, the retained hall/loading road height 0 and
pavement -70. Foreground beds sit on the street at -76. Canopy posts and props
stand on the platform; the foot passage, van route and all boards stay clear.
The retained maximum board remains the clearest bounded plane in grayscale.

Warm kraft brick, pale stone and muted teal continue into the station. Tree
cutouts and the distant panorama share the rose dawn light. The town is
arranged into near terraces/trees, smaller roofs/church and fading hills.
Near geometry stays sharper than the raster distance. The source panorama
keeps its 2:1 aspect, and tree placement uses its actual visible trunk sole.

Each glass aperture samples the same world background at the exact existing
projection, with a light glass tint. The three views are distinct and aligned.
Narrow original cool-glass strips remain beside the gold fan spokes to preserve
the original frame antialiasing; close zoom reveals these retained edges.
This is a static dawn view, consistent with the approved study's lighting.

Canonical delivery titles, queues, rule instructions and chapter copy stay
exact. The gallery explains the new station/town pass and links directly to
Explore and the maximum playable board. It includes the previous accepted
scene, selected concept, all board sizes and full/focused animation evidence.

## Behaviour and limits

All 25 original solutions and721 pointer picks pass. All four board bitmaps and
counter/support images remain exact; changes to the hall base are confined to
the masked glass openings. Save/placement/reload, Send/Stop, rehearsal, chapter
isolation, blur pause, reduced motion and dragging/zoom checks pass. Architecture
bakes and board caches stay stable during playback.

At 390 × 844 CSS pixels all twelve finale queue cats and Send fit, with no
horizontal overflow. These are Chromium checks, not physical Safari testing.
The scene remains a separate silent Depot study. Production integration and
physical-device qualification belong to the integration owner.

Final independent review found no Critical or Important issue. Final-hash
interaction evidence includes the reviewer-requested runtime binding. The exact
nested packet passes at 390 and 1440 CSS pixels: all 11 images and six videos
decode, all 17 links respond, and phone Explore/Board/Hint/Send/Stop controls work.
The alternating software-draw medians are 30.4/29.0 ms before and 29.0/29.4 ms
after. No material regression is observed; physical-device performance remains
unverified. Full regression results are recorded separately in evidence/tests.json.
