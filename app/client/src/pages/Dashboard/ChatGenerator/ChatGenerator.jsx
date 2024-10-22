import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid2'
import TextInput from '~/components/Chatbots/TextInput';
import BubbleChatRight from '~/components/Chatbots/BubbleChatRight';
import BubbleChatLeft from '~/components/Chatbots/BubbleChatLeft';
import ChatBlock from '~/components/Chatbots/ChatBlock';
import { TypeAnimation } from 'react-type-animation';
import LoadingDot from '~/components/LoadingDot';
import Block from '~/components/Block';

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import AvatarUserDefault from '~/components/Avatar/AvatarUserDefault';
import { useDispatch } from 'react-redux';
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import ReactMarkdown from 'react-markdown';


const apiKey = 'AIzaSyAD15bFYXthZiX7PoRo9P33z0M_5ZVkidI';
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

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

const loading_chat = () => (
  <BubbleChatLeft
    text={<LoadingDot/>}
  />
)

function ChatGenerator() {

  const History = []
  const RecommendationQuestion = [
    {
      "id": 89734,
      "message": "Cho tôi biết về nội quy trường học"
    },
    {
      "id": 49532,
      "message": "Mình muốn tìm hiểu kỹ hơn về quy định đồng phục, bạn có thể nói rõ không?"
    },
    {
      "id" : 34252,
      "message": "Sinh viên có thể sử dụng wifi của trường trong những khu vực nào?"
    },
    {
      "id" : 34232,
      "message": "Sinh viên sẽ bị kỷ luật như thế nào nếu vi phạm nội quy?"
    }
  ]
  
  const dispatch = useDispatch()
  const [Conservation, setConservation] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef(null);

  const ChatAction = async (text) => {

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    chatSession.sendMessage(text).then(
      (result) => {
        setConservation(Conservation => [...Conservation,{
                                  "id": Math.floor(10000 + Math.random() * 90000),
                                  "role": "bot",
                                  "message": result.response.text()
    }])}).catch(
      (e) => { 
        setConservation(Conservation => [...Conservation,{
                                    "id": Math.floor(10000 + Math.random() * 90000),
                                    "role": "bot",
                                    "message": `Xin lỗi, Tôi không thể kết nối với server`
        }])
        console.log('Error: ', e)
      }
    ); 
  }

  const handleClick = (text) => {
    setConservation(Conservation => [...Conservation,{
                              "id": Math.floor(10000 + Math.random() * 90000),
                              "role": "user",
                              "message": text
            }])
    setIsLoading(true)
  }

  const markdownText = [
    "Đạo hàm là một khái niệm quan trọng trong toán học, đại diện cho tốc độ thay đổi của một hàm số tại một điểm cụ thể trên đồ thị của nó.\n",
    "**Ví dụ**: Đạo hàm của hàm số y = x² tại điểm x = 2 cho biết độ dốc của tiếp tuyến với đồ thị hàm số tại điểm có hoành độ x = 2.\n",
    "Đạo hàm được ứng dụng rộng rãi trong nhiều lĩnh vực như vật lý, kinh tế, kỹ thuật. Ví dụ: Tính vận tốc tức thời của một vật chuyển động, tìm giá trị lớn nhất, nhỏ nhất của một hàm số.\n",
    "Công thức tính đạo hàm cơ bản của một số hàm số đơn giản: **(x^n)' = n*x^(n-1)**"
  ];
  const bot_chat = (conservation, isTyping = false) => (
    <BubbleChatLeft
      key={conservation?.id}
      id={conservation?.id}
      text={
        <Typography variant='p' 
          sx = {{ 
            fontSize: '0.725rem',
            color: '#000',
            whiteSpace: 'pre-line', 
            textIndent: '2px', 
            lineHeight: 'normal' 
          }}>
          {isTyping ? <TypeAnimation 
            cursor = {false}
            sequence = {
              [
                () => setIsLoading(false),
                // ...markdownText.reduce((accumulator, currentValue) => {
                //     const lastElement = accumulator[accumulator.length - 1] || '';
                //     return [...accumulator, lastElement + currentValue];
                // }, [])
                conservation.message
              ]
            }
            speed={99}
          /> : (<ReactMarkdown> {conservation.message} </ReactMarkdown>)}
        </Typography>
      }
    />
  )

  const user_chat = (conservation, isTyping = false) => (
    <BubbleChatRight
      id={conservation?.id}
      key={conservation?.id}
      text={
        <Typography variant='p' 
          sx = {{ 
            whiteSpace: 'pre-line', 
            textIndent: '2px', 
            wordWrap: 'break-word' ,
            color:'#fff',
            fontSize:'0.725rem'
          }}>
          {isTyping ? <TypeAnimation
            style = {{ whiteSpace: 'pre-line', display: 'block' }} 
            cursor = {false}
            sequence = {
              [
                conservation.message
              ]
            }
            speed={80}
          /> : conservation.message }
        </Typography>
      }
    />
  )

  useEffect(() => {
    document.title = 'Chatbot - Trò chuyện';
    dispatch(sidebarAction({index: 466}))

    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Conservation, ChatAction, isLoading]);

  return (
    <Grid container  spacing={2} sx = {{ height: '100%' }}>
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
               }}>Xin Chào Kiệt !</Typography>
              <Typography variant='h3' sx = {{ 
                fontSize: '1.5rem',
                marginBottom: 2,
                width: 'fit-content',
                textAlign:'left',
                color: '#8e9492',
                fontWeight: '900',
               }}>Tôi có thể giúp gì cho bạn?</Typography>
              {RecommendationQuestion.map((question, index) => (
                <Button key = {index} sx = {(theme) => ({ 
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
              ))}
             <Box sx ={{ width: '100%', height: '20px' }}></Box>

              
            </Box>
            }

            {History.map((conservation, index) => conservation.role == 'bot' ? bot_chat(conservation) : user_chat(conservation))}
            {Conservation.map((conservation) => conservation.role == 'bot' ? bot_chat(conservation, true) : user_chat(conservation))}
            {isLoading && loading_chat()}
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
        <Block>
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
        </Block>
      </Grid>
    </Grid>
  )
}

export default ChatGenerator
