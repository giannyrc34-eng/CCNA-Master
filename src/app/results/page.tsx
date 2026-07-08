import { getSupabaseServer } from "../../lib/supabase-server";

export default async function ResultsPage() {
  const supabaseServer = await getSupabaseServer();
  const { data: results, error } =
    await supabaseServer
      .from("quiz_results")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    return (
      <div className="p-10">
        Error loading results
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="mb-8 text-4xl font-bold">
        Quiz History
      </h1>

      <div className="space-y-4">
        {results?.map((result) => (
          <div
            key={result.id}
            className="rounded border p-4"
          >
            <h2 className="font-bold">
              Score:
              {" "}
              {result.score}
              {" / "}
              {result.total_questions}
            </h2>

            <p>
              Percentage:
              {" "}
              {Math.round(
                (result.score /
                  result.total_questions) *
                  100
              )}
              %
            </p>

            <p className="text-sm text-gray-500">
              {new Date(
                result.created_at
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}