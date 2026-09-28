import { describe, it, expect } from 'vitest'
import { makeExplorePuzzle, focusOptions, isPuzzleFocus, FOCUS_OPTIONS } from './puzzleFocus'
import type { PuzzleFocus } from './puzzleFocus'

function make(focus: PuzzleFocus, extra: Partial<Parameters<typeof makeExplorePuzzle>[0]> = {}) {
  return makeExplorePuzzle({
    focus, mode: 'practice', zoneNumber: 2, difficulty: 5, recentAttempts: [], speechAvailable: true, ...extra,
  })
}

describe('makeExplorePuzzle — a chosen focus serves only that kind of puzzle', () => {
  const cases: Array<[PuzzleFocus, string]> = [
    ['math', 'math'], ['times', 'math'], ['spelling', 'spelling'], ['reading', 'comprehension'], ['logic', 'logic'],
  ]
  for (const [focus, type] of cases) {
    it(`${focus} → ${type}, every time`, () => {
      for (let i = 0; i < 40; i++) expect(make(focus).type).toBe(type)
    })
  }

  it('Times Tables is always a multiplication fact, in Practice and Hunt', () => {
    for (const mode of ['practice', 'hunt'] as const) {
      for (let i = 0; i < 40; i++) {
        const p = make('times', { mode })
        expect(p.type === 'math' && p.multiplication).toBe(true)
      }
    }
  })

  it('Math mixes + − with × (both show up)', () => {
    const ps = Array.from({ length: 200 }, () => make('math'))
    expect(ps.some((p) => p.type === 'math' && p.multiplication)).toBe(true)
    expect(ps.some((p) => p.type === 'math' && !p.multiplication)).toBe(true)
  })

  it('Mix it up serves more than one kind', () => {
    const types = new Set(Array.from({ length: 200 }, () => make('mix').type))
    expect(types.size).toBeGreaterThan(2)
  })

  it('Spelling on a device without speech falls back to the mix, never spelling', () => {
    for (let i = 0; i < 100; i++) {
      expect(make('spelling', { speechAvailable: false }).type).not.toBe('spelling')
    }
  })
})

describe('focus options', () => {
  it('hides Spelling without speech', () => {
    expect(focusOptions(false).map((f) => f.id)).not.toContain('spelling')
    expect(focusOptions(true)).toHaveLength(FOCUS_OPTIONS.length)
  })

  it('recognises valid focus ids only', () => {
    expect(isPuzzleFocus('times')).toBe(true)
    expect(isPuzzleFocus('dance')).toBe(false)
    expect(isPuzzleFocus(undefined)).toBe(false)
  })
})
