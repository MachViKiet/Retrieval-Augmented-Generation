import { Avatar, Box } from '@mui/material'
import React from 'react'

function AvatarUserDefault() {
  return (
    <Box sx = {{ 
      padding: '2px',
      background: '#ffffff1a',
      borderRadius: '50%',
      marginRight: 1,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
     }}>
      <Avatar alt="Remy Sharp" src="https://pics.craiyon.com/2023-06-08/8f12f7763653463289268bdca7185690.webp" />
    </Box>
  )
}

export default AvatarUserDefault