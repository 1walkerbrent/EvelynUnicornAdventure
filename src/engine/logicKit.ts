// Logic puzzle generators (DESIGN.md §23). Each format takes settings (how
// many items, which kinds of clue, how many reasoning steps), so one format
// serves every grade. Puzzles built from clues are checked by brute force over
// every possible arrangement: a puzzle is only returned when exactly one
// answer fits, and clues that aren't needed are dropped, so every clue counts.
import type { LogicProblem } from './problems'
import type { Rng } from './mathKit'
import { randInt, pick, shuffle } from './mathKit'
import {
  N_THEMES, NAMES, ORDER_WORDS, GRID_THINGS, GEM_COLORS, GEM_SIZES, GEM_SHAPES, EVENTS,
  CHAIN_PUZZLES, USE_PUZZLES, MUST_PUZZLES, IMPOSSIBLE_PUZZLES, CONCLUSION_PUZZLES, SEATING_PUZZLES,
} from '../content/logicText'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function logic(prompt: string, correct: string, wrong: string[], rng: Rng, hint: string): LogicProblem {
  const choices = shuffle([correct, ...new Set(wrong.filter((w) => w !== correct))], rng)
  return { type: 'logic', prompt, choices, correctIndex: choices.indexOf(correct), hint }
}

/** Every ordering of 0..n-1 (n ≤ 6, so at most 720). */
export function permutations(n: number): number[][] {
  if (n === 0) return [[]]
  return permutations(n - 1).flatMap((p) =>
    Array.from({ length: n }, (_, i) => [...p.slice(0, i), n - 1, ...p.slice(i)]))
}

/** Drop any clue the answer doesn't need: try removing each, keep it out if the answer is still forced. */
function minimize<C>(clues: C[], forced: (cs: C[]) => boolean, rng: Rng): C[] {
  let kept = shuffle(clues, rng)
  for (const c of [...kept]) {
    const without = kept.filter((k) => k !== c)
    if (forced(without)) kept = without
  }
  return kept
}

// ── elimination: "the key is behind one of these doors" ──────────────────────

export interface EliminationParams {
  items: number
  /** Also use "left of" / "next to" clues, which take two steps to apply. */
  relative: boolean
}

type ElimClue = { text: string; keeps: (i: number) => boolean }

export function elimination(rng: Rng, p: EliminationParams): LogicProblem {
  const theme = pick(rng, N_THEMES)
  const attrs = shuffle(theme.attributes, rng).slice(0, p.items)
  const answer = randInt(rng, 0, p.items - 1)
  const spot = (i: number) => `spot ${i + 1}`
  const name = (i: number) => `the ${attrs[i]} ${theme.noun}`

  const pool: ElimClue[] = []
  for (let i = 0; i < p.items; i++) {
    if (i !== answer) {
      pool.push({ text: `It is NOT ${name(i)}.`, keeps: (k) => k !== i })
      pool.push({ text: `It is NOT in ${spot(i)}.`, keeps: (k) => k !== i })
    }
    if (p.relative) {
      if (answer < i) pool.push({ text: `It is somewhere to the left of ${name(i)}.`, keeps: (k) => k < i })
      if (answer > i) pool.push({ text: `It is somewhere to the right of ${name(i)}.`, keeps: (k) => k > i })
      if (Math.abs(answer - i) === 1) pool.push({ text: `It is right next to ${name(i)}.`, keeps: (k) => Math.abs(k - i) === 1 })
    }
  }
  const all = Array.from({ length: p.items }, (_, i) => i)
  const left = (cs: ElimClue[]) => all.filter((i) => cs.every((c) => c.keeps(i)))
  // With relative clues, try them first so the puzzle leans on them.
  const ordered = p.relative
    ? [...shuffle(pool.filter((c) => !c.text.startsWith('It is NOT')), rng), ...shuffle(pool.filter((c) => c.text.startsWith('It is NOT')), rng)]
    : shuffle(pool, rng)
  const chosen: ElimClue[] = []
  for (const c of ordered) {
    if (left(chosen).length === 1) break
    if (left([...chosen, c]).length < left(chosen).length) chosen.push(c)
  }
  const clues = minimize(chosen, (cs) => left(cs).length === 1, rng)
  const items = all.map((i) => `${cap(spot(i))}: ${attrs[i]} ${theme.noun}`)
  // The buttons stay in spot order, matching the list.
  return {
    type: 'logic',
    prompt: `${theme.intro}\n\n${items.join('\n')}\n\n${clues.map((c) => c.text).join('\n')}\n\nWhich ${theme.noun} is it?`,
    choices: items,
    correctIndex: answer,
    hint: `Take the clues one at a time and cross off every ${theme.noun} a clue rules out. ${p.relative ? '"Left of" rules out that one and everything to its right.' : 'One will be left.'}`,
  }
}

// ── ordering: "Ava is taller than Ben" ───────────────────────────────────────

export interface OrderingParams {
  items: number
  /** Ask about a middle place (second tallest), not only the ends. */
  middle: boolean
  /** Also use "X is not the tallest" clues. */
  notClues: boolean
}

type OrderClue = { text: string; ok: (rank: number[]) => boolean }

export function ordering(rng: Rng, p: OrderingParams): LogicProblem {
  const [more, less, most, least] = pick(rng, ORDER_WORDS)
  const people = shuffle(NAMES, rng).slice(0, p.items)
  // rank[i] = person i's place, 0 = least … n-1 = most.
  const truth = shuffle(Array.from({ length: p.items }, (_, i) => i), rng)

  const pool: OrderClue[] = []
  for (let a = 0; a < p.items; a++) {
    for (let b = 0; b < p.items; b++) {
      if (a === b || truth[a] < truth[b]) continue
      pool.push(rng() < 0.5
        ? { text: `${people[a]} is ${more} than ${people[b]}.`, ok: (r) => r[a] > r[b] }
        : { text: `${people[b]} is ${less} than ${people[a]}.`, ok: (r) => r[a] > r[b] })
    }
    if (p.notClues && truth[a] !== p.items - 1) pool.push({ text: `${people[a]} is not the ${most}.`, ok: (r) => r[a] !== p.items - 1 })
    if (p.notClues && truth[a] !== 0) pool.push({ text: `${people[a]} is not the ${least}.`, ok: (r) => r[a] !== 0 })
  }

  const ask = p.middle && rng() < 0.5
    ? { place: p.items - 2, q: `Who is the second ${most}?` }
    : rng() < 0.5 ? { place: p.items - 1, q: `Who is the ${most}?` } : { place: 0, q: `Who is the ${least}?` }
  const answer = truth.indexOf(ask.place)
  const perms = permutations(p.items)
  const forced = (cs: OrderClue[]) => {
    const fits = perms.filter((r) => cs.every((c) => c.ok(r)))
    return fits.length > 0 && fits.every((r) => r[answer] === ask.place)
  }
  const chosen: OrderClue[] = []
  for (const c of shuffle(pool, rng)) {
    if (forced(chosen)) break
    chosen.push(c)
  }
  const clues = minimize(chosen, forced, rng)
  return logic(`Use these clues:\n${clues.map((c) => `• ${c.text}`).join('\n')}\n\n${ask.q}`,
    people[answer], people.filter((_, i) => i !== answer), rng,
    `Line everyone up from ${least} to ${most}, one clue at a time. Some clues only make sense together.`)
}

// ── grid: "each friend has a different pet" ──────────────────────────────────

export interface GridParams {
  size: 2 | 3 | 4
  /** Allow "Ava has the cat" clues. Without them every step is a deduction. */
  positive: boolean
  /** Turn down puzzles a single "not" column solves: some clue must be about another thing. */
  deep?: boolean
}

type GridClue = { text: string; ok: (a: number[]) => boolean }

export function grid(rng: Rng, p: GridParams): LogicProblem {
  const theme = pick(rng, GRID_THINGS)
  const people = shuffle(NAMES, rng).slice(0, p.size)
  const things = shuffle(theme.items, rng).slice(0, p.size)
  // owns[i] = which thing person i has.
  const owns = shuffle(Array.from({ length: p.size }, (_, i) => i), rng)

  const pool: GridClue[] = []
  for (let i = 0; i < p.size; i++) {
    for (let t = 0; t < p.size; t++) {
      if (owns[i] === t) {
        if (p.positive) pool.push({ text: `${people[i]} ${theme.verb} ${things[t]}.`, ok: (a) => a[i] === t })
      } else {
        pool.push({ text: `${people[i]} ${theme.notVerb} ${things[t]}.`, ok: (a) => a[i] !== t })
      }
    }
  }
  const target = randInt(rng, 0, p.size - 1)
  const answer = owns.indexOf(target)
  const perms = permutations(p.size)
  const forced = (cs: GridClue[]) => {
    const fits = perms.filter((a) => cs.every((c) => c.ok(a)))
    return fits.length > 0 && fits.every((a) => a[answer] === target)
  }
  // A positive clue about the asked thing would give it away.
  const usable = pool.filter((c) => !c.text.includes(`${theme.verb} ${things[target]}`))
  const chosen: GridClue[] = []
  for (const c of shuffle(usable, rng)) {
    if (forced(chosen)) break
    chosen.push(c)
  }
  const clues = minimize(chosen, forced, rng)
  if (p.deep && clues.every((c) => c.text.endsWith(` ${things[target]}.`))) return grid(rng, p)
  const verb = theme.verb.replace(/ the$/, '')
  return logic(`${theme.intro}\nTo choose from: ${things.join(', ')}.\n\n${clues.map((c) => `• ${c.text}`).join('\n')}\n\nWho ${verb} the ${things[target]}?`,
    people[answer], people.filter((_, i) => i !== answer), rng,
    `Make a little table: people down the side, things across the top. Cross off every "does not", then look for a row or column with only one box left.`)
}

// ── patterns ─────────────────────────────────────────────────────────────────

export type PatternRule = 'add' | 'subtract' | 'double' | 'triple' | 'halve' | 'growing' | 'twoRule' | 'interleave'

export interface PatternParams {
  rules: PatternRule[]
  /** Biggest step for + and − rules. */
  maxStep: number
}

export function pattern(rng: Rng, p: PatternParams): LogicProblem {
  const rule = pick(rng, p.rules)
  const step = randInt(rng, 2, p.maxStep)
  let seq: number[]
  let hint: string
  let wrong: number[]
  const next = (xs: number[], f: (x: number, i: number) => number) => {
    while (xs.length < 6) xs.push(f(xs[xs.length - 1], xs.length - 1))
    return xs
  }
  switch (rule) {
    case 'add':
      seq = next([randInt(rng, 1, 50)], (x) => x + step)
      hint = `Each number is ${step} more than the one before.`
      wrong = [seq[5] + 1, seq[5] - 1, seq[4] + step + step]
      break
    case 'subtract':
      seq = next([step * 6 + randInt(rng, 5, 60)], (x) => x - step)
      hint = `Each number is ${step} less than the one before.`
      wrong = [seq[5] + 1, seq[5] - 1, seq[4] + step]
      break
    case 'double':
      seq = next([randInt(rng, 1, 6)], (x) => x * 2)
      hint = 'Each number is double the one before.'
      wrong = [seq[4] + seq[4] / 2, seq[5] + 2, seq[5] - seq[3]]
      break
    case 'triple':
      seq = next([randInt(rng, 1, 3)], (x) => x * 3)
      hint = 'Each number is 3 times the one before.'
      wrong = [seq[4] * 2, seq[5] + 3, seq[4] + seq[3]]
      break
    case 'halve': {
      const start = 2 ** 5 * randInt(rng, 1, 9)
      seq = next([start], (x) => x / 2)
      hint = 'Each number is half of the one before.'
      wrong = [seq[4] - 2, seq[5] * 3 / 2, seq[5] + 1]
      break
    }
    case 'growing': {
      const start = randInt(rng, 1, 20)
      const first = randInt(rng, 1, 3)
      seq = next([start], (x, i) => x + first + i)
      hint = `The jumps grow by 1 each time: +${first}, +${first + 1}, +${first + 2}…`
      wrong = [seq[5] - 1, seq[4] + (seq[4] - seq[3]), seq[5] + 1]
      break
    }
    case 'twoRule': {
      // Two rules, taking turns: × then +.
      const m = randInt(rng, 2, 3)
      const a = randInt(rng, 1, 5)
      // Retry until the + step shows early, so it can't pass for plain doubling (1, 2, 4, 8…).
      do seq = next([randInt(rng, 1, 4)], (x, i) => (i % 2 === 0 ? x * m : x + a))
      while (seq[2] === seq[1] * m)
      hint = `Two rules take turns: × ${m}, then + ${a}, then × ${m} again…`
      wrong = [seq[4] + a, seq[5] - a, seq[4] * m + a]
      break
    }
    case 'interleave': {
      // Two patterns woven together: every other number belongs to the same one.
      const a0 = randInt(rng, 1, 10), a = randInt(rng, 2, 5)
      const b0 = randInt(rng, 20, 40), b = randInt(rng, 2, 5)
      seq = Array.from({ length: 6 }, (_, i) => (i % 2 === 0 ? a0 + (i / 2) * a : b0 - ((i - 1) / 2) * b))
      hint = `Look at every other number. One pattern goes up by ${a}, the other goes down by ${b}.`
      wrong = [seq[5] - b, seq[5] + a, seq[4] - b]
      break
    }
  }
  const shown = seq.slice(0, 5)
  const answer = seq[5]
  // Mistake-based wrong answers first, topped up with near misses so there are always three.
  const picks = new Set(wrong.filter((w) => Number.isInteger(w) && w > 0 && w !== answer))
  for (const d of [1, -1, 2, -2, 3]) if (picks.size < 3 && answer + d > 0) picks.add(answer + d)
  return logic(`What number comes next?\n\n${shown.join(', ')}, __`,
    String(answer), [...picks].slice(0, 3).map(String), rng, hint)
}

// ── if/then chains ───────────────────────────────────────────────────────────

export interface ChainParams {
  steps: number
  /** Add a rule that has nothing to do with the chain. */
  distractor: boolean
  /** Chance of asking backward: the last event did NOT happen, so what didn't? */
  backward: number
}

export function chain(rng: Rng, p: ChainParams): LogicProblem {
  const events = shuffle(EVENTS, rng).slice(0, p.steps + 3)
  const links = events.slice(0, p.steps + 1)
  const rules = links.slice(0, -1).map((e, i) => `If ${e.yes}, then ${links[i + 1].yes}.`)
  const [x, y] = events.slice(p.steps + 1)
  if (p.distractor) rules.splice(randInt(rng, 0, rules.length), 0, `If ${x.yes}, then ${y.yes}.`)
  const first = links[0], last = links[links.length - 1], middle = links[Math.floor(links.length / 2)]

  if (rng() < p.backward) {
    return logic(`Rules:\n${rules.map((r) => `• ${cap(r)}`).join('\n')}\n\nThis time, ${last.no}.\n\nWhat do you know for sure?`,
      cap(`${first.no}.`), [cap(`${first.yes}.`), cap(`${middle.yes}.`), cap(`${p.distractor ? y.no : x.yes}.`)], rng,
      `Work backward. If ${first.yes}, every rule would fire, all the way to "${last.yes}". That didn't happen, so ${first.yes} can't have happened either.`)
  }
  return logic(`Rules:\n${rules.map((r) => `• ${cap(r)}`).join('\n')}\n\nThis time, ${first.yes}.\n\nWhat must happen?`,
    cap(`${last.yes}.`), [cap(`${last.no}.`), cap(`${p.distractor ? y.yes : x.yes}.`), cap(`${first.no}.`)], rng,
    `Follow the rules in order, one step at a time: ${links.map((e) => e.yes).join(' → ')}.${p.distractor ? ' One rule is never used.' : ''}`)
}

// ── attribute filter: "which gem is BOTH red AND round?" ─────────────────────

export interface AttributeParams {
  items: number
  attrs: 2 | 3
  /** One clue is a "NOT" (not round). */
  not: boolean
}

export function attributes(rng: Rng, p: AttributeParams): LogicProblem {
  const make = () => ({ color: pick(rng, GEM_COLORS), size: pick(rng, GEM_SIZES), shape: pick(rng, GEM_SHAPES) })
  type Gem = ReturnType<typeof make>
  const keys: Array<keyof Gem> = p.attrs === 3 ? ['color', 'size', 'shape'] : ['color', 'shape']
  const describe = (g: Gem) => keys.map((k) => g[k]).join(', ') + ' gem'
  for (;;) {
    const gems: Gem[] = []
    while (gems.length < p.items) {
      const g = make()
      if (!gems.some((h) => describe(h) === describe(g))) gems.push(g)
    }
    const answer = randInt(rng, 0, p.items - 1)
    const target = gems[answer]
    // Each clue is the target's value; with `not`, one becomes "not <some other value>".
    const notKey = p.not ? pick(rng, keys) : null
    const pools = { color: GEM_COLORS, size: GEM_SIZES, shape: GEM_SHAPES }
    const notValue = notKey ? pick(rng, pools[notKey].filter((v) => v !== target[notKey])) : null
    const matches = (g: Gem) => keys.every((k) => (k === notKey ? g[k] !== notValue : g[k] === target[k]))
    if (gems.filter(matches).length !== 1) continue
    // Every gem but the answer must match at least one clue, so no clue is wasted.
    if (gems.filter((g, i) => i !== answer && !keys.some((k) => (k === notKey ? g[k] !== notValue : g[k] === target[k]))).length > 0 && p.attrs === 2) continue
    const clues = keys.map((k) => (k === notKey ? `NOT ${notValue}` : String(target[k])))
    const items = gems.map(describe)
    return logic(`Which gem is ${clues.join(' AND ')}?\n\n${items.map((i) => `• ${i}`).join('\n')}`,
      items[answer], items.filter((_, i) => i !== answer), rng,
      `Check one clue at a time and cross off every gem that breaks it. ${notKey ? `"NOT ${notValue}" crosses off the ${notValue} ones.` : ''}`.trim())
  }
}

// ── comparing numbers ────────────────────────────────────────────────────────

export function biggestNumber(rng: Rng, count: number): LogicProblem {
  // Same hundreds digit on most of them, so she has to look past the first digit.
  const h = randInt(rng, 1, 9) * 100
  const nums = new Set<number>()
  while (nums.size < count) nums.add(rng() < 0.75 ? h + randInt(rng, 0, 99) : randInt(rng, 100, 999))
  const list = [...nums]
  const biggest = Math.max(...list)
  return logic(`Which number is the biggest?\n\n${list.map((n) => `• ${n}`).join('\n')}`,
    String(biggest), list.filter((n) => n !== biggest).map(String), rng,
    'Compare the hundreds first. If they match, compare the tens, then the ones.')
}

// ── fixed word puzzles ───────────────────────────────────────────────────────

export type WordKind = 'chain' | 'use' | 'must' | 'impossible' | 'conclusion' | 'seating'

export function wordPuzzle(rng: Rng, kind: WordKind): LogicProblem {
  switch (kind) {
    case 'chain': {
      const q = pick(rng, CHAIN_PUZZLES)
      return logic(`Given that:\n• ${q.setup.join('\n• ')}\n\nWhat MUST be true?`, q.conclusion, q.wrongs, rng,
        'Put the two facts together: if the first is true AND the second is true, what follows?')
    }
    case 'use': {
      const q = pick(rng, USE_PUZZLES)
      return logic(q.q, q.correct, q.wrong, rng, 'Think about exactly what the job needs. Which item does that?')
    }
    case 'must': {
      const q = pick(rng, MUST_PUZZLES)
      return logic(`Given that: ${q.fact}\n\nWhat MUST also be true?`, q.correct, q.wrong, rng, 'Use both facts together. What do they promise?')
    }
    case 'impossible': {
      const q = pick(rng, IMPOSSIBLE_PUZZLES)
      return logic(`Fact: ${q.fact}\n\nWhich of these is IMPOSSIBLE?`, q.correct, q.wrong, rng, 'Look for the one that breaks the fact.')
    }
    case 'conclusion': {
      const q = pick(rng, CONCLUSION_PUZZLES)
      return logic(`Given: ${q.setup}\n\nWhich must be true?`, q.correct, q.wrong, rng, 'It has to follow from what you were told, nothing more.')
    }
    case 'seating': {
      const q = pick(rng, SEATING_PUZZLES)
      return logic(`${q.setup}\n\n${q.q}`, q.correct, q.wrong, rng, 'Place each one in order, clue by clue.')
    }
  }
}
