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

// Correctness guarantee for all templates: we build `wrong = [0,1,2].filter(i !== correct)`,
// then derive clue1 from wrong[0]'s attribute and clue2 from wrong[1]'s position.
// This structurally ensures neither clue can eliminate `correct`.

const TEMPLATES: LogicFactory[] = [
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

  // 1: Three doors — shuffled colors
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

  // 2: Three treasure chests — shuffled sizes
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

  // 3: Three clouds — shuffled shapes
  (rng) => {
    const positions = ['Left', 'Middle', 'Right']
    const shapes = shuffle(['fluffy', 'wispy', 'stormy'], rng)
    const correct = randInt(rng, 0, 2)
    const wrong = [0, 1, 2].filter(i => i !== correct)
    const items = positions.map((pos, i) => `${pos} cloud (${shapes[i]})`)
    const clue1 = `the ${shapes[wrong[0]]} cloud`
    const clue2 = `the cloud on the ${positions[wrong[1]].toLowerCase()}`
    return {
      prompt:
        `A sky pony is resting on one of three clouds!\n\n` +
        `${items.map(it => `☁️ ${it}`).join('\n')}\n\n` +
        `She is NOT on ${clue1}.\n` +
        `She is NOT on ${clue2}.\n\n` +
        `Which cloud is she resting on?`,
      choices: items,
      correctIndex: correct,
      hint: `Cross off: NOT ${clue1} ✗   NOT ${clue2} ✗   One cloud remains!`,
    }
  },

  // 4: Three stars — shuffled brightness
  (rng) => {
    const positions = ['Left', 'Middle', 'Right']
    const brightness = shuffle(['dim', 'bright', 'brilliant'], rng)
    const correct = randInt(rng, 0, 2)
    const wrong = [0, 1, 2].filter(i => i !== correct)
    const items = positions.map((pos, i) => `${pos} star (${brightness[i]})`)
    const clue1 = `the ${brightness[wrong[0]]} star`
    const clue2 = `the star on the ${positions[wrong[1]].toLowerCase()}`
    return {
      prompt:
        `A wish token is resting on one of three stars!\n\n` +
        `${items.map(it => `⭐ ${it}`).join('\n')}\n\n` +
        `The token is NOT on ${clue1}.\n` +
        `The token is NOT on ${clue2}.\n\n` +
        `Which star holds the wish token?`,
      choices: items,
      correctIndex: correct,
      hint: `Cross off: NOT ${clue1} ✗   NOT ${clue2} ✗   One star remains!`,
    }
  },

  // 5: Three mushrooms — shuffled colors
  (rng) => {
    const positions = ['Left', 'Middle', 'Right']
    const colors = shuffle(['red', 'yellow', 'purple'], rng)
    const correct = randInt(rng, 0, 2)
    const wrong = [0, 1, 2].filter(i => i !== correct)
    const items = positions.map((pos, i) => `${pos} mushroom (${colors[i]})`)
    const clue1 = `the ${colors[wrong[0]]} mushroom`
    const clue2 = `the mushroom on the ${positions[wrong[1]].toLowerCase()}`
    return {
      prompt:
        `A tiny fairy is sleeping under one of three mushrooms!\n\n` +
        `${items.map(it => `🍄 ${it}`).join('\n')}\n\n` +
        `She is NOT under ${clue1}.\n` +
        `She is NOT under ${clue2}.\n\n` +
        `Which mushroom is she sleeping under?`,
      choices: items,
      correctIndex: correct,
      hint: `Cross off: NOT ${clue1} ✗   NOT ${clue2} ✗   One mushroom remains!`,
    }
  },

  // 6: Three pebbles — shuffled textures
  (rng) => {
    const positions = ['Left', 'Middle', 'Right']
    const textures = shuffle(['smooth', 'rough', 'sparkly'], rng)
    const correct = randInt(rng, 0, 2)
    const wrong = [0, 1, 2].filter(i => i !== correct)
    const items = positions.map((pos, i) => `${pos} pebble (${textures[i]})`)
    const clue1 = `the ${textures[wrong[0]]} pebble`
    const clue2 = `the pebble on the ${positions[wrong[1]].toLowerCase()}`
    return {
      prompt:
        `A hidden message is under one of three pebbles!\n\n` +
        `${items.map(it => `🪨 ${it}`).join('\n')}\n\n` +
        `The message is NOT under ${clue1}.\n` +
        `The message is NOT under ${clue2}.\n\n` +
        `Which pebble hides the message?`,
      choices: items,
      correctIndex: correct,
      hint: `Cross off: NOT ${clue1} ✗   NOT ${clue2} ✗   One pebble remains!`,
    }
  },

  // 7: Three trees — shuffled leaf colors
  (rng) => {
    const positions = ['Left', 'Middle', 'Right']
    const leaves = shuffle(['golden', 'silver', 'jade'], rng)
    const correct = randInt(rng, 0, 2)
    const wrong = [0, 1, 2].filter(i => i !== correct)
    const items = positions.map((pos, i) => `${pos} tree (${leaves[i]} leaves)`)
    const clue1 = `the tree with ${leaves[wrong[0]]} leaves`
    const clue2 = `the tree on the ${positions[wrong[1]].toLowerCase()}`
    return {
      prompt:
        `A magic acorn is hidden at the base of one of three trees!\n\n` +
        `${items.map(it => `🌳 ${it}`).join('\n')}\n\n` +
        `The acorn is NOT near ${clue1}.\n` +
        `The acorn is NOT near ${clue2}.\n\n` +
        `Which tree hides the acorn?`,
      choices: items,
      correctIndex: correct,
      hint: `Cross off: NOT ${clue1} ✗   NOT ${clue2} ✗   One tree remains!`,
    }
  },

  // 8: Three lanterns — shuffled glow levels
  (rng) => {
    const positions = ['Left', 'Middle', 'Right']
    const glow = shuffle(['faint', 'steady', 'blazing'], rng)
    const correct = randInt(rng, 0, 2)
    const wrong = [0, 1, 2].filter(i => i !== correct)
    const items = positions.map((pos, i) => `${pos} lantern (${glow[i]} glow)`)
    const clue1 = `the lantern with a ${glow[wrong[0]]} glow`
    const clue2 = `the lantern on the ${positions[wrong[1]].toLowerCase()}`
    return {
      prompt:
        `A secret is hidden inside one of three lanterns!\n\n` +
        `${items.map(it => `🏮 ${it}`).join('\n')}\n\n` +
        `The secret is NOT in ${clue1}.\n` +
        `The secret is NOT in ${clue2}.\n\n` +
        `Which lantern holds the secret?`,
      choices: items,
      correctIndex: correct,
      hint: `Cross off: NOT ${clue1} ✗   NOT ${clue2} ✗   One lantern remains!`,
    }
  },
]

const antiRepeat = new RecentlySeenTracker(TEMPLATES.length)
const TEMPLATE_IDS = TEMPLATES.map((_, i) => i)

function generateThreeOption(): LogicProblem {
  const idx = antiRepeat.pickFresh(TEMPLATE_IDS, Math.random)
  const result = TEMPLATES[idx](Math.random)
  return { type: 'logic', ...result }
}

// ════════════════════════════════════════════════════════════════════════════
// GENERIC N-OPTION PUZZLES (bands 3–6) — 4 or 5 options, scaling clue counts
// ════════════════════════════════════════════════════════════════════════════
//
// Each option has a unique POSITION and a unique ATTRIBUTE. To leave exactly one
// answer, we emit one clue per WRONG option (numOptions − 1 clues), each "NOT the
// {attribute}" or "NOT the one on the {position}". Because every attribute and
// position is unique and the correct option is never targeted, the clues
// eliminate every wrong option and exactly one survivor remains — the answer is
// always correct AND unique by construction.

export interface NTheme {
  intro: string
  noun: string
  /** At least 5 visually distinct attributes. */
  attributes: string[]
}

export const N_THEMES: NTheme[] = [
  { intro: 'A magic key is hidden behind one of these doors!',
    noun: 'door',   attributes: ['red', 'blue', 'green', 'gold', 'silver'] },
  { intro: 'A sparkly gem rests inside one of these chests!',
    noun: 'chest',  attributes: ['tiny', 'small', 'medium', 'large', 'huge'] },
  { intro: 'A wish token glows on one of these stars!',
    noun: 'star',   attributes: ['dim', 'faint', 'bright', 'glowing', 'brilliant'] },
  { intro: 'A tiny fairy is sleeping under one of these mushrooms!',
    noun: 'mushroom', attributes: ['red', 'orange', 'yellow', 'purple', 'spotted'] },
  { intro: 'A secret is tucked inside one of these lanterns!',
    noun: 'lantern', attributes: ['crimson', 'amber', 'emerald', 'azure', 'violet'] },
  { intro: 'A friendly pony is waiting by one of these flowers!',
    noun: 'flower', attributes: ['pink', 'white', 'yellow', 'orange', 'blue'] },
]

function positionNames(n: number): string[] {
  if (n <= 3) return ['left', 'middle', 'right']
  if (n === 4) return ['far-left', 'middle-left', 'middle-right', 'far-right']
  return ['far-left', 'left', 'middle', 'right', 'far-right']
}

export interface LogicPuzzle {
  problem: LogicProblem
  /** Wrong-option indices eliminated by the clues (for tests). */
  targeted: number[]
}

export function buildLogicPuzzle(rng: Rng, numOptions: number, theme: NTheme): LogicPuzzle {
  const positions = positionNames(numOptions)
  const attributes = shuffle(theme.attributes, rng).slice(0, numOptions)

  const correctIndex = randInt(rng, 0, numOptions - 1)
  const wrongs = Array.from({ length: numOptions }, (_, i) => i).filter(i => i !== correctIndex)

  // Choices listed in position order: option i sits at position i.
  const choices = positions.map((pos, i) => `${pos} ${theme.noun} (${attributes[i]})`)

  // One clue per wrong option, alternating attribute / position styles for variety.
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

  return {
    problem: { type: 'logic', prompt, choices, correctIndex, hint },
    targeted: wrongs,
  }
}

const N_THEME_IDS = N_THEMES.map((_, i) => i)
const nThemeTrackers = new Map<number, RecentlySeenTracker>()
function nThemeTrackerFor(numOptions: number): RecentlySeenTracker {
  let t = nThemeTrackers.get(numOptions)
  if (!t) {
    t = new RecentlySeenTracker(N_THEMES.length)
    nThemeTrackers.set(numOptions, t)
  }
  return t
}

function optionCountForBand(band: number): number {
  if (band <= 2) return 3
  if (band <= 4) return 4
  return 5
}

// ════════════════════════════════════════════════════════════════════════════
// PUBLIC ENTRY — routes by effective difficulty
// ════════════════════════════════════════════════════════════════════════════

export function generateLogicProblem(difficulty: number): LogicProblem {
  const band = bandForDifficulty(difficulty)
  const numOptions = optionCountForBand(band)
  if (numOptions === 3) return generateThreeOption()

  const themeIdx = nThemeTrackerFor(numOptions).pickFresh(N_THEME_IDS, Math.random)
  return buildLogicPuzzle(Math.random, numOptions, N_THEMES[themeIdx]).problem
}
