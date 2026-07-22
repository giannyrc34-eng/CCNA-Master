import { getSupabaseServer } from "../../lib/supabase-server";
import LessonSearch from "./LessonSearch";

export default async function LessonsPage() {
  const supabaseServer = await getSupabaseServer();

  // Get all lessons
  const { data: lessons, error } = await supabaseServer
    .from("lessons")
    .select("*")
    .order("id", { ascending: true });

  // Get completed lessons
  const { data: progress } = await supabaseServer
    .from("progress")
    .select("lesson_id");

  const completedLessonIds =
    progress?.map((p) => p.lesson_id) || [];

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
            <h1 className="text-xl font-bold text-red-400">
              Error Loading Lessons
            </h1>

            <p className="mt-2 text-slate-300">
              We were unable to load the CCNA lessons.
              Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6 md:p-10">

        {/* Page Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            CCNA Master
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            CCNA Lessons
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            Build your networking knowledge step by step.
            Study each lesson, complete the material, and
            track your progress toward your CCNA certification.
          </p>
        </div>

        {/* Lesson Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <p className="text-sm font-medium text-slate-400">
              Total Lessons
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {lessons?.length || 0}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <p className="text-sm font-medium text-slate-400">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-400">
              {completedLessonIds.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <p className="text-sm font-medium text-slate-400">
              Overall Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {lessons && lessons.length > 0
                ? Math.round(
                    (completedLessonIds.length /
                      lessons.length) *
                      100
                  )
                : 0}
              %
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold text-white">
              Course Progress
            </p>

            <p className="text-sm text-slate-400">
              {completedLessonIds.length} of{" "}
              {lessons?.length || 0} lessons
            </p>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
              style={{
                width: `${
                  lessons && lessons.length > 0
                    ? Math.min(
                        (completedLessonIds.length /
                          lessons.length) *
                          100,
                        100
                      )
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* Lessons */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Your Learning Path
            </h2>

            <p className="mt-2 text-slate-400">
              Select a lesson below to start learning.
            </p>
          </div>

          <LessonSearch
            lessons={lessons || []}
            completedLessonIds={completedLessonIds}
          />
        </div>

      </div>
    </main>
  );
}