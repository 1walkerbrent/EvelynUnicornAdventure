import { useEffect, useRef, useState } from 'react'
import type { SpellingProblem } from '../engine/problems'
import { speak, cancelSpeech, RATE_NORMAL, RATE_SLOW } from '../engine/speech'

interface Props {
  problem: SpellingProblem
  /** Returns true if the guess was right, so the tiles can shake on a miss. */
  onSubmit: (guess: string) => boolean
}

/** Where a drag started: the scrambled pool, or a specific answer slot. */
type DragSource = { kind: 'pool' } | { kind: 'slot'; slot: number }

// Drag-and-drop letter tiles. Mirrors the pointer-event idiom in <BattleScreen>:
// setPointerCapture on the tile, bounding-rect hit-testing on move, and a <10px
// movement threshold that falls back to tap-to-place (so either gesture works).
export default function SpellingPuzzle({ problem, onSubmit }: Props) {
  const { word, scrambled, sentence } = problem

  // slots[i] = index into `scrambled`, or null for an empty slot.
  const [slots, setSlots] = useState<(number | null)[]>(() => word.split('').map(() => null))
  const [dragTile, setDragTile] = useState<number | null>(null)
  const [dragPos,  setDragPos]  = useState<{ x: number; y: number } | null>(null)
  const [hovSlot,  setHovSlot]  = useState<number | null>(null)
  const [shaking,  setShaking]  = useState(false)

  const slotRefs    = useRef<Array<HTMLDivElement | null>>([])
  const pointerDown = useRef<{ x: number; y: number } | null>(null)
  const dragFrom    = useRef<DragSource | null>(null)

  // Never leave a word playing after she moves on.
  // The board resets on a new word via the `key` the parent passes, not an effect.
  useEffect(() => cancelSpeech, [])

  const placed    = new Set(slots.filter((s): s is number => s !== null))
  const poolTiles = scrambled.map((_, i) => i).filter(i => !placed.has(i))
  const complete  = slots.every(s => s !== null)
  const guess     = slots.map(s => (s === null ? '' : scrambled[s])).join('')

  // Long words get smaller tiles, but never below a comfortable tap target.
  const tileSize = word.length >= 10 ? 44 : word.length >= 7 ? 52 : 60

  // ── Placement ─────────────────────────────────────────────────────────────
  function placeInSlot(tile: number, from: DragSource, target: number) {
    setSlots(prev => {
      const next = [...prev]
      // Dragged from another slot → swap with the occupant (or just vacate).
      // Dragged from the pool → any occupant is bumped back to the pool on its
      // own, since the pool is derived from "tiles not currently in a slot".
      if (from.kind === 'slot') next[from.slot] = next[target]
      next[target] = tile
      return next
    })
  }

  function tapTile(tile: number, from: DragSource) {
    if (from.kind === 'slot') {
      setSlots(prev => prev.map((s, i) => (i === from.slot ? null : s)))
      return
    }
    const firstEmpty = slots.findIndex(s => s === null)
    if (firstEmpty !== -1) placeInSlot(tile, from, firstEmpty)
  }

  function clearAll() {
    setSlots(word.split('').map(() => null))
  }

  // ── Drag ──────────────────────────────────────────────────────────────────
  function handlePointerDown(e: React.PointerEvent, tile: number, from: DragSource) {
    e.stopPropagation()
    dragFrom.current = from
    e.currentTarget.setPointerCapture(e.pointerId)
    pointerDown.current = { x: e.clientX, y: e.clientY }
    setDragTile(tile)
    setDragPos({ x: e.clientX, y: e.clientY })
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (dragTile === null) return
    setDragPos({ x: e.clientX, y: e.clientY })
    let found: number | null = null
    slotRefs.current.forEach((el, i) => {
      if (!el || found !== null) return
      const r = el.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom) {
        found = i
      }
    })
    setHovSlot(found)
  }

  function handlePointerUp(e: React.PointerEvent) {
    const start = pointerDown.current
    const tile  = dragTile
    const from  = dragFrom.current
    pointerDown.current = null
    dragFrom.current = null
    setDragTile(null)
    setDragPos(null)
    setHovSlot(null)
    if (tile === null || !from) return

    const dist = start ? Math.hypot(e.clientX - start.x, e.clientY - start.y) : 99
    if (dist < 10) {
      tapTile(tile, from)          // barely moved → treat it as a tap
    } else if (hovSlot !== null) {
      placeInSlot(tile, from, hovSlot)
    } else if (from.kind === 'slot') {
      setSlots(prev => prev.map((s, i) => (i === from.slot ? null : s)))  // dragged out
    }
  }

  function handleCheck() {
    if (!complete) return
    if (!onSubmit(guess)) {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  const tileClass =
    'flex items-center justify-center rounded-xl bg-yellow-400 text-purple-950 ' +
    'font-extrabold uppercase shadow-md select-none cursor-grab active:cursor-grabbing'

  return (
    <div
      className="space-y-4"
      style={{ touchAction: 'none' }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Audio controls — the word exists only as sound, never as text. */}
      <div className="bg-purple-900/60 rounded-2xl p-4 space-y-3">
        <button
          onClick={() => speak(word, RATE_NORMAL)}
          className="w-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white
                     font-bold py-4 rounded-2xl text-lg transition-colors shadow-lg"
        >
          🔊 Hear the word
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => speak(word, RATE_SLOW)}
            className="flex-1 bg-purple-800 hover:bg-purple-700 text-white text-sm
                       font-semibold py-3 rounded-xl transition-colors"
          >
            🐢 Slower
          </button>
          <button
            onClick={() => speak(sentence, RATE_NORMAL)}
            className="flex-1 bg-purple-800 hover:bg-purple-700 text-white text-sm
                       font-semibold py-3 rounded-xl transition-colors"
          >
            💬 In a sentence
          </button>
        </div>
        <p className="text-purple-300 text-xs text-center">
          Tap to hear it as many times as you like.
        </p>
      </div>

      {/* Answer slots */}
      <div className={`flex flex-wrap justify-center gap-2 ${shaking ? 'spell-shake' : ''}`}>
        {slots.map((tile, i) => (
          <div
            key={i}
            ref={el => { slotRefs.current[i] = el }}
            style={{ width: tileSize, height: tileSize }}
            className={`flex items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
              hovSlot === i ? 'border-yellow-300 bg-yellow-300/20' : 'border-purple-600 bg-purple-900/40'
            }`}
          >
            {tile !== null && (
              <div
                style={{ width: tileSize - 6, height: tileSize - 6, fontSize: tileSize * 0.45 }}
                className={`${tileClass} ${dragTile === tile ? 'opacity-30' : ''}`}
                onPointerDown={e => handlePointerDown(e, tile, { kind: 'slot', slot: i })}
              >
                {scrambled[tile]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scrambled pool */}
      <div className="flex flex-wrap justify-center gap-2 min-h-[60px] items-center">
        {poolTiles.map(tile => (
          <div
            key={tile}
            style={{ width: tileSize, height: tileSize, fontSize: tileSize * 0.45 }}
            className={`${tileClass} ${dragTile === tile ? 'opacity-30' : ''}`}
            onPointerDown={e => handlePointerDown(e, tile, { kind: 'pool' })}
          >
            {scrambled[tile]}
          </div>
        ))}
        {poolTiles.length === 0 && (
          <p className="text-purple-400 text-sm">All letters placed!</p>
        )}
      </div>

      <p className="text-purple-400 text-xs text-center">
        Drag the letters into the boxes — or just tap them. {word.length} letters.
      </p>

      <div className="flex gap-2">
        <button
          onClick={clearAll}
          className="bg-purple-800 hover:bg-purple-700 text-white font-semibold px-5 py-3
                     rounded-xl transition-colors"
        >
          🔄 Clear
        </button>
        <button
          onClick={handleCheck}
          disabled={!complete}
          className={`flex-1 font-bold py-3 rounded-xl transition-colors ${
            complete
              ? 'bg-yellow-400 hover:bg-yellow-300 text-purple-950'
              : 'bg-purple-800/50 text-purple-500 cursor-not-allowed'
          }`}
        >
          Check!
        </button>
      </div>

      {/* Drag ghost */}
      {dragTile !== null && dragPos && (
        <div
          style={{
            position: 'fixed',
            left: dragPos.x,
            top: dragPos.y,
            width: tileSize,
            height: tileSize,
            fontSize: tileSize * 0.45,
            transform: 'translate(-50%, -50%) scale(1.15)',
            zIndex: 50,
          }}
          className={`${tileClass} pointer-events-none shadow-2xl`}
        >
          {scrambled[dragTile]}
        </div>
      )}
    </div>
  )
}
