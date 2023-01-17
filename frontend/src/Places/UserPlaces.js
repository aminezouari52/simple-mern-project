import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'
import { users } from '../utils/database'
import UserPlaceItem from './UserPlaceItem'

import './UserPlaces.css'

const UserPlaces = (props) => {
  const params = useParams()
  const userId = params.userId

  console.log(userId)

  const [userPlaces, setUserPlaces] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/places/user/${userId}`
      )

      const responseData = response.data.data

      console.log(responseData)

      setUserPlaces(responseData)
    }
    getUsers()
  }, [userId])

  return (
    <>
      {userPlaces.map((place) => (
        <UserPlaceItem
          key={place._id}
          id={place._id}
          title={place.title}
          description={place.description}
        />
      ))}
    </>
  )
}

export default UserPlaces
