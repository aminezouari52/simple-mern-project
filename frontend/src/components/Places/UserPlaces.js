import React from 'react'

import { useParams } from 'react-router-dom'
import { users, places } from '../../utils/database'
import UserPlaceItem from './UserPlaceItem'

import './UserPlaces.css'

const UserPlaces = (props) => {
  const params = useParams()

  let placeArr
  users.forEach((u) => {
    if (u.id === +params.userId) placeArr = u.place
  })
  let placesObjs = []
  places.forEach((place) => {
    if (placeArr.includes(place.id)) placesObjs.push(place)
  })

  return (
    <>
      {placesObjs.map((place) => (
        <UserPlaceItem keyProp={place.id} title={place.title} />
      ))}
    </>
  )
}

export default UserPlaces
