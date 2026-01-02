"use client";
import Image from "next/image";

export default function ForgotPassword() {
    return(
        <>
        <div className="bg-white min-h-screen flex flex-col mt-10 mb-10">
        <div className=" flex items-center justify-center px-4">
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

    
      <form method="POST" action="/reset-password" className="space-y-5">

        
        <div>
          <label className="block text-slate-700 font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none  border-slate-300"
          />
        </div>

        
        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            CNIC
          </label>
          <input
            type="text"
            name="cnic"
            required
            placeholder="CNIC Number"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none  border-slate-300"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            New Password
          </label>
          <input
            type="password"
            name="new_password"
            required
            placeholder="Enter new password"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none  border-slate-300"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            required
            placeholder="Re-enter new password"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none  border-slate-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-3 rounded-xl font-semibold text-lg
                 hover:bg-amber-700 transition shadow-md">
          Update Password
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
    )
}