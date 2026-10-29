// Grade 5 logic by zone (DESIGN.md §23): multi-step deduction (who-has-what
// grids with only "not" clues, orderings that need clues combined), patterns
// with two rules, and if/then chains of 4–5 steps that run backward.
import { elimination, ordering, grid, pattern, chain, attributes } from '../../engine/logicKit'
import type { LogicFormat, ZoneLogic } from '../gradeTypes'

const f = (label: string, make: LogicFormat['make']): LogicFormat => ({ label, make })

export const GRADE5_LOGIC: ZoneLogic = {
  1: [
    f('find it: 5 items, left/right clues', (r) => elimination(r, { items: 5, relative: true })),
    f('order 5 friends, second place', (r) => ordering(r, { items: 5, middle: true, notClues: true })),
    f('patterns: growing, two woven together', (r) => pattern(r, { rules: ['growing', 'interleave', 'triple'], maxStep: 50 })),
    f('3 clues with a NOT', (r) => attributes(r, { items: 5, attrs: 3, not: true })),
    f('who has what: 3 friends, only "not" clues', (r) => grid(r, { size: 3, positive: false, deep: true })),
    f('if/then, 4 steps, some backward', (r) => chain(r, { steps: 4, distractor: true, backward: 0.3 })),
  ],
  2: [
    f('find it: 6 items, left/right clues', (r) => elimination(r, { items: 6, relative: true })),
    f('order 6 friends, second place', (r) => ordering(r, { items: 6, middle: true, notClues: true })),
    f('patterns with two rules', (r) => pattern(r, { rules: ['twoRule', 'interleave', 'growing'], maxStep: 50 })),
    f('3 clues with a NOT', (r) => attributes(r, { items: 6, attrs: 3, not: true })),
    f('who has what: 3 friends, only "not" clues', (r) => grid(r, { size: 3, positive: false, deep: true })),
    f('if/then, 4 steps, some backward', (r) => chain(r, { steps: 4, distractor: true, backward: 0.4 })),
  ],
  3: [
    f('find it: 6 items, left/right clues', (r) => elimination(r, { items: 6, relative: true })),
    f('order 6 friends, second place', (r) => ordering(r, { items: 6, middle: true, notClues: true })),
    f('patterns with two rules', (r) => pattern(r, { rules: ['twoRule', 'interleave'], maxStep: 50 })),
    f('who has what: 4 friends', (r) => grid(r, { size: 4, positive: true })),
    f('if/then, 5 steps, some backward', (r) => chain(r, { steps: 5, distractor: true, backward: 0.5 })),
    f('3 clues with a NOT', (r) => attributes(r, { items: 6, attrs: 3, not: true })),
  ],
  4: [
    f('find it: 6 items, left/right clues', (r) => elimination(r, { items: 6, relative: true })),
    f('order 6 friends, second place', (r) => ordering(r, { items: 6, middle: true, notClues: true })),
    f('patterns with two rules', (r) => pattern(r, { rules: ['twoRule', 'interleave'], maxStep: 50 })),
    f('who has what: 4 friends', (r) => grid(r, { size: 4, positive: true })),
    f('if/then, 5 steps, some backward', (r) => chain(r, { steps: 5, distractor: true, backward: 0.5 })),
  ],
  5: [
    f('order 6 friends, second place', (r) => ordering(r, { items: 6, middle: true, notClues: true })),
    f('patterns with two rules', (r) => pattern(r, { rules: ['twoRule', 'interleave'], maxStep: 50 })),
    f('who has what: 4 friends, only "not" clues', (r) => grid(r, { size: 4, positive: false, deep: true })),
    f('if/then, 5 steps, backward', (r) => chain(r, { steps: 5, distractor: true, backward: 0.6 })),
    f('find it: 6 items, left/right clues', (r) => elimination(r, { items: 6, relative: true })),
  ],
  6: [
    f('who has what: 4 friends, only "not" clues', (r) => grid(r, { size: 4, positive: false, deep: true })),
    f('order 6 friends, second place', (r) => ordering(r, { items: 6, middle: true, notClues: true })),
    f('patterns with two rules', (r) => pattern(r, { rules: ['twoRule', 'interleave'], maxStep: 50 })),
    f('if/then, 5 steps, backward', (r) => chain(r, { steps: 5, distractor: true, backward: 0.7 })),
    f('find it: 6 items, left/right clues', (r) => elimination(r, { items: 6, relative: true })),
  ],
}
