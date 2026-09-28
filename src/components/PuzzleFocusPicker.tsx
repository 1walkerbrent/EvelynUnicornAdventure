import { useGameStore } from '../state/store'
import { focusOptions } from '../engine/puzzleFocus'
import { isSpeechAvailable } from '../engine/speech'

// "What do you want to practice?" (§9). One tap picks one kind of puzzle; the
// choice is saved, so it's still selected next time. Two sizes: big tiles on the
// Explore hub, and a compact scrolling strip at the top of Practice.

interface Props {
  size?: 'tiles' | 'compact'
  /** Called after the focus changes (Practice uses it to swap the current puzzle). */
  onChange?: () => void
}

export default function PuzzleFocusPicker({ size = 'tiles', onChange }: Props) {
  const focus    = useGameStore((s) => s.practiceFocus)
  const setFocus = useGameStore((s) => s.setPracticeFocus)
  const options  = focusOptions(isSpeechAvailable())

  function pick(id: typeof focus) {
    if (id === focus) return
    setFocus(id)
    onChange?.()
  }

  if (size === 'compact') {
    return (
      <div className="-mx-4 px-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="radiogroup" aria-label="Puzzle type">
        {options.map((o) => {
          const on = o.id === focus
          return (
            <button
              key={o.id}
              role="radio"
              aria-checked={on}
              onClick={() => pick(o.id)}
              className={`flex-shrink-0 min-h-[40px] px-3 rounded-full text-sm font-bold flex items-center gap-1.5
                          transition-all ${on
                            ? `bg-gradient-to-br ${o.selected} shadow-lg ring-2 ring-white/70`
                            : 'bg-purple-900/60 text-purple-200 border border-purple-700/60 hover:bg-purple-800/70'}`}
            >
              <span>{o.emoji}</span>
              <span className="whitespace-nowrap">{o.label}</span>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Puzzle type">
      {options.map((o) => {
        const on = o.id === focus
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={on}
            onClick={() => pick(o.id)}
            className={`relative min-h-[76px] rounded-2xl px-3 py-2.5 text-left flex items-center gap-2.5
                        transition-all active:scale-95 ${on
                          ? `bg-gradient-to-br ${o.selected} shadow-lg ring-2 ring-white/70 scale-[1.02]`
                          : 'bg-purple-900/60 border border-purple-700/60 hover:bg-purple-800/70'}`}
          >
            <span className={`text-3xl ${on ? '' : 'opacity-80'}`}>{o.emoji}</span>
            <span className="min-w-0">
              <span className={`block font-bold leading-tight ${on ? '' : 'text-white'}`}>{o.label}</span>
              <span className={`block text-[11px] leading-tight mt-0.5 ${on ? 'opacity-80' : 'text-purple-300'}`}>
                {o.blurb}
              </span>
            </span>
            {on && (
              <span className="absolute top-1.5 right-2 text-xs font-black" aria-hidden="true">✓</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
