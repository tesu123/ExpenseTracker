import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Logo from "../assets/Zuno.png";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const [stats, setStats] = useState({
    totalBalance: 0,
    incomeThisMonth: 0,
    expenseThisMonth: 0,
    Savings: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loading, setLoading] = useState(false);

  // Add income
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState({
    amount: "",
    category: "",
    description: "",
  });

  // Add expense
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    amount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    // Fetch total balance
    axios
      .get(`${ApiUrl}/balance/get-balance`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setStats((prev) => ({
            ...prev,
            totalBalance: res.data.data.balance ?? 0, // ✅ correct path
          }));
        } else {
          toast.error("Failed to fetch total balance");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching total balance");
      });

    // fetch income this month
    axios
      .get(`${ApiUrl}/income/get-monthly-income`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setStats((prev) => ({
            ...prev,
            incomeThisMonth: res.data.data.totalMonthlyIncome ?? 0, // ✅ matches backend response
          }));
        } else {
          toast.error("Failed to fetch monthly income");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching monthly income");
      });

    // fetch expense this month
    axios
      .get(`${ApiUrl}/expense/get-monthly-expense`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setStats((prev) => ({
            ...prev,
            expenseThisMonth: res.data.data.totalMonthlyExpense ?? 0, // ✅ matches backend response
          }));
        } else {
          toast.error("Failed to fetch monthly expense");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching monthly expense");
      });

    // fetching recent transactions

    const fetchTransactions = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(`${ApiUrl}/income/get-all-incomes`, {
            withCredentials: true,
          }),
          axios.get(`${ApiUrl}/expense/get-all-expenses`, {
            withCredentials: true,
          }),
        ]);

        const incomes = incomeRes.data.data.map((t) => ({
          ...t,
          type: "income",
        }));

        const expenses = expenseRes.data.data.map((t) => ({
          ...t,
          type: "expense",
        }));

        // Merge + sort by createdAt (newest first)
        const merged = [...incomes, ...expenses].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Only take the latest 10
        setTransactions(merged.slice(0, 10));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoadingScreen(false);
      }
    };

    fetchTransactions();
  }, []);

  // Handle form change
  const handleIncomeChange = (e) => {
    setIncomeForm({ ...incomeForm, [e.target.name]: e.target.value });
  };

  const handleExpenseChange = (e) => {
    setExpenseForm({ ...expenseForm, [e.target.name]: e.target.value });
  };

  // Submit new income
  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${ApiUrl}/income/add-income`, incomeForm, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Income added successfully!");
        setShowIncomeForm(false);
        setIncomeForm({ amount: "", category: "", description: "" });

        // refresh transactions
        setTransactions((prev) =>
          [{ ...res.data.data, type: "income" }, ...prev].slice(0, 10)
        );
      } else {
        toast.error("Failed to add income");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding income");
    } finally {
      setLoading(false);
    }
  };

  // Submit new expense
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${ApiUrl}/expense/add-expense`,
        expenseForm,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Expense added successfully!");
        setShowExpenseForm(false);
        setExpenseForm({ amount: "", category: "", description: "" });

        // refresh transactions
        setTransactions((prev) =>
          [{ ...res.data.data, type: "expense" }, ...prev].slice(0, 10)
        );
      } else {
        toast.error("Failed to add expense");
      }
    } catch (error) {
      console.error(error);
      toast.error("Expense can't be greater than total balance");
    } finally {
      setLoading(false);
    }
  };

  // // Custom Logo Spinner
  if (loadingScreen) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-6">
        {/* Logo */}
        <img src={Logo} alt="Loading Logo" className="w-20 h-20" />

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-0">
      {/* <Toaster position="top-right" /> */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Total Balance
          </h3>
          <p className="font-semibold text-gray-900 dark:text-white lg:text-2xl md:text-2xl">
            ₹{stats.totalBalance.toFixed(2) || 0}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Income (This Month)
          </h3>
          <p className="font-semibold text-green-500 lg:text-2xl md:text-2xl">
            ₹{stats.incomeThisMonth.toFixed(2) || 0}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Expenses (This Month)
          </h3>
          <p className="font-semibold text-red-500 lg:text-2xl md:text-2xl">
            ₹{stats.expenseThisMonth.toFixed(2) || 0}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Savings (This Month)
          </h3>
          <p className="font-semibold text-blue-500 lg:text-2xl md:text-2xl">
            ₹ {(stats.incomeThisMonth - stats.expenseThisMonth).toFixed(2) || 0}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center md:justify-center lg:justify-end gap-4 mb-8">
        <button
          onClick={() => setShowIncomeForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow transition cursor-pointer"
        >
          Add Income
        </button>
        <button
          onClick={() => setShowExpenseForm(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow transition cursor-pointer"
        >
          Add Expense
        </button>
      </div>

      {/* Add Income Modal */}
      {showIncomeForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-80 max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Add Income
            </h3>
            <form onSubmit={handleIncomeSubmit} className="space-y-4">
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={incomeForm.amount}
                onChange={handleIncomeChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={incomeForm.category}
                onChange={handleIncomeChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={incomeForm.description}
                onChange={handleIncomeChange}
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowIncomeForm(false)}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 cursor-pointer"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showExpenseForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-80 max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Add Expense
            </h3>
            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={expenseForm.amount}
                onChange={handleExpenseChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={expenseForm.category}
                onChange={handleExpenseChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={expenseForm.description}
                onChange={handleExpenseChange}
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseForm(false)}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 cursor-pointer"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Transactions
        </h3>

        {/* Make table horizontally scrollable */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-base">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="p-3 text-gray-900 dark:text-gray-100">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">
                    {t.description}
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">
                    {t.category}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      t.type === "income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}₹{t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
