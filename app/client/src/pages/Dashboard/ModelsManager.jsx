import React, { useEffect } from 'react'
import UnknowPage from '../../components/Page/UnknowPage';
import { useOutletContext } from 'react-router-dom';

function ModelsManager() {

  const {processHandler, dashboard } = useOutletContext();

  useEffect(() => {
    document.title = 'Chatbot - Trang Chủ';
    dashboard.navigate.active(242)

    return () => ( dashboard.navigate.active('#') )
  })

  return (
    <UnknowPage/>
  )
}

export default ModelsManager
