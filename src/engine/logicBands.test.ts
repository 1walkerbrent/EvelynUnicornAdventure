import { describe, it, expect } from 'vitest'
import { buildLogicPuzzle, generateLogicProblem, N_THEMES } from './logicGenerator'

describe('buildLogicPuzzle — correctness & uniqueness over 300 samples', () => {
  for (const numOptions of [4, 5]) {
    describe(`${numOptions} options`, () => {
      it('produces exactly numOptions distinct choices and a valid correctIndex', () => {
        for (let i = 0; i < 300; i++) {
          const theme = N_THEMES[i % N_THEMES.length]
          const { problem } = buildLogicPuzzle(Math.random, numOptions, theme)
          expect(problem.choices.length).toBe(numOptions)
          expect(new Set(problem.choices).size).toBe(numOptions)
          expect(problem.correctIndex).toBeGreaterThanOrEqual(0)
          expect(problem.correctIndex).toBeLessThan(numOptions)
        }
      })

      it('clues eliminate every wrong option and never the correct one (unique answer)', () => {
        for (let i = 0; i < 300; i++) {
          const theme = N_THEMES[i % N_THEMES.length]
          const { problem, targeted } = buildLogicPuzzle(Math.random, numOptions, theme)

          // Correct option is never targeted by a clue…
          expect(targeted).not.toContain(problem.correctIndex)
          // …and every OTHER option is eliminated, leaving exactly one survivor.
          const expectedWrongs = Array.from({ length: numOptions }, (_, k) => k)
            .filter(k => k !== problem.correctIndex)
          expect([...targeted].sort((a, b) => a - b)).toEqual(expectedWrongs)
          // Exactly one survivor == the correct answer.
          expect(targeted.length).toBe(numOptions - 1)
        }
      })
    })
  }
})

describe('generateLogicProblem — scales option count with difficulty band', () => {
  const cases: Array<{ diff: number; options: number }> = [
    { diff: 2,  options: 3 },   // band 1
    { diff: 5,  options: 3 },   // band 2
    { diff: 9,  options: 4 },   // band 3
    { diff: 13, options: 4 },   // band 4
    { diff: 17, options: 5 },   // band 5
    { diff: 22, options: 5 },   // band 6
  ]

  for (const { diff, options } of cases) {
    it(`difficulty ${diff} → ${options} options, valid correctIndex`, () => {
      for (let i = 0; i < 100; i++) {
        const p = generateLogicProblem(diff)
        expect(p.choices.length).toBe(options)
        expect(p.correctIndex).toBeGreaterThanOrEqual(0)
        expect(p.correctIndex).toBeLessThan(options)
      }
    })
  }

  it('all positions appear as the answer across many high-band runs', () => {
    const seen = new Set<number>()
    for (let i = 0; i < 400; i++) seen.add(generateLogicProblem(17).correctIndex)
    expect(seen.size).toBe(5)   // every one of the 5 positions can be correct
  })
})
