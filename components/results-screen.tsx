import { Button } from "@/components/ui/button"
import { MoreVertical, CheckCircle, XCircle } from "lucide-react"
import type { UserAnswer } from "@/lib/types"

interface ResultsScreenProps {
  score: number
  userAnswers: UserAnswer[]
  totalQuestions: number
}

export default function ResultsScreen({ score, userAnswers, totalQuestions }: ResultsScreenProps) {
  const roundedScore = Math.round(score)
  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length

  return (
    <div className="w-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="w-8"></div> {/* Empty space for alignment */}
        <h1 className="text-lg font-medium text-gray-800">Results</h1>
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-4 py-6 overflow-y-auto">
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-100 p-6 rounded-full">
            <span className="text-4xl font-bold text-indigo-600">{roundedScore}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Overall Score</h2>

        <p className="text-center text-gray-600 mb-8">
          {correctAnswers === totalQuestions
            ? "Excellent! You've correctly formed all sentences, showing perfect understanding of sentence structure and word placement."
            : `While you correctly formed ${correctAnswers} out of ${totalQuestions} sentences, there are areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness.`}
        </p>

        <div className="space-y-6 w-full">
          {userAnswers.map((answer, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">
                  {index + 1}/{totalQuestions}
                </span>
                {answer.isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>

              <div className="mb-2">
                <h3 className="font-medium">Prompt</h3>
                <p className="text-gray-700">{formatQuestionWithBlanks(answer.question)}</p>
              </div>

              {!answer.isCorrect && (
                <div className="mb-2">
                  <h3 className="font-medium text-red-500">Your response</h3>
                  <p className="text-gray-700">{formatQuestionWithAnswers(answer.question, answer.userAnswer)}</p>
                </div>
              )}

              <div>
                <h3 className="font-medium text-green-500">{answer.isCorrect ? "Your response" : "Correct"}</h3>
                <p className="text-gray-700">{formatQuestionWithAnswers(answer.question, answer.correctAnswer)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 w-full max-w-xs">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Go to Dashboard</Button>
        </div>
      </div>
    </div>
  )
}

// Helper function to format the question with blanks
function formatQuestionWithBlanks(question: string): string {
  return question.replace(/____________/g, "_______")
}

// Helper function to format the question with answers
function formatQuestionWithAnswers(question: string, answers: string[]): string {
  let formattedQuestion = question
  let answerIndex = 0

  formattedQuestion = formattedQuestion.replace(/____________/g, () => {
    const answer = answers[answerIndex]
    answerIndex++
    return answer
  })

  return formattedQuestion
}
