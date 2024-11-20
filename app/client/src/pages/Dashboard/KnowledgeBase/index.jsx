import Box from '@mui/material/Box'
import Block from '~/components/Mui/Block'
import Grid from '@mui/material/Grid2'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Skeleton, Typography } from '@mui/material'
import styled from '@emotion/styled'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useCollection } from '~/apis/Collection'
import { formatTime } from '~/utils/GetTime'

const Header = styled(Box) (({theme}) => ({
  background: theme.palette.mode == 'dark' ? '#03082ecc' : '#0087d7', width: '100%', 
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)', height: theme.spacing(6), 
  position: 'absolute', right: 0, top: '0', borderRadius: '15px 15px 0 0 ', zIndex: 1, paddingLeft: theme.spacing(4) }))

function KnowledgeBase() {

  const nagative = useNavigate()
  
  const PARENT_DIRECTION = '/knowledge_bases/'
  const token = useSelector(state => state.auth.token)
  const [Collections, setCollections] = useState(null)
  const {processHandler, dashboard } = useOutletContext();

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức'
    dashboard.navigate.active(346)
    
    return () => ( dashboard.navigate.active('#') )
  }, [])

  useEffect(() => {
    if(token){
      const getCollectionEvent = processHandler.add('#getCollection')
      useCollection.getCollection(token).then((collections) => {
        processHandler.remove('#getCollection', getCollectionEvent)
        setCollections(collections)
      }).catch((err) => console.log(err))
    }
  }, [token])

  return (
    <Block sx = {{ paddingX: 4, paddingTop: 4, paddingRight: 1 }}>

      <Box>
        <Box sx = {{ display: 'flex', gap: 1, alignItems:'center', paddingBottom: 0.5 }}>
          <Typography variant='h1' 
            sx = {{ fontSize: '1.7rem', fontFamily: 'Roboto', fontWeight: '900', width: 'fit-content', color: theme => theme.palette.mode == 'dark' ? '#9ba3d9' : theme.palette.primary.main }}>
              Danh Sách Chủ Đề</Typography>
        </Box>
        <Box sx = {{ display: 'flex', gap: 0.5, alignItems:'center', paddingTop: 0.5, paddingBottom: 2, color: theme => theme.palette.mode == 'dark'? '#b2b2b2' : '#727171',}}>
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
            sx = {{ width: '200px', height: '200px', padding: 0, padding: 2, paddingTop: 7, borderRadius: '15px', position: 'relative', cursor: 'pointer',
              background: theme => theme.palette.mode == 'dark'? '#71758991' : '#71758936', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
              '&:active' : { transform: 'scale(0.9)' } }}
            onClick = {() => nagative(PARENT_DIRECTION + collection._id)}>

            <Header/>
            <Typography sx = {{fontSize:'1.125rem',width: 'fit-content', textAlign: 'start', fontWeight: '700'}}>
              {collection.collection_name}</Typography>
            
            <Typography variant='p' component='p' 
              sx = {{ paddingTop: '2px', fontSize: '0.725rem', fontWeight: '200', width: 'fit-content',  textAlign: 'left',  maxHeight: '160px', width: '170px',
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

        { !Collections && ['','','','','','','',''].map((_data, index) =>( <Skeleton key={ index * 82715 } variant="rounded" height={'200px'} width = {'200px'} sx = {{ marginBottom: 2, borderRadius: '15px' }} /> ))}
      </Grid>

    </Block>
  )
}

export default KnowledgeBase
