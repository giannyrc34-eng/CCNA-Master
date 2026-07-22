"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import QuizQuestion from "./QuizQuestion";

type Quiz = {
  id: number;
  lesson_id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
};

export default function QuizClient({
  quizzes,
}: {
  quizzes: Quiz[];
}) {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  const [saving, setSaving] = useState(false);

  const quiz = quizzes[currentQuestion];

  const handleAnswer = async (isCorrect: boolean) => {
    const newScore = isCorrect
      ? score + 1
      : score;

    if (isCorrect) {
      setScore(newScore);
    }

    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    } else {
      setSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert(
          "Please log in to save your quiz results."
        );

        setSaving(false);
        setFinished(true);

        return;
      }

      const { error } = await supabase
        .from("quiz_results")
        .insert([
          {
            user_id: user.id,
            score: newScore,
            total_questions: quizzes.length,
          },
        ]);

      if (error) {
        alert(error.message);
      }

      setSaving(false);
      setFinished(true);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
  };

  if (!quizzes.length) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-8">
        <p className="text-slate-300">
          No quiz questions are available yet.
        </p>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round(
      (score / quizzes.length) * 100
    );

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-10 text-center shadow-xl">
        <div className="mb-6 text-6xl">
          🎉
        </div>

        <h2 className="mb-4 text-4xl font-bold text-white">
          Quiz Complete!
        </h2>

        <p className="mb-8 text-slate-400">
          Great job completing the CCNA Master quiz.
        </p>

        <div className="mb-8">
          <p className="text-6xl font-bold text-cyan-400">
            {percentage}%
          </p>

          <p className="mt-2 text-xl text-slate-300">
            {score} / {quizzes.length} correct
          </p>
        </div>

        {saving && (
          <p className="mb-4 text-slate-400">
            Saving your results...
          </p>
        )}

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleRetake}
            className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Retake Quiz
          </button>

          <button
            onClick={() => router.push("/results")}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  const progress =
    ((currentQuestion + 1) /
      quizzes.length) *
    100;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Quiz Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-semibold text-cyan-400">
            Question {currentQuestion + 1} of{" "}
            {quizzes.length}
          </p>

          <p className="text-slate-400">
            Score: {score}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Current Question */}
      <QuizQuestion
        key={quiz.id}
        question={quiz.question}
        optionA={quiz.option_a}
        optionB={quiz.option_b}
        optionC={quiz.option_c}
        optionD={quiz.option_d}
        correctAnswer={quiz.correct_answer}
        onAnswer={handleAnswer}
      />
    </div>
  );
}