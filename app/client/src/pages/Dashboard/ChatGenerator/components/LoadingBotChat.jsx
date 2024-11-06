import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import BubbleChatLeft from '~/components/Chatbots/BubbleChatLeft';
import { motion } from "framer-motion"
import ReactMarkdown from 'react-markdown';

function LoadingBotChat({text, isHidden = false}) {
  
  return ( 
    isHidden && 
  <motion.div
    initial={{ transform: "scale(0)" }}
    animate={{ transform: "scale(1)" }}
    transition={{
    type: "spring",
    stiffness: 400,
    damping: 40,
  }}>
    <BubbleChatLeft
      text={
        <Typography variant='p' 
          sx = {{ 
            fontSize: '0.725rem',
            color: '#000',
            whiteSpace: 'pre-line', 
            textIndent: '2px', 
            lineHeight: 'normal' 
          }}>
            <ReactMarkdown>
            {text}
            </ReactMarkdown>
        </Typography>
      }
    />
       </motion.div>
  )
}

export default LoadingBotChat