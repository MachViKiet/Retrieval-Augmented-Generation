import styled from '@emotion/styled';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react'

const MessageChat = styled(Box) (() => ({
    width: '100%',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    textAlign: 'justify',
    paddingBottom: '20px'
}))

const BubbleChat = styled(Box) (({theme}) => ({
    padding: theme.spacing(0.725),
    paddingRight:  theme.spacing(1.25),
    paddingLeft:  theme.spacing(1.25),
    background: 'rgb(147, 231, 251)',
    marginLeft: '20px',
    borderRadius: '5px',
    position: 'relative',
    width: 'fit-content',
    maxWidth: '70%'
}))

const BubbleChatEffect = () => ( 
  <>      
    <Box sx = {{ 
      background: 'inherit',
      position: 'absolute',
      width: '6px',
      height: '6px',
      top: '5px',
      left: '-10px',
      borderRadius: '50%'
    }}/>
    <Box sx = {{ 
      background: 'inherit',
      position: 'absolute',
      width: '4px',
      height: '4px',
      top: '10px',
      left: '-15px',
      borderRadius: '50%'
    }}/>
  </> 
)

function BubbleChatLeft({text, noBubble = false}) {
  return (
    <MessageChat>
        <Avatar alt="Remy Sharp" src="https://ouch-cdn2.icons8.com/5d_N4vqenhj0NUReyP1FgsShuxiNde_3l6lL7-FxQ3I/rs:fit:368:343/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTE5/LzExODljMWUzLWVj/YzUtNGQ5Ni04MjU5/LTE5Zjg1Y2Q5ZWRm/NC5zdmc.png" />
        <BubbleChat>
            {!noBubble && <BubbleChatEffect/> }
            {text}
        </BubbleChat>
    </MessageChat>
  )
}

export default BubbleChatLeft
