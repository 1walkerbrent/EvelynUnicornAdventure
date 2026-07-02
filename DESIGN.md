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

Five classic elements with an **asymmetric** type system: offense and defense run on different wheels, so the element you attack with is not the same as the element you must *resist*. This breaks the "one right answer" lock and makes team-building genuinely two-dimensional.

**Offense wheel — deals ×2 damage TO the next element:**

`Water → Fire → Air → Spirit → Earth → (back to Water)`

**Defense wheel — takes ×0.5 damage FROM (resists):**

Each element resists the element **two steps behind it** on the attack wheel.

| Element | Hits hard (×2) | Resists (×0.5 from) |
|---|---|---|
| Water | Fire | Spirit |
| Fire | Air | Earth |
| Air | Spirit | Water |
| Spirit | Earth | Fire |
| Earth | Water | Air |

**Full 5×5 multiplier matrix — look up as matrix[attacker][defender]:**

```
                Defender:
Attacker:    Water  Fire   Air    Spirit  Earth
Water        1.0    2.0    0.5    1.0     1.0
Fire         1.0    1.0    2.0    0.5     1.0
Air          1.0    1.0    1.0    2.0     0.5
Spirit       0.5    1.0    1.0    1.0     2.0
Earth        2.0    0.5    1.0    1.0     1.0
```

Every row and column has exactly one ×2 and one ×0.5; all others are ×1. The key asymmetry: **hitting an element with its weakness deals ×2, but the reverse matchup is ×1 (not ×0.5).** Resistance comes from a different pair entirely.

**Team building note:** Because offense and defense wheels are different, each Trial demands two counters — an *offensive* counter (to deal ×2) and a *defensive* counter (to tank ×0.5). These are different elements, so a one-type team is never the full answer.

**Recommended team comp by zone:**

| Facing | Offensive counter (deals ×2) | Defensive counter (resists) |
|---|---|---|
| Earth zone | Spirit | Fire |
| Water zone | Earth | Air |
| Fire zone | Water | Spirit |
| Air zone | Fire | Earth |
| Spirit zone | Air | Water |

**Flavor (lore only — not a mechanic in v1):** Fire reads aggressive, Air swift, Earth sturdy, Water calm, Spirit mysterious. In v1 these are personality/theming; combat is pure stats + the type multiplier (see §4). Role-based powers (heals, shields, buffs) are a possible later enhancement, not part of v1.

---

## 4. Combat model (v1)

Deliberately simple and readable: a single attack, an HP pool, and speed for turn order. No movesets.

- **Format:** 3-on-3, turn-based.
- **Stats per creature:** Heart (HP pool), Power (attack), Speed (turn order).
- **Turn order:** Phase order between teams is Speed-based (faster team's phase goes first, player wins ties). Within the *enemy* phase, each enemy acts in Speed order. Within the *player* phase, her ponies act in the **slot order she chose** in TeamPicker (slot 1 first, slot 2 second, slot 3 third) — not Speed-based for her team.
- **Damage:** `round(attacker Power × type multiplier)`, minimum 1.
- **Type multiplier** (asymmetric 5×5 matrix, §3): ×2 on offense, ×0.5 when the defender resists, ×1.0 otherwise. Offense and defense wheels differ — see §3 for the full table.
- **Enemy targeting:** each enemy attack targets a **uniformly random living** player pony. Every alive pony has an equal chance of being hit on each individual attack. (Player attacks still target whichever enemy pony the player chooses by drag or tap.)
- **Player attack order:** the player sets a preferred slot order (1, 2, 3) in the TeamPicker before the battle. Slot 1 acts first each round, slot 2 second, slot 3 third. The order persists across battles so she doesn't have to re-set it every time.

**The ×2 / ×0.5 pair is the master balance dial.** It keeps the combat arithmetic clean — doubling and halving are easy mental math — and leans hard into type-is-king. Nudge toward ×1.5 / ×0.5 later if you want stats to matter more in advantaged fights.

Battles happen at **Trials**, the **Champion** fight, and the ~25% of Explore encounters that are wild battles (§8). Quest rewards and the other ~75% of Explore use problem-solving, not battles.

### Battle presentation & interaction (all battles)

The combat *math* above is unchanged — this is how a battle looks and plays. Reference feel: Dragon Mania Legends — one living arena, not a sequence of pages.

- **One persistent arena, never a page-flip.** A single battle scene stays mounted for the whole fight: her 3 ponies on the **left facing right**, the 3 enemies on the **right facing left**, staggered into a shared space (not two roster rows). Sprites are larger with a gentle idle bob; HP bars attach to each pony and show **raw HP numbers**. There are **no intro / target-list / results pages and no "Continue to Round X" button** — everything happens inline on this one stage.
- **Events animate one at a time (animation queue).** The step-wise engine emits one event per action; the UI plays them sequentially — attacker lunges (or a projectile crosses the arena), the target flashes, a floating damage number pops, the HP bar drains — then advances to the next actor. This is the single change that turns a "results log" into a scene.
- **Round = two team phases; Speed decides which goes first** (player wins ties). A round is split into a **player phase** and an **enemy phase**. The team with the faster pony takes its phase first; ties go to the player (home advantage). **Within her phase, every un-acted pony glows ("Ready!") and she picks the order freely** — she can send any pony at any enemy, and each pony acts exactly once per round. Once a pony has attacked it dims out for the rest of the round. When her phase is done the enemy phase auto-plays (~0.7s beats), then a new round begins (Speed re-checked). *Implemented in `battle.ts` via `startingPhase` + `availableActors`; the engine tracks `activePhase` and `actedIds` rather than a single global Speed queue.*
- **Drag to attack, tap as fallback:** drag from any glowing (Ready) pony across the arena to an enemy — a targeting arrow follows her finger and valid targets highlight. Tap-a-glowing-pony-then-tap-the-target also works and must fully complete a battle on its own.
- **Type telegraph while aiming:** a live preview at the target — *"Super! ~8"*, *"Weak… ~2"*, or neutral — teaches the wheel mid-battle and previews Power × multiplier.
- **Painless outcomes:** faints fade in place and are skipped; victory and defeat appear as an overlay **on the scene** (not a new page); defeat offers a free retry with gentle wording.

This screen is the template for **every** battle — Proving Glade now, and all Zone 2–6 Trials, the Champion, and Explore wild battles later.

**Visual polish (implemented):**
- **Enemy sprites are horizontally flipped** (`scaleX(-1)`) so they face left, toward the player's team. Click/tap targets are unaffected — the flip is on an inner wrapper inside the ref div.
- **Sprites are scaled up to 134 px** (from 96 px, ≈ 1.4×) so ponies read prominently against detailed battle backdrops.
- **Pony names and "Ready!" badges use white text + text-shadow** (`0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)`) so they pop over any background art without adding panels or backdrops.
- **HP bar containers have a dark border and drop shadow** (`border: 1px solid rgba(0,0,0,0.5)`, `boxShadow`) and bars are 10 px tall (`h-2.5`) for easier reading at a glance. HP text is white with a matching shadow.

**Engine note:** this requires exposing combat **step-wise** (next actor → apply one attack → event for animation) rather than resolving a whole round in a batch, so the UI can pause for her to choose. The damage/type rules stay identical; Speed now decides **phase order between teams** (not a per-pony interleave), which is what lets her sequence her own ponies freely.

### Active team, swap nudge & recommended team (M2e)

A **hybrid** model: a persistent active team for everything, a swap nudge where it teaches, and a recommended-team safety net when she's stuck. None of this touches combat math, turn order, or the XP/cap systems — it only chooses *which* 3 ponies enter the existing `<BattleScreen>`.

- **Active team (persistent).** The party keeps an **active team of up to 3 ponies** (persisted in the save as a list of speciesIds). It's who fights **every** battle — Trials, the Champion, and Explore Hunts. The default is her **3 highest-level ponies**, so it's never empty. **Benched ponies still receive shared XP** — benching is never a punishment. Team-picking is only surfaced when she has **more than 3** ponies; with 3 or fewer, everyone fights and there's no picker. The effective fighters are derived by `resolveBattleTeam(party, activeTeam)` (≤3 → everyone; else the stored set, falling back to the default top-3 if unusable).
- **Picker (select + reorder).** Each pony row shows element, level, HP/Pwr/Spd, and selected state. When the opponent's element is known (a Trial) each row also shows a **matchup badge** from the existing type multiplier — **×2 = "Strong" (green), ×0.5 = "Weak" (red), ×1 = no badge**. The picker shows an **Attack Order** section with ▲▼ buttons to reorder the three chosen ponies — slot 1 attacks first each round, slot 2 second, slot 3 third. The order is persisted in `activeTeam` so it's remembered between battles.
- **Trial entry nudge.** Entering a Trial shows the Guardian's **element** and a *"keep team or swap?"* beat with the picker one tap away: she can proceed with her active team or open the picker. **Hunts use the active team as-is with no nudge** (the wild element is unknown until battle).
- **Recommended team (3-loss safety net, Trials only).** A **loss streak is tracked per Guardian** (persisted; incremented on each loss to that Guardian, reset to 0 only on a win against it — *not* on navigating away). At **streak ≥ 3**, on the defeat screen and on subsequent entries to that Trial until she wins, a recommendation appears:
  - **Counter exists** — if her roster has ponies that are ×2 ("Strong") vs the Guardian's element, recommend the **best 3** (Strong matchups first, then highest level). One tap fills the active team with them, with a kid-terms reason, e.g. *"Earth beats Water!"*.
  - **No counter** — if **no** pony is ×2 vs the Guardian, **do not recommend a losing team**. Instead point her back to Hunt: *"None of your ponies are strong against {element}. Try hunting a {counter-element} pony first!"*, naming the element that beats the Guardian's.
  - The recommendation is always **opt-in** — she can dismiss it and keep her own team.

*Implementation:* pure helpers in `engine/team.ts` (`defaultActiveTeam`, `resolveBattleTeam`, `matchupVsElement`, `recommendTeamVsElement`, and `bumpStreak`/`clearStreak`/`shouldRecommend`), reusing `getTypeMultiplier` + a new `getCounterElement` on the wheel (`combat.ts`). `components/TeamPicker.tsx` is the shared picker (Trial nudge + Party screen); `screens/Trial.tsx` hosts the nudge/recommendation; the store persists `activeTeam` + `trialLossStreaks` (save **v4**, with v3→v4 migration). Tested in `engine/team.test.ts`.

---

## 5. Stats & leveling

Stats are shown as **raw numbers** (intentional stealth math — she compares and adds them constantly).

**Formula:** `stat = (base + IV) + growth × (level − 1)`

**Shared growth per level (identical for every creature):** +3 Heart, +1 Power, +1 Speed.

**Individual Values (IVs).** Every pony has three IVs — one per stat (Heart, Power, Speed) — each an integer **0–3**, rolled **uniformly at random once on acquisition** (starter, Hunt tame, quest/Explore reward) and **stored permanently** (`ivs` on the creature; §5 formula folds the IV into the effective base). The only exception: **Guardian-signature ponies (and the legendary Aurelune) always get max IVs (3/3/3)** — they're trophies. IVs are surfaced only through the **computed stat** shown on party cards / team picker / battle UI (base + IV + growth × (level − 1)); the raw IV isn't displayed — she just notices "this Marina has higher Heart than that one." *(Implemented in `engine/ivs.ts` + `getStats(tier, level, ivs)`; save **v5** backfills random IVs for pre-IV ponies.)*

Only the **base** scales by tier. Because growth is shared, a higher-tier creature's lead is a *fixed* amount — so as both level up, the gap shrinks in relative terms. Early favorites never become useless; they become specialists.

**Base stats at level 1, by tier (tier = zone the creature comes from):**

| Tier (zone) | Heart | Power | Speed |
|---|---|---|---|
| 1 — Z2 Earth | 5 | 2 | 3 |
| 2 — Z3 Water | 7 | 3 | 4 |
| 3 — Z4 Fire | 9 | 4 | 5 |
| 4 — Z5 Air | 11 | 5 | 6 |
| 5 — Z6 Spirit | 13 | 6 | 7 |

**XP is granted from both winning battles AND solving Explore/quest problems correctly** — so doing the math literally levels her team. `XP_PER_CORRECT_ANSWER = 20`, `XP_PER_BATTLE_WIN = 50`. **Flat 200 XP to advance every level** (≈ 10 correct-answer encounters per level-up at any level — not a runaway curve).

**Worked example (both at level cap 8, entering Fire zone):** A tier-1 Earth starter vs a tier-2 Water creature. Earth is on offense (earth→water = ×2); Water's return fire is neutral (water→earth = ×1.0 in the asymmetric matrix — Water's resistance is against Spirit, not Earth):
- Earth at L8: Power 2+7=9, Heart 5+21=26 → hits for 9×2 = **18**
- Water at L8: Power 3+7=10, Heart 7+21=28 → hits for 10×1.0 = **10**
- Earth wins in 2 hits (18+18=36) comfortably; Water needs 3 hits (10×3=30 > 26). In a *neutral* matchup the tier-2 would win on raw stats. **Offense wheel decides who hits hard; defense wheel decides who tanks.**

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

- Available in **any zone she has already unlocked** — each unlocked zone shows an **Explore** action on the world map.
- **Two explicit modes she chooses between** (not a random roll), cleanly separating the two pillars — *Practice = learning/leveling, Hunt = collecting:*
  - **Practice (problem-solving, XP only — no pony):** always a generated Math or Story/Logic problem (mixed). Solve it → the **whole party earns XP** (M2a system). Unlimited tries, same retry/3rd-attempt-hint rules, no failure state, and an "another one" loop so she can grind problems to level her team. Never grants a creature — this is the pure learning outlet.
  - **Hunt (battle to tame — the collection faucet):** always a single-creature `<BattleScreen>` battle, her team vs one wild pony chosen by the **three-tier selection** below. It's 3-on-1, but the lone wild pony is a **mini-boss** (the `hunt` boss tier — see *Boss / special-pony stat modifiers* below) so taming feels earned. Win → it joins the party + XP; loss → painless free retry. Once everything catchable from here is tamed, Hunt gently says *"you've caught them all here."*

#### Hunt encounter selection (three tiers)

To keep Hunt diverse for the whole game (not just until a zone's own pool is emptied), the wild pony is drawn from three weighted sources:

| Weight | Source | Tier built at |
|---|---|---|
| **~70%** | **Own zone pool** — the current zone's themed `explorePoolSpeciesIds`, unowned | current zone's tier |
| **~18%** | **Cross-zone diversity** — an unowned species from any already-unlocked **Hunt zone** (tier ≥ 1, tier ≤ the current zone's tier, excluding the current zone): each contributes its quest rewards + Explore pool, **never its `signatureSpeciesId`** (Guardian aces stay an exclusive Trial-win reward) | **current zone's tier** |
| **12%** | **Rare starter** — one of the four starters she did **not** pick at creation (§11), with its natural element | starter's own (native) tier |

- **Tier-scaling rule:** own-pool and cross-zone catches are built at the **current zone's tier**, not the species' native tier, so a cross-zone pull is a **fully viable, on-level catch** — never a permanently weaker pony for being drawn from an earlier zone. The rare starter keeps its native tier (preserving the original rare-find feel).
- The roll picks a *preferred* source, then **falls through** the remaining sources if it's empty, so a Hunt still yields a catch as long as anything anywhere remains uncaught. When a source is empty its weight redistributes to the others.
- **Difficulty scales by zone:** `effectiveDifficulty(zone, partyLevel)` — re-exploring Zone 2 stays easy (safe confidence farming); exploring Zone 6 is hard. She picks her own challenge level.
- Splits the two pillars cleanly: **Practice trains math** (fast, repeatable), **Hunt + Trials train strategy/collection** (battles).

### Boss / special-pony stat modifiers (§8)

Enemy ponies in the "earned" battles (Hunt mini-boss, Trials, Champion) are **bosses**: tiered stat multipliers applied *after* the §5 formula, on top of **max IVs**. This makes taming/Trials feel earned and **rewards type-smart play** — a neutral-matchup team grinds; bringing the element counter + focusing fire wins cleanly (the ×2/×0.5 type multiplier from §4 and `<BattleScreen>` are unchanged; this only buffs the enemy's raw stats).

**The four boss tiers** (`BOSS_MODS` in `engine/boss.ts` — the easy-to-find tuning dials):

| Boss tier | Level | Heart × | Power × | Speed × |
|---|---|---|---|---|
| **hunt** | party top + 2 | 1.0 | 1.0 | 1.0 |
| **trialTeam** | zone level cap | 1.0 | 1.0 | 1.0 |
| **guardian** | zone level cap + 1 | 1.0 | 1.0 | 1.0 |
| **champion** | 15 | 1.0 | 1.0 | 1.0 |

**All bosses use max IVs (3/3/3)** before the multipliers. The pipeline (`bossStats`): (1) look up base stats for the pony's tier/zone, (2) set IVs to 3/3/3, (3) compute raw `(base + 3) + growth × (level − 1)`, (4) apply the tier multiplier `round(raw × mult)`. **All tiers currently use ×1.0 across Heart/Power/Speed**, so a boss's edge comes purely from its level rule and max IVs — the multipliers are neutral dials left in place for future tuning.

- **Hunt** uses the `hunt` tier (level = party top + 2). At the current ×1.0 multipliers a hunt boss is a max-IV pony at party-top + 2.
- **Trials:** the Guardian's two teammates use `trialTeam`; the **Guardian's ace** uses `guardian` (a level higher). The **Champion's** ace uses `champion` (its teammates stay `trialTeam`), all at the fixed Champion level 15.
- **Combat-only:** these multipliers never carry to a *tamed* copy's stats — a caught wild pony joins as a normal roster pony (see tame-at-cap below). The exception is a **Guardian-signature** trophy, which joins the roster keeping its **max IVs** (but no multipliers). *(`applyBossMod` / `bossStats` / `buildBossBattlePony` in `engine/boss.ts`; wired via `screens/teams.ts` and `engine/explore.ts`.)*

**Tame-at-cap rule:** catch difficulty and reward power are kept **separate**. When a hunted pony is tamed it joins the party at the player's **current level cap** (§6 badge cap) at **full HP** — *not* at the boosted mini-boss level, and with **its own rolled IVs** (not the boss's max IVs). So the reward is strong and usable but **never above cap**. (Practice mode, Trials, and the Proving Glade are unaffected by this.)

*Implementation (M2d):* `engine/explore.ts` (`pickWildEncounter` + `buildWildMiniBoss`, pure + tested) drives the three-tier Hunt selection — `uncaughtPoolSpecies` (own zone), `uncaughtCrossZoneSpecies` (cross-zone, signature-excluded), and `uncaughtStarters` (rare), weighted by `RARE_STARTER_CHANCE` (0.12) / `CROSS_ZONE_CHANCE` (0.18) / remainder — and tags each `WildEncounter` with the `tier` to build at; `ExploreHunt` passes `encounter.tier` to `buildWildMiniBoss`. Screens `ExploreHub` / `ExplorePractice` / `ExploreHunt` reuse the generators, the generic `<BattleScreen>` (with prop-driven victory/defeat flavor text), and the existing taming/XP/save flow (`ExploreHunt` tames at `levelCap`).

---

## 9. Quests & problem types

Problems are **generated from rules, never stored as a fixed list** — a hand-written bank runs dry and kills replay value. Each encounter rolls a fresh problem from one of **three categories**, which keeps the learning loop alive across many play sessions.

### Three categories

- **Math** — bare equations only ("56 + 43 = __ ", "__ − 28 = 45"). No story wrappers. Player types the missing number. All three modes (Practice, Hunt, Quest) use math. *Two distinct difficulty bands*: Quest/Practice use zone-progression bands (harder); Hunt uses simpler per-zone bands so early zones are faster confidence-builders.
- **Logic** — varied-format multiple-choice puzzles. Each band group has ≥8 templates (not all elimination-style): Z1–Z2 = comparison, pattern continuation, odd-one-out, categorization, if/then (3 choices); Z3–Z4 = two-attribute filter, ordering, chain reasoning, must-be-true (4 choices); Z5–Z6 = three-attribute deduction, impossibility detection, seating constraints (5 choices). Templates mix freely so the same format rarely appears twice in a row.
- **Comprehension** — read a short passage then answer a multiple-choice question (4 choices, 3 plausible distractors). Static bank of **90 passages** (15 per zone, `src/content/comprehensionBank.ts`) — passages are zone-themed (Zone 1 = Brindlewood ponies, Zone 6 = Starfall Temple lore). Because the bank is finite, anti-repeat cycling ensures each zone's pool cycles before repeating.

### Where each category appears

| Mode | Math bands | Logic | Comprehension |
|---|---|---|---|
| **Quest** (Areas 1 & 2) | Zone-progression bands | Zone-progression bands | — (quests are math or logic only) |
| **Practice** (Explore) | Zone-progression bands | Zone-progression bands | ✓ weighted |
| **Hunt** (pre-battle puzzle) | Hunt bands (simpler) | Zone-progression bands | ✓ weighted |

### Reinforcement weighting

A **rolling window of the last 10 puzzle attempts** (category + correct/wrong) is stored in the save and used to weight category selection in Practice and Hunt. Any category with **< 60% accuracy AND ≥ 3 attempts** gets **weight 2** (doubled); categories with fewer than 3 attempts are neutral (weight 1). This means if she keeps missing math, the game surfaces more math problems without any explicit mode change — the difficulty adapts to her.

### Difficulty: one knob, fed by two dials

Difficulty is a single **effective-difficulty number** the generators read. It is set by **both** the zone and the player's level:

- **Zone sets the band** — its floor and ceiling (Zone 1 = two-digit territory; Zone 6 = three-digit multi-step).
- **Player level nudges within the band**, and once high enough, slightly past the floor of the next band. So a low-level player in a zone gets the easy end of its range; a high-level player replaying it gets the hard end.
- Formula (tune in playtest): `effective = zoneFloor + round(playerLevel × smallFactor)`, **clamped** so it can't shoot past the zone's intended ceiling or produce something age-inappropriate.

This is the seam the future **New Game+** plugs into (see §15): a leveled-up restart just applies a global level offset, every generator reads a higher number, and the whole game's math shifts up — no new content required.

### Math generator (zone-progression bands)

Bare equations with no story wrapper. All answers are positive integers; subtraction is always larger − smaller. A `__` marks the blank: usually at the end ("47 + 36 = __"), occasionally at the start for Zone 3 Hunt ("__ − 28 = 45"). Must guarantee clean answers, no negative results, results land in-range.

**Quest / Practice bands** (harder, zone-progression):

| Zone | Digits | Regrouping | Steps |
|---|---|---|---|
| 1 | 2-digit | no | one-step |
| 2 | 2-digit | yes | 1–2 step |
| 3 | mixed 2–3 digit | yes | 2-step |
| 4 | 3-digit | yes | 2-step |
| 5 | 3-digit | yes | multi-step |
| 6 | 3-digit | yes | multi-step + extraneous info to filter |

**Hunt bands** (simpler, per-zone — `src/engine/huntMathGenerator.ts`):

| Zone | Format |
|---|---|
| 1 | 2-digit, no regrouping, blank at end, result [10, 49] |
| 2 | 2-digit, with regrouping, blank at end |
| 3 | 2-digit, blank at start ("__ − b = c") OR blank at end addition |
| 4 | two 2-digit operations, blank at end |
| 5 | 3-digit, one operation, blank at end |
| 6 | two 3-digit operations, blank at end |

### Logic generator

A **pool of templates with swappable variables** per band group — a deduction like "the pony is behind one of three flowers; not the tallest, not the leftmost" shuffles which attributes and which answer each time, yielding dozens of variations from a handful of templates. ≥8 templates per band group (not all position-elimination style), shuffled by the anti-repeat tracker. Bands route: difficulty ≤3 → band12 (3 choices), ≤7 → band34 (4 choices), else → band56 (5 choices).

### Comprehension generator

Picks from the 90-entry static bank keyed by zone (band 1–6 maps to zone 1–6). An anti-repeat tracker per zone prevents the same passage repeating until the zone's pool of 15 cycles.

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

### Creature roster (Zones 2–6) — M2b data (implemented)

Typed data in `src/content/` (`creatures.ts`, `zones.ts`, `guardians.ts`). All unicorns; placeholder art = an element-keyed color. Tier = zone number − 1. Per zone: 2 quest rewards (Areas 1 & 2), 1 Guardian signature, 3 Explore-pool species.

**Art status:** the 5 starters (`marina-mist`, `ember-spark`, `sky-dancer`, `stella-dream`, `meadow-bloom`) now have real art assets under `src/assets/ponies/`, rendered by `CreatureSprite` (Party list and BattleScreen). Sprites are **glob-based**: `CreatureSprite` uses `import.meta.glob('/src/assets/ponies/*.png', { eager: true, import: 'default' })` to build a `speciesId → image` map keyed by each PNG's filename (without extension). **Adding a new pony's art is just dropping a correctly-named `<speciesId>.png` into `src/assets/ponies/`** — no code change needed. Any species without a matching file falls back to the element-keyed placeholder circle, so the rest of the roster still renders until its art lands.

| Zone (element, tier) | Quest rewards | Signature (ace) | Explore pool |
|---|---|---|---|
| **2 Earth** (t1) | Acorn Sprout, Fern Whisper | **Boulderhoof** | Daisy Dapple, Clay Canter, Mossy Tussock |
| **3 Water** (t2) | Bubble Brook, Pearl Ripple | **Tidalhoof** | Splash Pebble, Coral Shimmer, Misty Wave |
| **4 Fire** (t3) | Spark Flicker, Cinder Cocoa | **Blazehoof** | Flame Twirl, Ember Glow, Sunny Scorch |
| **5 Air** (t4) | Breezy Lark, Cloud Skip | **Galehoof** | Wind Whistle, Feather Float, Gust Dancer |
| **6 Spirit** (t5) | Star Sparkle, Moon Glimmer | **Astralhoof** | Wishing Star, Dusk Twinkle, Nova Drift |

**Champion / legendary:** **Aurelune** (Spirit, tier 5) — Grand Champion Vesper's ace.

**Guardians & Trial teams** (ace + 2 element species, levels near the zone cap §6; win → badge + signature + next-zone unlock):

| Zone | Guardian | Trial team (levels) | Badge → unlock |
|---|---|---|---|
| 2 | Warden Bramblewood | Daisy Dapple 3, Clay Canter 3, **Boulderhoof 4** | Badge 1 → Zone 3 |
| 3 | Tidecaller Nerida | Splash Pebble 5, Coral Shimmer 5, **Tidalhoof 6** | Badge 2 → Zone 4 |
| 4 | Emberwarden Cinda | Flame Twirl 7, Ember Glow 7, **Blazehoof 8** | Badge 3 → Zone 5 |
| 5 | Skywarden Zephyra | Wind Whistle 9, Feather Float 9, **Galehoof 10** | Badge 4 → Zone 6 |
| 6 | Starwarden Lumina | Dusk Twinkle 11, Nova Drift 11, **Astralhoof 12** | Badge 5 → Champion |
| — | Grand Champion Vesper | Star Sparkle 14, Moon Glimmer 14, **Aurelune 15** | post-game capstone |

Data integrity is enforced by `src/content/content.test.ts` (every referenced id exists, tiers/elements match the zone, one badge per zone, correct unlock targets, Trial teams reference real species).

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

**Art asset conventions — filename-keyed, build-time discovery.** Both pony sprites and battle backdrops are auto-discovered via `import.meta.glob(..., { eager: true, import: 'default' })`, keyed by the PNG filename without extension. Adding art is just dropping a correctly-named file in the right folder — no code change:
- **Pony sprites** (`src/assets/ponies/*.png`, keyed by `speciesId`) — see `CreatureSprite`. A missing sprite falls back to the element emoji-circle.
- **Battle backgrounds** (`src/assets/backgrounds/*.{png,jpg,jpeg}`) — see `BattleScreen`, which takes an optional `backgroundId` prop. A matched image renders full-bleed (`background-size: cover`, `background-position: center`); an unmatched/omitted id falls back to the original green gradient so nothing breaks. Two categories:
  - **Trial arenas** (`proving-glade`, `granite-hall`, `coral-sanctum`, `magma-forge`, `galecrest-spire`, `starfall-temple`) — one per Trial. Trial callers pass the zone's trial **area id** (`granite`, `coral`, …); the resolver matches the file whose stem starts with that id (`granite` → `granite-hall`). Proving Glade passes the exact stem `proving-glade`.
  - **Hunt scenes** (`hunt-z1` … `hunt-z6`) — one per zone. Explore/Hunt passes `hunt-${zoneId}`.
  - The **Champion** battle passes the exact stem `champion-arena`.
  - **World map** (`src/assets/backgrounds/world-map.jpg`) — see below.
  - **Character creation** (`character-creation.jpg`) — full-bleed background on `CharacterCreation.tsx` (both pick and customize steps), with a `bg-black/50` overlay for form readability. Both the starter-selection list (step 1) and the customization preview (step 2) now render real pony art via `<CreatureSprite speciesId={...} />`, falling back to the element emoji-circle for any species without a PNG.
  - **Game complete** (`game-complete.jpg`) — full-bleed background on `GameComplete.tsx`, with a `bg-black/50` overlay for text readability.
  - **Zone view** — `ZoneView.tsx` reuses the Hunt backgrounds (`hunt-z1` … `hunt-z6`) mapped from `selectedZoneId` (`hunt-${zoneId}`), with a `bg-black/40` overlay. Uses the same `import.meta.glob` pattern as `BattleScreen`; no new image files needed.

**Visual world map (`WorldMap.tsx`).** The World Map is a single tall portrait image (`world-map.jpg`, ~9:16) with a golden path winding through biome regions, rendered full-bleed and scrolled vertically. It replaced the earlier list layout; it's purely a presentation change — all progression logic still comes from `engine/progression` (`isZoneUnlocked`, `isZoneComplete`, `isChampionUnlocked`) and the store (`openZone`, `openExplore`, `setScreen('champion')`).
- **Structure:** an `<img width:100% height:auto>` inside a `relative` wrapper preserves the image's natural aspect ratio (no crop/letterbox); a scroll container holds it, and zone nodes are **absolutely positioned on top** at hand-tuned `%` coordinates (`NODE_LAYOUT`) so each rests on the baked-in path. No SVG connector is drawn — the path is in the artwork.
- **Nodes:** one tappable circle per zone (56px mobile / 64px `sm+`) showing the element emoji, tapping it calls `openZone` (or `setScreen('champion')` for the Champion). A floating name/status label sits beside each node, alternating left/right to avoid the path. Unlocked zones also show a compact **Explore** pill below the circle → `openExplore(zone.id)`.
- **States:** *cleared* = gold `#ffd700` ring + dark fill + ✓ badge; *current* (unlocked, not cleared) = white ring + element-colored fill + a gentle `world-node-pulse` (scale 1.0–1.08, 2s) defined in `index.css`; *locked* = 50% opacity + 🔒 overlay.
- **Chrome & behavior:** the `🏅 N/5` badge count is pinned (absolute, outside the scroller) so it stays visible while scrolling; on mount the map auto-scrolls to center the furthest unlocked incomplete zone (the frontier). Tuned for a tablet in portrait; degrades gracefully on desktop.

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
  - **M2b — Zone content/data ✅ DONE:** all five zones as typed data — area names, quest reward creatures, Guardians, signature creatures, Trial teams, Explore pools, creature tiers. In `src/content/`: 31 species across Zones 2–6 + Champion Aurelune (`creatures.ts`), 6 Guardians with Trial teams (`guardians.ts`), and enriched `Zone` data mapping each zone to its element, 3 areas (2 quest + 1 Trial), quest rewards, Guardian, signature, badge, unlock target, and Explore pool (`zones.ts`). Integrity-tested in `content.test.ts`. See the §11 roster subsection.
  - **M2c — World map + Trials ✅ DONE:** the 6-region node map (locked/unlocked) → zone view → 3 area nodes, two generated quests per zone, Trial battles granting badge + signature + next-zone unlock, and the Champion fight + end screen. Progression is derived from one persisted `areasDone[]` set via pure helpers in `engine/progression.ts` (zone/area unlock, badge count, champion unlock; tested in `progression.test.ts`). One reusable `screens/Quest.tsx` replaces the old per-area screens (Area 1 = Math, Area 2 = Logic at `effectiveDifficulty`, same retry/hint). Trials reuse the generic `<BattleScreen>` fed each Guardian's M2b team via `screens/teams.ts` (`Trial.tsx`/`Champion.tsx`); `store.winTrial(zoneId)` atomically clears the gate, raises the §6 cap, and awards the signature creature. Save bumped to **v3 with a v2→v3 migration** so existing progress survives.
  - **M2d — Explore mode ✅ DONE:** the **Practice / Hunt** split (replacing the old 75/25 problem-to-tame model, see §8). Practice = generated Math/Logic for party XP with an "another one" loop, no pony; Hunt = single-wild `<BattleScreen>` → tame, drawn from the zone's Explore pool with rare unpicked-starter finds. `engine/explore.ts` (`pickWildEncounter`, tested) + screens `ExploreHub`/`ExplorePractice`/`ExploreHunt`, reached from the world map per unlocked zone. `<BattleScreen>` victory/defeat text is now prop-driven so Trials/Champion/Hunt read correctly. 131 tests passing, build clean.
  - **M2e — Team picker + recommended team ✅ DONE:** the **hybrid active-team** model (see §4's *Active team, swap nudge & recommended team* subsection) — presentation + team-selection only, no change to combat math, turn order, or the XP/cap systems. A persistent **active team** of ≤3 ponies (default = top-3 by level) fights every battle; benched ponies still share XP; team-picking is surfaced only when the party exceeds 3. `engine/team.ts` (pure, tested) provides `defaultActiveTeam`/`resolveBattleTeam`, `matchupVsElement` (reuses `getTypeMultiplier`), `recommendTeamVsElement` (both branches: recommend-a-×2-counter vs suggest-hunting-the-counter-element), and per-Guardian loss-streak helpers; `combat.ts` gains `getCounterElement`. `components/TeamPicker.tsx` (select exactly 3, element/level/stats + Trial matchup badges) is reused by `screens/Trial.tsx` (a keep-or-swap entry nudge showing the Guardian element, plus the 3-loss recommendation) and the Party screen. Hunts use the active team with no nudge. Save bumped to **v4 (v3→v4 migration)** persisting `activeTeam` + `trialLossStreaks`. 148 tests passing, build clean.
  - **M2f — Party XP progress bars ✅ DONE:** presentation + small derive only — no change to the XP economy, growth curve, shared-XP award, or §6 cap rules. A pure `xpProgress(creature, levelCap)` helper in `leveling.ts` exposes the three per-pony display values — `xpIntoLevel` (the stored remainder toward the next level), `xpForNextLevel` (read straight from the existing `xpForNextLevel(level)` curve, not hardcoded), and `atCap` (reuses the store's §6-derived `levelCap`) — so the card stays dumb. `components/PartyCard.tsx` renders, per pony in the Party interface: the level number, an XP bar filled `xpIntoLevel / xpForNextLevel` with label *"{into} / {needed} XP to Lv {level+1}"* when below cap, and a **distinct gold "★ MAX" state** (full bar, amber/gold accent, *"Earn a badge to raise the cap"*) when `atCap` — deliberately *not* a nearly-full normal bar, so a maxed pony never looks like she just needs a little more. A one-shot CSS `levelPulse` (~600ms, `index.css`, no library, no blocking modal) flashes the bar when a pony's level increments. Tests in `leveling.test.ts` cover mid-level into/needed + fractional fill, curve match at a couple of levels, and `atCap`→MAX. 138 tests passing, build clean.
  - Then swap in real Leonardo art across the finished world.
- **M3a — Puzzle system refactor ✅ DONE:** three problem categories (Math/Logic/Comprehension), reinforcement weighting, Hunt puzzle phase, flat XP curve. Key changes:
  - **Three categories.** `ComprehensionProblem` type added (`problems.ts`). 90-entry static bank in `content/comprehensionBank.ts` (15/zone). `comprehensionGenerator.ts` picks by zone band with per-zone anti-repeat cycling.
  - **Math → bare equations only.** Story wrappers removed; `mathGenerator.ts` now renders "47 + 36 = __" style. `huntMathGenerator.ts` adds simpler per-zone Hunt bands (Z3 supports blank-at-start "__ − b = c").
  - **Logic → varied formats.** `logicGenerator.ts` rewritten with ≥8 templates per band group (not all position-elimination). Band 1–2 = 3 choices, 3–4 = 4 choices, 5–6 = 5 choices; templates mix comparison, pattern, odd-one-out, filtering, deduction chains.
  - **Reinforcement weighting.** `puzzleSelector.ts`: rolling last-10 `PuzzleAttempt[]` stored in save (v6, migrated), per-category accuracy → weight 2 if < 60% and ≥3 attempts. Practice and Hunt use `selectProblemCategory(recentPuzzleAttempts)`.
  - **Hunt puzzle phase.** `ExploreHunt.tsx` shows a warm-up puzzle (weighted category, Hunt math bands) before the battle screen. `ProblemCard.tsx` gains `onAttempt` callback to record correct/wrong into the rolling window.
  - **Flat 200 XP per level.** `xpForNextLevel` now returns 200 at all levels (≈10 correct-answer encounters per level-up). Save bumped to **v6** (v5→v6 migration adds `recentPuzzleAttempts: []`). 222 tests passing, build clean.
  - **M3b — Party screen enhancements ✅ DONE (current milestone):** filtering, sorting, a type-advantage quick reference, and a collection counter added to the Party screen. All interactive elements use minimum 44px tap targets for tablet play.
    - **Collection counter.** "🦄 N ponies collected" line below the Trainer/Badges/Level-cap info; uses the live `party.length`.
    - **Filter bar.** Horizontal pill row — All | Water | Fire | Air | Spirit | Earth | On Team — single-select; All is default. Element buttons use their theme color as background when active (white text); inactive buttons are semi-transparent/outlined. On Team filters to the active battle trio; element filters by `species.element`. Resets the view without touching the battle-team section.
    - **Sort selector.** Pill toggles adjacent to the filter bar — Level ↓ (default, highest first) | Level ↑ | A→Z (display name) | Newest (reverse acquisition index). Filter and sort compose: e.g. Fire + Level ↓ shows only Fire ponies sorted by level. Implemented via `useMemo` over `party` + `activeTeam` + filter + sort deps.
    - **Type advantage quick reference.** Collapsible section (collapsed by default, ▼ show / ▲ hide). When expanded shows the full cycle as element-colored names: `Water → Fire → Air → Spirit → Earth → Water`, plus helper text "→ means strong against · deals ×2 damage". Colors match `ELEMENT_COLORS` in `Party.tsx` (consistent with `CreatureSprite.tsx`).
    - **Empty states.** Filter returns zero ponies → "No [Element] ponies yet — go explore!" or "No ponies on your team yet — go pick your battle team!" for the On Team case.
    - **Preserved invariants.** Battle team header ("Battle team: N of 3 ponies") and Choose team button remain always visible above the pony list, unaffected by any filter. All existing card features (On Team badge, XP bar, MAX indicator, level-pulse) unchanged.
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

## 17. Bug fixes

- **Missing pony art on reward/display screens:** `CreatureSprite` only renders real PNG art when passed `speciesId`; three screens omitted it, so ponies appeared as element-colored placeholder circles despite art existing in `src/assets/ponies/`. Fixed by passing `speciesId` on: the Quest "You tamed …!" reward reveal, the completed-quest revisit view (which also now shows the earned pony's sprite instead of just ✅ + text), the GameComplete victory roster, and the pre-Trial "Your team" preview.
