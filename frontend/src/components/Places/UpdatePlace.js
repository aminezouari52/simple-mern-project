import React, { useRef } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import { users } from '../../utils/database'

const UpdatePlace = (props) => {
  const params = useParams()
  const placeId = +params.pid

  const titleRef = useRef()
  const descriptionRef = useRef()

  const navigate = useNavigate()

  const placeChangeHandler = () => {
    if (!titleRef.current.value || !descriptionRef.current.value) {
      console.log('please type a title and a description')
    } else {
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].place.length; j++) {
          if (users[i].place[j].id === placeId) {
            users[i].place[j].title = titleRef.current.value
            users[i].place[j].description = descriptionRef.current.value
            console.log('place updated successfully!')
            navigate('/')
            break
          }
        }
      }
    }
  }

  return (
    <div className="container">
      <Input id="title" label="Title" inputRef={titleRef} />
      <Input id="description" label="Description" inputRef={descriptionRef} />
      <Button type="button" onClick={placeChangeHandler}>
        Change
      </Button>
    </div>
  )
}

export default UpdatePlace
