import type { MathProblem } from './problems'
import { RecentlySeenTracker } from './antiRepeat'
import { bandForDifficulty } from './difficulty'

type Rng = () => number
type Op = '+' | '-'

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

// ════════════════════════════════════════════════════════════════════════════
// BAND 1 — two-digit, NO regrouping, one-step (Zone 1)
// ════════════════════════════════════════════════════════════════════════════

interface NumPair { a: number; b: number; answer: number }

// Two-digit subtraction, no regrouping: both inputs 2-digit, a > b, answer >= 10.
// Guarantee: tens1 > tens2 ensures 10*(tens1-tens2) >= 10, and ones1 >= ones2 ensures no borrow.
function sub2NoRegroup(rng: Rng, maxTens: number): NumPair {
  const tens1 = randInt(rng, 2, maxTens)
  const tens2 = randInt(rng, 1, tens1 - 1)
  const ones1 = randInt(rng, 0, 9)
  const ones2 = randInt(rng, 0, ones1)
  const a = tens1 * 10 + ones1
  const b = tens2 * 10 + ones2
  return { a, b, answer: a - b }
}

// Two-digit addition, no regrouping: ones column sums < 10, tens column sums <= maxTens.
// Guarantee: ones1+ones2 <= 9 (no carry), tens1+tens2 <= maxTens <= 9 (no carry, 2-digit result).
function add2NoRegroup(rng: Rng, maxTens: number): NumPair {
  const tens1 = randInt(rng, 1, Math.max(1, maxTens - 1))
  const tens2 = randInt(rng, 1, Math.max(1, maxTens - tens1))
  const ones1 = randInt(rng, 0, 8)
  const ones2 = randInt(rng, 0, 9 - ones1)
  const a = tens1 * 10 + ones1
  const b = tens2 * 10 + ones2
  return { a, b, answer: a + b }
}

// Scales the number range within the 2-digit band based on effective difficulty (Zone 1: 1–3).
function maxTensForDiff(diff: number): number {
  if (diff <= 1) return 3
  if (diff <= 2) return 6
  return 9
}

type TemplateResult = { prompt: string; hint: string }
type OneStepTemplate = (a: number, b: number) => TemplateResult

const SUB_TEMPLATES: OneStepTemplate[] = [
  (a, b) => ({
    prompt:
      `Clover Dewdrop is watching from the clover field!\n\n` +
      `She needs exactly ${a} clovers, and you've placed ${b} so far.\n\n` +
      `How many more clovers do you need to place?`,
    hint: `The two numbers are ${a} and ${b}. Try: ${a} − ${b} = ?`,
  }),
  (a, b) => ({
    prompt:
      `You had a basket with ${a} berries.\n\n` +
      `${b} of them rolled into the river!\n\n` +
      `How many berries do you still have?`,
    hint: `Start with ${a} berries, then take away ${b}. Try: ${a} − ${b} = ?`,
  }),
  (a, b) => ({
    prompt:
      `To open the magic gate, you need ${a} star stones.\n\n` +
      `You've already found ${b} glowing ones along the path.\n\n` +
      `How many more star stones do you need?`,
    hint: `You need ${a} total and have found ${b}. Try: ${a} − ${b} = ?`,
  }),
]

const ADD_TEMPLATES: OneStepTemplate[] = [
  (a, b) => ({
    prompt:
      `${a} butterflies are resting on a pink flower.\n\n` +
      `Then ${b} more butterflies flutter over to join them!\n\n` +
      `How many butterflies are on the flower now?`,
    hint: `Add the two groups together: ${a} + ${b} = ?`,
  }),
  (a, b) => ({
    prompt:
      `You've collected ${a} golden petals on your adventure.\n\n` +
      `Your friend gifts you ${b} more!\n\n` +
      `How many petals do you have altogether?`,
    hint: `Combine both amounts: ${a} + ${b} = ?`,
  }),
  (a, b) => ({
    prompt:
      `${a} friendly fireflies lit up the meadow at night.\n\n` +
      `${b} more fireflies joined in from the forest!\n\n` +
      `How many fireflies are glowing now?`,
    hint: `Add both numbers: ${a} + ${b} = ?`,
  }),
]

// Template ids 0–2 = subtraction, 3–5 = addition.
const BAND1_IDS = [0, 1, 2, 3, 4, 5]
const band1Tracker = new RecentlySeenTracker(BAND1_IDS.length)

function generateBand1(difficulty: number): MathProblem {
  const templateIdx = band1Tracker.pickFresh(BAND1_IDS, Math.random)
  const maxTens = maxTensForDiff(difficulty)

  if (templateIdx < 3) {
    const nums = sub2NoRegroup(Math.random, maxTens)
    const { prompt, hint } = SUB_TEMPLATES[templateIdx](nums.a, nums.b)
    return { type: 'math', prompt, correctAnswer: nums.answer, hint }
  } else {
    const nums = add2NoRegroup(Math.random, maxTens)
    const { prompt, hint } = ADD_TEMPLATES[templateIdx - 3](nums.a, nums.b)
    return { type: 'math', prompt, correctAnswer: nums.answer, hint }
  }
}

// ════════════════════════════════════════════════════════════════════════════
// BANDS 2–6 — multi-step word problems (structured spec + themed renderer)
// ════════════════════════════════════════════════════════════════════════════

export interface MathSpec {
  /** Operands in narrative order; numbers[0] is the starting amount. */
  numbers: number[]
  /** Operation applied before numbers[i+1]; length === numbers.length - 1. */
  ops: Op[]
  /** Running total after each step; runningTotals[0] === numbers[0]. */
  runningTotals: number[]
  answer: number
  /** Band 6 only: a number mentioned in the story but NOT used in the math. */
  extraneous?: number
}

interface BandParams {
  operandMin: number
  runningMin: number
  max: number
  /** Number of operations (operands = opCount + 1). */
  minOps: number
  maxOps: number
  extraneous: boolean
}

// Per-band numeric envelopes (§9 ramp). runningMin keeps every intermediate (and
// the final answer) inside the band's digit range — which also guarantees no
// negative step and that each subtraction is larger − smaller.
const BAND_PARAMS: Record<2 | 3 | 4 | 5 | 6, BandParams> = {
  2: { operandMin: 10,  runningMin: 10,  max: 99,  minOps: 1, maxOps: 2, extraneous: false },
  3: { operandMin: 10,  runningMin: 10,  max: 999, minOps: 2, maxOps: 2, extraneous: false },
  4: { operandMin: 100, runningMin: 100, max: 999, minOps: 2, maxOps: 2, extraneous: false },
  5: { operandMin: 100, runningMin: 100, max: 999, minOps: 2, maxOps: 3, extraneous: false },
  6: { operandMin: 100, runningMin: 100, max: 999, minOps: 2, maxOps: 3, extraneous: true },
}

export function buildMathSpec(rng: Rng, band: 2 | 3 | 4 | 5 | 6): MathSpec {
  const p = BAND_PARAMS[band]
  const opCount = randInt(rng, p.minOps, p.maxOps)

  let running = randInt(rng, p.runningMin, p.max)
  const numbers = [running]
  const ops: Op[] = []
  const runningTotals = [running]

  for (let i = 0; i < opCount; i++) {
    const canAdd = running + p.operandMin <= p.max
    const canSub = running - p.operandMin >= p.runningMin
    // Both can be blocked only if the band envelope is too tight, which the
    // BAND_PARAMS values are chosen to avoid; fall back to addition defensively.
    let op: Op
    if (canAdd && canSub) op = rng() < 0.5 ? '+' : '-'
    else if (canSub) op = '-'
    else op = '+'

    let operand: number
    if (op === '+') {
      operand = randInt(rng, p.operandMin, p.max - running)
      running += operand
    } else {
      // operand <= running - runningMin < running → larger − smaller, result in-band
      operand = randInt(rng, p.operandMin, running - p.runningMin)
      running -= operand
    }
    numbers.push(operand)
    ops.push(op)
    runningTotals.push(running)
  }

  const spec: MathSpec = { numbers, ops, runningTotals, answer: running }

  if (p.extraneous) {
    // A distractor distinct from every operand and the answer, so it can never
    // be mistaken for part of a correct computation.
    let extra = 0
    do {
      extra = randInt(rng, p.operandMin, p.max)
    } while (numbers.includes(extra) || extra === spec.answer)
    spec.extraneous = extra
  }

  return spec
}

// Builds the canonical "47 + 28 − 15 = ?" equation string for the hint.
function equationString(spec: MathSpec): string {
  let s = `${spec.numbers[0]}`
  for (let i = 0; i < spec.ops.length; i++) {
    s += ` ${spec.ops[i] === '+' ? '+' : '−'} ${spec.numbers[i + 1]}`
  }
  return `${s} = ?`
}

interface StoryTheme {
  intro: string
  noun: string
  start: (n: number) => string
  plus: (n: number) => string
  minus: (n: number) => string
  question: string
  distractor: (n: number) => string
}

const THEMES: StoryTheme[] = [
  {
    intro: 'In the meadow,',
    noun: 'berries',
    start: (n) => `your basket holds ${n} berries`,
    plus: (n) => `you pick ${n} more`,
    minus: (n) => `${n} berries roll out of the basket`,
    question: 'How many berries are in the basket now?',
    distractor: (n) => `${n} bees buzz past the basket`,
  },
  {
    intro: 'On your quest,',
    noun: 'star coins',
    start: (n) => `you have ${n} star coins`,
    plus: (n) => `you earn ${n} more`,
    minus: (n) => `you spend ${n} at the market`,
    question: 'How many star coins do you have now?',
    distractor: (n) => `${n} lanterns glow along the road`,
  },
  {
    intro: 'Deep in the crystal cave,',
    noun: 'crystals',
    start: (n) => `${n} crystals glitter on the wall`,
    plus: (n) => `you dig up ${n} more`,
    minus: (n) => `${n} crumble to dust`,
    question: 'How many crystals are there now?',
    distractor: (n) => `${n} bats flutter overhead`,
  },
  {
    intro: 'By the seashore,',
    noun: 'seashells',
    start: (n) => `you collected ${n} seashells`,
    plus: (n) => `the tide brings in ${n} more`,
    minus: (n) => `${n} wash back out to sea`,
    question: 'How many seashells do you have now?',
    distractor: (n) => `${n} seagulls circle above`,
  },
  {
    intro: 'In the autumn wood,',
    noun: 'acorns',
    start: (n) => `a squirrel has gathered ${n} acorns`,
    plus: (n) => `it finds ${n} more`,
    minus: (n) => `it gives ${n} to a friend`,
    question: 'How many acorns does the squirrel have now?',
    distractor: (n) => `${n} leaves drift down from the branches`,
  },
  {
    intro: 'At the flower festival,',
    noun: 'petals',
    start: (n) => `${n} petals drift through the air`,
    plus: (n) => `${n} more float down`,
    minus: (n) => `${n} blow away on the breeze`,
    question: 'How many petals are floating now?',
    distractor: (n) => `${n} ribbons flutter on the stalls`,
  },
]

const THEME_IDS = THEMES.map((_, i) => i)
// One tracker per band so the same theme doesn't recur until that band's pool cycles.
const themeTrackers = new Map<number, RecentlySeenTracker>()
function themeTrackerFor(band: number): RecentlySeenTracker {
  let t = themeTrackers.get(band)
  if (!t) {
    t = new RecentlySeenTracker(THEMES.length)
    themeTrackers.set(band, t)
  }
  return t
}

function renderSpec(theme: StoryTheme, spec: MathSpec): TemplateResult {
  const sentences = [theme.start(spec.numbers[0])]
  for (let i = 0; i < spec.ops.length; i++) {
    sentences.push(spec.ops[i] === '+' ? theme.plus(spec.numbers[i + 1]) : theme.minus(spec.numbers[i + 1]))
  }

  if (spec.extraneous !== undefined) {
    // Insert the distractor somewhere after the first sentence so it reads naturally
    // but is clearly about something other than the counted item.
    const pos = 1 + Math.floor(Math.random() * sentences.length)
    sentences.splice(pos, 0, theme.distractor(spec.extraneous))
  }

  // Join the event sentences into flowing prose: "..., then ..., then ...".
  const body = sentences
    .map((s, i) => (i === 0 ? s : `then ${s}`))
    .join(', ')

  const prompt = `${theme.intro} ${body}.\n\n${theme.question}`

  const hint =
    spec.extraneous !== undefined
      ? `Use only the ${theme.noun} numbers — ignore the ${spec.extraneous}. Work left to right: ${equationString(spec)}`
      : `Work it out step by step, left to right: ${equationString(spec)}`

  return { prompt, hint }
}

function generateBanded(band: 2 | 3 | 4 | 5 | 6): MathProblem {
  const spec = buildMathSpec(Math.random, band)
  const themeIdx = themeTrackerFor(band).pickFresh(THEME_IDS, Math.random)
  const { prompt, hint } = renderSpec(THEMES[themeIdx], spec)
  return { type: 'math', prompt, correctAnswer: spec.answer, hint }
}

// ════════════════════════════════════════════════════════════════════════════
// PUBLIC ENTRY — routes by effective difficulty
// ════════════════════════════════════════════════════════════════════════════

export function generateMathProblem(difficulty: number): MathProblem {
  const band = bandForDifficulty(difficulty)
  if (band === 1) return generateBand1(difficulty)
  return generateBanded(band)
}
