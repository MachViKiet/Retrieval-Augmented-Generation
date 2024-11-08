import { Button, Avatar, Box, Chip, FormControl, FormLabel, Typography, TextField, Paper, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Block from '~/components/Block';
import { navigate as sidebarAction } from '~/store/actions/navigateActions';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import MaleIcon from '@mui/icons-material/Male';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { red } from '@mui/material/colors';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function UserProfile() {
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Chatbot - Thông Tin Cá Nhân';
    dispatch(sidebarAction({index: 912}))
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  return (
    <Block sx = {{ 
      padding: '10px',
      paddingY: 3,
     }}>
      <Box sx = {{ 
        width: '100%',
        maxHeight: 'calc(100vh - 80px)',
        overflow: 'auto',
        paddingX: '10px',
        paddingX: 3,
      }}>

      <Box sx = {{ 
        width: '100%',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        paddingBottom: 2
       }}>

          <Box sx = {{ 
            width: '100%',
            height: '160px',
            padding: '10px',
            display: 'flex',
            gap: 4,
           }}>
            <Avatar sx={{ 
              bgcolor: '#6193a5',
              height: '140px',
              width: '140px'
            }} src = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png">
              K
            </Avatar>
            <Box sx ={{  display: 'flex', position: 'relative', flexDirection: 'column', width: '100%', minWidth: '600px', }}>
              <Typography sx = {{ 
                fontSize: '1.525rem !important',
                fontWeight: '900', 
                width: 'fit-content'
               }}>
                Mạch Vĩ Kiệt
              </Typography>

              <Box sx = {{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.75
              }}>
                <MaleIcon sx = {{ fontSize: '1rem' }}/>
                <Typography sx = {{ 
                  width: 'fit-content'
                }}>
                  <span style = {{ fontWeight: '600' }}>Giới tính : </span><span>Nam</span> 
                </Typography>
              </Box>

              <Box sx = {{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.75
              }}>
                <HomeWorkOutlinedIcon sx = {{ fontSize: '1rem' }}/>
                <Typography sx = {{ 
                  width: 'fit-content'
                }}>
                   <span style = {{ fontWeight: '600' }}>Phòng Ban : </span>Ban Giáo Vụ
                </Typography>
              </Box>

              <Box sx = {{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.75
              }}>
                <DraftsOutlinedIcon sx = {{ fontSize: '1rem' }}/>
                <Typography sx = {{ 
                  width: 'fit-content'
                }}>
                  <span style = {{ fontWeight: '600' }}>Email Công Việc : </span><span>mvkiet21@clc.fitus.edu.vn</span> ( Mặc Định )
                </Typography>
              </Box>

              <Box sx = {{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.75
              }}>
                <LocalPhoneOutlinedIcon sx = {{ fontSize: '1rem' }}/>
                <Typography sx = {{ 
                  width: 'fit-content'
                }}>
                  <span style = {{ fontWeight: '600' }}>Số Điện Thoại: </span><span>0903031872</span>
                </Typography>
              </Box>

              <Typography sx = {{ 
                width: 'fit-content',
                color: theme => theme.palette.mode == 'dark' ? '#0dff0d' : '#0dd60d'
               }}>
                <span>Đang công tác tại </span><span>Trường Đại Học Khoa Học Tự Nhiên - ĐHQG TPHCM</span>
              </Typography>

            <Chip label="Academic Administration"  sx = {{ 
                position: 'absolute',
                right: 0, 
                top: 0,
                background: '#4d6b38',
                fontWeight: '600',
                cursor: 'pointer'
              }}/>

            </Box>

          </Box>

          <Box sx = {{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'fit-content',
            gap: 1
           }}>
            <PermIdentityOutlinedIcon sx = {{ fontSize: '2.225rem' }}/> 
            <Typography variant='h1' sx = {{ 
                fontSize: '1.5rem',
                fontFamily: 'Roboto',
                fontWeight: '900',
                width: 'fit-content',
                lineHeight: '100%',
              }}>Chỉnh Sửa Thông Tin Cá Nhân</Typography>
          </Box>

          <Box sx = {{ 
            width: '100%',
            backgroundColor: theme => theme.palette.mode == 'dark' ? '#ffffff2b' : '#fff',
            display: 'inline-flex',
            justifyContent: 'space-evenly',
            padding: 4,
            borderRadius: '15px',
            minWidth: '788px'
          }} component='form'>

            <Grid container spacing={2} sx = {{ width: '100%', height: 'fit-content' }}>

              <Grid size={6}>
                <FormControl  sx={{gap: 1, display: 'flex', width: '100%'}}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="password" sx = {{ color: 'inherit' }}>Họ Và Tên</FormLabel>
                  </Box>
                  <TextField
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    value={'Mạch Vĩ Kiệt'}
                    sx = {{ 
                      color: '#fff',
                      '& fieldset': {
                        borderColor: `#000 !important`,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid size={2} offset={0.25}>
                <FormLabel htmlFor="password" sx = {{ color: 'inherit', display: 'block' , marginBottom: 1, textAlign: 'start'}}>Giới Tính</FormLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue={'female'}
                  value='female'
                  sx = {{ 
                    width: '100%',
                    '& fieldset': {
                      borderColor: theme => theme.palette.mode == 'dark' ? '-' :`#000 !important`,
                    },
                    '& .MuiSelect-icon': {
                      color: theme => theme.palette.text.secondary
                    }
                  }}
                >
                  <MenuItem value={'female'}>Nam</MenuItem>
                  <MenuItem value={'male'}>Nữ</MenuItem>
                </Select>
              </Grid>

              <Grid size={3.5} offset={0.25}>
                <FormControl  sx={{gap: 1, display: 'flex', width: '100%'}}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="password" sx = {{ color: 'inherit' }}>Ngày Sinh</FormLabel>
                  </Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx = {{ paddingTop: 0, width: '100%' ,'& button' : { color: theme => theme.palette.text.secondary } }}>
                      <DatePicker
                        defaultValue={dayjs('2022-04-17')}
                        // value={value}
                        // onChange={(newValue) => setValue(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid size={4}>
                <Box sx={{ display: 'block', width: 'fit-content', width: '100%' }}>
                  <FormLabel htmlFor="password" sx = {{ color: 'inherit', display: 'block' , marginBottom: 1, textAlign: 'start' }}>Phòng Ban</FormLabel>
                  <Select
                    defaultValue={'httt'}
                    value='httt'
                    sx = {{ 
                      width: '100%',
                      '& fieldset': {
                        borderColor: theme => theme.palette.mode == 'dark' ? '-' :`#000 !important`,
                      },
                      '& .MuiSelect-icon': {
                        color: theme => theme.palette.text.secondary
                      }
                    }}
                  >
                    <MenuItem value={'female'}>Ban Giáo Vụ</MenuItem>
                    <MenuItem value={'male'}>Phòng Công Tác Sinh Viên</MenuItem>
                    <MenuItem value={'httt'}>Văn Phòng Khoa Hệ Thống Thông Tin</MenuItem>
                    <MenuItem value={'male'}>Phòng Đào Tạo</MenuItem>
                  </Select>
                </Box>
              </Grid>

              <Grid size={3} offset={0.25}>
                <Box sx={{ display: 'block', width: 'fit-content', width: '100%' }}>
                  <FormLabel htmlFor="password" sx = {{ color: 'inherit', display: 'block' , marginBottom: 1, textAlign: 'start' }}>Chức Vụ</FormLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    defaultValue={'female'}
                    value='female'
                    sx = {{ 
                      width: '100%',
                      '& fieldset': {
                        borderColor: theme => theme.palette.mode == 'dark' ? '-' :`#000 !important`,
                      },
                      '& .MuiSelect-icon': {
                        color: theme => theme.palette.text.secondary
                      }
                    }}
                  >
                    <MenuItem value={'female'}>Trưởng Phòng</MenuItem>
                    <MenuItem value={'male'}>Phó Phòng</MenuItem>
                    <MenuItem value={'male'}>Nhân Viên</MenuItem>
                    <MenuItem value={'male'}>Cộng Tác Viên</MenuItem>
                  </Select>
                </Box>
              </Grid>

              <Grid size={6}>
                <FormControl  sx={{gap: 1, display: 'flex', width: '100%'}}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="password" sx = {{ color: 'inherit' }}>Email Công Việc</FormLabel>
                  </Box>
                  <TextField
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    value={'mvkiet21@clc.fitus.edu.vn'}
                    sx = {{ 
                      color: '#fff',
                      '& fieldset': {
                        borderColor: `#000 !important`,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid size={6}>
                <FormControl  sx={{gap: 1, display: 'flex', width: '100%'}}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="password" sx = {{ color: 'inherit' }}>Email Cá Nhân</FormLabel>
                  </Box>
                  <TextField
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    value={'machkiet252003@gmail.com'}
                    sx = {{ 
                      color: '#fff',
                      '& fieldset': {
                        borderColor: `#000 !important`,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl  sx={{gap: 1, display: 'flex', width: '70%'}}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="password" sx = {{ color: 'inherit' }}>Số Điện Thoại</FormLabel>
                  </Box>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    value={'0903031872'}
                    sx = {{ 
                      color: '#fff',
                      '& fieldset': {
                        borderColor: `#000 !important`,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl  sx={{gap: 1, display: 'flex', width: '100%'}}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="password" sx = {{ color: 'inherit' }}>Mục Tiêu Công Việc</FormLabel>
                  </Box>
                  <TextField
                    multiline
                    rows={4}
                    defaultValue="Tra cứu nội quy trường học, tìm hiểu các thông tin về chính sách học bổng, du học và tuyển dụng"
                    sx = {{ 
                      color: '#fff',
                      '& fieldset': {
                        borderColor: `#000 !important`,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

            </Grid>
          </Box>

          <Box sx = {{ 
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            width: '100%'
           }}>
            <Button variant= 'contained' color="success">Cập Nhật Thông Tin</Button>
            <Button variant= 'contained' color='error'>Đặt lại mật khẩu</Button>
          </Box>
      </Box>

      </Box>
    </Block>
  )
}

export default UserProfile