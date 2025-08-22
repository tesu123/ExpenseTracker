import { Link } from "react-router-dom";
import expense from "../assets/expense.png";
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar */}
      <header className="w-full bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-600">
            ExpenseTrack
          </h1>
          {/* Log In button - always visible */}
          <nav>
            <Link
              to="/login"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-purple-600 hover:text-white transition"
            >
              Log In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 py-16">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Track Your Spending, <br className="hidden md:block" /> Master
              Your Money
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
              Effortlessly manage your finances with our smart expense tracker
              that helps you stay in control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/login"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={expense}
              alt="Expense Tracker App"
              className="w-64 sm:w-72 md:w-80 lg:w-[22rem] drop-shadow-xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
