# Exploratory tower camera review

Prototype `boxroom-paper-189b8c28d1bc` improves default tower composition without shrinking the board, but the finite lower edge is exposed by normal permitted camera movement. This is an exploratory finding on the first tower prototype, not final qualification or a review of later roof/continuation changes.

## Findings

1. **The authored tower bottom is visible and floats above the town.** At phone Daily's normal Room scale, an accepted positive-Y pan reaches the permitted limit (143 native units) and exposes the unsupported lower edge. Minimum zoom also reveals the complete small tower over the fixed-scale panorama. The 5×4 phone raw-study default exposes the bottom without gestures. The strongest reproductions are `phone-daily-pancheck-room-pan-down.png`, `phone-daily-minzoom.png`, and `phone-study-min-day-default.png`.
2. **This is not currently a prepared-raster truncation.** The exact frozen bundle's 5×4 and 10×8 layouts have rasterBottom equal to the full geometry bounds. Their authored masonry terminates at z=-210, marked openBottom. Merely increasing the raster canvas does not continue that geometry. `bounds.json` records the values. A continuation treatment must cover both permitted zoom and pan; a minimum-zoom clamp alone leaves the normal-Room pan reproduction.
3. **Tower height does not shrink the gameplay board.** Focus bounds exclude lower storeys. At matching phone and short-landscape sizes, Board camera scale is exactly unchanged from release 125075d25277. Room scale is 1.1–6.3% larger. `scale-comparison.json` records the exact comparison. All 12 trusted placements (six actual Daily/Night cases × Board/Room) hit the intended tile; inverse picking remains exact at every centre for all captured actual-game views and accepted pan states.
4. **Default maximum Night remains clear of the short-landscape sidebar.** At 720×400 its Room scale is 0.86650 CSS (prior 0.85696); Board scale is 1.23418 unchanged. Both default views have zero blocked editable centres. Manual extreme panning can deliberately move the board under the HUD (49 blocked centres at the negative-Y limit), which is different from a default-fit regression. Phone Daily retains its inherited hatch-focus overlays (Room 7, Board 1).
5. **Defaults communicate height better than the old floating slab.** Inspected phone Daily, short maximum Night and desktop Daily defaults show several continuous storeys leaving the visible frame or passing behind controls. The full-size background remains fixed relative to zoomed/panned room content, which makes the finite exposed tower especially conspicuous when reduced.

## Coverage and provenance

The first prototype was copied before audit into `frozen/`; all 375 copied files are unchanged afterward (`manifest.json`, `stability.json`). Production files were not edited. Actual gameplay uses Daily 2026-11-17 (5×5) and the genuine earned seed 303 Night round 14 saved session (10×8). The checkpoint is restored through the native controller; no board-size review override is used for gameplay.

Actual gameplay sizes: 390×844 DPR2, 720×400 DPR2, 1440×1024 DPR1. Each has Room, Board and minimum-zoom captures, with trusted placements in default Room/Board. Legal positive and negative pan limits are separately captured for phone Daily and short maximum Night in `pan-report.json`. Gameplay captures recorded no JavaScript errors; this focused driver does not assert every HTTP request status.

Visual-only raw room studies cover 5×4 daylight at phone and desktop,5×4 night at short landscape, and 10×8 daylight at desktop. These are labelled study fixtures and are not generated Daily/Night completions. `report.json` preserves all attempted stages and their outcome.

## Harness limits

The initial main driver's pan amount 10000 exceeded the public command's bound and was rejected, leaving the camera unchanged. Those initial `minzoom-pan-down` rows are not pan evidence. The separate `pan-audit.cjs` uses accepted pan 100/−100 and proves that the native pan limit is reached.

Direct native zoom calls in non-game raw study mode encounter a gm.L=null assumption. Those are unsupported harness calls, not established user-facing regressions. A real wheel gesture through study.html changed neither zoom nor pan and caused no errors in both this prototype and prior release 125075d25277 (`study-gesture.json`). The raw-study default captures remain valid; their direct-zoom stages are excluded.

This is Linux headless Chromium emulation. No frame-rate, physical-device, full lifecycle, save, or broad project-suite qualification was rerun. Owned backing estimates in the inspected states ranged from 66.8 MB to 116.8 MB; the maximum scene preparation backing was 26.1 MB. These are owned estimates, not process peaks. Later bounded masonry continuation should be retested at minimum zoom, both pan limits, and the phone 5×4 study default.
