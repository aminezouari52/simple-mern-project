import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'

const NewPlace = () => {
  const titleRef = useRef()
  const descriptionRef = useRef()

  const id = localStorage.getItem('id')

  const navigate = useNavigate()

  // const addPlaceHandler = () => {
  //   const title = titleRef.current.value
  //   const description = descriptionRef.current.value

  //   if (!title || !description)
  //     console.log('please enter title and description')
  //   else if (!id)
  //     console.log(
  //       'you are not logged in, please log in in order to add a place'
  //     )
  //   else {
  //     for (let i = 0; i < users.length; i++) {
  //       if (users[i].id === +id) {
  //         let userPlaces = users[i].place
  //         userPlaces.push({
  //           id: userPlaces[userPlaces.length - 1] + 1,
  //           title,
  //           description,
  //         })
  //         console.log('place added!')
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