import { describe, it, expect } from 'vitest'
import { scrambleWord, generateSpellingProblem } from './spellingGenerator'
import { SPELLING_BANK } from '../content/spellingBank'
import { ZONE_BANDS } from './difficulty'

// Deterministic LCG, same idiom as the other generator tests.
function seededRng(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return ((s >>> 0) / 0x100000000)
  }
}

const sorted = (s: string) => s.split('').sort().join('')

describe('scrambleWord', () => {
  it('keeps exactly the same letters', () => {
    const rng = seededRng(1)
    for (const entry of SPELLING_BANK) {
      expect(sorted(scrambleWord(entry.word, rng).join(''))).toBe(sorted(entry.word))
    }
  })

  it('never returns the word already in the right order', () => {
    // Every word, many seeds — this is the one guarantee that matters, since an
    // unscrambled word hands her the answer.
    for (let seed = 1; seed <= 40; seed++) {
      const rng = seededRng(seed)
      for (const entry of SPELLING_BANK) {
        expect(scrambleWord(entry.word, rng).join('')).not.toBe(entry.word)
      }
    }
  })

  it('handles repeated letters (pebble, shallow) without losing any', () => {
    const rng = seededRng(5)
    const out = scrambleWord('pebble', rng).join('')
    expect(sorted(out)).toBe(sorted('pebble'))
    expect(out).not.toBe('pebble')
    expect(out.split('').filter(c => c === 'b')).toHaveLength(2)
  })

  it('returns a word of all-identical letters unchanged (cannot be rearranged)', () => {
    expect(scrambleWord('aaa', seededRng(3))).toEqual(['a', 'a', 'a'])
  })

  it('is deterministic for a given seed', () => {
    expect(scrambleWord('meadow', seededRng(77))).toEqual(scrambleWord('meadow', seededRng(77)))
  })
})

describe('generateSpellingProblem', () => {
  it('picks a word from the band matching the difficulty', () => {
    for (let zone = 1; zone <= 6; zone++) {
      const { floor, ceiling } = ZONE_BANDS[zone]
      for (const difficulty of [floor, ceiling]) {
        const p = generateSpellingProblem(difficulty, seededRng(zone * 10 + difficulty))
        const entry = SPELLING_BANK.find(e => e.word === p.word)
        expect(entry, `no bank entry for "${p.word}"`).toBeDefined()
        expect(entry!.zone).toBe(zone)
      }
    }
  })

  it('returns a fully-populated problem whose tiles spell the word', () => {
    const p = generateSpellingProblem(1, seededRng(21))
    expect(p.type).toBe('spelling')
    expect(p.word.length).toBeGreaterThan(0)
    expect(p.scrambled).toHaveLength(p.word.length)
    expect(sorted(p.scrambled.join(''))).toBe(sorted(p.word))
    expect(p.sentence.length).toBeGreaterThan(0)
    expect(p.hint.length).toBeGreaterThan(0)
  })

  it('cycles a band before repeating a word (anti-repeat)', () => {
    // Band 6 has its own tracker; 15 pulls should yield close to 15 distinct
    // words (the tracker window is poolSize - 1).
    const rng = seededRng(404)
    const seen = new Set<string>()
    for (let i = 0; i < 15; i++) seen.add(generateSpellingProblem(24, rng).word)
    expect(seen.size).toBeGreaterThanOrEqual(14)
  })
})

describe('SPELLING_BANK integrity', () => {
  it('has 15 words in each of the 6 zones', () => {
    for (let zone = 1; zone <= 6; zone++) {
      expect(SPELLING_BANK.filter(e => e.zone === zone)).toHaveLength(15)
    }
  })

  it('has no duplicate words', () => {
    const words = SPELLING_BANK.map(e => e.word)
    expect(new Set(words).size).toBe(words.length)
  })

  it('uses lowercase a-z only, so every letter is one tile', () => {
    for (const entry of SPELLING_BANK) {
      expect(entry.word, `"${entry.word}" has non-letter characters`).toMatch(/^[a-z]+$/)
      expect(entry.word.length).toBeGreaterThanOrEqual(4)
    }
  })

  it('every sentence actually contains its word (that is the point of the button)', () => {
    for (const entry of SPELLING_BANK) {
      expect(
        entry.sentence.toLowerCase().includes(entry.word),
        `sentence for "${entry.word}" does not contain it`,
      ).toBe(true)
    }
  })

  it('no hint gives away the whole word', () => {
    // Word-boundary matched on purpose: hints open with "Starts with…", and a
    // plain substring check would flag "star" inside "Starts". What must never
    // appear is the word standing on its own.
    for (const entry of SPELLING_BANK) {
      const tokens = entry.hint.toLowerCase().split(/[^a-z]+/)
      expect(
        tokens.includes(entry.word),
        `hint for "${entry.word}" spells it out`,
      ).toBe(false)
    }
  })

  it('average word length increases with every band', () => {
    const avg = (zone: number) => {
      const words = SPELLING_BANK.filter(e => e.zone === zone)
      return words.reduce((s, e) => s + e.word.length, 0) / words.length
    }
    for (let zone = 2; zone <= 6; zone++) {
      expect(avg(zone), `band ${zone} is not harder than band ${zone - 1}`)
        .toBeGreaterThan(avg(zone - 1))
    }
  })
})
