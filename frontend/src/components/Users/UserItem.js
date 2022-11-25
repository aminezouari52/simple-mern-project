import React from 'react'
import { useNavigate } from 'react-router-dom'

import './UserItem.css'

const UserItem = (props) => {
  let navigate = useNavigate()

  const detailsHandler = () => {
    navigate(`/${props.id}/places`)
  }

  return (
    <li className="user-item" onClick={detailsHandler}>
      <h5>id: {props.id}</h5>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <h6>Places: {props.place.length}</h6>
    </li>
  )
}

export default UserItem
