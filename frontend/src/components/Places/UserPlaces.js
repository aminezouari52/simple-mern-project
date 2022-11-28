import React from 'react'

import { useParams } from 'react-router-dom'
import { users } from '../../utils/database'
import UserPlaceItem from './UserPlaceItem'

import './UserPlaces.css'

const UserPlaces = (props) => {
  const params = useParams()
  const userId = +params.userId

  return (
    <>
      {users[userId].place.map((place) => (
        <UserPlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          description={place.description}
        />
      ))}
    </>
  )
}

export default UserPlaces
