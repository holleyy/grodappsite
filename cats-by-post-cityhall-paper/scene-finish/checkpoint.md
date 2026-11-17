# City Hall — architecture and square finish

17 November 2026. Continues the published light/material checkpoint at source
`f8e7af2c`, runtime `9c54a0ca6b8ed9523ea150d6d148ebdc0d57a10cddccf8619f9b8927175e33f9`.
Canonical main remains `923b40d7c3ef2b9e4fab49d290267f0094a1a9bb`.

## Result

Painted card now has a green cut edge, timber a warm wooden edge, and stone its
selected ivory edge. Previously every small box carried a cream highlight, making
piers and rails look outlined. Main handrails/newels, clock and pipes retain brass;
secondary baluster collars, fascia studs and capital dentils become painted green.
Quieter fluting and brackets let the major columns and vault read as larger forms.

Stepped window reveals receive deeper inner shade and a restrained sharp arris.
Staggered stone courses, gallery/counter undercuts and narrower stair highlights
make the existing layered construction clearer without changing its dimensions.

Paving colours no longer follow a repeating diagonal sequence. Narrower tone
ranges, staggered footway courses and softer joints keep the connected civic square
quieter at phone scale. The small-sett texture wraps its coordinate hash at the
existing tile periods, retaining the infinite background's edge continuity.

Planting beds, tree roots and furniture have tighter contact with their receiving
surfaces. A review correction classifies the raised footways/entrance walks at -12
and lower square at -14, rather than using the lower street for every contact.
The new regression uses actual planter, bench, walk and street coordinates.

## User correction — short gallery rail

The user identified the small rail crossing the inner gallery corner. Its complete
run (x1..29 at y23) lay over supported left gallery or stair landing, not a drop.
Removed that obsolete rail helper/call. Actual stair, landing and gallery-edge
rails remain. The stair solids, walking routes and board projection are retained.

## User correction — rail ends and paper finials

Removed the duplicate legacy stair rails/stringers and both unsupported top
handrail tails. The finished stair rails end at their newels. The decorative
rear gallery beam starts at the landing edge (x49), and the left gallery rail
ends at its final post (y190). Stone gallery, landing and treads remain exact.

All 18 rail finials now use a shared closed world-space paper volume. A narrow
neck sits on the post cap; folded shoulders receive retained gold-paper texture
and directional matte shading. No thick outline or new image asset is used.
The final close-up and normal architecture view confirm the loose stubs are gone.

Independent Astra follow-up approves this correction: closed finite deterministic
finials seated on every cap, byte-identical pipe geometry/paint, 11 targeted
structural/pipe tests passing, and no other loose endpoints in the affected rails.

## User correction — stair/gallery depth

The prior review missed the farther left gallery rail covering the nearer stair
rail. The user identified it in the close-up. The stair geometry remains in its
existing architecture layer; the same geometry now cuts only its own silhouette
out of the later gallery layer. This restores the near stair without moving it
in front of the nearer floor worker. No actors, dimensions, bakes or canvases move.

The actual baked-pixel regression reproduces the old obstruction and checks the
new crossing, an adjacent intact gallery post, a floor-worker route marker in
front of the stair, and a gallery-worker route marker behind the gallery. Ordinary
captures retain the real Black worker artwork and show the complete composition.

A separate phone-test timing issue was diagnosed with instrumented pointer events:
the old fixed 150 ms delay sometimes measured camera ty257.61 before the queue
resize finished, but the tap arrived after ty304.61. The qualification tool now
waits for measured queue insets and camera to agree. Three instrumented repetitions
then hit the intended cell/partner with stable coordinates. No UI code changed.

## Assessment beside the references

Compared normal hall, wide square, architectural and sparse phone captures with
the implemented Town Depot and approved Sorting Office. The repeated bright dots
and exterior grid attract less attention; the grand hall keeps its main gold
accents and clear ivory playing area. Contacts improve construction without adding
more props. This is a cleaner, more coherent finish, not a claim of complete
artistic parity. Broad light/depth grouping and consistent material softness remain
useful whole-scene review criteria; avoid responding with indiscriminate detail.

Reference captures are retained checkpoints: Town Depot from the Black-worker
publication, Sorting Office from its approved cat-scale review. They are comparison
material, not changes to either room or the other chat's ongoing Office work.

## Verification and preservation

Baseline: the immediately preceding full suite passed 1,723 tests; fresh baseline
room tests pass 56. The added receiving-plane regression was observed RED→GREEN.
Final runtime: `2c5396e4c60d1e3c59ef49600d1d35aade439a4e293bcaa2b575e57585ff0f26` (28015357 bytes).
Final full suite: 1,724 passed; focused room regressions: 57 passed.
All 15 deliveries win; 72 browser, 26 qualification, 44 phone, five coverage and
six depth checks pass. Nine review-page checks pass on the exact packaged HTML,
runtime and image bytes. Final receipts are in verification.json. The final full suite
was restarted after the user's final rail/finial correction;
intermediate stopped runs are not counted as passing evidence.

Checked all 15 deliveries, largest-board grayscale, sparse phone controls/DPR2,
resize, progress, offline loading, disposal and warm resource use. Compared the
three board rasters, all 209 retained assets/registration records, room layout/routes,
pipe geometry and pipe renderer, and 195 protected source/export files exactly.
All changes prepare in existing scenery bakes; no new per-frame canvas or layer.
Cloud Chromium/emulation does not qualify physical devices or Safari performance.

## Delivery

Room-owned source and evidence only. New additive review child:
`cats-by-post-cityhall-paper/scene-finish/`. Provide native-size comparisons, a
reproducible source archive and an independent Astra review. Existing public
previews are preserved. Merge/publication requires explicit approval for the new
PR, as specified in the original brief. No game-source push or shared/native work.

For the later native port, the same retained solids, paper-edge shades and baked
contact polygons map to immutable scene geometry; no new animation system is needed.
