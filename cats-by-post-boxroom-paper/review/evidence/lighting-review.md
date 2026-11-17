# Final lighting and resident visual review

The frozen polish was independently inspected in all four architecture renders (5×4 and 10×8, day/night) and the enlarged contact crop. Narrow carton contact fades, wall-floor occlusion and window reveals add depth without washing away oak, kraft or teal. No new geometry, painter-order or resident-contact defect was observed in those inspected images. The accepted Office still provides a richer ornamental reference; these fixtures demonstrate the corrected implementation and do not establish equal quality by test count.

## Captured evidence

- `lighting-sheet.png`: an HTML/browser-rendered contact sheet of twelve scenes, not a composited or retouched image. Individual 1440×1100 captures remain beside it.
- `residents.png`: an HTML/browser-rendered comparison of day/night contact sheets, all eight coats across twelve synthetic residents. Red dots mark the exact sole coordinates.
- `manifest.json`: exact SHA-256 hashes for pinned modules, source assets, canonical generator dependencies and fixture/harness files.
- `report.json`: canonical dates, light sets/vectors, lamp counts, weather, bounds, cache bytes, sole coordinates and remaining opaque resident pixels.

All fixtures use seed303 and the 5×4 board. Weekdays are 2026-11-16 through 2026-11-22. Free play/night is 2026-11-17. Seasonal dates are summer2026-07-17, winter2027-01-15, December2026-12-20 and spring2027-04-14. Lighting scenes use eight synthetic collection entries; resident contact sheets use twelve. No save, progression or player collection was read or modified.

## Results

Twelve lighting captures and two resident captures completed with zero JavaScript/HTTP errors. Every resident retained visible opaque pixels. Exact feet coordinates were invariant across all twelve weekday/season cases, and across the twelve-resident day/night pair. All twelve cases have identical scene bounds. The owned Chromium browser was closed after capture.

The sheet visibly shows weekday sunlight direction changes, the weekend/night pendant, the summer open rooflight, December bunting/string and the unlit April floor on its canonical rainy date. The night bench remains warm while the roof and unlit cartons remain cool. The refreshed contact sheet shows paws seated on support tops, bed rims hiding the correct lower pixels, and foreground cartons masking lower residents rather than sprites floating over them.

## Limits visible in the evidence

The day-town backdrop is shared across the four seasonal cases, including the rainy April date. Seasonal differences here are room dressing and light changes, not four fully seasonal landscapes. Winter snow is a narrow apron detail and modest at full-room scale. These captures render prepared scene layers and a fixed resident animation sample; they do not run the live precipitation pass or prove rain animation. The spring room has canonical `light.sun=true` but rain suppresses the projected sun patches, so the source flag must not be described as visible sunlight.

These are pinned synthetic art fixtures, not actual gameplay, touch, physical Safari or iOS verification. Parent integration QA owns those claims.
