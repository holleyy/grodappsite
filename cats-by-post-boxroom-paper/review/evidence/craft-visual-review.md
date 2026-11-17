# Craft candidate visual review

Candidate identified by parent as build `418895ff9264`. Read-only review of existing images; no browser or fresh captures, no production edits. This report evaluates the image impression separately from coordinate or automated proof.

## Result

The carton pass makes a visible improvement at normal play scale. I see no new carton, resident-grounding, roof or tower regression blocker in the supplied frames. The staircase still needs one contained legibility correction before describing its descent as clearly readable. Its entrance is more plausible after removal of the exterior door, but the steps are visually weak behind the foreground guard.

## Images inspected

- Actual candidate: `study/after-daily.png` and `study/after-night.png`.
- Details: `fourth/5x4-day-cartons.png`, `fourth/5x4-night-cartons.png`, `fourth/10x8-night-cartons.png`, `fourth/5x4-day-stair.png`, `fourth/5x4-night-stair.png`, `fourth/10x8-night-stair.png`.
- Published baseline: `/workspace/cosysortie-boxroom-paper/docs/review-images/boxroom-paper/after-daily.webp`, viewed again for this comparison.
- Reference calibration: the previously inspected actual Office image and Quay reference in `/workspace/work/boxroom-audit/references`. The Office is an actual captured implementation; the Quay image is a reference artwork. They should not be treated as identical evidence types.

## Construction and material at play scale

The fitted caps beneath the black resident and on the prominent left/right stacks now separate into lid and body. Their darker narrow joints and thin protruding lips read without relying on a zoomed crop. The top planes still appear to support the cats; no new hover gap is visible in either actual game frame.

Tape now bends from the top down the front of selected rear cartons, which communicates sealed parcels more directly than the baseline's top-only strips. Cream labels on the front-left and stair-facing stacks are recognisable postal-paper shapes at fit. The restrained buff/brown differences break the bank into individual cartons while keeping it one material palette. The previous broad orange sameness is reduced.

The new grain is more conspicuous in the enlarged day detail, especially on pale front faces. It is somewhat speckled there, but at the actual play scale it remains subordinate to the lids, tape and labels; I do not see a normal-scale texture regression requiring another general material adjustment. Do not intensify this grain further. The construction differences are doing the useful work.

The night frame preserves the distinction between warm bench-side cartons and cool unlit stacks. The new lid seams and labels survive the darker treatment. No global halo, lifted night roof or misplaced bright face is visible in the supplied views. This is a local visual assessment, not a claim of identical fidelity to the generated references.

## Stair impression and one correction target

The impossible wall door is gone. The enlarged stair crop shows a real entrance gap at the left end of the guard, a recessed shaft and woodwork descending inside it. The entrance does not need widening. However, in the actual Daily/Night fit the broad blue shaft face dominates, and the tread strips merge with the near guard. The first reading is still a fenced recess; the stair reading takes close inspection. This is weakest at night.

**Correction target: the first three tread nosings immediately inside the entrance.** Give the visible tread tops a lighter warm oak value and a slightly stronger thin nosing, while retaining shaded risers and a darker shaft behind them. Keep the landing continuous with the room floor. The parent proposes `#c6a06d` rather than the default `#a87640`, and approximately 0.20–0.25 world-unit nosing strokes rather than 0.16; that is a suitably contained direction to render and judge.

The near return guard and inner descending balusters currently overlap into a dense comb of equally bright edges. Keep the outer guard and newels legible, but make the inner descending balusters slightly darker so the tread sequence can establish depth. A capped newel on the actual turn landing should give the diagonal handrail a clear physical endpoint. Do not relocate the run, lower the guard or make steps artificially fill the shaft to defeat true foreshortening.

The parent separately reports a painter-order issue in which a large shaft wall overpaints a deep tread and plans to render walls first, steps in depth order and reveals last. I have not independently established that cause from coordinates or source in this review. The crop is consistent with weak tread visibility; the new render is needed to determine whether the reported ordering correction and local values solve it.

## Scope limits

The actual frames show grounded visible residents and an unchanged-looking accepted roof/tower composition. I did not run slot invariance, silhouette clearance, staircase collision, all-board geometry or tower-continuation tests. Existing images cannot establish those properties. Likewise, a successful coordinate proof does not establish that a player can immediately recognise the staircase in the normal frame.

Recommendation from the current images: retain the carton pass, make the contained stair correction, then compare the same normal-scale Daily/Night views. No broader material or roof change is called for by this review.

## Targeted follow-up — frozen build `b2e06d02d47b`

Inspected only the requested final stair evidence: `qualified-close/5x4-day-stair.png`, `qualified-close/10x8-night-stair.png`, and the actual `qualified-study/after-daily.png` / `after-night.png`. No new browser, captures, source audit or whole-branch review.

The agreed localized improvement is visible. The close day view now retains a sequence of warm tread tops/nosings behind the near guard instead of letting them merge into the shaft. The darker shaft separates those strips better, and the diagonal descending handrail visibly terminates on the capped newel at the turn. The corresponding night crop preserves the sequence at a subdued value rather than making it unnaturally luminous.

At the actual Daily fit, the warm stepped strip is easier to distinguish beneath the guard. The actual Night improvement is modest because this remains a small unlit corner, but examining that corner now reveals a descending run within the recessed opening. The broad blue shaft and foreground guard still occupy more of the silhouette than the foreshortened treads; the correction improves the depth cue rather than turning the stairs into a prominent feature. I do not recommend another relocation or guard reduction from these images.

This satisfies the specific follow-up request for a visible tread/shaft/handrail legibility improvement. It is not a claim that every step is exposed at normal fit or that the coordinate/ray tests independently prove the visual result. I have not re-run those tests or verified the parent-reported painter-order mechanism; the conclusion here comes from the four final images listed above.
