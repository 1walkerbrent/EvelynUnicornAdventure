import { describe, it, expect, beforeEach } from 'vitest'
import { MATH, LOGIC, mathFor, problemFor } from './grades'
import { GRADES } from './gradeTypes'
import type { Zone } from './gradeTypes'
import type { MathProblem } from '../engine/problems'
import { checkAnswer } from '../engine/mathKit'
import { elimination, ordering, grid, pattern, chain, permutations } from '../engine/logicKit'
import { migrateSave } from '../state/save'
import { useGameStore } from '../state/store'

const ZONES: Zone[] = [1, 2, 3, 4, 5, 6]

function seeded(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

/** Value of an expression as the game writes it: commas, × ÷ −, [ ], mixed numbers like "2 1/4". */
function evaluate(expr: string): number {
  const js = expr
    .replace(/,/g, '')
    .replace(/(\d+) (\d+)\/(\d+)/g, '($1+$2/$3)')
    .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
    .replace(/\[/g, '(').replace(/\]/g, ')')
    .replace(/10¹/g, '10').replace(/10²/g, '100').replace(/10³/g, '1000')
  if (!/^[\d\s+\-*/().]+$/.test(js)) throw new Error(`not arithmetic: ${expr}`)
  return Function(`return (${js})`)() as number
}

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

/** Re-derive the answer from the prompt wherever the prompt is plain arithmetic, and check it matches. */
function verify(p: MathProblem): void {
  const a = p.answer
  const round = p.prompt.match(/^Round (\d+) to the nearest (10|100) = __$/)
  if (round) {
    expect(a).toEqual({ kind: 'number', value: Math.round(Number(round[1]) / Number(round[2])) * Number(round[2]) })
    return
  }
  const end = p.prompt.match(/^(.+) = __$/)
  if (end && !/[a-z]/i.test(end[1])) {
    const v = evaluate(end[1])
    if (a.kind === 'number' || a.kind === 'decimal') expect(close(a.value, v), p.prompt).toBe(true)
    else if (a.kind === 'fraction') expect(close(a.num / a.den, v), p.prompt).toBe(true)
    else if (a.kind === 'remainder') {
      const [n, d] = end[1].split('÷').map((x) => Number(x.replace(/,/g, '')))
      expect(a.quotient * d + a.remainder, p.prompt).toBe(n)
      expect(a.remainder).toBeGreaterThanOrEqual(0)
      expect(a.remainder).toBeLessThan(d)
    }
    return
  }
  const cmp = p.prompt.match(/^(.+?) {2}__ {2}(.+)$/)
  if (cmp && a.kind === 'choice') {
    const l = evaluate(cmp[1]), r = evaluate(cmp[2])
    expect(a.choices[a.correctIndex], p.prompt).toBe(l < r ? '<' : close(l, r) ? '=' : '>')
    return
  }
  // A blank on the left or in the middle: put the answer in and check the equation holds.
  if (p.prompt.includes('__') && p.prompt.includes('=') && a.kind === 'number') {
    const [lhs, rhs] = p.prompt.split('=').map((s) => s.replace('__', String(a.value)))
    if (!/[a-z]/i.test(lhs + rhs)) expect(close(evaluate(lhs), evaluate(rhs)), p.prompt).toBe(true)
  }
}

describe('grade math — every skill in every zone, 150 samples each', () => {
  for (const grade of GRADES) {
    for (const zone of ZONES) {
      for (const skill of MATH[grade][zone]) {
        it(`grade ${grade} zone ${zone}: ${skill.label}`, () => {
          const rng = seeded(grade * 1000 + zone * 100 + skill.label.length)
          for (let i = 0; i < 150; i++) {
            const p = skill.make(rng)
            expect(p.type).toBe('math')
            expect(p.hint.length).toBeGreaterThan(10)
            const a = p.answer
            if (a.kind === 'number') expect(Number.isInteger(a.value) && a.value >= 0, p.prompt).toBe(true)
            if (a.kind === 'decimal') expect(Number.isFinite(a.value) && a.value >= 0, p.prompt).toBe(true)
            if (a.kind === 'fraction') expect(a.den > 0 && a.num >= 0 && Number.isInteger(a.num), p.prompt).toBe(true)
            if (a.kind === 'choice') {
              expect(a.choices.length).toBeGreaterThanOrEqual(2)
              expect(new Set(a.choices).size).toBe(a.choices.length)
              expect(a.correctIndex).toBeGreaterThanOrEqual(0)
              expect(a.correctIndex).toBeLessThan(a.choices.length)
            }
            if (skill.times) expect(p.multiplication, `${skill.label} should count as × work`).toBe(true)
            verify(p)
          }
        })
      }
    }
  }
})

describe('grade math — ranges match the grade', () => {
  const sample = (grade: 3 | 4 | 5, zone: Zone, n = 400) => {
    const rng = seeded(grade * 7 + zone)
    return Array.from({ length: n }, () => mathFor(grade, zone, 'practice', rng))
  }

  it('Grade 3 stays within 1,000 and never uses 2-digit-only + or −', () => {
    for (const zone of ZONES) {
      for (const p of sample(3, zone)) {
        for (const n of p.prompt.match(/\d+/g) ?? []) expect(Number(n)).toBeLessThanOrEqual(1000)
        const m = p.prompt.match(/^(\d+) [+−] (\d+) = __$/)
        if (m) expect(Math.max(Number(m[1]), Number(m[2]))).toBeGreaterThanOrEqual(100)
      }
    }
  })

  it('Grade 4 + and − reach 6 digits by Zone 3, and stay under 1,000,000', () => {
    const big = sample(4, 3).filter((p) => /^[\d,]+ [+−] [\d,]+ = __$/.test(p.prompt))
    expect(big.some((p) => /\d{3},\d{3}/.test(p.prompt))).toBe(true)
    for (const p of big) for (const n of p.prompt.match(/[\d,]+/g)!) expect(Number(n.replace(/,/g, ''))).toBeLessThan(1_000_000)
  })

  it('Grade 4 has remainders, Grade 5 has unlike denominators and decimals', () => {
    expect(sample(4, 4).some((p) => p.answer.kind === 'remainder')).toBe(true)
    expect(sample(5, 5).some((p) => /\d\/(\d+) [+−] \d\/(?!\1)\d/.test(p.prompt))).toBe(true)
    expect(sample(5, 2).some((p) => p.answer.kind === 'decimal')).toBe(true)
  })

  it('Hunt math comes from one zone lower (Zone 1 uses its own)', () => {
    const labels = (g: 3 | 4 | 5, z: Zone) => new Set(MATH[g][z].map((s) => s.make(seeded(1)).skill))
    for (const grade of GRADES) {
      const rng = seeded(grade)
      for (let i = 0; i < 100; i++) {
        expect(labels(grade, 2)).toContain(mathFor(grade, 3, 'hunt', rng).skill)
        expect(labels(grade, 1)).toContain(mathFor(grade, 1, 'hunt', rng).skill)
      }
    }
  })
})

describe('answer checking', () => {
  const n = (value: number) => ({ kind: 'number' as const, value })
  it('whole numbers ignore commas and spaces', () => {
    expect(checkAnswer(n(4527), { kind: 'text', text: '4,527' })).toBe(true)
    expect(checkAnswer(n(4527), { kind: 'text', text: ' 4527 ' })).toBe(true)
    expect(checkAnswer(n(4527), { kind: 'text', text: '4528' })).toBe(false)
    expect(checkAnswer(n(45), { kind: 'text', text: '45.0' })).toBe(false)
    expect(checkAnswer(n(45), { kind: 'text', text: '' })).toBe(false)
  })
  it('decimals compare by value', () => {
    const d = { kind: 'decimal' as const, value: 0.5 }
    expect(checkAnswer(d, { kind: 'text', text: '0.5' })).toBe(true)
    expect(checkAnswer(d, { kind: 'text', text: '.50' })).toBe(true)
    expect(checkAnswer(d, { kind: 'text', text: '0.05' })).toBe(false)
  })
  it('fractions accept any equal value, improper or mixed', () => {
    const f = { kind: 'fraction' as const, num: 10, den: 8 }   // 1 1/4
    for (const [whole, num, den] of [['', '5', '4'], ['1', '1', '4'], ['1', '2', '8'], ['', '10', '8']]) {
      expect(checkAnswer(f, { kind: 'fraction', whole, num, den }), `${whole} ${num}/${den}`).toBe(true)
    }
    expect(checkAnswer(f, { kind: 'fraction', whole: '1', num: '1', den: '5' })).toBe(false)
    expect(checkAnswer(f, { kind: 'fraction', whole: '', num: '5', den: '0' })).toBe(false)
    // A whole-number answer can go in the whole box alone.
    expect(checkAnswer({ kind: 'fraction', num: 12, den: 4 }, { kind: 'fraction', whole: '3', num: '', den: '' })).toBe(true)
  })
  it('an empty remainder means 0', () => {
    expect(checkAnswer({ kind: 'remainder', quotient: 12, remainder: 0 }, { kind: 'remainder', quotient: '12', remainder: '' })).toBe(true)
    expect(checkAnswer({ kind: 'remainder', quotient: 12, remainder: 3 }, { kind: 'remainder', quotient: '12', remainder: '' })).toBe(false)
  })
})

// ── logic: each clue puzzle has exactly one answer ───────────────────────────

const names = (text: string) => text.match(/\b[A-Z][a-z]+\b/g) ?? []

describe('logic kit — one answer, checked from the printed clues', () => {
  it('permutations covers every order', () => {
    expect(permutations(4)).toHaveLength(24)
    expect(new Set(permutations(4).map((p) => p.join())).size).toBe(24)
  })

  it('ordering: exactly one person fits the question', () => {
    const rng = seeded(5)
    for (let i = 0; i < 200; i++) {
      const p = ordering(rng, { items: 3 + (i % 4), middle: i % 2 === 0, notClues: i % 3 === 0 })
      const people = p.choices
      const idx = (n: string) => people.indexOf(n)
      // Read the clues back into checks on a ranking (0 = least).
      const more = new Set(['taller', 'faster', 'older', 'heavier'])
      const checks: Array<(r: number[]) => boolean> = []
      for (const line of p.prompt.split('\n').filter((l) => l.startsWith('• '))) {
        const m = line.match(/^• (\w+) is (\w+) than (\w+)\.$/)
        if (m) {
          const [, a, w, b] = m
          checks.push(more.has(w) ? (r) => r[idx(a)] > r[idx(b)] : (r) => r[idx(a)] < r[idx(b)])
          continue
        }
        const nm = line.match(/^• (\w+) is not the (\w+)\.$/)!
        const isMost = ['tallest', 'fastest', 'oldest', 'heaviest'].includes(nm[2])
        checks.push((r) => r[idx(nm[1])] !== (isMost ? people.length - 1 : 0))
      }
      const q = p.prompt.match(/Who is the (second )?(\w+)\?/)!
      const isMost = ['tallest', 'fastest', 'oldest', 'heaviest'].includes(q[2])
      const place = q[1] ? people.length - 2 : isMost ? people.length - 1 : 0
      const fits = permutations(people.length).filter((r) => checks.every((c) => c(r)))
      const answers = new Set(fits.map((r) => r.indexOf(place)))
      expect(answers.size, p.prompt).toBe(1)
      expect([...answers][0]).toBe(p.correctIndex)
    }
  })

  it('grid: exactly one person can have the asked thing', () => {
    const rng = seeded(6)
    for (let i = 0; i < 200; i++) {
      const size = ([2, 3, 4] as const)[i % 3]
      const p = grid(rng, { size, positive: i % 2 === 0 })
      const people = p.choices
      const things = p.prompt.split('\n')[1].replace(/^To choose from: /, '').replace(/\.$/, '').split(', ')
      const checks: Array<(a: number[]) => boolean> = []
      for (const line of p.prompt.split('\n').filter((l) => l.startsWith('• '))) {
        const who = people.indexOf(names(line)[0] ?? '')
        const neg = line.match(/(?:does|did) not \w+(?: in)? the (.+)\.$/)
        if (neg) { const t = things.indexOf(neg[1]); checks.push((a) => a[who] !== t); continue }
        const t = things.findIndex((x) => line.endsWith(` ${x}.`))
        checks.push((a) => a[who] === t)
      }
      const target = things.findIndex((x) => p.prompt.endsWith(` the ${x}?`))
      const fits = permutations(size).filter((a) => checks.every((c) => c(a)))
      const answers = new Set(fits.map((a) => a.indexOf(target)))
      expect(answers.size, p.prompt).toBe(1)
      expect([...answers][0]).toBe(p.correctIndex)
    }
  })

  it('elimination: exactly one spot survives the clues', () => {
    const rng = seeded(7)
    for (let i = 0; i < 200; i++) {
      const items = 3 + (i % 4)
      const p = elimination(rng, { items, relative: i % 2 === 0 })
      const attrOf = p.choices.map((c) => c.split(': ')[1].split(' ')[0])
      let alive = p.choices.map((_, k) => k)
      for (const line of p.prompt.split('\n')) {
        const spot = line.match(/^It is NOT in spot (\d)\.$/)
        const not = line.match(/^It is NOT the (\S+) /)
        const left = line.match(/left of the (\S+) /)
        const right = line.match(/right of the (\S+) /)
        const next = line.match(/next to the (\S+) /)
        if (spot) alive = alive.filter((k) => k !== Number(spot[1]) - 1)
        else if (not) alive = alive.filter((k) => attrOf[k] !== not[1])
        else if (left) alive = alive.filter((k) => k < attrOf.indexOf(left[1]))
        else if (right) alive = alive.filter((k) => k > attrOf.indexOf(right[1]))
        else if (next) alive = alive.filter((k) => Math.abs(k - attrOf.indexOf(next[1])) === 1)
      }
      expect(alive, p.prompt).toEqual([p.correctIndex])
    }
  })

  it('patterns: the right answer continues the sequence, and two-rule patterns alternate', () => {
    const rng = seeded(8)
    for (let i = 0; i < 200; i++) {
      const p = pattern(rng, { rules: ['twoRule'], maxStep: 10 })
      const seq = p.prompt.split('\n\n')[1].replace(', __', '').split(', ').map(Number)
      const next = Number(p.choices[p.correctIndex])
      const m = p.hint.match(/× (\d+), then \+ (\d+)/)!
      const [mult, add] = [Number(m[1]), Number(m[2])]
      expect(seq[1]).toBe(seq[0] * mult)
      expect(seq[2]).toBe(seq[1] + add)
      expect(next).toBe(seq[4] * mult)
      expect(p.choices).toHaveLength(4)
    }
  })

  it('chains: forward answers the last link; backward answers "the first did not happen"', () => {
    const rng = seeded(9)
    let backward = 0
    for (let i = 0; i < 100; i++) {
      const p = chain(rng, { steps: 4, distractor: true, backward: 0.5 })
      const right = p.choices[p.correctIndex]
      if (p.prompt.includes('What do you know for sure?')) {
        backward++
        expect(right).toMatch(/ not |does not|do not/)
      }
      expect(p.prompt.split('\n').filter((l) => l.startsWith('• If'))).toHaveLength(5)
    }
    expect(backward).toBeGreaterThan(20)
  })

  it('every logic format in every grade and zone makes a valid puzzle', () => {
    for (const grade of GRADES) {
      for (const zone of ZONES) {
        for (const f of LOGIC[grade][zone]) {
          const rng = seeded(grade + zone)
          for (let i = 0; i < 40; i++) {
            const p = f.make(rng)
            expect(p.choices.length, `${grade}/${zone} ${f.label}`).toBeGreaterThanOrEqual(2)
            expect(new Set(p.choices).size).toBe(p.choices.length)
            expect(p.choices[p.correctIndex]).toBeDefined()
          }
        }
      }
    }
  })

  it('logic grows with the grade: Zone 1 puzzles have more choices in Grade 5 than Grade 3', () => {
    const avg = (g: 3 | 4 | 5) => {
      const rng = seeded(g)
      const ps = Array.from({ length: 300 }, () => problemFor(g, 1, 'logic', 'practice', rng))
      return ps.reduce((s, p) => s + (p.type === 'logic' ? p.choices.length : 0), 0) / ps.length
    }
    expect(avg(5)).toBeGreaterThan(avg(4))
    expect(avg(4)).toBeGreaterThan(avg(3))
  })
})

// ── the grade on the save and in the store ───────────────────────────────────

describe('grade on the save', () => {
  const v11 = {
    version: 11, playerName: 'Evelyn', party: [], areasDone: [], championDefeated: false,
    activeTeam: [], trialLossStreaks: {}, recentPuzzleAttempts: [], prestigeCount: 0, awaitingStarter: false,
    toursDone: [],
  }
  it('saves from before grades default to Grade 3', () => {
    expect(migrateSave(v11)!.grade).toBe(3)
  })
  it('a v12 save keeps its grade; nonsense falls back to 3', () => {
    expect(migrateSave({ ...v11, version: 12, grade: 5 })!.grade).toBe(5)
    expect(migrateSave({ ...v11, version: 12, grade: 7 })!.grade).toBe(3)
  })
})

describe('store — choosing a grade', () => {
  beforeEach(() => {
    localStorage.clear()
    useGameStore.getState().openSlot(1)
  })

  it('a new adventure saves the grade it picked', () => {
    useGameStore.getState().chooseGrade(4)
    useGameStore.getState().setPlayerName('Ava')
    useGameStore.getState().openSlot(1)
    expect(useGameStore.getState().grade).toBe(4)
  })

  it('changing grade clears the accuracy history; keeping it does not', () => {
    const s = useGameStore.getState()
    s.setPlayerName('Ava')
    s.recordPuzzleAttempt('math', false)
    s.recordPuzzleAttempt('math', false)
    useGameStore.getState().chooseGrade(3)
    expect(useGameStore.getState().recentPuzzleAttempts).toHaveLength(2)
    useGameStore.getState().chooseGrade(5)
    expect(useGameStore.getState().recentPuzzleAttempts).toEqual([])
  })

  it('a new journey keeps the grade until she picks another', () => {
    useGameStore.getState().chooseGrade(4)
    useGameStore.getState().setPlayerName('Ava')
    useGameStore.getState().prestige()
    expect(useGameStore.getState().grade).toBe(4)
  })
})
