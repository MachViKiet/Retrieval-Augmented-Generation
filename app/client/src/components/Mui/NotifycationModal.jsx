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
        <DialogTitle id="alert-dialog-title">
          <Typography variant='p'
              sx = {{ color: theme => theme.palette.text.secondary }}
            >{title || 'Sổ tay sinh viên'}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant='p'
              sx = {{ color: theme => theme.palette.text.secondary }}
            >{content || 'Làm biếng quá chưa làm ☹️'}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={modalHandler?.close}
          sx = {{ color: theme => theme.palette.text.secondary }}> Đóng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}