
import React from 'react';
import { LoanPurpose } from '../types';

interface PurposeBadgeProps {
  purpose: LoanPurpose;
  className?: string;
}

const PurposeBadge: React.FC<PurposeBadgeProps> = ({ purpose, className = '' }) => {
  const getPurposeConfig = (purpose: LoanPurpose) => {
    switch (purpose) {
      case 'education':
        return {
          label: 'Education',
          icon: '🎓',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          darkBgColor: 'dark:bg-blue-900/20',
          darkTextColor: 'dark:text-blue-400'
        };
      case 'medical':
        return {
          label: 'Medical',
          icon: '🏥',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          darkBgColor: 'dark:bg-red-900/20',
          darkTextColor: 'dark:text-red-400'
        };
      case 'business':
        return {
          label: 'Business',
          icon: '💼',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          darkBgColor: 'dark:bg-green-900/20',
          darkTextColor: 'dark:text-green-400'
        };
      case 'personal':
        return {
          label: 'Personal',
          icon: '👤',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          darkBgColor: 'dark:bg-purple-900/20',
          darkTextColor: 'dark:text-purple-400'
        };
      default:
        return {
          label: 'Other',
          icon: '📋',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          darkBgColor: 'dark:bg-gray-800',
          darkTextColor: 'dark:text-gray-400'
        };
    }
  };

  const config = getPurposeConfig(purpose);

  return (
    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} ${config.darkBgColor} ${config.darkTextColor} ${className}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export default PurposeBadge;
