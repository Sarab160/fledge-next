"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Supabase client (inline)
const supabaseClient = createClient(
  "https://pggziclodmxhtjntyqmp.supabase.co",
  "sb_publishable_jpz5Awk-U9kX1WyNLMPBiQ_0FDKvXC1"
);

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(true); // default to persistent

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Check if email already exists
      const { data: existingUser } = await supabaseClient
        .from("app_users")
        .select("*")
        .eq("email", email)
        .single();

      if (existingUser) {
        setMessage("Email is already registered");
        setLoading(false);
        return;
      }

      // Insert new user
      const { error } = await supabaseClient
        .from("app_users")
        .insert({
          full_name: fullName,
          email,
          cnic,
          password
        });

      if (error) {
        setMessage("Failed to create account");
        console.error(error);
      } else {
        // ✅ Automatically log in the user after signup
        if (rememberMe) {
          localStorage.setItem("loggedInEmail", email); // persistent
        } else {
          sessionStorage.setItem("loggedInEmail", email); // session only
        }

        router.push("/"); // redirect to home page
      }

    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
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
            Create Account
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Join Fledge and start building smart quizzes
          </p>

          <form className="space-y-5" onSubmit={handleSignup}>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                CNIC Number
              </label>
              <input
                type="number"
                placeholder="CNIC Number"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <input
                type="checkbox"
                className="accent-amber-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Keep me logged in</span>
            </div>

            {message && (
              <p className={`text-sm ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-amber-700 transition shadow-md"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

          </form>

          <p className="text-center text-slate-600 mt-6">
            Already have an account?
            <a href="/login" className="text-amber-600 font-semibold hover:underline">
              Login
            </a>
          </p>

        </div>
      </div>
    </>
  );
}
