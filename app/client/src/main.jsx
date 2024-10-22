import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
// import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import './main.scss'
import { ApolloProvider } from '@apollo/react-hooks';
import client from './config/createApolloClient';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        {/* <ApolloProvider client={client}> */}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App/>
          </ThemeProvider >
        {/* </ApolloProvider> */}
  </React.StrictMode>
)
