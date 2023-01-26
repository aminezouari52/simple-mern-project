import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import PlaceList from '../components/PlaceList'

const UserPlaces = (props) => {
  const userId = useParams().userId
  const [loadedPlaces, setLoadedPlaces] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/places/user/${userId}`
      )

      const responseData = response.data.data
      setLoadedPlaces(responseData)
    }
    getUsers()
  }, [userId])

  return <PlaceList items={loadedPlaces} />
}

export default UserPlaces
