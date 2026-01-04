"use client";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";


const supabaseClient = createClient(
  "https://pggziclodmxhtjntyqmp.supabase.co",
  "sb_publishable_jpz5Awk-U9kX1WyNLMPBiQ_0FDKvXC1"
);

export default function HomePage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; cnic: string } | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  // Check login state on mount
  useEffect(() => {
    const email = localStorage.getItem("loggedInEmail");
    if (email) {
      setLoggedIn(true);
      fetchUser(email);
    }
  }, []);

  // Fetch user info from Supabase
  const fetchUser = async (email: string) => {
    const { data } = await supabaseClient
      .from("app_users")
      .select("email, cnic")
      .eq("email", email)
      .single();
    if (data) setUser({ email: data.email, cnic: data.cnic });
  };

  // Logout
  


  const handleuserLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setPanelOpen(false);
    localStorage.removeItem("loggedInEmail");
    router.push("/login");
  };

  return (
    
    <>
     <nav className="bg-white h-16 shadow-md sticky top-0 z-50">
  <div className="max-w-6xl mx-auto h-full grid grid-cols-3 items-center px-4">

    {/* Left Logo */}
    <div className="flex items-center">
      <div className="h-10 bg-white rounded-xl px-4 flex items-center overflow-hidden">
        <img
          src="/images/logo.png"
          alt="Fledge Logo"
          className="h-full w-auto object-contain"
        />
      </div>
    </div>

    {/* Center Animated FLEDGE */}
    <div className="flex justify-center relative">
      <div className="relative flex items-center font-extrabold text-2xl tracking-widest text-slate-900">
        <span className="letter">F</span>
        <span className="letter">L</span>
        <span className="letter">E</span>
        <span className="letter">D</span>
        <span className="letter">G</span>
        <span className="letter">E</span>

        {/* Arrow */}
        <span className="arrow">➤</span>
      </div>
    </div>

    {/* Right Links */}
    <div className="space-x-6 font-semibold text-slate-800 text-right">
      <a href="/" className="hover:text-amber-600 transition">Home</a>
      <a href="#about" className="hover:text-amber-600 transition">About Us</a>
      <a href="#features" className="hover:text-amber-600 transition">Features</a>
      <a href="#contact" className="hover:text-amber-600 transition">Contact</a>
    </div>

  </div>
</nav>


      
      <div className="absolute top-20 right-6 z-40">
        {!loggedIn ? (
          <button
            onClick={() => router.push("/login")}
            className="px-10 py-3 rounded-xl text-lg font-semibold
              text-gray-900 border-2 
              hover:bg-amber-600 hover:text-white hover:scale-105
              transition duration-300 border-gray-400"
          >
            My Account
          </button>
        ) : (
          <div className="relative">
            <div
              onClick={() => setPanelOpen(!panelOpen)}
              className="cursor-pointer w-12 h-6 mx-2 mt-2 mb-2 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-lg hover:scale-105 transition duration-300"
            >
              F
            </div>
            <span className="block text-center text-sm mt-1 text-gray-700">Your Account</span>

            {/* Side Panel */}
            <div
              className={`fixed top-0 right-0 h-60 w-64 bg-white shadow-2xl p-6 transition-transform duration-300 z-50 mt-30 ${
                panelOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Account Info</h3>
              {user ? (
                <div className="space-y-2">
                  <p><span className="font-semibold">Email:</span> {user.email}</p>
                  <p><span className="font-semibold">CNIC:</span> {user.cnic}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              <button
                onClick={handleuserLogout}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition"
              >
                Logout
              </button>
            </div>

            {/* Overlay to close panel */}
            {panelOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setPanelOpen(false)}
              ></div>
            )}
          </div>
        )}
      </div>
      {/* HERO */}
      <div id="home" className="relative h-screen bg-cover bg-center">
        <div className="absolute inset-0 bg-white/70 bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-8xl md:text-9xl font-extrabold text-slate-900 mb-4 float tracking-widest">
            FLEDGE
          </h1>
          <p className="text-2xl md:text-3xl text-emerald-600 font-semibold mb-6">
            Smart Quiz Builder
          </p>
          <p className="text-slate-700 max-w-3xl text-lg md:text-xl">
            Create interactive quizzes, set timers, mark correct answers, share instantly,
            and track performance — all in one platform.
          </p>
        </div>
      </div>

      <div id="features" className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-0">
      
      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-amber-200 max-w-md mx-auto">
        <img
          src="/images/quiz.jpg"
          alt="E-learning / Quiz"
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <div className="p-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
            Start a Quiz
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-4">
            Quickly design your quizzes. Select questions, mark correct answers,
            set quiz time, and share with students or friends instantly.
          </p>
          <button
          onClick={() => router.push("/quiz")}
            className="bg-amber-600 text-white px-10 py-3 md:px-12 md:py-4 rounded-xl
                       text-lg md:text-xl font-semibold
                       hover:bg-amber-700 hover:scale-105
                       transition"
          >
            Start Quiz
          </button>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-amber-200 max-w-md mx-auto">
        <img
          src="/images/pre.jpg"
          alt="Student Prediction"
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <div className="p-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
            Make a Prediction
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-4">
            Predict student performance based on study hours, attendance,
            past scores, and other details quickly and easily.
          </p>
          <button
          onClick={() => router.push("/prediction")}
            className="bg-amber-600 text-white px-10 py-3 md:px-12 md:py-4 rounded-xl
                       text-lg md:text-xl font-semibold
                       hover:bg-amber-700 hover:scale-105
                       transition"
          >
            Make Prediction
          </button>
        </div>
      </div>

    </div>

      
    <div id="about" className="bg-white py-20 px-6 text-center">
  <h2 className="text-4xl font-bold text-slate-900 mb-6">
    About Fledge
  </h2>

  <p className="max-w-4xl mx-auto text-slate-700 text-lg leading-relaxed">
    Fledge is a smart learning platform built to simplify quiz creation for students,
    educators, and professionals. Create interactive quizzes in minutes, share them
    effortlessly, analyze results instantly, and leverage AI-powered predictions to
    gain insights into student performance.
  </p>
</div>


      <footer id="contact" className="bg-slate-900 text-slate-300 text-center py-8 mt-20">
        <p>© 2025 Fledge — Smart Quiz Builder</p>
      </footer>
    </>
  );
}
