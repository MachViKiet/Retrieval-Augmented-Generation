import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refresh } from '~/store/actions/authActions';

const GuessRoute = ({ children }) => {

  const auth = useSelector((state) => state.auth)

  if(!auth.loggedIn) {
    return children
  }

  const user_profile = auth.user

  if(user_profile?.role && ['administrator', 'academic_administration'].includes(user_profile.role)){
      return <Navigate to="/dashboard" />;
  }
  return <Navigate to="/" />;
};

export default GuessRoute;