# HUD refinement — separate prototype

This pass completes the four agreed presentation refinements: readable hatch identifiers and per-hatch remaining counts; compact exhausted stock; direct precise placement with other Sorting tools in the menu; brief feedback on actual queue/stock/home changes. Tactical Pause cancels HUD movement and retains board editing. Stock changes preserve the board projection, primary controls and the open precision row.

Changes live in the common play/hud.js and hud.css presentation layer, with shell action/copy wiring in app.js and index.html. No original game or copied runtime changes, campaign migration or production integration occurred. Story keeps hatch-local lanes; Night Shift keeps global order. Existing save namespaces and game rules remain authoritative. The accepted gate arrow is unchanged.

Future integration should consume real queue/stock/home/pause state through this presentation boundary and map precise placement, camera and tools actions to the production lifecycle. This note does not authorize a merge or runtime swap. Physical Safari remains a testing gap.
