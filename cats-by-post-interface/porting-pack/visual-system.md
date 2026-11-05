# Visual system and materials

The interface is a coherent set of postal objects placed in a room. Keep illustration and typography together on their material plane. A box label belongs to its lid; a cancellation belongs to postage; a photograph has a paper mount, a stiff face and a reverse. Utility menus can be quieter while retaining the same lettering, ink and precise spacing. No eyebrow headers, generic dashboard cards, redundant headings or decorative copy without a job.

## Reference tokens

`tokens.json` preserves separate existing map, play, office and menu scopes. Their small colour differences are intentional source facts; they are not silently collapsed into a new theme. Native semantic names can reference these values while future palette reconciliation remains explicit.

| Role | Existing value / behaviour |
| --- | --- |
| Map paper / ink / rust | #F5ECD7 / #273F43 / #9F4434 |
| Play paper / ink / rust | #F7EED9 / #283D44 / #A63F32 |
| Office title / address ink | #F9E9C5 / #294449 |
| Menu wash / rule / focus | #EEE2C7 / #C8B99A / #A14433 |
| Default menu inset / gap |16/14 CSS px;14/12 at width ≤360px |
| Navigation row |32px icon + flexible text +20px trailing column; minimum 72px height |
| Delivery row |46px number + flexible title +22px state; minimum 92px; number 40px at compact widths |
| Place index |72px art + flexible text +20px trailing; art 56px compact; minimum 100px height |
| Interaction target |At least 44 CSS px in reference; native at least 44points; larger text may increase rows |
| Selection |Reserved 3px rail/underline; it must not alter number/title alignment |

## Fonts and native registration

All five shipped font files are included unchanged with their OFL notices. Primary: Balthazar display, Signika controls/body, Grape Nuts handwriting. Della Respira and Grenze are selectable prototype display alternatives, not new canonical directions. Values below were read from each actual TTF name table.

| File / browser alias | Actual PostScript name | Porting detail |
| --- | --- | --- |
| `balthazar.ttf` / Balthazar |Balthazar-Regular|Static Regular; headings and postal display |
| `signika.ttf` / Signika |Signika-Light|Static file with a naming/weight mismatch: family/PostScript says Light, but OS/2 weight is500. Use the recorded face, compare native rendering, and do not assume a separately bundled 600/Semibold exists. |
| `post-hand.ttf` / PostHand |GrapeNuts-Regular|Grape Nuts Regular, Latin subset. Register the real name; PostHand is a CSS alias. Keep navigation/scoring information available in accessible text. |
| `della.ttf` / Della |DellaRespira-Regular|Static face named Regular, OS/2 weight 500; optional display preference |
| `grenze.ttf` / Grenze |Grenze-Regular|Static face named Regular, OS/2 weight 600; CSS also requests600. Register this exact file rather than guessing Grenze-Semibold. |

Use text roles and Dynamic Type relative scaling, then compare actual wraps against references. Handwriting is for correspondence, not small numerical counters. Hatch IDs/counts use Signika, lining/tabular figures, with a clear distinction between hatch number and waiting count. Keep titles/addresses as real text, not baked into a new illustration. Engraved postmarks and the approved case label are intentional artwork; supply accessible names alongside them. Font files cover the current English prototype; broader language coverage needs qualification.

## Asset geometry

Keep delivered file dimensions/alpha from `assets.json`. Do not crop transparent margins without updating anchors. Decode colours/alpha consistently and preserve fine paper edges. WebP is the reference delivery format, not a mandate for native texture storage. Convert/import into the native asset pipeline with explicit scale, colour space, premultiplication, decode memory and mip/atlas choices owned with fidelity. Do not copy the legacy renderer's palette constraints into UI artwork without an agreed requirement.

Photograph mount aspect 1090/1244. Its square photo window is left 9.54%, top 7.88%, width 80.73%; name stays on the lower mount. Open case uses the 1007/1561 layout ratio, well left 10.92%, right 11.52%, top 33.95%, bottom 8.84%. The chewed export is 1000×1550; preserve the established proportional layout. Hinge line is 29.1% of full case height; lid plane 67%, origin bottom-centre, top−37.9%, open 62.5°, closed 180°. Inner texture is the top 28.5% of the case art. Base and brass hardware remain stationary. These are prototype geometry, not final native lighting/thickness specifications.

Postage sheet: 1774×887. Delivered/Tidy/First post source view boxes are `[20,70,576,752]`, `[600,70,578,752]`, `[1180,70,576,752]`. Keep original source pixels; do not redraw a generic rectangle stamp. Note/paw and trolley additions are rare1–4 observations, not repeated branding. White's portrait uses `observations/white-tail.webp`; the original White file is superseded in active display.

The office uses wide 1536×1024 or portrait 1024×1536 clean plates and a separate 2048×1024 ginger atlas, 4 columns × 2 rows of 512px. Source anchors: wide(730,548), portrait(489,829), frame size 200 source pixels, sprite anchor(340/512,390/512). Apply the same centred cover transform as the background. The cat is the only moving layer there; printed coat portraits stay still.

## Accessibility and finishing

Names must express action/status without relying on colour, handwriting or animation. Announce queue changes selectively; do not read every simulation tick. Trap focus only in actual modal menus, restore origin when closing, and respect keyboard/pointer/controller changes. Larger text, high contrast and reduced motion must propagate across office/map/box as well as play; the current prototype does not prove consistent whole-app preferences. Every object needs idle/hover/focus/pressed/disabled/loading/interrupted checks: the ginger bug came from a shared hover background shorthand erasing its sprite image.
