import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-200 dark:bg-gray-900 shadow">
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="text-2xl text-purple-600 dark:text-purple-400"
      >
        <FaBars />
      </button>

      {/* Title */}
      <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
        Expense Tracker
      </h1>
    </div>
  );
};

export default Navbar;
