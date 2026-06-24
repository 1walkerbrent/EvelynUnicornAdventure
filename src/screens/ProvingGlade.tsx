import { useMemo } from 'react'
import { useGameStore } from '../state/store'
import { SPECIES_BY_ID } from '../content/creatures'
import { buildBattlePony } from '../engine/battle'
import type { BattlePony } from '../engine/battle'
import type { Element } from '../engine/types'
import BattleScreen from '../components/BattleScreen'

// Pip's fixed team for the Zone 1 graduation battle (§7)
const PIP_ROSTER: Array<{ id: string; name: string; element: Element }> = [
  { id: 'opp-0', name: 'Pebble', element: 'earth'  },
  { id: 'opp-1', name: 'Wisp',   element: 'air'    },
  { id: 'opp-2', name: 'Glow',   element: 'spirit' },
]

function buildPipTeam(): BattlePony[] {
  return PIP_ROSTER.map(({ id, name, element }) =>
    buildBattlePony(id, name, element, 1, 3),
  )
}

function buildPlayerTeam(party: ReturnType<typeof useGameStore.getState>['party']): BattlePony[] {
  return party.slice(0, 3).map((c, i) => {
    const species = SPECIES_BY_ID[c.speciesId]
    return buildBattlePony(
      `player-${i}`,
      c.nickname || species.name,
      species.element,
      species.tier,
      c.level,
    )
  })
}

export default function ProvingGlade() {
  const party         = useGameStore(s => s.party)
  const completeZone1 = useGameStore(s => s.completeZone1)
  const setScreen     = useGameStore(s => s.setScreen)

  // Memoised so team objects stay stable across re-renders
  const playerPonies = useMemo(() => buildPlayerTeam(party), [party])
  const enemyPonies  = useMemo(() => buildPipTeam(), [])

  return (
    <BattleScreen
      playerPonies={playerPonies}
      enemyPonies={enemyPonies}
      enemyLabel="Pip"
      onVictory={() => { completeZone1(); setScreen('worldMap') }}
      onDefeat={() => setScreen('worldMap')}
    />
  )
}
