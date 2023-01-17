import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { logActions } from '../../shared/store/store'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { users } from '../../shared/utils/database'
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
    let name = nameRef.current.value

    for (let i = 0; i < users.length; i++) {
      if (users[i].name === name) {
        dispatch(logActions.logIn(users[i].id))
        navigate('/')
        return
      }
    }

    console.log('user not found')
  }

  const addUserHandler = () => {
    let name = nameRef.current.value
    // let pass = passRef.current.value
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
        <Input id="name" label="Name" type="text" inputRef={nameRef} />
        <Input id="password" label="Password" type="password" />
      </div>
    )
  else
    form = (
      <div>
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
