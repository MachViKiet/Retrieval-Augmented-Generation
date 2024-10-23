import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const GuessRoute = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default GuessRoute;