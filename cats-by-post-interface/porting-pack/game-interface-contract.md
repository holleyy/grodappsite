# Game ↔ interface contract

## Status and ownership

This is a **proposed contract to agree with campaign and fidelity**, not APIs already implemented in the game. `contract.schema.json` and its examples describe a possible native presentation snapshot. Names and storage transport remain proposals. The accepted behavioural requirements below are the important boundary.

| Owner | Authority |
| --- | --- |
| Game/campaign | Rules, tile locks, arrivals/order/size/cadence, attempts/hints/stars, saved wins, unlocks/collection, session restoration, native home settlement, chapter/growth/finale controllers and safe advancement |
| Renderer/fidelity | World geometry, picking/projection, scene lighting, camera implementation, art/poses, texture/decode budgets and renderer clocks |
| Interface presentation | Navigation intent, current letter/packet/map camera memory, selected photograph/face/viewed pile/seen status, menus, typography, accessibility and material gestures |
| Host/lifecycle | Scene foreground/background, input focus, safe areas/window size, reduced motion, preference persistence and coordination of the above owners |

Use a separate UI module/bundle. A proposed native arrangement is SwiftUI presentation over the Metal scene host, with a small read-only observable snapshot and typed commands. The renderer/game must not reach into view layout; views must not copy raw `gm`, trace arrays or rules into themselves. Publish meaningful changes rather than rebuilding every view for every renderer frame. Each module keeps an independently editable implementation and tests.

## What exists in the reference

The lab exposes `Lab.state/load/pause/freeze/tap/undo/snapshot/restore` through its adapter, `PlayHUD` renders arrivals/stock, `JourneyHandoff.handle` routes selected shell commands and `JourneyModel.continuation` projects navigation. `CompanyModel.read` derives coat availability from existing Night Shift totals. `PostalIdentity` derives place/chapter ownership. These are reference-only browser implementations, not native API requirements.

The old handoff polls `mode==='won'` every 200ms and can pause/leave on intercepted Next. It deliberately suppresses original chapter transitions. **Do not port that lifecycle shortcut or blindly swap a new runtime into it:** it could bypass/freeze a later chapter or finale. Its raw in-progress snapshots do not contain the later finale controller.

## Proposed snapshot

Use an immutable snapshot with stable `runID`, `revision`, `mode`, `phase`, `level`, `board`, `clock`, `arrivals`, `stock`, `counts`, `eligibility`, `lifecycle`, `progressRevision` and `collection`. IDs are opaque identity, not display text. UI copies are never a second save authority.

- `arrivals`: an explicit game-supplied per-hatch or global order; stable cat identity, hatch identity, local/global order, coat identifier, normal/large size, released/home status and optional release tick. Keep size and cadence visible without guessing from coat. The old HUD extension deliberately supplies `big:false,size:1`; its large-cat markup is not proof of native campaign data support.
- `clock`: current rule instant and actual simulation pause reason. UI material time is separate; precision Pause freezes puzzle time, not a renderer refresh needed for selection/inspection.
- `eligibility`: `canEdit`, `canUndo`, `canSend`, `canCancel` reflect authoritative rules. Menu and board must use the same result. A command may still be rejected if eligibility changed since the snapshot.
- `lifecycle`: unique outcome identity; saved-win and native-home-settlement facts; chapter/finale phase; permission to show result and advance. A successful simulation alone is insufficient. Recommended minimum for showing result is saved+settled+campaign permission. Recommended minimum for advancing is saved+settled+chapter/finale idle+campaign permission. The game may withhold permission for longer.
- `collection`: game-approved coat IDs/availability/progress. Prototype thresholds0/50/100/250/500 and coat naming must be checked against production; views do not invent unlocks or infer gameplay routing types from collection portrait names.

## Proposed commands and acknowledgement

Each command carries `commandID`, `runID`, `expectedRevision` and its typed payload. The game returns accepted/rejected/superseded plus the authoritative revision and a useful reason. Duplicate command IDs are idempotent. Ignore stale replies from an older run/navigation generation.

| Intent | Required behaviour |
| --- | --- |
| Open/resume delivery or service | Preserve the current session until replacement is explicit and accepted; mode-specific continuation stays in that mode |
| Set tactical pause(boolean) | Idempotent; no overlay; no new send/attempt; retain board selection/camera |
| Place/rotate/remove / select stock | Pick logical tiles through renderer API; reject occupied/in-flight/locked tiles using game rules; never reverse-engineer isometric picking in a UI overlay |
| Undo | Same-rule-instant history only; correct attempts/hints/star accounting remains game-owned |
| Cancel run | Return to setup with arrangement retained; attempts already spent stay spent; safe cancellation of active movement belongs to game |
| Open/close Menu | Suspend via a reason/token and restore the prior tactical-pause state; background interruptions take precedence over an old resume token |
| Next/retry/replay/skip | Respect current lifecycle permission; campaign owns skipping/finishing a scene and restoration of input/light/camera; replays cannot duplicate awards |
| Main menu / Map / box / mode exit | Save/suspend through game API, record UI origin, detach/pause scene correctly, then navigate; reject or defer exits during protected campaign transitions as the game specifies |
| App interruption / reload | Use production session codec/version and policy; return to a valid paused route without recreating an old controller from lab traces |
| Camera fit/pan/zoom | Supply measured clear insets and intent to renderer; preserve manual view across control changes and viewport resize |

## Completion sequence

Simulation resolves → game commits outcome idempotently → game finishes home animation → campaign chapter/finale runs if needed → game publishes permission → UI presents correspondence → player selects next/replay/map → game accepts transition → UI changes navigation. Permission may be revoked by a newer run; do not bind irreversible navigation to an animation completion alone.

Illustrative examples cover a paused busy delivery, a saved-but-unsettled win, a settled finale still owning presentation and an advance-ready result. They do not ship a puzzle solution, actual authored queues or a working native controller.

## Metadata and persistence

Pinned safe index: 100 unique levels, chapter lengths 5/10/10/15/15/15/15/15. Preserve level IDs. Engine `cityhall`→journey `hall`; engine `christmas`→journey `winter`; other room IDs map directly. Use production titles/teaching/board facts, not the older UI placeholders. Extra destinations can extend the data and map extent.

Game progress remains authoritative. Preserve production `catsByPost.progress` v5 and independent review namespaces `catsByPost.christmasLevelsPreview`, `catsByPost.interfaceLab.progress` and `cats-by-post.journey.*`; do not reset/import them implicitly. UI navigation/seen/camera preferences can have a separate versioned store. Best-win compatibility does not prove raw session compatibility. Agree supported session versions, migration/error recovery and rollback before integration. Prototype example histories (three or 33 posted) and synthetic 50-cat collection study must never become production defaults.

## Agreement still required

Campaign/remaster owners must agree the actual snapshot/command names, outcome identity/deduplication, safe result/advance permissions, skip/replay/exit policies and production save migration. This pack records requirements and a proposed shape; it does not claim those methods exist or approve a migration.
