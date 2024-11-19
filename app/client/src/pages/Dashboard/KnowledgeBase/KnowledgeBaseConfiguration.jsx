import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { navigate_subnav, navigate as sidebarAction } from '~/store/actions/navigateActions'

function KnowledgeBaseConfiguration() {
  const dispatch = useDispatch()
  const nagative = useNavigate()

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức - Cấu Hình'
    dispatch(sidebarAction({index: 346}))
    dispatch(navigate_subnav({index: 893, openSubSidebar : false}))
    return () => (
      dispatch(sidebarAction({index: null}))
    )
  })

  return (
      <div>

        
      </div>
  )
}

export default KnowledgeBaseConfiguration
