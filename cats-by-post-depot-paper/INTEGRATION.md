# Depot integration proposal

This branch supplies a standalone room study. It does not edit the shared room
manager, renderer, build scripts, bridge, interface, campaign saves or native
renderer. Integration belongs to the integration chat.

## Inputs and seam

- Source and embedded assets: `src/fidelity/depot-paper/`.
- Standalone composition root: `studies/depot-paper/app.js`.
- `DepotRenderer(canvas, assets)` then `await load()`, `draw(session)`.
- Render input: exact level record, placed chutes, canonical BOARDANIM traces,
  gate trace, elapsed presentation seconds, and editing/running/result mode.
- `fit`, `zoom`, `drag`, `cellAt`, `screenCell` use the same floor projection.
- `motion=false` freezes ambient activity; delivery trace presentation continues.
- Existing board roomX/roomY offsets are applied once to floor and all pieces.
- Scenery and art caches bake once. Board caches cover exactly four sizes.
- Canonical `DEPOT`, `DEPOTWORLD` and chapter demo/growth sources are read-only
  inputs. Ambient paths are registered to the new reserved aisles and use the
  original 2,880-frame timeline. The study's camera does not follow ambient work.

The study session/storage/UI are review scaffolding. Production should feed
existing progress, attempt/hint/star accounting and routing into the render seam,
not migrate the study's isolated completion list into canonical saves. The
review key is `cats-by-post:depot-paper-study:v1` and is the only key it writes.

## Shared work requested from the integration owner

1. Adapt this render input to the agreed shared room contract and camera host.
   Retain the current canonical ticks, traces, release order and save model.
2. Connect the final Depot exit to the existing Mail Train chapter. This study
   holds its completed Depot board and offers a return; it never loads or edits
   another room.
3. Decide common lifecycle/disposal and asset caching policy across rooms.
   The standalone study owns a ResizeObserver and a single RAF for its lifetime;
   production mount/unmount should be supplied by the shared host.
4. Preserve canonical UI/audio services when integrating. This isolated visual
   study is silent; it does not replace production sound, progress or menus.

## Preview boundary

The previously authorised concepts stay at `cats-by-post-depot-paper-concepts/`.
Approved separate playable prefix: `cats-by-post-depot-paper/`. Alex explicitly
authorised publishing this study on 14 November, after its local review packet
was complete. The prefix is coordinated on integration PR #42. Publication is
confined to that area; game merge, game-branch push and shared integration remain
outside this authorisation.
