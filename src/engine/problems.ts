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
