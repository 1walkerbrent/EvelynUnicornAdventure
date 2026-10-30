// `npm run check:reading`: every written grade/zone passes the §23 reading
// rules, and a status table shows what's written so far.
import { describe, it, expect, afterAll } from 'vitest'
import { READING, readingFor } from './grades'
import { GRADES } from './gradeTypes'
import type { Zone } from './gradeTypes'
import { checkZone, zoneStatus, wordCount, PASSAGES_PER_ZONE } from './readingRules'

const ZONES: Zone[] = [1, 2, 3, 4, 5, 6]

function seeded(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

describe('reading passages by grade', () => {
  for (const grade of GRADES) {
    for (const zone of ZONES) {
      it(`grade ${grade} zone ${zone} passes the rules`, () => {
        expect(checkZone(grade, zone, READING[grade][zone])).toEqual([])
      })
    }

    it(`grade ${grade} passages get longer, never shorter, zone by zone`, () => {
      const avgs = ZONES.map((z) => READING[grade][z])
        .filter((ps) => ps.length > 0)
        .map((ps) => ps.reduce((n, p) => n + wordCount(p.passage), 0) / ps.length)
      for (let i = 1; i < avgs.length; i++) expect(avgs[i]).toBeGreaterThanOrEqual(avgs[i - 1])
    })
  }

  it('no passage is used twice anywhere', () => {
    const all = GRADES.flatMap((g) => ZONES.flatMap((z) => READING[g][z].map((p) => p.passage)))
    expect(new Set(all).size).toBe(all.length)
  })

  it('serves each of a zone\'s passages once before any repeats', () => {
    const passages = READING[3][1]
    const rng = seeded(7)
    const seen = new Set<string>()
    for (let i = 0; i < PASSAGES_PER_ZONE; i++) seen.add(readingFor(3, 1, rng).passage)
    expect(seen.size).toBe(passages.length)
  })

  it('serves a question that belongs to the passage', () => {
    const rng = seeded(11)
    for (let i = 0; i < 40; i++) {
      const p = readingFor(3, 1, rng)
      const source = READING[3][1].find((x) => x.passage === p.passage)!
      expect(source.questions.some((q) => q.question === p.question && q.correctIndex === p.correctIndex)).toBe(true)
    }
  })
})

afterAll(() => {
  const rows = GRADES.flatMap((g) => ZONES.map((z) => zoneStatus(g, z, READING[g][z])))
  const written = rows.filter((r) => r.passages > 0).length
  console.log(`\nReading: ${written} of ${rows.length} grade/zones written`)
  console.table(rows.map((r) => ({
    grade: r.grade, zone: r.zone, passages: r.passages, words: r.words,
    'words/sentence': r.wordsPerSentence, questions: r.questions, problems: r.errors,
  })))
})
