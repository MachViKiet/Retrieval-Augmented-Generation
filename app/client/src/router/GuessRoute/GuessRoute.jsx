import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const GuessRoute = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)

  if(user && token){
    if(['administrator', 'academic_administration'].includes(user.role)){
      return <Navigate to="/dashboard" />;
    }
    return <Navigate to="/" />;
  }

  return children;
};

export default GuessRoute;