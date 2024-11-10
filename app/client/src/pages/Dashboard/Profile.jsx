import React from 'react'
import UserProfile from '../UserProfile'
import { Box } from '@mui/material'

export function Profile() {
  return (
    <Box sx ={{ 
      maxHeight: 'calc(100vh - 40px)',
      overflow: 'auto',
      padding: 2
     }}>
      <UserProfile/>
    </Box>
  )
}

export default Profile