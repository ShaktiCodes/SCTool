"use client"

import { Button } from "@/components/ui/button"
import { AlignJustify, MoreVertical } from "lucide-react"

interface StartScreenProps {
  totalQuestions: number
  timePerQuestion: number
  onStart: () => void
}

export default function StartScreen({ totalQuestions, timePerQuestion, onStart }: StartScreenProps) {
  return (
    <div className="w-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="w-8"></div> {/* Empty space for alignment */}
        <h1 className="text-lg font-medium text-gray-800">Sentence Construction</h1>
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="mb-6">
          <AlignJustify className="h-12 w-12 text-gray-500 rotate-45" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">Sentence Construction</h2>

        <p className="text-center text-gray-600 mb-12 max-w-xs">
          Select the correct words to complete the sentence by arranging the provided options in the right order.
        </p>

        <div className="grid grid-cols-3 w-full gap-4 mb-12">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-1">Time Per Question</p>
            <p className="font-medium">{timePerQuestion} sec</p>
          </div>

          <div className="flex flex-col items-center border-l border-r">
            <p className="text-sm text-gray-500 mb-1">Total Questions</p>
            <p className="font-medium">{totalQuestions}</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-1">Coins</p>
            <div className="flex items-center">
              <div className="h-4 w-4 bg-yellow-400 rounded-full mr-1"></div>
              <p className="font-medium">0</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-xs">
          <Button variant="outline" className="flex-1 rounded-md border-gray-300 text-gray-700">
            Back
          </Button>
          <Button onClick={onStart} className="flex-1 rounded-md bg-indigo-600 hover:bg-indigo-700">
            Start
          </Button>
        </div>
      </div>
    </div>
  )
}
