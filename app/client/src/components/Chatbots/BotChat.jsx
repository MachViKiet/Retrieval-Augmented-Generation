import React from 'react'
import { Typography } from '@mui/material';
import BubbleChatLeft from '~/components/Chatbots/BubbleChatLeft';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';

function BotChat({message,metadata, setOpenDetail, sx}) {

  const htmlContent = marked(message);
  console.log(htmlContent)

  return (
    <BubbleChatLeft
      sx = {sx?.box}
      text={
        <Typography variant='p'
          onClick = {() => {
          setOpenDetail(metadata.id)
        }} 
          sx = {{
            fontSize: '0.825rem',
            color: '#000',
            whiteSpace: 'pre-line', 
            textIndent: '1px', 
            lineHeight: 'normal',
            cursor: 'pointer' ,
            textAlign: 'start',
            ...sx?.text
          }}>
            {/* <ReactMarkdown>
              {message}
            </ReactMarkdown> */}
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{ whiteSpace: 'pre-line' }}
          />
        </Typography>
      }
    />
  )
}

export default BotChat