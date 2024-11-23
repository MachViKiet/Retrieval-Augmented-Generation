import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Avatar, Box, CircularProgress, IconButton, Skeleton, Tooltip, Typography } from '@mui/material'
import { BubbleRight } from '../MessageEffect/BubbleRight'
import { BubbleLeft } from '../MessageEffect/BubbleLeft'
import { getTime } from '~/utils/GetTime'
import ReactMarkdown from 'react-markdown';
import NotifycationModal from '~/components/Mui/NotifycationModal'
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import { getSocket } from '~/socket'
import { CircularProgressWithLabel } from '~/components/Mui/CircularProgressWithLabel'

export const ChatBlock_Style = {
  width: '100%',
  textAlign: 'justify',
  transition: '0.5s all ease',
}

export const ChatDisplay_Style = {
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

const ModelButton_Style = {
  marginTop: '8px',
  padding: '3px 10px',
  width: 'fit-content',
  background: '#0214238c',
  color: '#fff',
  borderRadius: '8px',
  cursor: 'pointer',
  '&:active': {
    transform: 'scale(0.95)'
  }
}

function ChatDisplay({ loading = null, action = null, user = null , conservation = null}) {

  const [openDetail, setOpenDetail] = useState(false)

  return loading ? (
    <Box sx = {ChatBlock_Style}>
      {['',''].map(( _data, index) => ( <div key={ index*1251267 }>
        <Box sx = { ChatDisplay_Style }>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rounded" height={60} sx = {{ width: '100%', marginRight: '20px', maxWidth: '50%'}}/>
        </Box>

        <Box sx = {{ ...ChatDisplay_Style, justifyContent: 'start' }}>
          <Skeleton variant="rounded" height={60} sx = {{ width: '100%', marginLeft: '20px', maxWidth: '70%'}}/>
          <Skeleton variant="circular" width={40} height={40} />
        </Box> </div>
      ))}

    </Box>
  ) : (
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

          <Box sx = {{  width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              { conservation.state == 'success' ? <Tooltip title="re_prompt" placement="top">
                <IconButton 
                  onClick={() => action?.re_prompt && action.re_prompt(conservation?.question)}
                  sx = {{ padding: '1px' }}>
                  <RotateRightOutlinedIcon sx = {{ fontSize: '16px' }}/>
                </IconButton> 
              </Tooltip> : <CircularProgress size="14px" sx = {{ color: '#fff' }} /> }
              <Typography component='p' sx = {{ fontSize: '0.725rem !important', textAlign: 'end', width: '100%' }}>{getTime(conservation?.create_at)}</Typography>
          </Box>
        </ChatMessage>
      </Box>

      { conservation.state == 'success' && <Box sx = {{ ...ChatDisplay_Style, justifyContent: 'start' }}>
          <ChatMessage sx = {{   
              marginLeft: '20px',
              background: 'linear-gradient(319deg, rgb(255 255 255) 0%, rgb(186 173 255) 100%)',
              color: '#000'
            }}>
            { typeof conservation?.anwser === "string" && <ReactMarkdown>
              { conservation?.anwser }
            </ReactMarkdown> }
            <BubbleLeft/>

            <Box sx = {{  width: '100%', borderTop: '1px solid #000', marginTop: 1, paddingTop: 1 }}>
              <Box sx = {ModelButton_Style}
                onClick = {() => setOpenDetail(true)} > Sổ tay sinh viên </Box>
              <Typography component='p' sx = {{ fontSize: '0.725rem !important', textAlign: 'end', width: '100%' }}>{getTime(conservation?.create_at)}</Typography>
            </Box>
          </ChatMessage>
          <Avatar alt="ChatBot" src="https://pics.craiyon.com/2023-06-08/8f12f7763653463289268bdca7185690.webp" />
        </Box>
      }


      <NotifycationModal 
        modalHandler = {{
          state: openDetail,
          close: () => setOpenDetail(false) }}/>
    </Box>
  )
}

export default ChatDisplay