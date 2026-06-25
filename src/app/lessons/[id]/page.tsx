import { createClient } from "@supabase/supabase-js";
import CompleteButton from "./CompleteButton";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-bold">
        {lesson.title}
      </h1>

      <p className="mb-6 text-gray-400">
        {lesson.description}
      </p>

      <div className="whitespace-pre-wrap">
        {lesson.content}
      </div>
      <CompleteButton lessonId={lesson.id} />
    </div>
  );
}
