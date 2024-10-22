import { Avatar, Box } from '@mui/material'
import React from 'react'

function AvatarUserDefault() {
  return (
    <Box sx = {{ 
      padding: '2px',
      background: '#ffffff1a',
      borderRadius: '50%',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
     }}>
      <Avatar alt="Remy Sharp" src="https://ouch-cdn2.icons8.com/5d_N4vqenhj0NUReyP1FgsShuxiNde_3l6lL7-FxQ3I/rs:fit:368:343/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTE5/LzExODljMWUzLWVj/YzUtNGQ5Ni04MjU5/LTE5Zjg1Y2Q5ZWRm/NC5zdmc.png" />
    </Box>
  )
}

export default AvatarUserDefault