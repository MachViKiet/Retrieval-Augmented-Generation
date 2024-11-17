import { Backdrop, Box, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid2'
import ChatBlock from '~/components/Chatbots/ChatBlock';
import Block from '~/components/Block';
import { useDispatch, useSelector } from 'react-redux';
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import { RecommendChatPage } from '~/components/Chatbots/RecommendChatPage';
import { getSocket } from '~/socket';
import { ChatWithChatbot } from '~/socket/ChatWithChatbot';
import ProcessBlock from '~/components/Chatbots/MessageHandler.jsx/ProcessBlock';
import UserTypingMessageBlock from '~/components/Chatbots/MessageHandler.jsx/UserTypingMessageBlock';
import ChatInput from '~/components/Chatbots/ChatInput';
import styled from '@emotion/styled';
import ChatDisplay from '~/components/Chatbots/MessageHandler.jsx/ChatDisplay';

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
  }, [Conservations, messageHandler]);


  useEffect(() => {
    document.title = 'Chatbot - Trò Chuyện';
    dispatch(sidebarAction({index: 121}))

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

      ChatWithChatbot.EndProcess(socket, (data) => {
        setMessageHandler(prev => ({ ...prev, 
          isProcess: false,
        }))

        setConservations((prev) => [...prev.slice(0, -1), data])
      })

      setHide(false)

    }

    return () => (
      ChatWithChatbot.unsign_all(socket),
      dispatch(sidebarAction({index: null}))
    )
  },[getSocket()])

  const ChatAction = async (message) => {
    if(socket){
      ChatWithChatbot.chat(socket, message)
      setMessageHandler(prev => ({...prev, isProcess: true }))
    }
  }

  const handleClick = async (text) => {

  }

  return hide ? 
    (<Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>) :
    (
    <Box sx = {{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', paddingY: 3 }}>
      <Grid container  spacing={2} sx = {{ height: '100%' }}>
        <Grid  size={{ xs: 12 }}>
          <Block sx = {{ 
            paddingBottom: '60px !important',
            width: '650px',
            backgroundImage: theme => theme.palette.mode == 'dark'? 'linear-gradient(30deg, #ffffff2e 0%, #0352c038 100%)' 
            : 'linear-gradient(180deg, #ffffff 0%, #99c4ff 100%)',
          }}>

            <ChatBlock sx = {{ 
              maxHeight: 'calc(100vh - 228px)',
             }}>
              <Box sx ={{ width: '100%', height: '20px' }}></Box>

              {Conservations.length === 0 && 
                <RecommendChatPage 
                  bgcolor = {{ 
                    main: 'transparent'
                  }}
                  username = {user?.name}
                  handleClick = {handleClick} 
                  ChatAction = {ChatAction}/> 
              }

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
                <Box sx = {{ 
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
                  background: theme => theme.palette.primary.third,
                  borderRadius: '15px'
                }}>
                  <ChatInput id = 'FormChat_For_Admin' handleSubmit = {ChatAction} messageHandler = { messageHandler } />
                </Box>
              </Box>
            </ChatWindow>

          </Block>
        </Grid>
      </Grid>
    </Box>
    )
  
  
}

export default ChatGenerator