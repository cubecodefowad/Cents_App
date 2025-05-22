import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ExpenseChart({ expenses }) {
  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  // Prepare data for pie chart
  const pieData = {
    labels: Object.keys(categoryTotals).map(
      (category) => category.charAt(0).toUpperCase() + category.slice(1)
    ),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#3B82F6', // blue-500
          '#10B981', // emerald-500
          '#F59E0B', // amber-500
          '#EF4444', // red-500
          '#8B5CF6', // violet-500
          '#EC4899', // pink-500
        ],
      },
    ],
  };

  // Group expenses by month
  const monthlyTotals = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  // Prepare data for bar chart
  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyTotals),
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
        <div className="h-64">
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
        <div className="h-64">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart; 