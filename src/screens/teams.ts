import { buildBattlePony } from '../engine/battle'
import type { BattlePony } from '../engine/battle'
import { SPECIES_BY_ID } from '../content/creatures'
import type { Creature } from '../engine/types'
import type { Guardian } from '../content/guardians'

/** Her front 3 ponies as BattlePonies (stats from species tier + saved level). */
export function buildPlayerTeam(party: Creature[]): BattlePony[] {
  return party.slice(0, 3).map((c, i) => {
    const sp = SPECIES_BY_ID[c.speciesId]
    return buildBattlePony(`player-${i}`, c.nickname || sp.name, sp.element, sp.tier, c.level)
  })
}

/** A Guardian's (or the Champion's) Trial team from M2b data. */
export function buildGuardianTeam(guardian: Guardian): BattlePony[] {
  return guardian.team.map((t, i) => {
    const sp = SPECIES_BY_ID[t.speciesId]
    return buildBattlePony(`foe-${i}`, sp.name, sp.element, sp.tier, t.level)
  })
}
