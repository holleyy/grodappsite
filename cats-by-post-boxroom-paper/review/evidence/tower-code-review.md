# Parent implementation review

Reviewed the frozen `boxroom-paper-cdeecf69437f` source inputs for `scene.js`, `renderer.js` and `materials.js`, plus the renderer tests. Their current SHA-256 values match the frozen build manifest. Production source was reviewed read-only. After the parent requested a portable regression probe, the sole repository edit was the new `tower-continuation.cjs` QA tool; scratch diagnostics and this report were also written.

## Finding resolved and verified

**P2 — fractional tower-repeat joins can leave a transparent horizontal pixel row.** In `src/fidelity/boxroom-paper/renderer.js:20`, adjacent strips are drawn at fractional transformed positions without sampling bleed. The independent real Chromium Canvas probe reproduces a completely transparent row inside the tower at scene scale 0.25: with the tail start translated to -100 screen pixels, row 612 has alpha 0 across all ten central sampled pixels. It lies at the 612.5-pixel repeat join. The viewer will see the backdrop as a horizontal hairline through otherwise opaque masonry. This can recur as zoom/pan changes the fractional strip boundaries.

The parent corrected the draw by rounding each strip destination outward to device-pixel boundaries, introducing at most one pixel of overlap while retaining the physical repeat period. The fixed renderer hash is `f7b555d260ea88ffdaffd83c2b2e6fdf175ae910ee49f95530e7ca8ec320618c`.

The probe is now a portable repository tool: `studies/boxroom-paper/tools/qa/tower-continuation.cjs`. It injects current sources into real Chromium Canvas and uses canonical `BR.build` fixtures, without a scratch page/server. It tests minimum/maximum day/night at preparation density 1.25, DPR 1 and 2, four fractional scales, and three pan offsets. Both main-to-tail and tail-to-tail joins are sampled. Removing the tail is an explicit visible-failure control.

- Preserved exact old renderer: `continuation-red-source/renderer.js`, SHA matching the reviewed cdeecf69437f input.
- RED: `continuation-red/tower-continuation.json`, 20 failing views out of 96, including fully transparent rows at both kinds of join.
- GREEN: `continuation-green/tower-continuation.json`, all 96 views pass with minimum interior alpha **255**. All 96 finite-without-tail controls fail visibly. Source hashes remained stable; browser errors were empty.
- Every cache allocation stayed within viewport dimensions; unchanged views reused the cache and disposal cleared byte accounting.

No unresolved correctness finding remains in this scoped review. The fixed source requires its own final build identity; the earlier cdeecf69437f build contains the reproduced defect.

## Checks without additional findings

- `renderer.js:61` publishes `viewBounds` for camera fitting and retains full `scene.bounds`. The new renderer test checks both, avoiding board shrinkage to fit the authored tower depth.
- `scene.js:65–67,106–110` creates one bounded architecture raster plus a fixed 120-world-unit continuation strip. The sample begins below the front floor corner, where both visible faces extend across the whole width, and the authored -330 depth covers the sampled span.
- `renderer.js:12–25` restricts each scenery cache canvas to the viewport, starts at the first visible repeat under negative pan, and continues to the viewport bottom. Stationary views reuse their cache; `clear` and scene disposal release all backing canvases. No per-frame tower-height canvas growth was found.
- `materials.js:8` makes face-local material phases periodic with the three-storey repeat. Layout colour/light hashes also repeat at 120 units. Local facade glazing in `scene.js:72–86` avoids sampling a finite panorama midway through lower panes, and warm light remains clipped behind the reveal/sash.
- An independent long-raster comparison checked matching facade regions 120 world units apart for minimum day and maximum night at the actual 1.25 preparation density. Mean RGB difference was approximately 1.5/255; no sample exceeded 30/255. This supports consistent local albedo/glazing with small fractional-raster differences. Evidence: `parent-review/raster-period.json` and its reproducible script.

The pixel checks cover representative min/max cases, not physical Safari or total process memory. The parent full suite, camera fixtures and independent roof-depth checks remain separate qualification evidence. All review browser instances were closed in `finally` blocks.
