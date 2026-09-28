import { create } from 'zustand'
import type { Creature } from '../engine/types'
import { saveGame, loadGame, clearSave } from './save'
import { SPECIES_BY_ID } from '../content/creatures'
import { ZONE_BY_ID } from '../content/zones'
import { GUARDIAN_BY_ID } from '../content/guardians'
import { addXp, levelCapForBadges, XP_PER_BATTLE_WIN } from '../engine/leveling'
import { getStats } from '../engine/stats'
import { newCreatureId } from '../engine/creature'
import { MAX_IVS } from '../engine/ivs'
import { finalAreaId, badgeCount } from '../engine/progression'
import { bumpStreak, clearStreak, resolveBattleTeam } from '../engine/team'
import { updatePuzzleAttempts } from '../engine/puzzleSelector'
import { prestigeParty } from '../engine/prestige'
import { hatchBlockReason, hatchCost, hatchFoal, releaseBlockReason, releaseValue, REST_WINS } from '../engine/hatching'
import type { PuzzleAttempt } from '../engine/puzzleSelector'
import type { Problem } from '../engine/problems'
import type { LifetimeStats, BattleSummary } from '../engine/achievements'
import {
  emptyLifetime, applySolve, applyBattleWin, applySpeciesSeen, applyDayPlayed, localDay,
  stardustForSolve, newlyEarned, STARDUST_PER_BATTLE_WIN,
} from '../engine/achievements'

export type Screen =
  | 'worldMap'
  | 'zone'
  | 'quest'
  | 'provingGlade'
  | 'trial'
  | 'champion'
  | 'gameComplete'
  | 'exploreHub'
  | 'explorePractice'
  | 'exploreHunt'
  | 'party'
  | 'trophies'
  | 'moonwell'

interface GameStore {
  // persisted
  playerName: string
  party: Creature[]
  areasDone: string[]
  championDefeated: boolean
  /** Active team (M2e): instance ids of the ≤3 ponies that fight; [] = default top-3. */
  activeTeam: string[]
  /** Per-Guardian loss streaks (M2e): guardianId → consecutive losses. */
  trialLossStreaks: Record<string, number>
  /** Rolling 10-attempt puzzle history for reinforcement weighting. */
  recentPuzzleAttempts: PuzzleAttempt[]
  /** Completed journeys (§15 prestige). 0 = first playthrough. */
  prestigeCount: number
  /** True from starting a new journey until that run's starter is picked. */
  awaitingStarter: boolean
  /** §19 — earned by learning, spent on hatching. Survives prestige. */
  stardust: number
  /** §19 — lifetime counters the achievements read. Survives prestige. */
  lifetime: LifetimeStats
  /** §19 — unlocked achievement id → ISO date. Survives prestige. */
  achievements: Record<string, string>
  // ui — not persisted: achievements waiting to pop up, oldest first
  toastQueue: string[]
  // derived from areasDone — not persisted
  badges: number
  levelCap: number
  // ui — not persisted
  currentScreen: Screen
  selectedZoneId: string | null
  selectedAreaId: string | null
  // actions
  setPlayerName: (name: string) => void
  /** `tamed` counts it toward the Pony Whisperer trophy (Hunt catches only). */
  addToParty: (creature: Creature, opts?: { tamed?: boolean }) => void
  awardXpToParty: (amount: number) => void
  setActiveTeam: (ids: string[]) => void
  recordTrialLoss: (guardianId: string) => void
  recordPuzzleAttempt: (category: PuzzleAttempt['category'], correct: boolean) => void
  /** A puzzle solved in any mode: lifetime stats + Stardust (§19). */
  recordSolve: (problem: Problem, misses: number) => void
  /** Any battle won: lifetime stats + Stardust (§19). */
  recordBattleWin: (summary: BattleSummary) => void
  dismissToast: () => void
  /**
   * Hatch a foal at the Moonwell (§20). Returns the foal, or null if the pair
   * can't hatch (a parent not ready, same pony twice, or not enough Stardust).
   */
  hatch: (leadId: string, partnerId: string) => Creature | null
  /** Send a pony to the Meadow for Stardust (§20). Returns the Stardust paid, or 0 if refused. */
  release: (creatureId: string) => number
  completeArea: (areaId: string) => void
  winTrial: (zoneId: string) => void
  winChampion: () => void
  /** Start a new journey (§15): keep only the Champion trophies, reset everything else. */
  prestige: () => void
  openZone: (zoneId: string) => void
  openArea: (areaId: string, screen: Screen) => void
  openExplore: (zoneId: string) => void
  setScreen: (screen: Screen) => void
  save: () => void
  load: () => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>()((set, get) => {
  // Unlock any achievement whose condition is now met: stamp the date, pay its
  // Stardust, and queue its pop-up. Runs before every save, so no action has to
  // know which trophies it might affect.
  function settleAchievements() {
    const s = get()
    const earned = newlyEarned(
      {
        lifetime:      s.lifetime,
        party:         s.party,
        badges:        s.badges,
        prestigeCount: s.prestigeCount,
        elementOf:     (id) => SPECIES_BY_ID[id]?.element,
      },
      s.achievements,
    )
    if (earned.length === 0) return
    const now = new Date().toISOString()
    set({
      achievements: { ...s.achievements, ...Object.fromEntries(earned.map((a) => [a.id, now])) },
      stardust:     s.stardust + earned.reduce((sum, a) => sum + a.reward, 0),
      toastQueue:   [...s.toastQueue, ...earned.map((a) => a.id)],
    })
  }

  function persist() {
    // Count today as a played day (a no-op after the first save of the day).
    const lifetime = applyDayPlayed(get().lifetime, localDay())
    if (lifetime !== get().lifetime) set({ lifetime })
    settleAchievements()
    const s = get()
    saveGame({
      playerName:           s.playerName,
      party:                s.party,
      areasDone:            s.areasDone,
      championDefeated:     s.championDefeated,
      activeTeam:           s.activeTeam,
      trialLossStreaks:     s.trialLossStreaks,
      recentPuzzleAttempts: s.recentPuzzleAttempts,
      prestigeCount:        s.prestigeCount,
      awaitingStarter:      s.awaitingStarter,
      stardust:             s.stardust,
      lifetime:             s.lifetime,
      achievements:         s.achievements,
      lastZoneId:           s.selectedZoneId ?? undefined,
    })
  }

  // Grant XP to the whole party at a given level cap (§5). Returns the new party.
  function xpParty(party: Creature[], amount: number, cap: number): Creature[] {
    return party.map((c) => {
      const tier = SPECIES_BY_ID[c.speciesId]?.tier
      if (!tier) return c
      return addXp(c, tier, amount, cap).creature
    })
  }

  // Build a trophy pony — a Guardian signature or the Champion's Aurelune: max
  // IVs (§5), and the `trophy` flag hatching and the Meadow read (§20).
  function makeTrophy(speciesId: string, level: number): Creature {
    const sp = SPECIES_BY_ID[speciesId]
    const stats = getStats(sp.tier, level, MAX_IVS)
    return {
      id: newCreatureId(), speciesId, nickname: sp.name, level, currentHp: stats.heart, xp: 0,
      ivs: MAX_IVS, trophy: true,
    }
  }

  // Recompute badges + cap from the completed-areas set (single source of truth).
  function derive(areasDone: string[]) {
    const badges = badgeCount(areasDone)
    return { badges, levelCap: levelCapForBadges(badges) }
  }

  return {
    playerName:            '',
    party:                 [],
    areasDone:             [],
    championDefeated:      false,
    activeTeam:            [],
    trialLossStreaks:       {},
    recentPuzzleAttempts:  [],
    prestigeCount:         0,
    awaitingStarter:       false,
    stardust:              0,
    lifetime:              emptyLifetime(),
    achievements:          {},
    toastQueue:            [],
    badges:                0,
    levelCap:         levelCapForBadges(0),
    currentScreen:    'worldMap',
    selectedZoneId:   null,
    selectedAreaId:   null,

    // Called once, as the last step of character creation — which is also what
    // ends the "pick this journey's starter" state on a prestige run.
    setPlayerName: (name) => { set({ playerName: name, awaitingStarter: false }); persist() },

    addToParty: (creature, opts) => {
      const l = applySpeciesSeen(get().lifetime, [creature.speciesId])
      set({
        party:    [...get().party, creature],
        lifetime: opts?.tamed ? { ...l, tamed: l.tamed + 1 } : l,
      })
      persist()
    },

    awardXpToParty: (amount) => {
      set({ party: xpParty(get().party, amount, get().levelCap) })
      persist()
    },

    // Persist her chosen active team (M2e), by instance id. Empty → default top-3.
    setActiveTeam: (ids) => {
      set({ activeTeam: ids.slice(0, 3) })
      persist()
    },

    // Record a Trial loss vs a Guardian (M2e) — drives the 3-loss safety net.
    recordTrialLoss: (guardianId) => {
      set({ trialLossStreaks: bumpStreak(get().trialLossStreaks, guardianId) })
      persist()
    },

    // Record a puzzle attempt for the reinforcement weighting system.
    recordPuzzleAttempt: (category, correct) => {
      const updated = updatePuzzleAttempts(get().recentPuzzleAttempts, category, correct)
      set({ recentPuzzleAttempts: updated })
      persist()
    },

    recordSolve: (problem, misses) => {
      set({
        lifetime: applySolve(get().lifetime, {
          category:         problem.type,
          misses,
          isMultiplication: problem.type === 'math' && problem.multiplication === true,
        }),
        stardust: get().stardust + stardustForSolve(misses),
      })
      persist()
    },

    recordBattleWin: (summary) => {
      set({
        lifetime: applyBattleWin(get().lifetime, summary),
        stardust: get().stardust + STARDUST_PER_BATTLE_WIN,
      })
      persist()
    },

    dismissToast: () => set({ toastQueue: get().toastQueue.slice(1) }),

    hatch: (leadId, partnerId) => {
      const { party, stardust, lifetime } = get()
      const lead    = party.find((c) => c.id === leadId)
      const partner = party.find((c) => c.id === partnerId)
      if (!lead || !partner || leadId === partnerId) return null
      if (hatchBlockReason(lead, lifetime.battlesWon) || hatchBlockReason(partner, lifetime.battlesWon)) return null
      const cost = hatchCost(lead, partner)
      if (stardust < cost) return null

      const foal = hatchFoal(lead, partner)
      const restUntil = lifetime.battlesWon + REST_WINS
      const found = foal.variant && !lifetime.variantsFound.includes(foal.variant)
        ? [...lifetime.variantsFound, foal.variant]
        : lifetime.variantsFound
      const l = applySpeciesSeen(lifetime, [foal.speciesId])
      set({
        party: [
          ...party.map((c) => (c.id === leadId || c.id === partnerId ? { ...c, restUntil } : c)),
          foal,
        ],
        stardust: stardust - cost,
        lifetime: { ...l, hatched: l.hatched + 1, variantsFound: found },
      })
      persist()
      return foal
    },

    release: (creatureId) => {
      const { party, activeTeam, stardust, lifetime } = get()
      const pony = party.find((c) => c.id === creatureId)
      const activeIds = new Set(resolveBattleTeam(party, activeTeam).map((c) => c.id))
      if (!pony || releaseBlockReason(pony, party, activeIds)) return 0
      const paid = releaseValue(pony)
      set({
        party:      party.filter((c) => c.id !== creatureId),
        activeTeam: activeTeam.filter((id) => id !== creatureId),
        stardust:   stardust + paid,
        lifetime:   { ...lifetime, released: lifetime.released + 1 },
      })
      persist()
      return paid
    },

    // Mark a quest/area complete (re-derives badges + cap for Trial areas).
    completeArea: (areaId) => {
      const areasDone = get().areasDone.includes(areaId)
        ? get().areasDone
        : [...get().areasDone, areaId]
      set({ areasDone, ...derive(areasDone) })
      persist()
    },

    // Win a Trial (Zones 2–6) or the Proving Glade (Zone 1): clear the gating area,
    // raise the cap (§6), award the signature creature, then grant battle XP.
    winTrial: (zoneId) => {
      const zone = ZONE_BY_ID[zoneId]
      if (!zone) return
      const areaId = finalAreaId(zone)
      const areasDone = get().areasDone.includes(areaId)
        ? get().areasDone
        : [...get().areasDone, areaId]
      const { badges, levelCap } = derive(areasDone)

      let party = get().party
      let lifetime = get().lifetime
      if (zone.signatureSpeciesId) {
        lifetime = applySpeciesSeen(lifetime, [zone.signatureSpeciesId])
        const guardian = zone.guardianId ? GUARDIAN_BY_ID[zone.guardianId] : undefined
        const aceLevel = guardian?.team.find(t => t.speciesId === zone.signatureSpeciesId)?.level ?? levelCap
        // Guardian-signature trophies join with max IVs (§5) — these are earned.
        party = [...party, makeTrophy(zone.signatureSpeciesId, Math.min(aceLevel, levelCap))]
      }
      party = xpParty(party, XP_PER_BATTLE_WIN, levelCap)

      // No losses to this Guardian since the last win → a Flawless Trial (§19).
      if (zone.guardianId && !get().trialLossStreaks[zone.guardianId]) {
        lifetime = { ...lifetime, perfectTrials: lifetime.perfectTrials + 1 }
      }

      // Reset this Guardian's loss streak on a win (M2e safety net clears).
      const trialLossStreaks = zone.guardianId
        ? clearStreak(get().trialLossStreaks, zone.guardianId)
        : get().trialLossStreaks

      set({ areasDone, badges, levelCap, party, trialLossStreaks, lifetime })
      persist()
    },

    // Beat Grand Champion Vesper: award the legendary Aurelune, mark the game done.
    winChampion: () => {
      const cap = get().levelCap
      // The legendary Aurelune is the ultimate trophy — max IVs (§5).
      const party = xpParty(
        [...get().party, makeTrophy('aurelune', Math.min(15, cap))],
        XP_PER_BATTLE_WIN,
        cap,
      )
      const l = applySpeciesSeen(get().lifetime, ['aurelune'])
      set({ party, championDefeated: true, lifetime: { ...l, championWins: l.championWins + 1 } })
      persist()
    },

    openZone: (zoneId) => {
      set({ selectedZoneId: zoneId, currentScreen: 'zone' })
      persist()
    },

    openArea: (areaId, screen) => set({ selectedAreaId: areaId, currentScreen: screen }),

    openExplore: (zoneId) => {
      set({ selectedZoneId: zoneId, currentScreen: 'exploreHub' })
      persist()
    },

    setScreen: (currentScreen) => set({ currentScreen }),

    save: () => persist(),

    // §15 New Game+. Everything resets except the Champion trophies, which come
    // along at the FRESH cap (level 4) — same difficulty curve as a first run,
    // but she keeps the proof she won. The rolling puzzle history deliberately
    // carries over: it describes how she learns, not how far she has progressed.
    prestige: () => {
      const fresh = derive([])
      set({
        party:            prestigeParty(get().party, fresh.levelCap),
        areasDone:        [],
        championDefeated: false,
        activeTeam:       [],
        trialLossStreaks: {},
        prestigeCount:    get().prestigeCount + 1,
        awaitingStarter:  true,
        selectedZoneId:   null,
        selectedAreaId:   null,
        currentScreen:    'worldMap',
        ...fresh,
      })
      persist()
    },

    resetGame: () => {
      clearSave()
      set({
        playerName:           '',
        party:                [],
        areasDone:            [],
        championDefeated:     false,
        prestigeCount:        0,
        awaitingStarter:      false,
        activeTeam:           [],
        trialLossStreaks:     {},
        recentPuzzleAttempts: [],
        stardust:             0,
        lifetime:             emptyLifetime(),
        achievements:         {},
        toastQueue:           [],
        badges:               0,
        levelCap:             levelCapForBadges(0),
        currentScreen:        'worldMap',
        selectedZoneId:       null,
        selectedAreaId:       null,
      })
    },

    load: () => {
      const saved = loadGame()
      if (saved) {
        set({
          playerName:       saved.playerName,
          party:            saved.party,
          areasDone:        saved.areasDone,
          championDefeated: saved.championDefeated,
          activeTeam:            saved.activeTeam ?? [],
          trialLossStreaks:      saved.trialLossStreaks ?? {},
          recentPuzzleAttempts:  saved.recentPuzzleAttempts ?? [],
          prestigeCount:         saved.prestigeCount ?? 0,
          awaitingStarter:       saved.awaitingStarter ?? false,
          stardust:              saved.stardust,
          lifetime:              saved.lifetime,
          achievements:          saved.achievements,
          selectedZoneId:        saved.lastZoneId ?? null,
          currentScreen:         'worldMap',
          ...derive(saved.areasDone),
        })
        // Counts today and unlocks anything an older save had already earned.
        persist()
      }
    },
  }
})
