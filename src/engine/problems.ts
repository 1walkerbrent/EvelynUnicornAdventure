export interface MathProblem {
  type: 'math'
  prompt: string
  correctAnswer: number
  hint: string
}

export interface LogicProblem {
  type: 'logic'
  prompt: string
  choices: string[]
  correctIndex: number
  hint: string
}

export type Problem = MathProblem | LogicProblem

// Zone 1 Area 1 — two-digit one-step subtraction, clover story (§7)
export const BRINDLEWOOD_PROBLEM: MathProblem = {
  type: 'math',
  prompt:
    "Clover Dewdrop is hiding nearby, watching to see if you're trustworthy!\n\n" +
    "She loves exactly 38 clovers — but you've only placed 15 so far.\n\n" +
    'How many more clovers do you need to place?',
  correctAnswer: 23,
  hint: 'The two numbers are 38 and 15. You need to find the difference — try: 38 − 15 = ?',
}

// Zone 1 Area 2 — reading/logic, sunflower story (§7)
export const SUNFLOWER_PROBLEM: LogicProblem = {
  type: 'logic',
  prompt:
    'Tangerine Twirl is hiding behind one of three sunflowers.\n\n' +
    '🌸 Left — short\n' +
    '🌸 Middle — tallest\n' +
    '🌸 Right — medium height\n\n' +
    'She did NOT go to the flower on the left.\n' +
    'She did NOT go to the tallest flower.\n\n' +
    'Which sunflower is she hiding behind?',
  choices: [
    'Left sunflower (short)',
    'Middle sunflower (tallest)',
    'Right sunflower (medium)',
  ],
  correctIndex: 2,
  hint: "Cross off what you know: NOT left ✗   NOT tallest (that's the middle one) ✗   One flower is left!",
}
