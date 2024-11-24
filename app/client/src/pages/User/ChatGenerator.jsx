import { Backdrop, Box, Button, CircularProgress, IconButton, Skeleton, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid2'
import ChatBlock from '~/components/Chatbots/ChatBlock';
import Block from '~/components/Mui/Block';
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
import { DeleteOutlineOutlined } from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useConservation } from '~/apis/Conservation';

function NewChatModal({ modalHandler = null }) {

  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    setName('')
    setDescription('')
    setNotice(null)
  },[])

  const newChat = async (e) => {
    e.preventDefault()
    if( name == '' ) {
      setNotice('Vui lòng nhập tên cuộc trò chuyện !')
    } else {
      await modalHandler.submit({
        name, description
      }).then(() => modalHandler?.close())
        .catch(() => setNotice('Tạo không thành công'))
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={modalHandler?.state}
        onClose={modalHandler?.close}>
        <DialogTitle sx = {{ color: theme => theme.palette.text.secondary, display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx = {{ width: '50vw', maxWidth: '450px'}}>
            <OpenInNewIcon/> Tạo Cuộc Trò Chuyện
          </Box>
        </DialogTitle>
        <DialogContent >
          <DialogContentText sx = {{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx = {{ 
                '& div' : {color: theme => theme.palette.text.secondary },
                '& div::before' : { borderBottom: '1px solid #a0a0a0b3' },
              }}
              placeholder='Tên Cuộc Trò Chuyện'/>
            <TextField 
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx = {{ 
                '& div' : {color: theme => theme.palette.text.secondary },
                '& div::before' : { borderBottom: '1px solid #a0a0a0b3' }
              }}
              placeholder='Mô tả Cuộc Trò Chuyện'/>
          </DialogContentText>

          {notice && 
            <DialogContentText sx = {{ paddingTop: 2, display: 'block' }}>
              <Typography component={'span'} variant={'body2'} sx = {{ color: '#ff7900', textAlign: 'end', display: 'block', width: '100%' }}>{notice}</Typography>
            </DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button sx = {{ color: theme => theme.palette.text.secondary }} onClick={newChat}>{modalHandler.submitTitle}</Button>
          <Button sx = {{ color: '#ff3c3c' }} onClick={modalHandler?.close}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


const ChatWindow = styled(Box)(({theme}) => ({ position: 'absolute', bottom: theme.spacing(0), padding: theme.spacing(2), paddingTop: theme.spacing(0), right: theme.spacing(0), width: '100%', borderRadius: '15px' }))

const BlockStyle = { bgColor_dark: 'linear-gradient(30deg, #ffffff2e 0%, #0352c038 100%)', bgColor_light: 'linear-gradient(180deg, #ffffff 0%, #99c4ff 100%)' }

export function ChatGenerator() {

  const dispatch = useDispatch()
  const bottomRef = useRef(null);
  const socket = getSocket();
  const user = useSelector((state) => state.auth.user)
  const token = useSelector(state => state.auth.token)

  const [Conservations, setConservations] = useState([])
  const [openCreateChat, setOpenCreateChat] = useState(false)
  const [sessions, setSessions] = useState(null)
  const [currentChatSession, setCurrentChatSession] = useState(null)
  const [apiHandler, setApiHandler] = useState({
    session: false,
    history: false
  })
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
    }

    return () => (
      ChatWithChatbot.unsign_all(socket),
      dispatch(sidebarAction({index: null}))
    )
  },[getSocket()])

  useEffect(() => {
    token && loadChatSessionFromDB().then((chatSessionFromDB) => setSessions(chatSessionFromDB))
      .catch((err) => { console.log('loadChatSessionFromDB: ',err); return [] })
  }, [token])

  const loadChatSessionFromDB = async () => {
    setApiHandler(prev => ({...prev, session: true}))
    return useConservation.get(token).then((chatSessionFromDB) => {
      setApiHandler(prev => ({...prev, session: false}))
      return chatSessionFromDB
    })
  }

  const loadHistoryBySession = async (session) => {
    setApiHandler(prev => ({...prev, history: true}))
    return useConservation.getHistory({ session: session?._id }, token).then((historyFromDB) => {{
      setApiHandler(prev => ({...prev, history: false}))
      return historyFromDB
    }})
  }
 
  const ChatAction = async (message) => {
    let session
    if(currentChatSession == null) {
      session = await newChatAction({ name: message })
    } else {
      session = currentChatSession
    }
  
    if (session?._id){
      setCurrentChatSession(session)
      ChatWithChatbot.chat(socket, { message: message, chat_session: session?._id })
      setMessageHandler(prev => ({...prev, isProcess: true }))
    }
  }

  const newChatAction = async (data) => {
    return useConservation.create(data, token).then(async (session) => {
      setSessions(prev => [session, ...prev])
      setCurrentChatSession(session)
      const history = await loadHistoryBySession(session)
        .catch((err) => { console.log('historyFromDB: ',err); return [] })
      setConservations(history)
      return session
    })
  }

  const sessionButtonClick = async (session) => {
    try {
      if(!messageHandler.isProcess) {
        const history = await loadHistoryBySession(session)
        setCurrentChatSession(session)
        setConservations(history)
      }
    } catch (error) {
      return error
    }
  }

  const removeChatSessionClick = async (event, session) => {
    event.stopPropagation()
    if(!messageHandler.isProcess) {
      useConservation.remove({session: session._id}, token).then((removed_session) => {
        setSessions(prev => prev.filter((session) => session._id != removed_session._id))
        if (currentChatSession == removed_session._id) setCurrentChatSession(null)
      })
    }
  }

  return (
    <Box sx = {{ width: '100%', height: '100%', paddingY: 3, paddingX: 3 }}>
      <Grid container  spacing={2} sx = {{ height: '100%' }}>
        <Grid  size={{ xs: 2.5 }}>  
          <Block sx = {{ 
              padding: 1,
              backgroundImage: theme => theme.palette.mode == 'dark'? BlockStyle.bgColor_dark : BlockStyle.bgColor_light,
              display: {
                xs: 'none',
                md: 'block'
              }
          }}>
            <Box sx = {{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
              <Typography component='p' sx = {{ fontWeight: '800' }}>Cuộc Trò Chuyện</Typography>
              <Button component='p' sx = {{ color: 'red', paddingY: 0 }}>Xóa hết </Button>
            </Box>

            { !apiHandler.session && sessions && <Box sx = {{ height: '100%', maxHeight: 'calc(100vh - 252px)', overflow: 'auto', padding: 1 }}> {
              sessions.map((session) => (
                <Box key = {session._id} 
                  sx ={{ width: '100%', background: currentChatSession && session?._id == currentChatSession?._id ? '#716576eb' :'#00000024', color: currentChatSession && session?._id == currentChatSession._id ? '#fff' : '#',
                    borderRadius: '10px', marginBottom: 1, padding: 1.5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)' }}
                    onClick = {async (e) => await sessionButtonClick(session)}>
                  <Box >
                    <Typography component='p' sx = {{ width: 'fit-content', maxWidth: '148px', fontWeight: '400', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session?.session_name}</Typography>
                    <Typography component='p' sx = {{ width: 'fit-content', maxWidth: '148px', fontWeight: '100', fontSize: '0.725rem !important', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session?.session_description}</Typography>
                  </Box>
                  <IconButton color = 'error' sx = {{ padding: 0.25 }} onClick={async (e) => await removeChatSessionClick(e, session)} >
                    <DeleteOutlineOutlined sx = {{ fontSize: '1.225rem' }}/>
                    </IconButton>
                </Box> ))

              }

              { sessions.length == 0 && <> Không có cuộc trò chuyện </> }
            </Box> }

            { (apiHandler.session || !sessions) && <Box sx = {{ height: '100%', maxHeight: 'calc(100vh - 252px)', overflow: 'auto', padding: 1 }}> {
              ['','',''].map((_session, index) => (
                <Skeleton key={ index * 82715 } variant="rounded" height={62} sx = {{ marginBottom: 2, width: '100%', borderRadius: '10px' }} />
              ))
            } </Box> }

            <Box sx = {{ padding: 1, paddingTop: 3 }}>
              <Button 
                variant='contained' color='info' sx = {{ color: '#022f71' }}
                startIcon= {<OpenInNewIcon/>}
                disabled={messageHandler.isProcess}
                onClick={() => setOpenCreateChat(true)}>Tạo Mới Trò Chuyện</Button>
            </Box>
          </Block>
        </Grid>

        <Grid  size={{ xs: 12, md: 7 }}>
          <Block sx = {{ 
            paddingBottom: '60px !important',
            width: '100%',
            backgroundImage: theme => theme.palette.mode == 'dark'? BlockStyle.bgColor_dark 
            : BlockStyle.bgColor_light ,
          }}>

            <ChatBlock sx = {{ 
              maxHeight: 'calc(100vh - 228px)',
             }}>
              <Box sx ={{ width: '100%', height: '20px' }}></Box>

              { (apiHandler.history || !Conservations ) && <ChatDisplay loading /> }

              { !apiHandler.history && Conservations && Conservations.length === 0 && 
                <RecommendChatPage username = {user?.name} ChatAction = {ChatAction}/> }

              { !apiHandler.history && Conservations && Conservations.map((conservation) => {
                return <div key={conservation?._id}>
                  <ChatDisplay conservation = {conservation} user={user}  
                    action = {{ re_prompt : ChatAction }} />
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

        <Grid  size={{ xs: 2.5 }}>  
          {/* TODO */}
        </Grid>

      </Grid>

      <NewChatModal
        modalHandler = {{
          state: openCreateChat,
          close: () => setOpenCreateChat(false),
          submitTitle: 'Tạo Cuộc Trò Chuyện',
          submit: (data) => newChatAction(data)
        }} />

    </Box>
  )
  
  
}

export default ChatGenerator