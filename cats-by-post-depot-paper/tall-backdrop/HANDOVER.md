# Town Depot · taller backdrop

Continues local `codex/depot-paper-fidelity` at base 7fb02f95, from original
main 8a3c8827. Room ownership and production integration boundaries are recorded
in INTEGRATION.md. The Office branch is untouched.

The user approved the taller backdrop after comparing Office Explore, and
clarified that the full-game UI has more height than this study. Explore now
uses 764px instead of 434px in a 390×844 phone viewport. It hides/inerts the study
play controls and offers a return to the board. The renderer itself uses the
host's dimensions without reserving any panel height. At 390px wide, 844px and
1100px hosts keep the same .195 room scale.

The sky and ground continue through the host viewport, with existing station
and planter geometry completed beyond the former crop. Quiet roof stock avoids
duplicating the distinctive church/dawn. The user rejected the first wide
left-hand extension: it sent a broad paving sheet uphill through the town.
The corrected forecourt terminates at a kerbed pavement connected to the
neighbours' frontage, with two grounded planted beds beyond it. A corrected
actual wide capture was shown before publication; no artistic acceptance is
claimed on the user's behalf.

The accepted background, hall/window, counter, support and four board caches
remain exact. All 25 solutions and 721 cell picks pass; Board return, chapter
entry endpoint, intro/two growths/exit, hidden Explore input, pan/zoom, study save
restore and a protected production save are checked. The van-only drawing
aperture preserves its former offstage hold without changing the 48s workday.
No canvas is created during steady motion; baked resources remain bounded.

1720 broad and 65 focused tests pass. The broad run began before the final
composition fixes; final focused and browser checks follow them. Exact hashes,
scope and measurements are recorded in evidence/*.json. Software performance
measurements are not a physical-device frame-rate claim. iPhone Safari remains
a manual check.

The final paired software draw measurements are 23.55ms before and 23.85ms after
on the same 1000×900 host. The static backdrop reuses one viewport image during
motion and repaints it for camera/host changes. This fixes the initial per-frame
pattern-painting regression; retained-pattern and viewport caches are bounded.

Source/build ownership: new Depot backdrop module; Depot renderer and van
drawing aperture; local study app, style, shell and build module list; owned
study/evidence files. Original assets, workday/chapters/session/storage, canonical
inputs, shared renderer/build/bridge/UI, Office/other rooms/native remain exact.

Public preview child: `cats-by-post-depot-paper/tall-backdrop/`, coordinated in
PR42 comment 6882736306 under the user's existing publication permission.
Publication is additive. No game-source push, merge or final integration.
