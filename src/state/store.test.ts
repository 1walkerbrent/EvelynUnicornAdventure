import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from './store'
import { ZONE_BY_ID } from '../content/zones'

// Guardian-signature ponies are trophies (§5): they always join with max IVs.
describe('winTrial — signature pony joins with max IVs (3/3/3)', () => {
  beforeEach(() => {
    localStorage.clear()
    useGameStore.getState().resetGame()
  })

  it('awards the Zone 2 signature (Boulderhoof) at max IVs', () => {
    const sigId = ZONE_BY_ID['z2'].signatureSpeciesId!
    useGameStore.getState().winTrial('z2')

    const trophy = useGameStore.getState().party.find((c) => c.speciesId === sigId)
    expect(trophy).toBeDefined()
    expect(trophy!.ivs).toEqual({ heart: 3, power: 3, speed: 3 })
  })

  it('the Champion reward (Aurelune) also joins at max IVs', () => {
    useGameStore.getState().winChampion()
    const aurelune = useGameStore.getState().party.find((c) => c.speciesId === 'aurelune')
    expect(aurelune).toBeDefined()
    expect(aurelune!.ivs).toEqual({ heart: 3, power: 3, speed: 3 })
  })
})

// §15 New Game+. The store action is where the whole world actually resets,
// so it is covered here rather than only in the pure engine tests.
describe('prestige — starting a new journey', () => {
  beforeEach(() => {
    localStorage.clear()
    useGameStore.getState().resetGame()
  })

  /** Play a full game: clear every zone, then beat the Champion. */
  function completeTheGame() {
    const store = useGameStore.getState()
    store.setPlayerName('Evelyn')
    for (const zoneId of ['z1', 'z2', 'z3', 'z4', 'z5', 'z6']) {
      useGameStore.getState().winTrial(zoneId)
    }
    useGameStore.getState().winChampion()
  }

  it('keeps Aurelune and leaves every other pony behind', () => {
    completeTheGame()
    expect(useGameStore.getState().party.length).toBeGreaterThan(1)

    useGameStore.getState().prestige()

    const party = useGameStore.getState().party
    expect(party).toHaveLength(1)
    expect(party[0].speciesId).toBe('aurelune')
  })

  it('resets the carried trophy to the fresh level cap', () => {
    completeTheGame()
    useGameStore.getState().prestige()

    const s = useGameStore.getState()
    expect(s.levelCap).toBe(4)
    expect(s.party[0].level).toBe(4)
    expect(s.party[0].xp).toBe(0)
  })

  it('wipes map progress, badges and the champion flag', () => {
    completeTheGame()
    useGameStore.getState().prestige()

    const s = useGameStore.getState()
    expect(s.areasDone).toEqual([])
    expect(s.badges).toBe(0)
    expect(s.championDefeated).toBe(false)
    expect(s.activeTeam).toEqual([])
    expect(s.trialLossStreaks).toEqual({})
  })

  it('keeps her name and asks for a new starter', () => {
    completeTheGame()
    useGameStore.getState().prestige()

    expect(useGameStore.getState().playerName).toBe('Evelyn')
    expect(useGameStore.getState().awaitingStarter).toBe(true)
  })

  it('counts the journey, and counts again on a second run', () => {
    completeTheGame()
    useGameStore.getState().prestige()
    expect(useGameStore.getState().prestigeCount).toBe(1)

    // Win it all a second time and go again.
    useGameStore.getState().setPlayerName('Evelyn')   // clears awaitingStarter
    for (const zoneId of ['z1', 'z2', 'z3', 'z4', 'z5', 'z6']) {
      useGameStore.getState().winTrial(zoneId)
    }
    useGameStore.getState().winChampion()
    useGameStore.getState().prestige()

    expect(useGameStore.getState().prestigeCount).toBe(2)
    // Both trophies come along — instance ids keep them distinct.
    const party = useGameStore.getState().party
    expect(party).toHaveLength(2)
    expect(new Set(party.map((c) => c.id)).size).toBe(2)
  })

  it('carries the puzzle history over — it describes how she learns, not how far she got', () => {
    completeTheGame()
    useGameStore.getState().recordPuzzleAttempt('spelling', false)
    useGameStore.getState().recordPuzzleAttempt('math', true)
    const before = useGameStore.getState().recentPuzzleAttempts

    useGameStore.getState().prestige()

    expect(useGameStore.getState().recentPuzzleAttempts).toEqual(before)
  })

  it('survives a save/load round trip', () => {
    completeTheGame()
    useGameStore.getState().prestige()

    useGameStore.getState().load()

    const s = useGameStore.getState()
    expect(s.prestigeCount).toBe(1)
    expect(s.awaitingStarter).toBe(true)
    expect(s.party).toHaveLength(1)
    expect(s.party[0].speciesId).toBe('aurelune')
    expect(s.party[0].level).toBe(4)
    expect(s.badges).toBe(0)
  })
})
