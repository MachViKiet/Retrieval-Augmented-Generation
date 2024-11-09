import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UnknowPage from '~/components/Page/UnknowPage';
import { refresh } from '~/store/actions/authActions';

const ProtectedRoute = ({ children }) => {
  // const accessToken = sessionStorage.getItem('accessToken');
  // const user_profile = sessionStorage.getItem('userProfile');
  const dispatch = useDispatch()

  let accessToken = sessionStorage.getItem('accessToken');
  let user_profile = sessionStorage.getItem('userProfile');

  if(!useSelector((state) => state.auth.user) || !useSelector((state) => state.auth.token)){
    accessToken = sessionStorage.getItem('accessToken');
    user_profile = sessionStorage.getItem('userProfile');
    if (!accessToken || !user_profile) {
      return <Navigate to="/signin" />;
    }
    user_profile = JSON.parse(user_profile)
    
    // 'administrator', 'academic_administration'
    if(user_profile.role != 'administrator' && user_profile.role != 'academic_administration'){
      return <UnknowPage/>;
    }

    dispatch(refresh(accessToken, user_profile))
  }

  return children;
};

export default ProtectedRoute;