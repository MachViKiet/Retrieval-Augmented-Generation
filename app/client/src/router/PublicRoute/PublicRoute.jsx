import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refresh } from '~/store/actions/authActions';

const PublicRoute = ({ children }) => {
  const auth = useSelector(state => state.auth)

  if(auth.loggedIn) {
    if(auth.user?.role && (['administrator', 'academic_administration' ].includes(auth.user.role))) {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
};

export default PublicRoute;