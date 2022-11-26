import React from 'react'

import { NavLink } from 'react-router-dom'
import Button from '../UI/Button/Button'

import './Header.css'

const Header = (props) => {
  const logoutHandler = () => {
    console.log('logout')
  }

  return (
    <header className="header">
      <NavLink to="/" className="title">
        My Place!
      </NavLink>
      <div className="nav">
        <NavLink to="/">Users</NavLink>
        <NavLink to="auth">Authenticate</NavLink>

        <NavLink to="places/new">New</NavLink>
        <Button type="button" onClick={logoutHandler}>
          Log Out
        </Button>
      </div>
    </header>
  )
}

export default Header
