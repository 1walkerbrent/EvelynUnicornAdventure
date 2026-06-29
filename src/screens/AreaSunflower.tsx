import { useState } from 'react'
import { useGameStore } from '../state/store'
import { SPECIES_BY_ID } from '../content/creatures'
import { generateLogicProblem } from '../engine/logicGenerator'
import { effectiveDifficulty } from '../engine/difficulty'
import { XP_PER_CORRECT_ANSWER } from '../engine/leveling'
import type { LogicProblem } from '../engine/problems'
import { getStats } from '../engine/stats'
import ProblemCard from '../components/ProblemCard'
import CreatureSprite from '../components/CreatureSprite'

const REWARD_ID = 'tangerine-twirl'

export default function AreaSunflower() {
  const sunflowerDone    = useGameStore((s) => s.sunflowerDone)
  const addToParty       = useGameStore((s) => s.addToParty)
  const setSunflowerDone = useGameStore((s) => s.setSunflowerDone)
  const setScreen        = useGameStore((s) => s.setScreen)
  const party            = useGameStore((s) => s.party)
  const awardXpToParty   = useGameStore((s) => s.awardXpToParty)

  const playerLevel = party.reduce((max, c) => Math.max(max, c.level), 1)
  const [problem]   = useState<LogicProblem>(() =>
    generateLogicProblem(effectiveDifficulty(1, playerLevel))
  )
  const [solved, setSolved] = useState(false)

  const reward = SPECIES_BY_ID[REWARD_ID]
  const rStats = getStats(reward.tier, 3)

  function handleSolve() {
    if (!sunflowerDone) {
      awardXpToParty(XP_PER_CORRECT_ANSWER)   // reward the party for solving (§5)
      addToParty({
        speciesId: REWARD_ID,
        nickname:  reward.name,
        level:     3,
        currentHp: rStats.heart,
        xp:        0,
      })
      setSunflowerDone()       // also saves
    }
    setSolved(true)
  }

  // ── Already completed (revisit) ──────────────────────────────────────────
  if (sunflowerDone && !solved) {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold text-yellow-300">Sunflower Hollow</h2>
        <div className="bg-green-900/40 border border-green-600/40 rounded-2xl p-4 text-center space-y-3">
          <div className="text-4xl">✅</div>
          <p className="text-white font-semibold">Quest complete!</p>
          <p className="text-purple-300 text-sm">Tangerine Twirl is already in your party.</p>
        </div>
        <button
          onClick={() => setScreen('worldMap')}
          className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-xl font-medium transition-colors"
        >
          ← Back to Zone Map
        </button>
      </div>
    )
  }

  // ── Reward screen ────────────────────────────────────────────────────────
  if (solved) {
    return (
      <div className="p-4 space-y-5 text-center">
        <div className="text-5xl pt-4">🎉</div>
        <h2 className="text-2xl font-bold text-yellow-300">You found Tangerine Twirl!</h2>
        <p className="text-purple-300">She dashes out from behind the sunflower, delighted!</p>

        <div className="flex justify-center">
          <CreatureSprite element={reward.element} color={reward.spritePlaceholderColor} size={96} />
        </div>

        <div className="bg-purple-900/60 rounded-2xl p-4 inline-block text-left mx-auto">
          <div className="text-white font-bold">{reward.name}</div>
          <div className="text-purple-300 text-sm capitalize">{reward.element} · Lv.3</div>
          <div className="text-purple-400 text-xs mt-1">
            Heart {rStats.heart} · Power {rStats.power} · Speed {rStats.speed}
          </div>
        </div>

        <button
          onClick={() => setScreen('worldMap')}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold py-4 rounded-2xl text-lg transition-colors"
        >
          Continue →
        </button>
      </div>
    )
  }

  // ── Problem screen ───────────────────────────────────────────────────────
  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-yellow-300">Sunflower Hollow</h2>
        <p className="text-purple-400 text-sm mt-1">
          Hoofprints lead to the sunflower patch…
        </p>
      </div>

      <div className="flex justify-center gap-3 text-5xl">
        🌻🌻🌻
      </div>

      <ProblemCard problem={problem} onSolve={handleSolve} />
    </div>
  )
}
