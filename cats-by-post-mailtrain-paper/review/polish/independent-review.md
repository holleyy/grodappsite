# Independent Astra review and author corrections

15 November 2026. One fresh `gpt-6-astra` reviewer examined the phase-base
`fa367b4d` to uncommitted runtime `6575656d…` (playable SHA). It made no edits
and published nothing. Twelve focused tests passed independently; all five
canonical inputs matched the pinned hashes and original main base. No canonical,
save, timing, source-ownership or folding blocker was found.

**Important visual finding:** the new departure floor route still painted boots
across the nearer dispatch desktop and trolley handle. The reviewer reproduced
opaque worker/furniture overlap at departure frames75–110, including177 potential
occlusion pixels at80,329 at85 and41 at100. A floor-clearance test alone missed
this projection/depth issue.

**Author correction:** the dispatch desk and trolley now have two cropped,
prepared layers with the same geometry and paper lighting. They render before
or after the courier according to the courier's position relative to their near
faces. The canonical clocks and frame contract are unchanged. No per-frame
canvas or raster allocation is added. Close-up frames80/100 show the foreground
furniture correctly covering the courier's lower sprite. The permanent real
browser regression compares actual final pixels with and without the courier
inside opaque furniture masks: zero leaking pixels at all eight reviewed poses.
See `hardware.json` for the exact final build and counts. This is an author
verification of the correction, not a claimed second independent review.

**Minor evidence gap:** the tea clip covered only the final approach, tea and
watch transition. The author extended it to ambient frames900–2400, including
the complete outward and return walks, retaining the same2.4× playback label.
See `motion.json` for final frame ranges and runtime identity.

No findings from this review remain knowingly unresolved. Physical device
qualification and final artistic acceptance are not claimed by this review.
