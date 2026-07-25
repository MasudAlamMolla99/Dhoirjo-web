import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

export default function AdminPanel() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"));

      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "posts", id));
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-lg md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all your blog posts from one place.
            </p>
          </div>

          <Link
            to="/admin/create"
            className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            + Create New Post
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Posts</h2>

          <p className="mt-2 text-5xl font-bold text-teal-700">
            {posts.length}
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-5">
          {posts.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow">
              <h3 className="text-2xl font-semibold text-gray-700">
                No posts found
              </h3>

              <p className="mt-2 text-gray-500">
                Create your first blog post to get started.
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl md:flex-row md:items-center md:justify-between"
              >
                {/* Post Info */}
                <div className="max-w-10/12">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {post.date}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/admin/edit/${post.id}`}
                    className="rounded-full border border-teal-700 px-4 py-2 font-medium text-teal-700 transition hover:bg-teal-700 hover:text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="rounded-full bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}