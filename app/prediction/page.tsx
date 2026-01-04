"use client";

import { useState, useRef } from "react";

export default function PredictionPage() {
  const studentNameRef = useRef<HTMLInputElement>(null);
  const studyHoursRef = useRef<HTMLInputElement>(null);
  const attendanceRef = useRef<HTMLInputElement>(null);
  const pastScoreRef = useRef<HTMLInputElement>(null);
  const finalScoreRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const parentEduRef = useRef<HTMLSelectElement>(null);
  const internetRef = useRef<HTMLSelectElement>(null);
  const extraRef = useRef<HTMLSelectElement>(null);

  const [filledCount, setFilledCount] = useState(0);
  const [totalCount] = useState(9);
  const [errorMsg, setErrorMsg] = useState(false);
  const [result, setResult] = useState("");

  const updateCounter = () => {
    let filled = 0;
    const refs = [
      studentNameRef,
      genderRef,
      parentEduRef,
      studyHoursRef,
      attendanceRef,
      pastScoreRef,
      finalScoreRef,
      internetRef,
      extraRef,
    ];
    refs.forEach((ref) => {
      if (ref.current && ref.current.value.trim() !== "") filled++;
    });
    setFilledCount(filled);
  };

  const handlePredict = async () => {
    const refs = [
      studentNameRef,
      genderRef,
      parentEduRef,
      studyHoursRef,
      attendanceRef,
      pastScoreRef,
      finalScoreRef,
      internetRef,
      extraRef,
    ];

    let valid = true;
    refs.forEach((ref) => {
      if (ref.current && ref.current.value.trim() === "") valid = false;
    });

    if (!valid) {
      setErrorMsg(true);
      setResult("");
      updateCounter();
      return;
    }

    setErrorMsg(false);

    const payload = {
      study_hours: studyHoursRef.current?.value,
      attendance: attendanceRef.current?.value,
      past_score: pastScoreRef.current?.value,
      final_score: finalScoreRef.current?.value,
      gender: genderRef.current?.value,
      parent_edu: parentEduRef.current?.value,
      internet: internetRef.current?.value,
      extra: extraRef.current?.value,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      const name = studentNameRef.current?.value || "Student";
      setResult(`Prediction Result: ${name} is likely to ${data.prediction.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      setResult("Error fetching prediction. Please try again.");
    }

    updateCounter();
  };

  const inputClass =
    "w-full bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition";

  const selectClass =
    "w-full bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition";

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
      <a href="#about-dataset" className="hover:text-amber-600 transition">About Dataset</a>
      <a href="#contact" className="hover:text-amber-600 transition">Contact</a>
    </div>

  </div>
</nav>

    <div className="bg-white min-h-screen font-sans text-slate-800">
      
      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 py-14 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">Student Performance Prediction</h1>
        <p className="max-w-3xl text-slate-600 text-lg">
          Predict academic success based on student information, performance history,
          and learning environment indicators.
        </p>
      </section>

      {/* PROGRESS */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-sm text-slate-600">
          Required Fields Completed:{" "}
          <span className="font-semibold text-amber-600">
            {filledCount} / {totalCount}
          </span>
        </p>
      </section>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pb-24 space-y-20">
        {/* SECTION 01 */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-amber-600 font-semibold text-sm">01</span>
            <h2 className="text-2xl font-semibold">Student Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Student Full Name</label>
              <input
                ref={studentNameRef}
                onChange={updateCounter}
                placeholder="e.g. Ahmed Khan"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select ref={genderRef} onChange={updateCounter} className={selectClass}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Parent's Education Level</label>
              <select ref={parentEduRef} onChange={updateCounter} className={selectClass}>
                <option value="">Select</option>
                <option>High School</option>
                <option>Bachelors</option>
                <option>Masters</option>
                <option>PhD</option>
              </select>
            </div>
          </div>
        </section>

       
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-amber-600 font-semibold text-sm">02</span>
            <h2 className="text-2xl font-semibold">Academic Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <input
              type="number"
              ref={studyHoursRef}
              onChange={updateCounter}
              placeholder="Study Hours / Week"
              className={inputClass}
            />
            <input
              type="number"
              ref={attendanceRef}
              onChange={updateCounter}
              placeholder="Attendance (%)"
              className={inputClass}
            />
            <input
              type="number"
              ref={pastScoreRef}
              onChange={updateCounter}
              placeholder="Previous Exam Score"
              className={inputClass}
            />
            <input
              type="number"
              ref={finalScoreRef}
              onChange={updateCounter}
              placeholder="Final Exam Score"
              className={inputClass}
            />
          </div>
        </section>

       
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-amber-600 font-semibold text-sm">03</span>
            <h2 className="text-2xl font-semibold">Learning Environment</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <select ref={internetRef} onChange={updateCounter} className={selectClass}>
              <option value="">Internet Access</option>
              <option>Yes</option>
              <option>No</option>
            </select>

            <select ref={extraRef} onChange={updateCounter} className={selectClass}>
              <option value="">Extra Classes</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </section>

        {/* ACTION */}
        <div className="pt-10 ">
          {errorMsg && (
            <p className="text-red-600 text-sm mb-4">
              Please fill all required fields before generating prediction.
            </p>
          )}

          <div className="flex justify-center">
            <button
              onClick={handlePredict}
              className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-3 rounded-full font-semibold transition"
            >
              Generate Prediction
            </button>
          </div>

          {result && (
            <div className="mt-8  pt-6 text-lg font-semibold text-emerald-700 flex justify-center">
              {result}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER
      <footer className="bg-white border-t mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-slate-500">
          © 2026 Fledge — Academic Performance Prediction System
        </div>
      </footer> */}

<div id="about-dataset" className="bg-white py-20 px-6 text-center">
  <h2 className="text-4xl font-bold text-slate-900 mb-6">
    About the Dataset
  </h2>

  <p className="max-w-4xl mx-auto text-slate-700 text-lg leading-relaxed mb-10">
    This dataset is used to analyze and predict student academic performance by
    combining learning habits, background information, and exam results.
    It helps the system understand whether a student is likely to pass or fail.
  </p>

  <div className="max-w-5xl mx-auto text-left text-slate-700 text-lg leading-relaxed">
    <h3 className="text-2xl font-semibold text-slate-900 mb-4">
      Dataset Features
    </h3>

    <ul className="list-disc pl-6 space-y-2">
      <li><strong>Student_ID:</strong> Unique identifier for each student.</li>
      <li><strong>Gender:</strong> Represents the student’s gender.</li>
      <li><strong>Study_Hours_per_Week:</strong> Average weekly study time.</li>
      <li><strong>Attendance_Rate:</strong> Percentage of classes attended.</li>
      <li><strong>Past_Exam_Scores:</strong> Previous academic performance.</li>
      <li><strong>Parental_Education_Level:</strong> Education background of parents.</li>
      <li><strong>Internet_Access_at_Home:</strong> Availability of internet for learning.</li>
      <li><strong>Extracurricular_Activities:</strong> Participation in non-academic activities.</li>
      <li><strong>Final_Exam_Score:</strong> Marks obtained in the final exam.</li>
      <li><strong>Pass_Fail:</strong> Final result used for prediction.</li>
    </ul>

    <h3 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
      Model & Prediction
    </h3>

    <p className="mb-4">
      The prediction system uses the <strong>KNeighborsClassifier (KNN)</strong>,
      which compares a student’s data with similar students to predict the final outcome.
    </p>

    <p className="mb-4">
      The model achieved excellent performance with a <strong>Test Score of 99.29%</strong>,
      <strong>Precision of 98.61%</strong>, <strong>Recall of 100%</strong>, and an
      <strong>F1 Score of 99.30%</strong>.
    </p>

    <p className="font-medium mt-6">
      These high scores indicate that the predictions are highly accurate and reliable,
      making the system effective for real-world student performance analysis.
    </p>
  </div>
</div>
<footer id="contact" className="bg-slate-900 text-slate-300 text-center py-8 mt-20">
        <p>© 2025 Fledge — Smart Quiz Builder</p>
      </footer>

    </div>
    </>
  );
}
