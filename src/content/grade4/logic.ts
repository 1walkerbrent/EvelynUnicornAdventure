// Grade 4 logic by zone (DESIGN.md §23): one more item and more "not" clues
// than Grade 3, 3×3 who-has-what grids, bigger pattern steps with ×3 and ÷2,
// and if/then chains of 3–4 steps with a rule that isn't needed.
import { elimination, ordering, grid, pattern, chain, attributes, wordPuzzle } from '../../engine/logicKit'
import type { LogicFormat, ZoneLogic } from '../gradeTypes'

const f = (label: string, make: LogicFormat['make']): LogicFormat => ({ label, make })
const patterns = (r: () => number) => pattern(r, { rules: ['add', 'subtract', 'triple', 'halve', 'growing'], maxStep: 50 })

export const GRADE4_LOGIC: ZoneLogic = {
  1: [
    f('find it: 4 items, left/right clues', (r) => elimination(r, { items: 4, relative: true })),
    f('order 4 friends, "not" clues', (r) => ordering(r, { items: 4, middle: false, notClues: true })),
    f('patterns: bigger steps, ×3, ÷2', patterns),
    f('2 clues from 5 gems', (r) => attributes(r, { items: 5, attrs: 2, not: false })),
    f('who has what: 3 friends', (r) => grid(r, { size: 3, positive: true })),
    f('if/then, 3 steps', (r) => chain(r, { steps: 3, distractor: false, backward: 0 })),
  ],
  2: [
    f('find it: 5 items, left/right clues', (r) => elimination(r, { items: 5, relative: true })),
    f('order 5 friends, "not" clues', (r) => ordering(r, { items: 5, middle: false, notClues: true })),
    f('patterns: bigger steps, ×3, ÷2', patterns),
    f('3 clues: color, size, shape', (r) => attributes(r, { items: 5, attrs: 3, not: false })),
    f('who has what: 3 friends', (r) => grid(r, { size: 3, positive: true })),
    f('if/then, 3 steps + extra rule', (r) => chain(r, { steps: 3, distractor: true, backward: 0 })),
  ],
  3: [
    f('find it: 5 items, left/right clues', (r) => elimination(r, { items: 5, relative: true })),
    f('order 5 friends, second place', (r) => ordering(r, { items: 5, middle: true, notClues: true })),
    f('patterns: bigger steps, ×3, ÷2', patterns),
    f('3 clues from 6 gems', (r) => attributes(r, { items: 6, attrs: 3, not: false })),
    f('who has what: 3 friends, only "not" clues', (r) => grid(r, { size: 3, positive: false })),
    f('if/then, 4 steps + extra rule', (r) => chain(r, { steps: 4, distractor: true, backward: 0 })),
    f('what must also be true', (r) => wordPuzzle(r, 'must')),
  ],
  4: [
    f('find it: 6 items, left/right clues', (r) => elimination(r, { items: 6, relative: true })),
    f('order 5 friends, second place', (r) => ordering(r, { items: 5, middle: true, notClues: true })),
    f('patterns: bigger steps, ×3, ÷2', patterns),
    f('3 clues from 6 gems', (r) => attributes(r, { items: 6, attrs: 3, not: false })),
    f('who has what: 3 friends, only "not" clues', (r) => grid(r, { size: 3, positive: false })),
    f('if/then, 4 steps + extra rule', (r) => chain(r, { steps: 4, distractor: true, backward: 0 })),
    f('which is impossible', (r) => wordPuzzle(r, 'impossible')),
  ],
  5: [
    f('find it: 6 items, left/right clues', (r) => elimination(r, { items: 6, relative: true })),
    f('order 6 friends, second place', (r) => ordering(r, { items: 6, middle: true, notClues: true })),
    f('patterns: bigger steps, ×3, ÷2', patterns),
    f('3 clues with a NOT', (r) => attributes(r, { items: 6, attrs: 3, not: true })),
    f('who has what: 4 friends', (r) => grid(r, { size: 4, positive: true })),
    f('if/then, 4 steps + extra rule', (r) => chain(r, { steps: 4, distractor: true, backward: 0 })),
    f('what follows', (r) => wordPuzzle(r, 'conclusion')),
  ],
  6: [
    f('find it: 6 items, left/right clues', (r) => elimination(r, { items: 6, relative: true })),
    f('order 6 friends, second place', (r) => ordering(r, { items: 6, middle: true, notClues: true })),
    f('patterns: bigger steps, ×3, ÷2', patterns),
    f('3 clues with a NOT', (r) => attributes(r, { items: 6, attrs: 3, not: true })),
    f('who has what: 4 friends', (r) => grid(r, { size: 4, positive: true })),
    f('if/then, 4 steps, some backward', (r) => chain(r, { steps: 4, distractor: true, backward: 0.25 })),
  ],
}
