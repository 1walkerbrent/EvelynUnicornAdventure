import { useMemo } from 'react'
import { useGameStore } from '../state/store'
import { ZONE_BY_ID } from '../content/zones'
import { GUARDIAN_BY_ID } from '../content/guardians'
import { SPECIES_BY_ID } from '../content/creatures'
import BattleScreen from '../components/BattleScreen'
import { buildPlayerTeam, buildGuardianTeam } from './teams'

// Zone 2–6 Trial: <BattleScreen> vs the zone Guardian's team (M2b data).
// Victory → store.winTrial grants badge + signature + unlock; return to the map.
export default function Trial() {
  const party          = useGameStore((s) => s.party)
  const selectedZoneId = useGameStore((s) => s.selectedZoneId)
  const winTrial       = useGameStore((s) => s.winTrial)
  const setScreen      = useGameStore((s) => s.setScreen)

  const zone     = selectedZoneId ? ZONE_BY_ID[selectedZoneId] : undefined
  const guardian = zone?.guardianId ? GUARDIAN_BY_ID[zone.guardianId] : undefined

  const playerPonies = useMemo(() => buildPlayerTeam(party), [party])
  const enemyPonies  = useMemo(() => guardian ? buildGuardianTeam(guardian) : [], [guardian])

  if (!zone || !guardian) {
    return (
      <div className="p-6 text-center text-white space-y-4">
        <p>This Trial isn't available.</p>
        <button onClick={() => setScreen('worldMap')}
          className="bg-purple-700 px-5 py-3 rounded-xl">← Back to Map</button>
      </div>
    )
  }

  return (
    <BattleScreen
      playerPonies={playerPonies}
      enemyPonies={enemyPonies}
      enemyLabel={guardian.name}
      victoryTitle="Trial won! 🏅"
      victoryMessage={`You earned a badge and ${zone.signatureSpeciesId ? SPECIES_BY_ID[zone.signatureSpeciesId].name : 'a signature pony'} joins your party! A new region is open.`}
      victoryButtonLabel="Continue to the World Map 🗺️"
      onVictory={() => { winTrial(zone.id); setScreen('worldMap') }}
      onDefeat={() => setScreen('zone')}
    />
  )
}
