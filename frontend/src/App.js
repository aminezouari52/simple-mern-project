import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header/Header'
import UserList from './components/Users/UsersList'
import UserPlaces from './components/Places/UserPlaces'
import NewPlace from './components/Places/NewPlace'
import UpdatePlace from './components/Places/UpdatePlace'
import Auth from './components/Auth/Auth'

import { users } from './shared/utils/database'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('http://localhost:5000/api/users/')
      const responseData = response.data.data.data
      console.log(responseData)

      setUsers(responseData)
    }
    getUsers()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<UserList items={users} />} />

          <Route path="/:userId/places" element={<UserPlaces />} />

          <Route path="auth" element={<Auth />} />

          <Route path="/places/new" element={<NewPlace />} />

          <Route path="/places/:pid" element={<UpdatePlace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
