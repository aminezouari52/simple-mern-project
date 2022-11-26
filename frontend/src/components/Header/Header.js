import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logActions } from '../../store/store'

import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../UI/Button/Button'

import './Header.css'

const Header = (props) => {
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.value)
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logActions.logOut())
    navigate('/')
  }

  return (
    <header className="header">
      <NavLink to="/" className="title">
        My Place!
      </NavLink>
      <div className="nav">
        <NavLink to="/">Users</NavLink>
        {loggedIn && (
          <>
            <NavLink to="places/new">New</NavLink>
            <Button type="button" onClick={logoutHandler}>
              Log Out
            </Button>
          </>
        )}
        {!loggedIn && <NavLink to="auth">Authenticate</NavLink>}
      </div>
    </header>
  )
}

export default Header
