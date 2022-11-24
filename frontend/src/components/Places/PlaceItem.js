import React from 'react'

import './PlaceItem.css'

const PlaceItem = (props) => {
  return (
    <li className="place-item">
      <h5>id: {props.id}</h5>
      <h2>{props.title}</h2>
      <p>description: {props.description}</p>
    </li>
  )
}

export default PlaceItem
