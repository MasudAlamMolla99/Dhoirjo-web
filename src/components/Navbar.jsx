import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("হোম"); // ✅ ACTIVE STATE

  const menus = [
    { name: "হোম", path: "/" },

    { name: "ব্লগ", path: "/blog" },

    { name: "যোগাযোগ", path: "/contact" },
  ];

  // Prevent scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-white px-4 shadow-md">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-brand-primary">ধৈর্য</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <button className="btn btn-ghost btn-circle">
              <i className="fa-regular fa-user"></i> {/* ✅ FIX class */}
            </button>
          </div>

          {/* <button className="btn btn-success text-white">Donate</button> */}

          <button
            onClick={() => setOpen(true)}
            className="btn btn-ghost text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 flex flex-col justify-between transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <h2 className="text-3xl font-bold">ধৈর্য</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-xl cursor-pointer">
              ✕
            </button>
          </div>

          {/* ✅ Menu List */}
          <ul className="p-4 space-y-3">
            {menus.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setActive(item.name); // ✅ set active
                  setOpen(false);
                }}
                className={`p-2  cursor-pointer transition-all duration-200 text-xl
                  ${
                    active === item.name
                      ? "text-brand-primary inline-block border-b-2 border-brand-primary font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom section */}
        <div className="p-4 border-t space-y-3 md:hidden">
          <div
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <i className="fa-regular fa-user"></i>
            <span>My Account</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
