"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created Successfully!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-96 space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>

        <input
          className="w-full border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full rounded bg-green-500 p-2 text-white"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}