import { describe, it, expect } from 'vitest'
import {
  generateMultiplicationProblem,
  generateDivisionFact,
  generateMissingFactor,
  generateMissingDivision,
  multiplicationHint,
  MULT_PARAMS,
} from './multiplication'
import type { MultBand } from './multiplication'
import type { MathProblem } from '../../engine/problems'

/** The typed whole-number answer (every fact here is one). */
const ans = (p: MathProblem) => (p.answer.kind === 'number' ? p.answer.value : NaN)

const BANDS: MultBand[] = [1, 2, 3, 4, 5, 6]

/** Seeded LCG so sampling tests are deterministic. */
function seeded(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

/** Pull the factors back out of "a × b = __" or "a × __ = c". */
function parse(prompt: string): { a: number; b: number | null; c: number | null } {
  const m = prompt.match(/^(\d+) × (\d+|__) = (\d+|__)$/)
  if (!m) throw new Error(`unexpected prompt: ${prompt}`)
  return {
    a: Number(m[1]),
    b: m[2] === '__' ? null : Number(m[2]),
    c: m[3] === '__' ? null : Number(m[3]),
  }
}

describe('generateMultiplicationProblem — hard guarantees over 300 samples per band', () => {
  for (const band of BANDS) {
    describe(`band ${band}`, () => {
      const rng = seeded(band * 97)
      const samples = Array.from({ length: 300 }, () => generateMultiplicationProblem(band, rng))

      it('is a well-formed × equation whose stated answer is correct', () => {
        for (const p of samples) {
          expect(p.type).toBe('math')
          expect(Number.isInteger(ans(p))).toBe(true)
          const { a, b, c } = parse(p.prompt)
          if (c === null) expect(ans(p)).toBe(a * (b as number))
          else expect(a * ans(p)).toBe(c)
        }
      })

      it('always uses one of the band’s focus facts, with the other factor in range', () => {
        const { focus, otherMin, otherMax } = MULT_PARAMS[band]
        for (const p of samples) {
          const { a, b, c } = parse(p.prompt)
          const other = b ?? ans(p)
          const [x, y] = [a, other]
          const ok =
            (focus.includes(x) && y >= otherMin && y <= otherMax) ||
            (focus.includes(y) && x >= otherMin && x <= otherMax)
          expect(ok, `${p.prompt} (c=${c})`).toBe(true)
        }
      })

      it('never exceeds 10 × 10', () => {
        for (const p of samples) {
          const { a, b } = parse(p.prompt)
          expect(a).toBeLessThanOrEqual(10)
          expect(b ?? ans(p)).toBeLessThanOrEqual(10)
        }
      })

      it('always has a hint that states the solved fact', () => {
        for (const p of samples) {
          expect(p.hint).toContain('×')
          expect(p.hint.length).toBeGreaterThan(0)
        }
      })
    })
  }

  it('bands 1–5 never use the missing-factor form; band 6 does', () => {
    for (const band of [1, 2, 3, 4, 5] as const) {
      const rng = seeded(band)
      for (let i = 0; i < 200; i++) {
        expect(generateMultiplicationProblem(band, rng).prompt).toMatch(/= __$/)
      }
    }
    const rng = seeded(6)
    const band6 = Array.from({ length: 200 }, () => generateMultiplicationProblem(6, rng))
    expect(band6.some(p => p.prompt.includes('× __'))).toBe(true)
  })

  it('missing-factor form never uses 0 as the known factor (no single answer)', () => {
    const rng = seeded(42)
    for (let i = 0; i < 1000; i++) {
      const p = generateMultiplicationProblem(6, rng)
      if (p.prompt.includes('× __')) expect(parse(p.prompt).a).not.toBe(0)
    }
  })

  it('band 1 sticks to the easiest facts: nothing beyond × 10 by 5', () => {
    const rng = seeded(1)
    for (let i = 0; i < 300; i++) {
      expect(ans(generateMultiplicationProblem(1, rng))).toBeLessThanOrEqual(50)
    }
  })
})

describe('multiplicationHint', () => {
  it('skip-counts by the bigger factor, the smaller number of times', () => {
    expect(multiplicationHint(3, 4)).toBe('Count by 4s, 3 times: 4, 8, 12. So 3 × 4 = 12')
    expect(multiplicationHint(9, 2)).toBe('Count by 9s, 2 times: 9, 18. So 9 × 2 = 18')
  })

  it('explains ×0 and ×1 as rules instead of counting', () => {
    expect(multiplicationHint(0, 7)).toContain('= 0')
    expect(multiplicationHint(6, 1)).toContain('same')
  })
})

describe('division facts and missing numbers', () => {
  it('division facts divide evenly, by the divisors asked for', () => {
    const rng = seeded(11)
    for (let i = 0; i < 300; i++) {
      const p = generateDivisionFact([2, 5, 10], rng)
      const [, n, d] = p.prompt.match(/^(\d+) ÷ (\d+) = __$/)!.map(Number)
      expect([2, 5, 10]).toContain(d)
      expect(ans(p) * d).toBe(n)
      expect(ans(p)).toBeLessThanOrEqual(10)
    }
  })

  it('missing factor and missing divisor have one right answer', () => {
    const rng = seeded(12)
    for (let i = 0; i < 300; i++) {
      const f = generateMissingFactor(rng)
      const m = f.prompt.match(/^(\d+|__) × (\d+|__) = (\d+)$/)!
      const known = Number(m[1] === '__' ? m[2] : m[1])
      expect(known * ans(f)).toBe(Number(m[3]))
      expect(known).toBeGreaterThan(0)

      const d = generateMissingDivision(rng)
      const k = d.prompt.match(/^(\d+|__) ÷ (\d+|__) = (\d+)$/)!
      if (k[1] === '__') expect(ans(d) / Number(k[2])).toBe(Number(k[3]))
      else expect(Number(k[1]) / ans(d)).toBe(Number(k[3]))
    }
  })
})
