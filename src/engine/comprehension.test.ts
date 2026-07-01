import { describe, it, expect } from 'vitest'
import { COMPREHENSION_BANK } from '../content/comprehensionBank'
import { generateComprehensionProblem } from './comprehensionGenerator'

describe('COMPREHENSION_BANK — structure', () => {
  it('has exactly 90 entries', () => {
    expect(COMPREHENSION_BANK).toHaveLength(90)
  })

  it('has exactly 15 entries per zone (1–6)', () => {
    for (const zone of [1, 2, 3, 4, 5, 6] as const) {
      const count = COMPREHENSION_BANK.filter(e => e.zone === zone).length
      expect(count).toBe(15)
    }
  })

  it('every entry has exactly 4 choices', () => {
    for (const entry of COMPREHENSION_BANK) {
      expect(entry.choices).toHaveLength(4)
    }
  })

  it('every entry has a valid correctIndex in [0, 3]', () => {
    for (const entry of COMPREHENSION_BANK) {
      expect(entry.correctIndex).toBeGreaterThanOrEqual(0)
      expect(entry.correctIndex).toBeLessThanOrEqual(3)
    }
  })

  it('every entry has non-empty passage, question, and hint', () => {
    for (const entry of COMPREHENSION_BANK) {
      expect(entry.passage.length).toBeGreaterThan(10)
      expect(entry.question.length).toBeGreaterThan(5)
      expect(entry.hint.length).toBeGreaterThan(5)
    }
  })

  it('the correct choice is one of the 4 choices', () => {
    for (const entry of COMPREHENSION_BANK) {
      const correct = entry.choices[entry.correctIndex]
      expect(correct).toBeDefined()
      expect(correct.length).toBeGreaterThan(0)
    }
  })
})

describe('generateComprehensionProblem', () => {
  it('returns a valid ComprehensionProblem shape', () => {
    const p = generateComprehensionProblem(2)
    expect(p.type).toBe('comprehension')
    expect(p.passage).toBeTruthy()
    expect(p.question).toBeTruthy()
    expect(p.choices).toHaveLength(4)
    expect(p.correctIndex).toBeGreaterThanOrEqual(0)
    expect(p.correctIndex).toBeLessThanOrEqual(3)
    expect(p.hint).toBeTruthy()
  })

  it('band-1 difficulty (≤3) draws from zone-1 entries', () => {
    const zone1Passages = new Set(COMPREHENSION_BANK.filter(e => e.zone === 1).map(e => e.passage))
    for (let i = 0; i < 15; i++) {
      const p = generateComprehensionProblem(2)
      expect(zone1Passages.has(p.passage)).toBe(true)
    }
  })

  it('band-6 difficulty (≥20) draws from zone-6 entries', () => {
    const zone6Passages = new Set(COMPREHENSION_BANK.filter(e => e.zone === 6).map(e => e.passage))
    const p = generateComprehensionProblem(20)
    expect(zone6Passages.has(p.passage)).toBe(true)
  })
})
