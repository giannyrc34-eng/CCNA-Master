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
    <nav className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-4">
      <Link
        href="/"
        className="text-2xl font-bold text-cyan-400"
      >
        CCNA Master
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/dashboard">Dashboard</Link>

        <Link href="/lessons">Lessons</Link>

        <Link href="/quiz">Quiz</Link>

        <Link href="/results">Results</Link>

        <Link href="/api">AI Tutor</Link>

        {!user ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            {role === "admin" && (
              <Link
                href="/admin"
                className="font-semibold text-red-400"
              >
                Admin Panel
              </Link>
            )}

            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}