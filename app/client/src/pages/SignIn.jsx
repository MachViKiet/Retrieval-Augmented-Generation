import styled from '@emotion/styled';
import { CheckBox } from '@mui/icons-material';
import { Card, FormControl, FormLabel, TextField, Typography, Box, FormControlLabel, Button } from '@mui/material';
import Link from '@mui/material/Link';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '~/store/actions/authActions';

const SignInCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '90vw',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      console.log('event is prevent')
      return;
    }
    const data = new FormData(event.currentTarget);
    const userData = { name: data.get('email'), email: data.get('password') };
    dispatch(login(userData));
    navigate('/');
  };

  return (
    <div>
      <SignInCard variant="outlined">
          <Typography
              component="h1"
              variant="h6"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
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
          }}
        >
          <FormControl sx={{gap: 1}}>
            <FormLabel htmlFor="email">Tên đăng nhập</FormLabel>
            <TextField
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
              <FormLabel htmlFor="password">Mật khẩu</FormLabel>
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: 'baseline' }}
              >
                Quên mật khẩu ? 
              </Link>
            </Box>
            <TextField
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Đăng nhập
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControlLabel
                control={<CheckBox value="remember" color="primary" />}
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
        </Box>
      </SignInCard>
    </div>
  )
}

export default SignIn
