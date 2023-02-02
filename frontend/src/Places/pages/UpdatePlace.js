import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useHttpClient } from '../../shared/http-hook'

import { Button, TextField, Box } from '@mui/material'

const UpdatePlace = (props) => {
  const placeId = useParams().pid
  const navigate = useNavigate()

  const { sendRequest } = useHttpClient()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      description: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        { title: values.title, description: values.description },
        {
          'Content-Type': 'application/json',
        }
      )
      navigate(`/place/${placeId}`)
    },
  })

  return (
    <>
      {/* you can add loading spinner here */}
      <Box
        component="form"
        sx={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
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
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          {...formik.getFieldProps('description')}
        />
        <Button
          sx={{ m: 2 }}
          variant="contained"
          disabled={!formik.isValid}
          type="submit"
        >
          UPDATE PLACE
        </Button>
      </Box>
    </>
  )
}

export default UpdatePlace
