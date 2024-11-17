import React from 'react'
import { motion } from "framer-motion"
import ReactMarkdown from 'react-markdown';
import { BubbleLeft } from '../MessageEffect/BubbleLeft';
import { ChatMessage } from './ChatDisplay';
import { Avatar } from '@mui/material';

function UserTypingMessageBlock({messageHandler, sx = {}}) {
  return ( messageHandler?.stream_state && 
    <motion.div
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      transition={{
      type: "spring",
      stiffness: 400,
      damping: 40,
    }}>

        <Box sx = {{ ...ChatDisplay_Style, justifyContent: 'start' }}>
          <ChatMessage sx = {{   
              marginLeft: '20px',
              background: 'linear-gradient(319deg, rgb(255 255 255) 0%, rgb(186 173 255) 100%)',
              color: '#000'
            }}>
                <ReactMarkdown>
                  {messageHandler?.stream_message}
                </ReactMarkdown>
            <BubbleLeft/>
          </ChatMessage>
          <Avatar alt="ChatBot" src="https://pics.craiyon.com/2023-06-08/8f12f7763653463289268bdca7185690.webp" />
        </Box>

      {/* <BubbleChatLeft
        sx = {sx?.box}
        text={
          <Typography variant='p' 
            sx = {{ 
              fontSize: '0.825rem',
              color: '#000',
              whiteSpace: 'pre-line', 
              textIndent: '2px', 
              lineHeight: 'normal' ,
              ...sx?.text
            }}>
              <ReactMarkdown>
                {messageHandler?.stream_message}
              </ReactMarkdown>
          </Typography>
        }
      /> */}
    </motion.div>
  )
}

export default UserTypingMessageBlock