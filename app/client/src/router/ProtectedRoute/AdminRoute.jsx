import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import { useProfile } from '~/apis/Profile';
import { refresh } from '~/store/actions/authActions';

const AdminRoute = ({ children }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth)
  const { processHandler } = useOutletContext();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if(token){
      if (!auth.loggedIn) {
        const eventID = processHandler.add('#verifyToken')
        useProfile.verifyToken(token).then((usr_profile) => {
          dispatch(refresh(token, usr_profile))
          processHandler.remove('#verifyToken', eventID)
          if(usr_profile?.role && !(['administrator', 'academic_administration'].includes(usr_profile?.role))){
            navigate('/')
          }

        }).catch((error) => {
          console.log(error)
        })
      } else {
        const usr_profile = auth.user
        if(usr_profile?.role && !(['administrator', 'academic_administration'].includes(usr_profile?.role))){
          navigate('/')
        }
      }
    }
  }, [])

  return children
};

export default AdminRoute;