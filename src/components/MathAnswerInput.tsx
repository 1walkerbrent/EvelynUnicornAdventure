import { useState } from 'react'
import type { MathAnswer } from '../engine/problems'
import type { AnswerEntry } from '../engine/mathKit'

// How she answers a math problem (§23). Anything she works out is typed: a
// whole number, a decimal, a quotient and remainder, or a fraction (with an
// optional whole-number box for mixed numbers). Only pick-one questions —
// compare, "which is a factor", "which fraction is equal" — are buttons.
// `onSubmit` returns the verdict; a wrong typed answer clears the boxes.

const box = 'bg-purple-800 text-white placeholder-purple-400 placeholder:text-base placeholder:font-semibold rounded-xl px-3 py-3 text-2xl font-bold text-center ' +
            'focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-14'
const checkBtn = 'bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold text-lg px-6 min-h-14 rounded-xl transition-colors'

export default function MathAnswerInput({ answer, onSubmit }: {
  answer: MathAnswer
  onSubmit: (entry: AnswerEntry) => boolean
}) {
  const [text, setText] = useState('')
  const [quotient, setQuotient] = useState('')
  const [rem, setRem] = useState('')
  const [whole, setWhole] = useState('')
  const [num, setNum] = useState('')
  const [den, setDen] = useState('')

  function submit(entry: AnswerEntry) {
    if (onSubmit(entry)) return
    setText(''); setQuotient(''); setRem(''); setWhole(''); setNum(''); setDen('')
  }
  const onEnter = (entry: () => AnswerEntry) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit(entry())
  }

  switch (answer.kind) {
    case 'number':
    case 'decimal': {
      const entry = (): AnswerEntry => ({ kind: 'text', text })
      return (
        <div className="flex gap-2">
          <input
            type="text"
            inputMode={answer.kind === 'decimal' ? 'decimal' : 'numeric'}
            aria-label="Your answer"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onEnter(entry)}
            placeholder="Your answer…"
            className={`${box} flex-1 min-w-0`}
          />
          <button onClick={() => submit(entry())} className={checkBtn}>Check!</button>
        </div>
      )
    }

    case 'remainder': {
      const entry = (): AnswerEntry => ({ kind: 'remainder', quotient, remainder: rem })
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="text" inputMode="numeric" aria-label="Answer" value={quotient}
              onChange={(e) => setQuotient(e.target.value)} onKeyDown={onEnter(entry)}
              placeholder="Answer" className={`${box} flex-1 min-w-0`} />
            <span className="text-yellow-300 text-2xl font-black">R</span>
            <input type="text" inputMode="numeric" aria-label="Remainder" value={rem}
              onChange={(e) => setRem(e.target.value)} onKeyDown={onEnter(entry)}
              placeholder="Left" className={`${box} w-24`} />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-purple-300 text-sm">R is what's left over. Nothing left? Leave it empty.</p>
            <button onClick={() => submit(entry())} className={checkBtn}>Check!</button>
          </div>
        </div>
      )
    }

    case 'fraction': {
      const entry = (): AnswerEntry => ({ kind: 'fraction', whole, num, den })
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3">
            <input type="text" inputMode="numeric" aria-label="Whole number (optional)" value={whole}
              onChange={(e) => setWhole(e.target.value)} onKeyDown={onEnter(entry)}
              placeholder="whole" className={`${box} w-20`} />
            <div className="flex flex-col items-center gap-1">
              <input type="text" inputMode="numeric" aria-label="Top number" value={num}
                onChange={(e) => setNum(e.target.value)} onKeyDown={onEnter(entry)}
                placeholder="top" className={`${box} w-24`} />
              <div className="w-24 h-1 rounded-full bg-white" aria-hidden="true" />
              <input type="text" inputMode="numeric" aria-label="Bottom number" value={den}
                onChange={(e) => setDen(e.target.value)} onKeyDown={onEnter(entry)}
                placeholder="bottom" className={`${box} w-24`} />
            </div>
            <button onClick={() => submit(entry())} className={checkBtn}>Check!</button>
          </div>
          <p className="text-purple-300 text-sm text-center">
            The first box is for a whole number, like the 2 in 2 1/4. Leave it empty if there isn't one.
          </p>
        </div>
      )
    }

    case 'choice': {
      const symbols = answer.choices.every((c) => ['<', '=', '>'].includes(c))
      return (
        <div className={symbols ? 'flex gap-3' : 'space-y-2'}>
          {answer.choices.map((c, i) => (
            <button
              key={c}
              onClick={() => submit({ kind: 'choice', index: i })}
              aria-label={symbols ? { '<': 'is less than', '=': 'is equal to', '>': 'is greater than' }[c] : undefined}
              className={symbols
                ? 'flex-1 min-h-16 bg-purple-800 hover:bg-purple-700 active:bg-purple-600 text-white text-4xl font-black rounded-2xl transition-colors'
                : 'w-full min-h-12 bg-purple-800 hover:bg-purple-700 active:bg-purple-600 text-white text-xl font-bold px-4 py-3 rounded-xl transition-colors'}
            >
              {c}
            </button>
          ))}
        </div>
      )
    }
  }
}
