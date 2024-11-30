import { Box, Typography } from '@mui/material'
import React from 'react'

function Hidden() {
  return (
    <Box sx = {{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
     }}><Typography sx = {{ 
        fontSize: '1.5rem !important',
        color: theme => theme.palette.mode == 'dark' ? '#ffffff4d' : '#001f2b4d',
        fontWeight: '900'
      }}>Chức năng chưa được hỗ trợ !</Typography></Box>
  )
}

export default Hidden