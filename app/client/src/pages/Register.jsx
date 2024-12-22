import styled from '@emotion/styled';
import { Card, FormControl, FormLabel, TextField, Typography, Box, FormControlLabel, Button, CircularProgress } from '@mui/material';
import Link from '@mui/material/Link';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { login } from '~/store/actions/authActions';
import { useAuth } from '~/apis/Auth';
import { useErrorMessage } from '~/hooks/useMessage';

const RegisterCard = styled(Card)(({ theme }) => ({
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

function Register() {
  const [notificationError, setNotification] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { processHandler } = useOutletContext();   

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
 
      setNotification('Vui lòng nhập email hợp lệ !')
      return false;
    }

    if (!password.value || password.value.length < 6) {
      setNotification('Password phải tối thiểu có 6 kí tự !')
      return false;
    }

    setNotification(null)
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (notificationError) return

    const logInEvent = processHandler.add('#register')

    const data = new FormData(event.currentTarget)
    const userData = { email: data.get('email'), password: data.get('password'),  name: data.get('name') };

    await useAuth.register(userData)
      .then((userData) => {
          processHandler.remove('#register', logInEvent)
          dispatch(login(userData))}) 
      .catch((err) => {
        processHandler.remove('#register', logInEvent)
        setNotification(useErrorMessage(err))
      })
  };

  return (
    <>
      <RegisterCard variant="outlined">
        <Typography component="h1" variant="h6"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: theme => theme.palette.primary.main }} >
          Đăng Kí Tài Khoản </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2, position: 'relative', color: theme => theme.palette.primary.main }} >
          <FormControl sx={{gap: 1}}>
            <FormLabel htmlFor="name" sx = {{ color: 'inherit' }}>Tên tài khoản</FormLabel>
            <TextInput id="name" type="name" name="name" placeholder="Nguyen Van A"
               required fullWidth variant="outlined" />
          </FormControl>

          <FormControl sx={{gap: 1}}>
            <FormLabel htmlFor="email" sx = {{ color: 'inherit' }}>Tên đăng nhập (Email sinh viên)</FormLabel>
            <TextInput id="email" type="username" name="email" placeholder="mssv@email.com"
              autoComplete="email" required fullWidth variant="outlined" />
          </FormControl>

          <FormControl  sx={{gap: 1}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password" sx = {{ color: 'inherit' }}>Mật khẩu</FormLabel>
              <Link component="button" variant="body2"
                sx={{ alignSelf: 'baseline', color: 'inherit' }}>
                Quên mật khẩu ? </Link>
            </Box>
            <TextInput name="password" placeholder="••••••" type="password" id="password"
              autoComplete="current-password" autoFocus required fullWidth variant="outlined"
              sx = {{ color: '#000' }} />
          </FormControl>

          <Button type="submit" fullWidth variant="contained" onClick={validateInputs}
            sx = {{ background: theme => theme.palette.primary.main, '&:hover' : { boxShadow: 'var(--mui-shadows-4)' } }} >
            Tạo tài khoản </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ textAlign: 'center' }}>
              <span>
                <Link
                href="/signin"
                variant="body2"
                sx={{ alignSelf: 'center' }}
                >
                Trở về đăng nhập
                </Link>
              </span>
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
              <span>
                <Link
                href="/lisences"
                variant="body2"
                sx={{ alignSelf: 'center' }}
                >
                Quy định & điều khoản
                </Link>
              </span>
            </Typography>
          </Box>

          <Typography sx = {{ width: '100%' , textAlign: 'end', color: 'red' }}>
            {notificationError}
          </Typography>
        </Box>

      </RegisterCard>
    </>
  )
}

export default Register
