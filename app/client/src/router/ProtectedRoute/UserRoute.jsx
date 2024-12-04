import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import { useProfile } from '~/apis/Profile';
import UnknowPage from '~/components/Page/UnknowPage';
import { refresh } from '~/store/actions/authActions';

const UserRoute = ({ children }) => {

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
        console.log('user routing')
        useProfile.verifyToken(token).then((usr_profile) => {
          dispatch(refresh(token, usr_profile))
          processHandler.remove('#verifyToken', eventID)

          if(usr_profile?.role && !(['student', 'researcher'].includes(usr_profile?.role))){
            if(!['administrator', 'academic_administration'].includes(usr_profile?.role)){
              navigate('/')
            } else navigate('/chat_generator')
          }
        }).catch((error) => {
          
          processHandler.remove('#verifyToken', eventID)
          console.error("Server không hoạt động!\n", error)
          navigate('/')
        })
      } else {
        const usr_profile = auth.user
        if(usr_profile?.role && !(['student', 'researcher'].includes(usr_profile?.role))){
          if(!['administrator', 'academic_administration'].includes(usr_profile?.role)){
            navigate('/')
          } else navigate('/chat_generator')
        }
      }
    }
  }, [])

  // const auth = useSelector((state) => state.auth)
  // if (!auth.loggedIn) {
  //   return <Navigate to="/" />;
  // }

  // const user_profile = auth.user

  // if(user_profile?.role && !(['administrator', 'academic_administration', 'student', 'researcher'].includes(user_profile.role))){
  //   return <UnknowPage/>;
  // }

  return children;
};

export default UserRoute;