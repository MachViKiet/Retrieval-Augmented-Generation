import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import BubbleChatLeft from '~/components/Chatbots/BubbleChatLeft'
import LoadingDot from '~/components/LoadingDot'
import CheckIcon from '@mui/icons-material/Check';
import { motion } from "framer-motion"

function Loading({isLoading, sx = {}}) {
  return (
    isLoading.state && <>
      <BubbleChatLeft
      sx = {sx?.box}
      text={
        <>
          {/* <LoadingDot/> */}
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Typography variant='p' sx = {{  fontSize: '0.825rem', color: '#000' }}>Đang tìm kiếm</Typography>
          <LoadingDot/>
          </Box>

          <LinearProgress color="grey" sx = {{
            height: '2px',
            borderRadius: '10px',
            marginBottom: '5px',
            marginTop: '2px'
          }}/>

          {isLoading.noticeLoad.map((text, index, array) => (
            <motion.div
            key={index}
                initial={{ transform: "scale(0)" }}
                animate={{ transform: "scale(1)" }}
                transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
              }}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                { index === array.length - 1  ? 
                  <CircularProgress size="10px" sx = {{ marginRight: '8px' }}/>
                  : <CheckIcon sx = {{fontSize:"14px", marginRight: '4px', color: '#09d953' }} />}
                <Typography variant='p' sx = {{  fontSize: '0.725rem', color: '#000' }}>{text} { index !== array.length - 1 && isLoading.timing.length == array.length ? <span style={{ fontWeight: '900' }}>{isLoading.timing[index]}s</span> : ''} </Typography>
              </Box>
            </motion.div>
            ))}
        </>
      }
      />
    </>
  )
}

export default Loading