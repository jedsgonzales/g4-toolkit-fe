import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  IconButton,
  Button
} from '@mui/material'
// icons
import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  }
}))

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function Confirm(props: any) {
  return (
    <BootstrapDialog open={props.open} onClose={props.handleClose}>
      <BootstrapDialogTitle /*id="customized-dialog-title"*/ onClose={props.handleClose}>Confirm</BootstrapDialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>No</Button>
        <Button onClick={props.handleConfirm}>Yes</Button>
      </DialogActions>
    </BootstrapDialog>
  )
}