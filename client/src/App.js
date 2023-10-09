import React from 'react'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import User from './views/User'
import Puzzle from './views/Puzzle'
import VerifyEmail from './views/VerifyEmail'

import { useAuthed } from './hooks/useAuthed'
import Loading from './views/Loading'
import RankedPuzzle from './views/RankedPuzzle'
import Leaderboard from './views/Leaderboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/casual">
              <RankedPuzzle />
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth redirectTo="/login">
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/casual" element={<Puzzle />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:email/:token" element={<VerifyEmail />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </Router>
  )
}

function RequireAuth({ children, redirectTo }) {
  let { loading, isAuthenticated } = useAuthed()

  return loading ? <Loading /> : isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default App
