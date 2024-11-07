import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = sessionStorage.getItem('accessToken');
  const user_profile = sessionStorage.getItem('userProfile');
  
  if (!accessToken || !user_profile) {
    return <Navigate to="/signin" />;
  }

  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('userProfile', user_profile);

  return children;
};

export default ProtectedRoute;