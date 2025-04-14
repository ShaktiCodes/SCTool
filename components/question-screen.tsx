"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { QuestionData } from "@/lib/types"

interface QuestionScreenProps {
  question: QuestionData
  timeLeft: number
  questionNumber: number
  totalQuestions: number
  onSubmit: (selectedWords: string[]) => void
  onTimeUp: () => void
}

export default function QuestionScreen({
  question,
  timeLeft,
  questionNumber,
  totalQuestions,
  onSubmit,
  onTimeUp,
}: QuestionScreenProps) {
  const [selectedWords, setSelectedWords] = useState<(string | null)[]>([])
  const [availableOptions, setAvailableOptions] = useState<string[]>([])

  // Count the number of blanks in the question
  const blankCount = (question.question.match(/____________/g) || []).length

  // Initialize selected words array with nulls based on blank count
  useEffect(() => {
    setSelectedWords(Array(blankCount).fill(null))
    setAvailableOptions([...question.options])
  }, [question, blankCount])

  // Format the time as MM:SS
  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`
  }

  // Handle selecting a word
  const handleSelectWord = (word: string) => {
    const firstEmptyIndex = selectedWords.findIndex((w) => w === null)
    if (firstEmptyIndex !== -1) {
      const newSelectedWords = [...selectedWords]
      newSelectedWords[firstEmptyIndex] = word
      setSelectedWords(newSelectedWords)

      // Remove the word from available options
      setAvailableOptions(availableOptions.filter((w) => w !== word))
    }
  }

  // Handle removing a word from a blank
  const handleRemoveWord = (index: number) => {
    if (selectedWords[index] !== null) {
      // Add the word back to available options
      setAvailableOptions([...availableOptions, selectedWords[index] as string])

      // Remove the word from selected words
      const newSelectedWords = [...selectedWords]
      newSelectedWords[index] = null
      setSelectedWords(newSelectedWords)
    }
  }

  // Split the question into parts (text and blanks)
  const questionParts = question.question.split(/(____________)/g)

  // Check if all blanks are filled
  const allBlanksFilled = selectedWords.every((word) => word !== null)

  // Handle submitting the answer
  const handleSubmit = () => {
    if (allBlanksFilled) {
      onSubmit(selectedWords as string[])
    }
  }

  return (
    <div className="w-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="bg-indigo-100 px-3 py-1 rounded-full">
          <span className="text-indigo-600 font-medium">{formatTime(timeLeft)}</span>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-700">
          Quit
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-lg font-medium text-gray-800">Select the missing words in the correct order</h2>
        </div>

        <div className="space-y-6 flex-1">
          <div className="text-lg leading-relaxed">
            {questionParts.map((part, index) => {
              if (part === "____________") {
                const blankIndex = Math.floor(index / 2)
                return (
                  <span
                    key={index}
                    onClick={() => handleRemoveWord(blankIndex)}
                    className={`inline-block min-w-[120px] px-2 py-1 mx-1 border-b-2 text-center ${
                      selectedWords[blankIndex]
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 cursor-pointer"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedWords[blankIndex] || ""}
                  </span>
                )
              }
              return <span key={index}>{part}</span>
            })}
          </div>

          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {availableOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleSelectWord(option)}
                className="min-w-[120px] border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </div>
          <Button onClick={handleSubmit} disabled={!allBlanksFilled} className="bg-indigo-600 hover:bg-indigo-700">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
