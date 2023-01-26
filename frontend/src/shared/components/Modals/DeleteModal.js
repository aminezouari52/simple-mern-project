import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from '@mui/material'

const DeleteModal = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h4" component="div">
          Are You Sure?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are You Sure You Want To Delete? Note That It Cannot Be Undone!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.close}
          autoFocus
          color="error"
          variant="outlined"
        >
          Confirm
        </Button>
        <Button
          onClick={props.close}
          autoFocus
          color="error"
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteModal
