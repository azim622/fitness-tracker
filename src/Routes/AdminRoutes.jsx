import React from 'react';
import useAuth from '../Hooks/UseAuth';
import UseAdmin from '../Hooks/UseAdmin';
import { useLocation } from 'react-router-dom';

const AdminRoutes = () => {
    const { user, loading } = useAuth(); 
  const [isAdmin, isAdminLoading] = UseAdmin();
  const location = useLocation(); 

  // Show loading spinner if data is being fetched
  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  // If user is authenticated and isAdmin, render children
  if (user && isAdmin) {
    return children;
  }

  // If not admin, redirect to home with state
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoutes;