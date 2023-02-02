import React from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
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

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values, formikBag) => {
      const response = await sendRequest(
        'http://localhost:5000/api/users/signup/',
        'POST',
        { name: values.name, email: values.email, password: values.password },
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
        maxWidth="xs"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...formik.getFieldProps('name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={NavLink} variant="body2" to="/auth/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default SignUp
