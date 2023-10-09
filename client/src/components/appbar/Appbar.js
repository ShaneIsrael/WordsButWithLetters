import React from 'react'
import { useTheme } from '@emotion/react'
import { Grid, Typography, Menu, MenuItem, MenuButton, Dropdown, IconButton, Box, Tooltip } from '@mui/joy'
import { AppBar, Toolbar } from '@mui/material'

import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreVert from '@mui/icons-material/MoreVert'
import ChatIcon from '@mui/icons-material/Chat'

import { useAuthed } from '../../hooks/useAuthed'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Appbar({ setModalOpen, setFeedbackModalOpen, hideInstructions }) {
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
              <MenuItem onClick={() => navigate('/leaderboard')}>Leaderboard</MenuItem>
              {!hideInstructions && (
                <MenuItem
                  onClick={() => {
                    setModalOpen(true)
                  }}
                >
                  Instructions
                </MenuItem>
              )}
              <MenuItem onClick={() => setFeedbackModalOpen(true)}>Feedback</MenuItem>
            </Menu>
          </Dropdown>
        </Grid>
        <Grid container xs={4} justifyContent="center">
          <Box onClick={() => navigate(isAuthenticated ? '/ranked' : '/casual')} sx={{ cursor: 'pointer' }}>
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
            <Tooltip title="View Instructions">
              <IconButton size="large" color="inherit" onClick={() => setModalOpen(true)}>
                <QuestionMarkIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Leave Feedback">
            <IconButton size="large" color="inherit" onClick={() => setFeedbackModalOpen(true)}>
              <ChatIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="View Leaderboard">
            <IconButton size="large" color="inherit" onClick={() => navigate('/leaderboard')}>
              <LeaderboardIcon />
            </IconButton>
          </Tooltip>

          {isAuthenticated ? (
            <Tooltip title="Logout">
              <IconButton size="large" color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Login">
              <IconButton size="large" color="inherit" onClick={handleLogin}>
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
