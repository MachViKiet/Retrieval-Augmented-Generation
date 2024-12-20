import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function NotifycationModal({ 
  modalHandler = null,
  title = null,
  content = null
}) {

  return (
    <React.Fragment>
      <Dialog
        open={modalHandler?.state}
        onClose={modalHandler?.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx = {{ width: '300px' }}>
          <Typography variant='p'
            >{title || 'Nguồn Trích Dẫn'}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant='p'
            >{content || 'Xin lỗi bạn, tính năng này chưa được hỗ trợ ☹️'}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => { modalHandler?.action(e), modalHandler?.close()}} sx = {{ color: '#1fff3a' }}>{modalHandler?.actionName}</Button>
          <Button onClick={modalHandler?.close} sx = {{ color: '#ff6c57' }}> Đóng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}