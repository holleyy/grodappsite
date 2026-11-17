# Town Depot: dimensional paper flaps

17 November 2026. The edge flaps now match the raised paper construction of the
existing turntables: thick painted card jambs, cream returns, a recessed leaf,
layered threshold and plinth, shaped ginger crown and square blue cap.
Both G/B marks are drawn in the frame's plane. The door has a real 1.4-unit
cut edge and rotates as one rigid panel through the eight original angles.

Base: `2dbdaa0f1fc9ce5a884cb12df14468643d4846fa` (accepted arms/slide checkpoint).
Branch: `codex/depot-arms-slide`, draft PR52. The source remains unmerged.
Runtime SHA256: `fd7a94ab94ff4ab3cdb0c9999169174271d5c125d7b9b3933b79269aa0c17b1b`.

## Construction and scope

Only `src/fidelity/depot-paper/portals.js` changes in production source.
The original mouth, floor registration, anchors, canonical cat sprites,
arrival timing and closing bounce are preserved. `cat`, `state`, `flap` and
`gate` are byte-for-byte unchanged. Other Depot source and all accepted artwork,
including the worker and postal-slide corrections, are unchanged.

All surfaces are baked with the room's authored paper fibres, face lighting,
cut edges and a contact shadow. A small room-local plane partition orders the
solid faces correctly where a moving leaf overlaps its jambs. Embedded hinge
faces remain behind the lintel. Texture and panel marks are clipped to each
fragment with stable face coordinates; subpixel overlap, bounded by the
original face, closes antialiasing hairlines without changing the silhouette.
The near-edge door and frame share the existing front painter pass around the
canonical cat. The far-edge construction retains the existing back pass.

Construction remains a one-time bake into the same 128 256×240 canvases.
There are no new frame-loop geometry calculations, assets, dependencies or
shared interfaces. Shared renderer/build/bridge, native, Office, other rooms,
level data, progress and saves are untouched.

## Evidence and checks

The review contains actual before/final Canvas closeups with the turntables,
the full room and phone layout, a 24 fps four-edge delivery clip, and contact
captures. Geometry checks cover solid depth, an unchanged clear mouth, rigid
hinge movement, footprint bounds, and physical ray depth on all 64 combinations
of coat, direction and canonical angle. Browser coverage samples 104 contacts,
including exact animation transitions, and checks all 128 caches for clipping
and reuse. All 137 final Depot/flap tests pass. Independent final review is clean for the runtime above.

All 25 original solutions, 721 cell picks and four unchanged board rasters are
checked alongside trusted controls, isolated saves, chapter presentations and
reduced motion. Preservation checks cover ten canonical inputs, all other room
source, 27 artwork files, 11,520 postal samples and the unchanged shared build
`dedb812743`. Detailed results are in `evidence/*.json`; full test logs remain
in the source review directory. Physical Safari remains human review.

## Preview and integration

https://holleyy.github.io/grodappsite/cats-by-post-depot-paper/flap-depth/

The prefix was reserved with the integration owner in PR42 comment6958436151,
under the user's existing Depot preview publication authority. Publication adds
only this child; previous previews and other rooms remain unchanged. PR52 now
contains the earlier arms/slide correction and this flap refinement. The
integration owner retains final game integration; this checkpoint does not
merge game source.
