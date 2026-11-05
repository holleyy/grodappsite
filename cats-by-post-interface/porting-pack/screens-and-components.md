# Screens, state and reusable components

These behaviours are accepted prototype references. Native implementations should reproduce their purpose and object handling without reproducing browser frame/DOM structure.

## Journey

Office → current envelope → selected letter → setup → running ↔ tactical Pause → settled delivery correspondence → next envelope or Map. Menu is an explicit interruption; it is separate from tactical Pause. Map → place → chapter packet → letter provides a direct route to any available delivery. The photograph box and services return to their recorded origin.

| Surface | Required states and actions | Return / persistence |
| --- | --- | --- |
| Office/main menu | First letter; next ready; unfinished arrangement; resumable service; all currently posted. Main envelope is the primary action. Places, Today’s post, Night Shift, box and Settings remain distinct. | Main menu saves/suspends the current route. Returning resumes the same arrangement. Prototype-only study switcher is not product UI. |
| Places map | Current place, reached/unreached destinations, pan/zoom, direct place index, Home/current place, next/continue envelope and box. Place labels remain readable during camera movement. | Retain camera on same-place return. A genuine destination change recentres while retaining intended zoom. Extents can grow. |
| Chapter packet | Destination print, place progress, chapter tabs, posted/current/available/locked letters; direct Continue. Six places contain eight packets; 100 deliveries stay in lists. | Selecting/previewing another letter does not silently replace the active route. Return to same place/packet/scroll context. |
| Letter invitation | An actual level photograph emerges from an addressed envelope. View photograph, start/open letter, browse packet. Title, level reference and concise puzzle facts remain live text. | Photograph inspection returns to the same letter. Starting a different unfinished route requires explicit game-owned replacement behaviour. |
| Setup | Stock/selection, Undo availability, hatch previews, camera, precise placement, Menu and Send. | Opening queues or precise placement keeps the board available. Store arrangement through approved engine session API. |
| Running | Current/next arrivals, remaining per hatch, home count, zero stock chips, stable Pause and Cancel. Story preserves hatch-local order; Night Shift shows global order. | A manual camera stays steady when stock collapses or Pause changes to Resume. |
| Tactical Pause | Visible editable board; stopped simulation; Resume in same place. Placement/rotation/Undo remain subject to game locks at the current rule instant. | No automatic resume after inspecting arrivals. Menu close restores prior pause state unless background/system interruption requires a paused return. |
| Delivery complete | Addressed delivered envelope; earned stamps; destination cancellation; reverse note with concrete award details; next envelope, Map and Watch the cats. Replays do not move the journey backwards. | Wait for campaign permission to show/advance. Watch returns to finished room. Preserve actual chapter/finale ownership. |
| Photograph box | Loading/error, open case, filed coat slots, tucked new arrival, held print front/reverse, persistent viewed pile, filed return and closing. | Selecting/turning cancels a queued departure. Retain accepted progress arriving during a cancelled close. Restore originating control/focus. |
| Today’s post / Night Shift / Practice | Their existing game-owned selection/setup/run/result/tea/break states and real mode-specific continuation. | A service’s Next stays in its service. Main menu and Map exits preserve the appropriate game session. |
| Menus/settings/help | Useful current-route ticket, routes and utilities, readable Night Shift hover state, typography/contrast/reduced motion, help and precise placement entry. | Modal Menu suspends play; it does not redefine tactical Pause. Settings need whole-interface propagation in the port. |
| Ending/credits | Campaign settlement → chapter/finale presentation → thank-you/Alex Holley credit → clear replay/postgame choices. | This surface remains to be finished against campaign lifecycle; the old lab does not prove it. |

## Component inventory

| Component | Independent presentation state | Reference source |
| --- | --- | --- |
| Office composition / CurrentEnvelope | Visit/current route, material geometry, accessible action names | `start.html`, `start.css`, `start.js` |
| MapSurface / PlaceLabel / CorrespondenceDock | Camera and selected place, projected progress read-only | `journey.js`, `map-surface.css` |
| PacketHeader / ChapterTabs / DeliveryRow | Posted/current/locked state; fixed columns and reserved selection rail | `menu-system.css`, `journey.js` |
| LetterPocket / LevelPrint / PrintInspection | Front/flap/photo layers and inspection origin | `letter-insert.css`, `paper-motion.js` |
| ArrivalLane / HatchKey / ArrivalTabs | Expanded/active hatch; queue data remains game-owned | `play/hud-model.js`, `play/hud.js`, `play/hud.css` |
| StockTray / RunControls / PrecisionTools | Selection, expanded precision, layout insets; command eligibility from game | `play/hud.js`, `play/app.js` |
| DeliveryCorrespondence / EarnedPostage / NextEnvelope | Front/reverse, selected award note, destination identity | `play/completion.js`, `play/completion.css` |
| PhotographCase / HeldPrint / ViewedPile | Coat identity, face, physical file/pile membership; progress read-only | `company-box.js`, `photo-handling.js`, `company-model.js` |
| PostalIdentity | Place art and read-only chapter ownership | `postal-identity.js/css` |
| MenuRow / ServiceCard / PreferenceRow | Focus, press, disabled, selection and useful text | `menu-system.css` |
| OfficeGinger | Finite pose/replay, cover registration and visible/reduced lifecycle | `office-cat.js`, `start.css` |

Use stable identities for level, coat, held print and pile members. A view update must not replace a photograph just to turn it. Rendering a reusable component must never award a stamp, unlock a coat, mutate saved progress or start a simulation.

## Responsive composition

Phone: scene fills the available safe area; HUD above/below the board; letter/packet can occupy the view; photograph box becomes a physical source miniature beside the held print. Wider compact/tablet: reveal the map beside the letter/packet when content fits. Play always keeps one clear board, with a side rail for wide/short layouts. Desktop uses real hover/focus states, keyboard routes and a readable wider spread.

Prototype thresholds are references: map spread 740 CSS px; larger map pane 440px from 1100px; HUD rail from 1000px or 500px with height ≤600px. CSS has additional rail styling at 650px; the port must derive insets from measured controls rather than copying every override. Compact hatch tabs appear at height ≤450px or width ≤650px and height ≤650px. The box uses two columns from 740px unless short landscape needs the single table. These are content breakpoints, not device identity tests. Mini/Duo means a compact larger viewport here; no unannounced hardware dimensions or hinge assumptions are fixed.
