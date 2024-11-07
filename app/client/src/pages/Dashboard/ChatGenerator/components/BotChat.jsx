import React from 'react'
import { Typography } from '@mui/material';
import BubbleChatLeft from '~/components/Chatbots/BubbleChatLeft';
import ReactMarkdown from 'react-markdown';

function BotChat({message,metadata, setOpenDetail}) {

  return (
    <BubbleChatLeft
      text={
        <Typography variant='p'
        onClick = {() => {
          setOpenDetail(metadata.id)
        }} 
          sx = {{ 
            fontSize: '0.725rem',
            color: '#000',
            whiteSpace: 'pre-line', 
            textIndent: '2px', 
            lineHeight: 'normal',
            cursor: 'pointer' 
          }}>
            <ReactMarkdown>
              {message}
            </ReactMarkdown>
        </Typography>
      }
    />
  )
}

export default BotChat