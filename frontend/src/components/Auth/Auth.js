import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { logActions } from '../../shared/store/store'
import { Button } from '@mui/material'
import { users } from '../../shared/utils/database'
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
        <input id="name" label="Name" type="text" inputref={nameRef} />
        <input id="password" label="Password" type="password" />
      </div>
    )
  else
    form = (
      <div>
        <input id="name" label="Name" type="name" inputref={nameRef} />
        <input
          id="password"
          label="Password"
          type="password"
          inputref={passRef}
        />
        <input id="age" label="Age" type="number" inputref={ageRef} />
      </div>
    )
  return (
    <div className="auth">
      {form}

      <div className="buttons">
        {haveAccount && <Button onClick={loginHandler}>Login</Button>}
        {!haveAccount && <Button onClick={addUserHandler}>Sign up</Button>}

        <Button onClick={accountHandler}>switch</Button>
      </div>
    </div>
  )
}

export default Auth
