# Independent Astra review and author correction

One read-only GPT-6 Astra/high review inspected runtime `7010ee2e…` against
phase base `f2173ec3`. The reviewer read the mesh/lifecycle, reproduced the
builder, passed the original 46 room tests and inspected stills and sampled
motion frames. No second independent review is claimed after author fixes.

Strengths confirmed: full-width soffits and reveals resolve against the far
facade; raised stones/ledge add depth; motion-compensated wrap comparisons
at scales 19.3, 35 and 79.7 had zero differing pixels; 1,089 board samples,
121 picks/cameras were unchanged; no live/entry mesh rebakes. Additional
DPR3 phone checks at 1.7× zoom retained 20 surfaces and zero motion/pan rebakes.

## Findings

- **Important:** foot=-6.7 leaves broad exposed pier bottoms above distant tree
  crowns and the upper bank. Extend connected pier/reveal/footing geometry
  behind the original foreground or below the crop. See review-suspended-piers.jpg.
- **Minor as graded by reviewer:** an unconditional 18-row mortar loop emits
  six detached quads below the footing, at -6.74, -7.20 and -7.66.

## Author correction

Grounding is fixed by connected tall piers descending to -66.52, below the
review composition. Their longer side faces required broader openings to keep
the river visible: final spans are 12 units with a 9.92-unit opening and a
3.1-unit rise. The original travel speed remains frame/30; decorative repeat
is now six seconds. This is an authored proportion choice, not a gameplay change.

The detached joints were regraded as an acceptance defect: they visibly mark
the preserved river with unsupported geometry. Joint/course counts now derive
from the actual masonry bounds. The explicit test failed with z=-6.74 below
the old footing and passes after the correction.

The grounding regression uses depth-tested diagnostic footing-edge material,
then the real foreground and nearer geometry. Reinstating short piers fails;
final first/largest views have zero exposed footing pixels at all 78 sampled
portrait/landscape/desktop states across a full repeat. Initial screen-space markers were discarded
because they could incorrectly draw a far edge over its own nearer stone.

The bridge bake is capped at 64 raster pixels per world unit. Entry transforms
reuse the prepared image, and the long hidden foundations cannot force an
unbounded high-zoom raster. Final browser evidence records the cap and resources.

## Declined to judge and rulings

- Physical device performance, sustained memory and real-time smoothness:
  remain unqualified; sampled clips and cloud probes are not device claims.
- Final package identity and provider deployment: verified separately by the
  author and recorded in browser.json, gallery-check.json and deployment.json.
- Source-main integration/merge readiness: outside this room-owned study;
  remains with the integration owner. No merge is authorised.

No deferred minor remains from this review. The final author regression pass
does not constitute a second independent visual acceptance.

Final author portrait check: the initial -26.2 grounding fix passed the desktop
probe but its phone screenshot still exposed a pier base. The test now uses
actual DPR and all three viewport shapes; the old build fails with 448 exposed
phone pixels and 3 landscape pixels. The final -66.52 geometry passes all 78
states. The cap is reduced from 96 to 64 pixels per world unit so extending
hidden foundations does not increase the maximum raster area substantially.
See portrait-grounding-red.json and grounding.json. No re-review is claimed.
