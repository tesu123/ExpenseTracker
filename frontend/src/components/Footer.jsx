// src/components/Footer.jsx
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} ExpenseTrack. All rights reserved.
        </p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <Link
            to="/about"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 transition"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 transition"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
