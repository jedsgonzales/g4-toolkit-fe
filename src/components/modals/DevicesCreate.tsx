import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
// materials
import { styled } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Grid,
  TextField,
  Box,
} from '@mui/material'
// icons
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
// form
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
// utils
// hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef'
// redux
import { ThunkDispatch } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import { devicesCreate, devicesUpdate, devicesDelete } from 'src/redux/devicesSlice'
// components
import Scrollbar from 'src/components/Scrollbar'
import Confirm from 'src/components/modals/common/Confirm'

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

DevicesCreate.propTypes = {
  device: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

interface Values {
  id: string
  date: string
  name: string
}

const initialValues: Values = {
  id: '',
  date: '',
  name: ''
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
})

export default function DevicesCreate({ device, open, handleClose }: any) {
  const isUpdate = device ? true : false

  //const dispatch = useDispatch()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const isMountedRef = useIsMountedRef()

  const [openConfirm, setOpenConfirm] = useState(false)


  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (isUpdate) {
          await dispatch(devicesUpdate(values))
        }
        else {
          await dispatch(devicesCreate(values))
        }
        resetForm()
        if (isMountedRef.current) {
          setSubmitting(false)
          handleClose()
        }
      } catch (error: any) {
        if (isMountedRef.current) {
          enqueueSnackbar(error.message, {
            variant: 'error',
            action: (key) => (
              <IconButton size="small" onClick={() => closeSnackbar(key)}>
                <CloseIcon />
              </IconButton>
            )
          })
          setSubmitting(false)
        }
      }
    }
  })

  const { errors, touched, handleSubmit, isSubmitting, setSubmitting, getFieldProps } = formik

  const handleDelete = async () => {
    try {
      setOpenConfirm(false)
      setSubmitting(true)
      await dispatch(devicesDelete({ id: device?.id }))
      if (isMountedRef.current) {
        setSubmitting(false)
      }
      handleClose()
    }
    catch (error: any) {
      if (isMountedRef.current) {
        enqueueSnackbar(error.message, {
          variant: 'error',
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          )
        })
        setSubmitting(false)
      }
    }
  }

  return (
    <BootstrapDialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <BootstrapDialogTitle /* id="customized-dialog-title" */ onClose={handleClose}>Device</BootstrapDialogTitle>
      <Confirm open={openConfirm} handleClose={() => setOpenConfirm(false)} handleConfirm={handleDelete} />
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <Scrollbar
              sx={{
                height: '400px',
                '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' },
              }}
            >
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={8} sm={8}>
                    <TextField
                      fullWidth
                      label="ID"
                      {...getFieldProps('id')}
                      error={Boolean(touched.id && errors.id)}
                      helperText={touched.id && errors.id}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <TextField
                      fullWidth
                      label="Date"
                      {...getFieldProps('date')}
                      error={Boolean(touched.date && errors.date)}
                      helperText={touched.date && errors.date}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Scrollbar>
          </DialogContent>
          <DialogActions>
            {isUpdate && (
              <LoadingButton
                variant="outlined"
                color="error"
                size="large"
                startIcon={<DeleteIcon />}
                loading={isSubmitting}
                onClick={() => setOpenConfirm(!openConfirm)}
              >
                Delete
              </LoadingButton>
            )}
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              loading={isSubmitting}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider >
    </BootstrapDialog >
  )
}