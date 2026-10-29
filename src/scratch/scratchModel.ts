// Scratch paper's drawing model (DESIGN.md §24). Pure data, no canvas: a page
// is a list of operations (pen strokes, eraser strokes, "clear all") that the
// canvas replays in order. Nothing here is ever saved; a page lives in memory
// for one problem and is thrown away when the next problem starts.

export interface Point { x: number; y: number }

export const PEN_COLORS = [
  { id: 'gray', label: 'Dark gray pen', css: '#374151' },
  { id: 'blue', label: 'Blue pen',      css: '#2563eb' },
  { id: 'red',  label: 'Red pen',       css: '#dc2626' },
] as const
export type PenColor = typeof PEN_COLORS[number]['id']

export const PEN_WIDTH = 3
export const ERASER_WIDTH = 28
/** Grid cells fit one handwritten digit. */
export const GRID_CELL = 40
/** How many steps Undo can take back. */
export const UNDO_LIMIT = 30
/** After a stylus lifts, fingers stay ignored this long, so a resting palm doesn't draw. */
export const PALM_GUARD_MS = 1000

export type Op =
  | { kind: 'stroke'; tool: 'pen'; color: PenColor; points: Point[] }
  | { kind: 'stroke'; tool: 'eraser'; points: Point[] }
  | { kind: 'clear' }

export interface Page {
  /** Too old to undo, but still on the page. */
  base: Op[]
  /** The last UNDO_LIMIT operations, newest last. */
  recent: Op[]
}

export const EMPTY_PAGE: Page = { base: [], recent: [] }

export function addOp(page: Page, op: Op): Page {
  const recent = [...page.recent, op]
  if (recent.length <= UNDO_LIMIT) return { base: page.base, recent }
  const base = [...page.base, ...recent.splice(0, recent.length - UNDO_LIMIT)]
  // Nothing before a "clear" can come back once the clear itself can't be undone.
  const lastClear = base.map((o) => o.kind).lastIndexOf('clear')
  return { base: lastClear >= 0 ? base.slice(lastClear + 1) : base, recent }
}

export function undo(page: Page): Page {
  if (page.recent.length === 0) return page
  return { base: page.base, recent: page.recent.slice(0, -1) }
}

export const canUndo = (page: Page) => page.recent.length > 0

/** The operations to draw, oldest first: everything after the last "clear". */
export function visibleOps(page: Page): Op[] {
  const all = [...page.base, ...page.recent]
  const lastClear = all.map((o) => o.kind).lastIndexOf('clear')
  return all.slice(lastClear + 1)
}

export const isBlank = (page: Page) => visibleOps(page).length === 0

// ── palm rejection ───────────────────────────────────────────────────────────

export interface PenWatch {
  /** A stylus is touching the screen. */
  penDown: boolean
  /** When the stylus last lifted (ms), or -Infinity if it never touched. */
  penUpAt: number
}

export const NO_PEN: PenWatch = { penDown: false, penUpAt: -Infinity }

/** Whether a new pointer may start drawing. Fingers wait while a stylus is in use. */
export function acceptsPointer(type: string, now: number, pen: PenWatch): boolean {
  if (type !== 'touch') return true
  return !pen.penDown && now - pen.penUpAt >= PALM_GUARD_MS
}
