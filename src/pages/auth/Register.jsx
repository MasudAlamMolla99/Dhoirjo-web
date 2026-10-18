import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl">

          {/* Header */}
          <div className="mb-8 text-center">

            <h1 className="text-4xl font-bold text-teal-700">
              ধৈর্য
            </h1>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </h2>

            <p className="mt-2 text-gray-500">
              আপনার তথ্য দিয়ে নিবন্ধন সম্পন্ন করুন।
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                নাম
              </label>

              <input
                name="name"
                type="text"
                placeholder="আপনার নাম লিখুন"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ইমেইল
              </label>

              <input
                name="email"
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>

              <input
                name="password"
                type="password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-teal-700 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "নিবন্ধন করুন"}
            </button>

          </form>

          {/* Footer */}

          <div className="mt-8 border-t border-gray-200 pt-5 text-center">

            <p className="text-sm text-gray-600">
              ইতোমধ্যে অ্যাকাউন্ট আছে?
            </p>

            <Link
              to="/login"
              className="mt-2 inline-block font-semibold text-teal-700 transition hover:text-teal-800"
            >
              লগইন করুন
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;