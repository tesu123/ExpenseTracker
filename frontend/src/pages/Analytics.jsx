// import Chart from "chart.js/auto";
// import { Bar, Doughnut, Line } from "react-chartjs-2";
// import BarData from "../data/BarData.json";
// import LineData from "../data/LineData.json";

// function Analytics() {
//   const barData = {
//     labels: BarData[0].label, // labels come from the first object
//     datasets: [
//       {
//         label: "Income",
//         data: BarData[0].data, // first dataset values
//         backgroundColor: "rgba(34, 197, 94, 0.7)", // green
//         borderRadius: 8,
//       },
//       {
//         label: "Expenses",
//         data: BarData[1].data, // second dataset values
//         backgroundColor: "rgba(239, 68, 68, 0.7)", // red
//         borderRadius: 8,
//       },
//     ],
//   };

//   const lineData = {
//     labels: LineData[0].label,
//     datasets: [
//       {
//         label: "Daily Spending",
//         data: LineData[0].data,
//         borderColor: "rgb(139, 92, 246)",
//         backgroundColor: "rgba(139, 92, 246, 0.3)",
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   };

//   const doughnutData = {
//     labels: ["Food", "Transport", "Shopping", "Bills", "Others"],
//     datasets: [
//       {
//         data: [300, 150, 200, 100, 80],
//         backgroundColor: [
//           "rgba(139, 92, 246, 0.7)", // purple
//           "rgba(34, 197, 94, 0.7)", // green
//           "rgba(59, 130, 246, 0.7)", // blue
//           "rgba(249, 115, 22, 0.7)", // orange
//           "rgba(244, 63, 94, 0.7)", // red
//         ],
//         borderWidth: 2,
//       },
//     ],
//   };

//   const pieData = {
//     labels: ["Salary", "Investments", "Freelancing", "Other"],
//     datasets: [
//       {
//         data: [2000, 800, 600, 300],
//         backgroundColor: [
//           "rgba(34, 197, 94, 0.7)", // green
//           "rgba(59, 130, 246, 0.7)", // blue
//           "rgba(249, 115, 22, 0.7)", // orange
//           "rgba(139, 92, 246, 0.7)", // purple
//         ],
//         borderWidth: 2,
//       },
//     ],
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">
//         Analytics
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
//         {/* Bar Chart */}
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
//           <h2 className="text-lg font-semibold mb-3">
//             Monthly Income Vs Expense
//           </h2>
//           <Bar data={barData} />
//         </div>

//         {/* Line Chart */}
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
//           <h2 className="text-lg font-semibold mb-3">Weekly Spending Trend</h2>
//           <Line data={lineData} />
//         </div>

//         {/* Doughnut Chart */}
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
//           <h2 className="text-lg font-semibold mb-3">Category Breakdown</h2>
//           <Doughnut data={doughnutData} />
//         </div>

//         {/* Pie Chart */}
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
//           <h2 className="text-lg font-semibold mb-3">Income Sources</h2>
//           <Doughnut data={pieData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Analytics;

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch income & expense
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(`${ApiUrl}/income/get-all-incomes`, {
            withCredentials: true,
          }),
          axios.get(`${ApiUrl}/expense/get-all-expenses`, {
            withCredentials: true,
          }),
        ]);

        const incomes = incomeRes.data.data || [];
        const expenses = expenseRes.data.data || [];

        // -------------------------
        // 📊 Bar Chart (Monthly Income vs Expense)
        // -------------------------
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const incomeByMonth = Array(12).fill(0);
        const expenseByMonth = Array(12).fill(0);

        incomes.forEach((i) => {
          const month = new Date(i.createdAt).getMonth();
          incomeByMonth[month] += i.amount;
        });

        expenses.forEach((e) => {
          const month = new Date(e.createdAt).getMonth();
          expenseByMonth[month] += e.amount;
        });

        setBarData({
          labels: months,
          datasets: [
            {
              label: "Income",
              data: incomeByMonth,
              backgroundColor: "rgba(34, 197, 94, 0.7)",
              borderRadius: 8,
            },
            {
              label: "Expenses",
              data: expenseByMonth,
              backgroundColor: "rgba(239, 68, 68, 0.7)",
              borderRadius: 8,
            },
          ],
        });

        // -------------------------
        // 📈 Line Chart (Weekly Spending Trend)
        // -------------------------
        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const spendingByDay = Array(7).fill(0);

        expenses.forEach((e) => {
          const day = new Date(e.createdAt).getDay();
          spendingByDay[day] += e.amount;
        });

        setLineData({
          labels: weekDays,
          datasets: [
            {
              label: "Daily Spending",
              data: spendingByDay,
              borderColor: "rgb(139, 92, 246)",
              backgroundColor: "rgba(139, 92, 246, 0.3)",
              tension: 0.3,
              fill: true,
            },
          ],
        });

        // -------------------------
        // 🍩 Doughnut (Expense Category Breakdown)
        // -------------------------
        const categoryTotals = {};
        expenses.forEach((e) => {
          categoryTotals[e.category] =
            (categoryTotals[e.category] || 0) + e.amount;
        });

        setDoughnutData({
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              data: Object.values(categoryTotals),
              backgroundColor: [
                "rgba(139, 92, 246, 0.7)",
                "rgba(34, 197, 94, 0.7)",
                "rgba(59, 130, 246, 0.7)",
                "rgba(249, 115, 22, 0.7)",
                "rgba(244, 63, 94, 0.7)",
              ],
              borderWidth: 2,
            },
          ],
        });

        // -------------------------
        // 🥧 Pie Chart (Income Sources Breakdown)
        // -------------------------
        const sourceTotals = {};
        incomes.forEach((i) => {
          sourceTotals[i.category] = (sourceTotals[i.category] || 0) + i.amount;
        });

        setPieData({
          labels: Object.keys(sourceTotals),
          datasets: [
            {
              data: Object.values(sourceTotals),
              backgroundColor: [
                "rgba(34, 197, 94, 0.7)",
                "rgba(59, 130, 246, 0.7)",
                "rgba(249, 115, 22, 0.7)",
                "rgba(139, 92, 246, 0.7)",
              ],
              borderWidth: 2,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading analytics...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-3">
            Monthly Income Vs Expense
          </h2>
          {barData && <Bar data={barData} />}
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-3">Weekly Spending Trend</h2>
          {lineData && <Line data={lineData} />}
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-3">Category Breakdown</h2>
          {doughnutData && <Doughnut data={doughnutData} />}
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-3">Income Sources</h2>
          {pieData && <Pie data={pieData} />}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
