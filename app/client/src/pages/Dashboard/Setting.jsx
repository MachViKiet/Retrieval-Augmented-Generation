import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import UnknowPage from '../../components/Page/UnknowPage';

function Setting({setSelectedIndex}) {

  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Chatbot - Cài Đặt';
    dispatch(sidebarAction({index: 355}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  return (
    <UnknowPage/>
  )
}

export default Setting
