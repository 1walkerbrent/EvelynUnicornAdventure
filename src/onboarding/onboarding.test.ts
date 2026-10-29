import { describe, it, expect, beforeEach } from 'vitest'
import { TOURS, TOUR_IDS } from './tours'
import { HELP_TIPS } from './helpContent'
import { useGameStore } from '../state/store'
import { migrateSave, loadSlot } from '../state/save'

// Every component's source, to check the tour targets are marked somewhere.
const SOURCES = import.meta.glob<string>('/src/**/*.tsx', { eager: true, query: '?raw', import: 'default' })
const allSource = Object.values(SOURCES).join('\n')

describe('tour content', () => {
  it('intro has 5–7 steps and battle has 3–4', () => {
    expect(TOURS.intro.length).toBeGreaterThanOrEqual(5)
    expect(TOURS.intro.length).toBeLessThanOrEqual(7)
    expect(TOURS.battle.length).toBeGreaterThanOrEqual(3)
    expect(TOURS.battle.length).toBeLessThanOrEqual(4)
  })

  it('every step target is marked with data-tour in a component', () => {
    for (const id of TOUR_IDS) {
      for (const step of TOURS[id]) {
        if (!step.target) continue
        // Either a literal data-tour="x", or a template/ternary that yields 'x'.
        const marked = allSource.includes(`data-tour="${step.target}"`) || allSource.includes(`'${step.target}'`)
          || (step.target.startsWith('nav-') && allSource.includes('data-tour={`nav-${screen}`}'))
        expect(marked, step.target).toBe(true)
      }
    }
  })

  it('captions are one short sentence', () => {
    for (const id of TOUR_IDS) {
      for (const { caption } of TOURS[id]) expect(caption.split(' ').length, caption).toBeLessThanOrEqual(11)
    }
  })
})

describe('help content', () => {
  it('every screen has 2–3 short tips', () => {
    for (const [screen, tips] of Object.entries(HELP_TIPS)) {
      expect(tips.length, screen).toBeGreaterThanOrEqual(2)
      expect(tips.length, screen).toBeLessThanOrEqual(3)
      for (const tip of tips) expect(tip.split(' ').length, tip).toBeLessThanOrEqual(11)
    }
  })
})

describe('saved tours', () => {
  const v10 = {
    version: 10, playerName: 'Evelyn', party: [], areasDone: [], championDefeated: false,
    activeTeam: [], trialLossStreaks: {}, recentPuzzleAttempts: [], prestigeCount: 0, awaitingStarter: false,
  }

  it('an older save belongs to someone already playing, so both tours count as done', () => {
    expect(migrateSave(v10)!.toursDone).toEqual(['intro', 'battle'])
  })

  it('a v11 save keeps its list, dropping anything unknown or repeated', () => {
    expect(migrateSave({ ...v10, version: 11, toursDone: [] })!.toursDone).toEqual([])
    expect(migrateSave({ ...v10, version: 11, toursDone: ['battle', 'karate', 'battle', 3] })!.toursDone).toEqual(['battle'])
    expect(migrateSave({ ...v10, version: 11 })!.toursDone).toEqual([])
  })
})

describe('store — tours', () => {
  beforeEach(() => {
    localStorage.clear()
    useGameStore.getState().openSlot(1)
    useGameStore.getState().setPlayerName('Evelyn')
  })

  it('a new game has seen no tours', () => {
    expect(useGameStore.getState().toursDone).toEqual([])
  })

  it('finishing a tour saves it to the slot, and it does not start again', () => {
    const s = useGameStore.getState()
    s.startTour('intro')
    expect(useGameStore.getState().activeTour).toBe('intro')
    useGameStore.getState().finishTour()
    expect(useGameStore.getState().activeTour).toBeNull()
    expect(loadSlot(1)!.toursDone).toEqual(['intro'])

    useGameStore.getState().startTour('intro')
    expect(useGameStore.getState().activeTour).toBeNull()
  })

  it('one tour at a time', () => {
    useGameStore.getState().startTour('intro')
    useGameStore.getState().startTour('battle')
    expect(useGameStore.getState().activeTour).toBe('intro')
  })

  it('tours are per adventure', () => {
    useGameStore.getState().startTour('intro')
    useGameStore.getState().finishTour()
    useGameStore.getState().openSlot(2)
    expect(useGameStore.getState().toursDone).toEqual([])
    useGameStore.getState().openSlot(1)
    expect(useGameStore.getState().toursDone).toEqual(['intro'])
  })

  it('Replay Tours forgets them and goes to the World Map', () => {
    for (const t of TOUR_IDS) {
      useGameStore.getState().startTour(t)
      useGameStore.getState().finishTour()
    }
    useGameStore.getState().setScreen('party')
    useGameStore.getState().replayTours()
    expect(useGameStore.getState().toursDone).toEqual([])
    expect(useGameStore.getState().currentScreen).toBe('worldMap')
    expect(loadSlot(1)!.toursDone).toEqual([])
  })

  it('a new journey keeps finished tours', () => {
    useGameStore.getState().startTour('battle')
    useGameStore.getState().finishTour()
    useGameStore.getState().prestige()
    expect(useGameStore.getState().toursDone).toEqual(['battle'])
  })
})
