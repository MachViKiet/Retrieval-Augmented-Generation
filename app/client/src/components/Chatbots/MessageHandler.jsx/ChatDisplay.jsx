import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Skeleton, Tooltip, Typography } from '@mui/material'
import { BubbleRight } from '../MessageEffect/BubbleRight'
import { BubbleLeft } from '../MessageEffect/BubbleLeft'
import { getTime } from '~/utils/GetTime'
import ReactMarkdown from 'react-markdown';
import NotifycationModal from '~/components/Mui/NotifycationModal'
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

export const ChatBlock_Style = {
  width: '100%',
  textAlign: 'justify',
  transition: '0.5s all ease',
}

export const ChatDisplay_Style = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'end',
  flexDirection: 'row-reverse',
  textAlign: 'justify',
  paddingBottom: '20px',
  background: 'transparent'
}

export const ChatMessage = styled(Box) (({theme}) => ({
  borderRadius: '5px',
  padding: theme.spacing(0.725),
  paddingRight:  theme.spacing(1.25),
  paddingLeft:  theme.spacing(1.25),
  position: 'relative',
  width: 'fit-content',
  height: 'fit-content',
  minWidth: '200px',
  maxWidth: '70%',
  transform: 'scale(1)',
  transition: '0.5s all ease',
}))

const ModelButton_Style = {
  padding: '3px 10px',
  width: 'fit-content',
  background: '#0214238c',
  color: '#fff',
  borderRadius: '8px',
  cursor: 'pointer',
  '&:active': { transform: 'scale(0.95)' }
}

function ChatDisplay({ loading = null, action = null, user = null , conservation = null }) {

  const [openDetail, setOpenDetail] = useState(false)
  const [openFeedback, setOpenFeedback] = useState(false)
  const [content, setContent] = useState('')

  return loading ? (
    <Box sx = {ChatBlock_Style}>
      {['',''].map(( _data, index) => ( <div key={ index*1251267 }>
        <Box sx = { ChatDisplay_Style }>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rounded" height={60} sx = {{ width: '100%', marginRight: '20px', maxWidth: '50%'}}/>
        </Box>

        <Box sx = {{ ...ChatDisplay_Style, justifyContent: 'start' }}>
          <Skeleton variant="rounded" height={60} sx = {{ width: '100%', marginLeft: '20px', maxWidth: '70%'}}/>
          <Skeleton variant="circular" width={40} height={40} />
        </Box> </div>
      ))}

    </Box>
  ) : (
    <Box sx = {ChatBlock_Style}>
      <Box sx = { ChatDisplay_Style }>
        <Avatar alt="User" src=
          {user?.avatar ? user.avatar : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" } />
          <ChatMessage sx = {{   
            background: 'linear-gradient(45deg, rgba(73,124,246,1) 47%, rgba(144,95,247,1) 100%)',
            marginRight: '20px',
            color: '#fff'
          }}>
          <BubbleRight/>

          <Typography sx = {{ fontSize: 'inherit', color: 'inherit' }}>
            {conservation?.question}
          </Typography>

          <Box sx = {{  width: '100%', display: 'flex',gap: 1, justifyContent: 'space-between', borderTop: '1px solid #fff', marginTop: 1, paddingTop: 1 }}>
              { conservation.state != 'in progress' ? <Tooltip title="re_prompt" placement="top">
                <IconButton 
                  onClick={() => action?.re_prompt && action.re_prompt(conservation?.question)}
                  sx = {{ padding: '1px' }}>
                  <RotateRightOutlinedIcon sx = {{ fontSize: '16px' }}/>
                </IconButton> 
              </Tooltip> : <CircularProgress size="14px" sx = {{ color: '#fff' }} /> }

              { conservation.state == 'success' && conservation?.rating == -1 && <Tooltip title="Đánh giá cuộc hội thoại" placement="top">
                <IconButton 
                  onClick={() => setOpenFeedback(true)}
                  sx = {{ padding: '1px' }}>
                  <QuestionAnswerOutlinedIcon sx = {{ fontSize: '16px' }}/>
                </IconButton> 
              </Tooltip> }

              { conservation?.rating != -1 && <Box sx = {{ display: 'flex' }}>{conservation?.rating}<StarIcon fontSize = 'small' sx = {{ color: 'yellow' }}/></Box> }

              <Typography component='p' sx = {{ fontSize: '0.725rem !important', textAlign: 'end', width: '100%' }}>{getTime(conservation?.create_at)}</Typography>
          </Box>
        </ChatMessage>
      </Box>

      { conservation.state != 'in progress' && <Box sx = {{ ...ChatDisplay_Style, justifyContent: 'start' }}>
          <ChatMessage sx = {{   
              marginLeft: '20px',
              background: 'linear-gradient(319deg, rgb(255 255 255) 0%, rgb(186 173 255) 100%)',
              color: '#000'
            }}>
            { typeof conservation?.anwser === "string" && <ReactMarkdown>
              { conservation?.anwser }
            </ReactMarkdown> }
            <BubbleLeft/>

            <Box sx = {{  width: '100%', borderTop: '1px solid #000', marginTop: 1, paddingTop: 1 }}>
              <Box sx = {{  display: 'flex', flexWrap: 'wrap', gap: 1, paddingBottom: 1, rowGap: '4px' }}>
                {conservation?.source && conservation?.source.map((data) => {
                  return <Box sx = {ModelButton_Style}
                    onClick = {() => { setOpenDetail(true); setContent(<a href={data?.url} target="_blank" rel="noopener noreferrer" style={{color: '#fff'}}>{data?.url}</a>)  } } > {useCode(data?.collection_name)} </Box>
                })}
              </Box>
              <Typography component='p' sx = {{ fontSize: '0.725rem !important', textAlign: 'end', width: '100%' }}>{getTime(conservation?.create_at)}</Typography>
            </Box>
          </ChatMessage>
          <Avatar alt="ChatBot" src="https://pics.craiyon.com/2023-06-08/8f12f7763653463289268bdca7185690.webp" />
        </Box>
      }

      <NotifycationModal
        content={content}
        modalHandler = {{
          state: openDetail,
          close: () => setOpenDetail(false) }}/>

      <FeedbackModal
        modalHandler = {{
          state: openFeedback,
          close: () => setOpenFeedback(false),
          action: (value) => action.addFeedback({rating: value, _id: conservation._id})
        }}
      />
      
    </Box>
  )
}

export default ChatDisplay


function FeedbackModal({ 
  modalHandler = null
}) {

  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(-1);

  return (
    <React.Fragment>
      <Dialog
        open={modalHandler?.state}
        onClose={modalHandler?.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant='p'
            >Bạn Có Hài Lòng Với Câu Trả Lời Không ?</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <HoverRating value = {{ value: value, action: setValue }}
            hover = {{ value: hover, action: setHover }}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => modalHandler?.action(value) && modalHandler?.close()} sx = {{ color: '#1fff3a' }}>Xác Nhận</Button>
          <Button onClick={modalHandler?.close} sx = {{ color: '#ff6c57' }}> Đóng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { GetURLFromMarkdown } from '~/utils/GetURLFromMarkdown'
import { useCode } from '~/hooks/useMessage'
const labels = {
  1: 'Hoàn Toàn Không Hài Lòng',
  2: 'Không Hài Lòng',
  3: 'Tạm Chấp Nhận',
  4: 'Tốt, Hài Lòng',
  5: 'Hoàn Toàn Hài Lòng',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function HoverRating({value, hover}) {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value.value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          if(!newValue) { return value.action(0) };
          value.action(newValue);
        }}
        onChangeActive={(event, newHover) => {
          if(!newHover) { return hover.action(0) };
          hover.action(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2, width: 'fit-content' }}>{labels[hover.hover !== -1 ? hover.value : value.value]}</Box>
    </Box>
  );
}