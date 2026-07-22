"use client";

import { useState } from "react";

type QuizQuestionProps = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
};

export default function QuizQuestion({
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  correctAnswer,
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState("");
  const [answered, setAnswered] = useState(false);

  const options = [
    optionA,
    optionB,
    optionC,
    optionD,
  ];

  const handleSubmit = () => {
    if (!selected || answered) return;

    const isCorrect = selected === correctAnswer;

    setAnswered(true);

    onAnswer(isCorrect);
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
      <h2 className="mb-8 text-2xl font-bold text-white">
        {question}
      </h2>

      <div className="space-y-4">
        {options.map((option, index) => {
          const letter = String.fromCharCode(65 + index);

          const isSelected = selected === option;

          const isCorrectAnswer =
            answered && option === correctAnswer;

          const isWrongAnswer =
            answered &&
            isSelected &&
            option !== correctAnswer;

          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => setSelected(option)}
              className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                isCorrectAnswer
                  ? "border-green-500 bg-green-500/20"
                  : isWrongAnswer
                  ? "border-red-500 bg-red-500/20"
                  : isSelected
                  ? "border-cyan-400 bg-cyan-500/20"
                  : "border-slate-700 bg-slate-800 hover:border-cyan-400"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-bold">
                {letter}
              </span>

              <span className="text-white">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="mt-8 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Check Answer
        </button>
      )}

      {answered && (
        <div className="mt-6">
          {selected === correctAnswer ? (
            <p className="font-semibold text-green-400">
              ✅ Correct! Great job.
            </p>
          ) : (
            <p className="font-semibold text-red-400">
              ❌ Incorrect. The correct answer is:{" "}
              {correctAnswer}
            </p>
          )}

          <button
            onClick={() =>
              onAnswer(selected === correctAnswer)
            }
            className="mt-4 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
}