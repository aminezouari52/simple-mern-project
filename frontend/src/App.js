import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import NewUser from './components/Users/NewUser'
import UserList from './components/Users/UserList'
import './App.css'

let users = [
  {
    id: 0,
    name: 'amine',
    age: 20,
  },
  {
    id: 1,
    name: 'ahmed',
    age: 25,
  },
  {
    id: 2,
    name: 'yesin',
    age: 19,
  },
]

function App() {
  const [loadedUsers, setLoadedUsers] = useState(users)

  const addUserHandler = (userId, userName, userAge) => {
    const newUser = {
      id: +userId,
      name: userName,
      age: +userAge,
    }

    setLoadedUsers((prevUsers) => {
      return prevUsers.concat(newUser)
    })
  }

  return (
    <>
      <Header />
      <main>
        <NewUser onAddUser={addUserHandler} />
        <UserList items={loadedUsers} />
      </main>
    </>
  )
}

export default App
