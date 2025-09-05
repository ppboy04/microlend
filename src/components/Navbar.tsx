
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Moon, Sun, LogOut, User, DollarSign} from 'lucide-react';
import { useStore } from '../store/useStore';

const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, isDarkMode, toggleDarkMode, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-800 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MicroLend
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`hover:text-blue-600 transition-colors ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                {currentUser.role === 'lender' && (
                  <Link 
                    to="/browse" 
                    className={`hover:text-blue-600 transition-colors ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Browse Loans
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`hover:text-blue-600 transition-colors ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User menu */}
            {isAuthenticated && currentUser && (
              <div className="relative group">
                <button className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}>
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="hidden md:block">{currentUser.name}</span>
                </button>

                {/* Dropdown */}
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                  isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  <div className="py-1">
                    <div className={`px-4 py-2 text-sm border-b ${
                      isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'
                    }`}>
                      <div className="font-medium">{currentUser.name}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {currentUser.role === 'borrower' ? 'Borrower' : 'Lender'}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 transition-colors flex items-center space-x-2 ${
                        isDarkMode ? 'text-gray-300 hover:bg-red-900/20' : 'text-gray-700'
                      }`}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
