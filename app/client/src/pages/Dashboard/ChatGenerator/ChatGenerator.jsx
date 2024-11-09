import styled from '@emotion/styled';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid2'
import TextInput from '~/components/Chatbots/TextInput';
import ChatBlock from '~/components/Chatbots/ChatBlock';
import Block from '~/components/Block';
import AvatarUserDefault from '~/components/Avatar/AvatarUserDefault';
import { useDispatch, useSelector } from 'react-redux';
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import BotChat from './components/BotChat';
import UserChat from './components/UserChat';
import Loading from './components/Loading';
import KHTNGenerativeAI from '~/services/KHTNGenerativeAI';
import LoadingBotChat from './components/LoadingBotChat';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';

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
}))

const Overlayer = styled(Box) (() => ({
  background: '#0000008c',
  height: '100%',
  width: '100%',
  right: 0,
  borderRadius: '15px',
  position: 'absolute',
  transform: 'scale(1)',
  transition: '0.5s all ease', 
  zIndex: 5,
  display: 'none'
}))

const History = []
const RecommendationQuestion = [[
  {
    "id" : 342324,
    "message": "Tôi có thể tra cứu điểm và bảng điểm ở đâu?"
  },
  {
    "id" : 342324,
    "message": "Lịch học của kỳ này được công bố ở đâu?"
  },
  {
    "id" : 342324,
    "message": "Tôi cần đăng ký môn học ở đâu và vào thời gian nào?"
  },
  {
    "id" : 342324,
    "message": "Quy định về tín chỉ tối thiểu và tối đa mỗi kỳ là bao nhiêu?"
  }], 
  [
    {
      "id" : 342324,
      "message": "Làm thế nào để đăng ký thẻ thư viện?"
    },
    {
      "id" : 342324,
      "message": "Tôi có thể mượn sách ở thư viện như thế nào?"
    },
    {
      "id" : 342324,
      "message": "Địa điểm và thời gian mở cửa của thư viện là gì?"
    }], 
  [
    {
      "id" : 342324,
      "message": "Thông tin học bổng năm 2024"
    },
    {
      "id" : 342324,
      "message": "Có những học bổng nào dành cho tân sinh viên?"
    }],
  [
    {
      "id" : 342324,
      "message": "Wifi phòng học của trường KHTN là gì?"
    },
  ]
]

function ChatGenerator({setLoading}) {
  const dispatch = useDispatch()
  const [Conservation, setConservation] = useState([])
  const [isLoading, setIsLoading] = useState({
    state: false,
    noticeLoad: [],
    timing: []
  })
  const [stream, setStream] = useState({
    isTyping: false,
    streamData: null
  })
  const [openDetail, setOpenDetail] = useState(null)
  const [hide, setHide] = useState(true)
  const bottomRef = useRef(null);

  const KHTN_Chatbot = KHTNGenerativeAI()

  const ChatAction = async (text) => {

    const getChosen_collections = async (text) => await KHTN_Chatbot.step_1(text).then((res) => {
        // TODO : Validate
        setIsLoading(prev => ({...prev, noticeLoad: prev.noticeLoad.concat(`Xác định nội dung câu hỏi`)}))
        return res.collection // Return chosen_collections : string
    })

    const getFilter_expressions = async (text, chosen_collections) => await KHTN_Chatbot.step_2(text, chosen_collections).then((res) => {
      // TODO : Validate
      setIsLoading(prev => ({...prev, noticeLoad: prev.noticeLoad.concat('Rút trích dữ liệu trong câu hỏi')}))
      return res
    }) // Return filter_expressions : json

    const getContext = async (text, chosen_collections, filter_expressions) => await KHTN_Chatbot.step_3(text, chosen_collections, JSON.stringify(filter_expressions)).then((res) => {
      // TODO : Validate
      setIsLoading(prev => ({...prev, noticeLoad: prev.noticeLoad.concat('Tìm kiếm tài liệu trong kho')}))
      return res.context
    }) // Return context : string

    const getGenerate = async (text, context, isStreaming) => await KHTN_Chatbot.step_4(text, context, isStreaming).then((res) => {
      // TODO : Validate
      setIsLoading(prev => ({...prev, noticeLoad: prev.noticeLoad.concat('Tạo văn bản')}))
      return res
    }) // Return generate : streamObject

    const run = async (streamObject) => {
      setIsLoading({
        state: false,
        noticeLoad: [],
        timing: []
      })
      setIsLoading(prev => ({...prev, noticeLoad: prev.noticeLoad.concat('Đang soạn')}))
      setIsLoading(prev => ({...prev, timing: prev.timing.concat("")}))

      const reader = streamObject.body.getReader();
      setStream({streamData : '', isTyping: true})
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let result = ''
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        result += decoder.decode(value, { stream: true })
        setStream(prev => ({...prev, streamData : result}))
      }
      return result
    }

    const clear = () => {
      setStream(prev => ({...prev, isTyping: false}))
      setIsLoading({
        state: false,
        noticeLoad: [],
        timing: []
      })
    }

    try{
      const startTime = (new Date()).getTime()
      let point_1, point_2, point_3, point_4, endTime

      const chosen_collections = await getChosen_collections(text).then((chosen_collections) => {
        point_1 = (new Date()).getTime()
        setIsLoading(prev => ({...prev, timing: prev.timing.concat(("chosen_collections: " + chosen_collections + "   " + (point_1 - startTime)/1000))}))
        return chosen_collections
      }).catch(() => {
        throw new Error(error);
      })

      const filter_expressions = await getFilter_expressions(text, chosen_collections).then((filter_expressions) => {
        point_2 = (new Date()).getTime()
        setIsLoading(prev => ({...prev, timing: prev.timing.concat(("filter_expressions: " + JSON.stringify(filter_expressions) + "   " + (point_2 - point_1)/1000))}))
        return filter_expressions
      }).catch(() => {
        throw new Error(error);
      })
      
      const context = await getContext(text, chosen_collections, filter_expressions).then((context) => {
        point_3 = (new Date()).getTime()
        setIsLoading(prev => ({...prev, timing: prev.timing.concat(((point_3 - point_2)/1000))}))
        return context
      }).catch(() => {
        throw new Error(error);
      })

      const generate = await getGenerate(text, context, true).then((generate) => {
        point_4 = (new Date()).getTime()
        setIsLoading(prev => ({...prev, timing: prev.timing.concat(((point_4 - point_3)/1000))}))
        return generate
      }).catch(() => {
        throw new Error(error);
      })
      endTime = (new Date()).getTime()

      await run(generate).then((finalResponse) => {
        setConservation(Conservation => [...Conservation,{
          "id": Math.floor(10000 + Math.random() * 900000),
          "role": "bot",
          "message": finalResponse,
          "information" : {
            "context" : context,
            "filter_expressions" : filter_expressions,
            "chosen_collections" : chosen_collections,
            "timestamp" : (new Date()).getTime(),
            "duration": endTime - startTime
          }
        }])
        return finalResponse
      }).catch((error) => {
        setConservation(Conservation => [...Conservation,{
          "id": Math.floor(10000 + Math.random() * 900000),
          "role": "bot",
          "message": 'Xin Lỗi! Đã xảy ra lỗi với đường truyền',
          "information" : {}
        }])
        throw new Error(error);
      }).finally(() => {
        // clear()
        setStream(prev => ({...prev, isTyping: false}))
      })
    } catch (error) {
        setConservation(Conservation => [...Conservation,{
          "id": Math.floor(10000 + Math.random() * 900000),
          "role": "bot",
          "message": 'Xin Lỗi ! Server hiện không hoạt động',
          "information" : {}
        }])
        clear()
    }
  }

  const handleClick = (text) => {
    setConservation(Conservation => [...Conservation,{
                              "id": Math.floor(10000 + Math.random() * 90000),
                              "role": "user",
                              "message": text
            }])
    setIsLoading(prev => ({...prev, state: true}))
  }

  const user = useSelector((state) => state.auth.user)
  const [userInfo, setUserInfor] = useState(user)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Conservation, isLoading, stream]);

  useEffect(() => {
    document.title = 'Chatbot - Trò chuyện';
    dispatch(sidebarAction({index: 466}))

    // TODO : Load data from db
    // setUserInfor(userInfo)
    const timeoutID = setTimeout(() => setHide(false), 500)

    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  },[])


  return hide ? 
    (<Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={true}
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>) :
    (<Grid container  spacing={2} sx = {{ height: '100%' }}>
      <Grid  size={{ xs: 12, md: 8 }}>
        <Block sx = {{ 
          paddingBottom: '120px !important',
          paddingTop: '69px !important',
         }}>
          <Header sx = {{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: 2
            }}> 
            <AvatarUserDefault/>
            <Typography variant='h1' sx = {{ 
              color: '#fff',
              fontSize: '1.5rem',
              width: 'fit-content',
              fontWeight: '900',
             }}>Chatbot Trợ Lý Sinh Viên</Typography>
          </Header>
          <ChatBlock>
            <Box sx ={{ width: '100%', height: '20px' }}></Box>
            {Conservation.length === 0 && <Box>
              <Typography variant='h2' sx = {{ 
                fontSize: '1.5rem',
                width: 'fit-content',
                paddingBottom: 0.5,
                fontWeight: '900',
                background: 'linear-gradient(74deg, #4285f4 0, #9b72cb 9%, #d96570 20%, #d96570 24%, #9b72cb 35%, #4285f4 44%, #9b72cb 50%, #d96570 56%, #131314 75%, #131314 100%)',
                color: 'transparent',
                backgroundSize: '400% 100%',
                WebkitBackgroundClip : 'text'
               }}>Xin Chào bạn, {user?.name} !</Typography>
              <Typography variant='h3' sx = {{ 
                fontSize: '1.5rem',
                marginBottom: 2,
                width: 'fit-content',
                textAlign:'left',
                color: '#8e9492',
                fontWeight: '900',
               }}>Tôi có thể giúp gì hôm nay?</Typography>

              <Box sx = {{ display: 'flex', gap: 1, minWidth: '500px', overflow: 'auto', marginBottom: 2 }}>
                <Button key = '13414' sx = {(theme) => ({ 
                  width: 'fit-content',
                  background: theme.palette.primary.third,
                  color: theme.palette.text.secondary,
                  marginBottom: 1,
                  textAlign: 'left',
                  paddingX: 1.5,
                  borderRadius: '10px'
                  })}
                  startIcon= {<ContactSupportOutlinedIcon/>}
                  onClick = {async () => {
                    handleClick('Danh Sách Học Bổng Mới Nhất 2024'),
                    await ChatAction('Danh Sách Học Bổng Mới Nhất 2024')
                  }}>
                    <Typography variant='p' fontSize={'0.725rem'} color='inherit' sx = {{ whiteSpace: 'pre-line', textIndent: '2px' }}>
                      Giới Thiệu Khoa
                    </Typography>
                </Button>

                <Button key = '13414' sx = {(theme) => ({ 
                  width: 'fit-content',
                  background: theme.palette.primary.third,
                  color: theme.palette.text.secondary,
                  marginBottom: 1,
                  textAlign: 'left',
                  paddingX: 1.5,
                  borderRadius: '10px'
                  })}
                  startIcon= {<ViewStreamIcon/>}
                  onClick = {async () => {
                    handleClick('Danh Sách Học Bổng Mới Nhất 2024'),
                    await ChatAction('Danh Sách Học Bổng Mới Nhất 2024')
                  }}>
                    <Typography variant='p' fontSize={'0.725rem'} color='inherit' sx = {{ whiteSpace: 'pre-line', textIndent: '2px' }}>
                      Nội Quy Trường Học
                    </Typography>
                </Button>

                <Button key = '13414' sx = {(theme) => ({ 
                  width: 'fit-content',
                  background: theme.palette.primary.third,
                  color: theme.palette.text.secondary,
                  marginBottom: 1,
                  textAlign: 'left',
                  paddingX: 1.5,
                  borderRadius: '10px'
                  })}
                  startIcon= {<AssuredWorkloadOutlinedIcon/>}
                  onClick = {async () => {
                    handleClick('Danh Sách Học Bổng Mới Nhất 2024'),
                    await ChatAction('Danh Sách Học Bổng Mới Nhất 2024')
                  }}>
                    <Typography variant='p' fontSize={'0.725rem'} color='inherit' sx = {{ whiteSpace: 'pre-line', textIndent: '2px' }}>
                      Chính Sách Học Bổng
                    </Typography>
                </Button>
              </Box>

              {RecommendationQuestion.map((questions, index) => (
                <Box sx = {{ marginBottom: 4 }}>
                  {
                    questions.map((question, index) => (
                      <Button key = {question.id} sx = {(theme) => ({ 
                        display: 'block',
                        width: 'fit-content',
                        background: theme.palette.primary.third,
                        color: theme.palette.text.secondary,
                        marginBottom: 1,
                        textAlign: 'left',
                        paddingX: 1.5,
                        borderRadius: '10px'
                        })}
                        onClick = {async () => {
                          handleClick(question.message),
                          await ChatAction(question.message)
                        }}>
                        <Typography variant='p' fontSize={'0.725rem'} color='inherit' sx = {{ whiteSpace: 'pre-line', textIndent: '2px' }}>
                          {question.message}
                        </Typography>
                      </Button>
                    ))
                  }
                </Box>
              ))}

              <Box sx ={{ width: '100%', height: '20px' }}></Box>  
            </Box>
            }

            {History.map((conservation, index) => 
              (
                <div key = {conservation?.id}>
                {
                  conservation.role == 'bot' ?
                    <BotChat message={(conservation?.message)}/> 
                    : <UserChat message={conservation.message}/>
                }</div>
              )
            )}

            {Conservation.map((conservation, index) => 
              (
                <div key = {conservation?.id}>
                {
                  conservation.role == 'bot' ?
                    <BotChat message={(conservation?.message)} metadata = {conservation} setOpenDetail = {setOpenDetail}/> 
                    : <UserChat message={conservation.message} metadata = {conservation}/>
                }</div>
              )
            )}

            {<LoadingBotChat text = {stream.streamData} isHidden = {stream.isTyping}/>}  
            {<Loading isLoading = {isLoading}/>}

            <div ref={bottomRef} />
          </ChatBlock>
          <TextInput
            handleClick = {handleClick}
            handleSubmit = {ChatAction}
            id = "Chatbox"
          />
        </Block>
      </Grid>

      <Grid  size={{ xs: 0, md: 4 }} >
        <Block sx = {{ paddingTop: 8.5 }}>
          <Header sx = {{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: 2
            }}> 
            <Typography variant='h1' sx = {{ 
              color: '#fff',
              fontSize: '28px',
              width: '100%',
              fontWeight: '900',
              fontFamily: 'auto'
             }}></Typography>
          </Header>
          <Box sx = {{ 
            height: '500px',
            overflow: 'auto',
            padding: 2
          }}>
            { Conservation.map((data) => {
                return (
                  data.id ==  openDetail &&<Typography sx = {{ 
                    fontSize: '10px !important',
                    color: theme => theme.palette.mode == 'dark' ? '#fff' : '#000',
                    whiteSpace: 'pre-line', 
                    textIndent: '2px', 
                    lineHeight: 'normal',
                    textAlign: 'justify',
                    display: 'block'
                   }}>
                    {data.information?.context.split('\n\n').map((data) => {
                      return (
                        <Box sx = {{ background: '#ccc', marginTop: '10px', fontSize: 'inherit', padding: 2 }}>
                          {data}
                        </Box>
                      )
                    })}
                  </Typography>
                )
              })
            }
          </Box>
        </Block>
      </Grid>
    </Grid>)
  
  
}

export default ChatGenerator
