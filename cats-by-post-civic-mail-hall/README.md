# Civic Mail Hall · life study 04

Explore: https://holleyy.github.io/grodappsite/cats-by-post-civic-mail-hall/?v=life-04&view=hall

The papercraft hall now surrounds the accepted playable board: arched windows, terracotta walls, teal columns, a supported sorting gallery and staircase, glazed roof bays, an oak counter, red/blue cubbies and a canal setting. The loading quay connects around the wall to the rear entrance. All structural faces share the board projection. Generated flat artwork supplies material texture and registered decorative fronts.

Cat revision 04 fills all 30 sorting cubbies (15 ginger, 15 blue) with full sitting, crouching and sleeping cats. The desk now uses a complete sitting cat, with paws and a contact shadow on the countertop.

## Try it

**Explore hall** fits the complete structure; **Play this room →** or **Board** restores the playable view and controls. Construction guides start off. **Reference** shows the chosen architectural concept.

Choose a delivery, place/rotate turntables and **Send the post**. **Watch this delivery** fills its stored solution and starts the run. Plain tables turn both coats; striped ginger and dotted blue tables only turn their matching cat. Hint collars stay locked. **Motion off** stops decorative motion while delivery actions remain readable.

All 15 original Office deliveries retain their rules, inventory and 300 ms cadence. The accepted flat board, centred launch/turn arrows, cats, carriers, baskets, hatch actions and dog reactions are preserved. The hall has one fixed footprint for all board sizes.

The gallery cat now rests on the deck behind its railing. All 30 cubby cats breathe and occasionally wake or turn at different times; the desk cat also stirs. A grounded postal helper checks a manifest beside its trolley. Reflections move gently, and a parcel boat cruises, docks and returns along the canal. These routines are deterministic and share the scenery clock; Motion off and reduced motion freeze them without changing deliveries.

Physical iPhone/Safari and Swift/Metal performance remain unverified.

## Offline and source

Unzip `civic-life-04.zip` and open **Civic Mail Hall life 04.html**. The page needs no services, accounts, fonts or external assets. Canonical saves remain untouched.

Extract `civic-life-source.zip` into an empty folder and run:

```sh
python3 studies/civic-mail-hall/foundation/build.py
node --test studies/civic-mail-hall/foundation/*.test.js
```

The `vendor/` snapshot pins the tested Office rule, trace, level and oracle inputs so a checkout and standalone source archive rebuild identical HTML. Generation prompts, crop metadata, provenance and runtime WebP assets are included. The six original PNG masters are supplied separately in `civic-architecture-art-masters.zip`; extract it into the same folder only if you want to repack artwork. Python3/Pillow is needed only for that repacking step. The two source packages keep each upload below the service's 16 MiB request limit. `assets/acting-README.md` distinguishes authored animation components from transformed transitions.

Static architecture bakes after all assets load into a base and small shelf/rail occluder patches. Layout and materials remain immutable during play; explicit `architecture.bake()` rebuilds the cache if future tooling replaces those inputs. Switching cameras or deliveries does not rebake it.

`verification.md` records checks and limitations. Earlier `civic-perspective-foundation.zip` and `civic-pieces-02.zip` retain their accepted checkpoints. Canonical game, native code, other rooms and Lantern Quay remain unchanged.
