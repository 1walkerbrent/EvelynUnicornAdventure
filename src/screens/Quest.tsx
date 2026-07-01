import { useState } from 'react'
import { useGameStore } from '../state/store'
import { SPECIES_BY_ID } from '../content/creatures'
import { ZONE_BY_ID } from '../content/zones'
import { generateMathProblem } from '../engine/mathGenerator'
import { generateLogicProblem } from '../engine/logicGenerator'
import { effectiveDifficulty } from '../engine/difficulty'
import { zoneNumber } from '../engine/progression'
import { XP_PER_CORRECT_ANSWER } from '../engine/leveling'
import { getStats } from '../engine/stats'
import { rollIvs } from '../engine/ivs'
import type { Problem } from '../engine/problems'
import ProblemCard from '../components/ProblemCard'
import CreatureSprite from '../components/CreatureSprite'

// One reusable quest screen for every zone (replaces the old Brindlewood/Sunflower
// screens). Area 1 = generated MATH, Area 2 = generated STORY/LOGIC (§9), with the
// existing retry/3rd-attempt-hint rules from <ProblemCard>.
export default function Quest() {
  const party          = useGameStore((s) => s.party)
  const areasDone      = useGameStore((s) => s.areasDone)
  const levelCap       = useGameStore((s) => s.levelCap)
  const addToParty     = useGameStore((s) => s.addToParty)
  const awardXpToParty = useGameStore((s) => s.awardXpToParty)
  const completeArea   = useGameStore((s) => s.completeArea)
  const openZone       = useGameStore((s) => s.openZone)
  const selectedZoneId = useGameStore((s) => s.selectedZoneId)
  const selectedAreaId = useGameStore((s) => s.selectedAreaId)

  const zone = selectedZoneId ? ZONE_BY_ID[selectedZoneId] : undefined
  const area = zone?.areas.find((a) => a.id === selectedAreaId)

  // Area 1 of the zone is Math; Area 2 is Story/Logic.
  const questAreas = zone?.areas.filter((a) => a.kind === 'quest') ?? []
  const isMath = area ? questAreas.findIndex((a) => a.id === area.id) === 0 : true

  const partyLevel = party.reduce((m, c) => Math.max(m, c.level), 1)
  const rewardLevel = Math.min(Math.max(partyLevel, 1), levelCap)

  const [problem] = useState<Problem>(() =>
    isMath
      ? generateMathProblem(effectiveDifficulty(zone ? zoneNumber(zone.id) : 1, partyLevel))
      : generateLogicProblem(effectiveDifficulty(zone ? zoneNumber(zone.id) : 1, partyLevel)),
  )

  const alreadyDone = area ? areasDone.includes(area.id) : false
  const [solved, setSolved] = useState(false)
  // Roll the reward pony's permanent IVs once (§5), used for its stats + storage.
  const [rewardIvs] = useState(() => rollIvs())

  if (!zone || !area || !area.rewardSpeciesId) {
    return (
      <div className="p-4 space-y-4">
        <p className="text-purple-300">This area isn't ready yet.</p>
        <button onClick={() => useGameStore.getState().setScreen('worldMap')}
          className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-xl">
          ← Back to Map
        </button>
      </div>
    )
  }

  const reward  = SPECIES_BY_ID[area.rewardSpeciesId]
  const rStats  = getStats(reward.tier, rewardLevel, rewardIvs)

  function handleSolve() {
    if (!alreadyDone) {
      addToParty({
        speciesId: reward.id,
        nickname:  reward.name,
        level:     rewardLevel,
        currentHp: rStats.heart,
        xp:        0,
        ivs:       rewardIvs,
      })
      awardXpToParty(XP_PER_CORRECT_ANSWER)
      completeArea(area!.id)
    }
    setSolved(true)
  }

  // ── Already completed (revisit) ──────────────────────────────────────────
  if (alreadyDone && !solved) {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold text-yellow-300">{area.name}</h2>
        <div className="bg-green-900/40 border border-green-600/40 rounded-2xl p-4 text-center space-y-3">
          <div className="text-4xl">✅</div>
          <p className="text-white font-semibold">Quest complete!</p>
          <p className="text-purple-300 text-sm">{reward.name} is already in your party.</p>
        </div>
        <button onClick={() => openZone(zone.id)}
          className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-xl font-medium transition-colors">
          ← Back to {zone.name.split('—').pop()?.trim()}
        </button>
      </div>
    )
  }

  // ── Reward screen ────────────────────────────────────────────────────────
  if (solved) {
    return (
      <div className="p-4 space-y-5 text-center">
        <div className="text-5xl pt-4">🎉</div>
        <h2 className="text-2xl font-bold text-yellow-300">You tamed {reward.name}!</h2>
        <p className="text-purple-300">A new friend joins your party!</p>

        <div className="flex justify-center">
          <CreatureSprite element={reward.element} color={reward.spritePlaceholderColor} size={96} />
        </div>

        <div className="bg-purple-900/60 rounded-2xl p-4 inline-block text-left mx-auto">
          <div className="text-white font-bold">{reward.name}</div>
          <div className="text-purple-300 text-sm capitalize">{reward.element} · Lv.{rewardLevel}</div>
          <div className="text-purple-400 text-xs mt-1">
            Heart {rStats.heart} · Power {rStats.power} · Speed {rStats.speed}
          </div>
        </div>

        <button onClick={() => openZone(zone.id)}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold py-4 rounded-2xl text-lg transition-colors">
          Continue →
        </button>
      </div>
    )
  }

  // ── Problem screen ───────────────────────────────────────────────────────
  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-yellow-300">{area.name}</h2>
        <p className="text-purple-400 text-sm mt-1">
          {isMath ? 'Solve the problem to befriend the pony hiding here…'
                  : 'Read the clues to find the pony hiding here…'}
        </p>
      </div>

      <div className="flex justify-center">
        <div style={{ width: 72, height: 72, backgroundColor: '#6b7280' }}
          className="rounded-full flex items-center justify-center text-3xl shadow-lg">
          ❓
        </div>
      </div>

      <ProblemCard problem={problem} onSolve={handleSolve} />

      <button onClick={() => openZone(zone.id)}
        className="w-full text-purple-400 hover:text-purple-300 text-sm py-2">
        ← Back to area map
      </button>
    </div>
  )
}
