import { create } from 'zustand'
import type { Creature } from '../engine/types'
import { saveGame, loadGame, clearSave } from './save'
import { SPECIES_BY_ID } from '../content/creatures'
import { addXp, levelCapForBadges } from '../engine/leveling'

function getLevelCap(badges: number): number {
  return levelCapForBadges(badges)
}

export type Screen =
  | 'worldMap'
  | 'areaBrindlewood'
  | 'areaSunflower'
  | 'provingGlade'
  | 'party'

interface GameStore {
  // persisted
  playerName: string
  party: Creature[]
  badges: number
  brindlewoodDone: boolean
  sunflowerDone: boolean
  zone1Complete: boolean
  zone2Unlocked: boolean
  // derived — not persisted
  levelCap: number
  // ui — not persisted
  currentScreen: Screen
  // actions
  setPlayerName: (name: string) => void
  addToParty: (creature: Creature) => void
  awardXpToParty: (amount: number) => void
  addBadge: () => void
  setBrindlewoodDone: () => void
  setSunflowerDone: () => void
  completeZone1: () => void
  setScreen: (screen: Screen) => void
  save: () => void
  load: () => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>()((set, get) => {
  function persist() {
    const s = get()
    saveGame({
      playerName:      s.playerName,
      party:           s.party,
      badges:          s.badges,
      brindlewoodDone: s.brindlewoodDone,
      sunflowerDone:   s.sunflowerDone,
      zone1Complete:   s.zone1Complete,
      zone2Unlocked:   s.zone2Unlocked,
    })
  }

  return {
    playerName:      '',
    party:           [],
    badges:          0,
    brindlewoodDone: false,
    sunflowerDone:   false,
    zone1Complete:   false,
    zone2Unlocked:   false,
    levelCap:        getLevelCap(0),
    currentScreen:   'worldMap',

    setPlayerName: (name) => { set({ playerName: name }); persist() },

    addToParty: (creature) => {
      const party = [...get().party, creature]
      set({ party })
      persist()
    },

    // Grants XP to every party creature (correct answers & battle wins, §5).
    // Level is clamped at the current badge-based cap (§6); stats recompute on level-up.
    awardXpToParty: (amount) => {
      const cap = get().levelCap
      const party = get().party.map((c) => {
        const tier = SPECIES_BY_ID[c.speciesId]?.tier
        if (!tier) return c
        return addXp(c, tier, amount, cap).creature
      })
      set({ party })
      persist()
    },

    addBadge: () => {
      const badges = Math.min(get().badges + 1, 5)
      set({ badges, levelCap: getLevelCap(badges) })
      persist()
    },

    setBrindlewoodDone: () => { set({ brindlewoodDone: true }); persist() },
    setSunflowerDone:   () => { set({ sunflowerDone:   true }); persist() },

    completeZone1: () => {
      set({ zone1Complete: true, zone2Unlocked: true })
      persist()
    },

    setScreen: (currentScreen) => set({ currentScreen }),

    save: () => persist(),

    resetGame: () => {
      clearSave()
      set({
        playerName:      '',
        party:           [],
        badges:          0,
        brindlewoodDone: false,
        sunflowerDone:   false,
        zone1Complete:   false,
        zone2Unlocked:   false,
        levelCap:        getLevelCap(0),
        currentScreen:   'worldMap',
      })
    },

    load: () => {
      const saved = loadGame()
      if (saved) {
        set({ ...saved, levelCap: getLevelCap(saved.badges) })
      }
    },
  }
})
