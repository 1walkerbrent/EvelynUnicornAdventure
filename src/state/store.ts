import { create } from 'zustand'
import type { Creature } from '../engine/types'
import { saveGame, loadGame } from './save'

// Badge table from §6
const BADGE_LEVEL_CAPS: Record<number, number> = {
  0: 4, 1: 6, 2: 8, 3: 10, 4: 12, 5: 15,
}

function getLevelCap(badges: number): number {
  return BADGE_LEVEL_CAPS[Math.min(badges, 5)] ?? 4
}

export type Screen = 'worldMap' | 'party'

interface GameStore {
  // persisted
  playerName: string
  party: Creature[]
  badges: number
  // derived — not persisted
  levelCap: number
  // ui — not persisted
  currentScreen: Screen
  // actions
  setPlayerName: (name: string) => void
  addToParty: (creature: Creature) => void
  addBadge: () => void
  setScreen: (screen: Screen) => void
  save: () => void
  load: () => void
}

export const useGameStore = create<GameStore>()((set, get) => ({
  playerName: '',
  party: [],
  badges: 0,
  levelCap: getLevelCap(0),
  currentScreen: 'worldMap',

  setPlayerName: (name) => {
    set({ playerName: name })
    const { party, badges } = get()
    saveGame({ playerName: name, party, badges })
  },

  addToParty: (creature) => {
    const party = [...get().party, creature]
    set({ party })
    const { playerName, badges } = get()
    saveGame({ playerName, party, badges })
  },

  addBadge: () => {
    const badges = Math.min(get().badges + 1, 5)
    set({ badges, levelCap: getLevelCap(badges) })
    const { playerName, party } = get()
    saveGame({ playerName, party, badges })
  },

  setScreen: (currentScreen) => set({ currentScreen }),

  save: () => {
    const { playerName, party, badges } = get()
    saveGame({ playerName, party, badges })
  },

  load: () => {
    const saved = loadGame()
    if (saved) {
      set({
        playerName: saved.playerName,
        party: saved.party,
        badges: saved.badges,
        levelCap: getLevelCap(saved.badges),
      })
    }
  },
}))
