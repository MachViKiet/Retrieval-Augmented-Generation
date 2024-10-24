import React from 'react'
import { Typography } from '@mui/material';
import BubbleChatLeft from '~/components/Chatbots/BubbleChatLeft';
import { TypeAnimation } from 'react-type-animation';
import ReactMarkdown from 'react-markdown';
import useAnimatedText from '~/hooks/useAnimatedText';

function BotChat({key, message, isTyping = false}) {

  return (
    <BubbleChatLeft
      key={key}
      id={key}
      text={
        <Typography variant='p' 
          sx = {{ 
            fontSize: '0.725rem',
            color: '#000',
            whiteSpace: 'pre-line', 
            textIndent: '2px', 
            lineHeight: 'normal' 
          }}>
            {isTyping ? useAnimatedText(message) : message}
            {/* {message} */}
        </Typography>
      }
    />
  )
}

export default BotChat