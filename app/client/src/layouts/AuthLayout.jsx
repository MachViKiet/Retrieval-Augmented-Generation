import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthContainer = styled(Stack)(({ theme }) => ({
    padding: 20,
    height: '100vh',
    justifyContent: "center",
    alignItems: "center",
  '&::before': {
    content: '""',
    display: 'flex',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%), hsl(220, 30%, 5%))',
    }),
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

