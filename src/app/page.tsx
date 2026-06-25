import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold">
        CCNA Master
      </h1>

      <p className="mt-4">
        Learn networking concepts, track progress,
        and test your knowledge with quizzes.
      </p>

      <Link
        href="/dashboard"
        className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-white"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}