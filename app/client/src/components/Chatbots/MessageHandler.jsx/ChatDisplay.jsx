import React from 'react'
import styled from '@emotion/styled'
import { Avatar, Box, Typography } from '@mui/material'
import { BubbleRight } from '../MessageEffect/BubbleRight'
import { BubbleLeft } from '../MessageEffect/BubbleLeft'
import { getTime } from '~/utils/GetTime'


export const ChatBlock_Style = {
  width: '100%',
  textAlign: 'justify',
  transition: '0.5s all ease',
}

export const ChatDisplay_Style = {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'end',
  flexDirection: 'row-reverse',
  textAlign: 'justify',
  paddingBottom: '20px',
  background: 'transparent'
}

export const ChatMessage = styled(Box) (({theme}) => ({
  borderRadius: '5px',
  padding: theme.spacing(0.725),
  paddingRight:  theme.spacing(1.25),
  paddingLeft:  theme.spacing(1.25),
  position: 'relative',
  width: 'fit-content',
  height: 'fit-content',
  maxWidth: '70%',
  transform: 'scale(1)',
  transition: '0.5s all ease',
}))



function ChatDisplay({ user = null , conservation = null}) {
  return (
    <Box sx = {ChatBlock_Style}>
      <Box sx = { ChatDisplay_Style }>
        <Avatar alt="User" src=
          {user?.avatar ? user.avatar : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" } />
        <ChatMessage sx = {{   
            background: 'linear-gradient(45deg, rgba(73,124,246,1) 47%, rgba(144,95,247,1) 100%)',
            marginRight: '20px',
            color: '#fff'
          }}>
          <BubbleRight/>

          <Typography sx = {{ fontSize: 'inherit', color: 'inherit' }}>
            {conservation?.question}
          </Typography>

          <Box>
            <Typography variant='p' sx = {{ fontSize: '0.725rem' }}>{getTime(conservation?.create_at)}</Typography>
          </Box>
        </ChatMessage>
      </Box>

      {
        conservation.state == 'success' && <Box sx = {{ ...ChatDisplay_Style, justifyContent: 'start' }}>
          <ChatMessage sx = {{   
              marginLeft: '20px',
              background: 'linear-gradient(319deg, rgb(255 255 255) 0%, rgb(186 173 255) 100%)',
              color: '#000'
            }}>
            {conservation?.anwser}
            <BubbleLeft/>
          </ChatMessage>
          <Avatar alt="ChatBot" src="https://pics.craiyon.com/2023-06-08/8f12f7763653463289268bdca7185690.webp" />
        </Box>
      }
    </Box>
  )
}

export default ChatDisplay