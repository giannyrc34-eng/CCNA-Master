import { getSupabaseServer } from "../../lib/supabase-server";
import QuizClient from "./QuizClient";

export default async function QuizPage() {
  const supabaseServer = await getSupabaseServer();
  const { data: quizzes, error } = await supabaseServer
    .from("quizzes")
    .select("*");

  console.log("QUIZZES:", JSON.stringify(quizzes, null, 2));

  if (error) {
    return (
      <div className="p-10">
        Error loading quiz
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="mb-8 text-4xl font-bold">
        CCNA Quiz
      </h1>

      <QuizClient quizzes={quizzes || []} />
    </div>
  );
}