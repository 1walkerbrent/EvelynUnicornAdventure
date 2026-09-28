import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from './store'
import { ZONE_BY_ID } from '../content/zones'
import { ACHIEVEMENT_BY_ID, ACHIEVEMENTS } from '../engine/achievements'

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

// §19 — the store is where solves, wins and unlocks meet, so it's tested end to end.
describe('achievements + Stardust', () => {
  beforeEach(() => {
    localStorage.clear()
    useGameStore.getState().resetGame()
  })

  const fact = { type: 'math', prompt: '3 × 4 = __', correctAnswer: 12, hint: '', multiplication: true } as const

  it('a first-try solve pays the bonus; a missed one pays the base', () => {
    useGameStore.getState().recordSolve(fact, 0)
    useGameStore.getState().recordSolve(fact, 2)
    expect(useGameStore.getState().stardust).toBe(3)
  })

  it('five first-try times-table facts unlock Times Table Tamer, pay its reward and queue a pop-up', () => {
    for (let i = 0; i < 5; i++) useGameStore.getState().recordSolve(fact, 0)
    const s = useGameStore.getState()
    expect(s.achievements['times-bronze']).toBeDefined()
    expect(s.toastQueue).toContain('times-bronze')
    expect(s.stardust).toBe(5 * 2 + 10)
  })

  it('a hunt catch counts toward Pony Whisperer and the Pony Book', () => {
    useGameStore.getState().addToParty(
      { id: 'c_x', speciesId: 'boulderhoof', nickname: 'x', level: 3, currentHp: 10, xp: 0 },
      { tamed: true },
    )
    const s = useGameStore.getState()
    expect(s.lifetime.tamed).toBe(1)
    expect(s.lifetime.speciesSeen).toContain('boulderhoof')
    expect(s.achievements['tamer-bronze']).toBeDefined()
  })

  it('a battle win pays Stardust and records the win', () => {
    useGameStore.getState().recordBattleWin({ superHits: 1, survivors: 2, elements: ['water', 'fire'] })
    const s = useGameStore.getState()
    expect(s.lifetime.battlesWon).toBe(1)
    expect(s.achievements['super-effective']).toBeDefined()
  })

  it('beating a Guardian with no losses is a Flawless Trial; after a loss it is not', () => {
    useGameStore.getState().winTrial('z2')
    expect(useGameStore.getState().lifetime.perfectTrials).toBe(1)
    const guardianId = ZONE_BY_ID['z3'].guardianId!
    useGameStore.getState().recordTrialLoss(guardianId)
    useGameStore.getState().winTrial('z3')
    expect(useGameStore.getState().lifetime.perfectTrials).toBe(1)
  })

  it('Stardust, trophies and lifetime stats survive a new journey', () => {
    for (let i = 0; i < 5; i++) useGameStore.getState().recordSolve(fact, 0)
    useGameStore.getState().winChampion()
    const before = useGameStore.getState()
    const dust = before.stardust
    useGameStore.getState().prestige()
    const after = useGameStore.getState()
    // Nothing is lost — and starting the journey itself earns A New Journey.
    expect(after.stardust).toBe(dust + ACHIEVEMENT_BY_ID['journey-2'].reward)
    expect(after.achievements['times-bronze']).toBeDefined()
    expect(after.lifetime.championWins).toBe(1)
    expect(after.achievements['journey-2']).toBeDefined()
  })

  it('dismissToast pops the oldest pop-up', () => {
    useGameStore.setState({ toastQueue: ['a', 'b'] })
    useGameStore.getState().dismissToast()
    expect(useGameStore.getState().toastQueue).toEqual(['b'])
  })
})

// §20 — hatching and the Meadow change the party, Stardust and lifetime stats together.
describe('hatching + the Meadow', () => {
  beforeEach(() => {
    localStorage.clear()
    useGameStore.getState().resetGame()
  })

  function adult(id: string, speciesId: string, extra: Record<string, unknown> = {}) {
    return { id, speciesId, nickname: id, level: 6, currentHp: 10, xp: 0, ivs: { heart: 1, power: 1, speed: 1 }, ...extra }
  }

  function setup(stardust: number) {
    useGameStore.setState({
      party: [adult('a', 'marina-mist'), adult('b', 'ember-spark'), adult('c', 'sky-dancer'), adult('d', 'stella-dream')],
      activeTeam: ['a', 'b', 'c'],
      stardust,
    })
  }

  it('hatching adds a foal, charges Stardust, rests both parents and counts toward trophies', () => {
    setup(100)
    const foal = useGameStore.getState().hatch('a', 'd')
    expect(foal).not.toBeNull()
    const s = useGameStore.getState()
    expect(s.party).toHaveLength(5)
    expect(s.party.at(-1)!.parents).toEqual(['a', 'd'])
    expect(s.party.find((c) => c.id === 'a')!.restUntil).toBe(3)
    expect(s.party.find((c) => c.id === 'd')!.restUntil).toBe(3)
    expect(s.lifetime.hatched).toBe(1)
    expect(s.achievements['foals-bronze']).toBeDefined()
    // 100 − 15 to hatch, + 10 for Moonwell Friend bronze (+ any rare-color trophy)
    const colorBonus = foal!.variant ? 20 : 0
    expect(s.stardust).toBe(100 - 15 + 10 + colorBonus)
  })

  it('refuses without enough Stardust, or while a parent rests', () => {
    setup(5)
    expect(useGameStore.getState().hatch('a', 'd')).toBeNull()
    useGameStore.setState({ stardust: 100 })
    useGameStore.getState().hatch('a', 'd')
    expect(useGameStore.getState().hatch('a', 'b')).toBeNull()   // 'a' is resting
  })

  it('three battle wins wake a resting parent', () => {
    setup(100)
    useGameStore.getState().hatch('a', 'd')
    for (let i = 0; i < 3; i++) {
      useGameStore.getState().recordBattleWin({ superHits: 0, survivors: 3, elements: ['water'] })
    }
    expect(useGameStore.getState().hatch('a', 'b')).not.toBeNull()
  })

  it('refuses the same pony twice', () => {
    setup(100)
    expect(useGameStore.getState().hatch('a', 'a')).toBeNull()
  })

  it('a Guardian trophy can hatch, at the higher price', () => {
    setup(100)
    // Pretend every trophy is already earned, so only the hatch itself moves Stardust.
    const all = Object.fromEntries(ACHIEVEMENTS.map((x) => [x.id, '2026-01-01']))
    useGameStore.setState({
      party: [...useGameStore.getState().party, adult('g', 'boulderhoof', { trophy: true })],
      achievements: all,
    })
    useGameStore.getState().hatch('d', 'g')
    expect(useGameStore.getState().lifetime.hatched).toBe(1)
    expect(useGameStore.getState().stardust).toBe(100 - 35)
  })

  it('the Meadow pays Stardust for a benched pony and refuses the battle team', () => {
    setup(0)
    expect(useGameStore.getState().release('a')).toBe(0)          // on the team
    const paid = useGameStore.getState().release('d')             // benched, level 6
    expect(paid).toBe(8)
    const s = useGameStore.getState()
    expect(s.party.map((c) => c.id)).not.toContain('d')
    expect(s.lifetime.released).toBe(1)
    expect(s.achievements['kind-heart']).toBeDefined()
  })

  it('trophies are flagged when awarded', () => {
    useGameStore.getState().winTrial('z2')
    const sig = useGameStore.getState().party.find((c) => c.speciesId === ZONE_BY_ID['z2'].signatureSpeciesId)
    expect(sig!.trophy).toBe(true)
  })
})
