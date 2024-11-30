import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import Hidden from '~/components/Page/Hidden';

function Dashboard() {
  const {processHandler, dashboard } = useOutletContext();

  useEffect(() => {
    document.title = 'Chatbot - Trang Chủ';
    dashboard.navigate.active(234)

    return () => ( dashboard.navigate.active('#') )
  })

  return (
    <Hidden></Hidden>
  )
}

export default Dashboard
