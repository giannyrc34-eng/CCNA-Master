"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import QuizQuestion from "./QuizQuestion";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function QuizClient({
  quizzes,
}: {
  quizzes: any[];
}) {
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleCorrect = () => {
    setScore((prev) => prev + 1);
  };
const handleFinish = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    return;
  }

  const { error } = await supabase
    .from("quiz_results")
    .insert([
      {
        user_id: user.id,
        score: score,
        total_questions: quizzes.length,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  setFinished(true);
};

  return (
    <>
      <div className="mb-6 rounded border p-4">
        <h2 className="text-2xl font-bold">
          Current Score: {score}
        </h2>
      </div>

      {quizzes.map((quiz) => (
        <QuizQuestion
          key={quiz.id}
          question={quiz.question}
          optionA={quiz.option_a}
          optionB={quiz.option_b}
          optionC={quiz.option_c}
          optionD={quiz.option_d}
          correctAnswer={quiz.correct_answer}
          onCorrect={handleCorrect}
        />
      ))}
      <button
  onClick={handleFinish}
  className="rounded-lg bg-cyan-500 px-6 py-3 text-white transition hover:bg-cyan-600"
>
  Finish Quiz
</button>
{finished && (
  <div className="mt-6 rounded border p-4">
    <h2 className="text-2xl font-bold">
      Quiz Complete
    </h2>

    <p>
      Score: {score} / {quizzes.length}
    </p>

    <p>
      Percentage:
      {" "}
      {Math.round(
        (score / quizzes.length) * 100
      )}
      %
    </p>
  </div>
)}
    </>
  );
}