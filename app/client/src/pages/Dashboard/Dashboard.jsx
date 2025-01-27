import { Box, Button, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Block as CustomBlock } from '~/components/Mui/Block';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Grid from '@mui/material/Grid2';
import { useProfile } from '~/apis/Profile';

export function Dashboard() {
  const {processHandler, dashboard } = useOutletContext();
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    document.title = 'Chatbot - Trang Chủ';
    dashboard.navigate.active(234)

    return () => ( dashboard.navigate.active('#') )
  }, [])

  useEffect(() => {
    useProfile.getDashboard(token).then((dataAPI) => {
      // setData(dataAPI)
    })
  }, [token])


  const ChatGPTStatic = {
    series: [{
      data: [0, 2713 + 888, 0, 13919+4950+1152, 3681+487, 9805+4185, 27134+7508+2048, 16832+3709, 7918+1272, 17833+2499, 19197+1950],
      label: 'Số lượt truy cập theo tháng',
      yAxisId: 'leftAxisId'
    },
    {
      data: [0, 8, 0, 30, 4, 19, 48, 15, 11, 17, 26],
      label: 'Số lượt hỏi đáp theo tháng',
      yAxisId: 'rightAxisId'
    }],
    yAxis: [{ id: 'leftAxisId' }, { id: 'rightAxisId' }],
    rightAxis: "rightAxisId",
    xAxis: [{ scaleType: 'point', data: [
      '15/1',
      '16/1',
      '17/1',
      '18/1',
      '19/1',
      '20/1',
      '21/1',
      '22/1',
      '23/1',
      '24/1',
      '25/1'
    ] }]
  }


  const CTDT_PieChart = {
    series: [
      {
        outerRadius: 80,
        data: [
          { label: 'Hệ Thống Thông Tin', value: 12, color: '#1E3A8A' },
          { label: 'Khoa Học Máy Tính', value: 5, color: '#3B82F6' },
          { label: 'Mạng Máy Tính', value: 1, color: '#60A5FA' },
          { label: 'Kỹ Thuật Phần Mềm', value: 10, color: '#93C5FD' },
          { label: 'Thị Giác Máy Tính', value: 2, color: '#D1E7FF' },
          { label: 'Công Nghệ Thông Tin', value: 30, color: '#B0B0B0' }
        ],
        highlightScope: { fade: 'global', highlight: 'item' },
        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        arcLabel: (params) => {
          const data = [
            { label: 'Hệ Thống Thông Tin', value: 12, color: '#1E3A8A' },
            { label: 'Khoa Học Máy Tính', value: 5, color: '#3B82F6' },
            { label: 'Mạng Máy Tính', value: 1, color: '#60A5FA' },
            { label: 'Kỹ Thuật Phần Mềm', value: 10, color: '#93C5FD' },
            { label: 'Thị Giác Máy Tính', value: 2, color: '#D1E7FF' },
            { label: 'Công Nghệ Thông Tin', value: 30, color: '#B0B0B0' }
          ]
          const percent = params.value / data.map((item) => item.value).reduce((a, b) => a + b, 0);;
          if(percent * 100 < 10) return '' 
          return `${(percent * 100).toFixed(0)}%`;
        }
      },
    ]
  }

  const KDT_PieChart = {
    series: [
      {
        outerRadius: 80,
        data: [
          { label: 'K20', value: 1, color: '#1E3A8A' },
          { label: 'K21', value: 30, color: '#3B82F6' },
          { label: 'K22', value: 10, color: '#60A5FA' },
          { label: 'K23', value: 10, color: '#93C5FD' },
          { label: 'K24', value: 2, color: '#D1E7FF' },
          { label: 'Không Có Thông Tin', value: 53, color: '#B0B0B0' }
        ],
        highlightScope: { fade: 'global', highlight: 'item' },
        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        arcLabel: (params) => {
          const data = [
            { label: 'K20', value: 1, color: '#1E3A8A' },
            { label: 'K21', value: 30, color: '#3B82F6' },
            { label: 'K22', value: 10, color: '#60A5FA' },
            { label: 'K23', value: 10, color: '#93C5FD' },
            { label: 'K24', value: 2, color: '#D1E7FF' },
            { label: 'Không Có Thông Tin', value: 53, color: '#B0B0B0' }
          ]
          const percent = params.value / data.map((item) => item.value).reduce((a, b) => a + b, 0);;
          if(percent * 100 < 15) return '' 
          return `${(percent * 100).toFixed(0)}%`;
        }
      },
    ]
  }

  const GT_PieChart = {
    series: [
      {
        outerRadius: 80,
        data: [
          { label: 'Nam', value: 12, color: '#1E3A8A' },
          { label: 'Nữ', value: 5, color: '#3B82F6' },
          { label: 'Không có thông tin', value: 17, color: '#B0B0B0' },
        ],
        highlightScope: { fade: 'global', highlight: 'item' },
        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        arcLabel: (params) => {
          const data = [
            { label: 'Nam', value: 12, color: '#1E3A8A' },
            { label: 'Nữ', value: 5, color: '#3B82F6' },
            { label: 'Không có thông tin', value: 17, color: '#B0B0B0' },
          ]
          const percent = params.value / data.map((item) => item.value).reduce((a, b) => a + b, 0);;
          if(percent * 100 < 10) return '' 
          return `${(percent * 100).toFixed(0)}%`;
        }
      },
    ]
  }

  return (
    // <Hidden></Hidden>
    <CustomBlock sx ={{ width: '100%', boxShadow: 'none', border: 'none', background: 'transparent', overflowX: 'hidden'}}>
      <Box sx = {{ display: 'flex', gap: 1, alignItems:'center', paddingBottom: 2 }}>
        <DashboardIcon fontSize='large' sx = {{ color: theme => theme.palette.mode == 'dark' ? '#fff' : theme.palette.primary.main }}/>
        <Typography variant='h1' sx = {{ userSelect: 'none', '&:hover': { cursor: 'pointer' }, fontSize: '2rem', fontFamily: 'Roboto', fontWeight: '900', width: 'fit-content', color: theme => theme.palette.mode == 'dark' ? '#fff' : theme.palette.primary.main }}>
          Dashboard </Typography>
      </Box>

    <Grid container spacing={2} direction="row"
      sx={{ justifyContent: "center", alignItems: "start" }}>
      {/* block 1 */}
      <Grid size={7}>
        <Box sx = {{ position: 'relative', background: theme => theme.palette.mode == 'dark' ? '#4c5486f2' : '#005181', borderRadius: '10px', height: '310px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', width: '100%'}}>
          <Box sx = {{ display: 'flex', gap: 1, justifyContent: 'space-between', borderRadius: '10px 10px 0 0' }}>
            <Box sx = {{ '& > div': { width: '100%', display: 'flex', justifyContent: 'center' }, flex: '1 1 100%', height: '270px', background: '#eaf5ff', borderRadius: '10px 10px 0 0', paddingTop: 2 }}>
              <Typography variant = 'h6' color= '#000'>Hệ thống hỏi đáp dữ liệu nội bộ</Typography>
              <BasicLineChart/>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid size={5}>
        <Grid container spacing={2} direction="column">
          {/* block 2 */}
          <Grid size={12}>
            <Box sx = {{ position: 'relative', background: '#eaf5ff', borderRadius: '10px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', 
              height: '150px', width: '100%'}}>
              <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
                <Typography variant = 'h6' color= '#000'>Số chủ đề trong hệ thống</Typography>
              </Box>
              <Box sx = {{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingX: 2  }}>
                <Box>
                  <Typography variant='h5' sx = {{ color: '#000' }}>6</Typography>
                  <Typography variant='body1' sx = {{ color: '#000' }}>Chủ Đề ( Mặc Định )</Typography>
                </Box>
                <Box sx = {{ width: '2px', height: '70px', background: '#5d5d5d6b' }}></Box>
                <Box>
                  <Typography variant='h5' sx = {{ color: '#000' }}>0</Typography>
                  <Typography variant='body1' sx = {{ color: '#000' }}>Chủ Đề ( Tạo Mới )</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={12}>
            <Box sx = {{ position: 'relative', background: '#eaf5ff', borderRadius: '10px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', 
              height: '150px', width: '100%'}}>
              <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
                <Typography variant = 'h6' color= '#000'>Số tài liệu trong hệ thống</Typography>
              </Box>
              <Box sx = {{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingX: 2  }}>
                <Box>
                  <Typography variant='h5' sx = {{ color: '#000' }}>778</Typography>
                  <Typography variant='body1' sx = {{ color: '#000' }}>Tài Liệu ( Mặc Định )</Typography>
                </Box>
                <Box sx = {{ width: '2px', height: '70px', background: '#5d5d5d6b' }}></Box>
                <Box>
                  <Typography variant='h5' sx = {{ color: '#000' }}>4</Typography>
                  <Typography variant='body1' sx = {{ color: '#000' }}>Tài Liệu ( Được Tải Lên )</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={8}>
        <Box sx={{ height: '280px',  width: '100%', background: theme => theme.palette.mode == 'dark' ? '#041d34' : '#eaf5ff', borderRadius: '10px' }}>
          <MuiTable useData = {useData([])}/>
        </Box>
      </Grid>

      <Grid size={4}>
        <Box sx = {{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', background: '#eaf5ff', borderRadius: '10px', height: '280px', width: 'fit-content', maxWidth: '100%' }}>
          <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
            <Typography variant = 'h6' color= '#000'>Đánh Giá Trò Chuyện</Typography>
          </Box>
          <PieChartWithCustomizedLabel/>
        </Box>
      </Grid>


      <Grid size={3}>
        <Box sx = {{ position: 'relative', background: '#eaf5ff', borderRadius: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', 
            height: '120px', width: '100%'}}>
          <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
            <Box sx = {{ paddingTop: 0, paddingBottom: 0 }}>
              <Typography variant = 'h6' color= '#000'>Tokens Yêu Cầu</Typography>
            </Box>
            <Box>
              <Typography variant='h5' sx = {{ color: '#000' }}>102.190</Typography>
              <Typography variant='body1' sx = {{ color: '#000' }}>Tokens ( Input )</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid size={3}>
        <Box sx = {{ position: 'relative', background: '#eaf5ff', borderRadius: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', 
            height: '120px', width: '100%'}}>
          <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
            <Box sx = {{ paddingTop: 0, paddingBottom: 0 }}>
              <Typography variant = 'h6' color= '#000'>Tokens Phản Hồi</Typography>
            </Box>
            <Box>
              <Typography variant='h5' sx = {{ color: '#000' }}>27.449</Typography>
              <Typography variant='body1' sx = {{ color: '#000' }}>Tokens ( Output )</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid size={3}>
        <Box sx = {{ position: 'relative', background: '#eaf5ff', borderRadius: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', 
            height: '120px', width: '100%'}}>
          <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
            <Box sx = {{ paddingTop: 0, paddingBottom: 0 }}>
              <Typography variant = 'h6' color= '#000'>Tokens Lưu Trữ</Typography>
            </Box>
            <Box>
              <Typography variant='h5' sx = {{ color: '#000' }}>3.200</Typography>
              <Typography variant='body1' sx = {{ color: '#000' }}>Tokens ( Cached )</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid size={3}>
        <Box sx = {{ position: 'relative', background: '#eaf5ff', borderRadius: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', 
            height: '120px', width: '100%'}}>
          <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
            <Box sx = {{ paddingTop: 0, paddingBottom: 0 }}>
              <Typography variant = 'h6' color= '#000'>Tổng Số Requests</Typography>
            </Box>
            <Box>
              <Typography variant='h5' sx = {{ color: '#000' }}>178</Typography>
              <Typography variant='body1' sx = {{ color: '#000' }}>Lượt Truy Cập</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box sx = {{ '&>div': { width: '100%', display: 'flex', justifyContent: 'center' }, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', background: '#eaf5ff', borderRadius: '10px', height: 'auto', width: '100%', paddingTop: 2 }}>
          <Typography variant = 'h6' color= '#000'>Tổng Số Tokens Được Sử Dụng</Typography>
          <BasicLineChart width={900} height = {300} data = {ChatGPTStatic}/>
        </Box>
      </Grid>



      <Grid size={4}>
        <Box sx = {{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', background: '#eaf5ff', borderRadius: '10px', height: '280px', width: 'fit-content', maxWidth: '100%' }}>
          <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
            <Typography variant = 'h6' color= '#000'>Thống kê theo c.t đào tạo</Typography>
          </Box>
          <PieChartWithCustomizedLabel data = {CTDT_PieChart}/>
        </Box>
      </Grid>
      <Grid size={4}>
        <Box sx = {{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', background: '#eaf5ff', borderRadius: '10px', height: '280px', width: 'fit-content', maxWidth: '100%' }}>
          <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
            <Typography variant = 'h6' color= '#000'>Thống kê theo khóa đào tạo</Typography>
          </Box>
          <PieChartWithCustomizedLabel data = {KDT_PieChart}/>
        </Box>
      </Grid>
      <Grid size={4}>
        <Box sx = {{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', background: '#eaf5ff', borderRadius: '10px', height: '280px', width: 'fit-content', maxWidth: '100%' }}>
          <Box sx = {{ paddingTop: 2, paddingBottom: 1 }}>
            <Typography variant = 'h6' color= '#000'>Thống kê theo giới tính</Typography>
          </Box>
          <PieChartWithCustomizedLabel data = {GT_PieChart}/>
        </Box>
      </Grid>

      <Grid size={4.5} offset={0}>
        <Box sx = {{ paddingY: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', background: '#eaf5ff', borderRadius: '10px', height: '100%', width: '100%', maxWidth: '100%' }}>
          <Box sx = {{ paddingBottom: 1, paddingX: 2 }}>
            <Typography variant = 'h6' color= '#000' sx = {{ fontSize: '1rem', paddingBottom: 1 }}>Chủ đề nổi bật nhất</Typography>
            <Box sx = {{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx= {{ textAlign: 'start' }} variant = 'body1' color= '#000'>1. Nội Quy Trường Học</Typography>
              <Box sx = {{ display: 'flex', alignItems: 'center' }}>
                <GroupOutlinedIcon sx = {{ color: 'green', fontSize: '20px', marginRight: 1 }}/>
                <Typography sx= {{ textAlign: 'start' }} variant = 'body1' color= 'green'>3450 lượt truy cập</Typography>
              </Box>
            </Box>
            <Box sx = {{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx= {{ textAlign: 'start' }} variant = 'body1' color= '#000'>2. Thông Tin Học Bổng</Typography>
              <Box sx = {{ display: 'flex', alignItems: 'center' }}>
                <GroupOutlinedIcon sx = {{ color: 'green', fontSize: '20px', marginRight: 1 }}/>
                <Typography sx= {{ textAlign: 'start' }} variant = 'body1' color= 'green'>3450 lượt truy cập</Typography>
              </Box>
            </Box>
            <Box sx = {{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx= {{ textAlign: 'start' }} variant = 'body1' color= '#000'>3. Thông Báo Giáo Vụ</Typography>
              <Box sx = {{ display: 'flex', alignItems: 'center' }}>
                <GroupOutlinedIcon sx = {{ color: 'green', fontSize: '20px', marginRight: 1 }}/>
                <Typography sx= {{ textAlign: 'start' }} variant = 'body1' color= 'green'>3450 lượt truy cập</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid size={3.75} offset={0} sx= {{ alignItems: 'start' }}>
        <Box sx = {{ padding: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', background: '#eaf5ff', borderRadius: '10px', width: '100%', maxWidth: '100%' }}>
          <Box sx = {{ paddingBottom: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant = 'h6' color= '#000' sx ={{ textAlign: 'start', fontSize: '1rem', paddingLeft: 2 }}>Câu hỏi phổ biến trong tháng</Typography>
            <Box sx = {{ display: 'flex', alignItems: 'center', alignItems: 'center', width: '100%' }}>
              {/* <LooksOneOutlinedIcon sx = {{ fontSize: '1.725rem', marginRight: '0.325rem' }}/> */}
              <Button variant = 'body1' color= '#000' sx = {{ textAlign: 'start', fontWeight: '400' }}>1. Tôi có thể tra cứu điểm và bảng điểm ở đâu?</Button>
            </Box>
            <Box sx = {{ display: 'flex', alignItems: 'center', alignItems: 'center', width: '100%' }}>
              {/* <LooksOneOutlinedIcon sx = {{ fontSize: '1.725rem', marginRight: '0.325rem' }}/> */}
              <Button variant = 'body1' color= '#000' sx = {{ textAlign: 'start', fontWeight: '400' }}>2. Sinh viên bao nhiêu điểm đủ điều kiện đạt học lực Giỏi, Khá ?</Button>
            </Box>
            <Box sx = {{ display: 'flex', alignItems: 'center', alignItems: 'center', width: '100%' }}>
              {/* <LooksOneOutlinedIcon sx = {{ fontSize: '1.725rem', marginRight: '0.325rem' }}/> */}
              <Button variant = 'body1' color= '#000' sx = {{ textAlign: 'start', fontWeight: '400' }}>3. Điều kiện nhận học bổng khuyến học năm 2024 là gì?</Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid size={3.75} offset={0} sx= {{ alignItems: 'start' }}>
        <Box sx = {{ padding: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 4px -2px 2px rgba(0, 0, 0, 0.1)', background: '#eaf5ff', borderRadius: '10px', width: '100%', maxWidth: '100%' }}>
          <Box sx = {{ paddingBottom: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant = 'h6' color= '#000' sx ={{ textAlign: 'start', fontSize: '1rem', paddingLeft: 2 }}>Câu hỏi phổ biến trong năm</Typography>
            <Box sx = {{ display: 'flex', alignItems: 'center', alignItems: 'center', width: '100%' }}>
              {/* <LooksOneOutlinedIcon sx = {{ fontSize: '1.725rem', marginRight: '0.325rem' }}/> */}
              <Button variant = 'body1' color= '#000' sx = {{ textAlign: 'start', fontWeight: '400' }}>1. Tôi có thể tra cứu điểm và bảng điểm ở đâu?</Button>
            </Box>
            <Box sx = {{ display: 'flex', alignItems: 'center', alignItems: 'center', width: '100%' }}>
              {/* <LooksOneOutlinedIcon sx = {{ fontSize: '1.725rem', marginRight: '0.325rem' }}/> */}
              <Button variant = 'body1' color= '#000' sx = {{ textAlign: 'start', fontWeight: '400' }}>2. Sinh viên bao nhiêu điểm đủ điều kiện đạt học lực Giỏi, Khá ?</Button>
            </Box>
            <Box sx = {{ display: 'flex', alignItems: 'center', alignItems: 'center', width: '100%' }}>
              {/* <LooksOneOutlinedIcon sx = {{ fontSize: '1.725rem', marginRight: '0.325rem' }}/> */}
              <Button variant = 'body1' color= '#000' sx = {{ textAlign: 'start', fontWeight: '400' }}>3. Điều kiện nhận học bổng khuyến học năm 2024 là gì?</Button>
            </Box>
          </Box>
        </Box>
      </Grid>

    </Grid>




    </CustomBlock>
  )
}

export default Dashboard

const useData = (documents) => {
  const { id } = '421524';

  function createData(id = Math.floor(Math.random() * 72658721) , name= null, chunkNumber= null, upload_date= null, updated_date= null, chunkMethod= null, enable= null, parsingStatus= null, action= null) {
    return { id, name, chunkNumber, upload_date, updated_date, chunkMethod, enable, parsingStatus, action };
  }

  if(!documents) return {rows: [], columns: [], loading : false}
  const rows = Array.isArray(documents) && documents.map((document) => {
    let _id, document_name, amount_chunking, created_at, createdAt, updated_at, updatedAt, methods, isactive,state
    try {
      ( {_id, document_name, amount_chunking, created_at, createdAt, updated_at, updatedAt, methods, isactive,state} = document )
    } catch (error) {
      console.error('Có lỗi Xảy Ra Khi Đọc Tài Liệu')      
    }
    return createData(_id, document_name, amount_chunking, formatTime(created_at ? created_at : createdAt), formatTime(updated_at ? updated_at : updatedAt), methods, isactive,state, ['delete'] )
  })

  const columns = [
    { 
      field: 'id', headerName: 'ID', width: 50,
      renderCell: (params) => params.row.id + 1
    },
    { 
      field: 'name', headerName: 'Thời Gian Bắt Đầu', width: 120,         
      renderCell: (params) => (
        <Typography sx = {{ width: '50%', textAlign: 'center', lineHeight: '34px' }}>{params.value}</Typography>) 
    },
    { 
      field: 'email', headerName: 'Thời Gian Kết Thúc', width: 150 
    },
    { 
      field: 'phone', headerName: 'Input Tokens', width: 150 
    },
    { 
      field: 'major', headerName: 'Output Tokens', width: 150 
    },
    { 
      field: 'session_number', headerName: 'Input Cached Tokens', width: 150 
    },
    { 
      field: 'createdAt', headerName: 'Số Lượt Requests', width: 150 
    }
  ];

  return {rows, columns, loading : false}
}



import { LineChart } from '@mui/x-charts/LineChart';

const MockData_LineChart = {
  series: [
    {
      data: [0, 1, 5, 40, 60, 70],
      label: 'Số lượt truy cập theo tháng'
    },
    {
      data: [0, 10, 10, 90, 130, 190],
      label: 'Số lượt hỏi đáp theo tháng'
    }
  ],
  yAxis: [{ id: 'leftAxisId' }, { id: 'rightAxisId' }],
  rightAxis: null,
  xAxis: [{ scaleType: 'point', data: [
    'Tháng 9/2024',
    'Tháng 10/2024',
    'Tháng 11/2024',
    'Tháng 12/2024',
    'Tháng 1/2025',
    'Tháng 2/2025',
    'Tháng 3/2025'
  ] }]
}

export function BasicLineChart({width = 550, height = 230, data = MockData_LineChart}) {
  return (
    <LineChart
      sx = {{ '--mui-palette-text-primary' : '#000' }}
          width={width}
          height={height}
          series={data.series}
          xAxis={data?.xAxis}
          yAxis={data?.yAxis}
          rightAxis="rightAxisId"
          />
      );
}





import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const MockData_PieChart = {
  series: [
    {
      outerRadius: 80,
      data: [
        { label: 'Rất hài lòng', value: 10, color: '#1E3A8A' },
        { label: 'Hài Lòng', value: 4, color: '#3B82F6' },
        { label: 'Tạm Chấp Nhận', value: 1, color: '#60A5FA' },
        { label: 'Không Hài Lòng', value: 2, color: '#93C5FD' },
        { label: 'Rất Tệ', value: 2, color: '#D1E7FF' },
        { label: 'Không có phản hồi', value: 30, color: '#B0B0B0' },
      ],
      highlightScope: { fade: 'global', highlight: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      arcLabel: (params) => {
        const data = [
          { label: 'Rất hài lòng', value: 10, color: '#1E3A8A' },
          { label: 'Hài Lòng', value: 4, color: '#3B82F6' },
          { label: 'Tạm Chấp Nhận', value: 1, color: '#60A5FA' },
          { label: 'Không Hài Lòng', value: 2, color: '#93C5FD' },
          { label: 'Rất Tệ', value: 2, color: '#D1E7FF' },
          { label: 'Không có phản hồi', value: 30, color: '#B0B0B0' },
        ]
        const percent = params.value / data.map((item) => item.value).reduce((a, b) => a + b, 0);;
        if(percent * 100 < 10) return '' 
        return `${(percent * 100).toFixed(0)}%`;
      }
    },
  ]
}

const sizing = {
  // margin: { right: 5 },
  width: 400,
  height: 200,
  legend: { hidden: true },
};

export function PieChartWithCustomizedLabel({data = MockData_PieChart}) {
  return (
    <PieChart
      series = {data.series}
      sx={{
        '& text': {
          fontSize: '0.825rem !important'
        },
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 12,
        },
      }}
      {...sizing}
    />
  );
}


import { BarChart } from '@mui/x-charts/BarChart';
import MuiTable from '~/components/MuiTable/MuiTable';

const uData = [3681, 459285, 2000, 2780, 1890, 2390, 3490];
const xData = [487, 13492, 9800, 3908, 4800, 3800, 4300];
const aLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export function StackedBarChart() {
  return (
    <BarChart
    sx = {{ '--mui-palette-text-primary': '#000' }}
      width={500}
      height={300}
      series={[
        { data: xData, label: 'output', id: 'pvId', stack: 'total' },
        { data: uData, label: 'input', id: 'uvId', stack: 'total' },
      ]}
      xAxis={[{ data: aLabels, scaleType: 'band' }]}
    />
  );
}