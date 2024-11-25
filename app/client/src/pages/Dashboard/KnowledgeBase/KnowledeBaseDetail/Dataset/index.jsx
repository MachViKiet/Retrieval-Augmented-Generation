import { Box, Breadcrumbs, Button, FormControl, IconButton, Input, InputLabel, Link, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import MuiTable from '~/components/MuiTable/MuiTable';
import { useSelector } from 'react-redux';
import Block from '~/components/Mui/Block';
import { renderTableAction } from '~/components/MuiTable/MuiTableAction';
import { useDocument } from '~/apis/Document';
import ExternalWebsite from '~/components/ExternalWebsite ';
import MemoryIcon from '@mui/icons-material/Memory';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

function createData(id, chunk) {
  return { id, chunk};
}

const useData = (chunks) => {
  if(!chunks) return {rows: [], columns: []}

  const rows = chunks.map((data) => {
    const { id, chunk } = data
    return createData(id, chunk)
  })

  const columns = [
    { 
      field: 'chunk', 
      headerName: 'Đoạn Cắt Từ Tài Liệu', 
      width: 520,
      renderCell: (params) => (
      <Tooltip title= {params.id} placement="top-end" >
        <Typography variant='p' component='p' 
          sx = {{ textAlign: 'justify', padding: '5px 0', display: 'block', height: '100%', paddingX: 1,
            maxHeight: '67px', width: '100%', whiteSpace: 'nowrap', textWrap: 'wrap', lineHeight: '15px', overflow: 'hidden', 
            textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical' }}>
          {params.value}
          </Typography>
      </Tooltip>
      )
    }
  ];

  return {rows, columns}
}

function DatasetDetail() {
  const navigate = useNavigate()

  const { id, collection } = useParams()
  const {processHandler, noticeHandler, dashboard } = useOutletContext()

  const [documentWithChunk, setDocumentWithChunk] = useState(null)
  const [openModalUpload, setOpenModalUpload] = useState(false)
  const [openModalChunking, setOpenModalChunking] = useState(false)
  const [schema, setSchema] = useState(null)
  const [chunk_id, set_chunk_id] = useState(null)
  
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức - Tài Liệu'
    dashboard.navigate.active(346)
    
    return () => {
      dashboard.navigate.active('#')
      console.log('destructor')
    }
  }, [])
 
  useEffect(() => {
    if(token) {
      const event = processHandler.add('#loadDocumentWithChunk')
      loadDocumentWithChunk(id, token).then((documentWithChunk) => { setDocumentWithChunk(documentWithChunk) })
      .catch((err) => console.log('error ',err))
      .finally(() =>  processHandler.remove('#loadDocumentWithChunk', event)) 

      const loadCollectionSchemaEvent = processHandler.add('#loadCollectionSchema')
      loadCollectionSchema(collection, token).then((schema) => setSchema(schema))
      .catch((err) => console.log(err))
      .finally(()=> processHandler.remove('#loadCollectionSchema', loadCollectionSchemaEvent))
    }
  },[token])

  const loadCollectionSchema = async (collection_id, token) => {
    return useCollection.getCollectionSchema(collection_id, token).then((document) => document )
  }

  const loadDocumentWithChunk = async (document_id, token) => {
    return useDocument.getDocumentWithChunk(document_id, token).then((document) => document )
  }

  const DocumentUpdate = async (new_data) => {
    const UpdateDocumentEvent = processHandler.add('#UpdateDocument')
    await useDocument.update(new_data, token).then((document) => {
      setDocumentWithChunk(prev => ( {...document, chunks: prev.chunks}))
      noticeHandler.add({
        status: 'success',
        message: 'Cập Nhật Dữ Liệu Thành Công'
      })
    })
    .catch((err) => {
      noticeHandler.add({
        status: 'error',
        message: err
      })
    })
    .finally(()=> processHandler.remove('#UpdateDocument', UpdateDocumentEvent))
  }

  const ProcessButton = async () => {
    const data = {
      id: id,
      chunks: documentWithChunk.chunks.map((data) => data.chunk)
    }
    const processDocumentEvent = processHandler.add('#processDocument')
    useDocument.process(data, token).then((res) => console.log('Dữ Liệu Trả Về: ', res))
    .catch((err) => console.log(err))
    .finally(()=> processHandler.remove('#processDocument', processDocumentEvent))
  }

  return (
    <Block>
      <Box sx ={{ width: '100%', height: 'auto', marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" key={id} color="inherit"
            onClick = {() => navigate(`/knowledge_bases/${collection}`)} 
            sx = {{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TopicOutlinedIcon/>
          </Link>,
          <Typography key="62756213"> {documentWithChunk?.document_name} </Typography>
        </Breadcrumbs>

        <Box sx = {{ display: 'flex',justifyContent: 'end',  width: 'fit-content', gap: 2 }}>

          <Button component="label" startIcon={<SaveAsIcon/>} onClick={(e) => {
            DocumentUpdate({
              id: id,
              update: {
                chunks: documentWithChunk.chunks,
                metadata: documentWithChunk.metadata
              }
            })
          }}
            sx = {{ color: '#fff', background: theme=> theme.palette.primary.main ,paddingX:2,paddingY: 1,boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',borderRadius: '10px' }} >
              Lưu Thay Đổi
          </Button>

          <Button component="label" startIcon={<AccountTreeIcon/>} onClick={() => setOpenModalUpload(true)}
            sx = {{ color: '#fff', background: theme=> theme.palette.primary.main ,paddingX:2,paddingY: 1,boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',borderRadius: '10px' }} >
              Chỉnh Sửa Thông Tin
          </Button>

          <Button disabled = { documentWithChunk?.state=='processed' } component="label" startIcon={<MemoryIcon />} color={'error'} onClick={ProcessButton} variant='contained'
            sx = {{ paddingX: 2, paddingY: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',borderRadius: '10px' }} 
            > Xử Lý Tài Liệu
          </Button>
        </Box>
      </Box>

      <Box sx = {{  height: 'calc(100vh - 126px)', marginTop: 2, borderRadius: '15px', display: 'flex',justifyContent:'space-between', gap: 2 }}>
        <Box sx = {{  width: '60%',  minWidth: '450px'}}>
          <MuiTable onRowClick={(e) => { setOpenModalChunking(true); set_chunk_id(e.id) }}
            rowHeight={101} useData = {useData(documentWithChunk?.chunks)} />
        </Box>

        <Box sx = {{ width: '45%', height: '100%', borderRadius: '15px', padding: 2,
            background: theme => theme.palette.mode == 'dark' ? '#323639' : '#323639',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
          }}>
          <ExternalWebsite url = {documentWithChunk?.url}/>
        </Box>
      </Box>

      { openModalUpload && <SettingDocumentModal
        document = {{
          id: id,
          getMetadata: () => documentWithChunk?.metadata,
          state: documentWithChunk?.state,
          setMetadata: (value) => {
            if(documentWithChunk?.state != 'pending') return false
            setDocumentWithChunk(prev =>({ ...prev, metadata: { ...prev.metadata, ...value }} ))
            return true
          },
          getName: () => documentWithChunk?.document_name,
          setName: (value) => {
            if(documentWithChunk?.state != 'pending') return false
            setDocumentWithChunk(prev => ({ ...prev, document_name: value }))
            return true
          }
        }}
        dashboard = {dashboard}
        modalHandler = {{
          state: openModalUpload,
          close: () => setOpenModalUpload(false),
          submit: DocumentUpdate,
          buffer: schema,
        }} /> }

      { openModalChunking && <SettingChunkModal
        document = {{
          id: id,
          state: documentWithChunk?.state,
          getChunk: (id) => {
            if(!documentWithChunk?.chunks) return ''
            const chunk = documentWithChunk?.chunks.filter((chunk) => {
              return chunk.id == id
            })
            if(chunk && chunk.length != 0) return chunk[0].chunk
            return ''
          },
          setChunks: (id, value) => {
            if(documentWithChunk?.state != 'pending') return false
            setDocumentWithChunk(prev =>({ ...prev, chunks: prev.chunks.map((chunk) => {
              if(chunk.id == id) return { id: id, 'chunk': value }
              return chunk
            })} ))
            return true
          },
          addChunk: (id, newChunk) => {
            const index = documentWithChunk?.chunks.findIndex((item) => item.id === id)
            if(index != -1){
              documentWithChunk?.chunks.splice(index + 1, 0, newChunk);
            }
          },
          removeChunks: (ids = []) => {
            const new_chunks = documentWithChunk?.chunks.filter((chunks) => {
              return !ids.includes(chunks.id)
            })
            setDocumentWithChunk(prev => ({...prev, chunks: new_chunks}))
            return true
          }
        }}
        modalHandler = {{
          state: openModalChunking,
          close: () => setOpenModalChunking(false),
          buffer: chunk_id,
        }} /> }
    </Block>
  )
}

export default DatasetDetail


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useCollection } from '~/apis/Collection';
import Grid from '@mui/material/Grid2';
import { useCode } from '~/hooks/useMessage';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { CreateID } from '~/utils/CreateID';

function SettingDocumentModal({ document, modalHandler = null }) {

  const [error_message, setError_message] = useState(null)

  const handleSubmit = async (e) => {
    if(document?.state != 'pending') {
      setError_message('Tài Liệu Đã Hoặc Đang Được Xử Lý, Không Thể Thay Đổi !')
      return
    }

    const metadata = document.getMetadata()
    const document_name = document.getName()

    const condition = getSchema(modalHandler.buffer).every(
      data => metadata?.[data.key] && metadata[data.key] != '' && metadata[data.key] != [])

    if(!condition) {
      setError_message('Hãy Điền Tất Cả Các Trường Dữ Liệu! ')
      return
    }

    await modalHandler.submit({
      id: document.id,
      update: {
        document_name: document_name,
        metadata: metadata
      }
    })
    
    modalHandler.close()
  }

  const getSchema = (data) => {
    if(!data) return []
    const array =  Object.entries(data).map(([key, value]) => {
      return { key, value };
    }).filter(
      (metaData) => !['created_at', 'updated_at','document_id', 'title', 'page_number', 'in_effect', 'file_links', 'url'].includes(metaData.key))
    return array
  }

  return (
    <React.Fragment>
      <Dialog
        open={modalHandler?.state}
        onClose={() => { modalHandler?.close(); setError_message('')} }>
        <DialogTitle sx = {{ color: theme => theme.palette.text.secondary, display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx = {{ width: '90vw', maxWidth: '600px', display: 'flex', alignItems: 'center', gap: 2}}>
             Thông Tin Tài Liệu
          </Box>
        </DialogTitle>
        <DialogContent >
          <Box sx = {{ display: 'flex', flexWrap: "wrap",  paddingBottom: 1, gap: 2, color: theme => (theme.palette.text.secondary) }}>
            <FormControl variant="standard" sx = {{ width: '100%', color: 'inherit' }}>
              <InputLabel sx = {{  color: 'inherit !important' }}>Tên Tài Liệu</InputLabel>
              <Input id="Description" value={document.getName()} onChange={(e) => document.setName(e.target.value)}
                sx = {{  color: 'inherit', '&:before, &:after':{ borderBottom: theme => `2px solid ${theme.palette.text.secondary} !important` } }}/>
            </FormControl>

            <Grid container spacing={3} sx = {{ width: '100%' }}>
            {
              getSchema(modalHandler.buffer).map((data) => {
                const icon  = (<Tooltip title={data.value.description} placement="top">
                  <IconButton aria-label="information" color='inherit'>
                    <HelpOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>)

                return  <Grid size={6}>
                  <FormControl variant="standard" sx = {{ width: '100%', color: 'inherit' }}>
                    <InputLabel sx = {{  color: 'inherit !important' }}>{useCode(data.key)}</InputLabel>
                    <Input endAdornment = {data.value.description && icon}
                      id="Description" value={document.getMetadata()?.[data.key]} onChange={(e) => document.setMetadata({[data.key]: e.target.value}) }
                      sx = {{ cursor: 'pointer',  color: 'inherit', '&:before, &:after':{ borderBottom: theme => `2px solid ${theme.palette.text.secondary} !important` } }}/>
                  </FormControl>
                </Grid>   
              })
            }
            </Grid>
          </Box>
        <Typography sx = {{ color: '#ff6262' }}>{error_message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}
            sx = {{ color: theme => theme.palette.text.secondary }}>Lưu Thay Đổi</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function SettingChunkModal({ document, modalHandler = null }) {

  const [dataList, setDataList] = useState([])

  useEffect(() => {
    modalHandler.buffer && setDataList([modalHandler.buffer])
  }, [modalHandler.buffer])

  return (
    <React.Fragment>
      <Dialog
        open={modalHandler?.state}
        onClose={() => { modalHandler?.close(); setDataList([])}}>
        <DialogTitle sx = {{ color: theme => theme.palette.text.secondary, display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx = {{ width: '90vw', maxWidth: '600px', display: 'flex', alignItems: 'center', gap: 2}}>
             Chỉnh Sửa Đoạn Cắt
          </Box>
        </DialogTitle>
        <DialogContent sx = {{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {
            dataList && dataList.map((id) => (
              <TextField maxRows={4} multiline fullWidth
                value={document.getChunk(id)}
                onChange={(e) => document.setChunks(id, e.target.value)}
              placeholder='Nhập câu hỏi bạn muốn'
            />
            ))
          }
        </DialogContent>
        <DialogActions>

          <Button onClick={() => {
            const id = CreateID()
            document.addChunk(dataList[dataList.length - 1], {
              id: id,
              chunk: ''
            }),
            setDataList(prev => [...prev, id])
          }}
            sx = {{ color: theme => theme.palette.text.secondary }}>Thêm Đoạn Cắt</Button>

          <Button onClick={() => {
            document.removeChunks(dataList) 
            modalHandler?.close() 
            setDataList([])
          }}
            sx = {{ color: theme => theme.palette.text.secondary }}>Xóa Tất Cả</Button>

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


