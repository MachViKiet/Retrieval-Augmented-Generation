import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refresh } from '~/store/actions/authActions';

const ProtectedRoute = ({ children }) => {
  // const accessToken = sessionStorage.getItem('accessToken');
  // const user_profile = sessionStorage.getItem('userProfile');
  const dispatch = useDispatch()

  if(!useSelector((state) => state.auth.user) || !useSelector((state) => state.auth.token)){
    const accessToken = sessionStorage.getItem('accessToken');
    const user_profile = sessionStorage.getItem('userProfile');
    if (!accessToken || !user_profile) {
      return <Navigate to="/signin" />;
    }
    dispatch(refresh(accessToken, JSON.parse(user_profile)))
  }

  // useSelector((state) => state.auth.user ? state.auth.user : {}) && sessionStorage.getItem('accessToken')

  // const user_profile = useSelector((state) => state.auth.user ? state.auth.user : {}) && sessionStorage.getItem('accessToken');
  // const accessToken = useSelector((state) => state.auth.token ? state.auth.token : {});

  // if (!accessToken || !user_profile) {
  //   return <Navigate to="/signin" />;
  // }

  // sessionStorage.setItem('accessToken', accessToken);
  // sessionStorage.setItem('userProfile', user_profile);

  return children;
};

export default ProtectedRoute;