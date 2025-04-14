"use client"

import { useState, useEffect } from "react"
import StartScreen from "@/components/start-screen"
import QuestionScreen from "@/components/question-screen"
import ResultsScreen from "@/components/results-screen"
import type { UserAnswer } from "@/lib/types"

// Normally we would fetch this from an API, but for this example I'm using the provided data
import questionsData from "@/lib/questions-data"

export default function SentenceConstruction() {
  const [screen, setScreen] = useState<"start" | "question" | "results">("start")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerActive, setTimerActive] = useState(false)

  const questions = questionsData.data.questions
  const totalQuestions = questions.length

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timerActive && timeLeft === 0) {
      handleNextQuestion()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timerActive, timeLeft])

  const startQuiz = () => {
    setScreen("question")
    setTimerActive(true)
  }

  const handleAnswerSubmit = (selectedWords: string[]) => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentQuestion.correctAnswer)

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.questionId,
        question: currentQuestion.question,
        userAnswer: selectedWords,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ])

    handleNextQuestion()
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setTimeLeft(30)
    } else {
      setTimerActive(false)
      setScreen("results")
    }
  }

  const calculateScore = () => {
    const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length
    return (correctAnswers / totalQuestions) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md flex flex-col min-h-screen">
        {screen === "start" && <StartScreen totalQuestions={totalQuestions} timePerQuestion={30} onStart={startQuiz} />}

        {screen === "question" && (
          <QuestionScreen
            question={questions[currentQuestionIndex]}
            timeLeft={timeLeft}
            onSubmit={handleAnswerSubmit}
            onTimeUp={handleNextQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />
        )}

        {screen === "results" && (
          <ResultsScreen score={calculateScore()} userAnswers={userAnswers} totalQuestions={totalQuestions} />
        )}
      </div>
    </div>
  )
}
