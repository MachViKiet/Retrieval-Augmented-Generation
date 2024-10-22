import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';

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
    <div>
      
    </div>
  )
}

export default Setting
