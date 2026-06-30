import type { Element } from './types'

// Each element beats the next one in the wheel (§3): Water→Fire→Air→Spirit→Earth→Water
const BEATS: Record<Element, Element> = {
  water: 'fire',
  fire: 'air',
  air: 'spirit',
  spirit: 'earth',
  earth: 'water',
}

export function getTypeMultiplier(attacker: Element, defender: Element): 2 | 0.5 | 1 {
  if (BEATS[attacker] === defender) return 2
  if (BEATS[defender] === attacker) return 0.5
  return 1
}

/** The element that beats `defender` (its ×2 counter on the wheel, §3). */
export function getCounterElement(defender: Element): Element {
  return (Object.keys(BEATS) as Element[]).find((e) => BEATS[e] === defender)!
}
