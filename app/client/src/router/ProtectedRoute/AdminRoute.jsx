import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UnknowPage from '~/components/Page/UnknowPage';

const AdminRoute = ({ children }) => {

  const auth = useSelector((state) => state.auth)

  const user_profile = auth.user

  if(user_profile?.role && !(['administrator', 'academic_administration'].includes(user_profile.role))){
    return <UnknowPage/>;
  }

  return children;
};

export default AdminRoute;