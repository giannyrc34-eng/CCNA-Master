"use client";

import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
    >
      Logout
    </button>
  );
}