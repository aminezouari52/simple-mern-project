import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import UserList from './components/Users/UserList'
import UserPlaces from './components/Places/UserPlaces'
import NewPlace from './components/Places/NewPlace'
import UpdatePlace from './components/Places/UpdatePlace'
import Auth from './components/Auth/Auth'

import { users } from './utils/database'
import './App.css'

function App() {
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
