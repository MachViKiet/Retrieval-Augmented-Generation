import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UnknowPage from '~/components/Page/UnknowPage';
import { refresh } from '~/store/actions/authActions';

const AdminRoute = ({ children }) => {
  const dispatch = useDispatch()

  const accessToken = sessionStorage.getItem('accessToken');
  const user_profile = JSON.parse(sessionStorage.getItem('userProfile'));

  if(!accessToken || !user_profile) {
    return <Navigate to="/signin" />;
  }

  if(!useSelector((state) => state.auth.user) || !useSelector((state) => state.auth.token)){
    // 'administrator', 'academic_administration'
    if(user_profile?.role && !(['administrator', 'academic_administration'].includes(user_profile.role))){
      return <UnknowPage/>;
    }

    dispatch(refresh(accessToken, user_profile))
  }

  return children;
};

export default AdminRoute;