import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Test from '~/components/Test'
import { navigate_subnav, navigate as sidebarAction } from '~/store/actions/navigateActions'

function KnowledgeBaseRetrievalTesting() {
  const dispatch = useDispatch()
  const nagative = useNavigate()

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức - Thử Nghiệm'
    dispatch(sidebarAction({index: 346}))
    dispatch(navigate_subnav({index: 564, openSubSidebar : false}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  return (
    <div>
      <Test/>
    </div>
  )
}

export default KnowledgeBaseRetrievalTesting
