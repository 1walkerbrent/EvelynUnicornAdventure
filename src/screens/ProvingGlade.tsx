import { useMemo } from 'react'
import { useGameStore } from '../state/store'
import { buildBattlePony } from '../engine/battle'
import type { BattlePony } from '../engine/battle'
import type { Element } from '../engine/types'
import { resolveBattleTeam } from '../engine/team'
import BattleScreen from '../components/BattleScreen'
import { buildPlayerTeam } from './teams'

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

export default function ProvingGlade() {
  const party      = useGameStore(s => s.party)
  const activeTeam = useGameStore(s => s.activeTeam)
  const winTrial   = useGameStore(s => s.winTrial)
  const setScreen  = useGameStore(s => s.setScreen)

  // Memoised so team objects stay stable across re-renders
  const playerPonies = useMemo(
    () => buildPlayerTeam(resolveBattleTeam(party, activeTeam)),
    [party, activeTeam],
  )
  const enemyPonies  = useMemo(() => buildPipTeam(), [])

  return (
    <BattleScreen
      playerPonies={playerPonies}
      enemyPonies={enemyPonies}
      enemyLabel="Pip"
      victoryTitle="You won!"
      victoryMessage="“Your bond with your ponies is real — and you used the type wheel perfectly! Zone 2 is now open to you!” — Pip"
      victoryButtonLabel="Continue to the World Map 🗺️"
      defeatTip="🔥 Fire beats 💨 Air — try Tangerine vs Wisp! Focus all three ponies on one enemy."
      // Clears Zone 1's gating area ('proving') → unlocks Zone 2 + awards battle XP.
      onVictory={() => { winTrial('z1'); setScreen('worldMap') }}
      onDefeat={() => setScreen('worldMap')}
    />
  )
}
