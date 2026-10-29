import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ScratchCanvas from './ScratchCanvas'
import { PEN_COLORS, addOp, undo, canUndo, isBlank } from './scratchModel'
import type { Page } from './scratchModel'
import { useScratchLayout, useScratchTools, layoutFor, SCRATCH_SIDE_WIDTH, SCRATCH_BOTTOM_SHARE } from './scratchLayout'

// The scratch paper panel (§24). It covers most of the screen but leaves the
// problem's answer box showing: a side panel in landscape, a sheet that
// slides up in portrait. The problem is repeated at the top so she can see
// it while she works. Done closes it; the page stays until the next problem.

const toolBtn = 'w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl transition-colors disabled:opacity-40'

interface Props {
  prompt: string
  page: Page
  onChange: (page: Page) => void
  onDone: () => void
}

export default function ScratchPaper({ prompt, page, onChange, onDone }: Props) {
  const [layout, setLayout] = useState(() => layoutFor(window.innerWidth, window.innerHeight))
  const { tool, color, grid } = useScratchTools()
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    const onResize = () => setLayout(layoutFor(window.innerWidth, window.innerHeight))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Tell App to make room while the panel is open.
  useEffect(() => {
    useScratchLayout.setState({ layout })
  }, [layout])
  useEffect(() => () => useScratchLayout.setState({ layout: null }), [])

  const side = layout === 'side'
  const frame: React.CSSProperties = side
    ? { top: 0, right: 0, bottom: 0, width: SCRATCH_SIDE_WIDTH,
        paddingTop: 'calc(env(safe-area-inset-top) + 8px)',
        paddingRight: 'calc(env(safe-area-inset-right) + 8px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }
    : { left: 0, right: 0, bottom: 0, height: `${SCRATCH_BOTTOM_SHARE * 100}%`,
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }

  const setTools = useScratchTools.setState

  return createPortal(
    <div
      role="dialog"
      aria-label="Scratch paper"
      style={{ position: 'fixed', zIndex: 35, ...frame }}
      className={`flex flex-col gap-2 pl-2 pr-2 pt-2 bg-purple-950 text-white shadow-2xl
        ${side ? 'border-l-2 border-purple-700 scratch-in-side' : 'border-t-2 border-purple-700 rounded-t-3xl scratch-in-bottom'}`}
    >
      {/* The problem again, and the way out. */}
      <div className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden>✏️</span>
        <p className="flex-1 min-w-0 text-white text-xl sm:text-2xl font-bold tracking-wide leading-tight break-words line-clamp-2" aria-label={`Problem: ${prompt}`}>{prompt}</p>
        <button
          onClick={onDone}
          className="flex-shrink-0 min-h-12 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-purple-950 text-lg font-bold transition-colors"
        >
          Done
        </button>
      </div>

      {/* Tools */}
      {confirming ? (
        <div className="flex items-center gap-2 flex-wrap bg-red-900/50 rounded-xl p-1 pl-3">
          <p className="flex-1 font-semibold">Clear everything?</p>
          <button
            onClick={() => { onChange(addOp(page, { kind: 'clear' })); setConfirming(false) }}
            className="min-h-12 px-4 rounded-xl bg-red-500 hover:bg-red-400 font-bold"
          >
            Yes, clear
          </button>
          <button onClick={() => setConfirming(false)} className="min-h-12 px-4 rounded-xl bg-purple-800 hover:bg-purple-700 font-bold">
            No
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-[3px] sm:gap-1.5 flex-wrap" role="toolbar" aria-label="Scratch paper tools">
          {PEN_COLORS.map((c) => {
            const on = tool === 'pen' && color === c.id
            return (
              <button
                key={c.id}
                aria-label={c.label}
                aria-pressed={on}
                onClick={() => setTools({ tool: 'pen', color: c.id })}
                className={`${toolBtn} ${on ? 'bg-purple-600 ring-2 ring-yellow-300' : 'bg-purple-800 hover:bg-purple-700'}`}
              >
                <span className="block w-6 h-6 rounded-full border-2 border-white/70" style={{ backgroundColor: c.css }} />
              </button>
            )
          })}
          <button
            aria-label="Eraser"
            aria-pressed={tool === 'eraser'}
            onClick={() => setTools({ tool: 'eraser' })}
            className={`${toolBtn} ${tool === 'eraser' ? 'bg-purple-600 ring-2 ring-yellow-300' : 'bg-purple-800 hover:bg-purple-700'}`}
          >
            🧽
          </button>
          <span className="hidden sm:block w-1" aria-hidden />
          <button aria-label="Undo" disabled={!canUndo(page)} onClick={() => onChange(undo(page))}
            className={`${toolBtn} bg-purple-800 hover:bg-purple-700`}>
            ↩️
          </button>
          <button
            aria-label="Grid lines"
            aria-pressed={grid}
            onClick={() => setTools({ grid: !grid })}
            className={`${toolBtn} ${grid ? 'bg-purple-600 ring-2 ring-yellow-300' : 'bg-purple-800 hover:bg-purple-700'}`}
          >
            <span className="text-xl font-bold">#</span>
          </button>
          <button aria-label="Clear all" disabled={isBlank(page)} onClick={() => setConfirming(true)}
            className={`${toolBtn} bg-purple-800 hover:bg-purple-700`}>
            🗑️
          </button>
        </div>
      )}

      <ScratchCanvas page={page} onChange={onChange} tool={tool} color={color} grid={grid} />
    </div>,
    document.body,
  )
}
