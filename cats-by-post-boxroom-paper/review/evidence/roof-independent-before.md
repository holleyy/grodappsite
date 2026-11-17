# Independent roof-apex review

This is a read-only audit of the pre-correction published geometry, using the pinned source in `final-lighting/snapshot`. No production file was edited. `independent-before.png` is a fresh browser render of the minimum and maximum apex from that snapshot. The owned browser was closed after capture. `independent-ray-audit.json` records calculations for all thirty board dimensions.

## What was missed

My earlier assurance that there was no remaining structural blocker was too broad and incorrect. I checked the connected roof outline, work-window clearance, storage and resident contact, but did not test depth at the roof apex. The close view plainly shows an interior collar lying over exterior slate, with a far-rafter piece forming an impossible tiled triangle. Resident grounding checks remain valid; they did not establish correct architecture occlusion. A layer-name check or a geometry test passing could not substitute for this close-up and the actual visibility equation.

## Root cause

`roofLayer()` classifies every `gable-*` surface as `roof-detail`; scene paints that layer after the roof underlay, slate and rooflights. This includes interior `gable-collar` and `gable-far-section`, despite the near roof being physically closer to the camera. The near cap/ridge and these interior members require different treatment.

There is also a false topology comment: the far exterior strip stops at local y=-55 (Y-2), while the far timber stops at y=-69. They do not share a section plane. The surface is outward-back-facing from this camera, but the current renderer still paints it.

## Exact visibility

Coordinates below are local to the board origin. The camera ray is p+t(1,1,1), t>0 toward the viewer. The ridge is at y=-53,z90; the retained near face ends at y=-14. Let k=44/(H+65), where H is the board depth in native units. Its underlay plane is z=90-k(y+53).

For a point (x,y,z), ray intersection is:

`t = [90 - k(y+53) - z] / (1+k)`

and `q=(x+t,y+t,z+t)`. The roof hides p if t>0 and q lies within the retained near sheet outside its real rooflight apertures. Slate top uses numerator +0.4. None of the cited apex rays passes through a rooflight.

At 5×4, collar centre (-55,-40,76) meets the roof at (-47.867,-32.867,83.133), 7.133 units nearer to the camera. At 10×8 it meets at (-46.013,-31.013,84.987), 8.987 units nearer. The collar must not replace these roof pixels.

The complete collar spans y=-64.136 to -11.955 for 5×4 and to +8.409 for 10×8. At z76 the near sheet hides it up to y=-14.698 / -19.109 respectively (or -15.098 / -19.509 at slate top). The remainder should remain visible below the section edge. Removing the complete collar would hide the actual bug by discarding valid structure.

The far-rafter sample (-55,-68,71.143) meets the slate-top plane at (-36.826,-49.826,89.317) in 5×4 and (-36.533,-49.533,89.610) in 10×8. These are intact slate pixels, outside the ridge-cap interval and outside rooflights; the far member must remain behind them.

The far roof's outward normal is proportional to (0,-44/35,1). Its dot with the view ray is -9/35, so its exterior slate face is back-facing for every supported board size. It must not be painted as an exterior tiled triangle.

## Contained correction recommendation

1. Classify the collar and far structural member explicitly into a pre-roof structural layer. Render them after interior wall shell but before the opaque near roof. Keep the legitimate exposed collar segment below the cut edge.
2. Distinguish the visible near verge cap and ridge cap from interior rafters. The current prisms are centred on the roof plane, so they are exterior/cut-edge trim. Relabelling them honestly avoids asserting that they sit beneath the roof deck.
3. For the far pitch, either retain geometry through farCutY and cull its back-facing exterior, or omit the invisible exterior face as a cutaway simplification. Do not leave an unmatched two-unit tiled strip. If the full hidden face is retained, exclude it from visible bounds: otherwise its rightmost corner can expand the screen bounds by about 51px despite being culled.
4. Do not globally paint all gable structure last. If a cap face is behind slate, it still needs physical visibility handling; semantic trim naming alone does not prove face depth.

For a future fully structural joint treatment, a 4.2-unit square near rafter needs its centre about 3.42 / 3.35 units below the roof plane (minimum / maximum depth) to stay below the 1.2-unit deck underside. A 4.3-unit square ridge needs about 4.08 / 3.84 units of centre drop. Collar endpoints then need recomputation against those moved member centrelines. Moving only one member would introduce a different bad joint; that is not required for the contained exterior-trim correction.

## Regression targets

- Negative controls: intact slate at the cited collar and far-rafter rays must win in both 5×4 and 10×8, day and night.
- Positive control: the 10×8 collar around local (-55,-5,76) lies below the roof section and should still be visible.
- Inspect the right ridge termination after any far-face extension/culling, and verify visible bounds did not expand because of hidden geometry.
- Recheck all thirty sizes, with close apex images for both depth extremes. Width does not change the pitch but affects the far right endpoint and rooflight spacing.

This report establishes the defect and the depth/placement contract. It does not certify the parent's subsequent implementation until that result is separately inspected.
