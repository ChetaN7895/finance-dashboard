import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TransactionTable = ({ transactions = [], showCategory = true }) => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">

          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              {showCategory && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={showCategory ? 4 : 3} className="text-center py-6 text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">

                  {/* Description */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'income'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'income' ? <FaArrowUp /> : <FaArrowDown />}
                      </div>

                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.title}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </td>

                  {/* Category */}
                  {showCategory && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {transaction.category}
                      </span>
                    </td>
                  )}

                  {/* Amount */}
                  <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">

        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="card">

              <div className="flex justify-between items-center">

                {/* Left Side */}
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'income' ? <FaArrowUp /> : <FaArrowDown />}
                  </div>

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div className={`text-sm font-bold ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>

              </div>

              {/* Category */}
              {showCategory && (
                <div className="mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {transaction.category}
                  </span>
                </div>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default TransactionTable;