import Box from '@mui/material/Box'
import Block from '~/components/Mui/Block'
import Grid from '@mui/material/Grid2'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, IconButton, MenuItem, Select, Skeleton, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useCollection } from '~/apis/Collection'
import { formatTime } from '~/utils/GetTime'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const Header = styled(Box) (({theme}) => ({
  background: theme.palette.mode == 'dark' ? 'rgb(45, 50, 90)' : 'rgb(0, 81, 129)', width: '100%', 
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)', height: theme.spacing(6), 
  position: 'absolute', right: 0, top: '0', borderRadius: '14px 14px 0 0 ', zIndex: 1, paddingLeft: theme.spacing(4) }))

function KnowledgeBase() {

  const nagative = useNavigate()
  
  const PARENT_DIRECTION = '/knowledge_bases/'
  const token = useSelector(state => state.auth.token)
  const [Collections, setCollections] = useState(null)
  const {processHandler, dashboard, noticeHandler, getModal } = useOutletContext();

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức'
    dashboard.navigate.active(346)
    
    return () => ( dashboard.navigate.active('#') )
  }, [])

  useEffect(() => {
    if(token){
      getCollection(token).then((collections) => {
        setCollections(collections)
      }).catch((err) => console.error('Lấy Danh Sách Collection Thất Bại !'))
    }
  }, [token])

  const getCollection = async (token) => {
    const getCollectionEvent = processHandler.add('#getCollection')
    return useCollection.getCollection(token).then((collections) => {
      processHandler.remove('#getCollection', getCollectionEvent)
      return collections
    }).catch((error) => {
      processHandler.remove('#getCollection', getCollectionEvent)
      noticeHandler.add({
        status: 'error',
        message: error
      })
    })
  }

  return (
    <Block sx = {{ paddingX: 4, paddingTop: 4, paddingRight: 1 }}>

      <Box>
        <Box sx = {{ display: 'flex', gap: 1, alignItems:'center', justifyContent: 'space-between', paddingBottom: 0.5 }}>
          <Typography variant='h1' 
            sx = {{ fontSize: '1.7rem', fontFamily: 'Roboto', fontWeight: '900', width: 'fit-content', color: theme => theme.palette.mode == 'dark' ? '#fff' : theme.palette.primary.main }}>
              Danh Sách Chủ Đề</Typography>
            <Box  sx ={{ marginRight: 2 }}>
              <Button startIcon = {<AddBoxOutlinedIcon/>} component="label" role={undefined} tabIndex={-1}
                onClick={() => getModal('Tạo Mới Chủ Đề', <NewCollection_Modal/>, "Tạo Mới")}
                sx = {{ marginRight: 3, color: '#fff', background: theme=> theme.palette.primary.main ,paddingX:2,paddingY: 1,boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',borderRadius: '10px' }} >
              Tạo mới chủ đề</Button>
            </Box>
        </Box>
        <Box sx = {{ display: 'flex', gap: 0.5, alignItems:'center', paddingTop: 0.5, paddingBottom: 2, color: theme => theme.palette.mode == 'dark'? '#fff' : '#727171',}}>
          <LightbulbOutlinedIcon sx = {{ color: 'inherit', fontSize: '20px' }}/>

          <Typography variant='p' component='p' fontSize= {'0.925rem'} 
            sx = {{  fontWeight: '400', color: 'inherit', width: 'fit-content', textAlign: 'start' }}>
              Nền tảng tổ chức, lưu trữ thông tin giúp model có thể tiếp cận kiến thức hiệu quả và cung cấp kết quả mong muốn.</Typography>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 2, md: 4 }} columns={{ xs: 2, sm: 2, md: 4 }} 
        sx = {{ maxHeight: 'calc(100vh - 160px)', paddingY: '5px', paddingLeft: '2px', paddingBottom: 4, paddingRight: 2.5, overflow: 'auto', }}>
        {Collections && Collections.map((collection) => (
          <Box key={collection._id}
            sx = {{ width: '200px', height: '200px', color: '#000', padding: 2, paddingTop: 7, borderRadius: '15px', position: 'relative', cursor: 'pointer',
              background: theme => theme.palette.mode == 'dark'? '#fefefe' : '#71758936', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
              '&:active' : { transform: 'scale(0.9)' } }}
            onClick = {() => nagative(PARENT_DIRECTION + collection._id)}>

            <Header/>
            <Typography sx = {{fontSize:'1.125rem',width: 'fit-content', textAlign: 'start', fontWeight: '700'}}>
              {collection.collection_name}</Typography>
            
            <Typography variant='p' component='p' 
              sx = {{ paddingTop: '2px', fontSize: '0.725rem', fontWeight: '400', textAlign: 'left',  maxHeight: '160px', width: '170px',
              whiteSpace: 'nowrap', textWrap: 'wrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical' }}>
                {collection.collection_description}</Typography>
            <Box sx = {{  position: 'absolute', height: '50px', display: 'flex', flexDirection: 'column', gap: 0.225, width: '100%', left: 0, bottom: 0, paddingX: 2 }}>
                <Typography fontSize={'0.725rem !important'} sx = {{color: 'inherit', width: 'fit-content', textAlign: 'start', display: 'flex', gap: 1, alignItems: 'center',  justifyContent:'center'}}>
                  <DescriptionOutlinedIcon sx={{ fontSize: 18 }}/>
                  {collection.amount_document} Tài Liệu
                </Typography>
                <Typography fontSize={'0.725rem !important'} sx = {{color: 'inherit', width: 'fit-content' ,textAlign: 'start', display: 'flex', gap: 1, alignItems: 'center', justifyContent:'center'}}>
                  <DateRangeOutlinedIcon sx={{ fontSize: 18 }}/>
                  {formatTime(collection.createdAt)}
                </Typography>
            </Box>
          </Box>
        ))}

        { !Collections && ['','','',''].map((_data, index) =>( <Skeleton key={ index * 82715 } variant="rounded" height={'200px'} width = {'200px'} sx = {{ marginBottom: 2, borderRadius: '15px' }} /> ))}
      </Grid>

    </Block>
  )
}

export default KnowledgeBase

const TEXTFIELD_STYLE = {
  '--mui-palette-text-secondary': '#6d6d6d',
  '& .MuiInputBase-root':{
    background: '#7d7d7d0d'
  },
  '& svg': {
    color: '#000'
  },
  '& fieldset': {
    color: '#000'
  },
  '& .MuiSlider-mark': {
    color: '#777',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  '& .MuiSlider-markLabel': {
    color: '#6d6d6d',
    // '&.MuiSlider-markLabelActive': {
    //   color: '#074307',
    //   fontWeight: '700'
    // }
  }
}
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

export const NewCollection_Modal = (props) => {
  const [newMetadata, setMetadata] = useState([])

  return <Box sx = {{  display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Typography> Cho phép người quản trị hoặc nhà phát triển định nghĩa và thêm các chủ đề mới vào hệ thống chatbot, từ đó mở rộng phạm vi kiến thức và khả năng phản hồi của nó.</Typography>
    <TextField sx = {TEXTFIELD_STYLE} fullWidth label="Tên chủ đề" id="collection_name" placeholder='Nội Dung Nổi Bật Trong Năm 2025?'/>
    <TextField sx = {TEXTFIELD_STYLE} fullWidth multiline rows={3} id="collection_description" label="Mô Tả Chủ Đề"
      placeholder={`Chủ đề nổi bật được sinh viên quan tâm năm 2025 bao gồm ...`}/>
    
    <Box sx ={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant='h6'>Thêm metadata</Typography>
      <IconButton
        onClick={() => {setMetadata(prev => [...prev, {}])}} 
       sx = {{ background:'#cccccc6e' }} ><AddOutlinedIcon sx = {{color:'#000'}}/></IconButton>
    </Box>
    <Box sx = {{ width: '100%', minHeight: '60px', borderRadius: '5px', display: 'flex', flexDirection:'column', gap: 1.5 }}>
      {newMetadata.map(() => {
        return (
      <Box sx = {{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx = {{ display: 'flex', alignItems: 'center' }}>
          <TextField sx = {TEXTFIELD_STYLE} fullWidth label="Tên Dữ Liệu" id="metadata_name" placeholder='Ngày Tạo'/>
          <MoreVertOutlinedIcon/>
          <Select
            label="Loại dữ liệu"
            value={'String'} sx = {TEXTFIELD_STYLE} 
          >
            <MenuItem value="String">
              <em>Chuỗi Ký Tự</em>
            </MenuItem>
            <MenuItem value="Bool">
              <em>True/False</em>
            </MenuItem>
            <MenuItem value="Int">
              <em>Số Nguyên</em>
            </MenuItem>
            <MenuItem value="Float">
              <em>Số Thập Phân</em>
            </MenuItem>
          </Select>
        </Box>
        <Box sx = {{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField sx = {TEXTFIELD_STYLE} fullWidth label="Mô Tả Tài Liệu" id="metadata_description" placeholder='Ngày tài liệu được tạo'/>
          <IconButton ><DeleteOutlineOutlinedIcon sx = {{color:'red'}}/></IconButton>
        </Box>
        
        <Box sx= {{ width: '100%', height: '2px', background: '#fff' }}></Box>
      </Box>
        )
      })} 
    </Box>
  </Box>
}
