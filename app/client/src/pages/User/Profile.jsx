import React from 'react'
import UserProfile from '../UserProfile'
import { Box, Container } from '@mui/material'

export function Profile() {
  return (
    <Box sx = {{ 
       maxHeight: 'calc(100vh - 80px)',
       overflow: 'auto',
       paddingX: 26,
       paddingY: 4
     }}>
      <UserProfile/>
    </Box>
  )
}

export default Profile