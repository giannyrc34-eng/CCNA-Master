"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/network-bg.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/80" />

      {/* Background Glow Effects */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-2xl border border-slate-700/70 bg-slate-950/85 p-8 shadow-2xl backdrop-blur-xl">

          {/* Logo */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10">
              <span className="text-3xl font-bold text-cyan-400">
                C
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              Create Your Account
            </h1>

            <p className="mt-2 text-slate-400">
              Start your journey toward becoming a network engineer
            </p>

          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Address
            </label>

            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
            onClick={handleRegister}
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              Sign in
            </Link>
          </div>

        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-center text-xs text-slate-500">
          CCNA Master • Learn. Practice. Certify.
        </p>

      </div>
    </div>
  );
}