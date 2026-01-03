"use client";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    
    <>
      <nav className="bg-white h-16 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-full flex justify-between items-center px-4">
          
          
          <div className="h-full flex items-center">
            <div className="h-10 bg-white rounded-xl px-4 flex items-center overflow-hidden">
              <img
                src="/images/logo.png"
                alt="Fledge Logo"
                className="h-full w-auto object-contain scale-100"
              />
            </div>
          </div>

          <div className="space-x-6 font-semibold text-slate-800">
            <a href="#home" className="hover:text-amber-600 transition">Home</a>
            <a href="#about" className="hover:text-amber-600 transition">About Us</a>
            <a href="#features" className="hover:text-amber-600 transition">Features</a>
            <a href="#contact" className="hover:text-amber-600 transition">Contact</a>
          </div>

        </div>
      </nav>

      
      <div className="absolute top-20 right-6 z-40">
      
        <button
        onClick={() => router.push("/login")}
          className="px-10 py-3 rounded-xl text-lg font-semibold
          text-gray-900 border-2 
          hover:bg-amber-600 hover:text-white hover:scale-105
          transition duration-300 border-gray-400"
        >
          My Account
        </button>
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

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-0">
      
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

      
      <div id="about" className="bg-white py-20 px-4 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">About Fledge</h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg">
          Fledge is designed to simplify quiz creation for students, educators, and professionals.
          Build interactive quizzes quickly, share them easily, and analyze results efficiently.
        </p>
      </div>

      <footer id="contact" className="bg-slate-900 text-slate-300 text-center py-8 mt-20">
        <p>© 2025 Fledge — Smart Quiz Builder</p>
      </footer>
    </>
  );
}
