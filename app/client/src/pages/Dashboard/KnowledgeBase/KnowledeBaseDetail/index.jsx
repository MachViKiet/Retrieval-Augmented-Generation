import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MuiTable from '~/components/MuiTable/MuiTable';
import { renderStatus } from '~/components/MuiTable/cell-renderers/status';
import {renderControlledSwitches} from '~/components/MuiTable/cell-renderers/switch'
import { renderTableAction } from '~/components/MuiTable/MuiTableAction';
import { renderLink } from '~/components/MuiTable/cell-renderers/link';
import { Box, Breadcrumbs, Button, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCollection } from '~/apis/Collection';
import { useOutletContext } from "react-router-dom";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import { formatTime } from '~/utils/GetTime';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';

const useData = (documents) => {
  const { id } = useParams();

  function createData(id, name, chunkNumber, upload_date, updated_date, chunkMethod, enable, parsingStatus, action) {
    return { id, name, chunkNumber, upload_date, updated_date, chunkMethod, enable, parsingStatus, action };
  }

  if(!documents) return {rows: [], columns: [], loading : false}
  const rows = documents.map((document) => {
    const {_id, document_name, amount_chunking, created_at, updated_at, methods, isactive,state} = document
    return createData(_id, document_name, amount_chunking, formatTime(created_at), formatTime(updated_at), methods, isactive,state, ['discovery','rename', 'download', 'delete'] )
  })

  const condition = (params) => { return params.row.parsingStatus === 'processed' }
  const getLinkToDocument = (params) => { return `/knowledge_bases/${id}/${params.row.id}`}

  const columns = [
    { 
      field: 'name', headerName: 'Tên Tài Liệu', width: 240, 
      renderCell: (params) => {
        return renderLink({params: params, link: getLinkToDocument(params), condition: condition(params)})
      },
    },
    { 
      field: 'chunkNumber', headerName: 'Số Đoạn Cắt', width: 120,         
      renderCell: (params) => (
        <Typography sx = {{ width: '50%', textAlign: 'center', lineHeight: '34px' }}>{params.value}</Typography>) 
    },
    {
      field: 'chunkMethod', headerName: 'Phương Pháp Cắt Đoạn', width: 160,
      renderCell: renderStatus,
    },
    { 
      field: 'upload_date', headerName: 'Ngày Tạo', width: 150 
    },
    { 
      field: 'updated_date', headerName: 'Chỉnh Sửa Lần Cuối', width: 150 
    },
    {
      field: 'enable', headerName: 'Trạng Thái Hoạt Động', width: 160,  
      renderCell: renderControlledSwitches ,  
    },
    {
      field: 'parsingStatus', headerName: 'Trạng Thái Phân Tích', width: 180, type: 'singleSelect',
      renderCell: renderStatus
    },
    {
      field: 'action', headerName: 'Hành động', width: 120,
      renderCell: renderTableAction,
    }
  ];

  return {rows, columns, loading : false}
}

function Datasets() {
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)
  const [collectionWithDocuments, setCollectionWithDocuments] = useState(null)
  const [openModalUpload, setOpenModalUpload] = useState(false)

  const { processHandler, dashboard, subDashboard } = useOutletContext();

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức - Tài Liệu'
    dashboard.navigate.active(346)

    subDashboard.navigate.active(452)
    subDashboard.addActions( [
      { _id: 452, title: "Tập Dữ Liệu", icon: <DescriptionOutlinedIcon/>, link: "/knowledge_bases/" + id },
      { _id: 564, title: "Thử Nghiệm", icon: <BugReportOutlinedIcon/>, link: "/knowledge_bases/retrieval_testing/" + id },
      { _id: 893, title: "Cấu Hình", icon: <AdjustOutlinedIcon/>, link: "/knowledge_bases/configuration/" + id }]
    )
    
    return () => ( 
      dashboard.navigate.active('#'),
      subDashboard.navigate.active('#')
    )
  }, [])

  const { id } = useParams();

  const loadDocumentByCollectionID = async (collection_id, token) => {
    return useCollection.getDocumentInCollection(collection_id, token).then((document) => document )
  }

  const loadCollectionSchema = async (collection_id, token) => {
    return useCollection.getCollectionSchema(collection_id, token).then((document) => document )
  }

  useEffect(() => {
    if(token){
      const loadCollectionWithDocument = processHandler.add('#loadCollectionWithDocument')
      loadDocumentByCollectionID(id, token).then((collectionWithDocuments) => {
        setCollectionWithDocuments(collectionWithDocuments)
        subDashboard.addTitle(collectionWithDocuments.collection_name)
        processHandler.remove('#loadCollectionWithDocument', loadCollectionWithDocument)


        const loadCollectionSchemaEvent = processHandler.add('#loadCollectionSchema')
        loadCollectionSchema(collectionWithDocuments?.id, token).then((schema) => {
          console.log('schema: ', schema)
        }).catch((err) => console.log(err))
        .finally(()=> processHandler.remove('#loadCollectionSchema', loadCollectionSchemaEvent))


      }).catch((err) => console.log(err))
      .finally(()=> processHandler.remove('#loadCollectionSchema', loadCollectionWithDocument))

    }
  }, [token])

  return (
    <>
      <Box sx ={{ width: '100%', height: 'auto', marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" key="2657812" color="inherit"
            onClick = {(e) => {
              e.preventDefault()
              console.log('fasdfasd')
              navigate('/knowledge_bases')
            }} 
            sx = {{  display: 'flex', gap: 1, alignItems: 'center' }}>
            <TopicOutlinedIcon/> 
          </Link>,
          <Typography key={id}>
            {collectionWithDocuments?.collection_name || 'Không có tên kho dữ liệu' }
          </Typography>,
        </Breadcrumbs>
        
        <Box>
          <Button startIcon = {<AddIcon/>} component="label" role={undefined} tabIndex={-1}
            // onClick={() => setOpenModalUpload(true)}
            sx = {{ color: '#fff', background: theme=> theme.palette.primary.main ,paddingX:2,paddingY: 1,boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',borderRadius: '10px' }} >
              Thêm Tài Liệu
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ maxHeight: 'calc(100vh - 130px)', height: '100%',  width: '100%', background: 'transparent' }}>
        <MuiTable useData = {useData(collectionWithDocuments?.documents)}/>
      </Box>

      <UploadModal
        modalHandler = {{
          state: openModalUpload,
          close: () => setOpenModalUpload(false),
          submitTitle: 'Lưu'
        }} />
    </>
  )
}

export default Datasets

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InputFileUpload, { VisuallyHiddenInput } from '~/components/Mui/InputFileUpload';

function UploadModal({ modalHandler = null }) {

  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [notice, setNotice] = useState(null)

  const { processHandler } = useOutletContext();

  useEffect(() => {
    setName('')
    setDescription('')
    setNotice(null)
  },[])

  return (
    <React.Fragment>
      <Dialog
        open={modalHandler?.state}
        onClose={modalHandler?.close}>
        <DialogTitle sx = {{ color: theme => theme.palette.text.secondary, display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx = {{ width: '50vw', maxWidth: '450px', display: 'flex', alignItems: 'center', gap: 2}}>
            <CloudUploadOutlinedIcon/> Upload Tài Liệu
          </Box>
        </DialogTitle>
        <DialogContent >
          {/* <DialogContentText sx = {{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
          </DialogContentText> */}
          <InputFileUpload/>


        </DialogContent>
        <DialogActions>
          <Button sx = {{ color: theme => theme.palette.text.secondary }}>{modalHandler.submitTitle}</Button>
          {/* <Button sx = {{ color: '#ff3c3c' }} onClick={modalHandler?.close}>Đóng</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
