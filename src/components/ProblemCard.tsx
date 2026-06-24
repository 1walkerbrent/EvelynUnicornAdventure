import { useState } from 'react'
import type { Problem } from '../engine/problems'

const ENCOURAGEMENT = [
  "Not quite — but you've totally got this! Try again! 🌟",
  "Hmm, give it another go — you're so close! 💫",
  "Almost! You're a brilliant problem-solver — one more try! 🌈",
]

interface Props {
  problem: Problem
  onSolve: () => void
}

export default function ProblemCard({ problem, onSolve }: Props) {
  const [attempts, setAttempts] = useState(0)
  const [input, setInput]       = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const showHint = attempts >= 3

  function recordWrong() {
    const next = attempts + 1
    setAttempts(next)
    setFeedback(ENCOURAGEMENT[(next - 1) % ENCOURAGEMENT.length])
    setInput('')
  }

  function handleMathSubmit() {
    if (problem.type !== 'math') return
    const answer = parseInt(input.trim(), 10)
    if (!isNaN(answer) && answer === problem.correctAnswer) {
      onSolve()
    } else {
      recordWrong()
    }
  }

  function handleLogicChoice(idx: number) {
    if (problem.type !== 'logic') return
    if (idx === problem.correctIndex) {
      onSolve()
    } else {
      recordWrong()
    }
  }

  const promptLines = problem.prompt.split('\n')

  return (
    <div className="space-y-4">
      {/* Problem prompt */}
      <div className="bg-purple-900/60 rounded-2xl p-4 space-y-1">
        {promptLines.map((line, i) => (
          <p key={i} className={`${line === '' ? 'h-2' : 'text-white leading-relaxed'}`}>
            {line}
          </p>
        ))}
      </div>

      {/* Input */}
      {problem.type === 'math' && (
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleMathSubmit() }}
            placeholder="Your answer…"
            className="flex-1 bg-purple-800 text-white placeholder-purple-400 rounded-xl px-4 py-3 text-lg font-bold text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleMathSubmit}
            className="bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold px-5 py-3 rounded-xl transition-colors"
          >
            Check!
          </button>
        </div>
      )}

      {problem.type === 'logic' && (
        <div className="space-y-2">
          {problem.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleLogicChoice(i)}
              className="w-full bg-purple-800 hover:bg-purple-700 active:bg-purple-600 text-white text-left px-4 py-3 rounded-xl transition-colors"
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {/* Feedback / hint */}
      {feedback && (
        <div className={`rounded-xl p-3 text-sm ${showHint ? 'bg-yellow-400/20 border border-yellow-400/40' : 'bg-purple-800/60'}`}>
          <p className="text-white">{feedback}</p>
          {showHint && (
            <p className="text-yellow-300 mt-2">
              <span className="font-bold">💡 Hint: </span>
              {problem.hint}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
