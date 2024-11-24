import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import UnknowPage from '../../components/Page/UnknowPage';
import { useOutletContext } from 'react-router-dom';

function AccountManager() {
  const dispatch = useDispatch()
  const {processHandler, dashboard } = useOutletContext();

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tài Khoản'
    dashboard.navigate.active(674)
    
    return () => ( dashboard.navigate.active('#') )
  }, [])

  return (
      <UnknowPage/>
  )
}

export default AccountManager
