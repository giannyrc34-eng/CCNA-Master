import Link from "next/link";
import { getSupabaseServer } from "../lib/supabase-server";
import { getUserRole } from "../lib/getRole";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const supabase = await getSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role = "guest";

  if (user) {
    role = (await getUserRole(user.id)) ?? "viewer";
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 ring-1 ring-cyan-500/30 transition group-hover:bg-cyan-500/20">
            <span className="text-xl font-bold text-cyan-400">
              C
            </span>
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            CCNA <span className="text-cyan-400">Master</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">

          <Link
            href="/dashboard"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            Dashboard
          </Link>

          <Link
            href="/lessons"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            Lessons
          </Link>

          <Link
            href="/quiz"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            Quiz
          </Link>

          <Link
            href="/results"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            Results
          </Link>

          <Link
            href="/api"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            AI Tutor
          </Link>

          {/* Keep your original authentication logic */}
          {!user ? (
            <>
              <Link
                href="/login"
                className="ml-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Admin Panel only appears for admins */}
              {role === "admin" && (
                <Link
                  href="/admin"
                  className="ml-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:border-red-500/50 hover:bg-red-500/20"
                >
                  Admin Panel
                </Link>
              )}

              {/* Logout appears for all logged-in users */}
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}