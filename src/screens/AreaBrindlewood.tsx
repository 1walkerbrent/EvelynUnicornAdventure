import { useState } from 'react'
import { useGameStore } from '../state/store'
import { SPECIES_BY_ID } from '../content/creatures'
import { BRINDLEWOOD_PROBLEM } from '../engine/problems'
import { getStats } from '../engine/stats'
import ProblemCard from '../components/ProblemCard'
import CreatureSprite from '../components/CreatureSprite'

const REWARD_ID = 'clover-dewdrop'

export default function AreaBrindlewood() {
  const brindlewoodDone  = useGameStore((s) => s.brindlewoodDone)
  const addToParty       = useGameStore((s) => s.addToParty)
  const setBrindlewoodDone = useGameStore((s) => s.setBrindlewoodDone)
  const setScreen        = useGameStore((s) => s.setScreen)

  const [solved, setSolved] = useState(false)

  const reward  = SPECIES_BY_ID[REWARD_ID]
  const rStats  = getStats(reward.tier, 3)

  function handleSolve() {
    if (!brindlewoodDone) {
      addToParty({
        speciesId: REWARD_ID,
        nickname:  reward.name,
        level:     3,
        currentHp: rStats.heart,
      })
      setBrindlewoodDone()       // also saves
    }
    setSolved(true)
  }

  // ── Already completed (revisit) ──────────────────────────────────────────
  if (brindlewoodDone && !solved) {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold text-yellow-300">Brindlewood Home</h2>
        <div className="bg-green-900/40 border border-green-600/40 rounded-2xl p-4 text-center space-y-3">
          <div className="text-4xl">✅</div>
          <p className="text-white font-semibold">Quest complete!</p>
          <p className="text-purple-300 text-sm">Clover Dewdrop is already in your party.</p>
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
        <h2 className="text-2xl font-bold text-yellow-300">You tamed Clover Dewdrop!</h2>
        <p className="text-purple-300">She trusts you! She's joining your party.</p>

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
        <h2 className="text-2xl font-bold text-yellow-300">Brindlewood Home</h2>
        <p className="text-purple-400 text-sm mt-1">
          A mystery pony is watching from the clover field…
        </p>
      </div>

      <div className="flex justify-center">
        <div
          style={{ width: 72, height: 72, backgroundColor: '#6b7280' }}
          className="rounded-full flex items-center justify-center text-3xl shadow-lg"
        >
          ❓
        </div>
      </div>

      <ProblemCard problem={BRINDLEWOOD_PROBLEM} onSolve={handleSolve} />
    </div>
  )
}
