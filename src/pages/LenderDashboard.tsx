
import React, { useState } from 'react';
import {TrendingUp, Globe, Award, DollarSign, Heart} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import TrustScoreBadge from '../components/TrustScoreBadge';
import PurposeBadge from '../components/PurposeBadge';
import ProgressBar from '../components/ProgressBar';
import toast from 'react-hot-toast';

const LenderDashboard: React.FC = () => {
  const { currentUser, isDarkMode, getAvailableLoans, getLenderInvestments, fundLoan } = useStore();
  const [fundingAmounts, setFundingAmounts] = useState<Record<string, string>>({});

  const availableLoans = getAvailableLoans();
  const myInvestments = currentUser ? getLenderInvestments(currentUser.id) : [];

  const handleFundLoan = (loanId: string) => {
    const amount = parseFloat(fundingAmounts[loanId] || '0');
    
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const loan = availableLoans.find(l => l.id === loanId);
    if (!loan) return;

    const remainingAmount = loan.amount - loan.fundedAmount;
    if (amount > remainingAmount) {
      toast.error(`Maximum amount you can fund is $${remainingAmount}`);
      return;
    }

    fundLoan(loanId, amount);
    setFundingAmounts(prev => ({ ...prev, [loanId]: '' }));
    toast.success(`Successfully funded $${amount}!`);
  };

  const updateFundingAmount = (loanId: string, amount: string) => {
    setFundingAmounts(prev => ({ ...prev, [loanId]: amount }));
  };

  if (!currentUser) return null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Lender Dashboard
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Browse loan requests and track your investments
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
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentUser.name}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Lender
                </p>
              </div>

              <div className="space-y-4">
                {/* Social Impact Score */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Social Impact Score
                  </span>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4 text-green-500" />
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentUser.socialImpactScore || 0}
                    </span>
                  </div>
                </div>

                {/* Total Invested */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Total Invested
                  </span>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${myInvestments.reduce((sum, inv) => sum + inv.amountFunded, 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-2">
                  <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Badges Earned
                  </h4>
                  {currentUser.badges && currentUser.badges.length > 0 ? (
                    <div className="space-y-1">
                      {currentUser.badges.map((badge, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded-lg text-xs font-medium text-center ${
                            isDarkMode ? 'bg-purple-900/20 text-purple-300' : 'bg-purple-50 text-purple-800'
                          }`}
                        >
                          {badge}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Start funding loans to earn badges!
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Browse Loan Requests */}
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
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Browse Loan Requests
              </h2>

              {availableLoans.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    No loan requests available at the moment.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {availableLoans.map((loan) => (
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
                          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {loan.borrowerName}
                          </h3>
                          <TrustScoreBadge score={loan.borrowerTrustScore} />
                        </div>
                        <PurposeBadge purpose={loan.purpose} />
                      </div>

                      <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {loan.description}
                      </p>

                      <ProgressBar
                        current={loan.fundedAmount}
                        total={loan.amount}
                        className="mb-4"
                        color="purple"
                      />

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Duration: {loan.duration} months • Created: {loan.createdAt.toLocaleDateString()}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            placeholder="Amount"
                            value={fundingAmounts[loan.id] || ''}
                            onChange={(e) => updateFundingAmount(loan.id, e.target.value)}
                            className={`w-24 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                          <button
                            onClick={() => handleFundLoan(loan.id)}
                            className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                          >
                            Fund
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* My Investments */}
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
                My Investments
              </h2>

              {myInvestments.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    No investments yet. Start funding loans above!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myInvestments.map((investment) => (
                    <div
                      key={`${investment.loan.id}-${currentUser.id}`}
                      className={`p-4 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {investment.loan.borrowerName}
                          </h3>
                          <PurposeBadge purpose={investment.loan.purpose} />
                        </div>
                        <div className={`text-sm font-semibold ${
                          investment.loan.status === 'completed' ? 'text-green-600' :
                          investment.loan.status === 'in-progress' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {investment.loan.status.charAt(0).toUpperCase() + investment.loan.status.slice(1)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          Your investment: ${investment.amountFunded.toLocaleString()}
                        </span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Duration: {investment.loan.duration} months
                        </span>
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

export default LenderDashboard;
