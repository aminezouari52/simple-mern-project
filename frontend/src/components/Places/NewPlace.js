import React from 'react'

import './NewPlace.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const NewPlace = () => {
  return (
    <div className="auth">
      {' '}
      <Input id="title" label="Title" type="text" />
      <Input id="description" label="Description" type="text" />
      <Button type="button">Add</Button>
    </div>
  )
}

export default NewPlace
