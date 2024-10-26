import React from 'react'
import { Typography } from '@mui/material';
import BubbleChatLeft from '~/components/Chatbots/BubbleChatLeft';

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
            {message}
        </Typography>
      }
    />
  )
}

export default BotChat