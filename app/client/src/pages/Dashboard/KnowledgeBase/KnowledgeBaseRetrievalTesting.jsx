import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate_subnav, navigate as sidebarAction } from '~/store/actions/navigateActions'

function KnowledgeBaseRetrievalTesting() {
  const dispatch = useDispatch()

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
    </div>
  )
}

export default KnowledgeBaseRetrievalTesting
