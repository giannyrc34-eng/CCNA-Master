"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddQuizPage() {
  const [lessonId, setLessonId] =
    useState("");

  const [question, setQuestion] =
    useState("");

  const [optionA, setOptionA] =
    useState("");

  const [optionB, setOptionB] =
    useState("");

  const [optionC, setOptionC] =
    useState("");

  const [optionD, setOptionD] =
    useState("");

  const [correctAnswer, setCorrectAnswer] =
    useState("");

  const handleSubmit = async () => {
    const { error } = await supabase
      .from("quizzes")
      .insert([
        {
          lesson_id: Number(lessonId),
          question,
          option_a: optionA,
          option_b: optionB,
          option_c: optionC,
          option_d: optionD,
          correct_answer: correctAnswer,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Quiz added!");
    }
  };

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">
        Add Quiz Question
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Lesson ID"
        value={lessonId}
        onChange={(e) =>
          setLessonId(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Question"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Option A"
        value={optionA}
        onChange={(e) =>
          setOptionA(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Option B"
        value={optionB}
        onChange={(e) =>
          setOptionB(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Option C"
        value={optionC}
        onChange={(e) =>
          setOptionC(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Option D"
        value={optionD}
        onChange={(e) =>
          setOptionD(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) =>
          setCorrectAnswer(e.target.value)
        }
      />

      <button
        onClick={handleSubmit}
        className="rounded bg-green-600 px-6 py-3 text-white"
      >
        Add Question
      </button>
    </div>
  );
}