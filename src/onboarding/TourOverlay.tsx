import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGameStore } from '../state/store'
import { TOURS } from './tours'

interface Box { top: number; left: number; width: number; height: number }

// Room around the lit element, so its edges aren't flush with the dim.
const PAD = 8
const CARD_GAP = 14
const EDGE = 12
// Narrowest the caption card may get when it sits beside the lit element.
const MIN_SIDE_WIDTH = 260

// The smallest box around every element marked data-tour="<target>". Battle
// steps mark each pony on a side, so the whole team lights up together.
function measure(target: string | undefined): Box | null {
  if (!target) return null
  const els = [...document.querySelectorAll<HTMLElement>(`[data-tour="${target}"]`)]
  const rects = els.map((el) => el.getBoundingClientRect()).filter((r) => r.width > 0 && r.height > 0)
  if (rects.length === 0) return null
  const top    = Math.min(...rects.map((r) => r.top))
  const left   = Math.min(...rects.map((r) => r.left))
  const bottom = Math.max(...rects.map((r) => r.bottom))
  const right  = Math.max(...rects.map((r) => r.right))
  return { top: top - PAD, left: left - PAD, width: right - left + PAD * 2, height: bottom - top + PAD * 2 }
}

function sameBox(a: Box | null, b: Box | null) {
  if (a === null || b === null) return a === b
  return Math.abs(a.top - b.top) < 1 && Math.abs(a.left - b.left) < 1 &&
         Math.abs(a.width - b.width) < 1 && Math.abs(a.height - b.height) < 1
}

// The guided tour (§22): dims the screen, lights up one element, and shows a
// one-sentence caption with big Next and Skip buttons. It covers the whole
// screen, so nothing underneath can be tapped while it shows.
export default function TourOverlay() {
  const activeTour = useGameStore((s) => s.activeTour)
  const finishTour = useGameStore((s) => s.finishTour)
  const [index, setIndex] = useState(0)
  const [box, setBox] = useState<Box | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardH, setCardH] = useState(180)

  const steps = activeTour ? TOURS[activeTour] : []
  const step = steps[index]

  // A new tour always starts at its first step.
  const [shownTour, setShownTour] = useState(activeTour)
  if (shownTour !== activeTour) {
    setShownTour(activeTour)
    setIndex(0)
  }

  // Bring the step's element on screen, then keep the light on it as layout
  // settles (the map scrolls, ponies bob, the window turns).
  useLayoutEffect(() => {
    if (!step?.target) return
    document.querySelector(`[data-tour="${step.target}"]`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [step])

  useEffect(() => {
    if (!step) return
    let frame = 0
    let last: Box | null = null
    const tick = () => {
      const next = measure(step.target)
      if (!sameBox(next, last)) {
        last = next
        setBox(next)
      }
      const h = cardRef.current?.offsetHeight
      if (h) setCardH(h)
      frame = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(frame)
  }, [step])

  if (!activeTour || !step) return null

  const isLast = index === steps.length - 1
  const next = () => (isLast ? finishTour() : setIndex(index + 1))

  // The caption sits below the lit element when there's room, then above it,
  // then beside it (a tall battle column); with nothing lit it sits in the
  // middle of the screen.
  const viewW = window.innerWidth
  const viewH = window.innerHeight
  const middle = { top: Math.max(EDGE, (viewH - cardH) / 2), left: EDGE + 4, right: EDGE + 4 }
  let cardStyle: React.CSSProperties = middle
  if (box) {
    const below = box.top + box.height + CARD_GAP
    const roomLeft  = box.left - CARD_GAP - EDGE
    const roomRight = viewW - (box.left + box.width) - CARD_GAP - EDGE
    if (below + cardH <= viewH - EDGE) cardStyle = { top: below, left: EDGE + 4, right: EDGE + 4 }
    else if (box.top - CARD_GAP - cardH >= EDGE) cardStyle = { top: box.top - CARD_GAP - cardH, left: EDGE + 4, right: EDGE + 4 }
    else if (Math.max(roomLeft, roomRight) >= MIN_SIDE_WIDTH) {
      cardStyle = roomLeft >= roomRight
        ? { ...middle, left: EDGE, right: viewW - box.left + CARD_GAP }
        : { ...middle, left: box.left + box.width + CARD_GAP, right: EDGE }
    }
  }

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Tour">
      {box ? (
        // The lit window: a clear box whose huge shadow is the dim.
        <div
          className="absolute rounded-2xl ring-4 ring-yellow-300 pointer-events-none transition-all duration-300"
          style={{ ...box, boxShadow: '0 0 0 9999px rgba(10, 0, 25, 0.72)' }}
        />
      ) : (
        <div className="absolute inset-0 bg-[rgba(10,0,25,0.72)]" />
      )}

      <div className="absolute flex justify-center" style={cardStyle}>
        <div ref={cardRef} className="w-full max-w-md bg-purple-900 border-2 border-yellow-300/70 rounded-3xl p-5 shadow-2xl space-y-4">
          <p className="text-white text-xl font-bold leading-snug">{step.caption}</p>
          <div className="flex items-center gap-3">
            <span className="text-purple-300 text-sm flex-1">{index + 1} of {steps.length}</span>
            {!isLast && (
              <button
                onClick={finishTour}
                className="min-h-12 min-w-24 px-5 rounded-2xl bg-purple-700 hover:bg-purple-600 text-white text-lg font-semibold"
              >
                Skip
              </button>
            )}
            <button
              onClick={next}
              autoFocus
              className="min-h-12 min-w-24 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-purple-950 text-lg font-bold"
            >
              {isLast ? 'Done' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
