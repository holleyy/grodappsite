# Carton craft audit

Read-only review of the published `docs/review-images/boxroom-paper/after-daily.webp` and `residents.webp`, with `approved-office.jpg` and `lantern-quay-port.webp` as references. No source edits. Scope is the existing carton banks; roof, stack footprints and resident support coordinates stay fixed.

The present boxes have adequate grain and contact separation. Their remaining sameness comes mainly from every closed carton having the same perfect cuboid construction, a flat top and a narrow bright perimeter. The references communicate paper craft through distinct assembled parts, exposed cut thickness and purposeful colour blocks. More noise over every face will not produce that result. These five contained targets should be visible at the published play scale.

## 1. Give selected support cartons a fitted-lid construction

**Type: actual geometry, with a local seam shadow. Highest construction priority.**

Start with the pale cap under the black resident (`resident-cap-3`, beside the green chair), the front-left cap (`terrace-cap-5`) and the front-right cap (`terrace-cap-3`, beside the stair bank). They occupy clear, substantial silhouettes in the Daily image. All currently look like solid slabs with identical edge treatment.

Keep each top plane, its bounds and resident feet exactly where they are. Form a shallow lid lip about 0.7–1.0 world units below that plane, with the box body inset about 0.2–0.3 units under the lip. Fit both within the existing outer envelope. A narrow dark seam below the lip and a lighter exposed cut edge should distinguish lid from body. Do this on a few caps, leaving others as taped shipping cartons; applying it everywhere would replace one repeated construction with another.

At normal scale the result should read as **lid plus body**, without needing to zoom in to find extra scoring. Avoid a large new overhang, moving the support surface, or drawing a seam straight through a blanket.

## 2. Wrap sealing tape across the top/front fold

**Type: face-local albedo or thin decal surfaces; no new solid volume needed.**

The broad pale tape on tall cartons in the rear bank currently stops at the top edge. In `carton()`, only cartons with `h < 5` receive the corresponding front strip. That makes the tall boxes appear painted on top instead of sealed.

Use three to five clearly exposed boxes: two top cartons in the rear bank below the ridge and one middle carton in the stair-facing bank are good initial targets. Continue the same tape width and centreline across the top/front fold, ending about one third to one half down the front. A slightly oblique or torn lower end can be albedo; it does not need a floating curled polygon. Use warm translucent packing-paper tape on some and the existing lighter repair tape on others. Retain the underlying fold shadow at the bend.

At normal scale this creates a clear connected strip, approximately 5–9 screen pixels wide in the published image. Do not tape every visible box or add extra cross-strips to boxes already carrying the prominent X repair.

## 3. Use a few postal labels as deliberate visual accents

**Type: albedo/decals; a very small paper-edge shadow is enough.**

On the front-left lower stack (`terrace-5-base` or `terrace-5-upper`) and the front-right stair-facing stack (`terrace-3-base` or `terrace-3-upper`), replace one faint generic rubbed patch with a single cream address-label shape, around 5–7 by 2.5–3.5 world units. Give it two dark address strokes and a small muted red or teal postmark. The shape should read at fit; the text need not be legible. An offset second old label can occur on one box, not on every box.

The Office reference uses small but clear pale label rectangles to communicate parcels at a distance. The current Loft atlas has labels and scuffs, but many dissolve into similarly coloured wear. Make the few chosen labels stronger and quieter around them rather than adding more marks. Avoid duplicating a new label directly over an existing conspicuous atlas label.

## 4. Choose a coherent material family per whole carton

**Type: albedo/material mapping.**

The rear bank and stair-facing bank have many boxes whose front, side and top blend into the same honey colour. Introduce three restrained families—pale buff, ordinary kraft and older muted brown—distributed by stable carton identity. The family should apply to the whole carton, with face lighting providing the side-to-side value changes. An 8–12% lightness spread is enough; this should remain one paper-material palette.

Current source selects atlas cells independently for the two vertical faces, while the intended carton colour is only a 14% overlay over each full-colour cell. Consequently increasing the base colour variation alone may barely change the visible result, and the wear colour on adjoining faces can disagree. Select paired, compatible atlas appearances from a shared box key or apply a restrained shared colour correction in face UV space. Keep distinct face lighting and grain rather than washing everything with an opaque tint. Top faces should belong to the same family.

At normal scale the bank should separate into recognisable reused cartons before the viewer notices individual scratches. Preserve the established darker contact seams; extra global edge darkening is not required.

## 5. Give existing open-bed flap cuts a thin physical edge

**Type: actual geometry for cut thickness; albedo/short strokes for corrugation.**

The existing folded front flaps of `resident-bed-1` and `resident-bed-5` are visible in both the Daily view and resident sheet. Their fold angles already do useful work, but their outer cut edges read as single planes. Add a thin exposed edge, around 0.2–0.3 world units, inside the present flap envelope: pale liner, darker core and a few sparse fibre/corrugation marks. Make the hinge contact slightly darker only where the flap meets the rim.

Keep the current flap top plane, outer extents, rim heights, bed lining and resident feet unchanged. Do not add new raised flaps around the cats. The useful visible change is a continuous thin cut thickness and folded connection. The existing dense subpixel corrugation strokes are a close-view detail, not a substitute for the edge face; avoid enlarging them into a decorative sawtooth.

## Check the result at the intended scale

Compare the same Daily fit and the resident day/night sheet before and after. The first glance should reveal several carton constructions and purposeful parcel markings while the cats still sit on the same planes. A close crop can establish whether a fold is modelled correctly, but should not be the sole evidence that the pass improved the room. Keep all five treatments sparse and deterministic; the strongest benefit comes from variety within the existing banks, not a new detail repeated on every carton.

This is a targeted craft pass authorised after the previous structural review. It does not imply the prior topology/grounding checks proved carton craftsmanship, or that a new material pass should disturb those contacts.
