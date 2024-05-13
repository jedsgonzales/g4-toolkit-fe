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
  FormControlLabel,
  Checkbox,
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
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { usersCreate, usersUpdate, usersDelete } from 'src/redux/usersSlice'
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

UsersCreate.propTypes = {
  user: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

interface Values {
  id: string
  date: string
  email: string
  username: string
  firstname: string
  lastname: string
  roles: Array<string>
}

const initialValues: Values = {
  id: '',
  date: '',
  email: '',
  username: '',
  firstname: '',
  lastname: '',
  roles: ['user']
}

const validationSchema = Yup.object({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  username: Yup.string(),
  firstname: Yup.string(),
  lastname: Yup.string(),
  roles: Yup.array().required('Role(s) is required'),
  //recaptcha: Yup.string().required('Recaptcha is required')
})

export default function UsersCreate({ user, open, handleClose }: any) {
  const isUpdate = user ? true : false

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
          await dispatch(usersUpdate(values))
        }
        else {
          await dispatch(usersCreate(values))
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

  const { errors, values, setFieldValue, touched, handleSubmit, isSubmitting, setSubmitting, getFieldProps } = formik

  const handleDelete = async () => {
    try {
      setOpenConfirm(false)
      setSubmitting(true)
      await dispatch(usersDelete({ id: user?.id }))
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

  const handleChangeRoles = (event: any) => {
    let arr = [...values.roles]
    if (event.target.checked) {
      arr.push(event.target.name)
    }
    else {
      const idx = arr.indexOf(event.target.name)
      if (idx > -1) arr.splice(idx, 1)
    }
    setFieldValue('roles', arr)
  }

  return (
    <BootstrapDialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <BootstrapDialogTitle /* id="customized-dialog-title" */ onClose={handleClose}>User</BootstrapDialogTitle>
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
                      label="Email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      {...getFieldProps('username')}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Firstname"
                      {...getFieldProps('firstname')}
                      error={Boolean(touched.firstname && errors.firstname)}
                      helperText={touched.firstname && errors.firstname}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Lastname"
                      {...getFieldProps('lastname')}
                      error={Boolean(touched.lastname && errors.lastname)}
                      helperText={touched.lastname && errors.lastname}
                    />
                  </Grid>


                  <Grid item xs={12} sm={12} alignItems='center'>
                    <FormControlLabel
                      control={
                        <Checkbox checked={values.roles.includes('admin')} onChange={handleChangeRoles} name="admin" />
                      }
                      label="Admin"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={values.roles.includes('user')} onChange={handleChangeRoles} name="user" />
                      }
                      label="User"
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