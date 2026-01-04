"use client";

import { useEffect, useRef, useState } from "react";
// @ts-ignore
import QRCode from "qrcode";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabaseClient = createClient(
  "https://pggziclodmxhtjntyqmp.supabase.co",
  "sb_publishable_jpz5Awk-U9kX1WyNLMPBiQ_0FDKvXC1"
);

export default function QuizPage() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get("id");
  
    // If QR code scanned (means ?id= present)
    if (quizId) {
      quizIdRef.current = quizId;
  
      // Hide teacher section, show student name form
      teacherSectionRef.current?.classList.add("hidden");
      startQuizSectionRef.current?.classList.remove("hidden");
  
      // Load quiz details for timer, etc.
      supabaseClient
        .from("quizze")
        .select("*")
        .eq("id", quizId)
        .single()
        .then(({ data }) => {
          if (data) quizTimeRefValue.current = data.time;
        });
    }
  }, []);
  
  const quizNameRef = useRef<HTMLInputElement>(null);
  const quizTimeRef = useRef<HTMLInputElement>(null);
  const studentNameRef = useRef<HTMLInputElement>(null);
  const rollNoRef = useRef<HTMLInputElement>(null);

  const qrCodeRef = useRef<HTMLDivElement>(null);
  const teacherErrorRef = useRef<HTMLParagraphElement>(null);
  const quizNameErrorRef = useRef<HTMLParagraphElement>(null);
  const quizTimeErrorRef = useRef<HTMLParagraphElement>(null);

  const attemptFormRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const scoreDisplayRef = useRef<HTMLParagraphElement>(null);

  const teacherSectionRef = useRef<HTMLDivElement>(null);
  const startQuizSectionRef = useRef<HTMLDivElement>(null);
  const quizAttemptRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const allQuizzesPageRef = useRef<HTMLDivElement>(null);
  const allQuizzesListRef = useRef<HTMLDivElement>(null);
  const quizResultsRef = useRef<HTMLDivElement>(null);
  const resultsTableRef = useRef<HTMLTableSectionElement>(null);

  const [questionsCache, setQuestionsCache] = useState<any[]>([]);
  const quizIdRef = useRef<string | null>(null);
const quizTimeRefValue = useRef<number>(0);
const studentIdRef = useRef<string | null>(null);
const timerRefInt = useRef<NodeJS.Timeout | null>(null);
const timeLeftRef = useRef<number>(0);

  // -------------------- TEACHER FUNCTIONS --------------------
  const addQuestion = () => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="border p-4 rounded-xl relative">
        <button class="absolute top-2 right-2 text-red-500">✕</button>
        <input class="q w-full border px-3 py-2 mb-2 rounded-xl" placeholder="Question">
        <input class="a w-full border px-3 py-2 mb-2 rounded-xl" placeholder="Option A">
        <input class="b w-full border px-3 py-2 mb-2 rounded-xl" placeholder="Option B">
        <input class="c w-full border px-3 py-2 mb-2 rounded-xl" placeholder="Option C">
        <input class="d w-full border px-3 py-2 mb-2 rounded-xl" placeholder="Option D">
        <select class="correct w-full border px-3 py-2 rounded-xl">
          <option value="">Correct Option</option>
          <option>A</option><option>B</option><option>C</option><option>D</option>
        </select>
      </div>`;
    const btn = div.querySelector("button")!;
    btn.onclick = () => div.remove();
    const questionsDiv = document.getElementById("questions");
    questionsDiv?.appendChild(div);
  };

  const clearInputs = () => {
    if (quizNameRef.current) quizNameRef.current.value = "";
    if (quizTimeRef.current) quizTimeRef.current.value = "";
    const questionsDiv = document.getElementById("questions");
    if (questionsDiv) questionsDiv.innerHTML = "";
    if (qrCodeRef.current) qrCodeRef.current.innerHTML = "";
    if (teacherErrorRef.current) teacherErrorRef.current.classList.add("hidden");
    if (quizNameErrorRef.current) quizNameErrorRef.current.classList.add("hidden");
    if (quizTimeErrorRef.current) quizTimeErrorRef.current.classList.add("hidden");
  };

  const generateQuiz = async () => {
    if (teacherErrorRef.current) teacherErrorRef.current.classList.add("hidden");
    if (quizNameErrorRef.current) quizNameErrorRef.current.classList.add("hidden");
    if (quizTimeErrorRef.current) quizTimeErrorRef.current.classList.add("hidden");

    const name = quizNameRef.current?.value.trim() || "";
    const time = Number(quizTimeRef.current?.value);

    const questionsDiv = document.getElementById("questions");

    if (name.length < 3) { quizNameErrorRef.current?.classList.remove("hidden"); return; }
    if (!Number.isInteger(time) || time < 1 || time > 180) { quizTimeErrorRef.current?.classList.remove("hidden"); return; }
    if (!questionsDiv || questionsDiv.children.length === 0) { teacherErrorRef.current?.classList.remove("hidden"); return; }

    try {
      const { data: quiz } = await supabaseClient.from("quizze").insert([{ name, time }]).select().single();
      if (!quiz) throw new Error("Quiz creation failed");
      quizIdRef.current = quiz.id;
      quizTimeRefValue.current = quiz.time;

      const tempQuestions: any[] = [];

      for (const q of Array.from(questionsDiv.children)) {
        const payload = {
          quiz_id: quizIdRef.current,
          question: q.querySelector<HTMLInputElement>(".q")?.value.trim(),
          option_a: q.querySelector<HTMLInputElement>(".a")?.value.trim(),
          option_b: q.querySelector<HTMLInputElement>(".b")?.value.trim(),
          option_c: q.querySelector<HTMLInputElement>(".c")?.value.trim(),
          option_d: q.querySelector<HTMLInputElement>(".d")?.value.trim(),
          correct_option: q.querySelector<HTMLSelectElement>(".correct")?.value
        };
        if (Object.values(payload).some(v => !v)) { alert("All MCQ fields must be filled!"); return; }
        const { data: question } = await supabaseClient.from("questions").insert([payload]).select().single();
        tempQuestions.push(question);
      }
      setQuestionsCache(tempQuestions);

      // Show QR code
      if (qrCodeRef.current) {
        qrCodeRef.current.innerHTML = "";
        const canvas = document.createElement("canvas");
        qrCodeRef.current.appendChild(canvas);
        QRCode.toCanvas(
          canvas,
          `${window.location.origin}${window.location.pathname}?id=${quizIdRef.current}`,
          { width: 220 }
        );
        
      }

      alert("Quiz generated successfully!");
      startQuizSectionRef.current?.classList.remove("hidden");
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  // -------------------- STUDENT FUNCTIONS --------------------
  const startQuiz = async () => {
    if (!studentNameRef.current?.value || !rollNoRef.current?.value) {
      alert("Enter student details");
      return;
    }
  
    if (!quizIdRef.current) {
      alert("Quiz ID missing. Generate quiz again.");
      return;
    }
  
    const { data: stu } = await supabaseClient
      .from("students")
      .insert([
        {
          name: studentNameRef.current.value,
          roll_no: rollNoRef.current.value,
        },
      ])
      .select()
      .single();
  
    if (!stu) return;
    studentIdRef.current = stu.id;
  
    const { data: qs } = await supabaseClient
      .from("questions")
      .select("*")
      .eq("quiz_id", quizIdRef.current);
  
    if (!qs || qs.length === 0) {
      alert("No questions found!");
      return;
    }
  
    setQuestionsCache(qs);
  
    startQuizSectionRef.current?.classList.add("hidden");
    quizAttemptRef.current?.classList.remove("hidden");
  
    if (attemptFormRef.current) {
      attemptFormRef.current.innerHTML = "";
      qs.forEach((q: any, i: number) => {
        const div = document.createElement("div");
        div.className = "border p-4 rounded-xl";
        div.innerHTML = `
          <p class="font-semibold mb-2">${i + 1}. ${q.question}</p>
          ${["A", "B", "C", "D"]
            .map(
              (o) => `
            <label class="block mb-1">
              <input type="radio" name="q${i}" value="${o}">
              ${o}. ${q["option_" + o.toLowerCase()]}
            </label>`
            )
            .join("")}
        `;
        attemptFormRef.current!.appendChild(div);
      });
    }
  
    timeLeftRef.current = quizTimeRefValue.current * 60;
    updateTimer();
    timerRefInt.current = setInterval(updateTimer, 1000);
  };
  
  const updateTimer = () => {
    if (!timerRef.current) return;
  
    if (timeLeftRef.current <= 0) {
      submitQuiz();
      return;
    }
  
    timerRef.current.textContent =
      Math.floor(timeLeftRef.current / 60) +
      ":" +
      String(timeLeftRef.current % 60).padStart(2, "0");
  
    timeLeftRef.current--;
  };
  

  const submitQuiz = async () => {
    if (timerRefInt.current) clearInterval(timerRefInt.current);
  
    let score = 0;
  
    questionsCache.forEach((q, i) => {
      const a = document.querySelector<HTMLInputElement>(
        `input[name=q${i}]:checked`
      );
      if (a && a.value === q.correct_option) score++;
    });
  
    await supabaseClient.from("results").insert([
      {
        quiz_id: quizIdRef.current,
        student_id: studentIdRef.current,
        score,
        percent: (score / questionsCache.length) * 100,
      },
    ]);
  
    quizAttemptRef.current?.classList.add("hidden");
    resultSectionRef.current?.classList.remove("hidden");
  
    if (scoreDisplayRef.current && studentNameRef.current) {
      scoreDisplayRef.current.textContent = `${studentNameRef.current.value}, you scored ${score}/${questionsCache.length}`;
    }
  };
  

  // -------------------- VIEW ALL QUIZZES --------------------
  const viewAllQuizzes = async () => {
    teacherSectionRef.current?.classList.add("hidden");
    allQuizzesPageRef.current?.classList.remove("hidden");

    const { data: quizzes } = await supabaseClient.from("quizze").select("*").order("created_at", { ascending: false });
    if (!allQuizzesListRef.current) return;
    allQuizzesListRef.current.innerHTML = "";

    quizzes?.forEach(q => {
      const div = document.createElement("div");
      div.className = "border p-4 rounded-xl flex justify-between items-center";

      div.innerHTML = `
        <span class="font-semibold cursor-pointer text-blue-600">${q.name} (${q.time} min)</span>
        <button class="bg-red-500 text-white px-4 py-2 rounded">Delete Quiz</button>
      `;

      const btn = div.querySelector("button")!;
      btn.onclick = () => deleteQuiz(q.id);

      const span = div.querySelector("span")!;
      span.onclick = () => loadQuizResults(q.id);

      allQuizzesListRef.current?.appendChild(div);
    });
  };

  const deleteQuiz = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz? All related questions/results will be deleted.")) return;
    await supabaseClient.from("quizze").delete().eq("id", id);
    viewAllQuizzes();
  };

  const loadQuizResults = async (quizId: string) => {
    const { data: results } = await supabaseClient
      .from("results")
      .select("score, percent, students(name, roll_no)")
      .eq("quiz_id", quizId);
  
    if (!resultsTableRef.current) return;
    resultsTableRef.current.innerHTML = "";
  
    if (!results || results.length === 0) {
      resultsTableRef.current.innerHTML = '<tr><td colspan="4" class="p-2 text-center">No results yet</td></tr>';
    } else {
      results.forEach(r => {
        const student = Array.isArray(r.students) ? r.students[0] : r.students;
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="p-2 border">${student?.name || ""}</td>
          <td class="p-2 border">${student?.roll_no || ""}</td>
          <td class="p-2 border">${r.score}</td>
          <td class="p-2 border">${r.percent.toFixed(1)}%</td>
        `;
        resultsTableRef.current?.appendChild(tr);
      });
    }
  
    quizResultsRef.current?.classList.remove("hidden");
  };
  

  const goBackToQuizCreation = () => {
    teacherSectionRef.current?.classList.remove("hidden");
    allQuizzesPageRef.current?.classList.add("hidden");
  };

  // -------------------- JSX --------------------
  return (
    <div className="bg-white min-h-screen text-slate-800">

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
          </div></div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-10 text-center">
        <h2 className="text-4xl font-extrabold mb-3">Quiz Builder & Assessment</h2>
      </section>

      <section ref={teacherSectionRef} className="max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-2xl font-semibold mb-6">Create Quiz</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="font-semibold block mb-1">Quiz Name</label>
            <input ref={quizNameRef} className="w-full border px-4 py-3 rounded-xl" />
            <p ref={quizNameErrorRef} className="text-red-600 text-sm hidden mt-1">Quiz name must be at least 3 characters</p>
          </div>
          <div>
            <label className="font-semibold block mb-1">Quiz Time (minutes)</label>
            <input ref={quizTimeRef} type="number" min={1} max={180} className="w-full border px-4 py-3 rounded-xl" />
            <p ref={quizTimeErrorRef} className="text-red-600 text-sm hidden mt-1">Enter valid quiz time (1–180 minutes)</p>
          </div>
        </div>

        <div id="questions" className="space-y-6"></div>

        <div className="flex gap-4 mt-8 flex-wrap">
          <button onClick={addQuestion} className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl">Add MCQ</button>
          <button onClick={generateQuiz} className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl">Generate Quiz & QR</button>
          <button onClick={clearInputs} className="bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-xl">Clear Inputs</button>
          <button onClick={viewAllQuizzes} className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl">View All Quizzes</button>
        </div>

        <p ref={teacherErrorRef} className="text-red-600 mt-4 hidden">Please fill all required fields correctly</p>
        <div ref={qrCodeRef} className="mt-10 text-center"></div>
      </section>

      <section ref={startQuizSectionRef} className="hidden max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow text-center">
        <h3 className="text-2xl font-semibold mb-6">Student Details</h3>
        <input ref={studentNameRef} className="border px-4 py-3 rounded-xl w-full mb-4" placeholder="Student Name" />
        <input ref={rollNoRef} className="border px-4 py-3 rounded-xl w-full mb-6" placeholder="Roll Number" />
        <button onClick={startQuiz} className="bg-amber-600 hover:bg-amber-700 text-white w-full py-4 rounded-xl font-semibold">Start Quiz</button>
      </section>

      <section ref={quizAttemptRef} className="hidden max-w-6xl mx-auto px-6 pb-16">
        <div className="flex justify-between mb-6">
          <h3 className="text-2xl font-semibold">Attempt Quiz</h3>
          <span ref={timerRef} className="font-bold text-red-600"></span>
        </div>
        <div ref={attemptFormRef} className="space-y-6"></div>
        <button onClick={submitQuiz} className="mt-8 bg-slate-800 text-white px-8 py-3 rounded-xl">Submit Quiz</button>
      </section>

      <section ref={resultSectionRef} className="hidden max-w-6xl mx-auto px-6 pb-16 text-center">
        <h3 className="text-3xl font-bold mb-4">Result</h3>
        <p ref={scoreDisplayRef} className="text-xl font-semibold text-emerald-700"></p>
      </section>

      <section ref={allQuizzesPageRef} className="hidden max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-2xl font-semibold mb-4">All Quizzes</h3>
        <div ref={allQuizzesListRef} className="space-y-4"></div>
        <div ref={quizResultsRef} className="hidden mt-6">
          <h4 className="text-xl font-semibold mb-2">Results:</h4>
          <table className="w-full border border-slate-300">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-2 border">Student Name</th>
                <th className="p-2 border">Roll Number</th>
                <th className="p-2 border">Score</th>
                <th className="p-2 border">Percent</th>
              </tr>
            </thead>
            <tbody ref={resultsTableRef} className="bg-white"></tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
