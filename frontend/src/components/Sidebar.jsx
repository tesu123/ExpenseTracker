import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import {
  FaUser,
  FaReceipt,
  FaChartBar,
  FaCog,
  FaInfoCircle,
  FaTimes, // ❌ Close Icon
} from "react-icons/fa";

import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaUser /> },
    { name: "Transactions", path: "/transactions", icon: <FaReceipt /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "About Us", path: "/about-us", icon: <FaInfoCircle /> },
  ];

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.status);

  // ✅ FIX: handle redirects inside useEffect
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const logoutUser = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post(`${ApiUrl}/users/logout`, {}, { withCredentials: true });

      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error("Error logging out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster position="top-right" />
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-70 bg-gray-300 dark:bg-gray-800 flex flex-col justify-between transform transition-transform duration-300 z-30
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
          <div className="px-1">
            <div className="dark:text-white text-black px-3 py-2 border rounded-full flex mb-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar name={user?.name} size={36} round={true} />
                <div className="flex flex-col">
                  <h3 className="text-sm">{user?.name} </h3>
                  <span className="text-xs">{user?.email}</span>
                </div>
              </div>
              <button
                onClick={logoutUser}
                disabled={isLoggingOut}
                className="cursor-pointer"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
