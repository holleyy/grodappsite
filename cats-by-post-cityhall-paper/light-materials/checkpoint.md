# City Hall — light and materials

17 November 2026. Continues the selected civic district from `5cfce675` and
runtime `c772ee9b0a42f8c58635894665aafe48a09888b97069ca234f17e536c7121323`.
Final runtime: `9c54a0ca6b8ed9523ea150d6d148ebdc0d57a10cddccf8619f9b8927175e33f9`.
Canonical main remains `923b40d7c3ef2b9e4fab49d290267f0094a1a9bb`.

## Result

The warmer, deeper timber gives the unchanged ivory board a clearer setting.
Green paint and timber joinery have richer shaded faces, while brass and stone
retain restrained warm highlights. Cool slate roofs and quieter civic facades
separate the neighbouring town from the hall. A light atmospheric wash on the
prepared panorama carries that distinction into the distance.

Cast shadows now use the actual gallery height, individual stair treads, piers,
desks and bench. They land on the existing floor plane, behind furniture, workers
and the board. Warm wall gradients include the cornice and sheltered lower wall.
Transparent glazing reflects cool sky and warm floor tones while preserving the
world visible through each window. The vault glass follows the same palette.

Paving now has cooler stone groups and clearer slab edges. The first candidate
made individual bricks too conspicuous; the final colour ranges were narrowed
after visual inspection and independent review feedback. This retains the warm
hall/cool town distinction without adding as much patterned noise.

The user also identified the existing pipes as cartoonish rather than papercraft.
Their coloured screen-space strokes are now closed octagonal paper tubes in world
space. Transported frames carry the folds through polygonal elbows. Bevelled
annular collars have thickness; each face receives retained brass paper grain
and directional matte shade. Endpoints and the 3.1-unit clearance envelope remain
unchanged. Geometry and texture projection run only in existing static bakes.

## Assessment

This is a visible improvement in colour hierarchy and contact. It closes part of
the gap with the references, but it does not establish artistic parity. City Hall
still has denser gold/green linework and more regular construction than Town
Depot's softer, more unified materials. The broad paving remains repetitive at
minimum zoom. The remaining finish should focus on those edges, material softness
and overall coherence, not a new set of decorative props or a changed camera.

## Preserved contracts

All 209 registered assets and their registration data are byte-identical to the
baseline, including every Black worker pose and hand. The three board rasters,
projection, camera, vault geometry, worker routes and all game rules remain exact.
All 195 protected source/export paths are unchanged. Town Depot, Sorting Office,
canonical HTML, shared artwork and native code are untouched.

Everything added is prepared in existing scenery bakes. The matched 320 × 568
capture reports the same 74,374,760 owned canvas bytes, 55 buffers and 13 bakes.
This estimate excludes decoded images and browser/GPU memory. No new canvas is
created during warm rendering. Physical-device and Safari performance remain
outside the cloud Chromium checks.

Four new geometry tests verify the receiving shadow hull, actual stair heights,
closed pipe/collar meshes and unchanged pipe clearances (observed RED→GREEN). Palette choices are assessed
in matched renders rather than tested as colour constants. At nine fixed exposed
timber samples, weighted sRGB luma fell from 174.48 to 158.94 while the board sample
stayed 231.10. That is supporting evidence of separation, not an artistic score.

The baseline full suite had 1,719 passing tests on the exact retained source.
The final full suite passes all 1,723 tests. The 56 focused checks, 72 browser checks/15 delivery wins,
44 phone checks, 26 qualification checks and five coverage checks are recorded in
`verification.json`. The lighting-only full suite passed all 1,721 tests before the user requested
paper pipes. The final suite and all browser checks are repeated on the complete
pipe/material implementation. The final adjustment only strengthens pipe shade
and collar colour; all 56 focused checks, browser checks and captures follow it.
An intermediate grayscale browser click timed out during concurrent runs. The
unchanged qualification script passed all 26 checks when rerun with less browser
contention; the failed intermediate log is retained locally.

## Porting note

For the integration owner: bake the receiving-shadow hulls and swept octagonal
pipe/collar faces into immutable scene geometry. Reuse the retained brass paper
atlas and directional face shades; no extra moving-frame system is needed. The
room-owned pure geometry functions and tests are the reference for Swift/Metal.
The shared mapping table and native sources remain owned by integration.

## Ownership and publication

Changes stay in City Hall's owned files and isolated branch. The new additive
public child is `cats-by-post-cityhall-paper/light-materials/`; old previews remain
exact. A reproducible source archive and review packet precede the separate merge
approval required by the original brief. No game-source push or integration.
