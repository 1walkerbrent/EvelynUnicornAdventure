import { describe, it, expect } from 'vitest'
import { generateHuntMathProblem } from './huntMathGenerator'

function seededRng(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return ((s >>> 0) / 0x100000000)
  }
}

describe('generateHuntMathProblem — clean bare equations', () => {
  for (const zone of [1, 2, 3, 4, 5, 6] as const) {
    describe(`Zone ${zone}`, () => {
      it('produces "__ " blank marker in every prompt', () => {
        const rng = seededRng(zone * 100)
        for (let i = 0; i < 50; i++) {
          const p = generateHuntMathProblem(zone, rng)
          expect(p.type).toBe('math')
          expect(p.prompt).toContain('__')
        }
      })

      it('answer is always a positive integer', () => {
        const rng = seededRng(zone * 200 + 1)
        for (let i = 0; i < 50; i++) {
          const p = generateHuntMathProblem(zone, rng)
          expect(Number.isInteger(p.correctAnswer)).toBe(true)
          expect(p.correctAnswer).toBeGreaterThan(0)
        }
      })

      it('uses only + and − operators (no ×, ÷)', () => {
        const rng = seededRng(zone * 300 + 2)
        for (let i = 0; i < 50; i++) {
          const p = generateHuntMathProblem(zone, rng)
          // Strip spaces, numbers, __, =, + and − — anything left is unexpected
          const unexpected = p.prompt.replace(/[\d\s+−=_]/g, '').trim()
          expect(unexpected).toBe('')
        }
      })
    })
  }
})

describe('generateHuntMathProblem — zone-specific range constraints', () => {
  it('Zone 1: result in [10, 49] — 2-digit, small numbers only', () => {
    const rng = seededRng(0x1111)
    for (let i = 0; i < 100; i++) {
      const p = generateHuntMathProblem(1, rng)
      expect(p.correctAnswer).toBeGreaterThanOrEqual(10)
      expect(p.correctAnswer).toBeLessThanOrEqual(49)
    }
  })

  it('Zone 5 and 6: prompt contains 3-digit numbers', () => {
    for (const zone of [5, 6] as const) {
      const rng = seededRng(zone * 0xAB + 3)
      const samples = Array.from({ length: 60 }, () => generateHuntMathProblem(zone, rng))
      const has3Digit = samples.some(p => /\b[1-9]\d{2}\b/.test(p.prompt))
      expect(has3Digit).toBe(true)
    }
  })

  it('Zone 3 produces blank-at-start equations (some prompts start with __)', () => {
    const rng = seededRng(0x5555)
    const samples = Array.from({ length: 100 }, () => generateHuntMathProblem(3, rng))
    const hasBlankStart = samples.some(p => p.prompt.startsWith('__'))
    expect(hasBlankStart).toBe(true)
  })

  it('Zones 4 and 6 produce two-operation equations (two + or − in prompt)', () => {
    for (const zone of [4, 6] as const) {
      const rng = seededRng(zone * 0xCC + 4)
      const samples = Array.from({ length: 60 }, () => generateHuntMathProblem(zone, rng))
      const hasTwoOps = samples.some(p => {
        const ops = (p.prompt.match(/[+−]/g) ?? []).length
        return ops >= 2
      })
      expect(hasTwoOps).toBe(true)
    }
  })
})
