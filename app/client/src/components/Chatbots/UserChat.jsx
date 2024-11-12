import { Typography } from '@mui/material';
import React from 'react'
import BubbleChatRight from '~/components/Chatbots/BubbleChatRight';
import { motion } from "framer-motion"

function UserChat({ message}) {
  return (
    <motion.div
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      transition={{
      type: "spring",
      stiffness: 400,
      damping: 40,
    }}>
      <BubbleChatRight
      text={
        <Typography variant='p' 
        sx = {{ 
            whiteSpace: 'pre-line', 
            textIndent: '2px', 
            wordWrap: 'break-word' ,
            color:'#fff',
            fontSize:'0.825rem'
        }}>
            {message}
        </Typography>
      }
      />
    </motion.div>
  )
}

export default UserChat