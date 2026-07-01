import { buildBattlePony } from '../engine/battle'
import type { BattlePony } from '../engine/battle'
import { buildBossBattlePony, CHAMPION_LEVEL, type BossTier } from '../engine/boss'
import { levelCapForBadges } from '../engine/leveling'
import { SPECIES_BY_ID } from '../content/creatures'
import { ZONE_BY_ID } from '../content/zones'
import type { Creature } from '../engine/types'
import type { Guardian } from '../content/guardians'

/** Her front 3 ponies as BattlePonies (stats from species tier + saved level + IVs). */
export function buildPlayerTeam(party: Creature[]): BattlePony[] {
  return party.slice(0, 3).map((c, i) => {
    const sp = SPECIES_BY_ID[c.speciesId]
    return { ...buildBattlePony(`player-${i}`, c.nickname || sp.name, sp.element, sp.tier, c.level, c.ivs), speciesId: sp.id }
  })
}

/** The level cap in force while playing a given zone (§6): badges = zone tier − 1. */
function zoneLevelCap(zoneTier: 1 | 2 | 3 | 4 | 5): number {
  return levelCapForBadges(zoneTier - 1)
}

/**
 * A Guardian's (or the Champion's) Trial team as combat bosses (§8): every pony
 * uses max IVs + tier multipliers. Teammates use the `trialTeam` tier; the
 * Guardian's ace uses `guardian`. The post-game Champion's ace uses `champion`
 * (its teammates stay `trialTeam`), all at the fixed Champion level.
 */
export function buildGuardianTeam(guardian: Guardian): BattlePony[] {
  const isChampion = !guardian.zoneId
  const zoneTier = guardian.zoneId ? ZONE_BY_ID[guardian.zoneId]?.tier : undefined
  const cap = isChampion ? CHAMPION_LEVEL : zoneLevelCap((zoneTier ?? 1) as 1 | 2 | 3 | 4 | 5)

  return guardian.team.map((t, i) => {
    const sp = SPECIES_BY_ID[t.speciesId]
    const isAce = t.speciesId === guardian.aceSpeciesId
    const bossTier: BossTier = isChampion
      ? (isAce ? 'champion' : 'trialTeam')
      : (isAce ? 'guardian' : 'trialTeam')
    const level = isChampion ? CHAMPION_LEVEL : isAce ? cap + 1 : cap
    return { ...buildBossBattlePony(`foe-${i}`, sp.name, sp.element, sp.tier, level, bossTier), speciesId: sp.id }
  })
}
