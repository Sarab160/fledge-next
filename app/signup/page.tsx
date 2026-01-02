"use client";
import Image from "next/image";

export default function SignupPage() {

    return(
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

    <form className="space-y-5">

      <div>
        <label className="block text-slate-700 font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-xl border border-slate-300
                 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

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
        />

      </div>
      <div>
        <label className="block text-slate-700 font-medium mb-1">
        CNIC Number
        </label>
        <input
          type="number"
          placeholder="CNIC Number"
          className="w-full px-4 py-3 rounded-xl border border-slate-300
                 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
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
        />
      </div>

      <div>
        <label className="block text-slate-700 font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border border-slate-300
                 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-3 rounded-xl
               font-semibold text-lg
               hover:bg-amber-700 transition shadow-md">
        Sign Up
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
    )
}