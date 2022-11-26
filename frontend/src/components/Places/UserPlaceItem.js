import React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './UserPlaceItem.css'
import Button from '../UI/Button/Button'

const UserPlaceItem = (props) => {
  const loggedIn = useSelector((state) => state.value)
  const navigate = useNavigate()

  const editHandler = () => {
    navigate(`/places/${props.id}`)
  }

  return (
    <div className="container" key={props.keyProp}>
      <div>img placeholder</div>
      <h3>Title: {props.title} </h3>
      {loggedIn && (
        <div>
          <Button type="button" onClick={editHandler}>
            Edit
          </Button>
          <Button type="button">Delete</Button>
        </div>
      )}
    </div>
  )
}

export default UserPlaceItem
