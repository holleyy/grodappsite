# Sorting Office landscape review

Validated on 17 November 2026 against web build `web-544ff635bdc3` and the rebuilt standalone study, with no injected CSS.

Standalone SHA-256: `2a50dcc544ae6aa6315f60bf6ac6ad6a6f941fb38ebef22313cc1db8ff1b8244`.

## Changes

- The study's short-landscape sidebar now shows the level picker, all three inventory types, Hint, Reset, Send and Watch together. Previously later portrait CSS capped the sidebar and the action row wrapped, clipping Send at 568×320 and 852×393.
- Office chapter letters use compact spacing and a shared action row below 420px landscape height. The introduction's secondary action previously fell below the 568×320 viewport. This override is scoped to Office correspondence.
- The board projection, gameplay rules and touch mapping are unchanged.

## Verification

`node tools/check-office-landscape.cjs http://127.0.0.1:8897/`

122 records passed with no browser errors:

- All 15 Office deliveries solved in both the standalone study and normal game UI at 568×320, 852×393 and 1024×768: 90 deterministic wins and 1,788 cell-centre picking checks.
- Real touch events place and turn a route on each surface. Placed and running routes retain their state through portrait → landscape → portrait; every board remains within the available scene bounds.
- Study controls and the normal game tray, primary action and arrivals remain reachable. Game board targets stay clear of the HUD.
- Introduction, demonstration, growth and departure letters keep their actions visible. Returning through the real letter button restores the playable board framing.
- Reduced motion holds the scenery while the delivery clock advances.
- Separate live-animation runs on both surfaces rotate during a delivery, preserve the route, continue their clocks and reach a win without manual simulation stepping.

The full JSON report is generated at `work/office-paper/worker-landscape/landscape-report.json` (local diagnostic output).

## Screenshots

| CSS viewport | Study | Normal game | Office letter |
| --- | --- | --- | --- |
| 568×320 | [Study](landscape-study-small-phone.jpg) | [Game](landscape-host-small-phone.jpg) | [Introduction](landscape-host-intro-small-phone.jpg) |
| 852×393 | [Study](landscape-study-phone.jpg) | [Game](landscape-host-phone.jpg) | [Demonstration](landscape-host-demo-phone.jpg) |
| 1024×768 | [Study](landscape-study-tablet.jpg) | [Game](landscape-host-tablet.jpg) | [Departure](landscape-host-exit-tablet.jpg) |

[Before: smallest study sidebar](landscape-before-study-small.jpg) · [After: return from letter](landscape-host-return-small-phone.jpg) · [Explore office](landscape-study-explore-phone.jpg)

These checks use Chromium touch emulation and CSS viewport resizing. They establish web-layout and input confidence; they do not constitute physical iPhone/iPad Safari, browser-chrome/safe-area or native TestFlight orientation testing.
