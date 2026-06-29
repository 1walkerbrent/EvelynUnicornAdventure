import { create } from 'zustand'
import type { Creature } from '../engine/types'
import { saveGame, loadGame, clearSave } from './save'
import { SPECIES_BY_ID } from '../content/creatures'
import { ZONE_BY_ID } from '../content/zones'
import { GUARDIAN_BY_ID } from '../content/guardians'
import { addXp, levelCapForBadges, XP_PER_BATTLE_WIN } from '../engine/leveling'
import { getStats } from '../engine/stats'
import { finalAreaId, badgeCount } from '../engine/progression'

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
  function makeCreature(speciesId: string, level: number): Creature {
    const sp = SPECIES_BY_ID[speciesId]
    const stats = getStats(sp.tier, level)
    return { speciesId, nickname: sp.name, level, currentHp: stats.heart, xp: 0 }
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
        party = [...party, makeCreature(zone.signatureSpeciesId, Math.min(aceLevel, levelCap))]
      }
      party = xpParty(party, XP_PER_BATTLE_WIN, levelCap)

      set({ areasDone, badges, levelCap, party })
      persist()
    },

    // Beat Grand Champion Vesper: award the legendary Aurelune, mark the game done.
    winChampion: () => {
      const cap = get().levelCap
      const party = xpParty(
        [...get().party, makeCreature('aurelune', Math.min(15, cap))],
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
          selectedZoneId:   saved.lastZoneId ?? null,
          currentScreen:    'worldMap',
          ...derive(saved.areasDone),
        })
      }
    },
  }
})
