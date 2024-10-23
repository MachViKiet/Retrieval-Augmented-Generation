import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';

function ModelsManager() {

  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Mô Hình';
    dispatch(sidebarAction({index: 242}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  return (
    <div>
      
    </div>
  )
}

export default ModelsManager
