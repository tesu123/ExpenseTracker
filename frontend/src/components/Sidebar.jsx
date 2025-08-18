import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaReceipt,
  FaChartBar,
  FaCog,
  FaInfoCircle,
  FaTimes, // ❌ Close Icon
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaUser /> },
    { name: "Transactions", path: "/transactions", icon: <FaReceipt /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const bottomItem = {
    name: "About Us",
    path: "/about-us",
    icon: <FaInfoCircle />,
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-300 dark:bg-gray-800 flex flex-col justify-between transform transition-transform duration-300 z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:flex`}
      >
        {/* Top Section */}
        <div>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                Expense
              </h1>
              <p className="text-sm text-gray-700 dark:text-gray-300 -mt-1">
                TRACKER
              </p>
            </div>

            {/* ❌ Close button (only on mobile) */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-2xl text-gray-700 dark:text-gray-200"
            >
              <FaTimes />
            </button>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={toggleSidebar} // close on mobile
                className={`flex items-center gap-3 px-6 py-3 font-semibold text-gray-700 dark:text-white
                  ${
                    location.pathname === item.path
                      ? "bg-gray-200 dark:bg-gray-700 border-r-4 border-purple-600"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mb-4">
          <Link
            to={bottomItem.path}
            onClick={toggleSidebar} // close on mobile
            className={`flex items-center gap-3 px-6 py-3 font-semibold text-gray-700 dark:text-white
              ${
                location.pathname === bottomItem.path
                  ? "bg-gray-200 dark:bg-gray-700 border-r-4 border-purple-600"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {bottomItem.icon} {bottomItem.name}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
