# Town Depot integration handover

This is the final room-owned candidate on `codex/depot-paper-fidelity`, originally
branched from main `8a3c88271853b48dafe481c3b86783d829b5feda`. This pass starts at
`76909986a554e5f627a8d1f4cab103efa639d277`. Read the Office guide at `0d845552`
in PR42; the Office branch has not been changed. Final integration belongs to
the integration owner. This document proposes its shared work; none is implemented
in shared source here.

## Delivery and ownership

Source/assets: `src/fidelity/depot-paper/`. Study composition/build:
`studies/depot-paper/`. Tests: `tests/depot-paper-*.test.js`. Evidence:
`docs/review-images/depot-paper/`. All 25 original deliveries `3-1–3-10` and
`4-1–4-15` are included, with unchanged 5×4, 6×4, 6×5 and 7×5 boards. No rules,
level data, canonical clocks, saves, other rooms or native files were modified.
Use the owned source and asset originals, not the temporary study UI as the game
interface. The full-game host can provide its full available height.

The build manifest pins ten canonical inputs. `evidence/preservation.json` pins
the retained room files; `evidence/assets.json` lists every asset's hash and its
provenance location. `build.py` is the reproducible, self-contained study builder.
It has no runtime asset, font or dependency requests. The page is about20.23MB.

## Load order and render input

The current owned build reads the canonical rules, BOARDANIM, DEPOTCHAPTER,
DEPOT_DATA/DEPOT, DEPOTWORLD, edge portals, exact Depot levels and retained flap
art/palette. It then loads these owned modules in order:

```
projection session storage chapter acting structure material-painter
corner-finish workday room-finish exterior-layout yard-route exterior-finish
town-layout town-finish town-life backdrop architecture paper-puppet
postal-life pieces ticket-rack portals renderer
```

Create `new DepotRenderer(canvas, DepotAssets, true)` and await `load()` for a
managed host. The third argument suppresses the study's ResizeObserver and
camera updates. The host supplies `config.width/height` in CSS pixels,
`canvas.width/height` in backing pixels, `dpr`, `config.mode`, `w/h`, `roomX/roomY`,
zoom/pan, and `cam={scale,tx,ty}` using the same DepotProjection. Managed
`fit/zoom/drag` do not recompute the camera; the host must update it. Apply room
offsets once to board and pieces. `cellAt` and `screenCell` use client coordinates
and the canvas bounds. Keep the CSS and backing dimensions consistent.

`draw(scene)` consumes:

| Field | Meaning |
| --- | --- |
| `level` | Exact canonical record with board, hatches, baskets, gates/flaps and dogs. |
| `chutes` | Current planned turntables. |
| `traces`, `gateTrace` | Canonical route/BOARDANIM and gate results. |
| `elapsed` | Presentation seconds on the existing attempt clock. |
| `mode` | `edit`, `running`, `won` or `lost`. |

The host advances `ambient` on the existing room clock. `motion=false` freezes
optional animation only when the host also holds ambient; delivery traces must
still advance. `prepare()` updates level-specific caches on a level change.
Static architecture/backdrop/art bake at load; four board caches are retained.
Backdrop keeps one viewport raster and rebuilds it on camera, DPR or size change.
Do not recreate the renderer or bake scenery per frame.

## Chapter and lifecycle contracts

The study demonstrates Chapter3 gates, Chapter4 story/shared-rule teaching,
1.2-second entry, growth at `4-7` and `4-10`, and the satchel ending after `4-15`.
`chapter.js` reads the unchanged canonical teaching and growth sources. The
ending retains the completed board; production owns the transition to Mail Train.

For entry, set `renderer.chapter` with `mode='enter'`, `time`, `entryFrom` and
`entryTo`. The destination is the camera for the eventual gameplay canvas,
including whatever space the real UI uses. Recompute that destination whenever
that canvas changes size during entry; keep the original1.2s duration. The study
fix handles window resizing; the shared host must also handle its own panel or
layout changes. The16-case actual-browser record covers both rotation directions,
phone toolbar height and a taller390×1100 host across all four boards.

Production should own one animation clock, suspension on blur/visibility,
pointer cancellation, reduced-motion preference and focus restoration. On
unmount it must disconnect any observer, stop callbacks/listeners and release
room canvases/ImageBitmap references according to the shared cache policy.
The managed renderer installs no observer, but exposes no production `dispose()`
contract. Agree that contract in shared integration; do not mount study `app.js`
inside the game. Its global listeners and lifetime RAF are review scaffolding.

Production retains its existing UI, audio, campaign progress, unlocks, hint/star
accounting and save migration policy. The study is silent and writes only
`cats-by-post:depot-paper-study:v1`. Do not import that review key into game saves.

## Final visual corrections

The accepted room materials, geometry, windows, counter/supports and four board
rasters remain exact in this pass. The old van-only screen crop sliced the body
in taller/wider views. `yard-route.js` maps the existing owned van progress onto
a longer supported goods road; `backdrop.js` adds its matching paving, retaining
walls and rail buffer stop beyond the accepted crop. `postal-life.js` paints
the full vehicle. The source workday, door and exchange timing are unchanged.
The farther visual path travels faster within the same windows. A deliberately
distant view can reveal the stationary away hold; it is a finite scene, not an
unbounded town simulation. Review the full route clip before production framing.

| Owned addition | Swift/Metal mapping |
| --- | --- |
| `DepotYard` | Immutable road/obstacle boxes plus pure caller-owned pose mapping. |
| `DepotBackdrop` | Registered cached scenery textures and one viewport raster. |
| `DepotWorkday` / `DepotTownLife` | Value poses sampled from the original ambient clock. |
| `DepotPaperPuppet` | Cached paper cutouts, grounded shoe/palm anchors, bounded IK. |
| Static finishes | Projected receiver faces and textures baked outside the frame loop. |

## Review boundary

Preview child `cats-by-post-depot-paper/final-review/` was reserved in
[PR42 comment6884496463](https://github.com/holleyy/cosysortie/pull/42#issuecomment-6884496463).
Existing publication permission covers this separate add-only review. Game-source
push, merge, shared implementation and native work remain unauthorised here.
Physical iPhone/Safari performance and final visual acceptance remain human review;
headless Chromium evidence does not claim hardware qualification.
