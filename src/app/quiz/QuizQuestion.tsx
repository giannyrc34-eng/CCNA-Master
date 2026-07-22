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
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (selected === correctAnswer) {
      setResult("✅ Correct!");
      onAnswer(true);
    } else {
      setResult(
        `❌ Incorrect. Correct Answer: ${correctAnswer}`
      );
      onAnswer(false);
    }
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      <h2 className="mb-6 text-xl font-bold text-white">
        {question}
      </h2>

      <div className="space-y-3">

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 p-3 text-slate-300 transition hover:border-cyan-400">
          <input
            type="radio"
            name={question}
            value={optionA}
            onChange={(e) =>
              setSelected(e.target.value)
            }
          />
          {optionA}
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 p-3 text-slate-300 transition hover:border-cyan-400">
          <input
            type="radio"
            name={question}
            value={optionB}
            onChange={(e) =>
              setSelected(e.target.value)
            }
          />
          {optionB}
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 p-3 text-slate-300 transition hover:border-cyan-400">
          <input
            type="radio"
            name={question}
            value={optionC}
            onChange={(e) =>
              setSelected(e.target.value)
            }
          />
          {optionC}
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 p-3 text-slate-300 transition hover:border-cyan-400">
          <input
            type="radio"
            name={question}
            value={optionD}
            onChange={(e) =>
              setSelected(e.target.value)
            }
          />
          {optionD}
        </label>

      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Submit Answer
      </button>

      {result && (
        <p className="mt-4 font-bold text-white">
          {result}
        </p>
      )}

    </div>
  );
}