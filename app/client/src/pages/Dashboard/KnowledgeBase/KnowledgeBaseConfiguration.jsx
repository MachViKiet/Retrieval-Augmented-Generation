import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MuiTable from '~/components/MuiTable/MuiTable'
import { navigate_subnav, navigate as sidebarAction } from '~/store/actions/navigateActions'

function KnowledgeBaseConfiguration() {
  const dispatch = useDispatch()
  const nagative = useNavigate()

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức - Cấu Hình'
    dispatch(sidebarAction({index: 346}))
    dispatch(navigate_subnav({index: 893, openSubSidebar : false}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  return (
      <MuiTable/>
  )
}

export default KnowledgeBaseConfiguration
