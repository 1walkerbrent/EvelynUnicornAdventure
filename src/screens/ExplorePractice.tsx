import { useState } from 'react'
import { useGameStore } from '../state/store'
import { ZONE_BY_ID } from '../content/zones'
import { generateMathProblem } from '../engine/mathGenerator'
import { generateLogicProblem } from '../engine/logicGenerator'
import { generateComprehensionProblem } from '../engine/comprehensionGenerator'
import { selectProblemCategory } from '../engine/puzzleSelector'
import { effectiveDifficulty } from '../engine/difficulty'
import { zoneNumber } from '../engine/progression'
import { XP_PER_CORRECT_ANSWER } from '../engine/leveling'
import type { Problem } from '../engine/problems'
import ProblemCard from '../components/ProblemCard'

// Explore → Practice (§8): pure learning/leveling. Weighted category selection
// (math/logic/comprehension) with reinforcement doubling for weak categories.
export default function ExplorePractice() {
  const party                = useGameStore((s) => s.party)
  const awardXpToParty       = useGameStore((s) => s.awardXpToParty)
  const setScreen            = useGameStore((s) => s.setScreen)
  const selectedZoneId       = useGameStore((s) => s.selectedZoneId)
  const recentPuzzleAttempts = useGameStore((s) => s.recentPuzzleAttempts)
  const recordPuzzleAttempt  = useGameStore((s) => s.recordPuzzleAttempt)

  const zone = selectedZoneId ? ZONE_BY_ID[selectedZoneId] : undefined
  const num  = zone ? zoneNumber(zone.id) : 1
  const partyLevel = party.reduce((m, c) => Math.max(m, c.level), 1)

  function makeProblem(): Problem {
    const diff     = effectiveDifficulty(num, partyLevel)
    const category = selectProblemCategory(recentPuzzleAttempts)
    if (category === 'math')  return generateMathProblem(diff)
    if (category === 'logic') return generateLogicProblem(diff)
    return generateComprehensionProblem(diff)
  }

  const [round, setRound]     = useState(0)
  const [problem, setProblem] = useState<Problem>(() => makeProblem())
  const [solved, setSolved]   = useState(false)

  function handleSolve() {
    awardXpToParty(XP_PER_CORRECT_ANSWER)
    setSolved(true)
  }

  function another() {
    setProblem(makeProblem())
    setSolved(false)
    setRound((r) => r + 1)
  }

  const typeLabel =
    problem.type === 'math'          ? 'A number problem' :
    problem.type === 'logic'         ? 'A story puzzle'   :
                                       'A reading passage'

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-yellow-300">Practice</h2>
        <p className="text-purple-400 text-sm mt-1">
          {typeLabel} · solving earns your team XP
        </p>
      </div>

      {solved ? (
        <div className="space-y-4 text-center">
          <div className="text-5xl pt-2">🌟</div>
          <h3 className="text-xl font-bold text-green-300">Correct!</h3>
          <p className="text-purple-300">Your whole team earned <span className="text-yellow-300 font-bold">+{XP_PER_CORRECT_ANSWER} XP</span>.</p>
          <button
            onClick={another}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold py-4 rounded-2xl text-lg transition-colors"
          >
            Another one! 🔁
          </button>
          <button
            onClick={() => setScreen('exploreHub')}
            className="w-full bg-purple-800 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors"
          >
            ← Done for now
          </button>
        </div>
      ) : (
        <>
          <ProblemCard
            key={round}
            problem={problem}
            onSolve={handleSolve}
            onAttempt={(correct) => recordPuzzleAttempt(problem.type, correct)}
          />
          <button
            onClick={() => setScreen('exploreHub')}
            className="w-full text-purple-400 hover:text-purple-300 text-sm py-2"
          >
            ← Back to Explore
          </button>
        </>
      )}
    </div>
  )
}
