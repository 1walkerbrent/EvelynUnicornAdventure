import type { Creature } from './types'
import { SPECIES_BY_ID, CHAMPION_SPECIES } from '../content/creatures'
import { getStats } from './stats'

// New Game+ / "prestige" (§15). Beating the Champion unlocks a fresh journey:
// the whole map, badge set, level cap and roster reset, and the ONLY thing that
// survives is the legendary Champion trophy — proof she finished the game.
//
// The trophy carries as a species, not as a power spike: it is reset to the new
// run's level cap so the difficulty curve is identical to a first playthrough.
// It still feels special because Aurelune is tier 5 with max IVs, so even at the
// starting cap she outclasses a level-3 starter without trivialising anything.

/** Does this pony survive a prestige? Only Champion trophies do. */
export function isCarriedThroughPrestige(creature: Creature): boolean {
  return creature.speciesId === CHAMPION_SPECIES.id
}

/**
 * Reset a carried pony to a fresh run's level cap: level and XP go back to the
 * cap's floor and HP refills. The instance `id` and the permanent IVs are kept —
 * it is the *same individual*, just starting the journey again.
 */
export function resetToCap(creature: Creature, levelCap: number): Creature {
  const species = SPECIES_BY_ID[creature.speciesId]
  const stats = getStats(species.tier, levelCap, creature.ivs)
  return { ...creature, level: levelCap, xp: 0, currentHp: stats.heart }
}

/**
 * The party she starts a new journey with: every Champion trophy she has earned,
 * each reset to `levelCap`. Everything else is left behind.
 *
 * Winning again adds another trophy, so a third journey starts with two — the
 * instance ids added at save v7 are what let same-species duplicates coexist.
 */
export function prestigeParty(party: Creature[], levelCap: number): Creature[] {
  return party.filter(isCarriedThroughPrestige).map(c => resetToCap(c, levelCap))
}
