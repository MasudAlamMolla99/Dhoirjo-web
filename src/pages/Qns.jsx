import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Adjust path to your firebase config
import { onAuthStateChanged } from "firebase/auth";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";

export default function Qns() {
  const [currentUser, setCurrentUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerInputs, setAnswerInputs] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Set your admin email address here
  const ADMIN_EMAIL = "YOUR_ADMIN_EMAIL@gmail.com"; 
  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time listener for questions from Firestore
  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(docs);
    });
    return () => unsubscribe();
  }, []);

  // Handle clicking "Ask Question"
  const handleAskButtonClick = () => {
    if (currentUser) {
      setIsModalOpen(true);
    } else {
      navigate("/login");
    }
  };

  // Post a new question (Logged-in users)
  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !currentUser) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "questions"), {
        questionText: newQuestion,
        authorName: currentUser.displayName || currentUser.email.split("@")[0],
        authorEmail: currentUser.email,
        authorId: currentUser.uid,
        answerText: null,
        answeredAt: null,
        createdAt: serverTimestamp(),
      });
      setNewQuestion("");
      setIsModalOpen(false); // Close modal on success
    } catch (err) {
      console.error("Error asking question:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Submit or edit an answer (Admin only)
  const handleAnswerSubmit = async (questionId) => {
    const answer = answerInputs[questionId];
    if (!answer || !answer.trim()) return;

    try {
      const docRef = doc(db, "questions", questionId);
      await updateDoc(docRef, {
        answerText: answer,
        answeredAt: serverTimestamp(),
      });
      setAnswerInputs((prev) => ({ ...prev, [questionId]: "" }));
    } catch (err) {
      console.error("Error publishing answer:", err);
    }
  };

 return (
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="mx-auto max-w-5xl">

      {/* Header */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-bold text-gray-900">
                প্রশ্ন ও উত্তর
              </h1>

              {isAdmin && (
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                  অ্যাডমিন মোড
                </span>
              )}
            </div>

            <p className="mt-3 text-gray-500">
              অন্যান্যদের প্রশ্ন ও উত্তর দেখুন অথবা নিজের প্রশ্ন করুন।
            </p>
          </div>

          <button
            onClick={handleAskButtonClick}
            className="rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            {currentUser ? "প্রশ্ন করুন" : "প্রশ্ন করতে লগইন করুন"}
          </button>
        </div>
      </div>

      {/* Question List */}

      <section className="space-y-6">

        <h2 className="text-2xl font-bold text-gray-900">
          সকল প্রশ্ন
        </h2>

        {loading ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <p className="text-gray-500">
              প্রশ্ন লোড হচ্ছে...
            </p>
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <p className="text-gray-500">
              এখনও কোনো প্রশ্ন করা হয়নি।
            </p>
          </div>
        ) : (
          questions.map((q) => (
            <article
              key={q.id}
              className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Top */}

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">

                <div>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                    প্রশ্ন করেছেন: {q.authorName}
                  </span>

                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {q.questionText}
                  </h3>
                </div>

                <div>
                  {q.answerText ? (
                    <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                      উত্তর দেওয়া হয়েছে
                    </span>
                  ) : (
                    <span className="rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
                      উত্তর অপেক্ষমাণ
                    </span>
                  )}
                </div>
              </div>

              {/* Answer */}

              {q.answerText && (
                <div className="mt-6 rounded-2xl border-l-4 border-teal-700 bg-teal-50 p-5">

                  <h4 className="font-bold text-teal-800">
                    প্রশাসকের উত্তর
                  </h4>

                  <p className="mt-2 whitespace-pre-line text-gray-700 leading-7">
                    {q.answerText}
                  </p>

                </div>
              )}

              {/* Admin */}

              {isAdmin && (
                <div className="mt-6 border-t border-gray-200 pt-5">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {q.answerText
                      ? "উত্তর সম্পাদনা করুন"
                      : "উত্তর লিখুন"}
                  </label>

                  <div className="flex flex-col gap-3 md:flex-row">

                    <input
                      type="text"
                      value={answerInputs[q.id] ?? ""}
                      onChange={(e) =>
                        setAnswerInputs((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                      placeholder={
                        q.answerText
                          ? "নতুন উত্তর লিখুন..."
                          : "এখানে উত্তর লিখুন..."
                      }
                      className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
                    />

                    <button
                      onClick={() => handleAnswerSubmit(q.id)}
                      className="rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
                    >
                      প্রকাশ করুন
                    </button>

                  </div>

                </div>
              )}
            </article>
          ))
        )}
      </section>

      {/* Ask Question Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-gray-900">
                নতুন প্রশ্ন করুন
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-3xl text-gray-400 transition hover:text-gray-700"
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAskQuestion}>

              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                rows={5}
                autoFocus
                placeholder="আপনার প্রশ্ন এখানে লিখুন..."
                className="w-full resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
              />

              <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <span className="text-sm text-gray-500">
                  প্রশ্ন করছেন:{" "}
                  <strong className="text-gray-800">
                    {currentUser?.displayName || currentUser?.email}
                  </strong>
                </span>

                <div className="flex gap-3">

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    বাতিল
                  </button>

                  <button
                    type="submit"
                    disabled={submitting || !newQuestion.trim()}
                    className="rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50"
                  >
                    {submitting
                      ? "প্রকাশ করা হচ্ছে..."
                      : "প্রকাশ করুন"}
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>
      )}
    </div>
  </div>
);
}