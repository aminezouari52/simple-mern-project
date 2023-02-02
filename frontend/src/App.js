import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './shared/Header'
import Users from './Users/pages/Users'
import UserPlaces from './Places/pages/UserPlaces'
import NewPlace from './Places/pages/NewPlace'
import UpdatePlace from './Places/pages/UpdatePlace'
import SignIn from './Users/pages/SignIn'
import SignUp from './Users/pages/SignUp'

import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />

          <Route path="/:userId/places" element={<UserPlaces />} />

          <Route path="/auth/signin" element={<SignIn />} />

          <Route path="/auth/signup" element={<SignUp />} />

          <Route path="/places/new" element={<NewPlace />} />

          <Route path="/places/:pid" element={<UpdatePlace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
