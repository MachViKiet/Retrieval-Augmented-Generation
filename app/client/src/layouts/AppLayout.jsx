import { Box, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useProfile } from '~/apis/Profile'
import { connectSocket } from '~/socket'
import { refresh } from '~/store/actions/authActions'

function AppLayout() {
  const generateRandomId = () => { return Math.floor(Math.random() * 1000000000) + 1 };

  const dispatch = useDispatch()

  const token = localStorage.getItem('token');
  const [isProcess, setIsProcess] = useState([])
  const [isFirstRendering, setFirstRendering] = useState(true);
  const auth = useSelector(state => state.auth)
  const [notifications, setNotification] = useState([])
  const demo  = [{
    status: 'success',
    message: 'Cập nhật thành công'
  },
  {
    status: 'warning',
    message: 'Cập nhật thành công'
  },
  {
    status: 'error',
    message: 'Cập nhật thành công'
  }]
  const noticeHandler = {
    add: (noti_json) => {
      const id = generateRandomId()
      const notice = {...noti_json, id }
      setNotification(prev => [...prev, notice].slice(0, 5))
    },
    remove: (id) => {
      setNotification(prev => prev.filter((prev) => (prev.id != id) ))
    }
  }

  auth.loggedIn && connectSocket(auth.token)

  const changeFavicon = (iconURL) => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = iconURL;
    document.getElementsByTagName("head")[0].appendChild(link);
  };


  const processHandler = {
    add : (eventCode) => {
      const id = generateRandomId()
      setIsProcess(prev => ([...prev, eventCode + '_' + id]))
      return id
    },
    remove: (eventCode, eventID) => setIsProcess(prev => {
      return prev.filter((event) => event != eventCode + '_' + eventID )
    }),
    list: () => setIsProcess( prev => {
      return prev
    })
  }

  useEffect(() => {
    if(isFirstRendering) {
      changeFavicon('/chatbot.svg')

      if(token) {
        const eventID = processHandler.add('#verifyToken')
        useProfile.verifyToken(token).then((usr_profile) => {
          dispatch(refresh(token, usr_profile))
        }).finally(() => processHandler.remove('#verifyToken', eventID))
      }
    }
    setFirstRendering(false)
  }, [])

  return <>
  <Box sx = {{ height: '100vh', position: 'relative' }}>
    {isProcess.length !== 0 && <Box sx = {{ width: '100%', height: '100%', position: 'absolute', background: theme =>theme.palette.mode == 'dark' ? '#414040bf' : '#000000b5', zIndex: '10000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress color="inherit" />
    </Box>}
    <Outlet context={{ processHandler, noticeHandler }} />
    <BasicAlerts noticeHandler = {noticeHandler} notifications = {notifications}/>
  </Box> </>

}

export default AppLayout

import Alert from '@mui/material/Alert'

const BasicAlerts = ({noticeHandler, notifications}) => {
  return <Box sx = {{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: 1, flexDirection: 'column' }}>
      {
        notifications.map((noti, zIndex) => (<>
          <AlertComponent onClose={() => {noticeHandler.remove(noti?.id)}}
            key = {noti?.id} severity= {noti.status} message={noti.message} duration = {(zIndex + 1) * 2000}/>
        </>))
      }
  </Box>
}

const AlertComponent = ({ onClose, severity, message, duration }) => {
  useEffect(() => {
    const AutoClose = setTimeout(() => onClose(), duration)
    return () => clearTimeout(AutoClose)
  })

  return <Alert severity= {severity} variant = "filled" onClose={onClose} >
    {message}</Alert>
}