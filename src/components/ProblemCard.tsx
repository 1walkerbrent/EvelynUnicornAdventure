import { useEffect, useRef, useState } from 'react'
import type { Problem } from '../engine/problems'
import { checkAnswer } from '../engine/mathKit'
import type { AnswerEntry } from '../engine/mathKit'
import SpellingPuzzle from './SpellingPuzzle'
import MathAnswerInput from './MathAnswerInput'
import ScratchPaper from '../scratch/ScratchPaper'
import { EMPTY_PAGE } from '../scratch/scratchModel'
import type { Page } from '../scratch/scratchModel'
import { useScratchLayout, SCRATCH_BOTTOM_SHARE } from '../scratch/scratchLayout'
import { useGameStore } from '../state/store'

const ENCOURAGEMENT = [
  "Not quite — but you've totally got this! Try again! 🌟",
  "Hmm, give it another go — you're so close! 💫",
  "Almost! You're a brilliant problem-solver — one more try! 🌈",
]

interface Props {
  problem: Problem
  /** `misses` = wrong tries before the right answer (0 = first try). */
  onSolve: (misses: number) => void
  /** Called after every attempt (right or wrong) so the parent can record it. */
  onAttempt?: (correct: boolean) => void
}

export default function ProblemCard({ problem, onSolve, onAttempt }: Props) {
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

  const showHint = attempts >= 3

  // Scratch paper (§24), math only. The page belongs to this problem: closing
  // keeps it, and a new problem starts a blank one. Never saved.
  const [scratch, setScratch] = useState<{ problem: Problem; page: Page; open: boolean }>({ problem, page: EMPTY_PAGE, open: false })
  if (scratch.problem !== problem) setScratch({ problem, page: EMPTY_PAGE, open: false })
  const scratchOpen = scratch.open && scratch.problem === problem
  const answerZone = useRef<HTMLDivElement>(null)
  const scratchLayout = useScratchLayout((s) => s.layout)
  const startTour = useGameStore((s) => s.startTour)

  // The first math problem she ever sees points out the pencil.
  const isMath = problem.type === 'math'
  useEffect(() => {
    if (isMath) startTour('scratch')
  }, [isMath, startTour])

  // In portrait the panel covers the bottom of the screen, so scroll the
  // answer box up to sit just above it.
  useEffect(() => {
    if (!scratchOpen || scratchLayout !== 'bottom') return
    const frame = requestAnimationFrame(() => {
      const zone = answerZone.current
      if (!zone) return
      const delta = zone.getBoundingClientRect().bottom - (window.innerHeight * (1 - SCRATCH_BOTTOM_SHARE) - 12)
      scrollParent(zone)?.scrollBy({ top: delta, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [scratchOpen, scratchLayout])

  function recordWrong() {
    const next = attempts + 1
    setAttempts(next)
    setFeedback(ENCOURAGEMENT[(next - 1) % ENCOURAGEMENT.length])
    onAttempt?.(false)
  }

  function handleCorrect() {
    onAttempt?.(true)
    onSolve(attempts)
  }

  // Returns the verdict so <MathAnswerInput> knows whether to clear its boxes.
  function handleMathSubmit(entry: AnswerEntry): boolean {
    if (problem.type !== 'math') return false
    if (checkAnswer(problem.answer, entry)) {
      handleCorrect()
      return true
    }
    recordWrong()
    return false
  }

  // Spelling returns the verdict so <SpellingPuzzle> can shake its tiles on a miss.
  function handleSpellingSubmit(guess: string): boolean {
    if (problem.type !== 'spelling') return false
    if (guess === problem.word) {
      handleCorrect()
      return true
    }
    recordWrong()
    return false
  }

  // Unified handler for logic + comprehension (both use choices[] + correctIndex)
  function handleChoice(idx: number) {
    if (problem.type !== 'logic' && problem.type !== 'comprehension') return
    if (idx === problem.correctIndex) {
      handleCorrect()
    } else {
      recordWrong()
    }
  }

  return (
    <div className="space-y-4">
      {/* Prompt block — math and logic only. A math prompt is one bare equation, so it's big. */}
      {problem.type === 'math' && (
        <div className="bg-purple-900/60 rounded-2xl p-5 text-center">
          <p className="text-white text-3xl font-bold tracking-wide leading-snug break-words">{problem.prompt}</p>
        </div>
      )}
      {problem.type === 'logic' && (
        <div className="bg-purple-900/60 rounded-2xl p-4 space-y-1">
          {problem.prompt.split('\n').map((line, i) => (
            <p key={i} className={`${line === '' ? 'h-2' : 'text-white leading-relaxed'}`}>
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Comprehension: passage then question */}
      {problem.type === 'comprehension' && (
        <div className="space-y-3">
          <div className="bg-purple-900/60 rounded-2xl p-4 text-white leading-relaxed text-sm">
            {problem.passage}
          </div>
          <p className="text-yellow-200 font-semibold leading-snug">{problem.question}</p>
        </div>
      )}

      {/* Spelling: audio replay + drag-and-drop letter tiles.
          The key means a new word gets a fresh, empty board without an effect. */}
      {problem.type === 'spelling' && (
        <SpellingPuzzle key={problem.word} problem={problem} onSubmit={handleSpellingSubmit} />
      )}

      {/* Scratch paper, then the math input: typed for anything computed,
          buttons for pick-one questions (§23). */}
      {problem.type === 'math' && (
        <div ref={answerZone} className="space-y-4">
          <button
            data-tour="scratch-button"
            onClick={() => setScratch((s) => ({ ...s, open: true }))}
            aria-expanded={scratchOpen}
            className="w-full min-h-12 flex items-center justify-center gap-2 rounded-xl bg-purple-800/70 hover:bg-purple-700 border-2 border-dashed border-purple-500 text-white text-lg font-bold transition-colors"
          >
            <span aria-hidden>✏️</span> Scratch Paper
          </button>
          <MathAnswerInput key={problem.prompt} answer={problem.answer} onSubmit={handleMathSubmit} />
        </div>
      )}
      {problem.type === 'math' && scratchOpen && (
        <ScratchPaper
          prompt={problem.prompt}
          page={scratch.page}
          onChange={(page) => setScratch((s) => ({ ...s, page }))}
          onDone={() => setScratch((s) => ({ ...s, open: false }))}
        />
      )}

      {/* Logic / comprehension choices */}
      {(problem.type === 'logic' || problem.type === 'comprehension') && (
        <div className="space-y-2">
          {problem.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleChoice(i)}
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

// The nearest ancestor that scrolls (the screen's main area, or the
// full-screen wrapper on the Hunt).
function scrollParent(el: HTMLElement): HTMLElement | null {
  for (let p = el.parentElement; p; p = p.parentElement) {
    const { overflowY } = getComputedStyle(p)
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'hidden') return p
  }
  return null
}
