import React, { useState } from 'react'

import './Auth.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const Auth = () => {
  const [haveAccount, setHaveAccount] = useState(true)

  const accountHandler = () => {
    setHaveAccount((prevState) => !prevState)
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
        <Input id="email" label="Email" type="email" />
        <Input id="password" label="Password" type="password" />
        <Input id="name" label="Name" type="name" />
        <Input id="age" label="Age" type="number" />
      </div>
    )
  return (
    <div className="auth">
      {form}

      <div className="buttons">
        {haveAccount && <Button type="submit">Login</Button>}
        {!haveAccount && <Button type="submit">Sign up</Button>}

        <Button type="button" onClick={accountHandler}>
          switch
        </Button>
      </div>
    </div>
  )
}

export default Auth
