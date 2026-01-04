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

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // ✅ Correctly check if user exists with both email and CNIC
      const { data: user, error } = await supabaseClient
        .from("app_users")
        .select("*")
        .eq("email", email)
        .eq("cnic", cnic)
        .maybeSingle(); // returns null if not found instead of throwing error

      if (!user) {
        setMessage("No user found with this email and CNIC");
        setLoading(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabaseClient
        .from("app_users")
        .update({ password: newPassword })
        .eq("id", user.id);

      if (updateError) {
        setMessage("Failed to update password");
        console.error(updateError);
      } else {
        // ✅ Redirect to login page after successful password reset
        router.push("/login"); // ← redirect to your login page
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
      <div className="bg-white min-h-screen flex flex-col mt-10 mb-10">
        <div className="flex items-center justify-center px-4">
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">

            <div className="flex justify-center mb-6">
              <img src="/images/logo.png" alt="Fledge Logo" className="h-20 object-contain"/>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Reset Your Password
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Verify your identity and set a new password
            </p>

            <form className="space-y-5" onSubmit={handleResetPassword}>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none border-slate-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  CNIC
                </label>
                <input
                  type="text"
                  required
                  placeholder="CNIC Number"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none border-slate-300"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none border-slate-300"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none border-slate-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Remembered your password?
              <a href="/login" className="text-amber-600 font-semibold hover:underline">
                Back to Login
              </a>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
