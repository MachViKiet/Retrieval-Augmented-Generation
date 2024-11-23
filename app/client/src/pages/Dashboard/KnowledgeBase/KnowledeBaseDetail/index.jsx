import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InputFileUpload, { VisuallyHiddenInput } from '~/components/Mui/InputFileUpload';
import { useDocument } from '~/apis/Document';

const useData = (documents) => {
  const { id } = useParams();

  function createData(id, name, chunkNumber, upload_date, updated_date, chunkMethod, enable, parsingStatus, action) {
    return { id, name, chunkNumber, upload_date, updated_date, chunkMethod, enable, parsingStatus, action };
  }

  if(!documents) return {rows: [], columns: [], loading : false}
  const rows = documents.map((document) => {
    const {_id, document_name, amount_chunking, createdAt, updatedAt, methods, isactive,state} = document
    return createData(_id, document_name, amount_chunking, formatTime(createdAt), formatTime(updatedAt), methods, isactive,state, ['delete'] )
  })

  // const condition = (params) => { return params.row.parsingStatus === 'processed' }
  const condition = () => true
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
      field: 'parsingStatus', headerName: 'Trạng Thái Phân Tích', width: 180, type: 'singleSelect',
      renderCell: renderStatus
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
      field: 'chunkMethod', headerName: 'Phương Pháp Cắt Đoạn', width: 160,
      renderCell: renderStatus,
    },
    {
      field: 'action', headerName: '', width: 40,
      renderCell: renderTableAction
    }
  ];

  return {rows, columns, loading : false}
}

function Datasets() {
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)
  const [collectionWithDocuments, setCollectionWithDocuments] = useState(null)

  const { processHandler, noticeHandler, dashboard, subDashboard } = useOutletContext();

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

  useEffect(() => {
    if(token && !collectionWithDocuments ){
      const loadCollectionWithDocument = processHandler.add('#loadCollectionWithDocument')
      loadDocumentByCollectionID(id, token).then((collectionWithDocuments) => {
        setCollectionWithDocuments(collectionWithDocuments)
        subDashboard.addTitle(collectionWithDocuments.collection_name)        
      }).catch((err) => console.log(err))
      .finally(()=> processHandler.remove('#loadCollectionWithDocument', loadCollectionWithDocument))

    }
  }, [token])

  const uploadFileHandler = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('collection', id)
    formData.append('filename', encodeURI((e.target.files[0].name)))

    const uploadFileEvent = processHandler.add('#uploadFile')
    useDocument.uploadFile(formData, token).then((newDocument) => {
      setCollectionWithDocuments(prev => ({ ...prev, documents: [newDocument.document, ...prev.documents ] }))
      noticeHandler.add({ status: 'success', message: 'Thêm tài liệu thành công' })
    }).catch((err) => noticeHandler.add({ status: 'error', message: err }))
    .finally(() => processHandler.remove('#uploadFile', uploadFileEvent))
  }

  return (
    <>
      <Box sx ={{ width: '100%', height: 'auto', marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" key="2657812" color="inherit"
            onClick = {(e) => {
              e.preventDefault()
              navigate('/knowledge_bases')
            }} 
            sx = {{  display: 'flex', gap: 1, alignItems: 'center' }}>
            <TopicOutlinedIcon sx = {{ color: theme => theme.palette.text.secondary }}/> 
          </Link>,
          <Typography key={id}>
            {collectionWithDocuments?.collection_name || 'Không có tên kho dữ liệu' }
          </Typography>,
        </Breadcrumbs>
        
        <Box>
          <Button startIcon = {<AddIcon/>} component="label" role={undefined} tabIndex={-1}
            sx = {{ color: '#fff', background: theme=> theme.palette.primary.main ,paddingX:2,paddingY: 1,boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',borderRadius: '10px' }} >
              Thêm Tài Liệu
              <VisuallyHiddenInput
                type="file"
                onChange={uploadFileHandler}
              />
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ maxHeight: 'calc(100vh - 130px)', height: '100%',  width: '100%', background: 'transparent' }}>
        <MuiTable useData = {useData(collectionWithDocuments?.documents)}/>
      </Box>
    </>
  )
}

export default Datasets