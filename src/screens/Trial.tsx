import { useMemo, useState } from 'react'
import { useGameStore } from '../state/store'
import { ZONE_BY_ID } from '../content/zones'
import { GUARDIAN_BY_ID } from '../content/guardians'
import { SPECIES_BY_ID } from '../content/creatures'
import type { Element } from '../engine/types'
import {
  resolveBattleTeam, recommendTeamVsElement, shouldRecommend, matchupVsElement, shouldShowPicker,
} from '../engine/team'
import BattleScreen from '../components/BattleScreen'
import CreatureSprite from '../components/CreatureSprite'
import TeamPicker from '../components/TeamPicker'
import { buildPlayerTeam, buildGuardianTeam } from './teams'

// Zone 2–6 Trial: a "keep team or swap?" nudge (M2e) that teaches the type wheel,
// then <BattleScreen> vs the zone Guardian's team (M2b data). After 3 losses the
// recommended-team safety net appears. Victory → store.winTrial grants badge +
// signature + unlock; defeat → record the loss and return to the nudge.
export default function Trial() {
  const party            = useGameStore((s) => s.party)
  const activeTeam       = useGameStore((s) => s.activeTeam)
  const trialLossStreaks = useGameStore((s) => s.trialLossStreaks)
  const setActiveTeam    = useGameStore((s) => s.setActiveTeam)
  const recordTrialLoss  = useGameStore((s) => s.recordTrialLoss)
  const selectedZoneId   = useGameStore((s) => s.selectedZoneId)
  const winTrial         = useGameStore((s) => s.winTrial)
  const openExplore      = useGameStore((s) => s.openExplore)
  const setScreen        = useGameStore((s) => s.setScreen)

  const [mode, setMode]           = useState<'nudge' | 'battle'>('nudge')
  const [pickerOpen, setPickerOpen] = useState(false)

  const zone     = selectedZoneId ? ZONE_BY_ID[selectedZoneId] : undefined
  const guardian = zone?.guardianId ? GUARDIAN_BY_ID[zone.guardianId] : undefined
  const oppEl: Element | null =
    zone && zone.element !== 'neutral' ? zone.element : null

  const activeCreatures = useMemo(() => resolveBattleTeam(party, activeTeam), [party, activeTeam])
  const playerPonies     = useMemo(() => buildPlayerTeam(activeCreatures), [activeCreatures])
  const enemyPonies      = useMemo(() => (guardian ? buildGuardianTeam(guardian) : []), [guardian])

  if (!zone || !guardian || !oppEl) {
    return (
      <div className="p-6 text-center text-white space-y-4">
        <p>This Trial isn't available.</p>
        <button onClick={() => setScreen('worldMap')}
          className="bg-purple-700 px-5 py-3 rounded-xl">← Back to Map</button>
      </div>
    )
  }

  // ── Battle ────────────────────────────────────────────────────────────────
  if (mode === 'battle') {
    return (
      <BattleScreen
        playerPonies={playerPonies}
        enemyPonies={enemyPonies}
        enemyLabel={guardian.name}
        victoryTitle="Trial won! 🏅"
        victoryMessage={`You earned a badge and ${zone.signatureSpeciesId ? SPECIES_BY_ID[zone.signatureSpeciesId].name : 'a signature pony'} joins your party! A new region is open.`}
        victoryButtonLabel="Continue to the World Map 🗺️"
        onVictory={() => { winTrial(zone.id); setScreen('worldMap') }}
        onDefeat={() => { recordTrialLoss(guardian.id); setMode('nudge') }}
      />
    )
  }

  // ── Pre-Trial nudge ─────────────────────────────────────────────────────────
  const elementLabel = oppEl.charAt(0).toUpperCase() + oppEl.slice(1)
  const showRecommendation = shouldRecommend(trialLossStreaks, guardian.id)
  const rec = showRecommendation ? recommendTeamVsElement(party, oppEl) : null
  const canPick = shouldShowPicker(party)

  return (
    <div className="h-full w-full overflow-y-auto bg-purple-950 text-white p-5 space-y-4">
      <div className="text-center space-y-1">
        <p className="text-purple-300 text-sm">{guardian.title}</p>
        <h2 className="text-2xl font-bold text-yellow-300">{guardian.name}</h2>
        <p className="text-purple-200">
          This Trial is a <span className="font-bold text-white">{elementLabel}</span> battle.
        </p>
      </div>

      {/* Your team preview with matchup badges */}
      <div className="bg-purple-900/50 rounded-2xl p-3">
        <p className="text-sm font-semibold text-purple-200 mb-2">Your team</p>
        <div className="space-y-1.5">
          {activeCreatures.map((c) => {
            const sp = SPECIES_BY_ID[c.speciesId]
            if (!sp) return null
            const matchup = matchupVsElement(sp.element, oppEl)
            return (
              <div key={c.speciesId} className="flex items-center gap-2">
                <CreatureSprite element={sp.element} color={c.accentColor ?? sp.spritePlaceholderColor} size={32} />
                <span className="font-semibold text-white flex-1 truncate">{c.nickname || sp.name}</span>
                <span className="text-purple-300 text-xs">Lv.{c.level}</span>
                {matchup === 'strong' && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-500 text-green-950">Strong</span>
                )}
                {matchup === 'weak' && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-red-950">Weak</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 3-loss recommendation (Trials only) */}
      {rec && rec.kind === 'recommend' && (
        <div className="bg-green-950/50 border border-green-600/40 rounded-2xl p-3 space-y-2">
          <p className="text-green-300 font-bold">💡 Try this team — {rec.reason}</p>
          <div className="flex flex-wrap gap-1.5">
            {rec.team.map((id) => (
              <span key={id} className="text-xs bg-green-900/60 text-green-100 px-2 py-0.5 rounded-full">
                {SPECIES_BY_ID[id]?.name ?? id}
              </span>
            ))}
          </div>
          {canPick && (
            <button
              onClick={() => setActiveTeam(rec.team)}
              className="w-full bg-green-500 hover:bg-green-400 text-green-950 font-bold py-2.5 rounded-xl transition-colors"
            >
              Use this team
            </button>
          )}
        </div>
      )}

      {rec && rec.kind === 'hunt' && (
        <div className="bg-amber-950/50 border border-amber-600/40 rounded-2xl p-3 space-y-2">
          <p className="text-amber-200 text-sm">{rec.message}</p>
          <button
            onClick={() => openExplore(zone.id)}
            className="w-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold py-2.5 rounded-xl transition-colors"
          >
            Go hunting 🦄
          </button>
        </div>
      )}

      {/* Keep or swap */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => setMode('battle')}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold py-3.5 rounded-2xl text-lg transition-colors"
        >
          Start the Trial ⚔️
        </button>
        {canPick && (
          <button
            onClick={() => setPickerOpen(true)}
            className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 rounded-2xl transition-colors"
          >
            Swap team
          </button>
        )}
        <button
          onClick={() => setScreen('zone')}
          className="w-full text-purple-400 hover:text-purple-300 text-sm py-2 transition-colors"
        >
          ← Back
        </button>
      </div>

      {pickerOpen && (
        <TeamPicker
          party={party}
          initialSelection={activeCreatures.map((c) => c.speciesId)}
          opponentElement={oppEl}
          onConfirm={(ids) => { setActiveTeam(ids); setPickerOpen(false) }}
          onCancel={() => setPickerOpen(false)}
        />
      )}
    </div>
  )
}
