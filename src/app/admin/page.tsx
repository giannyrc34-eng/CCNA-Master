import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="p-10">
      <h1 className="mb-8 text-4xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/add-lesson"
          className="rounded border p-6 hover:bg-gray-100"
        >
          <h2 className="text-2xl font-bold">
            Add Lesson
          </h2>

          <p>Create new CCNA lessons.</p>
        </Link>

        <Link
          href="/admin/add-quiz"
          className="rounded border p-6 hover:bg-gray-100"
        >
          <h2 className="text-2xl font-bold">
            Add Quiz
          </h2>

          <p>Add quiz questions.</p>
        </Link>
      </div>
    </div>
  );
}