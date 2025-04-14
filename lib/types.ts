export interface QuestionData {
  questionId: string
  question: string
  questionType: string
  answerType: string
  options: string[]
  correctAnswer: string[]
}

export interface UserAnswer {
  questionId: string
  question: string
  userAnswer: string[]
  correctAnswer: string[]
  isCorrect: boolean
}
