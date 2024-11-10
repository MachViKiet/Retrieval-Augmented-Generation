import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';

function Chat() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    document.title = 'Chatbot - Trò Chuyện';
    dispatch(sidebarAction({index: 121}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })
  return (
    <div>Chat</div>
  )
}

export default Chat