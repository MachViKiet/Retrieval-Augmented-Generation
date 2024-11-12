import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refresh } from '~/store/actions/authActions';

const PublicRoute = ({ children }) => {
    const dispatch = useDispatch()

      const accessToken = sessionStorage.getItem('accessToken');
      const user_profile = JSON.parse(sessionStorage.getItem('userProfile'));

      if(!user_profile || !accessToken){
        return children
      }

      if(!useSelector((state) => state.auth.user) || !useSelector((state) => state.auth.token)){
        dispatch(refresh(accessToken, user_profile))
      }

  return children;
};

export default PublicRoute;