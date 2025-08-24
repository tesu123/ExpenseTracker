import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch incomes & expenses
  const fetchTransactions = async () => {
    try {
      setLoading(true);

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
        type: "Income",
      }));

      const expenses = expenseRes.data.data.map((t) => ({
        ...t,
        type: "Expense",
      }));

      const merged = [...incomes, ...expenses].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTransactions(merged);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete transaction
  const handleDelete = async (id, type) => {
    try {
      await axios.delete(
        `${ApiUrl}/${
          type === "Income" ? "income" : "expense"
        }/delete-${type.toLowerCase()}/${id}`,
        { withCredentials: true }
      );

      toast.success(`${type} deleted successfully`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case "Entertainment":
        return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
      case "Food":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";
      case "Salary":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
      case "Transport":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Transactions
        </h2>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="date"
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-900 dark:text-gray-100"
              />
              <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-900 dark:text-gray-100">
                <option>All Categories</option>
                <option>Food</option>
                <option>Transport</option>
                <option>Entertainment</option>
                <option>Salary</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-900 dark:text-gray-100"
              />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg">
              Export CSV
            </button>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="text-left text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                    <th className="p-3">Date</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Actions</th>
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
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            t.category
                          )}`}
                        >
                          {t.category}
                        </span>
                      </td>
                      <td
                        className={`p-3 font-semibold ${
                          t.type === "Expense"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {t.type === "Expense"
                          ? `-₹${t.amount.toFixed(2)}`
                          : `+₹${t.amount.toFixed(2)}`}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {t.type}
                      </td>
                      <td className="p-3 space-x-2">
                        <button className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t.id, t.type)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
