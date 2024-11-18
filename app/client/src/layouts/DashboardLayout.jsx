import React, { useEffect, useState } from 'react'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Avatar, Card, CardContent, Typography, Button } from '@mui/material'
import styled from '@emotion/styled'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { deepOrange } from '@mui/material/colors';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/store/actions/authActions';
import { navList_1, navList_2 } from "~/config/navList";
import { useColorScheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

const DashboardContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  justifyContent: "center",
  alignItems: "center",
  transform: 'scale(1)',
  transition: '0.5s all ease',
  paddingRight: theme.spacing(2),

  '&::before': {
    background: '#ddf3fc',
    content: '""',
    display: 'flex',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundColor: theme.palette.primary.background,
    backgroundRepeat: 'no-repeat',
  },
}));

const SidebarContainer = styled(Box)(({theme}) => ({
    
    position: 'absolute',
    right: 0,
    left: 0,
    height: `100vh`,
    maxHeight: '100vh',
    overflow: 'auto',
    width: theme.app.SideBar_Width,
    padding: theme.spacing(2),
    transform: 'scale(1)',
    transition: '0.5s all ease', 
    background:  theme.palette.primary.main,
    [theme.breakpoints.down('lg')]: {
      left: '-100%', 
    },
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '0 15px 15px 0',
    zIndex: 7,
}))

const SubSidebarContainer = styled(Box)(({theme}) => ({
    position: 'absolute',
    right: 0,
    left: 0,
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'auto',
    width: 'fit-content',
    padding: theme.spacing(2),
    transform: 'scale(1)',
    transition: '0.5s all ease', 
    [theme.breakpoints.up('lg')]: {
      left: '-100%', 
    },
    borderRadius: '0 15px 15px 0',
    background:  theme.palette.primary.main,
    zIndex: 6
}))

const ContentContainer = styled(Box)(() => ({
    width: '100%',
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'auto'
}))

const LogoContainer = styled(Box) (() => ({
  background: '#cccccc12',
  height: '56px',
  width: '100%',
  borderRadius: '15px',
}))

const Overlayer = styled(Box) (() => ({
  background: '#0000008c',
  height: '100%',
  width: '100%',
  right: 0,
  borderRadius: '15px',
  position: 'absolute',
  transform: 'scale(1)',
  transition: '0.5s all ease', 
  zIndex: 5,
  display: 'none'
}))

const MuiListItemButton = styled(ListItemButton) (({theme}) => ({
  borderRadius: '10px',
  marginBottom:  theme.spacing(0.5),
  marginTop:  theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  transition: 'none', 
  '& > div' : {
    color: '#fff',
    transition: 'none', 
    minWidth: '45px',
    '& > span' : {
      fontWeight: 700,
      fontSize: '0.725rem !important'
    },
  },

  '&.Mui-selected' : {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
    background: '#ff6559 !important',
    fontWeight: 700,   
      transition: 'none', 
    '& > div' : {
      '& > span' : {
        fontWeight: 700,
      }
    }
  }

}))

const InformationCard = styled(Card) (({theme}) => ({
  ...theme.typography.body2,
  height: 'fit-content',
  width: '100%',
  minHeight: '40px',
  padding: theme.spacing(1),
  borderRadius: '10px'
}))

const MuiDivider = styled(Box)  (({theme}) => ({
  background: '#ffffff63',
  height: '1px',
  width: '100%',
  marginTop: theme.spacing(1.5),
}))

function DashboardLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { mode, setMode } = useColorScheme();
  
  const selectedIndexInitial = useSelector((state) => state.navigate.dashboard?.index ? state.navigate.dashboard.index : null);
  const user_profile = useSelector((state) => state.auth.user ? state.auth.user : {});
  
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)
  
  const context = useOutletContext();

  useEffect(() => {
    setSelectedIndex(selectedIndexInitial)
  }, [selectedIndexInitial])

  const handleListItemClick = (_event, index, address) => {
    setIsOpenSideBar(false)
    navigate(address)
  }

  const logoutClick = (e) => {
    e.stopPropagation()
    dispatch(logout())
    navigate('/')
  }

  const expandClick = () => {
    setIsOpenSideBar(prev => !prev)
  }

  return (
    <DashboardContainer sx = {(theme) => ({
        paddingLeft: { xs : isOpenSideBar ? 0 : '85px', lg: `calc(${theme.app.SideBar_Width})` }})}>

      <Overlayer onClick={expandClick}
        sx = {(theme) =>({ [theme.breakpoints.down('lg')]: { display: isOpenSideBar && 'block !important' } })} />

      <SidebarContainer 
        sx = {(theme) =>({ [theme.breakpoints.down('lg')]: { left: isOpenSideBar && '0 !important' } })}>

        <LogoContainer/>

        <MuiDivider/>

        <List component="nav">

          {navList_1.map((data, _index) => {
            const Icon = data.icon
            return data?.text ? (
              <MuiListItemButton key = {data.id} selected={(selectedIndex === data.id)}
                onClick={(event) => handleListItemClick(event, data.id, data.link)} >
                <ListItemIcon> <Icon/> </ListItemIcon>
                <ListItemText primary= {data.text}/>
              </MuiListItemButton> ) : <></> })}

          <MuiDivider/>
          {navList_2.map((data, _index) => {
            const Icon = data.icon
            return data?.text ? (
              <MuiListItemButton key = {data.id} selected={(selectedIndex === data.id)}
                onClick={(event) => handleListItemClick(event, data.id, data.link)} >
                <ListItemIcon> <Icon/> </ListItemIcon>
                <ListItemText primary= {data.text}/>
              </MuiListItemButton> ) : <></> })}
        </List>

        <InformationCard 
          sx = {{ background: theme => theme.palette.mode == 'light' ? '#b1cee1' : 'rgb(46, 63, 108)' }}>
          <Box onClick= {() => navigate('/admin_profile')}
            sx = {{ display: 'flex', mb: 1, mt: 1, '&:active': { transform: 'scale(0.9)' }}} >
              <Avatar src = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
              sx={{ width: 32, height: 32, bgcolor: deepOrange[500], color: '#fff' }}></Avatar>
              <CardContent sx={{ height: '100%', py: 0, '&:last-child' : {py: 0}, position: 'relation', paddingLeft: 1}}>
                <Typography component="div" variant="p"
                sx = {{ width: '108px', overflow: 'hidden', fontSize:'0.725rem', color :theme => theme.palette.mode == 'light' ? '#000' : '#fff',
                  whiteSpace: 'nowrap', textOverflow: 'ellipsis', cursor:'pointer', fontWeight: '800' }} >
                  {user_profile?.name ? user_profile.name : 'Không tồn tại'}
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', fontSize: '0.625rem !important', lineHeight: '120%', fontWeight: '400', color: theme => theme.palette.mode == 'light' ? '#505766' : 'rgb(133, 141, 160)',
                    width: '128px', overflow: 'hidden', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor:'pointer' }} >
                  {user_profile?.email ? user_profile.email : 'Không tồn tại'}
                </Typography>
              </CardContent>
          </Box>

          <ListItemButton onClick= {logoutClick}
          sx = {{ background: '#ffffffe8', borderRadius: '8px', 
            '& > div' : { color: '#000', }, '&:hover' : { background: '#fff', fontWeight: 700,    }, '&:active' : { transform: 'scale(0.9)' } }} >
            <ListItemIcon> <ReplyAllIcon/> </ListItemIcon>
            <ListItemText primary= "Đăng Xuất" />
          </ListItemButton>
        </InformationCard>

        <Box sx = {{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
          { mode == 'light' ? <Button onClick={() => setMode('dark')} startIcon = {<LightModeIcon/>} sx = {{ color: '#fff' }}>Sáng</Button>
          : ( mode == 'dark' ? <Button onClick={() => setMode('system')} startIcon = {<DarkModeIcon/>} sx = {{ color: '#fff' }}>Tối</Button>
           :<Button onClick={() => setMode('light')} startIcon = {<SettingsSystemDaydreamIcon/>} sx = {{ color: '#fff' }}>Hệ thống</Button> ) } </Box>
        
      </SidebarContainer>

      <SubSidebarContainer sx = {(theme) => ({
          [theme.breakpoints.down('lg')]: { left: isOpenSideBar && '-100% !important' } })}>
        <LogoContainer/>

        <MuiDivider/>

        <List component="nav">
          {navList_1.map((data, _index) => {
            const Icon = data.icon
            return data?.text ? (
              <MuiListItemButton key = {data.id} selected={selectedIndex === data.id}
                onClick={(event) => handleListItemClick(event, data.id, data.link)} >
                <ListItemIcon sx = {{ display: 'contents' }}> <Icon/> </ListItemIcon>
              </MuiListItemButton>
            ) : <></> })}
          
          <MuiDivider/>

          {navList_2.map((data, _index) => {
            const Icon = data.icon
            return data?.text ? (
              <MuiListItemButton key = {data.id} selected={selectedIndex === data.id}
                onClick={(event) => handleListItemClick(event, data.id, data.link)} >
                <ListItemIcon sx = {{ display: 'contents' }}> <Icon/> </ListItemIcon>
              </MuiListItemButton>
            ) : <></> })}
        </List>


        <MuiListItemButton onClick={expandClick}>
            <ListItemIcon sx = {{ display: 'contents' }}> <KeyboardArrowRightIcon/> </ListItemIcon>
        </MuiListItemButton>

        <Box 
          sx = {{ display: 'flex', justifyContent:'center', alignItems: 'center', mb: 2, mt: 1 }}>
          <Avatar src = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
            sx={{ width: 36, height: 36, fontSize: '18px', bgcolor: deepOrange[500], color: '#fff' }}>K</Avatar>
        </Box>
        
        <ListItemButton onClick= {logoutClick}
          sx = {{ background: '#ffffffe8', borderRadius: '8px', '& > div' : { color: '#000' }, '&:hover' : { background: '#fff', fontWeight: 700 }}}>
          <ListItemIcon sx = {{ display: 'contents' }}> <ReplyAllIcon/> </ListItemIcon>
        </ListItemButton >

      </SubSidebarContainer>

      <ContentContainer sx={{ flexGrow: 1, p: 2, pr: '2px' }}>
        <Outlet context={useOutletContext()}/>
      </ContentContainer>

    </DashboardContainer>       
  )
}

export default DashboardLayout