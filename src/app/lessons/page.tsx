
import { supabaseServer } from "../../lib/supabase-server";
import LessonSearch from "./LessonSearch";

export default async function Lessonspage() {
  const { data: lessons, error } =
    await supabaseServer
      .from("lessons")
      .select("*");

  const { data: progress } =
    await supabaseServer
      .from("progress")
      .select("lesson_id");

  const completedLessonIds =
    progress?.map((p) => p.lesson_id) || [];

  if (error) {
    return (
      <div className="p-10">
        Error loading lessons
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        CCNA Lessons
      </h1>

      <LessonSearch
        lessons={lessons || []}
        completedLessonIds={
          completedLessonIds
        }
      />
    </div>
  );
}