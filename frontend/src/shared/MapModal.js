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

const MapModal = (props) => {
  const confirmDeleteHandler = () => {
    props.confirmDelete()
    console.log('place deleted successfully!')
    props.removeModal()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h4" component="div">
          {props.title} {props.cord}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The Map
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MapModal
