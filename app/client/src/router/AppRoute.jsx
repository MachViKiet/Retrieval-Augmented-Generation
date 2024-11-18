import { Backdrop, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useProfile } from '~/apis/Profile';
import { refresh } from '~/store/actions/authActions';

function AppRoute({children}) {
    
  const token = localStorage.getItem('token');
  const dispatch = useDispatch()

  const [isProcess, setIsProcess] = useState(true)
  
  if(token) {
    useProfile.verifyToken(token).then((usr_profile) => {
      dispatch(refresh(token, usr_profile))
      setIsProcess(false)
    })
  }
  else {
    setTimeout(() => {
      setIsProcess(false)
    }, 100);
  }

  return isProcess ? (<Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={true}
  >
    <CircularProgress color="inherit" />
  </Backdrop>) : children
}

export default AppRoute