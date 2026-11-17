# Centred-gable roof visibility regression

Owned implementation: `studies/boxroom-paper/tools/qa/roof-depth.cjs`. No production source is edited by this task.

The driver takes actual frame IDs/endpoints and face vertices from `BoxRoomLayout`. It tests the left tie, left collar, right far rafter and far purlin. Sample positions are derived from those faces, not saved room coordinates. For the shared projection, movement along `[1,1,1]` leaves screen position unchanged. Plane intersections along that camera ray establish the closest timber face and whether an actual opaque slate/underlay polygon is in front.

Samples are chosen using geometry only, before reading Canvas pixels. They lie inside member faces and clear of polygon edges, rooflights (including glazing, sash and reveals), other projected members, structural joints/supports, and all wall posts. The report records source face IDs, world and projected points, front roof intersections, edge margins, candidate counts and coverage. Each of the four members must have an independent sample; every size/light case must include both hidden and exposed controls.

Four calls to the real `BoxRoomScene.prepare` produce:

1. The intact roof and members.
2. The same scene with the tested member faces removed.
3. Roofing removed, members retained.
4. Roofing and tested member faces removed.

A hidden member's 5×5 patch must change at **zero** pixels between the first two renders. Its patch must change at **at least 20/25** pixels with the roof removed. An exposed patch must change at least 20/25 in both comparisons. The unroofed test prevents deleting a whole member from satisfying a hidden check. Geometry excludes overlap with other tested members, so the change has a single identified contributor.

The real Canvas material/layer pipeline is used with `plain:true` and density 2. This tests construction and occlusion, not final textured artistry. Minimum/maximum day/night contact sheets show all four renders with the measured patch marked. Every size/light case is recorded in JSON. Source SHA-256 values cover projection, materials, layout, scene, generator, config and the QA driver.

Intentional negative controls use `QA_MUTATION=front` to draw members in front of slate, and `QA_MUTATION=erase` to remove them entirely before rendering. Each runs a single 5×4 day case and must exit unsuccessfully. These changes exist only in the disposable page; source files remain intact.

The earlier `pinned-source` and `all-sizes` outputs precede the final tower material/tail freeze. `final-source/manifest.json` identifies the exact frozen source, including layout `e13258b3db8457168455ecc380007e50276fe7d6c6adef3c627493aa66a3c867` and scene `64c73fd635c90186db882c7739c9079f16b9e7e4ed8dc77c1e182dec2243e53d`. Final evidence and the narrowly corrected selector are described below; earlier evidence is retained.

Relevant runtime scope from read-only review: board projection and canonical source preparation are unchanged. The renderer fits `viewBounds` while the scene and bounded viewport cache separately extend the tower facade. Disposal includes the added extension canvas. Final small-screen Board/Room fitting, vertical pan/zoom at the facade continuation, cache release on room changes, and existing picking checks remain the appropriate runtime regressions. This roof driver does not replace those checks or a full suite.

## Final result

All **30 supported sizes, each in day and night, are covered by 624 passing samples**: 360 hidden samples and 264 exposed controls. Hidden members changed zero pixels with the opaque roof intact. All unroofed positive controls changed 25/25 pixels; exposed intact controls changed at least 20/25. All four frame members have coverage in every case. There were no Canvas page errors and all static source hashes stayed unchanged.

This evidence combines **44 unchanged cases from the original 60-case sweep with 16 focused case retests**. It is not a claim that one uninterrupted sweep was entirely green. The original full sweep is retained at `final-all-sizes/roof-depth.json`: 623/624 passed, with one QA colour-alias failure. The new selector replaces exactly 16 sample locations; 608 locations are identical to the original. The geometric comparison identifies every changed location in `selection-comparison.json`. All 16 affected cases (172 samples) then passed real Canvas rendering in `final-affected-retest/roof-depth.json`.

The single original failure was a 10×6 daytime purlin positive control. The purlin completely covered the patch, with a 4.78-scene-pixel margin. Removing it revealed a wall post whose flat daytime RGB was the identical **(162, 121, 73)** across two columns. Thus only 15/25 pixels changed despite correct beam rendering. The four-way crop in `purlin-colour-alias-before.png` shows the beam and post; `purlin-colour-alias-after.png` shows the corrected clear sample. The test now excludes all projected wall posts, as it already excluded roof joints and supports. Selection remains geometric and does not inspect pixel colours. Neither production code nor the 20/25 threshold changed.

Both deliberate failures remain detectable on the final static source:

- Drawing members in front of slate (`QA_MUTATION=front`) fails all six hidden controls, each changing 25/25 pixels when it should change zero.
- Erasing the members (`QA_MUTATION=erase`) fails all ten controls, with zero unroofed pixels changed. Whole-member disappearance cannot satisfy the regression.

`summary.json` is the concise machine-readable result. `final-aggregate.json` retains each case's original or focused-run provenance and every actual sample. `aggregate.py` verifies all 60 selected cases against the revised geometric selection and identical production hashes before writing these outputs. All QA browsers were closed after the two negative controls.

## Source and reproduction

The projection, material, layout and scene bytes match the frozen `cdeecf69437f` release, recorded in `release-source-match.json`. The subsequent renderer-only outward device-pixel rounding fix does not alter any input to this roof test. The static scene hashes are:

- `projection`: `383d2c23f297e849cbc7a6f93fbaa7d46883af2ed9ee5f374489958fba7efe6e`
- `materials`: `784b343e9288acc140e7d09f28b77a77b03fcd27df4d90aecb71e457754d1bcb`
- `layout`: `e13258b3db8457168455ecc380007e50276fe7d6c6adef3c627493aa66a3c867`
- `scene`: `64c73fd635c90186db882c7739c9079f16b9e7e4ed8dc77c1e182dec2243e53d`
- `driver`: `6237567d53c6b462a530609901289aff60df880f150ce19d561dc344e9cb187b`

The original driver snapshot remains `final-source/roof-depth-driver.cjs`; the final driver is `final-source/roof-depth-driver-current.cjs`. The earlier incomplete `all-sizes` run was cancelled at 42/60 and is explicitly labelled superseded; it is not used in the final aggregate.

From the repository root, the final portable driver can run all sizes directly:

```sh
QA_ALL_SIZES=1 QA_OUT=/tmp/boxroom-roof-qa node studies/boxroom-paper/tools/qa/roof-depth.cjs
```

An optional `QA_SOURCE` directory selects frozen copies of projection/materials/layout/scene. `QA_CASES=10x6:daily,10x6:free` with `QA_ALL_SIZES=1` restricts a focused rerun and produces four-way evidence sheets. The actual focused rerun's list is recorded in `selection-comparison.json`. Mutation checks each run one 5×4 daytime case and intentionally exit with an assertion failure:

```sh
QA_MUTATION=front QA_OUT=/tmp/boxroom-roof-front node studies/boxroom-paper/tools/qa/roof-depth.cjs
QA_MUTATION=erase QA_OUT=/tmp/boxroom-roof-erase node studies/boxroom-paper/tools/qa/roof-depth.cjs
```

Scope: fixed seed 303, date 2026-11-18 (Wednesday daylight) and native free/night lighting. This is actual Canvas construction/occlusion verification for the current four-member contract. It does not establish every seed/date, final textured artistry, physical Safari performance, gameplay, or the renderer-only facade seam correction; those have separate owners and checks.
