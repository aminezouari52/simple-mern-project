import React from 'react'

import { NavLink } from 'react-router-dom'

import './Header.css'

const Header = (props) => {
  return (
    <header className="header">
      <NavLink to="/" className="title">
        My Place!
      </NavLink>
      <div className="nav">
        <NavLink to="/">Users</NavLink>
        <NavLink to="auth" style={{ borderColor: 'lightgreen' }}>
          Authenticate
        </NavLink>
        <NavLink to="places/new" style={{ borderColor: 'red' }}>
          New
        </NavLink>
      </div>
    </header>
  )
}

export default Header
