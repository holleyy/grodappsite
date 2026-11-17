# Independent Astra review — architecture and square finish

17 November 2026. Reviewer: `astra_light_materials_review`, GPT-6 Astra.
One fresh whole-change review, followed by targeted verification of its correction
and the user's redundant-rail removal. The reviewer did not edit source.

Final runtime reviewed:
`2c5396e4c60d1e3c59ef49600d1d35aade439a4e293bcaa2b575e57585ff0f26`.
The preceding whole-change build `c6fabdc1374dfb7788c468f04328b2a695a429418a0c5150cdf66aca3690fdcd`
was independently reproduced; the final rail/finial follow-up used fresh parent
captures, source inspection and targeted geometry/structural checks.

## Verdict

Approved. No outstanding Critical, Important or Minor findings.

One Minor was corrected: new footing shadows used the lower square receiver
at -14 even when placed on raised paving at -12. Actual receiving-plane
classification now selects the appropriate geometry. A focused regression uses
real planter, bench, footway, entrance-walk and street locations. Final foreground
captures show restrained contact without detached shadows or heavy accumulation.

The removed short rail crossed supported gallery/landing floor; true gallery and
stair-edge rails remain. Approved folded pipe geometry and paint are unchanged.

## Evidence inspected

- All nine changed scenery modules, the new contact regression and final build.
- Matched whole hall, square, architecture, foreground, phone and grayscale views.
- Retained Town Depot and Sorting Office reference captures.
- 19 independently run relevant tests before the correction; nine affected tests
  after it. A read-only rebuild reproduced the final runtime exactly.
- Live intermediate Chromium inspection: no page errors, 55 buffers, 13 bakes,
  and no new canvas creation in the warm loop. Final browser/resource receipts
  are recorded separately by the integration checks.
- Correct texture repetition periods and unchanged protected/other-room paths.

## Visual judgement

Fewer bright gold dots make the green structure read continuously. Paving is
quieter, the ivory board remains the focus, and stone/stair depth is clearer.
This is a meaningful improvement at normal game and phone sizes.

The whole scene is cleaner and more coherent, but its broad lighting/depth
grouping and consistency of material softness still fall short of the strongest
parts of the references. More decorative props are not the answer to that gap.

## Further user correction — rail ends and finials

Targeted follow-up approved the final runtime above. The fresh six-times close-up
and normal architecture capture show the loose landing stubs removed, stair rails
ending at their newels and the left gallery rail ending at its final post. All 18
finials are seated on the post caps, with closed, finite, deterministic geometry.
The small paper forms have shaded faces and no thick circular outlines.

Eleven independently run pipe/structural tests and the whitespace check passed.
Pipe geometry and paint remain byte-identical to f8e7af2c. No additional duplicate
loose endpoints were found in the affected rail code. The original whole-change
approval stands with no new findings. The reviewer made no source edits.

## Depth correction after the user's review

The prior reviewer approval missed the farther gallery rail covering the nearer
stair rail; the user identified it. The final close-up now shows the continuous
near stair rail in front of the farther gallery post/lower rail, without visible
mask fringes. Targeted follow-up approves the final runtime above.

Independent browser checks found 322 changed foreground pixels, all inside the
exact stair silhouette. No pixels outside that silhouette changed and no new
opacity was introduced. Conservative gallery-worker sprite rectangles sampled
across both complete routes do not intersect the new mask. Actor, motion and
renderer source remain unchanged. The parent depth receipt also passes the real
crossing and actor-order markers. No additional defect was found. The reviewer
did not independently rerun the phone qualifier.
