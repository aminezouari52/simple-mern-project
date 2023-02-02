import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

import { useHttpClient } from '../../shared/http-hook'

import { Button, TextField, Box } from '@mui/material'

const NewPlace = () => {
  const navigate = useNavigate()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const userId = useSelector((state) => state.id)

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      adress: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      description: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      adress: Yup.string()
        .max(5, 'Must be 5 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      console.log(userId)
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        {
          title: values.title,
          description: values.description,
          // image: 'test1',
          address: values.adress,
          // location: { lat: 1, lng: 2 },
          creator: userId,
        },
        {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      )
      navigate(`/${userId}/places`)
    },
  })

  return (
    <Box
      component="form"
      sx={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        // border: 1,
        borderColor: 'grey.500',
        borderRadius: '16px',
      }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        sx={{ m: 3 }}
        id="title"
        label="Title"
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        {...formik.getFieldProps('title')}
      />
      <TextField
        sx={{ m: 3 }}
        id="description"
        label="Description"
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        {...formik.getFieldProps('description')}
      />
      <TextField
        sx={{ m: 3 }}
        id="adress"
        label="Adress"
        error={formik.touched.adress && Boolean(formik.errors.adress)}
        helperText={formik.touched.adress && formik.errors.adress}
        {...formik.getFieldProps('adress')}
      />

      <Button
        sx={{ m: 2 }}
        variant="contained"
        disabled={!formik.isValid}
        type="submit"
      >
        ADD PLACE
      </Button>
    </Box>
  )
}

export default NewPlace
