import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Block from '~/components/Block'
import { Box, List, ListItemIcon, ListItemButton, ListItemText, styled, Typography, Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
const MuiListItemButton = styled(ListItemButton) (({theme}) => ({
  borderRadius: '10px',
  marginBottom:  theme.spacing(0.5),
  marginTop:  theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  transition: 'none', 
  '& > div' : {
    transition: 'none', 
    minWidth: '45px',
    color: theme.palette.mode == 'dark' ? '#a8a7a7' : '#565656',
    '& > span' : {
      fontWeight: 700,
      fontSize: '0.725rem !important',
    },
  },

  '&.Mui-selected' : {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
    background: theme.palette.primary.main + '!important',// '#ff6559 !important',
    fontWeight: 700,   
    transition: 'none', 
    '& > div' : {
      color: '#fff',
      '& > span' : {
        fontWeight: 700,
      }
    }
  }

}))

const MuiDivider = styled(Box)  (({theme}) => ({
  background: '#ffffff63',
  height: '1px',
  width: '100%',
  marginTop: theme.spacing(1.5),
}))
  

function DashboardWithSubNavLayout() {
  const navigate = useNavigate()
  
  const {id} = useParams()

  const PARENT_DIRECTION = '/knowledge_bases/' + id
  
  const [indexSelected, setIndexSelected] = useState(null)
  const [openSubSidebar, setOpenSubSidebar] = useState(false)
  const [navList, setNavlist] = useState(null)

  const selectedIndexInitial = useSelector((state) => (state.navigate.subnav?.index ? state.navigate.subnav.index : null));
  const isOpenSubSidebarInitial = useSelector((state) => state.navigate.subnav?.openSubSidebar);
  const navListInitial = 
  useSelector((state) => {
    let array = state.reducers.subnav
    let index = state.navigate.dashboard?.index
    if (!index) 
      return []
    if (array.lenght == 0)
      return []
    // console.log(array[index])
    return array[index] });

  useEffect(() => {
    setIndexSelected(selectedIndexInitial)
  }, [selectedIndexInitial])

  useEffect(() => {
    setNavlist(navListInitial)
  }, [navListInitial])

  useEffect(() => {
    setOpenSubSidebar(isOpenSubSidebarInitial)
  }, [isOpenSubSidebarInitial])

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const handleListItemClick = (_event, index, address) => {
    setIndexSelected(index)
    navigate(PARENT_DIRECTION + address)
  }

  return (
    <Box sx = {{ 
      height: '100%',
      paddingLeft: openSubSidebar ? 12 : 28,
      position: 'relative',
      transform: 'scale(1)',
      transition: '0.5s all ease',
     }}>
      <Box sx = {{ 
        position: 'absolute',
        height: '100%',
        width:  theme =>  theme.spacing(26),
        left: openSubSidebar ? '-100%' : '0',
        top: 0,        transition: 'inherit',
       }}>
        <Block sx ={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
         }}>

          <Avatar variant="square"
            sx = {{ 
              width: theme =>  theme.spacing(12),
              bgcolor: deepOrange[500],
              height: theme =>  theme.spacing(12),
              background : theme =>  theme.palette.mode == 'dark' ? '#595976' :  '#cccccc4a',
              borderRadius: '50%',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
              color: theme =>  theme.palette.mode == 'dark' ? '#fff' :  '#395064',
              fontSize: '2rem',
              fontWeight: '600'
          }} {...stringAvatar('Sổ Tay Sinh Viên')} />

          <Typography variant='h2' component= 'h2'  sx = {{ 
            fontSize: '1rem',
            fontWeight: '900',
            textAlign: 'center',
            color: theme => theme.palette.mode == 'dark' ? '#ffffff' : '#233560'
           }}>Sổ Tay Sinh Viên</Typography>

          <Box sx = {{ 
            width: '100%',
            borderRadius: '15px'
           }}>
            <List component="nav">
            {navList && navList.map((data, _index) => {
              const Icon = data.icon
              return data?.text ? (
                <MuiListItemButton
                  key = {data.id}
                  selected={data.id == indexSelected}
                  onClick={(event) => handleListItemClick(event, data.id, data.link)}
                >
                  <ListItemIcon>
                    <Icon/>
                  </ListItemIcon>
                  <ListItemText primary= {data.text}/>
                </MuiListItemButton>
              ) : <MuiDivider key = {data.id}/>
            })}
            </List>

           </Box>
        </Block>
      </Box>

      <Box sx = {{ 
        position: 'absolute',
        height: '100%',
        width: theme =>  theme.spacing(11),
        left: !openSubSidebar ? '-100%' : '0',
        top: 0,
        transition: 'inherit',
      }}>
        <Block sx ={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
         }}>
          <Box sx = {{ 
            width: '100%',
            borderRadius: '15px'
           }}>
            <List component="nav">
            {navList && navList.map((data, _index) => {
              const Icon = data.icon
              return data?.text ? (
                <MuiListItemButton
                sx = {{ mt: 2 }}
                  key = {data.id}
                  selected={data.id == indexSelected}
                  onClick={(event) => handleListItemClick(event, data.id, data.link)}
                >
                  <ListItemIcon>
                    <Icon/>
                  </ListItemIcon>
                </MuiListItemButton>
              ) : <MuiDivider key = {data.id}/>
            })}
            </List>

           </Box>
        </Block>
      </Box>
      <Block>
        <Outlet/>
      </Block>
    </Box>
  )
}

export default DashboardWithSubNavLayout