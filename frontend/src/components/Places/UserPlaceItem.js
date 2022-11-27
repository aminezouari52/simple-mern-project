import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import './UserPlaceItem.css'
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'
import { users } from '../../utils/database'

const UserPlaceItem = (props) => {
  const [confirmDelete, setConfimDelete] = useState(false)

  const loggedIn = useSelector((state) => state.value)
  const navigate = useNavigate()

  const editHandler = () => {
    navigate(`/places/${props.id}`)
  }

  const params = useParams()
  const userId = +params.userId

  const deletePlaceHandler = () => {
    setConfimDelete((prevState) => !prevState)
  }

  const removeModalHandler = () => {
    setConfimDelete(false)
  }
  const confirmDeleteHandler = () => {
    console.log(users[userId].place)

    users[userId].place.splice(props.id, 1)

    for (let i = props.id + 1; i < users[userId].place.length; i++) {
      users[userId].place[i].id--
    }

    console.log('deleted')
  }

  return (
    <div className="container">
      {confirmDelete && (
        <Modal
          removeModal={removeModalHandler}
          confirmDelete={confirmDeleteHandler}
        />
      )}
      <div>img placeholder</div>
      <h3>Title: {props.title} </h3>
      <p>{props.description}</p>
      {loggedIn && (
        <div>
          <Button type="button" onClick={editHandler}>
            Edit
          </Button>
          <Button type="button" onClick={deletePlaceHandler}>
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserPlaceItem
