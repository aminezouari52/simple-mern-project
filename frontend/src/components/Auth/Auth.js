import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { logActions } from '../../store/store'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { places, users } from '../../utils/database'
import './Auth.css'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [haveAccount, setHaveAccount] = useState(true)
  const nameRef = useRef('')
  const passRef = useRef('')
  const ageRef = useRef(0)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const accountHandler = () => {
    setHaveAccount((prevState) => !prevState)
  }

  const loginHandler = () => {
    dispatch(logActions.logIn())
    navigate('/')
  }

  const addUserHandler = () => {
    let name = nameRef.current.value
    let pass = passRef.current.value
    let age = ageRef.current.value

    users.push({
      id: users[users.length - 1].id + 1,
      name,
      age,
      place: [2],
    })
    dispatch(logActions.logIn())
    navigate('/')
  }

  let form
  if (haveAccount)
    form = (
      <div>
        {' '}
        <Input id="email" label="Email" type="email" />
        <Input id="password" label="Password" type="password" />
      </div>
    )
  else
    form = (
      <div>
        {' '}
        <Input id="name" label="Name" type="name" inputRef={nameRef} />
        <Input
          id="password"
          label="Password"
          type="password"
          inputRef={passRef}
        />
        <Input id="age" label="Age" type="number" inputRef={ageRef} />
      </div>
    )
  return (
    <div className="auth">
      {form}

      <div className="buttons">
        {haveAccount && (
          <Button type="button" onClick={loginHandler}>
            Login
          </Button>
        )}
        {!haveAccount && (
          <Button type="button" onClick={addUserHandler}>
            Sign up
          </Button>
        )}

        <Button type="button" onClick={accountHandler}>
          switch
        </Button>
      </div>
    </div>
  )
}

export default Auth
