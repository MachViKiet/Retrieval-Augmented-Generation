import { Box, Breadcrumbs, Link, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import MuiTable from '~/components/MuiTable/MuiTable';
import {renderControlledSwitches} from '~/components/MuiTable/cell-renderers/switch'
import { useDispatch, useSelector } from 'react-redux';
import Block from '~/components/Mui/Block';
import { renderTableAction } from '~/components/MuiTable/MuiTableAction';
import { useDocument } from '~/apis/Document';
import ExternalWebsite from '~/components/ExternalWebsite ';

function createData(id, chunk, page_number ,enable, action) {
  return { id, chunk,page_number, enable ,action};
}

const useData = (chunks) => {
  if(!chunks) return {rows: [], columns: []}

  // const rows = [
  //   createData(Math.floor(10000000 + Math.random() * 90000000),`QUY CHẾ ĐÀO TẠO TRÌNH ĐỘ ĐẠI HỌC 
  //     TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN, ĐHQG-HCM 
  //     (Ban hành kèm theo Quyết định số 1175/QĐ-KHTN ngày 24/9/2021 
  //     của Hiệu trưởng Trường Đại học Khoa học tự nhiên, ĐHQG-HCM)`, 2, true,  [ 'edit', 'delete']),
  // ]

  const rows = chunks.filter((chunk) => {
    const {_id} = chunk
    return createData(_id ,`----`, 2, true,  ['edit', 'delete'])
  })

  const columns = [
    { 
      field: 'chunk', 
      headerName: 'Đoạn Cắt Từ Tài Liệu', 
      width: 380,
      renderCell: (params) => (
      <Tooltip title= {params.value} placement="top-end" >
        <Typography variant='p' component='p' 
          sx = {{ textAlign: 'justify', padding: '5px 0', display: 'block', height: '100%', 
            maxHeight: '67px', width: '100%', whiteSpace: 'nowrap', textWrap: 'wrap', lineHeight: '15px', overflow: 'hidden', 
            textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical' }}
          onClick={(event) => {
            const page_number = params.row?.page_number
            if (scroll != page_number) {
              event.stopPropagation();
              setScroll(page_number)
    };
          }}>
            {params.value}
          </Typography>
      </Tooltip>
      )
    },
    {
      field: 'enable',
      headerName: 'Hoạt Động',
      width: 80,  
      renderCell: renderControlledSwitches ,  
    },
    {
      field: 'action',
      headerName: '-',
      width: 70,
      renderCell: renderTableAction,
    }
  ];

  return {rows, columns}
}

function DatasetDetail() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [scroll, setScroll] = useState(null)

  const { id, collection } = useParams();

  const token = useSelector(state => state.auth.token)

  const [documentWithChunk, setDocumentWithChunk] = useState(null)

  const {processHandler, dashboard } = useOutletContext();

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức - Tài Liệu'
    dashboard.navigate.active(346)
    
    return () => ( dashboard.navigate.active('#') )
  }, [])
 
  // useEffect(() => {
  //   document.title = 'Chatbot - Quản Lý Tri Thức - Tài Liệu'
  //   dispatch(sidebarAction({index: 346}))
  //   dispatch(navigate_subnav({index: 0, openSubSidebar : true}))
  //   setScroll(0)
  //   return () => (
  //     dispatch(sidebarAction({index: null}))
  //   )
  // }, [])

  useEffect(() => {
    if(token) {
      const event = processHandler.add('#loadDocumentWithChunk')
      loadDocumentWithChunk(id, token).then((documentWithChunk) => {
        setDocumentWithChunk(documentWithChunk)
        console.log(documentWithChunk)
        processHandler.remove('#loadDocumentWithChunk', event)
      }).catch((err) => console.log(err))
    }
  },[token])

  const loadDocumentWithChunk = async (document_id, token) => {
    return useDocument.getDocumentWithChunk(document_id, token).then((document) => document )
  }

  return (
    <Block>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" key={id} color="inherit"
          onClick = {() => navigate(`/knowledge_bases/${collection}`)} 
          sx = {{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TopicOutlinedIcon/>
        </Link>,
        <Typography key="62756213"> {documentWithChunk?.document_name} </Typography>
      </Breadcrumbs>

      <Box sx = {{ 
        height: 'calc(100vh - 110px)',
        marginTop: 2,
        borderRadius: '15px',
        display: 'flex',
        gap: 2
       }}>
        <Box sx = {{ 
          width: '60%', 
          minWidth: '450px' ,
        }}>
          <MuiTable 
            useData = {useData(documentWithChunk?.chunks)} 
            rowHeight={101}
          />
        </Box>

        <Box sx = {{ 
            width: '40%',
            height: '100%',
            background: theme => theme.palette.mode == 'dark' ? '#2222228a' : '#fff',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
            paddingY: 2,
            paddingX: 2,
            borderRadius: '15px'
          }}>
          {/* <Documents scroll={scroll}/> */}

          <ExternalWebsite url = {documentWithChunk?.url}/>
        </Box>
      </Box>
    </Block>
  )
}

export default DatasetDetail
