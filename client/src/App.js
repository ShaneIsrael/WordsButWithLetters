import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import User from './views/User'
import Puzzle from './views/Puzzle'
import VerifyEmail from './views/VerifyEmail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Puzzle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:email/:token" element={<VerifyEmail />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </Router>
  )
}

export default App
