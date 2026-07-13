import { getSupabaseServer } from "../../lib/supabase-server";
import { getUserRole } from "../../lib/getRole";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {
  const supabaseServer = await getSupabaseServer();

  // Get the currently logged-in user (if any)
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  // Default role for visitors
  let role = "guest";

  // If logged in, get the user's role
  if (user) {
    role = (await getUserRole(user.id)) ?? "viewer";
  }

  // Load lessons
  const { data: lessons } = await supabaseServer
    .from("lessons")
    .select("*");

  // Only load progress if someone is logged in
  let progress: any[] = [];

  if (user) {
    const { data } = await supabaseServer
      .from("progress")
      .select("*")
      .eq("user_id", user.id);

    progress = data ?? [];
  }

  const totalLessons = lessons?.length || 0;
  const completedLessons = progress.length;

  const progressPercent =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  const completedLessonIds =
    progress.map((p) => p.lesson_id) || [];

  const nextLesson = lessons?.find(
    (lesson) => !completedLessonIds.includes(lesson.id)
  );

  return (
    <div className="p-10">
      <h1 className="mb-8 text-5xl font-bold text-cyan-400">
        CCNA Master Dashboard
      </h1>

      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <Image
          src="/banner.jpg"
          alt="Networking"
          width={1200}
          height={400}
          className="h-72 w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute left-10 top-1/2 -translate-y-1/2">
          <h2 className="text-5xl font-bold text-white">
            Welcome Back Network Engineer!
          </h2>

          <p className="mt-2 text-xl text-slate-200">
            Learn. Practice. Certify.
          </p>
        </div>
      </div>

      <p className="mb-6 text-gray-500">
        Role: <strong>{role}</strong>
      </p>

      {!user && (
        <div className="mb-6 rounded-lg border border-yellow-400 bg-yellow-100 p-4 text-black">
          👋 You are browsing as a guest. Create an account or log in to save
          your progress and take quizzes.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
          <h2>Total Lessons</h2>
          <p className="text-3xl font-bold">{totalLessons}</p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
          <h2>Completed Lessons</h2>
          <p className="text-3xl font-bold">{completedLessons}</p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
          <h2>Progress</h2>
          <p className="text-3xl font-bold">{progressPercent}%</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="h-5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
            style={{
              width: `${progressPercent}%`,
            }}
          />
        </div>
      </div>

      {user && nextLesson && (
        <div className="mt-8">
          <Link
            href={`/lessons/${nextLesson.id}`}
            className="rounded-lg bg-cyan-500 px-6 py-3 text-white transition hover:bg-cyan-600"
          >
            Continue Learning →
          </Link>
        </div>
      )}

      {user && progressPercent === 100 && (
        <div className="mt-8 rounded border p-6">
          <h2 className="text-2xl font-bold">
            🎉 Course Complete!
          </h2>

          <p>
            Congratulations on completing the CCNA Master Course.
          </p>
        </div>
      )}
    </div>
  );
}