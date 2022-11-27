import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { users } from '../../utils/database'
import UserPlaceItem from './UserPlaceItem'

import './UserPlaces.css'

const UserPlaces = (props) => {
  const [placesObjs, setPlacesObj] = useState([])

  const params = useParams()

  useEffect(() => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === +params.userId) {
        setPlacesObj(users[i].place)
        break
      }
    }
  }, [placesObjs, params.userId])

  return (
    <>
      {placesObjs.map((place) => (
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
