import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { navigate_subnav, navigate as sidebarAction } from '~/store/actions/navigateActions'

function KnowledgeBaseRetrievalTesting() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { processHandler, navHandler } = useOutletContext();
  const { id } = useParams();

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức - Thử Nghiệm'
    dispatch(sidebarAction({index: 346}))
    dispatch(navigate_subnav({index: 564, openSubSidebar : false}))

    !navHandler.get() && navigate('/knowledge_bases/' + id)

    return () => (
      dispatch(sidebarAction({index: null}))
    )
  })

  return (
    <div>
    </div>
  )
}

export default KnowledgeBaseRetrievalTesting
