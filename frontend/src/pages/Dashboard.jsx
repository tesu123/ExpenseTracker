// function Dashboard() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//     </div>
//   );
// }

// export default Dashboard;

import React from "react";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-6 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Total Balance
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            $12,345.67
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Income (This Month)
          </h3>
          <p className="text-2xl font-semibold text-green-500">$4,500.00</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Expenses (This Month)
          </h3>
          <p className="text-2xl font-semibold text-red-500">$1,250.50</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Savings (This Month)
          </h3>
          <p className="text-2xl font-semibold text-blue-500">$3,249.50</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center  md:justify-center lg:justify-end gap-4 mb-8">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow transition">
          Add Income
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow transition">
          Add Expense
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Transactions
        </h3>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="p-2">Date</th>
              <th className="p-2">Description</th>
              <th className="p-2">Category</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-2 text-gray-900 dark:text-gray-100">
                2024-07-28
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                Netflix Subscription
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                Entertainment
              </td>
              <td className="p-2 text-red-500">-$15.99</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-2 text-gray-900 dark:text-gray-100">
                2024-07-27
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                Groceries
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">Food</td>
              <td className="p-2 text-red-500">-$85.40</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-2 text-gray-900 dark:text-gray-100">
                2024-07-25
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">Paycheck</td>
              <td className="p-2 text-gray-900 dark:text-gray-100">Salary</td>
              <td className="p-2 text-green-500">+$2,250.00</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-2 text-gray-900 dark:text-gray-100">
                2024-07-22
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">Gasoline</td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                Transport
              </td>
              <td className="p-2 text-red-500">-$45.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
