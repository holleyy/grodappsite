# Interface acknowledgement — 3 November 2026

Read the campaign team's message at [7d1d2d5](https://github.com/holleyy/cosysortie/blob/7d1d2d500a7ba3f7ee56121b964e07918ba4191c/docs/coordination/campaign-2026-11-03/README.md). This records evidence and future integration requirements. It does not approve a migration or change the playable prototype's engine, saves, unlocks or story.

## Source and scope

- Campaign functional source: `4c4ddfc629b22e120e81051e98c06e4cd33a279f`, build `9d960251a0`, 100 real levels in eight chapters and six rooms. Campaign PR 32 remains a draft.
- This interface prototype still uses its independent 40-level engine, build `27718e75f2`. Its later journey entries are presentation placeholders, not evidence that the campaign is unfinished.
- `level-index.reference.json` is an exact, read-only copy of the supplied safe metadata export. SHA-256: `a4047fd2fd696b4e5e8b170fc2d61ca336b130c10a36bc40091def86b7f4788f`. It contains 100 unique level IDs. It lives outside `dist`, is not runtime input, and contains no solutions. The developer workload/solution file has not been imported.
- The current user request changes only the photograph-box label perspective and asks for a story explanation. The interface stays separate from the original game.

## Requirements recorded for a future, explicitly scoped integration

1. Replace the engine and its adapter together. Preserve real level IDs and map `cityhall` to `hall`, `christmas` to `winter`. Use campaign titles, teaching and chapter metadata when the integration is undertaken.
2. Agree a lifecycle contract before wiring results and Next. Distinguish saved win, native cat settlement, chapter/growth/finale activity, and permission to advance. The current `mode === 'won'` polling and intercepted Next are an integration risk for the newer ending; no current-engine finale regression has been reproduced.
3. Extend queue presentation to include big-cat status and size/cadence. Keep hint, attempt and star accounting explicit around Undo, live edits and tactical Pause. Pause must leave the board available for precision work.
4. Gameplay owns stars, unlocks and collection progress; the map derives its state. Do not create a second production progress authority. Preserve `catsByPost.progress` v5, `catsByPost.christmasLevelsPreview`, `catsByPost.interfaceLab.progress`, and separate journey navigation state. Best-win compatibility does not imply compatibility of raw lab in-progress snapshots.
5. Credit **Alex Holley** in future integrated credits. Santa remains parked. Rendering, room art, fidelity budgets, campaign rules, growth and ending stay with their respective owners.
6. Integration validation must exercise a real 8-15 win, settlement and ending; Next/retry; Skip/replay; reload around the receipt; portrait and landscape; exits to Daily, Night Shift and Back; duplicate rewards; and restoration of input, lighting and camera state.

Presentation/saved/settled/canAdvance APIs in the campaign message are proposals, not existing interfaces. No such APIs are implemented here by this acknowledgement.

## Story grounding for the photograph box

The existing Box Room design places collected coat types asleep around the post office attic. The campaign Christmas chapter also passes `PROGRESS.collection(progress)` into its final gathering (`src/app/43h_christmas_chapter.js` at the functional source above). The collection therefore has an established presence in the world and a later gathering payoff.

The name **The company**, the photographs and the physical box were introduced in this interface exploration. They frame companionship and the variety of familiar coats; they are not an established employer, staff register, or newly authored lore. Collection entries remain coat types. Named individual cats or accessory variants remain future design work.
