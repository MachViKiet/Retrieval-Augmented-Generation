import styled from '@emotion/styled';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import background from '~/assets/futuristic-robot.png'

const AuthContainer = styled(Stack)(({ theme }) => ({
    padding: 20,
    height: '100vh',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.mode == 'dark' 
      ? '#25294a' 
      : '#DDF3FC',//'#f9fafb',
  '&::before': {
    content: '""',
    display: 'flex',
    position: 'relative',
    zIndex: -1,
    inset: 0,
    position: 'relative'
  },
}));

const AuthLayout = () => {
  return (
    <AuthContainer  direction="column" justifyContent="space-between">
        <Outlet/>
    </AuthContainer>
  );
};

export default AuthLayout

