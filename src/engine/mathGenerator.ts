import type { MathProblem } from './problems'
import { RecentlySeenTracker } from './antiRepeat'

type Rng = () => number

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

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
// Zone 2+ would need a different generator for regrouping/multi-step — not yet implemented.
function maxTensForDiff(diff: number): number {
  if (diff <= 1) return 3
  if (diff <= 2) return 6
  return 9
}

type TemplateResult = { prompt: string; hint: string }
type SubTemplate = (a: number, b: number) => TemplateResult
type AddTemplate = (a: number, b: number) => TemplateResult

const SUB_TEMPLATES: SubTemplate[] = [
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

const ADD_TEMPLATES: AddTemplate[] = [
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
const ALL_TEMPLATE_IDS = [0, 1, 2, 3, 4, 5]
const antiRepeat = new RecentlySeenTracker(ALL_TEMPLATE_IDS.length)

export function generateMathProblem(difficulty: number): MathProblem {
  const templateIdx = antiRepeat.pickFresh(ALL_TEMPLATE_IDS, Math.random)
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
