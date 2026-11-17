# Stair and carton craft review

Baseline: `837a8ad`. Scope: `layout.js`, `materials.js`, `scene.js` and the new stair geometry tests. No browsers, subagents, canonical source edits or commits were used. The only repository edit by this reviewer is the subsequently authorised `tests/boxroom-paper-stair-paint.test.js` regression.

**Result: one concrete stair paint-order defect was found and corrected by the parent. The focused correction passes. No additional blocker was found in the reviewed craft diff.** Full-suite and actual Canvas/visual qualification remain with the parent.

## Finding and correction

**Important, corrected — centroid sorting paints a farther landing/well over the last visible upper tread.** The original new `scene.js:94` sorted all stair faces by average `x+y+z`. At 5×4, seed 303, Wednesday daylight, world point `[125.6,16.4,-20]` projects to `[1192.25,603.5417]` inside the actual aperture. The nearest intersecting face is `stair-tread-upper-9-top`, at ray Z −20 and average depth 127.5. The left well lies farther away at ray Z −20.6 but sorts at depth 130; the turning landing's front lies farther away at ray Z −20.4 but sorts at 131.5. Both therefore overpaint the tread. Moving the walls first alone leaves the landing defect. The initial geometry test's aperture intersection did not check this painter ordering.

The parent extracted `stairPaintOrder(layout)` at current `src/fidelity/boxroom-paper/scene.js:63`: walls first, then landing aprons, depth-sorted flight members/lines, then floor reveals. The actual clipped render calls that helper at `scene.js:102`. The aperture clip remains in place at `scene.js:101`.

The added regression tests four interior rays on the last tread at both 5×4 and 10×8. It calculates nearest geometry independently from the renderer order, requires the nearer tread to remain the last overlapping painted face, and requires every stair face to remain present exactly once. It also retains the old centroid sort as an explicit wrong-order witness.

- `stair-paint-green.txt`: both focused tests pass against the production helper (8 ray samples).
- `stair-paint-red.txt`: injecting the former centroid-only helper into a disposable Node process fails both tests with the farther `stair-turning-landing-left` as the last painted face.
- `negative-stair-order.cjs` preserves the negative-control injection; it does not modify source.
- `stair-order-review.cjs` preserves the original plane/ray repro.

## Other checks

- **Temporary ownership:** `materials.js:16` places recoloured carton canvases in the existing instance-owned `tiles` bank. `materials.js:41` shrinks every canvas and clears that bank. `scene.js:119` calls this disposal before returning the prepared scene. The returned scene owns only its retained layer canvases and disposes them at `scene.js:120`. No new steady-state frame allocation or retained carton-stock bank was introduced. Three 1536×1024 stocks do add a calculated 18 MiB of transient canvas storage during preparation, plus readback arrays; this is an explicit preparation cost, not a measured mobile peak or timing result.
- **Deterministic materials:** stock recolouring uses fixed source pixels, per-cell means and fixed arithmetic. Carton colour/face/tape variation uses the existing named hash; no simulation RNG or wall clock is consumed. Painting remains face-local.
- **Paths/shading:** tape and label drawing can replace Canvas's current path, which is not part of save/restore. The explicit face reconstruction at `materials.js:29` correctly restores the face before whole-plane shade, grade, lamp tint and final outline. Tape/labels remain clipped inside their owning carton face. The stair-well gradient uses the same face path at `materials.js:37`.
- **Cat supports:** fitted-lid cartons retain their prior full solid envelope and support identity at `layout.js:202`; the body and lid are visual subparts. The full lid top stays at the previous height. Existing slot coordinates/feet and support envelopes are unchanged.
- **Stairs/clipping:** the upper flight descends to Z −20, the turning landing connects it to the return flight, and the lower landing reaches the next Z −40 storey. Below-floor `stairs` faces remain clipped by the real aperture. The old external door assembly is removed. The new source geometry tests pass all 3 cases.
- **Scope preservation:** the only tracked production changes against `837a8ad` are these three owned fidelity files. No save, controller, simulation, picking/projection, native or accepted Office source changed in this pass.

`preservation-review.json` records a read-only comparison against `837a8ad` over all 30 sizes in day and night, fixed seed 303/date 2026-11-18. All 60 cases pass source immutability and repeat determinism, and have identical board, floor, roof, tower, full/view bounds, resident slots and carton support envelopes. This checks data invariants, not visual acceptance or every seed/date.

## Exact reviewed inputs and validation

The saved `reviewed-source/manifest.json` identifies the input snapshots. Layout and materials remain byte-identical to those reviewed snapshots:

- Layout: `d4fd072ae44be3daeb8721283f5a84a8384cc4367204a42a822aa9f07c572fb5`
- Materials: `9afb4dfef5436ddcb1a401d2cfc069bb1cb8356b6fc32c3bbf5bdf5add6ccd7a`
- Corrected scene: `7023e5ec8277dffc758202c2856215e92f7b55096a264743a151b6f06806ee44`
- New paint regression: `e85c565f97b5ec249d7762be1fd214a92cd727a2910a1370f15a82e93a55ee7f`

Executed: 3 existing new stair geometry tests; 2 focused painter tests; the deliberately failing old-order control; 60 pure-data preservation comparisons; scoped `git diff --check`. No full suite or browser run is claimed by this review.
