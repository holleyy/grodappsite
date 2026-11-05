# Material motion and interruption

`motion.json` records the current prototype values and source files. Treat them as the accepted reference rhythm, with native projection/lighting to be qualified against the remaster. UI animations never advance rules, award progress or decide when a campaign scene is finished.

| Material / gesture | Current reference | Reduced motion / interruption |
| --- | --- | --- |
| Envelope flap |310ms;178°→−3° at87%→0°, pivot at flap crease |Set the usable open pose immediately |
| Envelope front |390ms; skewX−0.7°→+0.4° at65%→0° |Keep addressed text on the paper plane; no flex when reduced |
| Invitation photograph |Delay 140ms +410ms; slide from pocket 86% to 0%, rotation 1°→−3°; no skew |Photograph remains rigid and inspectable |
| Photograph lift |390ms; first 18% takes weight/lifts 9 CSS px in the reference viewport while retaining source thumbnail scale, then transports to held size |Do not create a second interactive copy |
| Place previous print |310ms to the measured viewed pile; shadow lowers at contact |Retain coat identity/face; remove temporary departure copy |
| Draw next print |Delay 85ms +330ms from its actual source/pile |Deep-pile retrieval must not appear to come from the box |
| Turn photograph |440ms, cubic(.35,.08,.28,1), rigid rotateY0°↔180° |Keep the same print object and active accessible face; do not bend it |
| File photographs |290ms to a visible slot; gather held print and viewed pile |Reveal target slot before return; clean up clones on interruption |
| New arrival |260ms;−9px/−12°→0px/−8° |Arrival status is presentation-only; inspecting it cannot change collection progress |
| Case open |520ms;180°→75° at73%→62.5°, bottom-centre hinge |Resume from elapsed time when progress loads; early selection remains available |
| Case close / cancel close |300ms to 180°; cancelled departure returns toward open in 180ms |Latest handling invalidates queued dismissal/service callback and clears retained closing transforms |
| Delivered envelope |460ms;22px/28px slide and small flex to rest |Only physical letter moves; controls remain reachable |
| Applied postage paper |280ms; lift 11px and slight skew at contact, no spring |Stamp start delays 310/430/540ms relative to result entry |
| Cancellation ink |Delay 850ms +80ms; opacity at contact, no translation/scale |Final ink appears immediately when reduced |
| Delivered envelope turn |650ms, cubic(.2,.7,.2,1), rotateY0°↔180° |Preserve full note-paper bounds through the outgoing face |
| Note flex |Delay 140ms +310ms;12px slide/skew−0.8°→+0.35°→rest |Controls remain outside the paper; finish before another turn |
| HUD state feedback |180ms on real count/next/home changes |Stop during tactical Pause, frozen state or reduced motion; no endless pulse |
| Office ginger |Finite1560ms, eight drawn poses; no perpetual idle loop |Tap replays; hidden/covered scene and reduced motion settle/rest and stop work |

Most PaperMotion gestures use cubic(.2,.75,.25,1); lift uses(.25,.55,.25,1); lid open(.25,.55,.3,1); close(.4,.12,.65,1). Exact existing values are in JSON and source, including individual keyframe offsets.

## Cat timeline and source registration

Poses:0ms rest0;120ms wake1;260ms reach2;380ms stretch3;650–1050ms hesitate4;1050ms draw back5;1210ms curl6;1380ms settle7;1560ms rest0 and stop. These are drawn atlas poses, not a scale animation of a whole illustration. No named character/unlock is introduced.

Let `s=max(viewWidth/sourceWidth, viewHeight/sourceHeight)`. Centre crop offsets are `(viewWidth−sourceWidth*s)/2` and `(viewHeight−sourceHeight*s)/2`. Sprite frame width is200*s; position so its anchor(340/512,390/512) lands at the wide or portrait sack source contact from visual-system.md. Background and sprite must share the exact cover transform. A viewport resize may select the other source plate; no duplicate baked cat may remain underneath.

## General interaction rules

1. Own gesture lifetimes by object and navigation generation. A completed animation from an older visit must not close/reopen a newer screen or start Night Shift.
2. On a new intent, measure the current pose, invalidate old completion callbacks, clear retained transforms, then move toward the new valid pose. Finish/cancel temporary copies without losing filed/held/pile membership.
3. Accept a still-current progress response even while the case is closing; defer its render if necessary. A cancelled departure must leave that loaded progress usable. Stale requests from an earlier visit must be ignored.
4. Invisible scenes do no animation work. App backgrounding freezes the game via its lifecycle API and cancels/suspends UI gestures. Returning exposes a valid resting interface and a visible paused board where appropriate.
5. Combine system and user reduced-motion preferences. Respond to preference changes during gestures, rather than only checking at launch.
6. Keep photographed cats still. Put observed humour in deliberately placed artwork: White's intruding tail, the chewed inside label, the 1–4 trolley occupant and one note-edge impression.

Native sound/haptics are a later coordinated finish. The web prototype has simple oscillator/vibration feedback and toggles; it does not contain a designed paper/photo/hinge/ink audio library. Do not infer sample assets or a native haptic pattern from these placeholders.
