import React, { useState } from 'react'
import styled from '@emotion/styled';
import { Box, Button, TextField, Tooltip, useColorScheme } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import NearMeIcon from '@mui/icons-material/NearMe';

const ExtensionButton = styled(Box) (({theme}) => ({
  background: theme.palette.primary.third,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
  padding: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  marginRight: '8px',
  '&:active': {
    transform: 'scale(0.9)'
  }
}))

const ExtensionButtonStyle = { 
  '.MuiSvgIcon-root' : {
      color:  theme => theme.palette == 'light' ? theme.palette.primary.main : '#fff',
      fontWeight: '400'
  },
}

const ChatBox = styled(Box)(({theme}) => ({
  position: 'absolute',
  bottom: theme.spacing(0),
  padding: theme.spacing(2),
  paddingTop: theme.spacing(0),
  right: theme.spacing(0),
  width: '100%',
}))

const ExtensionBox = styled(Box)(({theme}) => ({
  background: theme.palette.primary.main,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
  borderRadius: '15px 15px 0 0',
  display: 'flex',
  padding: theme.spacing(1),
  paddingRight: theme.spacing(0),
  border: '1px solid #00000026',
  // borderBottom: 'none'
}))

const TextInputBox = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  padding: theme.spacing(1),
  borderTop: 'none',
  borderRadius: '0 0 15px 15px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)'
}))

function TextInput({id,handleClick, handleSubmit}) {
  const [input, setInput] = useState('')
  const {mode} = useColorScheme()

  const Click = (input) => {
    setInput('')
    handleClick(input)
  }

  const Submit = (event) => {
    event.preventDefault();
    // if (true) {
    //   console.log('event is prevent')
    //   return;
    // }
    handleSubmit(input)
  }

  return (
  <ChatBox >
    <ExtensionBox>
      <Tooltip title="Prompt"  placement="top">
        <ExtensionButton sx = {{ 
            '.MuiSvgIcon-root' : theme => ({
                color:  mode == 'light' ? theme.palette.primary.main : '#fff',
                fontWeight: '400',
                fontSize: '1.25rem'
            }),
         }}><LibraryBooksOutlinedIcon/></ExtensionButton>
      </Tooltip>
      <Tooltip title="Upload Tài Liệu"  placement="top">
        <ExtensionButton sx = {{ 
            '.MuiSvgIcon-root' : theme => ({
                color:  mode == 'light' ? theme.palette.primary.main : '#fff',
                fontWeight: '400',
                fontSize: '1.25rem'
            }),
         }}><DriveFolderUploadOutlinedIcon/></ExtensionButton>
      </Tooltip>
      <Tooltip title="Lưu Hội Thoại"  placement="top">
        <ExtensionButton sx = {{ 
            '.MuiSvgIcon-root' : theme => ({
                color:  mode == 'light' ? theme.palette.primary.main : '#fff',
                fontWeight: '400',
                fontSize: '1.25rem'
            }),
         }}><SaveAltOutlinedIcon/></ExtensionButton>
      </Tooltip>
    </ExtensionBox>

    <TextInputBox   
        component="form"
        id = {'chatbot_container'}
        name = 'chatbot_container'
        onSubmit={Submit}
        sx ={(theme) => ({ 
          background: theme.palette.primary.third,
          border: 'none'
         })}
        noValidate>
      <TextField
        name="chatbot_input"
        id="chatbot_input"
        autoFocus
        multiline
        maxRows={4}
        placeholder='Hỏi cái gì đó đi'
        value = {input}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            Click(input)
            Submit(e); // Gọi submit khi nhấn Enter
          }
        }}
        onChange={(e) => setInput(e.target.value)}
        sx = {theme => ({ 
          width: '100%',
          '.MuiOutlinedInput-root': {
            paddingY: 0,
            '.MuiOutlinedInput-notchedOutline' : {
              border: 'none'
            },
            '.MuiOutlinedInput-input': {
                color: theme.palette.text.secondary,
                fontSize: '0.825rem'
            },
          }
      })}/>
      <Button 
        type="submit"
        onClick={() => Click(input)}
        sx = {(theme) => ({ 
          background: theme.palette.primary.main, 
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
          color: '#fff',
          paddingY: 1
        })}>
        <NearMeIcon fontSize='1.25rem'/>
      </Button>
    </TextInputBox>
  </ChatBox>
  )
}

export default TextInput
