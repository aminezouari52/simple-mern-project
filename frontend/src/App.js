import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import NewUser from './components/Users/NewUser'
import UserList from './components/Users/UserList'
import PlacesList from './components/Places/PlacesList'
import UserPlaces from './components/Places/UserPlaces'

import { users, places } from './utils/database'
import './App.css'

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
        <Routes>
          <Route path="/" element={<UserList items={loadedUsers} />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="places/" element={<PlacesList items={places} />} />
        </Routes>

        {/* <NewUser onAddUser={addUserHandler} /> */}
      </main>
    </>
  )
}

export default App
