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
        <NavLink to="authenticate" style={{ borderColor: 'lightgreen' }}>
          Authenticate
        </NavLink>
        <div style={{ borderColor: 'red' }}>New</div>
      </div>
    </header>
  )
}

export default Header
