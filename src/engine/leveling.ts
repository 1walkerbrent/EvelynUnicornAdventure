import type { Creature, Stats } from './types'
import { getStats } from './stats'

type Tier = 1 | 2 | 3 | 4 | 5

// XP rewards (§5: "XP is granted from both winning battles AND solving problems").
export const XP_PER_CORRECT_ANSWER = 20
export const XP_PER_BATTLE_WIN = 50

// §6 badge-based level caps.
const BADGE_LEVEL_CAPS: Record<number, number> = {
  0: 4, 1: 6, 2: 8, 3: 10, 4: 12, 5: 15,
}

export function levelCapForBadges(badges: number): number {
  const clamped = Math.min(Math.max(badges, 0), 5)
  return BADGE_LEVEL_CAPS[clamped]
}

/** XP required to advance from `level` to `level + 1`. Gentle linear curve (tunable). */
export function xpForNextLevel(level: number): number {
  return level * 100
}

export interface AddXpResult {
  creature: Creature
  leveledUp: boolean
  /** How many levels were gained (0 if none). */
  levelsGained: number
}

/**
 * Adds XP to a creature, leveling it up via the §5 formula and recomputing stats.
 * Level is clamped at `levelCap` (§6); XP keeps accumulating once the cap is hit,
 * but the creature never levels past it. Pure — returns a new Creature.
 */
export function addXp(creature: Creature, tier: Tier, amount: number, levelCap: number): AddXpResult {
  let level = creature.level
  let xp = (creature.xp ?? 0) + amount

  while (level < levelCap && xp >= xpForNextLevel(level)) {
    xp -= xpForNextLevel(level)
    level++
  }

  const levelsGained = level - creature.level
  const leveledUp = levelsGained > 0

  // On level-up, recompute the HP pool and heal to full (§5 stats; kid-friendly).
  let currentHp = creature.currentHp
  if (leveledUp) {
    const stats: Stats = getStats(tier, level)
    currentHp = stats.heart
  }

  return {
    creature: { ...creature, level, xp, currentHp },
    leveledUp,
    levelsGained,
  }
}
