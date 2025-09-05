
import React from 'react';
import {DollarSign, Heart} from 'lucide-react';
import { useStore } from '../store/useStore';

const Footer: React.FC = () => {
  const { isDarkMode } = useStore();

  return (
    <footer className={`border-t transition-colors ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-800 text-gray-300' 
        : 'bg-gray-50 border-gray-200 text-gray-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and tagline */}
          <div className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MicroLend
            </span>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-1 text-sm">
            <span>© 2025 MicroLend – Building financial inclusion with</span>
            <Heart className="h-4 w-4 text-red-500" />
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <a 
              href="#" 
              className={`hover:text-blue-600 transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Privacy
            </a>
            <a 
              href="#" 
              className={`hover:text-blue-600 transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Terms
            </a>
            <a 
              href="#" 
              className={`hover:text-blue-600 transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
