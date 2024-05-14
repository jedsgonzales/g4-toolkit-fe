import * as Yup from 'yup'
import { Link as RouterLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useFormik, Form, FormikProvider } from 'formik'
// icons
import CloseIcon from '@mui/icons-material/Close'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

// material
import { styled } from '@mui/material/styles'
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Box,
  Link,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Container,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { authLogin, authValidate } from 'src/redux/authSlice'

// ----------------------------------------------------------------------
const ContentStyle = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent: 'center',
  //padding: theme.spacing(1, 0)
}))
// ----------------------------------------------------------------------

interface Values {
  email: string;
  password: string;
  remember: boolean;
}

const initialValues: Values = {
  email: localStorage.remember === 'true' ? localStorage.email : '',
  password: localStorage.remember === 'true' ? localStorage.password : '',
  remember: localStorage.remember === 'true' ? true : false,
  //recaptcha: '',
}

const validationSchema = Yup.object({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  //recaptcha: Yup.string().required('Recaptcha is required')
})

export default function Login() {

  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  //const isMountedRef = useIsMountedRef()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const auth = useSelector((state: any) => state.auth)

  //console.log(auth)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: Values, { setSubmitting }) => {

      if (values.remember === true && values.email !== '' && values.password !== '') {
        localStorage.email = values.email
        localStorage.password = values.password
        localStorage.remember = values.remember
      }
      else {
        localStorage.email = ''
        localStorage.password = ''
        localStorage.remember = false
      }

      try {
        await dispatch(authLogin(values))
        await dispatch(authValidate({}))
        //await dispatch(userRead({ id: user.id }))

        enqueueSnackbar('Login success', {
          variant: 'success',
          action: (key) => (
            <IconButton size='small' onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          )
        })
        //if (isMountedRef.current) {
        setSubmitting(false)
        //}
      } catch (error: any) {
        console.log(error)
        //if (isMountedRef.current) {
        //  setErrors({ afterSubmit: error.message })
        setSubmitting(false)
        enqueueSnackbar(error.message, {
          variant: 'error',
          action: (key) => (
            <IconButton size='small' onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          )
        })
        //}
      }
    }
  })
  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik

  useEffect(() => {
    if (auth.data?.roles?.includes('admin') && !pathname.includes('/admin/')) {
      console.log('move to admin dashboard')
      navigate('/admin', { replace: true })
    }
    else if (auth.data?.roles?.includes('user') && !pathname.includes('/user/')) {
      console.log('move to user dashboard')
      navigate('/user', { replace: true })
    }
    //else {
    //  googleLogout()
    //}
    /*
    if (auth.id && !pathname.includes('/dashboard/')) {
      console.log('move to dashbord', auth)
      navigate('/dashboard', { replace: true })
    }
    */
  }, [navigate, auth.data?.roles, pathname])

  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Sign in
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
        </Stack>

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="email"
                type="email"
                label="Email address"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                disabled={isSubmitting}
              />
              <TextField
                fullWidth
                autoComplete="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                {...getFieldProps('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                disabled={isSubmitting}
              />
              <FormControl
                required
                error={Boolean(touched.remember && errors.remember)}
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      {...getFieldProps('remember')}
                      checked={values.remember}
                    />
                  }
                  label="Remember me"
                />
                <FormHelperText>{touched.remember && errors.remember}</FormHelperText>
              </FormControl>
              {auth.error && <Alert severity='error'>{auth.error}</Alert>}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Login
                </LoadingButton>
              </Box>
              <Link variant="subtitle2" component={RouterLink} to="/">Go Home</Link>

            </Stack>
          </Form>
        </FormikProvider>

      </ContentStyle>
    </Container>
  )
}