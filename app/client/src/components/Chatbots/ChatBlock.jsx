import { Box } from '@mui/material'
import React from 'react'

function ChatBlock({children}) {
  return (
    <Box sx = {{ 
        height: '100%',
        position: 'relative',
        maxHeight: 'calc(100vh - 225px)',
        overflow: 'auto'
     }}>
        <Box sx = {{ 
            position: 'relative',
            width: '100%',
            paddingX: '20px'
         }}>
            {children}
        </Box>
    </Box>
  )
}

export default ChatBlock
