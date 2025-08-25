import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import {
  AboutUs,
  Analytics,
  Dashboard,
  Transactions,
  LandingPage,
  LoginPage,
  SignupPage,
  Settings,
  LandingLayout,
} from "./pages";

import { useState, useEffect } from "react";
import axios from "axios";
import { login, logout } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import Logo from "./assets/Zuno.png";

import { PublicRoute, ProtectedRoute } from "./components";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${ApiUrl}/users/current-user`, { withCredentials: true })
      .then((res) => {
        dispatch(login(res.data.data));
        // navigate("/dashbaord");
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Apply dark mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  //Custom Logo Spinner
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] w-full space-y-6">
        {/* Logo */}
        <img src={Logo} alt="Loading Logo" className="w-20 h-20" />

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingLayout />} />
        <Route path="/login" element={<PublicRoute />}>
          <Route path="" element={<LoginPage />} />
        </Route>

        <Route path="/signup" element={<PublicRoute />}>
          <Route path="" element={<SignupPage />} />
        </Route>

        {/* Main App Layout */}
        <Route
          path="/*"
          element={
            <div className="flex h-screen dark:bg-gray-900">
              {/* Sidebar */}
              <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

              {/* Main Content */}
              <div className="flex-1 flex flex-col overflow-auto">
                <Navbar
                  toggleSidebar={toggleSidebar}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />

                <div className="flex-1 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-auto scrollbar-none">
                  <Routes>
                    <Route path="/dashboard" element={<ProtectedRoute />}>
                      <Route path="" element={<Dashboard />} />
                    </Route>

                    <Route path="/transactions" element={<ProtectedRoute />}>
                      <Route path="" element={<Transactions />} />
                    </Route>

                    <Route path="/analytics" element={<ProtectedRoute />}>
                      <Route path="" element={<Analytics />} />
                    </Route>

                    <Route path="/settings" element={<ProtectedRoute />}>
                      <Route path="" element={<Settings />} />
                    </Route>

                    <Route path="/about-us" element={<ProtectedRoute />}>
                      <Route path="" element={<AboutUs />} />
                    </Route>
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
