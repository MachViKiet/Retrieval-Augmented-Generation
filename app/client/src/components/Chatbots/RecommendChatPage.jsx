import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

const Container_Style = {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    paddingBottom: 1
}

export function RecommendChatPage({ 
    bgcolor = null, 
    username = null, 
    ChatAction = null
}) {
    
    return (
    <Box>
        <Typography variant='h2' sx = {{ 
            fontSize: '2rem',
            width: 'fit-content',
            paddingBottom: 0.5,
            fontWeight: '900',
            background: 'linear-gradient(74deg, #4285f4 0, #9b72cb 9%, #d96570 20%, #d96570 24%, #9b72cb 35%, #4285f4 44%, #9b72cb 50%, #d96570 56%, #131314 75%, #131314 100%)',
            color: 'transparent',
            backgroundSize: '400% 100%',
            WebkitBackgroundClip : 'text',
            textAlign: 'start'
        }}>Xin Chào Bạn, {username} !</Typography>
        <Typography variant='h3' sx = {{ 
            fontSize: '1.5rem',
            marginBottom: 2,
            width: 'fit-content',
            textAlign:'left',
            color: '#8e9492',
            fontWeight: '900',
        }}>Tôi có thể giúp gì hôm nay?</Typography>

        <Box sx = {Container_Style} >
        {
            [{
            id: '12314',
            key: 'Giới Thiệu Khoa',
            icon: <ViewStreamIcon/>,
            question: 'Giới Thiệu Khoa Công Nghệ thông Tin'
            },{
            id: '12315',
            key: 'Nội Quy Trường Học',
            icon: <ContactSupportOutlinedIcon/>,
            question: 'Khái quát nội quy trường học Khoa Học Tự Nhiên'
            },{
            id: '12316',
            key: 'Chính Sách Học Bổng',
            icon: <AssuredWorkloadOutlinedIcon/>,
            question: 'Chính Sách Học Bổng Mới Nhất 2024'
            }].map((data) => {
            return (
                <Button key = {data.id} sx = {(theme) => ({ 
                    width: 'fit-content',
                    background: theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #6e6e6e4a 0%, #515480 100%)' 
                        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    color: theme.palette.mode == 'dark' ? '#ffffffad' : '##000000a3',
                    marginBottom: 1,
                    textAlign: 'left',
                    paddingX: 1.5,
                    borderRadius: '10px',
                    boxShadow: '0px 2px 4px rgba(80, 80, 80, 0.25), 0px 1px 2px rgba(80, 80, 80, 0.1)',
                    "&:hover": {
                        background: theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #6e6e6e4a 0%, #05083891 100%)' 
                            : 'linear-gradient(120deg, #005181 0%, #1596e5fa 100%)',
                        color: '#fff'
                    }
                })}
                startIcon= {data.icon}
                onClick = {async () => {
                    ChatAction && await ChatAction(data.question)
                }}>
                    <Typography variant='p' fontSize={'0.725rem'} color='inherit' sx = {{ whiteSpace: 'pre-line', textIndent: '2px' }}>
                    {data.key}
                    </Typography>
                </Button>
            )
            })
        }
        </Box>

        <Box sx = {Container_Style}>
        {['Cho tôi biết danh sách học bổng khuyến học mới nhất',
        'Wifi phòng học của trường KHTN là gì?',
        'Tôi có thể tra cứu điểm và bảng điểm ở đâu?'].map((question, index) => {
            return (
            <Box key = {index} sx = {{ 
                flex: "0 1 180px"
             }}>
                <Box sx = {{ 
                height: '180px',
                width: '100%',
                borderRadius: '10px',
                backgroundImage: theme => theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #6e6e6e4a 0%, #515480 100%)' 
                : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                padding: 2,
                position: 'relative',
                textAlign: 'start',
                color: theme => theme.palette.mode == 'dark' ? '#ffffffad' : '##000000a3',
                boxShadow: '0px 2px 4px rgba(80, 80, 80, 0.25), 0px 2px 4px rgba(80, 80, 80, 0.1)',
                cursor: 'pointer',
                '&:hover': {
                    color: '#fff',
                    backgroundImage: theme => theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #6e6e6e4a 0%, #05083891 100%)' 
                    : 'linear-gradient(120deg, #005181 0%, #1596e5fa 100%)',
                },
                '&:active': {
                    transform: 'scale(0.9)'
                }
                }} onClick = {async () => {
                    ChatAction && await ChatAction(question)
                }}>
                {index + 1}{'. '}{question}

                <span style={{ 
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px'
                }}>
                    <TipsAndUpdatesOutlinedIcon/>
                </span>
                </Box>
            </Box>
            )
        })}
        </Box>

        <Box sx ={{ width: '100%', height: 2 }}></Box>  
    </Box>
  )
}

export default RecommendChatPage