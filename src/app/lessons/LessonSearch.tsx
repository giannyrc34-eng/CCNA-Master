"use client";

import Link from "next/link";
import { useState } from "react";

export default function LessonSearch({
  lessons,
  completedLessonIds,
}: {
  lessons: any[];
  completedLessonIds: number[];
}) {
  const [search, setSearch] = useState("");

  const filteredLessons = lessons.filter(
    (lesson) =>
      (
        lesson.title +
        " " +
        lesson.description +
        " " +
        lesson.content
      )
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search CCNA topics..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
      />

      <div className="space-y-4">
        {filteredLessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/lessons/${lesson.id}`}
          >
            <div className="cursor-pointer rounded-xl border border-slate-700 bg-slate-900 p-6 shadow transition hover:scale-105 hover:border-blue-500 hover:shadow-xl">
              <h2 className="text-xl font-bold">
                {completedLessonIds.includes(
                  lesson.id
                )
                  ? "✅ "
                  : "⬜ "}
                {lesson.title}
              </h2>

              <p>{lesson.description}</p>

              <p className="text-sm text-slate-400">
                {lesson.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
console.log("LessonSearch loaded");