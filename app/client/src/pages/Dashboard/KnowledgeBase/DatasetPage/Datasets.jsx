import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate_subnav, navigate as sidebarAction } from '~/store/actions/navigateActions'
import MuiTable from '~/components/MuiTable/MuiTable';
import { renderStatus } from '~/components/MuiTable/cell-renderers/status';
import {renderControlledSwitches} from '~/components/MuiTable/cell-renderers/switch'
import { renderTableAction } from '~/components/MuiTable/MuiTableAction';
import { renderLink } from '~/components/MuiTable/cell-renderers/link';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';

const DIRECTION = '/knowledge_bases/student_handbook/dataset'

function Datasets() {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);

  const useData = () => {

    function createData(id,name, chunkNumber, upload_date, chunkMethod, enable, parsingStatus, action) {
      return { id,name, chunkNumber, upload_date, chunkMethod, enable, parsingStatus, action };
    }

    const rows = [
      createData(Math.floor(10000000 + Math.random() * 90000000),'Giới thiệu Khoa.pdf', 33, '01/08/2024 15:50:33', 'Cơ Bản', false, 'Processing', ['discovery','rename', 'download', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),'Quy Định Và Chính Sách.pdf', 534, '02/08/2024 15:50:33', 'Cơ Bản', true,'Completed', ['discovery','rename', 'download', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),'Lịch Học Và Lịch Thi.pdf', 213, '02/08/2024 15:50:33', 'Cơ Bản', false,'Processing', ['discovery','rename', 'download', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),'Hệ Thống Hỗ Trợ Sinh Viên.pdf', 22, '02/07/2024 15:50:33', 'Cơ Bản', true,'Completed', ['discovery','rename', 'download', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),'Hoạt Động Ngoại Khóa.pdf', 455, '02/01/2024 15:50:33', 'Cơ Bản', false,'Processing', ['discovery','rename', 'download', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),'Thông Tin Liên Hệ.pdf', 11, '02/08/2023 15:50:33', 'Cơ Bản', false,'Rejected', ['discovery','rename', 'download', 'delete']),
    ];

    const columns = [
      { 
        field: 'name', 
        headerName: 'Tên Tài Liệu', 
        width: 240, 
        renderCell: (params) => {
          const condition = () => {
            return params.row.parsingStatus == 'Completed'
          }

          return renderLink({params: params, DIRECTION: DIRECTION,  condition: condition()})
        },
      },
      { field: 'chunkNumber', headerName: 'Số Chunk', width: 120 },
      { field: 'upload_date', headerName: 'Ngày Tạo', width: 150 },
      {
        field: 'chunkMethod',
        headerName: 'Phương Pháp Chunking',
        width: 160,
      },
      {
        field: 'enable',
        headerName: 'Trạng Thái Hoạt Động',
        width: 160,  
        renderCell: renderControlledSwitches ,  
      },
      {
        field: 'parsingStatus',
        headerName: 'Trạng Thái Phân Tích',
        width: 180,
        renderCell: renderStatus,    
        type: 'singleSelect',
      },
      {
        field: 'action',
        headerName: '-',
        width: 120,
        renderCell: renderTableAction,
      }
    ];

    return {rows, columns}
  }

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức'
    dispatch(sidebarAction({index: 346}))
    dispatch(navigate_subnav({index: 452, openSubSidebar : false}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  return (
    <>
      <Box sx ={{ 
        width: '100%',
        height: 'auto',
        marginBottom: 2,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center'
      }}>
        <Button sx = {{ 
          color: '#fff', 
          background: theme => "#404c7a",
          paddingX:2,
          paddingY: 1,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px'
        }} startIcon = {<AddIcon/>}>Thêm Tài Liệu</Button>
      </Box>
    <Box sx={{ 
        maxHeight: 'calc(100vh - 130px)',
        height: '100%', 
        width: '100%',
        background: 'transparent'
      }}>
      <MuiTable useData = {useData()}/>
      </Box>
    </>
  )
}

export default Datasets
