
import React from 'react';
import { TrustScore } from '../types';

interface TrustScoreBadgeProps {
  score: TrustScore;
  className?: string;
}

const TrustScoreBadge: React.FC<TrustScoreBadgeProps> = ({ score, className = '' }) => {
  const getScoreConfig = (score: TrustScore) => {
    switch (score) {
      case 'good':
        return {
          label: 'Good',
          icon: '🟢',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          darkBgColor: 'dark:bg-green-900/20',
          darkTextColor: 'dark:text-green-400'
        };
      case 'medium':
        return {
          label: 'Medium',
          icon: '🟡',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          darkBgColor: 'dark:bg-yellow-900/20',
          darkTextColor: 'dark:text-yellow-400'
        };
      case 'high-risk':
        return {
          label: 'High Risk',
          icon: '🔴',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          darkBgColor: 'dark:bg-red-900/20',
          darkTextColor: 'dark:text-red-400'
        };
      default:
        return {
          label: 'Unknown',
          icon: '⚪',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          darkBgColor: 'dark:bg-gray-800',
          darkTextColor: 'dark:text-gray-400'
        };
    }
  };

  const config = getScoreConfig(score);

  return (
    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} ${config.darkBgColor} ${config.darkTextColor} ${className}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export default TrustScoreBadge;
