import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';

function FeedBack() {
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Chatbot - Phản Hồi';
    dispatch(sidebarAction({index: 123}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })
  return (
    <div>FeedBack</div>
  )
}

export default FeedBack