import { useLayoutEffect, useRef } from 'react'
import {
  PEN_COLORS, PEN_WIDTH, ERASER_WIDTH, GRID_CELL, NO_PEN,
  addOp, visibleOps, acceptsPointer,
} from './scratchModel'
import type { Op, Page, PenColor, PenWatch, Point } from './scratchModel'

// The drawing surface (§24). Finger and stylus through pointer events, sized
// for devicePixelRatio so lines stay sharp. A stroke draws straight onto the
// canvas as it moves; the whole page is only replayed on undo, clear, a grid
// toggle or a resize, so it stays quick on a mid-range tablet. The grid is a
// CSS background under a transparent canvas, so the eraser can't rub it out.

const COLOR_CSS: Record<PenColor, string> = Object.fromEntries(PEN_COLORS.map((c) => [c.id, c.css])) as Record<PenColor, string>

const mid = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })

function styleFor(ctx: CanvasRenderingContext2D, op: Extract<Op, { kind: 'stroke' }>) {
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  if (op.tool === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.strokeStyle = ctx.fillStyle = '#000'
    ctx.lineWidth = ERASER_WIDTH
  } else {
    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = ctx.fillStyle = COLOR_CSS[op.color]
    ctx.lineWidth = PEN_WIDTH
  }
}

function dot(ctx: CanvasRenderingContext2D, p: Point) {
  ctx.beginPath()
  ctx.arc(p.x, p.y, ctx.lineWidth / 2, 0, Math.PI * 2)
  ctx.fill()
}

// A smooth line through the points: straight to the first midpoint, then a
// quadratic curve through each point to the next midpoint, then straight to
// the end. Live drawing lays down exactly these pieces one at a time.
function drawStroke(ctx: CanvasRenderingContext2D, op: Extract<Op, { kind: 'stroke' }>) {
  const p = op.points
  styleFor(ctx, op)
  if (p.length === 1) return dot(ctx, p[0])
  ctx.beginPath()
  ctx.moveTo(p[0].x, p[0].y)
  ctx.lineTo(...xy(mid(p[0], p[1])))
  for (let i = 1; i < p.length - 1; i++) ctx.quadraticCurveTo(p[i].x, p[i].y, ...xy(mid(p[i], p[i + 1])))
  ctx.lineTo(p[p.length - 1].x, p[p.length - 1].y)
  ctx.stroke()
}

const xy = (p: Point): [number, number] => [p.x, p.y]

/** Wipe the canvas and draw the page from scratch. */
function replay(canvas: HTMLCanvasElement | null, page: Page) {
  const c = canvas?.getContext('2d')
  if (!canvas || !c) return
  c.save()
  c.setTransform(1, 0, 0, 1, 0, 0)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.restore()
  for (const op of visibleOps(page)) if (op.kind === 'stroke') drawStroke(c, op)
}

interface Props {
  page: Page
  onChange: (page: Page) => void
  tool: 'pen' | 'eraser'
  color: PenColor
  grid: boolean
}

export default function ScratchCanvas({ page, onChange, tool, color, grid }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // The page the canvas already shows, so committing a live stroke doesn't replay everything.
  const shownRef = useRef<Page | null>(null)
  const pageRef = useRef(page)

  const live = useRef<{ id: number; type: string; op: Extract<Op, { kind: 'stroke' }>; left: number; top: number } | null>(null)
  const pen = useRef<PenWatch>(NO_PEN)

  function ctx() {
    return canvasRef.current?.getContext('2d') ?? null
  }

  // Match the canvas to its box at the screen's pixel density, then redraw.
  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const fit = () => {
      const dpr = window.devicePixelRatio || 1
      const { width, height } = wrap.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
      replay(canvas, pageRef.current)
      shownRef.current = pageRef.current
    }
    fit()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(fit)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  // Undo and clear arrive as a new page; a stroke she just drew is already on screen.
  useLayoutEffect(() => {
    pageRef.current = page
    if (page === shownRef.current) return
    replay(canvasRef.current, page)
    shownRef.current = page
  }, [page])

  function pointAt(e: { clientX: number; clientY: number }): Point {
    const l = live.current!
    return { x: e.clientX - l.left, y: e.clientY - l.top }
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const now = performance.now()
    if (e.pointerType === 'pen') {
      pen.current = { ...pen.current, penDown: true }
      // A palm that landed just before the stylus: drop its stroke.
      if (live.current?.type === 'touch') {
        live.current = null
        replay(canvasRef.current, pageRef.current)
      }
    }
    if (live.current) return                 // one line at a time
    if (!acceptsPointer(e.pointerType, now, pen.current)) return
    const c = ctx()
    if (!c) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    const rect = e.currentTarget.getBoundingClientRect()
    const op: Extract<Op, { kind: 'stroke' }> = tool === 'eraser'
      ? { kind: 'stroke', tool: 'eraser', points: [] }
      : { kind: 'stroke', tool: 'pen', color, points: [] }
    live.current = { id: e.pointerId, type: e.pointerType, op, left: rect.left, top: rect.top }
    const p = pointAt(e)
    op.points.push(p)
    styleFor(c, op)
    dot(c, p)
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const l = live.current
    if (!l || e.pointerId !== l.id) return
    const c = ctx()
    if (!c) return
    styleFor(c, l.op)
    const events = e.nativeEvent.getCoalescedEvents?.() ?? []
    for (const ev of events.length ? events : [e.nativeEvent]) {
      const pts = l.op.points
      const p = pointAt(ev)
      const prev = pts[pts.length - 1]
      if (Math.abs(p.x - prev.x) < 0.5 && Math.abs(p.y - prev.y) < 0.5) continue
      pts.push(p)
      c.beginPath()
      if (pts.length === 2) {
        c.moveTo(prev.x, prev.y)
        c.lineTo(...xy(mid(prev, p)))
      } else {
        const from = mid(pts[pts.length - 3], prev)
        c.moveTo(from.x, from.y)
        c.quadraticCurveTo(prev.x, prev.y, ...xy(mid(prev, p)))
      }
      c.stroke()
    }
  }

  function onPointerEnd(e: React.PointerEvent<HTMLCanvasElement>) {
    if (e.pointerType === 'pen') pen.current = { penDown: false, penUpAt: performance.now() }
    const l = live.current
    if (!l || e.pointerId !== l.id) return
    live.current = null
    const pts = l.op.points
    const c = ctx()
    if (c && pts.length > 1) {
      // The last half-segment, from the final midpoint to where she lifted.
      styleFor(c, l.op)
      const last = pts[pts.length - 1]
      const from = mid(pts[pts.length - 2], last)
      c.beginPath()
      c.moveTo(from.x, from.y)
      c.lineTo(last.x, last.y)
      c.stroke()
    }
    const next = addOp(pageRef.current, l.op)
    shownRef.current = next
    onChange(next)
  }

  return (
    <div
      ref={wrapRef}
      className="relative flex-1 min-h-0 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: '#fdfcf7',
        backgroundImage: grid
          ? 'linear-gradient(to right, #c7d8ef 1px, transparent 1px), linear-gradient(to bottom, #c7d8ef 1px, transparent 1px)'
          : undefined,
        backgroundSize: grid ? `${GRID_CELL}px ${GRID_CELL}px` : undefined,
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Scratch paper. Draw here with your finger or a stylus."
        className="absolute inset-0 block"
        style={{ touchAction: 'none', cursor: 'crosshair' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      />
    </div>
  )
}
