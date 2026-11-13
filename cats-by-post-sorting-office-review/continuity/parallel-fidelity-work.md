# Parallel room fidelity work

Separate chats can develop the remaining rooms at the same time. Give each chat
one **room**, covering all its puzzle sizes, rather than one chat per puzzle.
The architecture, pieces, acting and chapter scenes need to agree across that
room. Start with two or three implementation chats; all five can explore concepts
in parallel. Keep one integration chat responsible for shared code and merges.

This guide does not start those projects or authorise publication. Each room
begins when Alex gives its chat a brief.

## Common visual target

Use Lantern Quay for warmth, material quality and visual richness, and the
approved canalside Sorting Office for implemented projection, grounded props,
smooth carriers and restrained ambient life. Keep each room's own identity;
the train should feel like a train, and City Hall can remain grander than the
cosy Office. Papercraft means layered card, convincing thickness, warm light
and clear silhouettes. The playable board must remain the clearest element.

- [Approved standalone Office study](https://holleyy.github.io/grodappsite/cats-by-post-civic-mail-hall/?v=tickets&view=hall)
- [Office in the regular interface](https://holleyy.github.io/grodappsite/cats-by-post-sorting-office-review/?v=tickets)
- [Office source and adapter](../../src/fidelity/office-paper/)
- [Office merge checkpoint](progress/sorting-office-merge.md)

The Office study's mobile performance and handling have been accepted by Alex.
That is a useful reference, not automatic qualification for larger rooms.

## Room assignments

These are the existing campaign records, not new puzzle work. Read the room
brief for its identity and mechanics; its older progress entries are historical.
Confirm the current source and latest handover before implementation.

| Chat | Existing deliveries | Board sizes to support | Defining requirements |
|---|---|---|---|
| [Town Depot](02-town-depot.md) | `3-1`–`3-10`, `4-1`–`4-15` (25) | 5×4, 6×4, 6×5, 7×5 | Goods yard, gates and edge flaps; both chapters share one place |
| [Mail Train](03-mail-train.md) | `5-1`–`5-15` (15) | 8×3, 9×3, 10×3, 10×4 | Long carriage, changing countryside, railway points and station transitions |
| [City Hall](04-city-hall.md) | `6-1`–`6-15` (15) | 7×5, 7×6, 8×6 | Civic sorting hall, paired tunnels, clear routes and supported galleries |
| [Parcel Room](05-parcel-room.md) | `7-1`–`7-15` (15) | 7×6, 8×6, 8×7, 9×7 | Warehouse handling, larger cats, existing slower cadence and roomier arrivals |
| [Christmas](06-christmas-rush.md) | `8-1`–`8-15` (15) | 8×7, 9×7, 9×8, 10×8 | Festive culmination, all mechanisms, four hatch queues and 32-cat finale |

## File and branch ownership

Each chat gets a separate Git worktree and a branch such as
`codex/depot-paper-fidelity`, created from a recorded current `main` commit.
Two chats must never switch branches or edit files in the same checkout.
Keep builds, temporary captures and local servers in that chat's workspace.
Use the repository's per-command Git maintenance settings from `AGENTS.md`.

Agree a room-owned source directory, asset directory, tests and review directory
before coding. A practical proposed layout is `src/fidelity/<room>-paper/`,
`studies/<room>-paper/`, `tests/<room>-paper-*.test.js` and
`docs/review-images/<room>-paper/`. These are proposed ownership boundaries:
only the Office currently has the new modular paper implementation. The other
production factories are built from retained fidelity exports; do not assume
equivalent room modules already exist or edit generated `web/rooms/*.js` by hand.

The integration chat owns shared renderer and camera contracts, the room
manager, build scripts, game bridge, interface, `PLAN.md`, `AGENTS.md`, generated
production outputs and final merges. A room chat should record any required
shared change as a small proposal with its calling contract and evidence, then
continue independent work. It should not create a competing shared framework.
Reusable Office techniques may be adapted inside the new room; changes to
Office source itself belong to the integration owner.

Preserve canonical rules, level IDs, answers, progress, save formats and timing.
Do not change `sorting_office.html`, canonical art/hash baselines, other room
assets or `native/` for a room fidelity study. The HTML work is the reviewable
reference for a later Swift/Metal port, not permission to start that port.

## Review and integration

1. Compare a few compositions, then agree the room's direction. Show the largest
   board as well as the first delivery so scenery does not consume required space.
2. Make a playable study using the existing rules. Establish one floor projection
   for architecture, pieces, characters, shadows and pointer picking. Check
   grounded feet, supported props, grips/releases and unobstructed routes.
3. Finish acting and atmosphere, keeping fast, smooth movement and stable reduced
   motion poses. Cover the room's mechanisms and chapter/demo/growth/exit states.
4. Hand over source, asset provenance, screenshots or clips, tested board sizes,
   browser/device evidence, remaining limits and a short integration note. Keep
   the study available alongside the regular-interface candidate.
5. The integration chat combines one accepted room at a time, checks save/resume,
   navigation, other-room restoration and gameplay regressions, and returns the
   combined result for review before merge.

Give every published study its own agreed URL prefix and isolated save namespace.
Coordinate deployment through the integration owner so independent chats cannot
overwrite one another's previews. The existing Office prefixes are already
occupied; this guide grants no other prefix or permission to overwrite the live
game. Use any publication authorisation Alex explicitly gives that room's chat.

## Starter brief for a new chat

Replace the bracketed values, then paste this with the visual references:

> Upgrade **[room]** in Cats by Post to the papercraft fidelity of Lantern Quay
> and the approved Sorting Office. Own all existing **[delivery IDs]**, including
> their board sizes and chapter presentations. This is a visual upgrade;
> preserve gameplay, timing, level data, progress and saves.
>
> Read `AGENTS.md`, `docs/rooms/parallel-fidelity-work.md`, the room brief and its
> latest handover. Start from current main in your own worktree and
> `codex/[room]-paper-fidelity` branch. Record the base commit and file ownership.
> Show a few compositions, including the maximum board, before implementing the
> selected direction. Keep the room cosy or grand as its setting requires, with
> clear board geometry, grounded characters and working postal life.
>
> Work in room-owned source, assets, tests and study files. The integration chat
> owns shared renderer/build/bridge/interface changes and final integration;
> propose any shared changes there. Leave other rooms, canonical rules/content,
> accepted Office work and native code untouched. Deliver a playable study and
> evidence for review. Do not merge or publish unless I explicitly authorise it
> in this chat; coordinate any preview prefix with the integration owner.
