import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });

    return () => unsubscribe();
  }, [navigate]);

  const createPost = async (e) => {
    e.preventDefault();

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const today = new Date();

    const dateString = today.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    await addDoc(collection(db, "posts"), {
      title,
      excerpt,
      content,
      thumbnail,
      category,
      tags: tagsArray,
      date: dateString,
      createdAt: Date.now(),
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900">
            নতুন পোস্ট লিখুন
          </h1>

          <p className="mt-3 text-gray-500">
            Create and publish a new blog post for your readers.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <form onSubmit={createPost} className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                পোস্টের শিরোনাম
              </label>

              <input
                type="text"
                placeholder="Enter the post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                ছোট বিবরণ
              </label>

              <textarea
                rows={3}
                placeholder="Write a short description..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition resize-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                ছবির লিংক
              </label>

              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              />
            </div>

            {/* Category & Tags */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  ক্যাটাগরি
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  ট্যাগ
                </label>

                <input
                  type="text"
                  placeholder="tech, news, education"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                মূল পোস্ট
              </label>

              <textarea
                rows={14}
                placeholder="Write your article here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 font-mono outline-none transition resize-y focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-teal-700 px-8 py-3 font-semibold text-white transition hover:bg-teal-800"
              >
                প্রকাশ করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}