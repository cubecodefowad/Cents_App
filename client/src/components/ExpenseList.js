import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function ExpenseList({ expenses, onEdit, onDelete }) {
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = [...new Set(expenses.map((expense) => expense.category))];

  const filteredExpenses = expenses
    .filter((expense) => !filterCategory || expense.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount;
        case 'date':
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-sm font-medium mb-1">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="sort-by" className="block text-sm font-medium mb-1">
            Sort by
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No expenses found
        </p>
      ) : (
        <div className="space-y-2">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formatAmount(expense.amount)}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {expense.category}
                  </span>
                </div>
                {expense.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {expense.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(expense.date)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(expense)}
                  className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList; 