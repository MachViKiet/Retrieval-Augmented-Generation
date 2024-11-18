import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UnknowPage from '~/components/Page/UnknowPage';

const UserRoute = ({ children }) => {

  const auth = useSelector((state) => state.auth)
  if (!auth.loggedIn) {
    return <Navigate to="/" />;
  }

  const user_profile = auth.user

  if(user_profile?.role && !(['administrator', 'academic_administration', 'student', 'researcher'].includes(user_profile.role))){
    return <UnknowPage/>;
  }

  return children;
};

export default UserRoute;