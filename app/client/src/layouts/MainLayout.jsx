import { Box, Typography, ListItemText, ListItemButton, useColorScheme, Button, Tooltip, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import styled from '@emotion/styled'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '~/store/actions/authActions';
import LoginIcon from '@mui/icons-material/Login';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import NotifycationModal from '~/components/Mui/NotifycationModal';


const MuiListItemButton = styled(ListItemButton) (({theme}) => ({
  borderRadius: '12px',
  marginBottom:  theme.spacing(0.5),
  marginTop:  theme.spacing(0.5),
  transition: 'none', 
  minHeight: '40px',
  textAlign: 'center',
  background: 'transparent !important',
  '& > div' : {
    color: theme.palette.mode == 'dark' ? '#fff': '#394e6a',
    transition: 'none', 
    minWidth: '45px',
    '& > span' : {
      fontWeight: 500,
      fontSize: '0.825rem !important'
    },
  },

  '&:hover' : {
    background: '#cccccc63 !important',
    '& > span' : {
      fontSize: '0.825rem !important'
    },
  },

  '&.Mui-selected' : {
    border: '1px solid #047aff',
    transition: 'none', 
    '& > div' : {
      '& > span' : {
        color: '#047aff',
      }
    }
  },

  '&.Mui-selected:hover' : {
    background: '#047aff !important',
    color: '#fff',
    '& > div' : {
      '& > span' : {
        color: '#fff !important',
      }
    }
  }

}))

function MainLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navigateList = [
    {
      id: 120,
      text: "Trang chủ",
      link: "/",
      require: false
    },
    {
      id: 121,
      text: "Trò Chuyện",
      link: "/chat",
      admin: '/chat_generator',
      require: true
    },
    {
      id: 122,
      text: "FAQs",
      link: "/faqs",
      require: false
    },
    {
      id: 123,
      text: "Báo lỗi/Góp ý",
      link: "/feedback",
      require: true
    },
  ]

  const selectedIndexInitial = useSelector((state) => state.navigate.dashboard?.index ? state.navigate.dashboard.index : null);
  const [selectedIndex, setSelectedIndex] = useState(selectedIndexInitial)

  const user_profile = useSelector((state) => state.auth.user ? state.auth.user : null);
  const isLogin = useSelector((state) => state.auth.user ? state.auth.loggedIn : null);
  const { mode, setMode } = useColorScheme();
  const [isOpenModel, setIsOpenModel] = useState(false)
  const { noticeHandler } = useOutletContext();

  const [isFooter, setFooter] = useState(true)
  
  
  useEffect(() => {
    setSelectedIndex(selectedIndexInitial)
  }, [selectedIndexInitial])


  const handleListItemClick = (_event, index, address, admin_address, require) => {
    if( require && !user_profile ) {
      noticeHandler.add({
        status: 'warning',
        message: 'Vui Lòng Đăng Nhập'
      })
      return 
    }

    if(admin_address && ['administrator', 'academic_administration'].includes(user_profile.role)) {
      navigate(admin_address)
      return
    }
    setFooter(true)
    setSelectedIndex(index)
    navigate(address)
  }

  const logoutClick = (e) => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Box sx = {{ 
      width: '100%',
      height: '100vh',
      background: theme => theme.palette.mode == 'dark' ? '#25294a' : '#DDF3FC',
      paddingTop: '72px',
      position: 'absolute'
     }}>
        <Box 
          sx = {{ 
          width: '100%', height: '72px', paddingX: 6, color: '#000', background:  theme => theme.palette.mode == 'dark' ? '#100a34': '#fff',
          boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)', position: 'absolute', top: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}> 
          <Box>
            <Typography variant = 'h1' sx = {{ 
              fontSize: '1.4rem',
              fontWeight: '800',
              fontFamily: '"Arial",sans-serif',
              background: theme => theme.palette.mode == 'dark' ? 'linear-gradient(78deg, #7cff60 4%, color-mix(in oklch, #8bffcc, #00f50f) 22%, #f3ff00 45%, color-mix(in oklch, #efff34, #daf24f) 67%, #f4ff12 100.2%)'
                : 'linear-gradient(90deg, #463aa2 4%, color-mix(in oklch, #382e82, #0061cf) 22%, #047aff 45%, color-mix(in oklch, #047aff, #c148ac) 67%, #c148ac 100.2%)',
              color: 'transparent',
              backgroundSize: '100% 100%',
              WebkitBackgroundClip : 'text'
             }}>
              FIT@HCMUS
            </Typography>
          </Box>

          <Box sx = {{ 
              width: 'fit-content',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              gap: 1.5
           }}>
            {navigateList.map((data, _index) => {
              return data?.text ? (
                <MuiListItemButton
                  key = {data.id}
                  selected={(selectedIndex === data.id)}
                  onClick={(event) => handleListItemClick(event, data.id, data.link, data?.admin, data?.require)}
                >
                  <ListItemText primary= {data.text}/>
                </MuiListItemButton>
              ) : <></>
            })}
          </Box>

          <Box sx = {{  display: 'flex', alignItems: 'center', gap: 1 }}>
            {
              isLogin ?
              <>
                <Button sx = {{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#ff5d5d',
                  cursor: 'pointer'
                }} 
                onClick={() => setIsOpenModel(true)}>
                  <LogoutIcon/>
                  <Typography variant='p'> Đăng Xuất</Typography>
                </Button>

                <Button sx = {{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: theme => theme.palette.mode == 'dark' ? '#fff' : '#047aff',
                  cursor: 'pointer'
                }} 
                onClick={(event) => handleListItemClick(event, '##login', 'user_profile','admin_profile', true)} >
                  <AccountCircleOutlinedIcon/>
                  <Typography variant='p'>{user_profile.name}</Typography>
                </Button>
              </> : <>
                <Button sx = {{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: theme => theme.palette.mode == 'dark' ? '#fff' : '#047aff',
                  cursor: 'pointer'
                }} onClick={() => navigate('/signin')}>
                  <LoginIcon/>
                  <Typography variant='p'>Đăng Nhập</Typography>
                </Button>
              </>
            }
          </Box>
        </Box>

        <Box sx = {{ overflow: 'auto', height: '100%', paddingY: '2px', paddingBottom: isFooter && '32px' }}>
          <Outlet  context={{...useOutletContext(), setFooter}}/>
        </Box>

        <Box sx = {{ display: 'flex', justifyContent: 'center', position: 'absolute', left: '40px', top: '96px' }}>
          { mode == 'light' ? <Button onClick={() => setMode('dark')} startIcon = {<LightModeIcon/>} sx = {{ color: '#047aff' }}>Sáng</Button>
          : ( mode == 'dark' ? <Button onClick={() => setMode('system')} startIcon = {<DarkModeIcon/>} sx = {{ color: '#fff' }}>Tối</Button>
          :<Button onClick={() => setMode('light')} startIcon = {<SettingsSystemDaydreamIcon/>} sx = {{ color: theme => theme.palette.mode == 'dark' ? '#fff' : '#047aff' }}>Hệ thống</Button> )
          }
        </Box>

        { isFooter && <Box sx = {{ 
          width: '100%',
          height: '30px',
          background: theme => theme.palette.mode == 'dark' ? '#100a34': '#fff',
          boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
          position: 'absolute',
          bottom: 0,
        }}> <Typography sx = {{ color: theme => theme.palette.mode == 'dark' ? '#ffffff85': '#33333385', width: '100%', textAlign: 'center', lineHeight: '30px' }}>ĐH Khoa Học Tự Nhiên, Luận văn 2024 @ Mạch Vĩ Kiệt, Nguyễn Duy Đăng Khoa</Typography>
        </Box> }


      <NotifycationModal modalHandler = {{
        state: isOpenModel,
        close: () => setIsOpenModel(false),
        action: logoutClick,
        actionName: 'Đăng Xuất'
      }} title={' '} content={'Bạn Thật Sự Muốn Đăng Xuất Sao ☹️'}/>

    </Box>
  )
}

export default MainLayout