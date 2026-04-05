import React, { useState, useMemo } from 'react';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const TransactionHistory = ({ transactions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    startDate: '',
    endDate: '',
  });

  // 🔥 Optimized Filtering + Sorting
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // 🔍 Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(tx =>
        tx.title?.toLowerCase().includes(term) ||
        tx.category?.toLowerCase().includes(term) ||
        tx.amount?.toString().includes(term)
      );
    }

    // 🎯 Type Filter
    if (filters.type !== 'all') {
      result = result.filter(tx => tx.type === filters.type);
    }

    // 🎯 Category Filter
    if (filters.category !== 'all') {
      result = result.filter(tx => tx.category === filters.category);
    }

    // 📅 Date Filter (FIXED)
    if (filters.startDate) {
      result = result.filter(
        tx => new Date(tx.date) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      result = result.filter(
        tx => new Date(tx.date) <= new Date(filters.endDate)
      );
    }

    // 🔽 Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for date
        if (sortConfig.key === 'date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [transactions, searchTerm, filters, sortConfig]);

  // 🔽 Sort handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 🎛️ Filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // 📅 Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // 📂 Unique categories
  const categories = [...new Set(transactions.map(tx => tx.category))].filter(Boolean);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction History</h1>

        <div className="relative w-full md:w-64 mt-3 md:mt-0">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            className="input-field pl-10 w-full"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <select name="type" value={filters.type} onChange={handleFilterChange} className="input-field">
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select name="category" value={filters.category} onChange={handleFilterChange} className="input-field">
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="input-field" />

          <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="input-field" />

        </div>

        {/* Clear Filters */}
        <button
          onClick={() =>
            setFilters({
              type: 'all',
              category: 'all',
              startDate: '',
              endDate: '',
            })
          }
          className="mt-4 text-sm text-blue-600"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">

              <th onClick={() => handleSort('title')} className="p-3 cursor-pointer">
                Description {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
              </th>

              <th onClick={() => handleSort('date')} className="p-3 cursor-pointer">
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
              </th>

              <th onClick={() => handleSort('category')} className="p-3 cursor-pointer">
                Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
              </th>

              <th onClick={() => handleSort('amount')} className="p-3 text-right cursor-pointer">
                Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
              </th>

            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(tx => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">

                  <td className="p-3">{tx.title}</td>
                  <td className="p-3">{formatDate(tx.date)}</td>

                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {tx.category}
                    </span>
                  </td>

                  <td className={`p-3 text-right font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount?.toFixed(2)}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TransactionHistory;