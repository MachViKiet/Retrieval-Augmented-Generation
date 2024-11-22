import { Box, Button, Typography, useColorScheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import avatar from '~/assets/10665846.png'

export function HomePage() {
  const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state.auth.user ? state.auth.loggedIn : null);

  useEffect(() => {
    document.title = 'Chatbot - Trang Chủ';
    dispatch(sidebarAction({index: 120}))
    return () => (
      dispatch(sidebarAction({index: null}))
    )
  })
  const Start = (e) => {
    isLogin ? navigate('/chat') : navigate('/signin')
  }
  
  return (
    <Box 
      sx = {{ 
      width: '100%',
      height: '100%',
      minHeight: 'fit-content',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      paddingBottom: '30px',

    }}>
      <Box sx = {{ display: 'flex', justifyContent: 'center', position: 'absolute', left: '40px', top: '12px' }}>
        { mode == 'light' ? <Button onClick={() => setMode('dark')} startIcon = {<LightModeIcon/>} sx = {{ color: '#047aff' }}>Sáng</Button>
        : ( mode == 'dark' ? <Button onClick={() => setMode('system')} startIcon = {<DarkModeIcon/>} sx = {{ color: '#fff' }}>Tối</Button>
        :<Button onClick={() => setMode('light')} startIcon = {<SettingsSystemDaydreamIcon/>} sx = {{ color: theme => theme.palette.mode == 'dark' ? '#fff' : '#047aff' }}>Hệ thống</Button> )
        }
      </Box>
      <Box sx = {{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: '460px'
       }}>
        
        <Box sx = {{ 
          width:  '150px',
          height:  '200px'
        }}>
          <img src={avatar} style = {{ width: '100%', height: '100%' }} />
        </Box>
        <Typography variant='h2' sx = {{ 
          color: theme => theme.palette.text.secondary,
          fontSize: '2.025rem',
          fontWeight: '900',
          fontFamily: '"Arial",sans-serif',
          background: 'linear-gradient(90deg, #463aa2 4%, color-mix(in oklch, #382e82, #0061cf) 22%, #047aff 45%, color-mix(in oklch, #047aff, #c148ac) 67%, #c148ac 100.2%)',
          color: 'transparent',
          backgroundSize: '100% 100%',
          WebkitBackgroundClip : 'text'
         }}>
            <TypeAnimation
              sequence={[
                'Xin chào, Tôi',
                'Xin',
                'Xin chào, Mình là UniBot!',
              ]}
              speed={40}
              cursor={true}
            />
         
         </Typography>

         <Typography variant='p' sx = {{ 
          color: theme => theme.palette.text.secondary,
          textAlign: 'center',
          fontSize: '1rem'
          }}>
            Trợ lý ảo giúp bạn giải đáp thắc mắc, tra cứu thông tin một cách nhanh chóng và chính xác nhất !
         </Typography>

         <Button variant='contained' sx = {{ 
            background: theme => theme.palette.primary.main,
            '&:hover' : {
              boxShadow: 'var(--mui-shadows-4)'
            }
          }} onClick={Start}>Bắt đầu Ngay</Button>
      </Box>


      <Box sx = {{ 
          width: '100%',
          height: '30px',
          background: theme => theme.palette.mode == 'dark' ? '#100a34': '#fff',
          boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
          position: 'absolute',
          bottom: 0,
         }}>
          <Typography sx = {{ color: theme => theme.palette.mode == 'dark' ? '#ffffff85': '#33333385', width: '100%', textAlign: 'center', lineHeight: '30px' }}>ĐH Khoa Học Tự Nhiên, Luận văn 2024 @ Mạch Vĩ Kiệt, Nguyễn Duy Đăng Khoa</Typography>
        </Box>
    </Box>
  )
}

export default HomePage