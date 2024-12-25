import { Box, Button, IconButton, Skeleton, TextField, Typography } from '@mui/material';
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
import { useOutletContext } from 'react-router-dom';

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
        <DialogTitle sx = {{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
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
                '& div::before' : { borderBottom: '1px solid #a0a0a0b3' },
                '& div::after' : { borderBottom: '1px solid #a0a0a0b3' },
              }}
              placeholder='Tên Cuộc Trò Chuyện'/>
            <TextField 
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx = {{ 
                '& div::before' : { borderBottom: '1px solid #a0a0a0b3' },
                '& div::after' : { borderBottom: '1px solid #a0a0a0b3' },
              }}
              placeholder='Mô tả Cuộc Trò Chuyện'/>
          </DialogContentText>

          {notice && 
            <DialogContentText sx = {{ paddingTop: 2, display: 'block' }}>
              <Typography component={'span'} variant={'body2'} sx = {{ color: '#fcff28', textAlign: 'end', display: 'block', width: '100%' }}>{notice}</Typography>
            </DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button sx = {{ color: '#fff' }} onClick={newChat}>{modalHandler.submitTitle}</Button>
          <Button sx = {{ color: '#ff4646' }} onClick={modalHandler?.close}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


const ChatWindow = styled(Box)(({theme}) => ({ position: 'absolute', bottom: theme.spacing(0), padding: theme.spacing(2), paddingBottom: theme.spacing(1), paddingTop: theme.spacing(0), right: theme.spacing(0), width: '100%', borderRadius: '15px' }))

const BlockStyle = { bgColor_dark: 'linear-gradient(30deg, #ffffff2e 0%, #0352c038 100%)', bgColor_light: 'linear-gradient(180deg, #ffffff 0%, #99c4ff 100%)' }
const Backdrop = styled(Box) (() => ({
  background: '#0000008c', height: '100%', width: '100%', right: 0, top: '-72px', borderRadius: '15px',
  position: 'absolute', transform: 'scale(1)', transition: '0.5s all ease',  zIndex: 5, display: 'none'
}))

import VoicemailOutlinedIcon from '@mui/icons-material/VoicemailOutlined';

export function ChatGenerator() {

  const bottomRef = useRef(null);
  const socket = getSocket();
  const user = useSelector((state) => state.auth.user)
  const token = useSelector(state => state.auth.token)
  // setFooter
  const { setFooter, menu, mainLayout } = useOutletContext();
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

  const { processHandler } = useOutletContext();
  

  useEffect(() => {
    currentChatSession && bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Conservations, messageHandler.notification]);


  useEffect(() => {

    document.title = 'Chatbot - Trò Chuyện'
    mainLayout.navigate(121)


    ChatWithChatbot.userMessage(socket, (data) => { 
      if( currentChatSession && currentChatSession._id == data?.session_id) {
        setMessageHandler(prev => ({ ...prev, isProcess: true, ...data }))
      }
    })

    ChatWithChatbot.isProcessing(socket, (data) => { 
      if( currentChatSession && currentChatSession._id == data?.session_id) {
        setMessageHandler(prev => ({ ...prev, isProcess: true, ...data }))
      } 
    })

    ChatWithChatbot.Processed(socket, (data) => { 
      if( currentChatSession && currentChatSession._id == data?.session_id) {
        setMessageHandler(prev => ({ ...prev, isProcess: true, ...data })) 
      }
    })

    ChatWithChatbot.streamMessages(socket, (data) => { 
      if( currentChatSession && currentChatSession._id == data?.session_id) {
        setMessageHandler(prev => ({ ...prev, isProcess: true, stream_state: true, stream_message: data.messages, ...data })) 
      }
    }) 

    ChatWithChatbot.EndStream(socket, (data) => { 
      if( currentChatSession && currentChatSession._id == data?.session_id) {
        setMessageHandler(prev => ({ ...prev, isProcess: true, stream_state: false, ...data }))  
      }
    })

    ChatWithChatbot.EndProcess(socket, async (data) => {
      if( currentChatSession && currentChatSession._id == data?.session_id) {
        setMessageHandler({
          isProcess: false,
          notification: [],
          stream_state: false,
          stream_load: [],
          stream_message: null,
          stream_time: 0,
          duration: 0,
          create_at: null
        })
        setConservations((prevs) => { 
          // const index = prevs.findIndex(item => item._id === data._id);
          // if(index == -1) return [...prevs, data]

          // return [...prevs.slice(0, -1), data]
          return [...prevs, data]
        }) 
      }
    })

    return () => (
      ChatWithChatbot.unsign_all(socket)
    )
  }, [getSocket(), currentChatSession])

  useEffect(() => {
    token && loadChatSessionFromDB().then((chatSessionFromDB) => setSessions(chatSessionFromDB))
      .catch((err) => { console.log('loadChatSessionFromDB: ',err); return [] })
  }, [token])

  useEffect(() => {
    menu.setMenu(      
    <Block sx = {{ 
      width: '70vw',
      backgroundImage: theme => theme.palette.mode == 'dark'? BlockStyle.bgColor_dark : BlockStyle.bgColor_light,
    }}>
      <Box sx = {{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
        <Typography component='p' sx = {{ fontWeight: '800' }}>Cuộc Trò Chuyện</Typography>
      </Box>

      { !apiHandler.session && sessions && <Box sx = {{ height: '100%', maxHeight: 'calc(100vh - 152px)', overflow: 'auto', padding: 1 }}> {
        sessions.map((session) => (
          <Box key = {session._id} 
            sx ={{ width: '100%', background: currentChatSession && session?._id == currentChatSession?._id ? '#c7d3ff !important' :'#00000024', color: currentChatSession && session?._id == currentChatSession._id ? '#000 !important' : '#',
              borderRadius: '10px', marginBottom: 1, padding: 1.5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)', 
              '&:hover': { background: '#00000045', color: '#fff' }
            }}
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

      { (apiHandler.session || !sessions) && <Box sx = {{ height: '100%', maxHeight: 'calc(100vh - 280px)', overflow: 'auto', padding: 1 }}> {
        ['','',''].map((_session, index) => (
          <Skeleton key={ index * 82715 } variant="rounded" height={62} sx = {{ marginBottom: 2, width: '100%', borderRadius: '10px' }} />
        ))
      } </Box> }

      <Box sx = {{ padding: 1, paddingTop: 3 }}>
        <Button 
          variant='contained' color='info'
          startIcon= {<OpenInNewIcon/>}
          disabled={messageHandler.isProcess}
          onClick={() => setOpenCreateChat(true)}>Tạo Mới Trò Chuyện</Button>
      </Box>
    </Block>)

    return () => menu.setMenu(null)
  }, [sessions])

  const loadChatSessionFromDB = async () => {
    setApiHandler(prev => ({...prev, session: true}))
    return useConservation.get(token).then((chatSessionFromDB) => {
      setApiHandler(prev => ({...prev, session: false}))
      return chatSessionFromDB
    })
  }

  const loadHistoryBySession = async (session) => {
    setApiHandler(prev => ({...prev, history: true}))
    return useConservation.getHistory({ session: session?._id }, token).then((sessionWithHistory) => {{
      setApiHandler(prev => ({...prev, history: false}))
      return sessionWithHistory
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
      ChatWithChatbot.chat(socket, { message: message, chat_session: session?._id, 
        history: Conservations.slice(0,3).map((Conservation) => ({
          update_at: Conservation.update_at,
          create_at: Conservation.create_at,
          question: Conservation.question,
          anwser: Conservation.anwser
        }))
      })
      setMessageHandler(prev => ({...prev, isProcess: true }))
    }
  }

  const ChatAction_with_collection = (message, collection) => {
    try {
      ChatWithChatbot.chat(socket, { message: message, chat_session: currentChatSession?._id, 
        history: Conservations.slice(1,4).map((Conservation) => ({
          update_at: Conservation.update_at,
          create_at: Conservation.create_at,
          question: Conservation.question,
          anwser: Conservation.anwser
        })),
        collection: collection
      })
    } catch (error) {
      console.log(error)
    }
  }

  const newChatAction = async (data) => {
    return useConservation.create(data, token).then(async (session) => {
      setSessions(prev => ([session, ...prev]))
      setCurrentChatSession(session)
      const sessionWithHistory = await loadHistoryBySession(session)
      setConservations(sessionWithHistory.history)
      return session
    }).catch(() => 'Server Chatbot Không Hoạt Động')
  }

  const sessionButtonClick = async (session) => {
    menu.handle(false)
    try {
      // if(!messageHandler.isProcess) {
        setCurrentChatSession(session)
        setMessageHandler({
          isProcess: false,
          notification: [],
          stream_state: false,
          stream_load: [],
          stream_message: null,
          stream_time: 0,
          duration: 0,
          create_at: null
        })

        const sessionWithHistory = await loadHistoryBySession(session)
        setConservations(sessionWithHistory.history)
        if(sessionWithHistory?.in_progress) {
          setMessageHandler(sessionWithHistory?.in_progress)
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

  const feedback = async (value) => {
    const sendFeedbackEvent = processHandler.add('#sendFeedback')
    await useConservation.update(value, token)
    .then((data) => { setConservations(prev => prev.map((prev_consv) => {
      if(prev_consv._id == data._id){
        return data
      }
      return prev_consv
    })) })
    .catch((err) => console.log(err))
    .finally(() => processHandler.remove('#sendFeedback', sendFeedbackEvent))

    return true
  }

  return (
    
    <Box sx = {{ position: 'relative', width: '100%', height: '100%', paddingTop: { xs : 6, md: 3 }, paddingBottom: 3, paddingX: { xs : 1.5, md: 3 } }}>
        <Box sx = {{ display: { xs: 'flex', md: 'none' }, width: 'fit-content', position: 'absolute', right: '16px', top: '6px' }}>
          <Button onClick={() => menu.handle(true)} sx= {{ zIndex: 3, color: theme => theme.palette.text.secondary }} startIcon = {<VoicemailOutlinedIcon/>}>Cuộc Hội Thoại</Button>
        </Box>
      <Grid container  spacing={2} sx = {{ height: '100%', '--Grid-rowSpacing': { md: 'calc(2 * var(--mui-spacing))', xs: 1 } }}>

        <Grid  offset={{ xs: 0, md: 2 }} size={{ xs: 12, md: 7 }} sx = {{ height: '100%'}} >
          <Block sx = {{
            paddingBottom: {md: '95px !important', xs: '95px !important'},
            width: '100%',
            backgroundImage: theme => theme.palette.mode == 'dark'? BlockStyle.bgColor_dark 
            : BlockStyle.bgColor_light ,
          }}>

            <ChatBlock sx = {{ 
              maxHeight: { xs: 'calc(100vh - 223px)', md: 'calc(100vh - 228px)' },
             }}>
              <Box sx ={{ width: '100%', height: {xs: '5px', md: '20px'} }}></Box>

              { (apiHandler.history || !Conservations ) && <ChatDisplay loading /> }

              { !apiHandler.history && Conservations && Conservations.length === 0 && !messageHandler.isProcess && 
                <RecommendChatPage username = {user?.name} ChatAction = {ChatAction}/> }

              { !apiHandler.history && Conservations && Conservations.map((conservation) => {
                return <div key={conservation?._id}>
                  <ChatDisplay conservation = {conservation} user={user}  
                    action = {{ 
                      re_prompt : ChatAction,
                      addFeedback: feedback,
                      chatWithColllection: ChatAction_with_collection
                    }} />
                </div>
              })}

              {
                messageHandler.isProcess && (
                  <>
                    <div key={messageHandler?._id}>
                      <ChatDisplay conservation = {messageHandler} user={user}  
                        action = {{ re_prompt : ChatAction }} />
                    </div>
      
                    <ProcessBlock messageHandler={messageHandler}/>
                    <UserTypingMessageBlock messageHandler={messageHandler}/>
                  </>
                )
              }

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
                  background: theme => theme.palette.mode == 'dark' ? '#d6d6d685' :
                    theme.palette.primary.third,
                  borderRadius: '15px'
                }}>
                  <ChatInput id = 'FormChat_For_Admin' handleSubmit = {ChatAction} messageHandler = { messageHandler } />
                </Box>
              </Box>

              <Typography sx = {{ fontSize: '8px !important', color: theme => theme.palette.mode == 'dark' ? '#fff' : '#000', marginTop: '10px' }}>Lưu ý: Mô hình có thể đưa ra câu trả lời không chính xác ở một số trường hợp, vì vậy hãy luôn kiểm chứng thông tin bạn nhé!</Typography>
            </ChatWindow>
          </Block>
        </Grid>

        <Grid  size={{ xs: 0, md: 3 }} sx = {{ height: '100%'}}>  
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
            </Box>

            { !apiHandler.session && sessions && <Box sx = {{ height: '100%', maxHeight: 'calc(100vh - 280px)', overflow: 'auto', padding: 1 }}> {
              sessions.map((session) => (
                <Box key = {session._id} 
                  sx ={{ width: '100%', background: currentChatSession && session?._id == currentChatSession?._id ? '#c7d3ff !important' :'#00000024', color: currentChatSession && session?._id == currentChatSession._id ? '#000 !important' : '#',
                    borderRadius: '10px', marginBottom: 1, padding: 1.5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)', 
                    '&:hover': { background: '#00000045', color: '#fff' }
                  }}
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

            { (apiHandler.session || !sessions) && <Box sx = {{ height: '100%', maxHeight: 'calc(100vh - 280px)', overflow: 'auto', padding: 1 }}> {
              ['','',''].map((_session, index) => (
                <Skeleton key={ index * 82715 } variant="rounded" height={62} sx = {{ marginBottom: 2, width: '100%', borderRadius: '10px' }} />
              ))
            } </Box> }

            <Box sx = {{ padding: 1, paddingTop: 3 }}>
              <Button 
                variant='contained' sx = {{ background: theme => theme.palette.primary.main }}
                startIcon= {<OpenInNewIcon/>}
                onClick={() => setOpenCreateChat(true)}>Tạo Mới Trò Chuyện</Button>
            </Box>
          </Block>
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