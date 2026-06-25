import { supabaseServer } from "./supabase-server";

export async function getUserRole(
  userId: string
) {
  const { data } = await supabaseServer
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  return data?.role;
}