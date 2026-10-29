// Writes docs/grade-samples.md: three math and three logic problems per zone
// per grade, from the real generators with a fixed seed (DESIGN.md §23).
// Skipped in normal test runs. To regenerate:
//   WRITE_SAMPLES=1 npx vitest run scripts/grade-samples.test.ts
import { it } from 'vitest'
import { writeFileSync } from 'node:fs'
import { MATH, LOGIC } from '../src/content/grades'
import { GRADES } from '../src/content/gradeTypes'
import { answerText } from '../src/engine/mathKit'

function seeded(seed: number): () => number {
  let s = seed
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 }
}

it.skipIf(!process.env.WRITE_SAMPLES)('writes docs/grade-samples.md', () => {
  const out: string[] = [
    '# Grade samples', '',
    'Three math and three logic problems per zone per grade, made by the real generators with a fixed seed.',
    'Regenerate with `WRITE_SAMPLES=1 npx vitest run scripts/grade-samples.test.ts`. The rules behind them are in DESIGN.md §23.', '',
  ]
  for (const grade of GRADES) {
    out.push(`## Grade ${grade}`, '')
    for (const zone of [1, 2, 3, 4, 5, 6] as const) {
      out.push(`### Zone ${zone}`, '', '**Math**', '')
      const rng = seeded(grade * 100 + zone)
      const skills = MATH[grade][zone]
      for (let i = 0; i < 3; i++) {
        const skill = skills[i % skills.length]
        const p = skill.make(rng)
        const kind = p.answer.kind === 'choice' ? ` _(buttons: ${p.answer.choices.join(' · ')})_` : p.answer.kind === 'number' ? '' : ` _(${p.answer.kind} entry)_`
        out.push(`${i + 1}. \`${p.prompt}\` → **${answerText(p.answer)}**${kind}  \n   _${skill.label}_`)
      }
      out.push('', '**Logic**', '')
      const formats = LOGIC[grade][zone]
      const step = Math.max(1, Math.floor(formats.length / 3))
      for (let i = 0; i < 3; i++) {
        const f = formats[(i * step) % formats.length]
        const p = f.make(rng)
        out.push(`${i + 1}. _${f.label}_`, '', '   ```', ...p.prompt.split('\n').map((l) => `   ${l}`), '   ```', '',
          `   Choices: ${p.choices.map((c, k) => (k === p.correctIndex ? `**${c}** ✓` : c)).join(' · ')}`, '')
      }
    }
  }
  writeFileSync('docs/grade-samples.md', out.join('\n'))
})
