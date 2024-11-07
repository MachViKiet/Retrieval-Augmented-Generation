import Box from '@mui/material/Box'
import Block from '~/components/Block'
import Grid from '@mui/material/Grid2'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions'
import { Typography } from '@mui/material'
import styled from '@emotion/styled'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const Header = styled(Box) (({theme}) => ({
  background: theme.palette.mode == 'dark' ? '#3b416f' : theme.palette.primary.main,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
  height: theme.spacing(6),
  width: '100%',
  position: 'absolute',
  right: 0,
  top: '0',
  borderRadius: '15px 15px 0 0 ',
  zIndex: 1,
  paddingLeft: theme.spacing(4),
}))

// 'recruitment', 'timetable', 'scholarship', 'academic_affairs', 'events'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { useNavigate } from 'react-router-dom'
function KnowledgeBase() {

  const PARENT_DIRECTION = '/knowledge_bases'

  const knowledge_bases = [
    { "id" : 12346, "direction": '/student_handbook', "title": "Sổ Tay Sinh Viên", "description": "Tài liệu hướng dẫn, cung cấp thông tin về quy định, chính sách, tài nguyên và hỗ trợ dành cho sinh viên trong trường học." },
    { "id" : 12341, "direction": '/recruitment', "title": "Thông Tin Tuyển Sinh", "description": "Thông tin chi tiết về quy trình tuyển sinh, bao gồm thời gian, yêu cầu hồ sơ, và hướng dẫn đăng ký cho các chương trình đào tạo." },
    { "id" : 12342, "direction": '/timetable', "title": "Thời Khóa Biểu", "description": "Thông tin về thời khóa biểu học tập, bao gồm các môn học, giảng viên, và lịch trình các buổi học trong học kỳ." },
    { "id" : 12343, "direction": '/scholarship', "title": "Thông Tin Học Bổng", "description": "Chi tiết về các chương trình học bổng, tiêu chí xét duyệt, hạn nộp hồ sơ và các lợi ích khi nhận học bổng." },
    { "id" : 12344, "direction": '/academic_affairs', "title": "Nội Quy Trường Học", "description": "Thông tin về các vấn đề nội bộ, bao gồm quy định học tập, hỗ trợ sinh viên và các hoạt động kỹ luật." },
    { "id" : 12345, "direction": '/events', "title": "Thông Tin Sự kiện", "description": "Thông tin về các sự kiện diễn ra trong trường, bao gồm hội thảo, buổi giao lưu, và các hoạt động ngoại khóa cho sinh viên." },
    // {},{},{},{},{}, {}
]

// 'academic_affairs', 'recruitment', 'timetable', 'scholarship', 'events', 'student_handbook'

  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức'
    dispatch(sidebarAction({index: 346}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  const nagative = useNavigate()

  return (
    <Block sx = {{ paddingX: 4, paddingTop: 4, paddingRight: 1 }}>

      <Box>
        <Box sx = {{ display: 'flex', gap: 1, alignItems:'center' }}>
          <Typography variant='h1' sx = {{ 
              fontSize: '1.5rem',
              fontFamily: 'Roboto',
              fontWeight: '900',
              width: 'fit-content'
            }}>Danh Sách Chủ Đề</Typography>
        </Box>
        <Box sx = {{ display: 'flex', gap: 0.5, alignItems:'center', paddingTop: 0.5, paddingBottom: 2, color: theme => theme.palette.mode == 'dark'? '#b2b2b2' : '#727171',}}>
          <LightbulbOutlinedIcon fontSize='small' sx = {{ color: 'inherit' }}/>

          <Typography variant='p' component='p' fontSize= {'0.825rem'} sx = {{ 
            fontWeight: '400',
            color: 'inherit',
            width: 'fit-content',
            // paddingTop: 0.5,
            // paddingBottom: 2,
            textAlign: 'start'
          }}>Nền tảng tổ chức, lưu trữ thông tin giúp model có thể tiếp cận kiến thức hiệu quả và cung cấp kết quả mong muốn.</Typography>
        </Box>
      </Box>

      <Grid container  spacing={{ xs: 2, sm: 2, md: 4 }} columns={{ xs: 2, sm: 2, md: 4 }} sx = {{ 
        maxHeight: 'calc(100vh - 160px)',
        paddingY: '5px',
        paddingLeft: '2px',
        paddingBottom: 4,
        paddingRight: 2.5,
        overflow: 'auto',
       }}>
        {knowledge_bases.map((data) =>(
          <Box 
          key={data.id}
          sx = {{ 
            width: '200px',
            height: '200px',
            bgcolor: theme => theme.palette.mode == 'dark'? '#181c3291' : '#b1cee166',
            borderRadius: '15px',
            p: 0,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            padding: 2,
            paddingTop: 7,
            // color: 
            cursor: 'pointer',
            '&:active' : {
              transform: 'scale(0.9)'
            }
           }}
           onClick = {() => nagative(PARENT_DIRECTION + data.direction)}>
            <Header/>
            <Typography sx = {{fontSize:'1.125rem',width: 'fit-content', textAlign: 'start', fontWeight: '700'}}>{data.title}</Typography>
            <Typography variant='p' component='p' sx = {{
              paddingTop: '2px',
              fontSize: '0.725rem',
              fontWeight: '200',
              width: 'fit-content', 
              textAlign: 'left', 
              maxHeight: '160px',
              width: '170px',
              whiteSpace: 'nowrap',
              textWrap: 'wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '4',
              WebkitBoxOrient: 'vertical',
              // color: '#bbc6cf',
              }}>{data.description}</Typography>

            <Box sx = {{ 
              position: 'absolute',
              height: '50px',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.225,
              width: '100%',
              left: 0,
              bottom: 0,
              paddingX: 2,
              // color: '#bbc6cf'
             }}>
                <Typography fontSize={'0.725rem !important'} sx = {{color: 'inherit', width: 'fit-content', textAlign: 'start', display: 'flex', gap: 1, alignItems: 'center',  justifyContent:'center'}}>
                  <DescriptionOutlinedIcon sx={{ fontSize: 18 }}/>
                  0 Tài Liệu
                </Typography>
                <Typography fontSize={'0.725rem !important'} sx = {{color: 'inherit', width: 'fit-content' ,textAlign: 'start', display: 'flex', gap: 1, alignItems: 'center', justifyContent:'center'}}>
                  <DateRangeOutlinedIcon sx={{ fontSize: 18 }}/>
                  12/10/2024  10:12:53
                </Typography>
            </Box>
          </Box>
        ))}
      </Grid>

    </Block>
  )
}

export default KnowledgeBase
