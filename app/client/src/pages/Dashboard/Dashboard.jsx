import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useSelector } from 'react-redux';
import { formatTime } from '~/utils/GetTime'
import { Block as CustomBlock } from '~/components/Mui/Block';
// import Hidden from '~/components/Page/Hidden';
// import Skeleton from '@mui/material/Skeleton';
const Container_Style = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  paddingBottom: {md: 2, xs: 1},
  paddingTop: 1
}
const Block = styled(Box) (({theme}) => ({ 
  width: '100%', borderRadius: '10px',
  // backgroundImage: theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #6e6e6e4a 0%, #02041a91 100%)' 
  //   : 'linear-gradient(135deg, #e2e8ff 0%, #6994d9 100%)',
  backgroundImage: theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #6e6e6e4a 0%, #02041a91 100%)' 
            :'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  position: 'relative', textAlign: 'start',
  color: theme.palette.mode == 'dark' ? '#ffff' : 'var(--mui-palette-primary-main)',
  boxShadow: '0px 2px 4px rgba(80, 80, 80, 0.25), 0px 2px 4px rgba(80, 80, 80, 0.1)',
  cursor: 'pointer',
  '&:active': { transform: 'scale(0.98)' } }))

function Dashboard() {
  const {processHandler, dashboard } = useOutletContext();
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    document.title = 'Chatbot - Trang Chủ';
    dashboard.navigate.active(234)

    return () => ( dashboard.navigate.active('#') )
  }, [])

  useEffect(() => {
    useProfile.getDashboard(token).then((dataAPI) => {
      setData(dataAPI)
    })
  }, [token])

  return (
    // <Hidden></Hidden>
    <CustomBlock sx ={{ width: '100%', height: '100%', padding: 3, background: theme => theme.palette.mode == 'dark' ? 'rgb(255 255 255 / 17%)' : 'rgb(234, 245, 255)' }}>
        <Box sx = {{ display: 'flex', gap: 1, alignItems:'center', paddingBottom: 0.5 }}>
          <Typography variant='h1' 
            onClick = {() => { 
              const navigateEvent = processHandler.add('#navigate')
              setTimeout(() => {
                processHandler.remove('#navigate', navigateEvent)
                navigate('/')
              }, 500)
            }}
            sx = {{ '&:hover': { cursor: 'pointer' }, fontSize: '2.4rem', fontFamily: 'Roboto', fontWeight: '900', width: 'fit-content', color: theme => theme.palette.mode == 'dark' ? '#fff' : theme.palette.primary.main }}>
              <HomeOutlinedIcon fontSize='large'/> Dashboard </Typography>
        </Box>
        <Box sx = {{...Container_Style, gap: { md: 3, xs: 1 } }}>

            <Box  sx = {{ 
                flex:  { xs: "0 1 140px", md: "0 1 300px" },
                display: 'flex',
                position: 'relative'
             }}>
                <Block sx ={{  height: { xs: "140px", md: "160px" }, padding: '20px' }}>
                  <Typography>Người Sử Dụng</Typography>
                  <Typography sx = {{ fontSize: '28px !important' }}> {data?.user || '#'} Users</Typography>
                </Block>
                <Block sx = {{  padding: 1, paddingX: 2, width: 'fit-content', position: 'absolute !important', bottom: 0, backgroundImage: 'linear-gradient(135deg, rgb(245 247 250 / 0%) 0%, rgb(40 40 40 / 0%) 100%) !important', boxShadow: 'none !important'  }}>
                  <Typography sx = {{ width: '100%', textAlign: 'end', fontSize: '14px!important' }} ><RotateLeftIcon/> Cập nhật lúc: {data?.date ? formatTime(data?.date) : '#'}</Typography>
                </Block>

            </Box>
            
            <Box  sx = {{ 
                flex:  { xs: "0 1 140px", md: "0 1 300px" },
                display: 'flex',
                position: 'relative'
             }}>
                <Block sx ={{  height: { xs: "140px", md: "160px" }, padding: '20px' }}>
                  <Typography>Documents</Typography>
                  <Typography sx = {{ fontSize: '28px !important' }}>{data?.document || '#'} Files</Typography>
                </Block>
                <Block sx = {{  padding: 1, paddingX: 2, width: 'fit-content', position: 'absolute !important', bottom: 0, backgroundImage: 'linear-gradient(135deg, rgb(245 247 250 / 0%) 0%, rgb(40 40 40 / 0%) 100%) !important', boxShadow: 'none !important'  }}>
                  <Typography sx = {{ width: '100%', textAlign: 'end', fontSize: '14px!important' }} ><RotateLeftIcon/> Cập nhật lúc: {  data?.date ? formatTime(data?.date) : '#'}</Typography>
                </Block>

            </Box>
            
            <Box  sx = {{ 
                flex:  { xs: "0 1 140px", md: "0 1 300px" },
                display: 'flex',
                position: 'relative'
             }}>
                <Block sx ={{  height: { xs: "140px", md: "160px" }, padding: '20px' }}>
                  <Typography>Lượt Sử dụng</Typography>
                  <Typography sx = {{ fontSize: '28px !important' }}>{data?.session || '#'} lần</Typography>
                </Block>
                <Block sx = {{  padding: 1, paddingX: 2, width: 'fit-content', position: 'absolute !important', bottom: 0, backgroundImage: 'linear-gradient(135deg, rgb(245 247 250 / 0%) 0%, rgb(40 40 40 / 0%) 100%) !important', boxShadow: 'none !important'  }}>
                  <Typography sx = {{ width: '100%', textAlign: 'end', fontSize: '14px!important' }} ><RotateLeftIcon/> Cập nhật lúc: {data?.date ? formatTime(data?.date) : '#'}</Typography>
                </Block>

            </Box>
        </Box >

        <Box sx = {{...Container_Style, gap: { md: 3, xs: 1 }, position: 'relative' }}>
          <Block sx = {{ width: '100%', height: 'fit-content', paddingY: '32px !important' , backgroundImage: theme => theme.palette.mode == 'dark' ? 'linear-gradient(164deg, #6e6e6e4a 0%, #02041a91 100%) !important' 
            :'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important'}}>
            <SimpleBarChart data = {data}/>
          </Block>
          
          <Block sx = {{  padding: 1, paddingX: 2, width: 'fit-content', position: 'absolute !important', bottom: '20px', backgroundImage: 'linear-gradient(135deg, rgb(245 247 250 / 0%) 0%, rgb(40 40 40 / 0%) 100%) !important', boxShadow: 'none !important'  }}>
            <Typography sx = {{ width: '100%', textAlign: 'end', fontSize: '14px!important' }} ><RotateLeftIcon/> Cập nhật lúc: {data?.date ? formatTime(data?.date) : '#'} </Typography>
          </Block>
        </Box >

        <Box sx = {{
          width: '100%',
        }}>
          <Typography sx ={{ width: '100%', fontSize: '8px', textAlign: 'left', color: theme => theme.palette.text.secondary }}>Tính năng đang được thử nghiệm, dữ liệu không được cập nhật theo thời gian thực</Typography>
        </Box>

        {/* <Box sx = {{...Container_Style, gap: { md: 3, xs: 1 }, position: 'relative', paddingBottom: '20px'}}>
          <Block sx = {{ width: '100%', height: 'fit-content', paddingY: '32px !important'}}>
            <BasicPie/>
          </Block>

          <Block sx = {{  padding: 1, paddingX: 2, width: 'fit-content', position: 'absolute !important', bottom: '20px', backgroundImage: 'none !important', boxShadow: 'none !important'  }}>
            
            <Typography sx = {{ width: '100%', textAlign: 'end', fontSize: '14px!important' }} ><RotateLeftIcon/> Cập nhật lúc: {data?.date ? formatTime(data?.date) : '#'} </Typography>
          </Block>
        </Box > */}

        {/* <Skeleton variant="rounded" width={'100%'} height={360} /> */}
        {/* <Skeleton variant="rounded" width={'100%'} height={360} /> */}
    </CustomBlock>
  )
}

export default Dashboard



const pData = [24, 13, 98, 39, 48, 38, 43];
const xLabels = [
  'T.Dụng',
  'TKBiểu',
  'H.Bổng',
  'S.Kiện',
  'N.Quy',
];

function SimpleBarChart({data}) {
  const BarChartCustom = styled(BarChart) (({theme}) => ({
    '--mui-palette-text-primary': theme.palette.text.secondary,
    width: '100%'
  }))
  return (
    <BarChartCustom
      width={900}
      height={300}
      layout="horizontal"
      grid={{ vertical: true }}
      series={[
        { data: pData, label: 'Lượt Chủ Đề Truy Cập', id: 'pvId' },
      ]}
      yAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}
import { PieChart } from '@mui/x-charts/PieChart';
import { useProfile } from '~/apis/Profile';
export function BasicPie() {
  const PieChartCustom = styled(PieChart) (({theme}) => ({
    '--mui-palette-text-primary': '#000',
    '--mui-palette-background-paper': '#12121203'
  }))
  return (
    <PieChartCustom
      series={[
        {
          data: [
            { id: 0, value: 15, label: 'Rất Hài Lòng', color: '#99CC00' },
            { id: 1, value: 5, label: 'Hài Lòng', color: '#99CC33'   },
            { id: 2, value: 2, label: 'Tương Đối', color: '#99CC66'  },
            { id: 3, value: 2, label: 'Rất Hạn Chế', color: '#99CC99'  },
            { id: 4, value: 1, label: 'Rất Tệ', color: '#aac9aa'  },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}