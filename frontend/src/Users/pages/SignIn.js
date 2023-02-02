import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDispatch } from 'react-redux'
import { logActions } from '../../shared/store'
import { useHttpClient } from '../../shared/http-hook'

import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Backdrop,
  CircularProgress,
} from '@mui/material'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      const response = await sendRequest(
        'http://localhost:5000/api/users/login/',
        'POST',
        { email: values.email, password: values.password },
        {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      )
      navigate('/')
      dispatch(logActions.logIn(response.data.data._id))
    },
  })

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          fontSize: 40,
        }}
        open={Boolean(error)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
          }}
        >
          <Box sx={{ m: 4 }}>{error}</Box>
          <Button
            variant="contained"
            color="error"
            sx={{ width: 160 }}
            onClick={() => {
              clearError()
            }}
          >
            close
          </Button>
        </Box>
      </Backdrop>

      <Container
        component="main"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 600,
          minWidth: 350,
          maxWidth: 'xs',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} variant="body2" to="/auth/signup">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default SignIn
