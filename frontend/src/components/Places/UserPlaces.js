import React from 'react'

import { useParams } from 'react-router-dom'
import { users, places } from '../../utils/database'
import PlaceItem from './PlaceItem'

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
        <p key={place.id}>
          This user visited: <b>{place.title}</b>! wich is a{' '}
          <b>{place.description}</b>!
        </p>
      ))}
    </>
  )
}

export default UserPlaces
