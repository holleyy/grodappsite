# Cats by Post · Interface porting pack

5 November 2026. A handoff for the accepted interface, ready to accompany the Swift/Metal port after the fidelity remaster has an accepted integration target.

Start with `index.html` for the illustrated guide, then read the documents below. If your browser restricts local files, run `python3 serve-pack.py` from the extracted folder and open `http://127.0.0.1:8769/`. The viewer binds only to loopback and needs no internet connection. Download and extract the guide ZIP first. It includes these documents, inventories, fonts/icons/licences, selected source files and a safe campaign index. Run `python3 fetch-artwork.py` inside that folder to download and verify the companion artwork archives, or extract all companions into the same folder manually. The fetcher preserves modified files and can resume by rerunning. `file-manifest.json` records the exact included files and SHA-256 hashes. Original high-resolution generated PNGs are identified in provenance but are not bundled. The public set is split into small ZIPs to fit the publishing connector; the build tool also produces `.porting-pack-complete.zip` locally.

| Document | Use |
| --- | --- |
| `screens-and-components.md` | Screen journeys, states, reusable components and return behaviour |
| `visual-system.md` | Colour/type/spacing, material geometry and responsive rules |
| `motion-and-interaction.md` | Current timings, pivots, interruption and reduced motion |
| `game-interface-contract.md` | Ownership and a proposed native contract, separate from current APIs |
| `port-order-and-acceptance.md` | Work before/after the remaster merge, test scenarios and open decisions |
| `assets.json` | File hashes, dimensions/alpha, role/status, source provenance and bundle paths |
| `tokens.json`, `motion.json` | Machine-readable reference values; not a completed native theme |
| `contract.schema.json`, `contract-examples.json` | Proposed snapshot examples; illustrative, not a game implementation |
| `campaign-index.reference.json` | Pinned 100-level metadata only, with no solutions |

## Reference checkpoint

- Local prototype source: `ad18f69` (ginger tap fix deployed; current worktree before this pack).
- Public prototype: `bf233c65fbf1d6fb2811bcaa350b5faff76318a8`, Pages run 42004376394.
- Main menu: https://holleyy.github.io/grodappsite/cats-by-post-interface/journey/start.html?v=ginger-26
- Map/letters: https://holleyy.github.io/grodappsite/cats-by-post-interface/journey/?v=materials-25
- Photograph study: https://holleyy.github.io/grodappsite/cats-by-post-interface/journey/?study=photographs&show=box&v=materials-25
- Responsive comparison: https://holleyy.github.io/grodappsite/cats-by-post-interface/journey/layouts.html?v=materials-25

The UI study contains the old 40-level runtime, Git blob `481ccb6c672e032ac94659ed5190bcd25918517c`. The campaign reference describes 100 levels in six rooms/eight chapters at functional commit `4c4ddfc629b22e120e81051e98c06e4cd33a279f`, build `9d960251a0`. Those are pinned checkpoints, not a claim about today's main branch or acceptance of remaster work.

The remaster supplies final room/gameplay art and rendering budgets. The campaign owns rules, progress, collection, settlement, chapter/finale timing and safe advancement. This pack owns how that truth is presented. It does not merge or migrate either project.

## Fixed design decisions

No eyebrow headers. The board stays legible and available during tactical Pause. Keep Send/Pause/Resume in a stable location; Cancel keeps the arrangement and attempt accounting. The map extends behind correspondence with no fixed decorative page edge. A packet contains many letters; the map represents places rather than 100 level dots. Photographs belong to a box, with a real held print and viewed pile. The collection is organised by coat; named individuals remain future work. Use purposeful copy, readable icons and a few carefully drawn cat disruptions. Credit Alex Holley.
