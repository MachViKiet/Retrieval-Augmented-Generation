import React, { useEffect } from 'react'
import UnknowPage from '../../components/Page/UnknowPage';
import { useOutletContext } from 'react-router-dom';
import { Box, FormControl, FormLabel, TextField } from '@mui/material';

function Setting() {

  const { processHandler, dashboard } = useOutletContext()

  useEffect(() => {
    document.title = 'Chatbot - Cài Đặt';
    dashboard.navigate.active(355)

    return () => ( dashboard.navigate.active('#') )
  })

  return (
    <>
      <FormControl  sx={{gap: 1, display: 'flex', width: '100%'}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormLabel htmlFor="name" sx = {{ color: 'inherit' }}>Họ Và Tên</FormLabel>
        </Box>
        <TextField id="user_name" required fullWidth variant="outlined"
          sx = {{ 
            color: '#fff',
            '& fieldset': {
              borderColor: `#000 !important`,
            },
          }}
        />
      </FormControl>
    </>
  )
}

export default Setting
