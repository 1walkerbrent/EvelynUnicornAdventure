import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import ProblemCard from '../components/ProblemCard'
import type { Problem } from '../engine/problems'
import { EMPTY_PAGE, UNDO_LIMIT, PALM_GUARD_MS, NO_PEN, addOp, undo, canUndo, visibleOps, isBlank, acceptsPointer } from './scratchModel'
import type { Op } from './scratchModel'
import { layoutFor, useScratchLayout } from './scratchLayout'
import { useGameStore } from '../state/store'

const stroke = (x: number): Op => ({ kind: 'stroke', tool: 'pen', color: 'gray', points: [{ x, y: 0 }, { x: x + 1, y: 1 }] })

describe('scratch page model', () => {
  it('undo takes back up to UNDO_LIMIT steps and no more', () => {
    let page = EMPTY_PAGE
    for (let i = 0; i < UNDO_LIMIT + 5; i++) page = addOp(page, stroke(i))
    expect(UNDO_LIMIT).toBeGreaterThanOrEqual(20)
    let undos = 0
    while (canUndo(page)) { page = undo(page); undos++ }
    expect(undos).toBe(UNDO_LIMIT)
    // The five oldest strokes are still on the page.
    expect(visibleOps(page)).toHaveLength(5)
  })

  it('clear all wipes the page, and undo brings it back', () => {
    let page = addOp(addOp(EMPTY_PAGE, stroke(1)), stroke(2))
    page = addOp(page, { kind: 'clear' })
    expect(isBlank(page)).toBe(true)
    page = undo(page)
    expect(visibleOps(page)).toHaveLength(2)
  })

  it('forgets what a clear wiped once the clear is too old to undo', () => {
    let page = addOp(addOp(EMPTY_PAGE, stroke(1)), { kind: 'clear' })
    for (let i = 0; i < UNDO_LIMIT; i++) page = addOp(page, stroke(i))
    expect(page.base).toEqual([])
    expect(visibleOps(page)).toHaveLength(UNDO_LIMIT)
  })

  it('ignores fingers while a stylus is down and for a moment after', () => {
    expect(acceptsPointer('touch', 0, NO_PEN)).toBe(true)
    expect(acceptsPointer('touch', 0, { penDown: true, penUpAt: -Infinity })).toBe(false)
    expect(acceptsPointer('touch', 500, { penDown: false, penUpAt: 0 })).toBe(false)
    expect(acceptsPointer('touch', PALM_GUARD_MS, { penDown: false, penUpAt: 0 })).toBe(true)
    // The stylus and a mouse always draw.
    expect(acceptsPointer('pen', 0, { penDown: true, penUpAt: 0 })).toBe(true)
    expect(acceptsPointer('mouse', 0, { penDown: true, penUpAt: 0 })).toBe(true)
  })

  it('uses a side panel in landscape and a bottom sheet in portrait', () => {
    expect(layoutFor(1024, 768)).toBe('side')
    expect(layoutFor(768, 1024)).toBe('bottom')
  })
})

// ── the panel inside a problem card ──────────────────────────────────────────

const math = (prompt: string): Problem => ({ type: 'math', prompt, answer: { kind: 'number', value: 1 }, hint: 'h' })
const logic: Problem = { type: 'logic', prompt: 'Who?', choices: ['A', 'B'], correctIndex: 0, hint: 'h' }

let root: Root
let host: HTMLDivElement

beforeAll(() => {
  ;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  // jsdom has no canvas; a context that draws nothing is enough here.
  const noop = () => {}
  const fake = new Proxy({}, { get: () => noop, set: () => true })
  HTMLCanvasElement.prototype.getContext = (() => fake) as unknown as HTMLCanvasElement['getContext']
})

beforeEach(() => {
  localStorage.clear()
  // A tour would sit on top of the card; these tests are about the panel.
  useGameStore.setState({ toursDone: ['intro', 'battle', 'scratch'], activeTour: null })
  host = document.createElement('div')
  document.body.appendChild(host)
  root = createRoot(host)
})

afterEach(() => {
  act(() => root.unmount())
  host.remove()
})

function render(problem: Problem) {
  act(() => root.render(<ProblemCard problem={problem} onSolve={() => {}} />))
}

const button = (name: string) =>
  [...document.querySelectorAll('button')].find((b) => b.textContent?.includes(name) || b.getAttribute('aria-label') === name)
const panel = () => document.querySelector('[role="dialog"][aria-label="Scratch paper"]')
const click = (name: string) => act(() => button(name)!.click())

function pointer(type: string, pointerType: string, pointerId: number, x: number) {
  const canvas = document.querySelector('canvas')!
  const e = new MouseEvent(type, { bubbles: true, clientX: x, clientY: x })
  Object.defineProperty(e, 'pointerId', { value: pointerId })
  Object.defineProperty(e, 'pointerType', { value: pointerType })
  act(() => { canvas.dispatchEvent(e) })
}

function draw(pointerType = 'touch', id = 1) {
  pointer('pointerdown', pointerType, id, 10)
  pointer('pointermove', pointerType, id, 30)
  pointer('pointerup', pointerType, id, 30)
}

describe('scratch paper on a problem', () => {
  it('shows the pencil on math problems only', () => {
    render(math('7 × 8'))
    expect(button('Scratch Paper')).toBeTruthy()
    render(logic)
    expect(button('Scratch Paper')).toBeUndefined()
  })

  it('opens with the problem shown again, and Done closes it', () => {
    render(math('346 × 7'))
    click('Scratch Paper')
    expect(panel()).toBeTruthy()
    expect(panel()!.textContent).toContain('346 × 7')
    // The answer box stays on the page, outside the panel.
    expect(host.querySelector('input[aria-label="Your answer"]')).toBeTruthy()
    click('Done')
    expect(panel()).toBeNull()
    expect(useScratchLayout.getState().layout).toBeNull()
  })

  it('keeps the work when reopened during the same problem', () => {
    render(math('346 × 7'))
    click('Scratch Paper')
    expect(button('Undo')!.disabled).toBe(true)
    draw()
    expect(button('Undo')!.disabled).toBe(false)
    click('Done')
    click('Scratch Paper')
    expect(button('Undo')!.disabled).toBe(false)
  })

  it('starts blank and closed when a new problem arrives', () => {
    render(math('346 × 7'))
    click('Scratch Paper')
    draw()
    render(math('12 × 12'))
    expect(panel()).toBeNull()
    click('Scratch Paper')
    expect(button('Undo')!.disabled).toBe(true)
  })

  it('asks before clearing everything', () => {
    render(math('346 × 7'))
    click('Scratch Paper')
    draw()
    click('Clear all')
    click('No')
    expect(button('Undo')!.disabled).toBe(false)
    click('Clear all')
    click('Yes, clear')
    expect(button('Clear all')!.disabled).toBe(true)
  })

  it('ignores a resting palm while the stylus writes', () => {
    render(math('346 × 7'))
    click('Scratch Paper')
    pointer('pointerdown', 'pen', 1, 10)
    draw('touch', 2)                       // the palm
    pointer('pointermove', 'pen', 1, 40)
    pointer('pointerup', 'pen', 1, 40)
    draw('touch', 3)                       // right after lifting the stylus
    click('Undo')
    expect(button('Undo')!.disabled).toBe(true)
  })

  it('never writes the drawing to storage', () => {
    render(math('346 × 7'))
    click('Scratch Paper')
    draw()
    click('Done')
    expect(localStorage.length).toBe(0)
  })
})
