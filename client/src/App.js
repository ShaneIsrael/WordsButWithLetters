import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import User from './views/User'
import TestPage from './views/TestPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </Router>
  )
}

export default App
