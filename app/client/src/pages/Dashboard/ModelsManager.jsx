import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import UnknowPage from '../../components/Page/UnknowPage';

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
    <UnknowPage/>
  )
}

export default ModelsManager
