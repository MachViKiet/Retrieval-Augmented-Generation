import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';

function FAQs() {
  
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Chatbot - FAQs';
    dispatch(sidebarAction({index: 122}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })
  return (
    <div>FAQs</div>
  )
}

export default FAQs