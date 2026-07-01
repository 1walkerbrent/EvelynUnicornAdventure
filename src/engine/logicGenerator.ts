/**
 * Logic puzzle generator — varied formats that progress by zone (§9).
 *
 * Format groups:
 *   Bands 1–2 (Z1/Z2): simple matching, comparison, sequencing, categorisation (3 choices)
 *   Bands 3–4 (Z3/Z4): two-attribute filtering, ordering, if/then chains (4 choices)
 *   Bands 5–6 (Z5/Z6): three-attribute puzzles, deduction chains, multi-step (5 choices)
 *
 * Each band group has a pool of ≥ 8 templates. The existing anti-repeat tracker
 * (RecentlySeenTracker) is preserved so the same template never fires twice in a row.
 */
import type { LogicProblem } from './problems'
import { RecentlySeenTracker } from './antiRepeat'
import { bandForDifficulty } from './difficulty'

type Rng = () => number

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

function shuffle<T>(arr: T[], rng: Rng): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type TemplateResult = { prompt: string; choices: string[]; correctIndex: number; hint: string }
type LogicFactory = (rng: Rng) => TemplateResult

// ════════════════════════════════════════════════════════════════════════════
// BANDS 1–2 — simple formats, 3 choices
// ════════════════════════════════════════════════════════════════════════════

// ── existing elimination templates (3 choices, position-based) ───────────────
const ELIM3_TEMPLATES: LogicFactory[] = [
  // 0: Three flowers — shuffled heights
  (rng) => {
    const positions = ['Left', 'Middle', 'Right']
    const heights = shuffle(['short', 'medium-height', 'tallest'], rng)
    const correct = randInt(rng, 0, 2)
    const wrong = [0, 1, 2].filter(i => i !== correct)
    const items = positions.map((pos, i) => `${pos} flower (${heights[i]})`)
    const clue1 = `the ${heights[wrong[0]]} flower`
    const clue2 = `the flower on the ${positions[wrong[1]].toLowerCase()}`
    return {
      prompt:
        `Tangerine Twirl is hiding behind one of three flowers!\n\n` +
        `${items.map(it => `🌸 ${it}`).join('\n')}\n\n` +
        `She did NOT go to ${clue1}.\n` +
        `She did NOT go to ${clue2}.\n\n` +
        `Which flower is she hiding behind?`,
      choices: items,
      correctIndex: correct,
      hint: `Cross off: NOT ${clue1} ✗   NOT ${clue2} ✗   One flower remains!`,
    }
  },
  // 1: Three doors
  (rng) => {
    const positions = ['Left', 'Middle', 'Right']
    const colors = shuffle(['red', 'blue', 'green'], rng)
    const correct = randInt(rng, 0, 2)
    const wrong = [0, 1, 2].filter(i => i !== correct)
    const items = positions.map((pos, i) => `${pos} door (${colors[i]})`)
    const clue1 = `the ${colors[wrong[0]]} door`
    const clue2 = `the door on the ${positions[wrong[1]].toLowerCase()}`
    return {
      prompt:
        `A magic key is hidden behind one of three doors!\n\n` +
        `${items.map(it => `🚪 ${it}`).join('\n')}\n\n` +
        `The key is NOT behind ${clue1}.\n` +
        `The key is NOT behind ${clue2}.\n\n` +
        `Which door hides the key?`,
      choices: items,
      correctIndex: correct,
      hint: `Cross off: NOT ${clue1} ✗   NOT ${clue2} ✗   One door remains!`,
    }
  },
  // 2: Three treasure chests
  (rng) => {
    const positions = ['Left', 'Middle', 'Right']
    const sizes = shuffle(['tiny', 'medium', 'large'], rng)
    const correct = randInt(rng, 0, 2)
    const wrong = [0, 1, 2].filter(i => i !== correct)
    const items = positions.map((pos, i) => `${pos} chest (${sizes[i]})`)
    const clue1 = `the ${sizes[wrong[0]]} chest`
    const clue2 = `the chest on the ${positions[wrong[1]].toLowerCase()}`
    return {
      prompt:
        `A sparkly gem is hidden in one of three treasure chests!\n\n` +
        `${items.map(it => `💎 ${it}`).join('\n')}\n\n` +
        `The gem is NOT in ${clue1}.\n` +
        `The gem is NOT in ${clue2}.\n\n` +
        `Which chest holds the gem?`,
      choices: items,
      correctIndex: correct,
      hint: `Cross off: NOT ${clue1} ✗   NOT ${clue2} ✗   One chest remains!`,
    }
  },
]

// ── new varied templates for bands 1–2 ───────────────────────────────────────

// T_B12_A: "Which is the biggest number?"
const T_B12_A: LogicFactory = (rng) => {
  // Three distinct numbers in [10, 99]; ask for biggest
  const nums = shuffle([
    randInt(rng, 10, 39),
    randInt(rng, 40, 69),
    randInt(rng, 70, 99),
  ], rng)
  const correct = nums.indexOf(Math.max(...nums))
  return {
    prompt: `Which of these numbers is the biggest?\n\n${nums.map(n => `• ${n}`).join('\n')}`,
    choices: nums.map(String),
    correctIndex: correct,
    hint: `Compare the tens digits first — the largest tens digit wins!`,
  }
}

// T_B12_B: "What comes next?" — simple +step sequence
const T_B12_B: LogicFactory = (rng) => {
  const start = randInt(rng, 1, 8)
  const step  = randInt(rng, 1, 4)
  const seq   = [start, start + step, start + 2 * step, start + 3 * step]
  const answer = start + 4 * step
  const choices = shuffle([answer, answer + step, answer - step > 0 ? answer - step : answer + step * 2], rng)
  const correctIndex = choices.indexOf(answer)
  return {
    prompt: `What number comes next in this pattern?\n\n${seq.join(', ')}, __`,
    choices: choices.map(String),
    correctIndex,
    hint: `Each number goes up by ${step}. Add ${step} to the last number.`,
  }
}

// T_B12_C: "Odd one out" — one item doesn't belong
const GROUPS_3 = [
  { items: ['apple', 'orange', 'banana'], outsider: 'carrot',  category: 'fruit' },
  { items: ['cat', 'dog', 'rabbit'],      outsider: 'chair',   category: 'animal' },
  { items: ['red', 'blue', 'green'],      outsider: 'happy',   category: 'color' },
  { items: ['rose', 'daisy', 'tulip'],    outsider: 'stone',   category: 'flower' },
  { items: ['rain', 'snow', 'thunder'],   outsider: 'sandwich', category: 'weather' },
  { items: ['circle', 'square', 'triangle'], outsider: 'cloud', category: 'shape' },
]
const T_B12_C: LogicFactory = (rng) => {
  const g = GROUPS_3[randInt(rng, 0, GROUPS_3.length - 1)]
  const choicesRaw = shuffle([...g.items.slice(0, 2), g.outsider], rng)
  const correctIndex = choicesRaw.indexOf(g.outsider)
  return {
    prompt: `Which one of these does NOT belong with the others?\n\n${choicesRaw.map(c => `• ${c}`).join('\n')}`,
    choices: choicesRaw,
    correctIndex,
    hint: `Two of them are ${g.category}s. Which one is something different?`,
  }
}

// T_B12_D: "Who is shorter/lighter?" — simple comparison
const COMPARE_PAIRS = [
  { a: 'an elephant', b: 'a mouse',   prop: 'bigger',   q: 'Which of these is smaller?' },
  { a: 'a rock',     b: 'a feather', prop: 'heavier',  q: 'Which of these is lighter?' },
  { a: 'a horse',    b: 'a pony',    prop: 'taller',   q: 'Which of these is shorter?' },
  { a: 'the sun',    b: 'the moon',  prop: 'bigger',   q: 'Which of these looks smaller in the sky?' },
]
const T_B12_D: LogicFactory = (rng) => {
  const p = COMPARE_PAIRS[randInt(rng, 0, COMPARE_PAIRS.length - 1)]
  const choices = shuffle([p.a, p.b, "They're the same size"], rng)
  const correctIndex = choices.indexOf(p.b)
  return {
    prompt: `${p.a} is ${p.prop} than ${p.b}.\n\n${p.q}`,
    choices,
    correctIndex,
    hint: `If ${p.a} is ${p.prop}, then ${p.b} is the opposite.`,
  }
}

// T_B12_E: "Which group does it belong to?"
const CATEG_PUZZLES = [
  { item: 'a dolphin', correct: 'animal', wrong: ['color', 'number'] },
  { item: 'purple',    correct: 'color',  wrong: ['food', 'sport'] },
  { item: 'basketball', correct: 'sport', wrong: ['color', 'animal'] },
  { item: 'strawberry', correct: 'fruit', wrong: ['animal', 'shape'] },
  { item: 'a triangle', correct: 'shape', wrong: ['color', 'weather'] },
]
const T_B12_E: LogicFactory = (rng) => {
  const p = CATEG_PUZZLES[randInt(rng, 0, CATEG_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: `Which group does "${p.item}" belong to?\n\n${choices.map(c => `• ${c}`).join('\n')}`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Think about what "${p.item}" is — what kind of thing is it?`,
  }
}

// T_B12_F: "Simple if/then"
const IFTHEN_PUZZLES = [
  { setup: 'If it is dark outside, you use a flashlight.', cond: 'It is very dark outside.', q: 'What should you use?', correct: 'A flashlight', wrong: ['Sunglasses', 'A swimming float'] },
  { setup: 'If you are cold, you put on a warm coat.',    cond: 'You are shivering in the snow.', q: 'What should you put on?', correct: 'A warm coat', wrong: ['A swimsuit', 'Sunscreen'] },
  { setup: 'If it is raining, you carry an umbrella.',    cond: 'It is pouring rain.',           q: 'What should you carry?', correct: 'An umbrella', wrong: ['A fan', 'A bucket and spade'] },
  { setup: 'If you are hungry, you eat a snack.',         cond: 'Your tummy is rumbling.',       q: 'What should you do?',    correct: 'Eat a snack', wrong: ['Take a nap', 'Play outside'] },
]
const T_B12_F: LogicFactory = (rng) => {
  const p = IFTHEN_PUZZLES[randInt(rng, 0, IFTHEN_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: `${p.setup}\n\n${p.cond}\n\n${p.q}`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Use the "if…then" rule: if the condition is true, what follows?`,
  }
}

// T_B12_G: "Ordering — who is tallest?"
const ORDER3_PUZZLES = [
  { items: ['Lily', 'Tom', 'Sam'],  clues: ['Lily is shorter than Tom', 'Tom is shorter than Sam'],  q: 'Who is the tallest?', correct: 'Sam' },
  { items: ['Fox', 'Cat', 'Bear'], clues: ['Fox is lighter than Cat', 'Cat is lighter than Bear'],    q: 'Who is the heaviest?', correct: 'Bear' },
  { items: ['A', 'B', 'C'],       clues: ['A is slower than B',       'B is slower than C'],          q: 'Who is the fastest?', correct: 'C' },
  { items: ['Pip', 'Dot', 'Max'], clues: ['Pip is older than Dot',    'Dot is older than Max'],        q: 'Who is the youngest?', correct: 'Max' },
]
const T_B12_G: LogicFactory = (rng) => {
  const p = ORDER3_PUZZLES[randInt(rng, 0, ORDER3_PUZZLES.length - 1)]
  const choices = shuffle([...p.items], rng)
  return {
    prompt: `Use these clues:\n• ${p.clues.join('\n• ')}\n\n${p.q}`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Line them up in order using the clues, then find the ${p.q.split('Who is the ')[1].replace('?', '')}.`,
  }
}

// T_B12_H: "Which comes first?" — temporal / sequential
const TEMPORAL3 = [
  { items: ['Morning', 'Evening', 'Noon'],         correct: 'Morning',  q: 'Which comes first in a day?' },
  { items: ['Spring', 'Winter', 'Summer'],         correct: 'Spring',   q: 'Which season comes right after Winter?' },
  { items: ['Monday', 'Wednesday', 'Friday'],      correct: 'Monday',   q: 'Which day comes first in the week?' },
  { items: ['Breakfast', 'Dinner', 'Lunch'],       correct: 'Breakfast', q: 'Which meal comes first in the day?' },
]
const T_B12_H: LogicFactory = (rng) => {
  const p = TEMPORAL3[randInt(rng, 0, TEMPORAL3.length - 1)]
  const choices = shuffle([...p.items], rng)
  return {
    prompt: p.q,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Think about the order these happen in — which comes earliest?`,
  }
}

// Pool for bands 1–2: elimination templates + 8 varied
const BAND12_POOL: LogicFactory[] = [
  ...ELIM3_TEMPLATES,
  T_B12_A, T_B12_B, T_B12_C, T_B12_D, T_B12_E, T_B12_F, T_B12_G, T_B12_H,
]
const band12Tracker = new RecentlySeenTracker(BAND12_POOL.length)
const BAND12_IDS = BAND12_POOL.map((_, i) => i)

function generateBand12(rng: Rng): LogicProblem {
  const idx = band12Tracker.pickFresh(BAND12_IDS, rng)
  const result = BAND12_POOL[idx](rng)
  return { type: 'logic', ...result }
}

// ════════════════════════════════════════════════════════════════════════════
// BANDS 3–4 — intermediate formats, 4 choices
// ════════════════════════════════════════════════════════════════════════════

// ── existing N-option themes (4 choices) ─────────────────────────────────────
export interface NTheme {
  intro: string
  noun: string
  attributes: string[]
}
export const N_THEMES: NTheme[] = [
  { intro: 'A magic key is hidden behind one of these doors!',       noun: 'door',     attributes: ['red', 'blue', 'green', 'gold', 'silver'] },
  { intro: 'A sparkly gem rests inside one of these chests!',        noun: 'chest',    attributes: ['tiny', 'small', 'medium', 'large', 'huge'] },
  { intro: 'A wish token glows on one of these stars!',             noun: 'star',     attributes: ['dim', 'faint', 'bright', 'glowing', 'brilliant'] },
  { intro: 'A tiny fairy is sleeping under one of these mushrooms!', noun: 'mushroom', attributes: ['red', 'orange', 'yellow', 'purple', 'spotted'] },
  { intro: 'A secret is tucked inside one of these lanterns!',      noun: 'lantern',  attributes: ['crimson', 'amber', 'emerald', 'azure', 'violet'] },
  { intro: 'A friendly pony is waiting by one of these flowers!',   noun: 'flower',   attributes: ['pink', 'white', 'yellow', 'orange', 'blue'] },
]

function positionNames(n: number): string[] {
  if (n <= 3) return ['left', 'middle', 'right']
  if (n === 4) return ['far-left', 'middle-left', 'middle-right', 'far-right']
  return ['far-left', 'left', 'middle', 'right', 'far-right']
}

export interface LogicPuzzle {
  problem: LogicProblem
  targeted: number[]
}

export function buildLogicPuzzle(rng: Rng, numOptions: number, theme: NTheme): LogicPuzzle {
  const positions  = positionNames(numOptions)
  const attributes = shuffle(theme.attributes, rng).slice(0, numOptions)
  const correctIndex = randInt(rng, 0, numOptions - 1)
  const wrongs = Array.from({ length: numOptions }, (_, i) => i).filter(i => i !== correctIndex)
  const choices = positions.map((pos, i) => `${pos} ${theme.noun} (${attributes[i]})`)
  const clues = shuffle(wrongs, rng).map((w, k) =>
    k % 2 === 0
      ? `It is NOT the ${attributes[w]} ${theme.noun}.`
      : `It is NOT the ${theme.noun} on the ${positions[w]}.`,
  )
  const optionList = choices.map(c => `• ${c}`).join('\n')
  const prompt =
    `${theme.intro}\n\n${optionList}\n\n${clues.join('\n')}\n\n` +
    `Which ${theme.noun} is the right one?`
  const hint =
    `Cross off each clue one at a time. ${clues.length} clues remove ${clues.length} ${theme.noun}s — ` +
    `the one left over is your answer!`
  return { problem: { type: 'logic', prompt, choices, correctIndex, hint }, targeted: wrongs }
}

// ── new varied templates for bands 3–4 (4 choices) ───────────────────────────

// T_B34_A: Two-attribute filter (color AND shape)
const TWOATTR_ITEMS = [
  { color: 'red',    shape: 'round'  },
  { color: 'blue',   shape: 'square' },
  { color: 'green',  shape: 'round'  },
  { color: 'yellow', shape: 'square' },
  { color: 'red',    shape: 'pointy' },
  { color: 'blue',   shape: 'flat'   },
]
const T_B34_A: LogicFactory = (rng) => {
  const pool = shuffle(TWOATTR_ITEMS, rng).slice(0, 4)
  const correct = randInt(rng, 0, 3)
  const targetColor = pool[correct].color
  const targetShape = pool[correct].shape
  const choices = pool.map(it => `A ${it.color}, ${it.shape} gem`)
  return {
    prompt:
      `Look at these four gems:\n\n` +
      `${choices.map(c => `• ${c}`).join('\n')}\n\n` +
      `Which gem is BOTH ${targetColor} AND ${targetShape}?`,
    choices,
    correctIndex: correct,
    hint: `Find the one that matches BOTH descriptions — ignore items that only match one.`,
  }
}

// T_B34_B: Ordering 4 items with 3 clues
const ORDER4_PUZZLES = [
  { items: ['Ash', 'Bree', 'Cole', 'Dex'], clues: ['Ash is slower than Bree', 'Bree is slower than Cole', 'Cole is slower than Dex'], q: 'Who is the fastest?', correct: 'Dex', wrong: ['Ash', 'Bree', 'Cole'] },
  { items: ['Oak', 'Pine', 'Elm', 'Yew'],  clues: ['Oak is shorter than Pine', 'Pine is shorter than Elm', 'Elm is shorter than Yew'],  q: 'Which tree is the shortest?', correct: 'Oak', wrong: ['Pine', 'Elm', 'Yew'] },
  { items: ['1st', '2nd', '3rd', '4th'],   clues: ['Fern finished before Gale', 'Gale finished before Haze', 'Haze finished before Ivy'], q: 'Who finished last?', correct: 'Ivy', wrong: ['Fern', 'Gale', 'Haze'] },
]
const T_B34_B: LogicFactory = (rng) => {
  const p = ORDER4_PUZZLES[randInt(rng, 0, ORDER4_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: `Use these clues:\n• ${p.clues.join('\n• ')}\n\n${p.q}`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Line everyone up in order from the clues, then find the answer.`,
  }
}

// T_B34_C: Chain reasoning A→B→C
const CHAIN_PUZZLES = [
  { setup: ['Every square has 4 sides.', 'Every shape with 4 sides is a quadrilateral.'], conclusion: 'A square is a quadrilateral.', wrongs: ['A square has 5 sides.', 'A quadrilateral has 3 sides.', 'Not all squares have sides.'] },
  { setup: ['Every rabbit has long ears.', 'Floppy is a rabbit.'],                        conclusion: 'Floppy has long ears.',          wrongs: ['Floppy is a cat.', 'Floppy has short ears.', 'All animals have long ears.'] },
  { setup: ['All fire ponies live in the fire zone.', 'Blazehoof is a fire pony.'],        conclusion: 'Blazehoof lives in the fire zone.', wrongs: ['Blazehoof is a water pony.', 'All ponies live in the fire zone.', 'Blazehoof lives in the water zone.'] },
]
const T_B34_C: LogicFactory = (rng) => {
  const p = CHAIN_PUZZLES[randInt(rng, 0, CHAIN_PUZZLES.length - 1)]
  const choices = shuffle([p.conclusion, ...p.wrongs], rng)
  return {
    prompt: `Given that:\n• ${p.setup.join('\n• ')}\n\nWhat MUST be true?`,
    choices,
    correctIndex: choices.indexOf(p.conclusion),
    hint: `Apply the rules step by step — if the first statement is true AND the second is true, what follows?`,
  }
}

// T_B34_D: 2×2 grid logic
const GRID2_PUZZLES = [
  { q: 'Sam and Kate each have one bag. Sam has a red bag. Kate does NOT have a red bag. What color is Kate\'s bag?', correct: 'Blue', wrong: ['Red', 'The same as Sam\'s', 'Neither of them has a bag'] },
  { q: 'Two seats: left and right. Lily sits on the left. Max does NOT sit on the left. Where is Max?', correct: 'Right', wrong: ['Left', 'Middle', 'On the floor'] },
  { q: 'Two lights: one is on, one is off. The kitchen light is off. What is true about the bedroom light?', correct: 'It is on', wrong: ['It is also off', 'It might be off too', 'Lights don\'t matter'] },
]
const T_B34_D: LogicFactory = (rng) => {
  const p = GRID2_PUZZLES[randInt(rng, 0, GRID2_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: p.q,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `If one option is taken, the other must be what's left over.`,
  }
}

// T_B34_E: "Which would you use?" — situation matching
const USE_PUZZLES = [
  { q: 'You need to see underwater clearly. Which would help most?', correct: 'Swimming goggles', wrong: ['A woolen hat', 'A warm coat', 'A book'] },
  { q: 'You are lost in a dark forest at night. Which is most useful?', correct: 'A flashlight', wrong: ['An umbrella', 'A bathing suit', 'A paintbrush'] },
  { q: 'It is very hot and sunny and you\'re going outside. What should you put on?', correct: 'Sunscreen', wrong: ['A winter scarf', 'Ice skates', 'Gardening gloves'] },
  { q: 'You want to send a letter to a friend far away. What do you need?', correct: 'Paper and a pen', wrong: ['A fire pit', 'A hammer', 'Swimming fins'] },
]
const T_B34_E: LogicFactory = (rng) => {
  const p = USE_PUZZLES[randInt(rng, 0, USE_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: p.q,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Think about exactly what the task needs — which item solves that specific problem?`,
  }
}

// T_B34_F: "What must also be true?" — logical consequence
const MUST_PUZZLES = [
  { fact: 'All birds have feathers. A sparrow is a bird.', correct: 'A sparrow has feathers.', wrong: ['All animals have feathers.', 'A sparrow cannot fly.', 'Feathers are only for birds.'] },
  { fact: 'Every library has books. Mossgrove has a library.', correct: 'Mossgrove has books.', wrong: ['Every building has books.', 'Mossgrove is a library.', 'Books are only in Mossgrove.'] },
  { fact: 'Ponies that earn a badge can enter the next zone. Ember earned a badge.', correct: 'Ember can enter the next zone.', wrong: ['Ember has all the badges.', 'All ponies can enter the next zone.', 'Ember lost her badge.'] },
]
const T_B34_F: LogicFactory = (rng) => {
  const p = MUST_PUZZLES[randInt(rng, 0, MUST_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: `Given that: ${p.fact}\n\nWhat MUST also be true?`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Apply both facts together — what do they guarantee?`,
  }
}

// Band 3–4 pool: N-theme 4-option elimination + 6 varied templates
const N_THEME_IDS_4 = N_THEMES.map((_, i) => i)
const nThemeTracker4 = new RecentlySeenTracker(N_THEMES.length)

const BAND34_VARIED: LogicFactory[] = [T_B34_A, T_B34_B, T_B34_C, T_B34_D, T_B34_E, T_B34_F]
const BAND34_VARIED_IDS = BAND34_VARIED.map((_, i) => i)
const band34VariedTracker = new RecentlySeenTracker(BAND34_VARIED.length)

function generateBand34(rng: Rng): LogicProblem {
  // 50% chance: use a varied template; 50%: use N-theme 4-option elimination
  if (rng() < 0.5) {
    const idx = band34VariedTracker.pickFresh(BAND34_VARIED_IDS, rng)
    return { type: 'logic', ...BAND34_VARIED[idx](rng) }
  }
  const themeIdx = nThemeTracker4.pickFresh(N_THEME_IDS_4, rng)
  return buildLogicPuzzle(rng, 4, N_THEMES[themeIdx]).problem
}

// ════════════════════════════════════════════════════════════════════════════
// BANDS 5–6 — advanced formats, 5 choices
// ════════════════════════════════════════════════════════════════════════════

// T_B56_A: Three-attribute filter (5 items)
const THREEATTR_ITEMS = [
  { color: 'red',    size: 'small',  shiny: true  },
  { color: 'blue',   size: 'big',    shiny: false },
  { color: 'red',    size: 'big',    shiny: true  },
  { color: 'green',  size: 'small',  shiny: false },
  { color: 'blue',   size: 'small',  shiny: true  },
]
const T_B56_A: LogicFactory = (rng) => {
  const pool = shuffle(THREEATTR_ITEMS, rng)
  const correct = randInt(rng, 0, 4)
  const targetColor = pool[correct].color
  const targetSize  = pool[correct].size
  const targetShiny = pool[correct].shiny ? 'shiny' : 'not shiny'
  const choices = pool.map(it => `${it.color}, ${it.size}, ${it.shiny ? 'shiny' : 'not shiny'} gem`)
  return {
    prompt:
      `Which gem matches ALL THREE of these clues?\n\n` +
      `• Color: ${targetColor}\n• Size: ${targetSize}\n• Surface: ${targetShiny}\n\n` +
      `${choices.map(c => `• ${c}`).join('\n')}`,
    choices,
    correctIndex: correct,
    hint: `Eliminate items one clue at a time — color first, then size, then surface.`,
  }
}

// T_B56_B: Multi-step ordering chain (5 items)
const ORDER5_PUZZLES = [
  { items: ['Ava', 'Ben', 'Cal', 'Dee', 'Eve'],
    clues: ['Ava is shorter than Ben', 'Ben is shorter than Cal', 'Cal is shorter than Dee', 'Dee is shorter than Eve'],
    q: 'Who is the tallest?', correct: 'Eve' },
  { items: ['Ant', 'Bee', 'Cat', 'Dog', 'Elk'],
    clues: ['Ant is lighter than Bee', 'Bee is lighter than Cat', 'Cat is lighter than Dog', 'Dog is lighter than Elk'],
    q: 'Who is the lightest?', correct: 'Ant' },
]
const T_B56_B: LogicFactory = (rng) => {
  const p = ORDER5_PUZZLES[randInt(rng, 0, ORDER5_PUZZLES.length - 1)]
  const choices = shuffle([...p.items], rng)
  return {
    prompt: `Use these clues:\n• ${p.clues.join('\n• ')}\n\n${p.q}`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Build the full order from the clues — from least to most.`,
  }
}

// T_B56_C: Deduction chain — A→B→C→D
const DEDUC_PUZZLES = [
  { setup: ['If it rains, the ground gets wet.', 'If the ground is wet, worms appear.', 'If worms appear, birds come to eat them.'],
    cond: 'It is raining.',
    correct: 'Birds will come.', wrong: ['The ground stays dry.', 'Worms will not appear.', 'Only birds cause rain.', 'Birds cause the worms.'] },
  { setup: ['If Ember earns 3 badges, she reaches Zone 4.', 'If she reaches Zone 4, she meets Blazehoof.', 'If she meets Blazehoof, she can challenge the Trial.'],
    cond: 'Ember earns 3 badges.',
    correct: 'Ember can challenge the Trial.', wrong: ['Ember loses all her badges.', 'Blazehoof leaves Zone 4.', 'Ember never earns badges.', 'Zone 4 disappears.'] },
]
const T_B56_C: LogicFactory = (rng) => {
  const p = DEDUC_PUZZLES[randInt(rng, 0, DEDUC_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: `Rules:\n• ${p.setup.join('\n• ')}\n\nGiven that: ${p.cond}\n\nWhat must eventually happen?`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Follow each "if…then" step in order — apply every rule until you reach the end.`,
  }
}

// T_B56_D: "Which statement is IMPOSSIBLE?" — contradiction detection
const IMPOSSIBLE_PUZZLES = [
  { fact: 'All ponies in the Earth zone are Earth ponies.', correct: 'A Water pony lives deep in the Earth zone.', wrong: ['An Earth pony collects rocks.', 'Two Earth ponies are friends.', 'An Earth pony visits Zone 3.', 'All Earth ponies love mud.'] },
  { fact: 'Bramblewood\'s lantern has NEVER gone out since before any pony was born.', correct: 'Bramblewood\'s lantern went out last Tuesday.', wrong: ['Bramblewood polishes the lantern.', 'Other ponies admire the lantern.', 'The lantern is very old.', 'Bramblewood carries the lantern on walks.'] },
]
const T_B56_D: LogicFactory = (rng) => {
  const p = IMPOSSIBLE_PUZZLES[randInt(rng, 0, IMPOSSIBLE_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: `Fact: ${p.fact}\n\nWhich of these statements is IMPOSSIBLE given the fact above?`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Look for the statement that directly CONTRADICTS the given fact.`,
  }
}

// T_B56_E: "What conclusion follows?" — 5-option version
const CONCLUSION_PUZZLES = [
  { setup: 'Every zone has exactly one Guardian. There are five zones.', correct: 'There are exactly five Guardians.', wrong: ['There are no Guardians.', 'One Guardian rules all five zones.', 'Some zones have two Guardians.', 'Guardians come in pairs.'] },
  { setup: 'Ponies can only enter a zone if they have the right badge. Breezy has the Zone 5 badge.', correct: 'Breezy can enter Zone 5.', wrong: ['Breezy can enter any zone.', 'Breezy has no badges.', 'Breezy is not allowed in Zone 4.', 'Zone 5 has no badge requirement.'] },
]
const T_B56_E: LogicFactory = (rng) => {
  const p = CONCLUSION_PUZZLES[randInt(rng, 0, CONCLUSION_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: `Given: ${p.setup}\n\nWhich conclusion must be correct?`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `The conclusion must follow DIRECTLY from the given information — nothing more, nothing less.`,
  }
}

// T_B56_F: "Who must be neighbours?" — 5-option constraint puzzle
const SEATING_PUZZLES = [
  { setup: 'Five friends sit in a row: Ash, Bree, Cole, Dana, Eve.\nAsh is in seat 1. Bree is next to Ash. Cole is next to Bree but NOT next to Ash.',
    q: 'Who must be in seat 3?', correct: 'Cole', wrong: ['Ash', 'Bree', 'Dana', 'Eve'] },
  { setup: 'Five items in a line: star, moon, sun, cloud, rain.\nStar is first. Moon is right after star. Sun is right after moon.',
    q: 'What is in the third spot?', correct: 'Sun', wrong: ['Star', 'Moon', 'Cloud', 'Rain'] },
]
const T_B56_F: LogicFactory = (rng) => {
  const p = SEATING_PUZZLES[randInt(rng, 0, SEATING_PUZZLES.length - 1)]
  const choices = shuffle([p.correct, ...p.wrong], rng)
  return {
    prompt: `${p.setup}\n\n${p.q}`,
    choices,
    correctIndex: choices.indexOf(p.correct),
    hint: `Place each item in order using the clues step by step.`,
  }
}

// Band 5–6 pool: N-theme 5-option elimination + 6 varied templates
const N_THEME_IDS_5 = N_THEMES.map((_, i) => i)
const nThemeTracker5 = new RecentlySeenTracker(N_THEMES.length)

const BAND56_VARIED: LogicFactory[] = [T_B56_A, T_B56_B, T_B56_C, T_B56_D, T_B56_E, T_B56_F]
const BAND56_VARIED_IDS = BAND56_VARIED.map((_, i) => i)
const band56VariedTracker = new RecentlySeenTracker(BAND56_VARIED.length)

function generateBand56(rng: Rng): LogicProblem {
  if (rng() < 0.5) {
    const idx = band56VariedTracker.pickFresh(BAND56_VARIED_IDS, rng)
    return { type: 'logic', ...BAND56_VARIED[idx](rng) }
  }
  const themeIdx = nThemeTracker5.pickFresh(N_THEME_IDS_5, rng)
  return buildLogicPuzzle(rng, 5, N_THEMES[themeIdx]).problem
}

// ════════════════════════════════════════════════════════════════════════════
// PUBLIC ENTRY — routes by effective difficulty
// ════════════════════════════════════════════════════════════════════════════

export function generateLogicProblem(difficulty: number, rng: Rng = Math.random): LogicProblem {
  const band = bandForDifficulty(difficulty)
  if (band <= 2) return generateBand12(rng)
  if (band <= 4) return generateBand34(rng)
  return generateBand56(rng)
}
