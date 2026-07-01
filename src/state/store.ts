import { create } from 'zustand'
import type { Creature } from '../engine/types'
import { saveGame, loadGame, clearSave } from './save'
import { SPECIES_BY_ID } from '../content/creatures'
import { ZONE_BY_ID } from '../content/zones'
import { GUARDIAN_BY_ID } from '../content/guardians'
import { addXp, levelCapForBadges, XP_PER_BATTLE_WIN } from '../engine/leveling'
import { getStats } from '../engine/stats'
import { MAX_IVS } from '../engine/ivs'
import type { Ivs } from '../engine/types'
import { finalAreaId, badgeCount } from '../engine/progression'
import { bumpStreak, clearStreak } from '../engine/team'

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

interface GameStore {
  // persisted
  playerName: string
  party: Creature[]
  areasDone: string[]
  championDefeated: boolean
  /** Active team (M2e): speciesIds of the ≤3 ponies that fight; [] = default top-3. */
  activeTeam: string[]
  /** Per-Guardian loss streaks (M2e): guardianId → consecutive losses. */
  trialLossStreaks: Record<string, number>
  // derived from areasDone — not persisted
  badges: number
  levelCap: number
  // ui — not persisted
  currentScreen: Screen
  selectedZoneId: string | null
  selectedAreaId: string | null
  // actions
  setPlayerName: (name: string) => void
  addToParty: (creature: Creature) => void
  awardXpToParty: (amount: number) => void
  setActiveTeam: (speciesIds: string[]) => void
  recordTrialLoss: (guardianId: string) => void
  completeArea: (areaId: string) => void
  winTrial: (zoneId: string) => void
  winChampion: () => void
  openZone: (zoneId: string) => void
  openArea: (areaId: string, screen: Screen) => void
  openExplore: (zoneId: string) => void
  setScreen: (screen: Screen) => void
  save: () => void
  load: () => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>()((set, get) => {
  function persist() {
    const s = get()
    saveGame({
      playerName:       s.playerName,
      party:            s.party,
      areasDone:        s.areasDone,
      championDefeated: s.championDefeated,
      activeTeam:       s.activeTeam,
      trialLossStreaks: s.trialLossStreaks,
      lastZoneId:       s.selectedZoneId ?? undefined,
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

  // Build a fresh party member from a species at a level (clamped to the cap).
  // Callers pass the IVs — signature/Champion trophies use MAX_IVS (§5).
  function makeCreature(speciesId: string, level: number, ivs: Ivs): Creature {
    const sp = SPECIES_BY_ID[speciesId]
    const stats = getStats(sp.tier, level, ivs)
    return { speciesId, nickname: sp.name, level, currentHp: stats.heart, xp: 0, ivs }
  }

  // Recompute badges + cap from the completed-areas set (single source of truth).
  function derive(areasDone: string[]) {
    const badges = badgeCount(areasDone)
    return { badges, levelCap: levelCapForBadges(badges) }
  }

  return {
    playerName:       '',
    party:            [],
    areasDone:        [],
    championDefeated: false,
    activeTeam:       [],
    trialLossStreaks: {},
    badges:           0,
    levelCap:         levelCapForBadges(0),
    currentScreen:    'worldMap',
    selectedZoneId:   null,
    selectedAreaId:   null,

    setPlayerName: (name) => { set({ playerName: name }); persist() },

    addToParty: (creature) => {
      set({ party: [...get().party, creature] })
      persist()
    },

    awardXpToParty: (amount) => {
      set({ party: xpParty(get().party, amount, get().levelCap) })
      persist()
    },

    // Persist her chosen active team (M2e). Empty resolves to the default top-3.
    setActiveTeam: (speciesIds) => {
      set({ activeTeam: speciesIds.slice(0, 3) })
      persist()
    },

    // Record a Trial loss vs a Guardian (M2e) — drives the 3-loss safety net.
    recordTrialLoss: (guardianId) => {
      set({ trialLossStreaks: bumpStreak(get().trialLossStreaks, guardianId) })
      persist()
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
      if (zone.signatureSpeciesId) {
        const guardian = zone.guardianId ? GUARDIAN_BY_ID[zone.guardianId] : undefined
        const aceLevel = guardian?.team.find(t => t.speciesId === zone.signatureSpeciesId)?.level ?? levelCap
        // Guardian-signature trophies join with max IVs (§5) — these are earned.
        party = [...party, makeCreature(zone.signatureSpeciesId, Math.min(aceLevel, levelCap), MAX_IVS)]
      }
      party = xpParty(party, XP_PER_BATTLE_WIN, levelCap)

      // Reset this Guardian's loss streak on a win (M2e safety net clears).
      const trialLossStreaks = zone.guardianId
        ? clearStreak(get().trialLossStreaks, zone.guardianId)
        : get().trialLossStreaks

      set({ areasDone, badges, levelCap, party, trialLossStreaks })
      persist()
    },

    // Beat Grand Champion Vesper: award the legendary Aurelune, mark the game done.
    winChampion: () => {
      const cap = get().levelCap
      // The legendary Aurelune is the ultimate trophy — max IVs (§5).
      const party = xpParty(
        [...get().party, makeCreature('aurelune', Math.min(15, cap), MAX_IVS)],
        XP_PER_BATTLE_WIN,
        cap,
      )
      set({ party, championDefeated: true })
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

    resetGame: () => {
      clearSave()
      set({
        playerName:       '',
        party:            [],
        areasDone:        [],
        championDefeated: false,
        activeTeam:       [],
        trialLossStreaks: {},
        badges:           0,
        levelCap:         levelCapForBadges(0),
        currentScreen:    'worldMap',
        selectedZoneId:   null,
        selectedAreaId:   null,
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
          activeTeam:       saved.activeTeam ?? [],
          trialLossStreaks: saved.trialLossStreaks ?? {},
          selectedZoneId:   saved.lastZoneId ?? null,
          currentScreen:    'worldMap',
          ...derive(saved.areasDone),
        })
      }
    },
  }
})
