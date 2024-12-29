import { Box, Breadcrumbs, Button, Chip, FormControl, IconButton, Input, InputLabel, Link, TextField, Tooltip, Typography } from '@mui/material'
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
          sx = {{ textAlign: 'justify', padding: '5px 0', height: '100%', paddingX: 1,
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
    }
  }, [])
 
  useEffect(() => {
    if(token) {
      const event = processHandler.add('#loadDocumentWithChunk')
      loadDocumentWithChunk(id, token).then((documentWithChunk) => { setDocumentWithChunk(documentWithChunk) })
      .catch((err) => console.error('Tải Thông Tin Tài Liệu (Chunks) Thất Bại !'))
      .finally(() =>  processHandler.remove('#loadDocumentWithChunk', event)) 

      const loadCollectionSchemaEvent = processHandler.add('#loadCollectionSchema')
      loadCollectionSchema(collection, token).then((schema) => setSchema(schema))
      .catch((err) => console.error("Tải Thông Tin Collections Schema Thất Bại !"))
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
    if(documentWithChunk?.state=='processed' || documentWithChunk?.state=='success'){
      noticeHandler.add({
        status: 'error',
        message: 'Cập Nhật Thất Bại, Tài Liệu Này Đã Được Xử Lý !'
      })
      return 
    }
    const UpdateDocumentEvent = processHandler.add('#UpdateDocument')
    await useDocument.update(new_data, token).then((document) => {
      setDocumentWithChunk(prev => ( {...document, chunks: prev.chunks, amount_chunking: prev.chunks.length}))
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
    if(documentWithChunk?.state=='processed' || documentWithChunk?.state=='success'){
      noticeHandler.add({
        status: 'warning',
        auto: false,
        message: 'Tài Liệu Này Đã Được Xử Lý !'
      })
      return 
    }
    const data = {
      id: id,
      chunks: documentWithChunk.chunks.map((data) => data.chunk)
    }
    const processDocumentEvent = processHandler.add('#processDocument')
    useDocument.process(data, token).then(
      (data) => {
        noticeHandler.add({
          status: 'success',
          message: 'Tài Liệu Đã Được Đưa Vào Hàng Đợi Xử Lý'
        })
        navigate(`/knowledge_bases/${collection}`)
      }
    )
    .catch(() => {
      noticeHandler.add({
        status: 'error',
        auto: false,
        message: 'Lỗi hàng Đợi, Vui Lòng Thử Lại Sau !'
      })
    })
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
          <Typography key="62756213" sx = {{ display: 'block', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> {documentWithChunk?.document_name} </Typography>
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

          <Button component="label" startIcon={<MemoryIcon />} color={'error'} onClick={ProcessButton} variant='contained'
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
          <ExternalWebsite name = {documentWithChunk?.document_name_in_storage} type = { documentWithChunk?.document_type} url = {documentWithChunk?.url}/>
        </Box>
      </Box>

      { openModalUpload && <SettingDocumentModal
        document = {{
          id: id,
          getMetadata: () => documentWithChunk?.metadata,
          state: documentWithChunk?.state,
          setMetadata: (value) => {
            if(documentWithChunk?.state != 'pending') return false
            setDocumentWithChunk(prev => {
              return { ...prev, metadata: { ...prev.metadata, ...value }} 
            })
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

  const [dataList, setDataList] = useState({})

  const handleSubmit = async (e) => {
    if(document?.state != 'pending') {
      setError_message('Tài Liệu Đã Hoặc Đang Được Xử Lý, Không Thể Thay Đổi !')
      return
    }

    const metadata = { ...document.getMetadata(), ...dataList}
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

  useEffect(() => {
    getSchema(modalHandler.buffer).forEach((data) => {
      if(data.value.type == 'list') {
        setDataList(prev => ({ ...prev, [data.key]: document.getMetadata()?.[data.key] }))
      }
    })
  }, [])

  return (
    <React.Fragment>
      <Dialog
        open={modalHandler?.state}
        onClose={() => { modalHandler?.close(); setError_message('')} }>
        <DialogTitle sx = {{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx = {{ width: '90vw', maxWidth: '600px', display: 'flex', alignItems: 'center', gap: 2}}>
             Thông Tin Tài Liệu
          </Box>
        </DialogTitle>
        <DialogContent >
          <Box sx = {{ display: 'flex', flexWrap: "wrap",  paddingBottom: 1, gap: 2 }}>
            <FormControl variant="standard" sx = {{ width: '100%', color: 'inherit' }}>
              <InputLabel sx = {{  color: 'inherit !important' }}>Tên Tài Liệu</InputLabel>
              <Input id="Description" value={document.getName()} onChange={(e) => {
                if(e.target.value.length > 50){
                  setError_message('Trường Dữ Liệu Không được quá 50 kí tự')
                  return 
                }
                document.setName(e.target.value) 
              }}
                sx = {{  color: 'inherit', '&:before, &:after':{ borderBottom: `1px solid #fff` } }}/>
            </FormControl>

            <Grid container spacing={3} sx = {{ width: '100%' }}>
            {
              getSchema(modalHandler.buffer).map((data) => {

                const element_type = data.value?.element_type
                const type = data.value.type
                const required = data.value.required
                const name = data.key
                const max_size = data.value?.max_size

                const icon  = ( <Tooltip title={data.value.description} placement="top">
                    <IconButton aria-label="information" color='inherit'>
                      <HelpOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip> )

                if(type == 'list') {

                  const ChipList = <Box sx = {{ padding: 1, paddingRight: 2, display: 'flex', gap: 1, flexWrap: 'wrap', width: '700px', background: '#f0f8ff0f', borderRadius: '10px', marginBottom: 1, marginRight: 1 }}>
                    {dataList?.[name] && dataList[name].map((data) => {
                      return <Chip label={data} onDelete={() => {
                        setDataList(prev => ({
                          ...prev, [name] : prev[name].filter((dataInList) => dataInList != data) }) )
                      }} />
                    })}
                  </Box>

                  // document.getMetadata()?.[data.key] && setDataList(prev => ({ ...prev, [data.key]: document.getMetadata()?.[data.key] }))

                  return <>
                    <Grid size={12}>
                      <FormControl variant="standard" sx = {{ width: '100%', color: 'inherit' }}>
                        <InputLabel sx = {{  color: 'inherit !important' }}>{useCode(data.key)}</InputLabel>
                        <Input endAdornment = {data.value.description && icon} startAdornment = {dataList?.[name] && dataList?.[name] != [] && ChipList}
                          id="Description" 
                          // value={document.getMetadata()?.[data.key]} 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setDataList( prev => {
                                if(prev?.[name]) {
                                  if(max_size && prev?.[name].length < max_size && e.target.value != '')
                                    return {...prev, [name]: prev[name].concat(e.target.value)}
                                  setError_message(`Trường dữ liệu ${name} không được vượt quá ${max_size} hoặc bỏ trống`)
                                  return prev
                                }
                                return {...prev, [name]: [e.target.value]}
                              })
                              e.target.value = ''
                            }
                          }}
                          sx = {{ color: 'inherit', '&:before, &:after':{ borderBottom:`1px solid #fff` } }}/>
                      </FormControl>
                    </Grid>   
                  </>
                }

                if(type == 'int') {
                  return  <Grid size={6}>
                  <FormControl variant="standard" sx = {{ width: '100%', color: 'inherit' }}>
                    <InputLabel sx = {{  color: 'inherit !important' }}>{useCode(data.key)}</InputLabel>
                    <Input endAdornment = {data.value.description && icon}
                      id="Description" value={document.getMetadata()?.[data.key]} 
                      onChange={(e) => {
                        if(Number.isInteger(Number(e.target.value))) {
                          document.setMetadata({[data.key]: e.target.value})
                          return 
                        }
                        setError_message(`Trường dữ liệu ${name} phải có giá trị là số nguyên`)
                        e.target.value = document.getMetadata()?.[data.key] || ''
                      }}
                      sx = {{ color: 'inherit', '&:before, &:after':{ borderBottom:`1px solid #fff` } }}/>
                  </FormControl>
                </Grid> 
                }

                // String value
                return  <Grid size={6}>
                  <FormControl variant="standard" sx = {{ width: '100%', color: 'inherit' }}>
                    <InputLabel sx = {{  color: 'inherit !important' }}>{useCode(data.key)}</InputLabel>
                    <Input endAdornment = {data.value.description && icon}
                      id="Description" value={document.getMetadata()?.[data.key]} onChange={(e) => document.setMetadata({[data.key]: e.target.value}) }
                      sx = {{ color: 'inherit', '&:before, &:after':{ borderBottom:`1px solid #fff` } }}/>
                  </FormControl>
                </Grid>   
              })
            }
            </Grid>
          </Box>
        <Typography sx = {{ color: '#ff6262', fontWeight: '900' }}>{error_message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} sx = {{ color: '#fff' }}>Lưu Thay Đổi</Button>
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
        sx = {{ '& .MuiPaper-root': { width: '80vw',maxWidth: 'none !important' }}}
        open={modalHandler?.state}
        onClose={() => { modalHandler?.close(); setDataList([])}}>
        <DialogTitle sx = {{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx = {{ width: '90vw', maxWidth: '600px', display: 'flex', alignItems: 'center', gap: 2}}>
             Chỉnh Sửa Đoạn Cắt
          </Box>
        </DialogTitle>
        <DialogContent sx = {{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {
            dataList && dataList.map((id) => (
              <TextField maxRows={8} multiline fullWidth
                value={document.getChunk(id)}
                sx = {{ '& textarea': {color: '#fff'} }}
                onChange={(e) => document.setChunks(id, e.target.value)}
              placeholder='Nhập thay đổi'
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
          }} sx = {{ color: '#fff' }}>Thêm Đoạn Cắt</Button>

          <Button onClick={() => {
            document.removeChunks(dataList) 
            modalHandler?.close() 
            setDataList([])
          }}
            sx = {{ color: '#fff' }}>Xóa Tất Cả</Button>

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


