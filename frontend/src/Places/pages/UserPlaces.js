import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useHttpClient } from '../../shared/http-hook'

import PlaceList from '../components/PlaceList'

import { Backdrop, CircularProgress } from '@mui/material'

const UserPlaces = (props) => {
  const userId = useParams().userId
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const { isLoading, sendRequest } = useHttpClient()

  useEffect(() => {
    const fetchUsersPlaces = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/places/user/${userId}`
      )
      setLoadedPlaces(response.data.places)
      console.log(response)
    }
    fetchUsersPlaces()
  }, [userId])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <PlaceList items={loadedPlaces} />
    </>
  )
}

export default UserPlaces
