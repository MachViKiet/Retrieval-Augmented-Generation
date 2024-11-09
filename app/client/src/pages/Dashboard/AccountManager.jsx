import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import UnknowPage from '../../components/Page/UnknowPage';

function AccountManager() {
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tài Khoản';
    dispatch(sidebarAction({index: 674}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })
  return (
      <UnknowPage/>
  )
}

export default AccountManager
