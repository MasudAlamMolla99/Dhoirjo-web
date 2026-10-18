import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);

  // Protect Route
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });

    return () => unsubscribe();
  }, [navigate]);

  // Load Existing Post
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setTitle(data.title || "");
        setExcerpt(data.excerpt || "");
        setContent(data.content || "");
        setThumbnail(data.thumbnail || "");
        setCategory(data.category || "General");

        if (Array.isArray(data.tags)) {
          setTags(data.tags.join(", "));
        }
      }

      setLoading(false);
    };

    fetchPost();
  }, [id]);

  // Update Post
  const handleUpdate = async (e) => {
    e.preventDefault();

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    await updateDoc(doc(db, "posts", id), {
      title,
      excerpt,
      content,
      thumbnail,
      category,
      tags: tagsArray,
    });

    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg font-medium text-gray-500">
          Loading Post...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900">
            Edit Blog Post
          </h1>

          <p className="mt-3 text-gray-500">
            Update your article details and publish the latest version.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <form onSubmit={handleUpdate} className="space-y-7">
            {/* Title */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Post Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Short Description
              </label>

              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a short description..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Thumbnail URL
              </label>

              <input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Category & Tags */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Category
                </label>

                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Tags
                </label>

                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="react, firebase, blog"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Article Content
              </label>

              <textarea
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article..."
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 font-mono outline-none transition resize-y focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}