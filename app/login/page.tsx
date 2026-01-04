"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase client (inline)
const supabaseClient = createClient(
  "https://pggziclodmxhtjntyqmp.supabase.co",
  "sb_publishable_jpz5Awk-U9kX1WyNLMPBiQ_0FDKvXC1"
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Check if user exists in app_users
      const { data: user, error } = await supabaseClient
        .from("app_users")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !user) {
        setErrorMsg("User not found");
        setLoading(false);
        return;
      }

      // Simple password check (plaintext)
      if (user.password !== password) {
        setErrorMsg("Incorrect password");
        setLoading(false);
        return;
      }

      // ✅ Login successful → store email based on Remember Me
      if (rememberMe) {
        localStorage.setItem("loggedInEmail", email); // persistent
      } else {
        sessionStorage.setItem("loggedInEmail", email); // session only
      }

      router.push("/"); // redirect to home page

    } catch (err) {
      setErrorMsg("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen flex items-center justify-center font-sans mt-10 mb-10">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-2xl p-4">
              <img
                src="/images/logo.png"
                alt="Fledge Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Login to continue building smart quizzes
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300
                       focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-300
                       focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm">{errorMsg}</p>
            )}

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="accent-amber-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="/forgot" className="text-amber-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 text-white py-3 rounded-xl
                     font-semibold text-lg
                     hover:bg-amber-700 transition shadow-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center text-slate-600 mt-6">
            Don’t have an account?
            <a href="/signup" className="text-amber-600 font-semibold hover:underline">
              Sign up
            </a>
          </p>

        </div>
      </div>
    </>
  );
}
