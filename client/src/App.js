import React from 'react'
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import Puzzle from './views/Puzzle'
import Register from './views/Register'
import User from './views/User'
import VerifyEmail from './views/VerifyEmail'

import { useAuthed } from './hooks/useAuthed'
import Admin from './views/Admin'
import LeaderboardPage from './views/LeaderboardPage'
import Loading from './views/Loading'
import RankedPuzzle from './views/RankedPuzzle'
import Welcome from './views/Welcome'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/ranked"
          element={
            <RequireAuth redirectTo="/login">
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
        <Route
          path="/admin"
          element={
            <RequireAuth redirectTo="/">
              <Admin />
            </RequireAuth>
          }
        />
        <Route path="/casual" element={<Puzzle />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
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
  const { loading, isAuthenticated } = useAuthed()

  return loading ? <Loading /> : isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default App
