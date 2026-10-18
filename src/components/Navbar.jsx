import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("হোম");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const menus = [
    { name: "হোম", path: "/" },
    { name: "ব্লগ", path: "/blog" },
    // { name: "যোগাযোগ", path: "/contact" },
    // { name: "প্রশ্ন উত্তর সমূহ", path: "/qns" },
  ];

  // Prevent scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Handle click outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            {/* <h1 className="text-3xl  font-bold text-teal-700">ধৈর্য</h1> */}
            <img className="h-16 w-auto " src="/dhoirjo-logo.svg" alt="" />
          </Link>
      <h1
  dir="rtl"
  className="font-ar font-bold text-blue-900 text-2xl sm:text-3xl md:text-3xl lg:text-3xl text-center"
>
  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
</h1>

          {/* Right Side */}
      <div className="relative flex items-center gap-2" ref={menuRef}>
  {/* Profile */}
 

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
        className={`fixed top-2 bottom-1 right-2 h-fit w-60 rounded-lg bg-white shadow-xl z-50 flex flex-col justify-between transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
           <img className="h-14 w-auto " src="/dhoirjo-logo.svg" alt="" />

            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition text-2xl text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Menu */}
          <ul className="p-4 space-y-1">
            {menus.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setActive(item.name);
                    setOpen(false);
                  }}
                  className={`block px-4 py-2 rounded-lg text-lg transition-all duration-200 ${
                    active === item.name
                      ? "bg-blue-600 text-white font-semibold "
                      : "text-blue-900 hover:bg-blue-100"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        {/* <div className="border-t border-gray-200 p-4">
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <i className="fa-regular fa-user text-lg text-gray-700"></i>
            <span className="text-gray-700 font-medium">My Account</span>
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;