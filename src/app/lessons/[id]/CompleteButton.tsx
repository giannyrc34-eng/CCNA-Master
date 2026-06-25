"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CompleteButton({
  lessonId,
}: {
  lessonId: number;
}) {
  const handleComplete = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase
      .from("progress")
      .insert([
        {
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Progress saved!");
    }
  };

  return (
    <button
      onClick={handleComplete}
      className="mt-6 rounded bg-green-600 px-4 py-2 text-white"
    >
      Mark Complete
    </button>
  );
}