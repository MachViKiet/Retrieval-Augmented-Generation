import styled from '@emotion/styled';
// import { CheckBox } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { Card, FormControl, FormLabel, TextField, Typography, Box, FormControlLabel, Button, CircularProgress } from '@mui/material';
import Link from '@mui/material/Link';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import { login } from '~/store/actions/authActions';
import { useAuth } from '~/apis/Auth';
import { useErrorMessage } from '~/hooks/useMessage';

const SignInCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '90vw',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '420px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
  background: '#fff',
  borderRadius: '20px'
}));

const TextInput = styled(TextField) (({ theme }) => ({
  WebkitTextFillColor: '#000',
  '& input': {
    color: '#000'
  },
  '&:hover fieldset': {
    borderColor: `${theme.palette.primary.main} !important`,
  },
}));

function SignIn() {
  const [notificationError, setNotification] = useState(null)
  const [submiting, isSubmiting] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();   

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
    event.preventDefault();
    isSubmiting(true)

    if (notificationError) {
      event.preventDefault();
      console.log(notificationError)
      isSubmiting(false)
      return;
    }

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = { email: data.get('email'), password: data.get('password') };
    await useAuth.login(userData)
      .then((userData) => 
        {
          dispatch(login(userData))
          isSubmiting(false)
          // useNavigate()('/home');
        })
      .catch((err) => {
        setNotification(useErrorMessage(err))
        isSubmiting(false)
        return;
      })
  };

  return (
    <>
      {!!submiting && <Box sx = {{ 
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: '#0000000f',
        zIndex: 10
      }}/>}
      <SignInCard variant="outlined">
        <Typography
          component="h1"
          variant="h6"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: theme => theme.palette.primary.main }}
        >
          Đăng Nhập
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
            position: 'relative',
            color: theme => theme.palette.primary.main
          }}
        >
          <FormControl sx={{gap: 1}}>
            <FormLabel htmlFor="email" sx = {{ color: 'inherit' }}>Tên đăng nhập</FormLabel>
            <TextInput
              id="email"
              type="username"
              name="email"
              placeholder="mssv@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          
          <FormControl  sx={{gap: 1}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password" sx = {{ color: 'inherit' }}>Mật khẩu</FormLabel>
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: 'baseline', color: 'inherit' }}
              >
                Quên mật khẩu ? 
              </Link>
            </Box>
            <TextInput
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx = {{ color: '#000' }}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            endIcon= { submiting && <CircularProgress size="0.725rem" color='secondary'/>}
          >
            Đăng nhập
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControlLabel
                control={
                  <Checkbox defaultChecked sx ={{ padding: 0, paddingRight: '5px' }} />
                }
                label="Remember me"
            />
            <Typography sx={{ textAlign: 'center' }}>
              <span>
                <Link
                href="/material-ui/getting-started/templates/sign-in/"
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

      </SignInCard>
    </>
  )
}

export default SignIn
