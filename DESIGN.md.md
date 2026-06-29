# Unicorn RPG — Living Design Document

A Pokémon-style, chibi-art creature collector built for local play, designed to be lightly educational (math + logic problem-solving) while rewarding real strategic thinking. Target player: a strategy-minded 9–11 year old. Built solo using Claude Code, Claude (planning), and Leonardo (art).

> This is a living document. Keep editing it as decisions change; it is the single source of truth and the spec to hand to Claude Code.

---

## 1. Core concept

Adventure across a small world taming chibi creatures, building a team, solving problems to find and tame more, and proving yourself in elemental battle Trials. Two intertwined loops:

- **Explore loop (educational):** solve math/logic problems to find and tame creatures. Fast, repeatable, low-stakes.
- **Trial loop (strategic):** 3-on-3 turn-based battles that gate progress and reward badges and signature creatures.

The design principle throughout: **the math lives inside the story and the strategy lives inside the type wheel.** No worksheet feels bolted on; no battle is won by raw numbers alone.

---

## 2. v1 scope

**In scope for v1:** unicorns only. One creature family keeps the art load manageable and makes every creature defined by just **element + stats**.

**Deferred to Phase 2 (expansion / unlock-style content):**
- Owlicorns and Pegasi as new families.
- Breeding and unique recolor variants.
- Achievements / unlock milestones.

Phase 2 is intentionally excluded from the initial build. See §17.

---

## 3. Elements & the type wheel

Five classic elements. Each beats exactly one and loses to exactly one — no element is safe, so a balanced team always beats a one-note team.

**The wheel (each beats the next):**

`Water → Fire → Air → Spirit → Earth → (back to Water)`

| Element | Beats | Loses to |
|---|---|---|
| Water | Fire | Earth |
| Fire | Air | Water |
| Air | Spirit | Fire |
| Spirit | Earth | Air |
| Earth | Water | Spirit |

**Flavor (lore only — not a mechanic in v1):** Fire reads aggressive, Air swift, Earth sturdy, Water calm, Spirit mysterious. In v1 these are personality/theming; combat is pure stats + the type multiplier (see §4). Role-based powers (heals, shields, buffs) are a possible later enhancement, not part of v1.

---

## 4. Combat model (v1)

Deliberately simple and readable: a single attack, an HP pool, and speed for turn order. No movesets.

- **Format:** 3-on-3, turn-based.
- **Stats per creature:** Heart (HP pool), Power (attack), Speed (turn order).
- **Turn order:** higher Speed acts first each round.
- **Damage:** `round(attacker Power × type multiplier)`, minimum 1.
- **Type multiplier** (based on attacker's element vs defender's element):
  - Advantage: **×2**
  - Disadvantage: **×0.5** (halved)
  - Neutral: **×1.0**
- Because the wheel is one-directional, an advantaged matchup automatically cuts both ways: you hit for ×2 while their hits into you land at ×0.5.

**The ×2 / halve pair is the master balance dial.** It keeps the combat arithmetic clean — doubling and halving are easy mental math — and leans hard into type-is-king. Nudge toward ×1.5 / ×0.5 later if you want stats to matter more in advantaged fights.

Battles happen at **Trials**, the **Champion** fight, and the ~25% of Explore encounters that are wild battles (§8). Quest rewards and the other ~75% of Explore use problem-solving, not battles.

### Battle presentation & interaction (all battles)

The combat *math* above is unchanged — this is how a battle looks and plays. Reference feel: Dragon Mania Legends — one living arena, not a sequence of pages.

- **One persistent arena, never a page-flip.** A single battle scene stays mounted for the whole fight: her 3 ponies on the **left facing right**, the 3 enemies on the **right facing left**, staggered into a shared space (not two roster rows). Sprites are larger with a gentle idle bob; HP bars attach to each pony and show **raw HP numbers**. There are **no intro / target-list / results pages and no "Continue to Round X" button** — everything happens inline on this one stage.
- **Events animate one at a time (animation queue).** The step-wise engine emits one event per action; the UI plays them sequentially — attacker lunges (or a projectile crosses the arena), the target flashes, a floating damage number pops, the HP bar drains — then advances to the next actor. This is the single change that turns a "results log" into a scene.
- **Round-based in Speed order** (player wins ties): on her pony's turn it glows with a "Your turn" cue; enemy turns auto-play after a short (~0.7s) beat.
- **Drag to attack, tap as fallback:** drag from the glowing pony across the arena to an enemy — a targeting arrow follows her finger and valid targets highlight. Tap-the-pony-then-tap-the-target also works and must fully complete a battle on its own.
- **Type telegraph while aiming:** a live preview at the target — *"Super! ~8"*, *"Weak… ~2"*, or neutral — teaches the wheel mid-battle and previews Power × multiplier.
- **Painless outcomes:** faints fade in place and are skipped; victory and defeat appear as an overlay **on the scene** (not a new page); defeat offers a free retry with gentle wording.

This screen is the template for **every** battle — Proving Glade now, and all Zone 2–6 Trials, the Champion, and Explore wild battles later.

**Engine note:** this requires exposing combat **step-wise** (next actor → apply one attack → event for animation) rather than resolving a whole round in a batch, so the UI can pause for her drag. The damage/type/Speed rules stay identical.

---

## 5. Stats & leveling

Stats are shown as **raw numbers** (intentional stealth math — she compares and adds them constantly).

**Formula:** `stat = base + growth × (level − 1)`

**Shared growth per level (identical for every creature):** +3 Heart, +1 Power, +1 Speed.

Only the **base** scales by tier. Because growth is shared, a higher-tier creature's lead is a *fixed* amount — so as both level up, the gap shrinks in relative terms. Early favorites never become useless; they become specialists.

**Base stats at level 1, by tier (tier = zone the creature comes from):**

| Tier (zone) | Heart | Power | Speed |
|---|---|---|---|
| 1 — Z2 Earth | 5 | 2 | 3 |
| 2 — Z3 Water | 7 | 3 | 4 |
| 3 — Z4 Fire | 9 | 4 | 5 |
| 4 — Z5 Air | 11 | 5 | 6 |
| 5 — Z6 Spirit | 13 | 6 | 7 |

**XP is granted from both winning battles AND solving Explore/quest problems correctly** — so doing the math literally levels her team.

**Worked example (both at level cap 8, entering Fire zone):** A tier-1 Earth starter vs a tier-2 Water creature, with Earth-beats-Water advantage:
- Earth at L8: Power 2+7=9, Heart 5+21=26 → hits for 9×2 = **18**
- Water at L8: Power 3+7=10, Heart 7+21=28 → hits for 10×0.5 = **5**
- Earth wins in 2 hits (18+18=36) despite being the lower tier; the Water would need 6 hits to grind through 26. In a *neutral* matchup the tier-2 would win on raw stats. **Element decides advantaged fights; stats decide neutral ones.**

---

## 6. Badge level caps

Earning a Trial badge raises the cap by 5, set to the top of the next zone. Level roughly equals 2× the current zone, so her level tells her where she is. This also stops any single creature from snowballing past the zone she's in, preserving the type puzzle.

| Badges | Level cap | Entering |
|---|---|---|
| 0 | 4 | Zone 2 (Earth) |
| 1 | 6 | Zone 3 (Water) |
| 2 | 8 | Zone 4 (Fire) |
| 3 | 10 | Zone 5 (Air) |
| 4 | 12 | Zone 6 (Spirit) |
| 5 | 15 | Champion / post-game |

---

## 7. World structure

**6 regions × 3 areas = 18 areas.** Zones 2–6 each focus on one element, ordered along the wheel so each zone arms the player with the counter to the *next* zone's Trial — the progression itself teaches the strategy.

| Zone (focus) | The 3 areas | Math level |
|---|---|---|
| **1 — Starter** (neutral) | Brindlewood Home → Sunflower Hollow → Proving Glade | 2-digit, no regrouping, one-step |
| **2 — Earth** | Pebblebrook → Mossgrove → Granite Hall | 2-digit with regrouping, 1–2 step |
| **3 — Water** | Saltspray Cove → Mistreef → Coral Sanctum | Mixed 2–3 digit, 2-step |
| **4 — Fire** | Cinderpath → Ashfall Camp → Magma Forge | 3-digit, 2-step |
| **5 — Air** | Windwhistle Pass → Cloudperch → Galecrest Spire | 3-digit with regrouping, multi-step |
| **6 — Spirit** | Whisperwood → Moonveil → Starfall Temple | 3-digit multi-step + extraneous info to filter |

**Progression check:** Earth(Z2) beats Water(Z3 Trial); Water(Z3) beats Fire(Z4 Trial); Fire(Z4) beats Air(Z5 Trial); Air(Z5) beats Spirit(Z6 Trial). She always walks into a Trial holding the counter she just earned.

**Movement:** node/map-token travel between connected areas (board-game / world-map style). No free-roam, no tile/collision engine in v1. Within an area: an "Explore" action plus NPCs/shop, not a walkable space.

### Zone 1 detail (the only zone giving 3 creatures) — M1 build target

**Character creation flow (Area 1):** she chooses her starter **pony first**, and its element is **revealed right after** as part of who that pony already is (colors telegraph the element, so the reveal feels natural — "of course the starry lavender one is Spirit!"). Elements are **fixed, not freely assigned** — this protects the balance design and keeps the unpicked four meaningful as rare Explore finds. For ownership without touching balance, she can **rename** her chosen pony and pick a **color accent** (mane tint / sparkle color).

**The five starters (she picks one; each is tier 1):**

| Pony | Element | Look & vibe |
|---|---|---|
| Marina Mist | Water | soft teal & seafoam; calm, gentle |
| Ember Spark | Fire | warm coral & gold; brave, bouncy |
| Sky Dancer | Air | pale blue & cloud-white; quick, playful |
| Stella Dream | Spirit | lavender & starlight; dreamy, wise |
| Meadow Bloom | Earth | leaf-green & sunny; steady, kind |

The other four become **rare Explore finds** later, keeping their natural element. (All names are original, not real My Little Pony characters.)

**Area 1 — Brindlewood Home:** the creation flow above, then a gentle tutorial quest — a **Math problem** (number entry). *Example (two-digit, one-step subtraction):* "Clover Dewdrop will trust you once you've set out the right number of clovers. She likes 38, and you've placed 15. How many more?" (38 − 15 = 23) → tames **Clover Dewdrop (Earth, tier 1)**, creature #2.

**Area 2 — Sunflower Hollow:** a **Story problem** (read the clues and choose the answer — no arithmetic). *Example:* "Tangerine Twirl's hoofprints lead to one of three sunflowers. She did NOT go to the flower on the left, and she did NOT go to the tallest. The flowers are: left (short), middle (tallest), right (medium). Behind which sunflower is she?" (Answer: right) → tames **Tangerine Twirl (Fire, tier 1)**, creature #3.

**Area 3 — Proving Glade:** a friendly 3-on-3 graduation battle vs rival **Pip**, whose team is Pebble (Earth), Wisp (Air), and Glow (Spirit), all tier 1 at level 3. Winning unlocks Zone 2. **No badge here** (badges start at the Zone 2 Trial); this is the tutorial battle that teaches the 3v3 and the type wheel at low stakes. Losing simply lets her retry.

Zone 1 uses one two-digit math problem and one short reading-logic puzzle (§9 ramp); retry/hint rules from §10 apply throughout.

### Zones 2–6 pattern
- **Area 1:** problem-solving quest → reward creature.
- **Area 2:** problem-solving quest → reward creature.
- **Area 3:** the **Trial** — a 3-on-3 battle vs the element Guardian. Winning grants a **badge** (raises level cap), the Guardian's **signature creature**, and unlocks the next region.
- After Zone 6's Spirit Trial: the **Champion** fight as the capstone / start of post-game.

---

## 8. Explore mode

The freedom valve that lets her build a *unique* team instead of being locked into zone order.

- Available in **any zone she has already unlocked**.
- **Problem-to-tame (75%):** solve a problem correctly → the creature is calmed and joins. Unlimited tries — a pure positive loop.
- **Wild battle (25%):** occasionally the encounter is a quick battle instead of a problem; win it to tame the creature. Kept low-stakes (retry freely) so it adds variety without punishing her.
- **Difficulty scales by zone:** re-exploring Zone 2 stays easy (safe confidence farming); exploring Zone 6 is hard. She picks her own challenge level.
- Each zone has a small themed **Explore pool** (~2–3 element creatures). Once caught, Explore still gives math practice and (later) feeds breeding.
- Splits the two pillars cleanly: **Explore trains math** (fast, repeatable), **Trials train strategy** (high-stakes battles).

---

## 9. Quests & problem types

Problems are **generated from rules, never stored as a fixed list** — a hand-written bank runs dry and kills replay value. Each encounter rolls a fresh problem, which is what keeps the learning loop alive across many play sessions. Three types, divided by where they live:

- **Worksheet-style equations** — used in **Explore** encounters. Fast fluency drills, high volume.
- **Story problems** — used in **zone quests**. An equation wrapped in narrative.
- **Logic / reading-comprehension problems** — also in quests. She must *read carefully and pick the correct answer*, no arithmetic.

Each zone pairs one **Math** problem with one **Story** problem (a reading/logic puzzle).

### Difficulty: one knob, fed by two dials

Difficulty is a single **effective-difficulty number** the generators read. It is set by **both** the zone and the player's level:

- **Zone sets the band** — its floor and ceiling (Zone 1 = two-digit territory; Zone 6 = three-digit multi-step).
- **Player level nudges within the band**, and once high enough, slightly past the floor of the next band. So a low-level player in a zone gets the easy end of its range; a high-level player replaying it gets the hard end.
- Formula (tune in playtest): `effective = zoneFloor + round(playerLevel × smallFactor)`, **clamped** so it can't shoot past the zone's intended ceiling or produce something age-inappropriate.

This is the seam the future **New Game+** plugs into (see §15): a leveled-up restart just applies a global level offset, every generator reads a higher number, and the whole game's math shifts up — no new content required.

### Math generator

Takes the zone's parameters — digit count, regrouping allowed (y/n), one-step vs two-step, operations (+/−) — and rolls fresh numbers within those bounds each encounter, then wraps them in a **rotating set of story templates** (e.g. "Clover needs ___ clovers, you have ___…", "the basket holds ___, ___ fell out…"). The math is always new and the flavor varies. **Must guarantee clean answers:** no negative results, subtraction is always larger − smaller, results land in-range.

Per-zone math bands (matching the §7 ramp):

| Zone | Digits | Regrouping | Steps |
|---|---|---|---|
| 1 | 2-digit | no | one-step |
| 2 | 2-digit | yes | 1–2 step |
| 3 | mixed 2–3 digit | yes | 2-step |
| 4 | 3-digit | yes | 2-step |
| 5 | 3-digit | yes | multi-step |
| 6 | 3-digit | yes | multi-step + extraneous info to filter |

### Story / logic generator

Genuine reasoning puzzles can't be infinitely generated as cleanly, so use a **pool of templates with swappable variables** — a deduction like "the pony is behind one of three flowers; not the tallest, not the leftmost" shuffles which attributes and which answer each time, yielding dozens of variations from a handful of templates. Build ~8–12 logic templates per difficulty band and shuffle through them.

### Anti-repetition

Track recently-seen problems (by a template/seed id) and don't repeat one until the pool has cycled, so she never gets the same question twice in a row — this is what makes it *feel* fresh, not just technically random.

---

## 10. Retry & hint rules (no failure state)

For quests and Explore problems — confidence first, always:
- Wrong answer → an **encouraging pop-up**, try again. **No penalty, no failure state.**
- On the **3rd wrong attempt** → a **scaffolded hint** that does one of: highlight the numbers that matter, restate the question in plainer words, or show the first step.
- She is **never locked out** and **never loses a creature** for getting an answer wrong.

(Battles can carry stakes; the math should always feel safe.)

---

## 11. Creature roster (v1, all unicorns)

Most of the roster is collectable in the wild — that's the core loop. Gyms/rewards/Champion are the seasoning.

| Source | Count | Notes |
|---|---|---|
| Starters | 5 designed (one per element) | She picks 1 from all five; the other 4 become **rare Explore finds** — no art wasted |
| Zone 1 quest rewards | 2 | Areas 1 & 2 |
| Zones 2–6 quest rewards | 10 | 2 per zone × 5 |
| Guardian signatures | 5 | Awarded on each Trial win (Zones 2–6) |
| Champion / legendary | 1 | Zone 6 finale |
| Explore pool | ~2–3 per zone (~12–18) | Collection backbone; ship small, expand post-launch |

**Fixed (non-Explore) total ≈ 23**, plus the modular Explore pool (which now includes the 4 unpicked starters as rare finds). Ship the MVP with ~12 and keep adding.

**Sprite-budget rule:** every evolution stage is another piece of art. Only let **starters and a few key creatures** evolve (2–3 stages); keep most wild creatures single-stage. That roughly halves the art load.

**Starter choice:** she picks from **all five elements** at character creation, so her opening creature can be any type; the two Zone 1 quest creatures round out early coverage.

---

## 12. Art pipeline (Leonardo, paid)

The creatures are all *different* creatures that must share one *art style* — so the right tool is **Style Reference (and Omni models / multi-image reference)**, NOT Character Reference. Character Reference is built to keep the *same* character consistent and is documented to work poorly on non-humanoid subjects like pets.

**Process:**
1. Generate one "hero" creature repeatedly until the exact chibi look is nailed — clean lighting, plain/transparent background, front-facing idle pose. This is the style anchor.
2. **Lock everything that drifts:** same model/preset, a **fixed seed**, and a saved **prompt template** with swappable slots, e.g. *"chibi [creature], [color] palette, [element] motif, front view, plain background, same art style."* Add negatives (deformed, extra limbs).
3. Feed the hero image into **Style Reference** (mid–high strength) for every new creature so they share its look.
4. Generate on a plain background, then **batch background-removal** (Photoroom / remove.bg / Leonardo's editor) and place all sprites on an **identical canvas size** so they line up in-game.
5. **Budget to cull** — expect to keep ~1 in 4.
6. Use **Image-to-Image at high image-weight** for evolution stages (and, later, breeding recolors) so the foal and adult stay recognizably the same creature.

---

## 13. Tech stack & architecture

**Guiding decision: no backend.** Single-device play for one child needs no database, auth, or server — which keeps everything outside paid tools on free tiers and avoids egress limits entirely.

- **Vite + React + TypeScript** — TS gives Claude Code a clear contract and catches bugs early.
- **Tailwind CSS** for styling.
- **Zustand** for game state (or `useReducer` + context to avoid the dependency).
- **Persistence:** `localStorage` save module + **JSON export/import** for backup. (Upgrade to IndexedDB only if saves outgrow it.)
- **PWA** via `vite-plugin-pwa` → installable on a tablet, fully offline.
- **Hosting:** free Vercel or GitHub Pages.
- **Art:** Leonardo → transparent PNGs on a fixed canvas → referenced by creature id from `/public` or `/src/assets`.

**Architectural rule — separate content from engine:**
- **Content as typed data files:** `creatures.ts`, `zones.ts`, problem rules/templates. Math problems can be procedurally generated from per-zone difficulty parameters plus a bank of story/logic templates.
- **Engine as pure functions:** battle damage/turn-order and the problem/retry logic are pure, unit-testable functions matching the formulas in §4–§5.
- This lets content grow without touching logic, and lets Claude Code test the combat math directly against the locked numbers.

**Suggested screens:** Character Creation, World Map, Area, Explore, Problem/Encounter, Battle, Party/Dex, Shop.

---

## 14. Build milestones (MVP-first)

Build Zone 1 end-to-end before anything else, with placeholder art (colored shapes/emoji). Prove the fun with her, then expand.

- **M0 — Skeleton:** project scaffold (Vite/React/TS/PWA), data types, save/load, navigation between a couple of screens.
- **M1 — Playable vertical slice (Zone 1):** character creation, pick companion, two problem-quests with the retry/hint rules, the Proving Glade 3v3 battle using the stat/type engine, a Party/Dex screen, `localStorage` save. Placeholder art. **Goal: a playable graduation to test with her.**
- **M2 — Full v1 content**, built in four ordered sub-stages, each ending in a clean build:
  - **M2a — Engine foundations ✅ DONE:** math/logic generator bands for Zones 2–6 (§9), plus XP/leveling and badge-based level caps (§5–§6). Pure, tested; no new screens.
    - **Math bands 2–6** in `src/engine/mathGenerator.ts`, routed by `bandForDifficulty` (`difficulty.ts`): band 2 = 2-digit w/ regrouping (1–2 step), band 3 = mixed 2–3 digit (2-step), band 4 = 3-digit (2-step), band 5 = 3-digit (2–3 step), band 6 = 3-digit (2–3 step) **with an extraneous number** the solver must ignore. A structured `buildMathSpec` enforces the §9 guarantees (no negative answer or intermediate step, subtraction always larger − smaller, answer in the band's digit range, internally consistent multi-step); a rotating themed renderer wraps the numbers in prose. Band 1 (Zone 1) is unchanged.
    - **Logic bands** in `logicGenerator.ts`: scale with difficulty — 3 options/2 clues (bands 1–2), 4 options/3 clues (bands 3–4), 5 options/4 clues (bands 5–6). `buildLogicPuzzle` emits one clue per wrong option so the stated answer is always correct **and unique** by construction.
    - **XP/leveling** in `leveling.ts`: `XP_PER_CORRECT_ANSWER` (20) and `XP_PER_BATTLE_WIN` (50); `addXp` levels a creature via the §5 formula and recomputes stats; level is **clamped at the §6 badge cap** (0→4 … 5→15) while XP keeps accumulating past it. Wired into the store (`awardXpToParty`) and awarded on correct quest answers (both Zone 1 quests) and on the Proving Glade victory; persisted via the existing save system. `partyLevel` (party's highest creature level) still feeds `effectiveDifficulty`.
    - Tests: `mathBands.test.ts`, `logicBands.test.ts`, `leveling.test.ts` (existing `generators.test.ts` still green) — 93 tests passing, `npm run build` clean.
  - **M2b — Zone content/data:** all five zones as typed data — area names, quest reward creatures, Guardians, signature creatures, Trial teams, Explore pools, creature tiers.
  - **M2c — World map + Trials:** the 6-region node map (locked/unlocked), two generated quests per zone, Trial battles granting badge + signature + next-zone unlock, and the Champion fight.
  - **M2d — Explore mode:** problem-to-tame with the 25% wild-battle chance, themed pools, rare unpicked-starter finds, feeding XP.
  - Then swap in real Leonardo art across the finished world.
- **M3 — Polish:** balance tuning (the 1.5/0.5 dial), audio, save backup UX, content top-ups to the Explore pool.

---

## 15. Phase 2 (deferred — not in initial build)

Framed as expansion / unlock-style content once v1 is proven and loved:
- **Owlicorns and Pegasi** as new families (new art, family-specific flavor).
- **Breeding:** offspring inherit element from parents; the "unique variant" payoff is a **palette swap** (e.g. Starlight or Shadow coloring), so it adds depth with near-zero new base art.
- **Achievements / unlock milestones.**
- **New Game+ (leveled restart):** on beating the game, offer "start over (same difficulty)" or "start over (harder)." The harder mode applies a global level offset that every problem generator reads (§9), so the math scales up automatically with no new content. Assign levels that keep problems getting incrementally harder as she progresses.

### Combat turn-order refinements (revisit when next touching battle)

- **Bug — Speed isn't ordering turns:** right now her whole team always acts before the enemies (bottom-to-top), which means the Speed stat isn't actually deciding order. Fix so turn order interleaves both teams by Speed (player wins ties), per §4.
- **Choice — let her pick which pony acts:** she currently can't choose her attacker; it's forced bottom-to-top. She should be able to attack with any ready pony in any order. Recommended rule: let her choose the order *among her own ponies*, while Speed still governs when enemy turns interleave and breaks ties — this preserves Speed's meaning while giving her the agency to drag whichever pony she wants.

---

## 16. Resolved design calls

- **Wild battles in Explore:** yes — **25%** of Explore encounters are a quick battle instead of a problem (win to tame); the other 75% are problem-to-tame.
- **Unpicked starters:** reappear as **rare Explore finds**.
- **Starter choice:** she chooses from **all five elements**.
- **Type multiplier:** **×2 / halve** (clean combat arithmetic, type-is-king); revisit toward ×1.5 / ×0.5 in playtest if stats should matter more in advantaged fights.
