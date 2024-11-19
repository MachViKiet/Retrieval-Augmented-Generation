import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useProfile } from '~/apis/Profile'
import { connectSocket, disconnectSocket } from '~/socket'
import { refresh } from '~/store/actions/authActions'

function AppLayout() {

  const dispatch = useDispatch()

  const token = localStorage.getItem('token');
  const [isProcess, setIsProcess] = useState([])
  const [isFirstRendering, setFirstRendering] = useState(true);
  const auth = useSelector(state => state.auth)


  auth.loggedIn && connectSocket(auth.token)

  const changeFavicon = (iconURL) => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = iconURL;
    document.getElementsByTagName("head")[0].appendChild(link);
  };

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000000) + 1;
  };

  const processHandler = {
    add : (eventCode) => {
      const id = generateRandomId()
      setIsProcess(prev => [...prev, eventCode + '_' + id])
      return id
    },
    remove: (eventCode, eventID) => setIsProcess(prev => {
      return prev.filter((event) => event != eventCode + '_' + eventID )
    }),
    list: () => setIsProcess( prev => {
      console.log('Processing: ', prev)
      return prev
    })
  }

  useEffect(() => {
    if(isFirstRendering) {
      document.title = "Loading...";
      changeFavicon('/chatbot.svg')

      if(token) {
        const eventID = processHandler.add('#verifyToken')
        useProfile.verifyToken(token).then((usr_profile) => {
          dispatch(refresh(token, usr_profile))
          processHandler.remove('#verifyToken', eventID)
        })
      }
    }

    setFirstRendering(false)

    return () => {
      
    } 
  }, [])

  return <>
  <Box sx = {{ height: '100vh', position: 'relative' }}>
    {isProcess.length !== 0 && <Box sx = {{ width: '100%', height: '100%', position: 'absolute', background: theme =>theme.palette.mode == 'dark' ? '#414040bf' : '#000000b5', zIndex: '10000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress color="inherit" />
    </Box>}
    <Outlet context={{ isProcess, processHandler }} />
  </Box> </>

}

export default AppLayout