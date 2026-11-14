# Town Depot · finished corner review

Alex accepted the structural correction and approved finishing the loft, sorting
cubbies and loading bay before extending the treatment across the room. This
checkpoint implements that material reference in the playable renderer.

## What changed

The corner uses face-mapped matte paper stock, layered cut edges, warmer timber,
cooler painted ironwork and deeper cabinet recesses. Parcels vary in kraft stock
and carry folded seams, tape or crossed twine, labels and postal marks. Letter
bundles and shelf labels make the cabinet read as a working sorting place.
Loft boards, stair treads, structural fasteners and the doorway receive the same
finish. A shaded brick field, loft lamp and receiver-plane shadows establish
stronger light and contact. The collections notice belongs to the rear wall.

The finish is baked into the existing static architecture layers. It introduces
no new runtime dependency or per-frame drawing work. The physical layout,
projection, board caches, moving worker routes and canonical clocks remain exact
against the accepted structural checkpoint `9916d892`.

## Evidence

The gallery contains actual renderer captures of the corner, loading bay and
maximum 7×5 room, with matched before views from the published structural runtime
`91c772f`. Both use the same camera, board and ambient time. It also shows the
first 5×4 delivery, the renderer's grayscale mode and the phone board layout.
The chosen illustrated composition and implemented Office are labelled as
references, separately from the actual Depot evidence.

42 focused tests pass. Actual Chromium checks record all 25 original solutions
winning, 721 cell picks, four pixel-identical board caches, correct near-rail
order and stable scenery/board caches. Trusted interaction checks cover planning
reload, preservation of the production save sentinel, send/stop, chapter/demo
isolation, growth and exit, blur pause, reduced motion, drag and zoom. The phone
layout retains all 12 finale queue cats and reachable controls without overflow.
Full-suite and independent review results are recorded in CORNER-REVIEW.md.

The owned-source/canonical/Office verifier passes. The exact geometry, projection
and 11 frozen behavior modules are recorded in evidence/preservation.json in the
published packet. Canonical content/rules, progress formats, existing saves,
Office, other rooms, shared outputs and native code remain untouched.

## Remaining work

This is a corner finish checkpoint, awaiting Alex's visual review. It does not
claim that the whole room matches the Office or Lantern Quay. The left wall,
window reveals, counter, exterior scenery and pavement furnishings need the
same construction and material attention. Overall dawn atmosphere remains to
be developed across the room. Character articulation, handoffs and the moving
van routine are still later work; their existing limitations remain visible.
The growth-scene capture also exposes an existing driver/frame occlusion at the
front of the enlarged board. That chapter staging needs correction in the
acting pass; these checks establish state/timing preservation, not visual
approval of that movement.

Phone evidence uses Chromium emulation, not physical Safari. Sustained device
performance and final integration are not qualified here. The study retains
its isolated save namespace. No game branch push or merge is authorised.

## Reproduce

- `python3 studies/depot-paper/build.py`
- `node --test tests/depot-paper-*.test.js`
- Serve this worktree on 8765. Serve the retained structural packet on 8770,
  then run `node studies/depot-paper/capture-corner.cjs`.
- `node studies/depot-paper/check-corner-interactions.cjs`
- `python3 studies/depot-paper/verify-ownership.py`
- `python3 studies/depot-paper/package-corner.py <destination>`

Original main base: `8a3c8827`. Corner base: `9916d892`. Source ownership remains
`src/fidelity/depot-paper/`, `studies/depot-paper/`,
`tests/depot-paper-*.test.js` and `docs/review-images/depot-paper/`.
The authorised review lives in a new `cats-by-post-depot-paper/corner/` child;
all earlier publications stay intact. Exact publication/deployment evidence
is appended to PUBLICATION.md after deployment.
