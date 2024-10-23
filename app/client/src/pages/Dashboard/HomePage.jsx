import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import { useDispatch } from 'react-redux'

const MuiDivider = styled(Box)  (({theme}) => ({
  background: '#ffffff63',
  height: '1px',
  width: '100%',
  marginTop: theme.spacing(1.5),
  marginBottom: '14px'
}))


function HomePage() {
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Chatbot - Trang Chủ';
    dispatch(sidebarAction({index: 234}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  return (
    <>
      {/* <MuiDivider/> */}
    </>
  )
}

export default HomePage
