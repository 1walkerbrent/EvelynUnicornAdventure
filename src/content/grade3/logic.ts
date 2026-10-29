// Grade 3 logic by zone (DESIGN.md §23). Zones 3–6 keep the pre-grade formats
// and sizes (4- and 5-item puzzles, the fixed word puzzles). Zones 1–2 replace
// the old K–2 set (odd one out, "which comes first in a day") with 3–4 item
// clue puzzles, one-rule patterns and 3-digit comparisons.
import { elimination, ordering, grid, pattern, chain, attributes, biggestNumber, wordPuzzle } from '../../engine/logicKit'
import type { LogicFormat, ZoneLogic } from '../gradeTypes'

const f = (label: string, make: LogicFormat['make']): LogicFormat => ({ label, make })

export const GRADE3_LOGIC: ZoneLogic = {
  1: [
    f('find it: 3 items', (r) => elimination(r, { items: 3, relative: false })),
    f('order 3 friends', (r) => ordering(r, { items: 3, middle: false, notClues: false })),
    f('pattern, one rule', (r) => pattern(r, { rules: ['add', 'subtract', 'double'], maxStep: 10 })),
    f('2 clues: color and shape', (r) => attributes(r, { items: 3, attrs: 2, not: false })),
    f('biggest 3-digit number', (r) => biggestNumber(r, 3)),
    f('who has what: 2 friends', (r) => grid(r, { size: 2, positive: true })),
  ],
  2: [
    f('find it: 4 items', (r) => elimination(r, { items: 4, relative: false })),
    f('order 4 friends', (r) => ordering(r, { items: 4, middle: false, notClues: false })),
    f('pattern, one rule', (r) => pattern(r, { rules: ['add', 'subtract', 'double'], maxStep: 15 })),
    f('2 clues: color and shape', (r) => attributes(r, { items: 4, attrs: 2, not: false })),
    f('who has what: 2 friends', (r) => grid(r, { size: 2, positive: false })),
    f('if/then, 2 steps', (r) => chain(r, { steps: 2, distractor: false, backward: 0 })),
    f('biggest 3-digit number', (r) => biggestNumber(r, 4)),
  ],
  3: [
    f('find it: 4 items', (r) => elimination(r, { items: 4, relative: false })),
    f('2 clues: color and shape', (r) => attributes(r, { items: 4, attrs: 2, not: false })),
    f('order 4 friends', (r) => ordering(r, { items: 4, middle: false, notClues: false })),
    f('who has what: 3 friends', (r) => grid(r, { size: 3, positive: true })),
    f('what must be true', (r) => wordPuzzle(r, 'chain')),
    f('which would you use', (r) => wordPuzzle(r, 'use')),
    f('if/then, 2 steps', (r) => chain(r, { steps: 2, distractor: false, backward: 0 })),
  ],
  4: [
    f('find it: 4 items', (r) => elimination(r, { items: 4, relative: false })),
    f('2 clues: color and shape', (r) => attributes(r, { items: 4, attrs: 2, not: false })),
    f('order 4 friends', (r) => ordering(r, { items: 4, middle: false, notClues: false })),
    f('who has what: 3 friends', (r) => grid(r, { size: 3, positive: true })),
    f('what must also be true', (r) => wordPuzzle(r, 'must')),
    f('if/then, 3 steps', (r) => chain(r, { steps: 3, distractor: false, backward: 0 })),
    f('pattern, one rule', (r) => pattern(r, { rules: ['add', 'subtract', 'double'], maxStep: 25 })),
  ],
  5: [
    f('find it: 5 items', (r) => elimination(r, { items: 5, relative: false })),
    f('3 clues: color, size, shape', (r) => attributes(r, { items: 5, attrs: 3, not: false })),
    f('order 5 friends', (r) => ordering(r, { items: 5, middle: false, notClues: false })),
    f('if/then, 3 steps', (r) => chain(r, { steps: 3, distractor: false, backward: 0 })),
    f('which is impossible', (r) => wordPuzzle(r, 'impossible')),
    f('what follows', (r) => wordPuzzle(r, 'conclusion')),
    f('seats in a row', (r) => wordPuzzle(r, 'seating')),
  ],
  6: [
    f('find it: 5 items, left/right clues', (r) => elimination(r, { items: 5, relative: true })),
    f('3 clues: color, size, shape', (r) => attributes(r, { items: 5, attrs: 3, not: false })),
    f('order 5 friends', (r) => ordering(r, { items: 5, middle: false, notClues: false })),
    f('who has what: 3 friends', (r) => grid(r, { size: 3, positive: true })),
    f('if/then, 3 steps', (r) => chain(r, { steps: 3, distractor: false, backward: 0 })),
    f('which is impossible', (r) => wordPuzzle(r, 'impossible')),
    f('what follows', (r) => wordPuzzle(r, 'conclusion')),
  ],
}
