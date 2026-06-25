"use client";

import { useState } from "react";

export default function QuizContainer({
  quizzes,
}: {
  quizzes: any[];
}) {
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (
    answer: string,
    correct: string
  ) => {
    if (answer === correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleFinish = () => {
    setSubmitted(true);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">
        Quiz
      </h2>

      {quizzes.map((quiz) => (
        <QuestionCard
          key={quiz.id}
          quiz={quiz}
          onAnswer={handleAnswer}
        />
      ))}

      <button
        onClick={handleFinish}
        className="mt-6 rounded bg-green-600 px-4 py-2 text-white"
      >
        Finish Quiz
      </button>

      {submitted && (
        <div className="mt-6 rounded border p-4">
          <h2 className="text-2xl font-bold">
            Score
          </h2>

          <p>
            {score} / {quizzes.length}
          </p>

          <p>
            {Math.round(
              (score / quizzes.length) * 100
            )}
            %
          </p>
        </div>
      )}
    </div>
  );
}