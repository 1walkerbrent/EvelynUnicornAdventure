import { useMemo } from 'react'
import { useGameStore } from '../state/store'
import { CHAMPION } from '../content/guardians'
import { resolveBattleTeam } from '../engine/team'
import BattleScreen from '../components/BattleScreen'
import { buildPlayerTeam, buildGuardianTeam } from './teams'

// The post-game finale: <BattleScreen> vs Grand Champion Vesper (ace: Aurelune).
// Victory → store.winChampion (awards Aurelune) → celebratory end screen.
export default function Champion() {
  const party       = useGameStore((s) => s.party)
  const activeTeam  = useGameStore((s) => s.activeTeam)
  const winChampion = useGameStore((s) => s.winChampion)
  const setScreen   = useGameStore((s) => s.setScreen)

  const playerPonies = useMemo(
    () => buildPlayerTeam(resolveBattleTeam(party, activeTeam)),
    [party, activeTeam],
  )
  const enemyPonies  = useMemo(() => buildGuardianTeam(CHAMPION), [])

  return (
    <BattleScreen
      playerPonies={playerPonies}
      enemyPonies={enemyPonies}
      enemyLabel={CHAMPION.name}
      backgroundId="champion-arena"
      victoryTitle="Champion! 👑"
      victoryMessage="You bested Grand Champion Vesper — the legendary Aurelune joins your party!"
      victoryButtonLabel="See your victory 🎉"
      onVictory={() => { winChampion(); setScreen('gameComplete') }}
      onDefeat={() => setScreen('worldMap')}
    />
  )
}
