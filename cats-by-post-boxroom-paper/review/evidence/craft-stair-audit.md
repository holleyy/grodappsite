# Stair audit — baseline 2e79b697b807

Read-only production audit of `src/fidelity/boxroom-paper/layout.js:156–163` and `scene.js:90–93`. Coordinates below are local native units; add `board.x/y`. W means `board.w * 16`. Roof, tower footprint, board and resident contacts remain fixed.

## Current defects

The opening is x=W−6..W+11, y=−45..−18, only 17×27 units. Eight treads descend **towards** the room (+Y), with run 3.375 and rise 1.7, ending at z−13.6. This is a shallow partial flight against a 40-unit storey.

The nominal upper landing lies at y−51..−45, z0, behind the aperture beside the exterior rear wall. The nominal lower landing lies at y−18..−13, z−13.6. Every `stairs` surface is clipped to the floor opening in scene.js. Consequently the upper landing is wholly outside the clip; the lower landing projects onto y−4.4..0.6 at z0 and is also wholly clipped. Neither nominal landing supplies the visual connection its name promises.

The teal door is on the **exterior rear wall**, y=Y+2.3≈−50.7, at attic floor height. It has no stair destination or exterior landing, so it reads as opening into the sky. Delete the complete assembly: `door-frame`, `teal-door`, `door-board` lines and `door-latch` detail.

The two long horizontal guards do not explain a descending handrail. Their beams use post lower-left coordinates rather than centred joints; spindle tops stop at z14 while the rail underside is about z14.3, leaving a small gap. There is no return guard across the lower end of the opening. These should be constructed from common post/rail joint coordinates, not shifted independently.

## Accepted coherent replacement

Use a compact U stair inside x=W−11..W+11, y−50..−10 (22×40). The approach is from the open room at y>−10. Divide it into two 10-unit lanes with a 2-unit central gap. This provides a believable 33.7° stair pitch (rise2/run3), a turning landing as deep as a flight is wide, and a full 40-unit storey descent.

| Element | Native local geometry |
| --- | --- |
| Upper flight | x=W−11..W−1; ten treads running rearwards. Tread i spans y=−13−3i..−10−3i at z=−2(i+1). |
| Turning landing | x=W−11..W+11, y−50..−40, z−20. |
| Return flight | x=W+1..W+11; ten treads running forwards. Tread i spans y=−40+3i..−37+3i at z=−22−2i. |
| Lower landing | x=W+1..W+11, y−10..0, z−40, continuing into the first tower storey. |
| Upper approach | Existing floor immediately in front of y−10. Keep the upper-left lane open; guard the front of the lower-right lane. |

The first upper tread is naturally partly hidden by the floor lip. The next treads remain broadly visible; later treads taper behind the right edge. The turning landing has a small genuine glimpse, while the return flight/lower landing are naturally hidden. Keep below-floor geometry clipped to the actual opening; never pull it over the exterior masonry to make every step visible.

## Bearing and clearance

- The back sill ends at y−51, leaving a 1-unit floor strip before the opening at y−50.
- The right rear roof support occupies y−53..−50. It touches the aperture boundary without losing any bearing area. Rear stair newels should occupy y−50..−48.4, rather than straddle y−50.
- For all board widths 5..10, the opening stays at least 2 units beyond the last rear stored carton and 5 units beyond the nearest fixed front terrace in the minimum room. The lower flights occupy the empty storey volume below these upper-floor objects.
- The opening ends at y−10, preserving the 8-unit projected board/mechanism margin. All below-floor parts must retain `clip:'stair-opening'`.
- Suggested outside guard post footprints: left x=W−12.6..W−11, right x=W+11..W+12.6; rear y−50..−48.4, front y−10..−8.4. These stay inside the floor x≤W+13 and outside the opening. Connect rail centres to post centres. A front central newel at x=W−0.8..W+0.8, y−10..−8.4 can carry the short guard across the return lane without closing the upper entrance.
- A rail centre z14.4 with depth1.4 has underside z13.7; spindle tops should meet that level. A descending inner handrail may follow the upper nosings to z−5.6 at the turning landing, supported by posts on actual tread/landing surfaces. Split or clip its below-floor part correctly.

The parent owns implementation. The separately authorised test file `tests/boxroom-paper-stairs.test.js` will assert actual surfaces and clearance, not a new metadata declaration. No production files were edited for this audit.

## Independent implementation check

The new `tests/boxroom-paper-stairs.test.js` has three tests. All three fail against the prior committed layout (`stairs-baseline-red.txt`) and pass against the implemented U stair (`stairs-green.txt`). They cover all 30 sizes, actual tread/landing corners, a full 40-unit descent, removal of the complete exterior door, upper-floor bearing of every stair newel, structural/carton clearance and aperture visibility. The first concurrent run was already green because the parent implementation landed before the test completed; `stairs-red.txt` is that historical green run, not RED evidence.

Runtime-only rendering compared insertion order with the current stair depth sort, keeping geometry/guards identical: `stair-source.png` and `stair-sorted.png`. Browser closed after capture. Two final recommendations were sent to the parent:

1. Paint the stairwell enclosure first, then depth-sort flight/landing pieces, then paint floor-thickness reveals. A single centroid sort across the tall left wall and small treads is not sufficient: at the minimum size the left-wall centroid depth is 18, while the deepest upper tread is 15.5. The wall is physically behind that tread but is painted over it. This accounts for lost deep-tread detail in the sorted capture.
2. The final thin handrail baluster is correctly grounded but its bottom lies outside the aperture's projected view. Only about its upper 4.3 units are visible, which makes the rail end read as cut off in the fourth close-up. A capped newel wholly on the real turning landing would clarify the termination: x=W−2.1..W−0.5, y−41.6..−40, z−20..−7. Continue the same 2/3 rail slope to its centre y−40.8, rail z≈−8.267, and replace the last thin baluster. Do not force its naturally hidden base over the floor.

The empty rear portion of the well is partly genuine perspective: each upper step changes Y by−3 and Z by−2, so its aperture-plane projection changes Y by only−1. The ten steps therefore occupy roughly the front 12 units of the 40-unit opening. Sorting/detail can clarify them but should not relocate them to fill the void.
