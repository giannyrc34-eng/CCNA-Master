import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 border-b p-4">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/lessons">Lessons</Link>
      <Link href="/quiz">Quiz</Link>
      <Link href="/results">Results</Link>
      <Link href="/api">AI Tutor</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </nav>
  );
}
