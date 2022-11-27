import React, { useRef } from 'react'

import './NewPlace.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { users } from '../../utils/database'
import { useNavigate } from 'react-router-dom'

const NewPlace = () => {
  const titleRef = useRef()
  const descriptionRef = useRef()

  const id = localStorage.getItem('id')

  const navigate = useNavigate()

  const addPlaceHandler = () => {
    const title = titleRef.current.value
    const description = descriptionRef.current.value

    if (!title || !description)
      console.log('please enter title and description')
    else if (!id)
      console.log(
        'you are not logged in, please log in in order to add a place'
      )
    else {
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === +id) {
          let userPlaces = users[i].place
          userPlaces.push({
            id: userPlaces[userPlaces.length - 1] + 1,
            title,
            description,
          })
          console.log('place added!')
          navigate('/')
          break
        }
      }
    }
  }

  return (
    <div className="auth">
      <Input id="title" label="Title" type="text" inputRef={titleRef} />
      <Input
        id="description"
        label="Description"
        type="text"
        inputRef={descriptionRef}
      />
      <Button type="button" onClick={addPlaceHandler}>
        Add
      </Button>
    </div>
  )
}

export default NewPlace
