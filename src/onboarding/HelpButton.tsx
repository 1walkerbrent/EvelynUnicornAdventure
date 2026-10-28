import { useState } from 'react'
import { useGameStore } from '../state/store'
import { HELP_TIPS } from './helpContent'
import type { HelpScreen } from './helpContent'
import { useHelpOverride } from './helpScreen'

// The ? button (§22). It always sits in the top-right corner: inside the header
// on screens that have one, floating on full-screen ones (the caller places it).
export default function HelpButton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false)
  const override      = useHelpOverride((s) => s.screen)
  const activeSlot    = useGameStore((s) => s.activeSlot)
  const creating      = useGameStore((s) => s.playerName === '' || s.awaitingStarter)
  const currentScreen = useGameStore((s) => s.currentScreen)

  const screen: HelpScreen =
    activeSlot === null ? 'slotPicker' :
    creating            ? 'characterCreation' :
    override ?? currentScreen

  return (
    <>
      <button
        data-tour="help-button"
        onClick={() => setOpen(true)}
        aria-label="Help"
        className={`w-12 h-12 flex-shrink-0 rounded-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600
                    text-white text-2xl font-black shadow-lg border-2 border-white/70 ${className}`}
        style={style}
      >
        ?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-black/70"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Help"
            className="w-full max-w-md bg-purple-900 border-2 border-sky-400/70 rounded-3xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-sky-200">💡 Help</h2>
            <ul className="space-y-3">
              {HELP_TIPS[screen].map((tip) => (
                <li key={tip} className="flex gap-3 text-white text-lg leading-snug">
                  <span className="text-yellow-300" aria-hidden="true">★</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setOpen(false)}
              autoFocus
              className="w-full min-h-12 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-purple-950 text-lg font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
