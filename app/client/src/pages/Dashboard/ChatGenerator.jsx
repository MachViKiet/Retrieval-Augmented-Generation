import styled from '@emotion/styled';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid2'
import ChatInput from '~/components/Chatbots/ChatInput';
import ChatBlock from '~/components/Chatbots/ChatBlock';
import Block from '~/components/Block';
import AvatarUserDefault from '~/components/Avatar/AvatarUserDefault';
import { useDispatch, useSelector } from 'react-redux';
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import { RecommendChatPage } from '~/components/Chatbots/RecommendChatPage';
import ProcessBlock from '~/components/Chatbots/MessageHandler.jsx/ProcessBlock';
import UserTypingMessageBlock from '~/components/Chatbots/MessageHandler.jsx/UserTypingMessageBlock';
import { getSocket } from '~/socket';
import { ChatWithChatbot } from '~/socket/ChatWithChatbot';
import ChatDisplay from '~/components/Chatbots/MessageHandler.jsx/ChatDisplay';

const Header = styled(Box) (({theme}) => ({
  background: theme.palette.primary.main,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
  height: theme.spacing(8),
  width: '100%',
  position: 'absolute',
  right: 0,
  top: '0',
  borderRadius: '15px 15px 0 0 ',
  zIndex: 1,
  paddingLeft: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  gap: 2
}))

const ChatExtension = styled(Box)(({theme}) => ({
  display: 'flex',
  padding: theme.spacing(1),
  paddingRight: theme.spacing(0),
  minHeight: '40px'
}))

const ChatWindow = styled(Box)(({theme}) => ({
  position: 'absolute',
  bottom: theme.spacing(0),
  padding: theme.spacing(2),
  paddingTop: theme.spacing(0),
  right: theme.spacing(0),
  width: '100%',
  borderRadius: '15px'
}))

export function ChatGenerator() {
  const dispatch = useDispatch()
  const [Conservations, setConservations] = useState([])
  const [hide, setHide] = useState(true)
  const bottomRef = useRef(null);
  const user = useSelector((state) => state.auth.user)
  const socket = getSocket();
  const [messageHandler, setMessageHandler] = useState({
    isProcess: false,
    notification: [],
    stream_state: false,
    stream_load: [],
    stream_message: null,
    stream_time: 0,
    duration: 0,
    create_at: null
  })


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Conservations, messageHandler ]);
  
  useEffect(() => {
    document.title = 'Chatbot - Trò chuyện';
    dispatch(sidebarAction({index: 466}))

    if(socket) {

      ChatWithChatbot.userMessage(socket, (data) => {
        setConservations((prev) => ([...prev, data]))
      })

      ChatWithChatbot.isProcessing(socket, (data) => {
        setMessageHandler(prev => ({ ...prev, notification: data }))
      })

      ChatWithChatbot.Processed(socket, () => {
        setMessageHandler(prev => ({ ...prev, isProcess: true }))
      })

      ChatWithChatbot.streamMessages(socket, (data) => {
        setMessageHandler(prev => ({ ...prev, 
          stream_state: true,
          stream_message: data.messages,
        }))
      }) 

      ChatWithChatbot.EndStream(socket, (data) => {
        setMessageHandler(prev => ({ ...prev, 
          stream_state: false,
          data,
        }))
      })

      ChatWithChatbot.EndProcess(socket, async (data) => {
        setTimeout(() => {
          setMessageHandler(prev => ({ ...prev, 
            isProcess: false,
          }))
  
          setConservations((prev) => [...prev.slice(0, -1), data])
        }, 500)
      })

    }

    setHide(false)
    
    return () => (
      ChatWithChatbot.unsign_all(socket),
      dispatch(sidebarAction({index: null}))
    )
    
  },[getSocket()])

  const ChatAction = async (message) => {
    if(socket){
      ChatWithChatbot.chat(socket, message)
      setMessageHandler(prev => ({...prev, isProcess: true }))
      return true
    }

    return false
  }

  const handleClick = (text) => {

  }


  return hide ? 
    (<Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>) :
    (<Grid container  spacing={2} sx = {{ height: '100%' }}>
      <Grid  size={{ xs: 12, md: 8 }}>
        <Block sx = {{ 
          paddingBottom: '120px !important',
          paddingTop: '69px !important'
         }}>

          <Header> 
            <AvatarUserDefault/>
            <Typography variant='h1' sx = {{ 
              color: '#fff',
              fontSize: '1.5rem',
              width: 'fit-content',
              fontWeight: '900',
             }}>Chatbot Trợ Lý Sinh Viên</Typography>
          </Header>

          <ChatBlock>

            <Box sx ={{ width: '100%', height: '20px' }}/>

            { Conservations.length === 0 && 
                <RecommendChatPage 
                  username = {user?.name}
                  handleClick = {handleClick} 
                  ChatAction = {ChatAction}/> }

            { Conservations.map((conservation) => {
              return <div key={conservation?._id}>
                <ChatDisplay conservation = {conservation} user={user}  />
              </div>
            })}

            <ProcessBlock messageHandler={messageHandler}/>
            <UserTypingMessageBlock messageHandler={messageHandler}/>
            <div ref={bottomRef} />

          </ChatBlock>

          <ChatWindow>
            <Box sx = {{ 
              borderRadius: '15px', 
              background: theme => theme.palette.primary.main,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
            }}>
              <ChatExtension/>
              <Box sx = {{ 
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
                background: theme => theme.palette.primary.third,
                borderRadius: '0 0 15px 15px'
              }}>
                <ChatInput id = 'FormChat_For_Admin' handleSubmit = {ChatAction} messageHandler = { messageHandler } />
              </Box>
            </Box>
          </ChatWindow>

        </Block>
      </Grid>

      <Grid  size={{ xs: 0, md: 4 }} >

      </Grid>
    </Grid>)
  
  
}

export default ChatGenerator
