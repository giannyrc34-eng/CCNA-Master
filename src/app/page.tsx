import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">

          {/* Hero Text */}
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
              🚀 Your Path to CCNA Certification
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Master
              <span className="block text-cyan-400">
                Networking.
              </span>
              Build Your Future.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              CCNA Master is your interactive platform for learning
              networking concepts, practicing your skills, tracking your
              progress, and preparing for your CCNA certification.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/dashboard"
                className="rounded-xl bg-cyan-500 px-7 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-400"
              >
                Start Learning →
              </Link>

              <Link
                href="/lessons"
                className="rounded-xl border border-slate-700 bg-slate-900 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-slate-800"
              >
                Explore Lessons
              </Link>

            </div>

            {/* Quick Stats */}
            <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-800 pt-8">

              <div>
                <p className="text-2xl font-bold text-white">
                  CCNA
                </p>
                <p className="text-sm text-slate-500">
                  Focused Learning
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  24/7
                </p>
                <p className="text-sm text-slate-500">
                  Learn Anytime
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  🎯
                </p>
                <p className="text-sm text-slate-500">
                  Track Your Progress
                </p>
              </div>

            </div>
          </div>

          {/* Network Visualization Card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-cyan-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">

              {/* Top Bar */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-400">
                    CCNA MASTER
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Your Learning Journey
                  </h2>
                </div>

                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Progress */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Course Progress
                  </span>

                  <span className="font-semibold text-cyan-400">
                    Keep Going!
                  </span>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  Build your knowledge one lesson at a time.
                </p>
              </div>

              {/* Learning Path */}
              <div className="mt-5 space-y-3">

                <div className="flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    ✓
                  </div>

                  <div>
                    <p className="font-semibold">
                      Network Fundamentals
                    </p>

                    <p className="text-sm text-slate-500">
                      Foundation completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                    →
                  </div>

                  <div>
                    <p className="font-semibold">
                      IP Connectivity
                    </p>

                    <p className="text-sm text-cyan-400">
                      Continue learning
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                    3
                  </div>

                  <div>
                    <p className="font-semibold text-slate-400">
                      Security Fundamentals
                    </p>

                    <p className="text-sm text-slate-600">
                      Coming next
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-widest text-cyan-400">
              Everything You Need
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Build Your Networking Skills
            </h2>

            <p className="mt-4 text-slate-400">
              Learn the concepts, practice your knowledge, and monitor
              your progress as you work toward your networking goals.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {/* Lessons */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">
                📚
              </div>

              <h3 className="text-xl font-bold">
                Lessons
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Study networking concepts through structured CCNA
                lessons designed to help you build a strong foundation.
              </p>
            </div>

            {/* Quizzes */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                🧠
              </div>

              <h3 className="text-xl font-bold">
                Quizzes
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Test your knowledge with quizzes and identify areas
                where you can improve.
              </p>
            </div>

            {/* Progress */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
                📊
              </div>

              <h3 className="text-xl font-bold">
                Track Progress
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Keep track of completed lessons and see how far you've
                progressed through your CCNA journey.
              </p>
            </div>

            {/* AI Tutor */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                🤖
              </div>

              <h3 className="text-xl font-bold">
                AI Tutor
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Get additional help understanding networking concepts
                and strengthen your knowledge.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">

          <h2 className="text-4xl font-bold sm:text-5xl">
            Ready to Master Networking?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Start learning today and take the next step toward your
            networking career.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-400"
          >
            Start Your CCNA Journey →
          </Link>

        </div>
      </section>

    </main>
  );
}