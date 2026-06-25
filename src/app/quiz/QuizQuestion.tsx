"use client";

import { useState } from "react";

export default function QuizQuestion({
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  correctAnswer,
  onCorrect,
}: {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  onCorrect: () => void;
}) {
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (selected === correctAnswer) {
  setResult("✅ Correct!");
  onCorrect();
} else {
      setResult(
        `❌ Incorrect. Correct Answer: ${correctAnswer}`
      );
    }
  };

  return (
    <div className="mb-8 rounded border p-4">
      <h2 className="mb-4 text-xl font-bold">
        {question}
      </h2>

      <div className="space-y-2">
        <label className="block">
          <input
            type="radio"
            name={question}
            value={optionA}
            onChange={(e) =>
              setSelected(e.target.value)
            }
          />
          {" "}
          {optionA}
        </label>

        <label className="block">
          <input
            type="radio"
            name={question}
            value={optionB}
            onChange={(e) =>
              setSelected(e.target.value)
            }
          />
          {" "}
          {optionB}
        </label>

        <label className="block">
          <input
            type="radio"
            name={question}
            value={optionC}
            onChange={(e) =>
              setSelected(e.target.value)
            }
          />
          {" "}
          {optionC}
        </label>

        <label className="block">
          <input
            type="radio"
            name={question}
            value={optionD}
            onChange={(e) =>
              setSelected(e.target.value)
            }
          />
          {" "}
          {optionD}
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="rounded-lg bg-cyan-500 px-6 py-3 text-white transition hover:bg-cyan-600"
      >
        Submit Answer
      </button>

      {result && (
        <p className="mt-4 font-bold">
          {result}
        </p>
      )}
    </div>
  );
}