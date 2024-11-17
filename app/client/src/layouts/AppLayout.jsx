import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { connectSocket, disconnectSocket } from '~/socket'

function AppLayout() {

  const auth = useSelector(state => state.auth)
  auth.loggedIn && connectSocket(auth.token)

  useEffect(() => {

    return () => {
      // disconnectSocket()
    } 
  }, [auth])

  return <Outlet/>
}

export default AppLayout