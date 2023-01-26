import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'

const UpdatePlace = (props) => {
  const params = useParams()
  const placeId = +params.pid

  const navigate = useNavigate()

  // const placeChangeHandler = () => {
  //   for (let i = 0; i < users.length; i++) {
  //     for (let j = 0; j < users[i].place.length; j++) {
  //       if (users[i].place[j].id === placeId) {
  //         users[i].place[j].title = titleRef.current.value
  //         users[i].place[j].description = descriptionRef.current.value
  //         console.log('place updated successfully!')
  //         navigate('/')
  //         break
  //       }
  //     }
  //   }
  // }

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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
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
      <Button
        sx={{ m: 2 }}
        variant="contained"
        disabled={!formik.isValid}
        type="submit"
      >
        UPDATE PLACE
      </Button>
    </Box>
  )
}

export default UpdatePlace
