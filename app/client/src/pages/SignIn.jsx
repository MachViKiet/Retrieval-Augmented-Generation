import styled from '@emotion/styled';
import { Card, FormControl, FormLabel, TextField, Typography, Box, FormControlLabel, Button, CircularProgress } from '@mui/material';
import Link from '@mui/material/Link';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { login } from '~/store/actions/authActions';
import { useAuth } from '~/apis/Auth';
import { useErrorMessage } from '~/hooks/useMessage';

const SignInCard = styled(Card)(({ theme }) => ({
  display: 'flex', flexDirection: 'column',
  alignSelf: 'center', width: '90vw',
  padding: theme.spacing(4), gap: theme.spacing(2),
  margin: 'auto', background: '#fff', borderRadius: '20px',
  [theme.breakpoints.up('sm')]: { maxWidth: '420px' },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px' }));

const TextInput = styled(TextField) (({ theme }) => ({
  '& input': { color: '#000' }, WebkitTextFillColor: '#000', 
  '&:hover fieldset': { borderColor: `${theme.palette.primary.main} !important` }
}));

function SignIn() {
  const [notificationError, setNotification] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { processHandler } = useOutletContext();   

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
 
      setNotification('Vui lòng nhập email hợp lệ !')
      setNotificationSuccess(null)
      return false;
    }

    if (!password.value || password.value.length < 6) {
      setNotificationSuccess(null)
      setNotification('Password phải tối thiểu có 6 kí tự !')
      return false;
    }

    setNotification(null)
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (notificationError) return

    const logInEvent = processHandler.add('#login')

    const data = new FormData(event.currentTarget)
    const userData = { email: data.get('email'), password: data.get('password') };

    await useAuth.login(userData)
      .then((userData) => {
          processHandler.remove('#login', logInEvent)
          dispatch(login(userData))}) 
      .catch((err) => {
        processHandler.remove('#login', logInEvent)
        setNotification(useErrorMessage(err))
      })
  };

  const handleVerifyEmail = async (event) => {
    event.preventDefault()
    const email = document.getElementById('email');

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
 
      setNotification('Vui lòng nhập email hợp lệ !')
      setNotificationSuccess(null)
      return false;
    }
    const logInEvent = processHandler.add('#verifyEmail')

    await useAuth.send_verifyEmail(email.value)
      .then(() => {
          processHandler.remove('#verifyEmail', logInEvent)
          setNotificationSuccess('Gởi Yêu Câu Trong Giây Lát, Kiểm Tra Email Của Bạn !')
          setNotification()
        }) 
      .catch((err) => {
        processHandler.remove('#verifyEmail', logInEvent)
        setNotification(useErrorMessage(err))
        setNotificationSuccess(null)
      })
  };

  return (
    <>
      <SignInCard variant="outlined">
        <Typography component="h1" variant="h6"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: theme => theme.palette.primary.main }} >
          Đăng Nhập </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2, position: 'relative', color: theme => theme.palette.primary.main }} >
          <FormControl sx={{gap: 1}}>
            <FormLabel htmlFor="email" sx = {{ color: 'inherit' }}>Tên đăng nhập</FormLabel>
            <TextInput id="email" type="username" name="email" placeholder="mssv@email.com"
              autoComplete="email" autoFocus required fullWidth variant="outlined" />
          </FormControl>
          
          <FormControl  sx={{gap: 1}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password" sx = {{ color: 'inherit' }}>Mật khẩu</FormLabel>
              <Link component="button" variant="body2"
                sx={{ alignSelf: 'baseline', color: 'inherit' }}>
                Quên mật khẩu ? </Link>
            </Box>
            <TextInput name="password" placeholder="••••••" type="password" id="password"
              autoComplete="current-password" required fullWidth variant="outlined"
              sx = {{ color: '#000' }} />
          </FormControl>

          <Button type="submit" fullWidth variant="contained" onClick={validateInputs}
            sx = {{ background: theme => theme.palette.primary.main, '&:hover' : { boxShadow: 'var(--mui-shadows-4)' } }} >
            Đăng nhập </Button>

          <Button type="submit" fullWidth variant="outlined" onClick={() => navigate('/register')}
            sx = {{ '&:hover' : { boxShadow: 'var(--mui-shadows-4)' } }} >
            Đăng Kí Tài Khoản</Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ textAlign: 'center' }}>
              <span>
                <Link
                href="/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
                >
                Trở về trang chủ
                </Link>
              </span>
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
              <span>
                <Link
                onClick = {handleVerifyEmail}
                variant="body2"
                sx={{ alignSelf: 'center', cursor: 'pointer' }}
                >
                Yêu Cầu Xác Minh Tài Khoản !
                </Link>
              </span>
            </Typography>
          </Box>

          <Typography sx = {{ width: '100%' , textAlign: 'end', color: 'red' }}>
            {notificationError}
          </Typography>
          <Typography sx = {{ width: '100%' , textAlign: 'end', color: 'green' }}>
            {notificationSuccess}
          </Typography>
        </Box>

      </SignInCard>
    </>
  )
}

export default SignIn
