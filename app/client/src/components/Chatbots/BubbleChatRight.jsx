import styled from '@emotion/styled';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react'

const MessageChat = styled(Box) (() => ({
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'end',
    flexDirection: 'row-reverse',
    textAlign: 'justify',
    paddingBottom: '20px',
    background: 'transparent'
}))

const BubbleChat = styled(Box) (({theme}) => ({
    background: 'linear-gradient(45deg, rgba(73,124,246,1) 47%, rgba(144,95,247,1) 100%)',
    marginRight: '20px',
    borderRadius: '5px',
    padding: theme.spacing(0.725),
    paddingRight:  theme.spacing(1.25),
    paddingLeft:  theme.spacing(1.25),
    position: 'relative',
    width: 'fit-content',
    maxWidth: '70%',
    transform: 'scale(1)',
    transition: '0.5s all ease',
}))

const BubbleChatEffect = () => ( 
  <>      
    <Box sx = {{ 
      background: 'inherit',
      position: 'absolute',
      width: '6px',
      height: '6px',
      top: '5px',
      right: '-10px',
      borderRadius: '50%'
    }}/>
    <Box sx = {{ 
      background: 'inherit',
      position: 'absolute',
      width: '4px',
      height: '4px',
      top: '10px',
      right: '-15px',
      borderRadius: '50%'
    }}/>
  </> 
)

function BubbleChatRight({text, noBubble = false }) {
  return (
    <MessageChat>
        <Avatar alt="Remy Sharp" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" />
        <BubbleChat>
          {!noBubble && <BubbleChatEffect/>}
          {text}
        </BubbleChat>
    </MessageChat>
  )
}

export default BubbleChatRight
