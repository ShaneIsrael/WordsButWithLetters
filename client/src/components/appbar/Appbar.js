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
import FeedbackModal from '../modals/FeedbackModal'
import Cookies from 'js-cookie'
import InstructionModal from '../modals/InstructionModal'

function Appbar({ hideInstructions, puzzleCompleted }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const [feedbackModalOpen, setFeedbackModalOpen] = React.useState(false)
  const [instructionsModalOpen, setInstructionsModalOpen] = React.useState(false)

  let { isAuthenticated } = useAuthed()
  let { logout } = useAuth()

  const handleLogin = () => {
    navigate('/login')
  }
  const handleLogout = () => {
    logout()
  }

  const handleInstructionModalClose = (disable) => {
    Cookies.set('instructionsDisabled', disable, {
      sameSite: 'Strict',
    })
    setInstructionsModalOpen(false)
  }

  React.useEffect(() => {
    const instructionsDisabled = Cookies.get('instructionsDisabled')

    if ((!instructionsDisabled || instructionsDisabled === 'false') && !puzzleCompleted) {
      setInstructionsModalOpen(true)
    }
  }, [])

  return (
    <AppBar
      position="static"
      sx={{
        background: theme.palette.background.surface,
      }}
    >
      <FeedbackModal open={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
      <InstructionModal open={instructionsModalOpen} onClose={handleInstructionModalClose} />
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
                    setInstructionsModalOpen(true)
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
            <Tooltip title="View Instructions">
              <IconButton size="large" color="inherit" onClick={() => setInstructionsModalOpen(true)}>
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
