import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Header from './shared/components/Header'
import UsersList from './Users/components/UsersList'
import UserPlaces from './Places/pages/UserPlaces'
import NewPlace from './Places/pages/NewPlace'
import UpdatePlace from './Places/pages/UpdatePlace'
import SignIn from './Users/pages/SignIn'
import SignUp from './Users/pages/SignUp'

import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('http://localhost:5000/api/users/')
      setUsers(response.data.data.data)
    }
    getUsers()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<UsersList items={users} />} />

          <Route path="/:userId/places" element={<UserPlaces />} />

          <Route path="/auth" element={<SignIn />}>
            <Route path="/auth" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Route>

          <Route path="/places/new" element={<NewPlace />} />

          <Route path="/places/:pid" element={<UpdatePlace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
