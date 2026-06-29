import type { LogicProblem } from './problems'
import { RecentlySeenTracker } from './antiRepeat'

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

export function generateLogicProblem(_difficulty: number): LogicProblem {
  const idx = antiRepeat.pickFresh(TEMPLATE_IDS, Math.random)
  const result = TEMPLATES[idx](Math.random)
  return { type: 'logic', ...result }
}
