# Tower browser qualification

The exact final build `boxroom-paper-2e79b697b807` completes the focused continuation, occlusion and five-cycle memory checks without JavaScript errors. The tower continues below the viewport in the previously failing phone Room-pan, minimum-zoom and 5×4 study reproductions. All measured tile centres still invert correctly, and all three trusted placement spot checks hit their intended tiles.

## Build provenance

The three-device Daily/Night viewport sets passed 72/72 checks on `boxroom-paper-cdeecf69437f`: 390×844 DPR2, 720×400 DPR2 and 1488×1116 DPR1. These cover HUD bounds and target sizes, overflow, labels, inverse picking and trusted placement in Board and Room views.

The final build differs only in the room bundle's outward device-pixel rounding for repeated masonry strips and its build manifest, after build-ID normalization. 300 runtime files are identical; `join-fixed/bundle-diff.txt` contains only the sampling correction. Geometry, camera, controllers and assets therefore retain the prior 72-check qualification. The exact final spot checks are additional evidence, not a claim that all 72 were rerun.

All 389 files in the final frozen copy remained byte-identical throughout the checks. See `join-fixed/manifest-before.json`, `stability.json`, and `runtime-comparison.json`. Actual output was tested through the regular interface; the source and production outputs were not modified by these checks.

## Continuation and picking

`join-fixed/continuation-report.json` records nine scenes: phone Daily in Room, Board, minimum zoom, both permitted vertical pan limits at Room zoom, and both limits at minimum zoom; earned maximum Night in desktop Room view; and the phone 5×4 daylight raw-study default. Eight actual-game states retain exact inverse picking. Three trusted placements pass: phone Daily Board/Room and desktop maximum Night Room.

The gameplay Night image is genuinely earned seed 303 round 14, 10×8, with 34 arriving cats, restored through the canonical saved-session controller. The 5×4 study is separately labelled visual review and is not a generated Daily completion. Both requested exact-build gallery images have been visually inspected:

- `join-fixed/phone-daily-room.png` — 390×844 DPR2, real Daily 2026-11-17.
- `join-fixed/desktop-night14-room.png` — 1440×1024 DPR1, genuine maximum Night.
- `join-fixed/phone-study-min-day-default.png` —minimum study, now continuing through the lower frame.

Visual captures no longer show the unsupported finite tower base. Visual inspection alone previously missed a one-pixel repeat join. The separately supplied raster evidence `join-fixed/frozen/review/evidence/tower-seam-green.json` reports minimum alpha 254–255, with no sampled row below 250 across four scales after the rounding correction. That independent pixel check is the seam evidence; screenshots are the composition evidence.

## Interface overlap

`join-fixed/occlusion.json` covers phone Daily and 720×400 maximum Night in Board and Room views. No tested editable centre is blocked by a sidebar. Maximum Night has zero blocked editable centres in both default views. Phone Daily retains the inherited hatch-focus interception: one editable centre in Board and seven in Room. This is distinct from inverse picking, which remains exact; the successful pointer spot checks use uncovered tiles.

The same report checks 12 visible study controls at each of 390×844, 720×400 and 1488×1116. All meet 44 CSS pixels in both dimensions.

## Lifecycle and resources

`join-fixed/memory.json` completes five real Daily → Office → fresh Night → earned round 14 restore cycles. Every cycle settles at 78,233,192 estimated owned backing bytes, with 7 documents, 1,753 nodes and 125 listeners. No foreign room aliases or JavaScript errors remain. Post-warm-up retained JavaScript heap spans 19,520,864–20,019,808 bytes after explicit garbage collection, a 498,944-byte spread.

The repeated backing total includes 36,085,384 decoded-image bytes, 27,607,236 prepared-scene bytes, 5,151,244 view-cache bytes, 4,792,320 resident bytes, 1,686,336 piece bytes and 2,910,672 output bytes. In the additional final camera regressions, estimated owned backing ranges 69,326,332–103,927,036 bytes. This is bounded observed ownership, not a process-peak measurement or a claim of zero leaks indefinitely.

## Limits and reproduction

These are Linux headless Chromium emulation checks. Physical iOS/Safari, thermal behavior, FPS and total process peak memory were not qualified in this pass. Navigation/readiness harness timeouts were explicitly extended to 120 seconds while the project suite shared the host; no startup-speed claim is derived from this run.

At the farthest zoom-out, continuation produces a tall narrow shaft over the fixed-scale town panorama. The coverage fix prevents a floating termination; art approval of that extreme composition remains separate. Default Board scale is unchanged, and the tower's lower storeys remain excluded from Room focus bounds.

Portable viewport, occlusion and memory drivers are in `studies/boxroom-paper/tools/qa/`, with `QA_BASE`, `QA_OUT`, `PLAYWRIGHT_MODULE` and optional `QA_TIMEOUT_MS`. The focused exact-build capture driver and sequential logs are in `join-fixed/`. All owned browser sessions are closed.
