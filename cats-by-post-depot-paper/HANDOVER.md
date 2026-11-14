# Town Depot paper study · 14 November 2026

Selected direction: refined Goods Yard Lanterns (option 2), with downstairs
pavement, postal bicycles, parcels and a discreet loft ladder. Alex authorised
implementation after reviewing that composition.

Base: `8a3c88271853b48dafe481c3b86783d829b5feda`.
Branch: `codex/depot-paper-fidelity`.
Worktree: `/workspace/cosysortie-depot-paper`.
Ownership is recorded in README. Every changed file is room-owned.

## Open and reproduce

- Play `studies/depot-paper/playable.html` through a local HTTP server.
- Review `studies/depot-paper/review.html` for actual desktop/phone captures.
- `python3 studies/depot-paper/build.py` reproduces the standalone HTML.
- `python3 studies/depot-paper/verify-ownership.py` checks all changed paths,
  canonical input hashes against the base, and retained Office originals.
- `node --test tests/depot-paper-*.test.js` runs the room regressions.
- `node studies/depot-paper/check-browser.cjs` exercises all deliveries, picking,
  phone layout and screenshots against a root HTTP server on port 8765.
- `node studies/depot-paper/check-interactions.cjs` exercises trusted controls,
  saves, rehearsal return, pause/cancel, chapter isolation and resource stability.
- `node studies/depot-paper/check-flaps.cjs` captures the four canonical door
  approaches at contact, passage and empty-box fold.

The page embeds every image and script; it requests no runtime assets or fonts.
The local builder and tests require only the existing project tooling, Chromium
and Playwright. No dependencies or shared build changes were added.

## Delivered

All existing deliveries `3-1`–`3-10` and `4-1`–`4-15`: 5×4, 6×4, 6×5 and 7×5,
including the original room origins. The largest board retains its three gates,
three ordered hatch queues, twelve cats and six flaps. The slate-paper board,
carriers, turntables, gates and doors share a 2:1 floor projection.

The room adds layered brick/teal architecture, arched windows, a supported parcel
loft and ladder, scales, clock, lanterns, a loading van, town/railway backdrop,
continuous lower pavement, steps, two bicycles, a parcel trolley and flowers.
Human postal work samples the canonical 48-second routine through new aisle
registration, with grounded gait and attached carried objects. Original cat
acting is adapted from the approved Office; the 32 original flap pose records,
arrival/fold deadlines and ordered gate events remain canonical inputs.

The chapter intro/demo, 72-frame entry, two frame-clearing growth moments and
completed-board satchel exit are reviewable. Demo and exit display clocks do not
alter the live puzzle. Rehearsal restores the previous plan. Blur/hidden documents
pause live time; reduced motion freezes ambient time. Normal production progress
and saves are never read or written. Study saves use one separate versioned key.

## Evidence

The independent review and author corrections are recorded in REVIEW.md.
The final room regressions pass 34 tests. Browser evidence records every original
solution winning and every cell centre picking correctly, full phone queues,
reachable controls, saved-route reload, a protected production-key sentinel,
trusted send/stop and drag, chapter isolation, blur pause, stable result viewport,
and no errors. Warm sampling reuses the existing architecture/board caches.

The final full sweep completed 1,689 tests: 1,688 passed and one port-content
export test failed because its music-manifest fixture was still absent. Restoring
that exact manifest and its referenced notes from the same base made all 27
port-content tests pass. The final room-only run separately passes 34 tests.
The earlier sparse-checkout attempt had 1,661 passes and 19 missing-fixture
failures. No test expectations or shared source were changed. The remaining
failure was rerun in its own suite, not represented as a fresh all-green full run.
Raw evidence: full-tests.log, port-content-recheck.log and unit-tests.log.

## Review limits and next owner

This is an isolated visual study, not the final campaign integration. It is
silent; production audio, menus, attempts, stars and progression remain the
integration owner's services. The finale keeps the completed Depot board; the
Mail Train transition is proposed in INTEGRATION.md. Shared lifecycle disposal
and cross-room caching likewise belong to that owner.

Physical iPhone/Safari, sustained performance and native rendering are not
qualified by desktop Chromium emulation. The human/art contacts and ambient
motion are a visual review target, not a claim of identical native pixel depth.
The loading van is a fixed room prop in this study; the original production van
and its existing routine remain unchanged outside these owned files.

Alex explicitly authorised publishing this isolated preview on 14 November.
The approved new prefix is `cats-by-post-depot-paper/`, coordinated in PR #42.
The exact runtime is local checkpoint `0132e2f1`. See PUBLICATION.md in the source
study for the public commit and deployment evidence. No game merge, game-branch
push, shared integration or native changes are included in that authorisation.

## Packaged review

`python3 studies/depot-paper/package-preview.py <destination>` creates the exact
standalone index, review gallery, captures and handover without publishing. The
local packet at `/tmp/depot-playable-preview` passes phone-width image/link checks,
maximum-board startup, complete queues, demo return to 7×5 and Escape dismissal.
`package-browser.json` records the result.
