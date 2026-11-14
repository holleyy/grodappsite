# Town Depot · first structural correction

This is the first deliverable from FIDELITY-REASSESSMENT.md: corrected room
geometry around the exact existing maximum board. It awaits Alex's visual
review. It does not claim the final Lantern Quay/Office material or acting bar.

The compact loft now has a continuous walking strip, supported parcel stacks,
notched deck panels beside the rear columns, a side rail opening and a ladder
whose last tread meets the deck. Front rails draw after the contents. Cabinet
bays draw in physical order. Separately composed supports are masked behind the
deck and ordered around the worker. The rear wall moves back, preserving every
board origin and portal apron. A level threshold opens onto a real rear yard,
with a side ramp down to the pavement. The retained static van has explicit
source tyre anchors and attached contact shadows.

The worker's floor route is spatially registered to the new service aisle; the
canonical 48-second routine and all game clocks remain unchanged. This does not
complete the later grip/release, character-art or moving-van fidelity work.

41 focused tests pass, including volume separation, supported stacks, ladder
connection, clear loft access, all board aprons, loading/ramp height continuity
and every frame of the worker's floor route. Actual Chromium checks record all
25 original solutions winning, 721 cell picks, the four original board sizes,
front-rail drawing order, stable caches and no page errors. Phone emulation
retains all 12 finale queue cats and reachable controls. Physical Safari and
sustained device performance are not qualified by these checks.

One independent read-only structural review found no Critical/Important issue;
see STRUCTURE-REVIEW.md for its exact coverage and subsequent author adjustment.
The broader original material, light, atmosphere and acting gaps remain open.

## Reproduce

- `python3 studies/depot-paper/build.py`
- `node --test tests/depot-paper-*.test.js`
- Serve the source root on port 8765, then run
  `node studies/depot-paper/capture-structure.cjs`.
- `node studies/depot-paper/draw-structure-plan.cjs` draws the floor/access plan
  from the same layout used by the renderer.
- For the matched first-draft view, serve the retained publication checkout on
  port 8767 and run `node studies/depot-paper/capture-structure.cjs --before`.
- `python3 studies/depot-paper/verify-ownership.py`
- `python3 studies/depot-paper/package-structure.py <destination>`

All modifications are within the owned Depot source/assets/tests/studies and
review evidence. Canonical inputs, session/storage/chapter code, accepted Office,
other rooms and native code are unchanged. No game branch push or merge.

The approved publication prefix remains `cats-by-post-depot-paper/`. This
structural packet uses a new `structure/` child, preserving the earlier draft
and concepts. Study storage retains its isolated existing key. Exact runtime,
public commit and deployment evidence are recorded with the source publication
record after deployment.
