import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';

function UploadFile() {

  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Chatbot - Tài liệu';
    dispatch(sidebarAction({index: 342}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  return (
    <div>
      
    </div>
  )
}

export default UploadFile
