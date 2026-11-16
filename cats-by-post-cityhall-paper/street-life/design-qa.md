# City Hall street-life visual review

final result: passed

No actionable P0/P1/P2 finding in the approved street-life scope. The original
grand hall remains the broader artistic target, rather than a claim of finished
pixel-for-pixel concept fidelity.

Source visual truth: `docs/review-images/cityhall-paper/refinement/great-postal-vault.webp`
(1536×1024) and the previous civic-garden runtime1610cfe1. Implementation:
runtimec12fb8a00ae1f4cb44cea8eaf74926cc0578e411e2a507fe7072014668deb07e.

Actual Chromium captures in `work/cityhall-paper/street-life/` compare the same
puzzle, ambient second8, viewport and camera before/after. Desktop1440×1000 and
phone390×844,430×932 and320×568 are native1× captures; the tall phone includes
47/34px safe regions. Touch qualification separately uses DPR2 emulation.

Combined comparison inputs, captured together in Chromium and opened for review:

- `qa-concept.png` (1440×570): full selected concept and wider actual town.
  Both fit equal-width panels with preserved aspect ratio. The concept has no
  game UI and a different illustrative board state; this judges composition,
  material and civic context, not pixel equivalence or camera equality.
- `qa-detail.png` (1440×554): matching previous/updated postal corner at2.2×
  zoom, both1440×1000 captures shown at the same reduced size. Native detail
  and route captures were also opened to inspect feet, tyres, posts and overlap.
- `qa-phone.png` (844×915): before/after390×844 content at1:1, with captions.
  The board and controls remain in their accepted full-height positions.

Fidelity surfaces:

- Typography: retained Balthazar/Signika UI, hierarchy, wrapping and control
  sizes. The noticeboard's short CITY HALL heading belongs to its complete art;
  its small notices are scenery, not instructions the player must read.
- Spacing/layout: grounded postal corner beside the hall, connected neighbouring
  aprons, no kerb at internal pavement joins, clear central approach. The wide
  comparison camera includes the whole forecourt; game camera defaults are exact.
- Colour: emerald, brass, cream and leather fit the retained hall and flowers.
  Low planting remains quiet. The warmer horizon is inherited from the previous
  checkpoint, an accepted existing direction rather than a new mismatch.
- Images: full native transparent bicycle/noticeboard masters are retained.
  Measured two-contact transforms preserve verticals and align both ground feet.
  No visible clipping/halo at normal or detail view. Tyres, stand and post bases
  meet the pavement; courier poses remain grounded around the complete loop.
- Copy/content: game instructions and puzzle identities remain exact. The
  gallery describes the implemented postal corner and retains the selected
  concept as a reference, rather than presenting it as a game capture.

Primary checks: puzzle selection, actual wins, touch and keyboard placement,
phone controls/focus/rotation, motion-off, chapter transitions, complete courier
cycle, disposal and no warm canvas creation. No browser errors. All three board
raster hashes match; the largest board's four symbols remain distinct in grey.

Comparison history: the first implementation comparison found no actionable
visual defect. A wider evidence camera was then set identically on both
runtimes to include the complete square; this changed no runtime camera code.
Final evidence was regenerated and compared. The selected concept still has
denser ornamental modelling and a cooler sky; those inherited artistic
differences remain outside this focused checkpoint.

Checklist complete: source opened; combined full/detail/phone comparisons
opened; controls and route exercised; errors checked; preserved board verified.
Physical-device/Safari performance and final artistic acceptance are not claimed.
