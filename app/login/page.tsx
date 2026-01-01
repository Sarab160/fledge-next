"use client";
import image from 'next/image';
export default function LoginPage() {
    return(
        <>
        <div className="bg-white min-h-screen flex items-center justify-center font-sans mt-10 mb-10">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 ">

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

<form className="space-y-5">


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


  <div className="flex justify-between items-center text-sm">
    <label className="flex items-center gap-2 text-slate-600">
      <input type="checkbox" className="accent-amber-500"/>
      Remember me
    </label>
    <a href="#" className="text-amber-600 hover:underline">
      Forgot password?
    </a>
  </div>


  <button
    type="submit"
    className="w-full bg-amber-600 text-white py-3 rounded-xl
           font-semibold text-lg
           hover:bg-amber-700 transition shadow-md">
    Login
  </button>

</form>


<p className="text-center text-slate-600 mt-6">
  Don’t have an account?
  <a href="#" className="text-amber-600 font-semibold hover:underline">
    Sign up
  </a>
</p>

</div>
        </div>
        </>
    )
}