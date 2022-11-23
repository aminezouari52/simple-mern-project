import React, { useState } from 'react'

import Input from '../Input/Input'
import Button from '../Button/Button'
import './NewUser.css'

const NewUser = (props) => {
  const [enteredId, setEnteredId] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredAge, setEnteredAge] = useState('')

  const idChangeHandler = (event) => {
    setEnteredId(event.target.value)
  }
  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value)
  }
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value)
  }

  const submitUserHandler = (event) => {
    event.preventDefault()
    props.onAddUser(enteredId, enteredName, enteredAge)
  }

  return (
    <section id="new-user">
      <h2>Add a New User</h2>
      <form onSubmit={submitUserHandler}>
        <Input
          type="number"
          label="Id"
          id="id"
          value={enteredId}
          onChange={idChangeHandler}
        />
        <Input
          type="text"
          label="Name"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
        />
        <Input
          type="number"
          label="Age"
          min="0"
          max="30"
          id="age"
          value={enteredAge}
          onChange={ageChangeHandler}
        />
        <Button type="submit">ADD USER</Button>
      </form>
    </section>
  )
}

export default NewUser
