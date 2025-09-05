
import React from 'react';
import { useStore } from '../store/useStore';
import BorrowerDashboard from './BorrowerDashboard';
import LenderDashboard from './LenderDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { currentUser, isAuthenticated } = useStore();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  return currentUser.role === 'borrower' ? <BorrowerDashboard /> : <LenderDashboard />;
};

export default Dashboard;
