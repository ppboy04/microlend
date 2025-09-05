
import React, { useState } from 'react';
import {Plus, TrendingUp, Clock, CheckCircle, Award} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { LoanPurpose } from '../types';
import TrustScoreBadge from '../components/TrustScoreBadge';
import PurposeBadge from '../components/PurposeBadge';
import ProgressBar from '../components/ProgressBar';
import toast from 'react-hot-toast';

const BorrowerDashboard: React.FC = () => {
  const { currentUser, isDarkMode, createLoan, getBorrowerLoans } = useStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    duration: '',
    purpose: 'education' as LoanPurpose,
    description: ''
  });

  const borrowerLoans = currentUser ? getBorrowerLoans(currentUser.id) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.duration || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    const duration = parseInt(formData.duration);

    if (amount <= 0 || duration <= 0) {
      toast.error('Please enter valid amounts');
      return;
    }

    createLoan(amount, duration, formData.purpose, formData.description);
    setFormData({ amount: '', duration: '', purpose: 'education', description: '' });
    setShowCreateForm(false);
    toast.success('Loan request created successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  if (!currentUser) return null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Borrower Dashboard
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your loan requests and track your progress
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Widget */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="text-center mb-6">
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="h-20 w-20 rounded-full mx-auto mb-4 object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentUser.name}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Borrower
                </p>
              </div>

              <div className="space-y-4">
                {/* Trust Score */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Trust Score
                  </span>
                  <TrustScoreBadge score={currentUser.trustScore || 'medium'} />
                </div>

                {/* Repayment Streak */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Repayment Streak
                  </span>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentUser.repaymentStreak || 0} months
                    </span>
                  </div>
                </div>

                {/* Badge */}
                {(currentUser.repaymentStreak || 0) > 6 && (
                  <div className={`p-3 rounded-lg text-center ${
                    isDarkMode ? 'bg-yellow-900/20 text-yellow-300' : 'bg-yellow-50 text-yellow-800'
                  }`}>
                    <div className="text-lg mb-1">🏅</div>
                    <div className="text-xs font-medium">On-time Repayer</div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Create Loan Request */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create Loan Request
                </h2>
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Request</span>
                </button>
              </div>

              {showCreateForm && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Loan Amount ($)
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="e.g., 2500"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Duration (months)
                      </label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 12"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Purpose
                    </label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="education">Education</option>
                      <option value="medical">Medical</option>
                      <option value="business">Business</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe what you need the loan for..."
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className={`px-6 py-2 rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* My Loan Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                My Loan Requests
              </h2>

              {borrowerLoans.length === 0 ? (
                <div className="text-center py-8">
                  <div className={`text-gray-400 mb-2`}>
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                  </div>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    No loan requests yet. Create your first request above!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {borrowerLoans.map((loan) => (
                    <div
                      key={loan.id}
                      className={`p-4 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <PurposeBadge purpose={loan.purpose} />
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(loan.status)}
                            <span className={`text-sm font-medium ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {loan.createdAt.toLocaleDateString()}
                        </span>
                      </div>

                      <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {loan.description}
                      </p>

                      <ProgressBar
                        current={loan.fundedAmount}
                        total={loan.amount}
                        className="mb-3"
                      />

                      <div className="text-xs text-gray-500">
                        Duration: {loan.duration} months
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;
