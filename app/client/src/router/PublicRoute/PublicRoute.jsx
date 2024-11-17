import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refresh } from '~/store/actions/authActions';

const PublicRoute = ({ children }) => {
  return children;
};

export default PublicRoute;