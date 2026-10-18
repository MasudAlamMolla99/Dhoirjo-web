import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-900 border-t border-gray-200 text-dark mt-4">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Logo & Socials */}
          <div>
            <img className="h-16 w-auto brightness-0 invert " src="/dhoirjo-logo.svg" alt="" />

            <p className="text-sm text-white leading-6 mb-6">
            মানুষের কাছে সঠিক, নির্ভুল এবং শির্ক মুক্ত ইসলাম পৌঁছে দেওয়া এই ওয়েবসাইটের প্রধান লক্ষ্য
            </p>

           
<div className="flex items-center gap-4">
  <a
    href="#"
    className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
  >
    <i className="fab fa-facebook-f"></i>
  </a>

  <a
    href="#"
    className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
  >
    <i className="fab fa-instagram"></i>
  </a>

  <a
    href="#"
    className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
  >
    <i className="fab fa-x-twitter"></i>
  </a>

  <a
    href="#"
    className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
  >
    <i className="fab fa-youtube"></i>
  </a>
</div>

          </div>

          {/* Column 2 */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-5">Menu</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-teal-900 transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/projects"
                  className="hover:text-teal-900 transition-colors"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  to="/blogs"
                  className="hover:text-teal-900 transition-colors"
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="hover:text-teal-900 transition-colors"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Column 3 */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-5">Connect</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/regular-donor"
                  className="hover:text-teal-900 transition-colors"
                >
                  Regular Donor
                </Link>
              </li>

              <li>
                <Link
                  to="/lifetime-donor"
                  className="hover:text-teal-900 transition-colors"
                >
                  Lifetime Donor
                </Link>
              </li>

              <li>
                <Link
                  to="/volunteer"
                  className="hover:text-teal-900 transition-colors"
                >
                  Volunteer
                </Link>
              </li>

              <li>
                <Link
                  to="/career"
                  className="hover:text-teal-900 transition-colors"
                >
                  Career
                </Link>
              </li>

              <li>
                <Link
                  to="/others"
                  className="hover:text-teal-900 transition-colors"
                >
                  Others
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Column 4 */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-5">Support</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-teal-900 transition-colors"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-teal-900 transition-colors"
                >
                  Terms of Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="hover:text-teal-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Bottom */}
        <div className="mt-4 border-t border-gray-200 pt-2 text-center text-sm text-white">
          © {new Date().getFullYear()} ধৈর্য. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;