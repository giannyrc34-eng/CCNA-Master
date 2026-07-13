import { redirect } from "next/navigation";
import { getSupabaseServer } from "../../lib/supabase-server";
import { getUserRole } from "../../lib/getRole";

export default async function AdminPage() {
  const supabase = await getSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in? Go to login.
  if (!user) {
    redirect("/login");
  }

  // Get the user's role
  const role = await getUserRole(user.id);

  // Not an admin? Go back to dashboard.
  if (role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold text-red-500">
        Admin Panel
      </h1>

      <p className="mt-4">
        Welcome back, Admin!
      </p>
    </div>
  );
}