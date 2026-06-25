"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddLessonPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [category, setCategory] =
    useState("");
  const [content, setContent] =
    useState("");

  const handleSubmit = async () => {
    const { error } = await supabase
      .from("lessons")
      .insert([
        {
          title,
          description,
          category,
          content,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Lesson added!");
    }
  };

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">
        Add Lesson
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      />

      <textarea
        className="border p-2 w-full mb-4 h-64"
        placeholder="Lesson Content"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <button
        onClick={handleSubmit}
        className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        Add Lesson
      </button>
    </div>
  );
}