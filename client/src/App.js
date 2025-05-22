import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    // Save expenses to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expenseData) => {
    if (editingExpense) {
      // Update existing expense
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === editingExpense.id
            ? { ...expenseData, id: expense.id }
            : expense
        )
      );
      setEditingExpense(null);
    } else {
      // Add new expense
      setExpenses((prev) => [
        { ...expenseData, id: Date.now() },
        ...prev,
      ]);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
  };

  const totalExpenses = expenses.reduce((sum, expense) => {
    const amount = parseFloat(expense.amount) || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Cents
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-lg font-medium">
                Total: ${totalExpenses.toFixed(2)}
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
              >
                {darkMode ? (
                  <SunIcon style={{ height: '1.5rem', width: '1.5rem', color: '#4b5563' }} />
                ) : (
                  <MoonIcon style={{ height: '1.5rem', width: '1.5rem', color: '#4b5563' }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Add Expense */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">
              {editingExpense ? 'Edit Expense' : 'Quick Add'}
            </h2>
            <ExpenseForm
              onSubmit={handleAddExpense}
              initialValues={editingExpense}
            />
          </div>

          {/* Recent Expenses */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
            <ExpenseList
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </div>

          {/* Charts */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <ExpenseChart expenses={expenses} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
