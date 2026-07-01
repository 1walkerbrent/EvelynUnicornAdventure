import type { Element } from './types'

// Asymmetric 5×5 type multiplier matrix (§3).
// Attack wheel (×2 offense):  Water→Fire→Air→Spirit→Earth→Water
// Defense wheel (×0.5 resist): each element resists the element 2 steps behind it
//   on the attack wheel — Water resists Spirit, Fire resists Earth, Air resists
//   Water, Spirit resists Fire, Earth resists Air.
// Every row has exactly one ×2 and one ×0.5; every column likewise.
// Key asymmetry: hitting INTO your advantage deals ×2, but the reverse is ×1
// (not ×0.5) — resistance runs on a DIFFERENT axis than offense.
const TYPE_MATRIX: Record<Element, Record<Element, 2 | 1 | 0.5>> = {
  //              Water  Fire   Air    Spirit  Earth
  water:  { water: 1,   fire: 2,   air: 0.5,  spirit: 1,   earth: 1   },
  fire:   { water: 1,   fire: 1,   air: 2,    spirit: 0.5, earth: 1   },
  air:    { water: 1,   fire: 1,   air: 1,    spirit: 2,   earth: 0.5 },
  spirit: { water: 0.5, fire: 1,   air: 1,    spirit: 1,   earth: 2   },
  earth:  { water: 2,   fire: 0.5, air: 1,    spirit: 1,   earth: 1   },
}

export function getTypeMultiplier(attacker: Element, defender: Element): 2 | 1 | 0.5 {
  return TYPE_MATRIX[attacker][defender]
}

/** The element whose attacks deal ×2 to `defender` (its offensive counter, §3). */
export function getCounterElement(defender: Element): Element {
  return (Object.keys(TYPE_MATRIX) as Element[]).find(
    (e) => TYPE_MATRIX[e][defender] === 2,
  )!
}
