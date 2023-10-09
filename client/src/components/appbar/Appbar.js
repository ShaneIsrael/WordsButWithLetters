import React from 'react'
import { useTheme } from '@emotion/react'
import { Grid, Typography, Menu, MenuItem, MenuButton, Dropdown, IconButton, Box } from '@mui/joy'
import { AppBar, Toolbar } from '@mui/material'

import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreVert from '@mui/icons-material/MoreVert'

import { useAuthed } from '../../hooks/useAuthed'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Appbar({ setModalOpen, hideInstructions }) {
  const theme = useTheme()
  const navigate = useNavigate()

  let { isAuthenticated } = useAuthed()
  let { logout } = useAuth()

  const handleLogin = () => {
    navigate('/login')
  }
  const handleLogout = () => {
    logout()
  }

  return (
    <AppBar
      position="static"
      sx={{
        background: theme.palette.background.surface,
      }}
    >
      <Toolbar>
        <Grid container xs={4}>
          <Dropdown>
            <MenuButton
              sx={{
                display: {
                  xs: 'relative',
                  md: 'none',
                },
              }}
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
            >
              <MoreVert />
            </MenuButton>
            <Menu placement="bottom-start">
              <MenuItem onClick={isAuthenticated ? handleLogout : handleLogin}>
                {isAuthenticated ? 'Logout' : 'Login'}
              </MenuItem>
              <MenuItem onClick={() => navigate('/leaderboard')}>Leaderboards</MenuItem>
              {!hideInstructions && (
                <MenuItem
                  onClick={() => {
                    setModalOpen(true)
                  }}
                >
                  Instructions
                </MenuItem>
              )}
            </Menu>
          </Dropdown>
        </Grid>
        <Grid container xs={4} justifyContent="center">
          <Box onClick={() => navigate(isAuthenticated ? '/' : '/casual')} sx={{ cursor: 'pointer' }}>
            <Typography
              level="h2"
              textAlign="center"
              sx={{
                fontSize: {
                  xs: 18,
                  md: 32,
                },
              }}
            >
              Words But With Letters
            </Typography>
          </Box>
        </Grid>
        <Grid
          container
          xs={4}
          justifyContent="flex-end"
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
          gap={2}
        >
          {!hideInstructions && (
            <IconButton size="large" color="inherit" onClick={() => setModalOpen(true)}>
              <QuestionMarkIcon />
            </IconButton>
          )}
          <IconButton size="large" color="inherit" onClick={() => navigate('/leaderboard')}>
            <LeaderboardIcon />
          </IconButton>
          {isAuthenticated ? (
            <IconButton size="large" color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton size="large" color="inherit" onClick={handleLogin}>
              <LoginIcon />
            </IconButton>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
