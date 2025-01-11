import React from 'react'
import { Box, Button, Skeleton, Typography } from '@mui/material';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FestivalOutlinedIcon from '@mui/icons-material/FestivalOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

const Container_Style = {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    paddingBottom: {md: 2, xs: 1},
    paddingTop: 1
}

export function RecommendChatPage({ 
    loading = null, 
    username = null, 
    ChatAction = null
}) {
    
    return loading ? (
    <Box>
        <Skeleton variant="rounded" width={'50%'} height={60} sx = {{ borderRadius: '10px', mb: 1 }} />
        <Skeleton variant="rounded" width={'70%'} height={40} sx = {{ borderRadius: '10px', mb: 1 }} />

        <Box sx = {Container_Style} >
            { ['','',''].map((_data, index) => ( <Skeleton key={index*275486} variant="rounded" width={120} height={40} sx = {{ borderRadius: '10px', mb: 1 }} /> )) }
        </Box>

        <Box sx = {Container_Style} >
            { ['','',''].map((_data, index) => ( <Skeleton key={index*208752} variant="rounded" width={180} height={180} sx = {{ borderRadius: '10px', mb: 1 }} /> )) }
        </Box>

        <Box sx ={{ width: '100%', height: 2 }}></Box>  
    </Box>
    ) : (
    <Box>
        {!username ? <Skeleton variant="rounded" width={'70%'} height={40} sx = {{ borderRadius: '10px', mb: 1 }} /> 
        : <Typography variant='h2' sx = {{ 
            fontSize: { xs: '1.385rem', md: '2rem' },
            width: 'fit-content',
            paddingBottom: { xs: '0', md: 0.2 },
            fontWeight: '900',
            background: theme => theme.palette.mode != 'dark' ? 
            'linear-gradient(74deg, #4285f4 0, #9b72cb 9%, #4654b1 20%, #423397 24%, #9b72cb 35%, #4285f4 44%, #9b72cb 50%, #5089ad 56%, #131314 75%, #131314 100%)'
            : 'linear-gradient(78deg, #7cff60 4%, color-mix(in oklch, #8bffcc, #00f50f) 22%, #f3ff00 45%, color-mix(in oklch, #efff34, #daf24f) 67%, #f4ff12 100.2%)',
            color: 'transparent',
            backgroundSize: '155% 100%',
            WebkitBackgroundClip : 'text',
            textAlign: 'start',
        }}>Xin Chào Bạn, {username} !</Typography> }

        <Typography variant='h3' sx = {{ 
            fontSize: { xs: '1.3rem', md: '1.5rem' },
            marginBottom: {md: 1, xs: 0.2},
            width: 'fit-content',
            textAlign:'left',
            color: '#8e9492',
            fontWeight: '900',
        }}>Tôi có thể giúp gì hôm nay ?</Typography>


        <Box sx = {{...Container_Style, gap: { md: 2, xs: 1 } }}>
        {['Cho tôi biết danh sách học bổng khuyến học mới nhất',
        'Giới thiệu trường Khoa Học Tự Nhiên năm 2025',
        'Tôi có thể tra cứu điểm và bảng điểm ở đâu?', 'Giới Thiệu về bộ môn Hệ Thống Thông Tin'].map((question, index) => {
            return (
            <Box key = {index} sx = {{ 
                flex:  { xs: "0 1 140px", md: "0 1 180px" },
                display: { sm: index >= 3 && 'none', xs: 'flex' }
             }}>
                <Box sx = {{ 
                height: { xs: "140px", md: "180px" }, width: '100%', borderRadius: '10px',
                backgroundImage: theme => theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #6e6e6e4a 0%, #02041a91 100%)' 
                : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                padding: 2, position: 'relative', textAlign: 'start',
                color: theme => theme.palette.mode == 'dark' ? '#ffff' : 'var(--mui-palette-primary-main)',
                boxShadow: theme => theme.palette.mode == 'dark' ? 
                '0px 2px 4px rgb(255,255,255,0.25), 0px 2px 4px rgb(255,255,255 ,0.1)' : '0px 2px 4px rgb(0 ,0 ,0 , 0.25), 0px 2px 4px rgb(0, 0, 0 ,0.1)',
                cursor: 'pointer',
                '&:hover': {
                    color: '#fff',
                    backgroundImage: theme => theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #153a6b 0%, #02041a91 100%)' 
                    : 'linear-gradient(120deg, #005181 0%, #1596e5fa 100%)' },
                '&:active': { transform: 'scale(0.9)' } }} onClick = {async () => { ChatAction && await ChatAction(question) }}>
                    {index + 1}{'. '}{question}
                <span style={{  position: 'absolute', bottom: '16px', right: '16px' }}> <TipsAndUpdatesOutlinedIcon/> </span>
                </Box>
            </Box>
            )
        })}
        </Box>

        <Box sx = {Container_Style} >
        {
            [{
            id: '12310',
            key: 'Nội quy trường học',
            icon: <ViewStreamIcon/>,
            question: 'Khái quát nội quy trường học Khoa Học Tự Nhiên năm 2025'
            },{
            id: '12315',
            key: 'Thông tin sổ tay sinh viên',
            icon: <ContactSupportOutlinedIcon/>,
            question: 'Tóm Tắt Thông Tin Sổ Tay Sinh Viên Năm 2025'
            },{
            id: '12314',
            key: 'Chính Sách Học Bổng',
            icon: <AssuredWorkloadOutlinedIcon/>,
            question: 'Chính Sách Học Bổng Các Năm'
            },{
            id: '12326',
            key: 'Thời Khóa Biểu',
            icon: <CalendarMonthOutlinedIcon/>,
            question: 'Lịch Cập Nhật Thời Khóa Biểu Mới Nhất Học Kì 2 2025'
            },{
            id: '12216',
            key: 'Thông Tin Sự Kiện',
            icon: <FestivalOutlinedIcon/>,
            question: 'Thông Tin Sự Kiện Mới Nhất Năm 2025'
            },{
            id: '13316',
            key: 'Thông Tin Tuyển Dụng',
            icon: <PaymentsOutlinedIcon/>,
            question: 'Thông Tin Tuyển Dụng Gần Nhất'
            }].map((data) => {
            return (
                <Button key = {data.id} sx = {(theme) => ({ 
                    width: 'fit-content',
                    background: theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #6e6e6e4a 0%, #02041a91 100%)' 
                        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    color: theme.palette.mode == 'dark' ? '#fff' : '##000000a3',
                    textAlign: 'left',
                    marginRight: { xs: 0.4, md: 0.75 },
                    paddingX: 1,
                    borderRadius: '10px',
                    boxShadow: theme => theme.palette.mode == 'dark' ? 
                    '0px 2px 4px rgb(255,255,255,0.1), 0px 2px 4px rgb(255,255,255 ,0.1)' : '0px 2px 4px rgb(0 ,0 ,0 , 0.25), 0px 2px 4px rgb(0, 0, 0 ,0.1)',
                    "&:hover": {
                        background: theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #153a6b 0%, #02041a91 100%)' 
                            : 'linear-gradient(120deg, #005181 0%, #1596e5fa 100%)',
                        color: '#fff'
                    }
                })}
                startIcon= {data.icon}
                onClick = {async () => {
                    ChatAction && await ChatAction(data.question)
                }}>
                    <Typography variant='p' color='inherit' sx = {{ fontSize: { xs: '0.655rem', md: '0.725rem' }, whiteSpace: 'pre-line', textIndent: '2px' }}>
                    {data.key}
                    </Typography>
                </Button>
            )
            })
        }
        </Box>

    </Box>
  )
}

export default RecommendChatPage