import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("হোম");

  const menus = [
    { name: "হোম", path: "/" },
    { name: "ব্লগ", path: "/blog" },
    { name: "যোগাযোগ", path: "/contact" },
    { name: "প্রশ্ন উত্তর সমূহ", path: "/qns" },
  ];

  // Prevent scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-3xl font-bold text-teal-700">ধৈর্য</h1>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Profile */}
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
              <i className="fa-regular fa-user text-xl text-gray-700"></i>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition text-2xl text-gray-700"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col justify-between transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-teal-700">ধৈর্য</h2>

            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition text-2xl text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Menu */}
          <ul className="p-4 space-y-2">
            {menus.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setActive(item.name);
                    setOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-lg text-lg transition-all duration-200 ${
                    active === item.name
                      ? "bg-gray-50 text-brand-primary font-semibold border-l-4 border-dark"
                      : "text-teal-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <i className="fa-regular fa-user text-lg text-gray-700"></i>
            <span className="text-gray-700 font-medium">My Account</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;