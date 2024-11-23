import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

function Dashboard() {
  const {processHandler, dashboard } = useOutletContext();

  useEffect(() => {
    document.title = 'Chatbot - Trang Chủ';
    dashboard.navigate.active(234)

    return () => ( dashboard.navigate.active('#') )
  })

  return (
    <></>
  )
}

export default Dashboard
