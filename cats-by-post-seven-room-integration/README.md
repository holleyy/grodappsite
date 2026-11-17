# Cats by Post web game

The accepted independent interface over the canonical 100-level game and six approved fidelity presentations. Start at `index.html` through a local server or the published review URL. For local use, run `python3 -m http.server 8790` at the repository root, then open `http://127.0.0.1:8790/web/`.

Rebuild with `python3 tools/build-web.py --check`. The canonical `sorting_office.html`, its source and the pre-fidelity archive are immutable inputs to this integration. The builder checks the pinned legacy hash, preserves its game/palette data and composes explicit production render hooks, room-scoped assets and the game/interface bridge.

- `journey/`: independently editable accepted office, letters, map, packets, menus and photo box; no game rules or raw simulation save authority.
- `assets/`: locally hosted approved free fonts/licences and UI artwork.
- `game/engine.html`: generated canonical engine plus presentation hooks and bridge.
- `rooms/`: generated final accepted presentation code/assets, decoded one room at a time.
- `interface-provenance.json`: original imported UI file hashes; adapted source files remain identifiable.
- `build.json`: canonical baseline, current web build and frozen room/bundle hashes.

Progress remains `catsByPost.progress` v5. The web session, navigation, seen photographs and preferences use independent `catsByPost.web.*` keys. Old interface studies are not imported. Run restore belongs to the engine's versioned session codec; the UI never restores a raw `gm`/trace/progress snapshot.

The interface presents the canonical chapter and ending controllers. A result envelope does not freeze settlement. Actual menu/navigation/background suspension is separate from precision Pause. Creator: Alex Holley.

Browser captures and emulated phone layouts do not qualify physical iPhone15/17Safari, total peak memory, frame pacing, thermal or battery behaviour. See the integration handoff for actual verification and remaining hardware work.
