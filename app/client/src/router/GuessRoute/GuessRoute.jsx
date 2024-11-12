import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refresh } from '~/store/actions/authActions';

const GuessRoute = ({ children }) => {

  const dispatch = useDispatch()

  const accessToken = sessionStorage.getItem('accessToken');
  const user_profile = JSON.parse(sessionStorage.getItem('userProfile'));

  if(!accessToken || !user_profile) {
    return children
  }

  dispatch(refresh(accessToken, user_profile))
  if(user_profile?.role && ['administrator', 'academic_administration'].includes(user_profile.role)){
      return <Navigate to="/dashboard" />;
  }
  return <Navigate to="/" />;
};

export default GuessRoute;