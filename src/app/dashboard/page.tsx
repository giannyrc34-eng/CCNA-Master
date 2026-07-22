import { getSupabaseServer } from "../../lib/supabase-server";
import { getUserRole } from "../../lib/getRole";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {
  const supabaseServer = await getSupabaseServer();

  // Get the currently logged-in user
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  // Get the user's role
  let role = "guest";

  if (user) {
    const dbRole = await getUserRole(user.id);

    console.log("Database role:", dbRole);

    role = dbRole ?? "viewer";
  }

  // Load lessons
  const { data: lessons } = await supabaseServer
    .from("lessons")
    .select("*");

  // Load progress for logged-in users
  let progress: any[] = [];

  if (user) {
    const { data } = await supabaseServer
      .from("progress")
      .select("*")
      .eq("user_id", user.id);

    progress = data ?? [];
  }

  // Calculate progress
  const totalLessons = lessons?.length || 0;
  const completedLessons = progress.length;

  const progressPercent =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  // Find completed lessons
  const completedLessonIds =
    progress.map((p) => p.lesson_id) || [];

  // Find the next lesson
  const nextLesson = lessons?.find(
    (lesson) => !completedLessonIds.includes(lesson.id)
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            CCNA Master
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Dashboard
          </h1>

          <p className="mt-3 text-slate-400">
            Track your progress and continue building your networking skills.
          </p>
        </div>

        {/* Hero Banner */}
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
          <Image
            src="/banner.jpg"
            alt="Networking"
            width={1200}
            height={400}
            className="h-72 w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 sm:px-12">

              <div className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                🚀 Keep Learning
              </div>

              <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-5xl">
                Welcome Back,
                <span className="block text-cyan-400">
                  Network Engineer!
                </span>
              </h2>

              <p className="mt-4 text-lg text-slate-300">
                Learn. Practice. Certify.
              </p>
            </div>
          </div>
        </div>

        {/* User Role */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

          <p className="text-sm text-slate-400">
            Account type:
            <span className="ml-2 font-semibold capitalize text-white">
              {role}
            </span>
          </p>
        </div>

        {/* Guest Message */}
        {!user && (
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-yellow-300">
                👋 You're browsing as a guest
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Create an account or log in to save your progress and
                take quizzes.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/login"
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-500/50 hover:bg-slate-800"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Register
              </Link>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Lessons */}
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl transition hover:-translate-y-1 hover:border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Total Lessons
                </p>

                <p className="mt-3 text-4xl font-bold text-white">
                  {totalLessons}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">
                📚
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Lessons available in your CCNA learning path
            </p>
          </div>

          {/* Completed Lessons */}
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl transition hover:-translate-y-1 hover:border-emerald-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Completed Lessons
                </p>

                <p className="mt-3 text-4xl font-bold text-white">
                  {completedLessons}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
                ✓
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Lessons you've successfully completed
            </p>
          </div>

          {/* Progress */}
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl transition hover:-translate-y-1 hover:border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Overall Progress
                </p>

                <p className="mt-3 text-4xl font-bold text-white">
                  {progressPercent}%
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                📊
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Your current progress through the course
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Your Learning Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>

            <span className="text-2xl font-bold text-cyan-400">
              {progressPercent}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20 transition-all duration-700"
              style={{
                width: `${progressPercent}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-600">
            <span>Start</span>
            <span>CCNA Mastery</span>
          </div>
        </div>

        {/* Continue Learning */}
        {user && nextLesson && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="mb-3 inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Continue Learning
                </div>

                <h2 className="text-2xl font-bold">
                  Ready for your next lesson?
                </h2>

                <p className="mt-2 text-slate-400">
                  Continue your CCNA journey and keep building your
                  networking knowledge.
                </p>
              </div>

              <Link
                href={`/lessons/${nextLesson.id}`}
                className="whitespace-nowrap rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-400"
              >
                Continue Learning →
              </Link>
            </div>
          </div>
        )}

        {/* Course Complete */}
        {user && progressPercent === 100 && (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
            <div className="text-5xl">
              🎉
            </div>

            <h2 className="mt-4 text-3xl font-bold text-emerald-400">
              Course Complete!
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Congratulations on completing the CCNA Master Course.
              You've completed every lesson in your learning path.
            </p>
          </div>
        )}

        {/* Learning Path */}
        <div className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Your Learning Path
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Build your knowledge from fundamentals to advanced concepts.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Network Fundamentals */}
            <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                ✓
              </div>

              <h3 className="font-bold">
                Network Fundamentals
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Build your foundation in networking concepts.
              </p>
            </div>

            {/* IP Connectivity */}
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                →
              </div>

              <h3 className="font-bold">
                IP Connectivity
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Learn routing, IP addressing, and connectivity.
              </p>
            </div>

            {/* Security */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                🔒
              </div>

              <h3 className="font-bold">
                Security Fundamentals
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Learn essential network security concepts.
              </p>
            </div>

            {/* Automation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                ⚙️
              </div>

              <h3 className="font-bold">
                Automation
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Explore automation and network programmability.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}