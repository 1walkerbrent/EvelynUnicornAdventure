import { describe, it, expect } from 'vitest'
import { buildMathSpec, generateMathProblem } from './mathGenerator'
import type { MathSpec } from './mathGenerator'

// Expected answer digit-range per band (§9 ramp).
const BAND_RANGE: Record<number, [number, number]> = {
  2: [10, 99],
  3: [10, 999],
  4: [100, 999],
  5: [100, 999],
  6: [100, 999],
}

const BAND_OPS: Record<number, [number, number]> = {
  2: [1, 2],
  3: [2, 2],
  4: [2, 2],
  5: [2, 3],
  6: [2, 3],
}

function recompute(spec: MathSpec): number {
  let acc = spec.numbers[0]
  for (let i = 0; i < spec.ops.length; i++) {
    acc = spec.ops[i] === '+' ? acc + spec.numbers[i + 1] : acc - spec.numbers[i + 1]
  }
  return acc
}

const BANDS = [2, 3, 4, 5, 6] as const

describe('buildMathSpec — hard guarantees over 300 samples per band', () => {
  for (const band of BANDS) {
    describe(`band ${band}`, () => {
      it('answer is always strictly positive and within the band digit range', () => {
        const [lo, hi] = BAND_RANGE[band]
        for (let i = 0; i < 300; i++) {
          const spec = buildMathSpec(Math.random, band)
          expect(spec.answer).toBeGreaterThan(0)
          expect(spec.answer).toBeGreaterThanOrEqual(lo)
          expect(spec.answer).toBeLessThanOrEqual(hi)
        }
      })

      it('no intermediate running total is ever negative (or below the band floor)', () => {
        const [lo, hi] = BAND_RANGE[band]
        for (let i = 0; i < 300; i++) {
          const spec = buildMathSpec(Math.random, band)
          for (const total of spec.runningTotals) {
            expect(total).toBeGreaterThanOrEqual(lo)
            expect(total).toBeLessThanOrEqual(hi)
          }
        }
      })

      it('every subtraction is larger − smaller (operand never exceeds the running total)', () => {
        for (let i = 0; i < 300; i++) {
          const spec = buildMathSpec(Math.random, band)
          for (let s = 0; s < spec.ops.length; s++) {
            if (spec.ops[s] === '−') {
              // minuend is the running total BEFORE this step
              expect(spec.numbers[s + 1]).toBeLessThanOrEqual(spec.runningTotals[s])
            }
          }
        }
      })

      it('is internally consistent: recomputing the steps reproduces the answer', () => {
        for (let i = 0; i < 300; i++) {
          const spec = buildMathSpec(Math.random, band)
          expect(recompute(spec)).toBe(spec.answer)
          expect(spec.runningTotals[spec.runningTotals.length - 1]).toBe(spec.answer)
        }
      })

      it('operation count stays within the band envelope', () => {
        const [minOps, maxOps] = BAND_OPS[band]
        for (let i = 0; i < 200; i++) {
          const spec = buildMathSpec(Math.random, band)
          expect(spec.ops.length).toBeGreaterThanOrEqual(minOps)
          expect(spec.ops.length).toBeLessThanOrEqual(maxOps)
          expect(spec.numbers.length).toBe(spec.ops.length + 1)
        }
      })
    })
  }
})

describe('band 6 — extraneous info', () => {
  it('always includes exactly one distractor, distinct from every operand and the answer', () => {
    for (let i = 0; i < 300; i++) {
      const spec = buildMathSpec(Math.random, 6)
      expect(spec.extraneous).toBeDefined()
      const extra = spec.extraneous!
      // Distractor is not one of the operands (so it can't be part of the math)…
      expect(spec.numbers).not.toContain(extra)
      // …and isn't accidentally equal to the answer either.
      expect(extra).not.toBe(spec.answer)
    }
  })

  it('the single correct answer is unchanged by the extraneous number', () => {
    for (let i = 0; i < 200; i++) {
      const spec = buildMathSpec(Math.random, 6)
      // The answer is derived purely from numbers/ops; the distractor plays no part.
      expect(recompute(spec)).toBe(spec.answer)
    }
  })
})

describe('generateMathProblem — routing & rendered output', () => {
  // Representative difficulty inside each zone band.
  const cases: Array<{ diff: number; band: number }> = [
    { diff: 5,  band: 2 },
    { diff: 9,  band: 3 },
    { diff: 13, band: 4 },
    { diff: 17, band: 5 },
    { diff: 22, band: 6 },
  ]

  for (const { diff, band } of cases) {
    it(`difficulty ${diff} (band ${band}) → positive in-range integer answer with prose + hint`, () => {
      const [lo, hi] = BAND_RANGE[band]
      for (let i = 0; i < 100; i++) {
        const p = generateMathProblem(diff)
        expect(p.type).toBe('math')
        expect(Number.isInteger(p.correctAnswer)).toBe(true)
        expect(p.correctAnswer).toBeGreaterThanOrEqual(lo)
        expect(p.correctAnswer).toBeLessThanOrEqual(hi)
        expect(p.prompt).toContain('__')   // bare-equation format: "a + b = __"
        expect(p.hint.length).toBeGreaterThan(10)
      }
    })
  }

  it('higher bands produce larger average answers than band 2', () => {
    const mean = (diff: number) => {
      let sum = 0
      for (let i = 0; i < 200; i++) sum += generateMathProblem(diff).correctAnswer
      return sum / 200
    }
    expect(mean(13)).toBeGreaterThan(mean(5))   // 3-digit band vs 2-digit band
  })
})
