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
