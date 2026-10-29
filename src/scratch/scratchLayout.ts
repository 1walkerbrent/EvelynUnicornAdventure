import { create } from 'zustand'
import type { PenColor } from './scratchModel'

// While scratch paper is open (§24), App makes room for it: in landscape the
// screen's content moves into the left 40% beside the panel; in portrait the
// screen gets room to scroll its answer box above the panel.
export type ScratchLayout = 'side' | 'bottom'

export const SCRATCH_SIDE_WIDTH = '60%'
/** Fraction of the screen height the portrait panel covers. */
export const SCRATCH_BOTTOM_SHARE = 0.6

export const useScratchLayout = create<{ layout: ScratchLayout | null }>(() => ({ layout: null }))

export function layoutFor(width: number, height: number): ScratchLayout {
  return width > height ? 'side' : 'bottom'
}

// The tools she picked, kept for the rest of this visit so every problem's
// paper starts the way she likes it. In memory only, like the drawings.
export const useScratchTools = create<{
  tool: 'pen' | 'eraser'
  color: PenColor
  grid: boolean
}>(() => ({ tool: 'pen', color: 'gray', grid: true }))
