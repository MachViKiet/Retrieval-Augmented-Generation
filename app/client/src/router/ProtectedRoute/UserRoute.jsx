import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UnknowPage from '~/components/Page/UnknowPage';
import { refresh } from '~/store/actions/authActions';

const UserRoute = ({ children }) => {
  // const accessToken = sessionStorage.getItem('accessToken');
  // const user_profile = sessionStorage.getItem('userProfile');
  const dispatch = useDispatch()

  if(!useSelector((state) => state.auth.user) || !useSelector((state) => state.auth.token)){
    const accessToken = sessionStorage.getItem('accessToken');
    let user_profile = sessionStorage.getItem('userProfile');
    if (!accessToken || !user_profile) {
      return <Navigate to="/signin" />;
    }
    user_profile = JSON.parse(user_profile)
    
    // 'student', 'researcher', 'administrator', 'academic_administration'

    dispatch(refresh(accessToken, user_profile))
  }

  return children;
};

export default UserRoute;