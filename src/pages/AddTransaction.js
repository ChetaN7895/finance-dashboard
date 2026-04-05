import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';

const AddTransaction = ({ onAddTransaction }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (transaction) => {
    // 🛑 Prevent double submit
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      // ✅ Basic validation (extra safety)
      if (!transaction || !transaction.amount || !transaction.title) {
        throw new Error('Please fill all required fields');
      }

      // ✅ Add ID + Date (if not coming from form)
      const newTransaction = {
        ...transaction,
        id: Date.now(), // unique id
        date: transaction.date || new Date().toISOString(),
      };

      // ✅ Call parent function
      await onAddTransaction?.(newTransaction);

      // ✅ Redirect after success
      navigate('/');
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError(err.message || 'Failed to add transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Add New Transaction
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          ← Back
        </button>
      </div>

      {/* Card */}
      <div className="card p-6">

        {/* ❌ Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* 📝 Form */}
        <TransactionForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting}
        />

        {/* ⏳ Loading Button (optional UI improvement) */}
        {isSubmitting && (
          <p className="text-sm text-gray-500 mt-3">
            Adding transaction...
          </p>
        )}
      </div>
    </div>
  );
};

export default AddTransaction;