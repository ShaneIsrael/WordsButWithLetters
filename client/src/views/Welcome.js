import React from 'react'
import PropTypes from 'prop-types'
import Appbar from '../components/appbar/Appbar'
import { Button, Grid, Stack, Typography } from '@mui/joy'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { useNavigate } from 'react-router-dom'
import { useAuthed } from '../hooks/useAuthed'
import Cookies from 'js-cookie'

const Welcome = (props) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthed()

  const userCookie = Cookies.get(!isAuthenticated ? 'casualUser' : 'user')

  let user
  try {
    user = userCookie ? JSON.parse(userCookie) : null
  } catch (err) {
    console.error(err)
  }

  return (
    <Appbar>
      <Grid container justifyContent="center" spacing={4} mt={4}>
        <Grid xs={12} mb={4}>
          <Typography level="h1" textAlign="center" sx={{ fontSize: 64 }}>
            Welcome back{' '}
            <Typography color="primary" level="h1" textAlign="center" sx={{ fontSize: 64 }}>
              {user?.displayName}
            </Typography>
          </Typography>
        </Grid>
        <Grid>
          <Stack alignItems="center">
            <Button
              color="primary"
              sx={{ width: 200, height: 100, fontFamily: 'Bubblegum Sans', fontSize: 32, mb: 4 }}
              onClick={() => navigate('/casual')}
            >
              Play Casual
            </Button>
            <Leaderboard title="Todays Casual Leaderbaord" type={'casual'} />
          </Stack>
        </Grid>
        <Grid>
          <Stack alignItems="center">
            <Button
              color="success"
              sx={{ width: 200, height: 100, fontFamily: 'Bubblegum Sans', fontSize: 32, mb: 4 }}
              onClick={() => navigate('/ranked')}
            >
              Play Ranked
            </Button>
            <Leaderboard title="Todays Ranked Leaderboard" type={'ranked'} />
          </Stack>
        </Grid>
      </Grid>
    </Appbar>
  )
}

Welcome.propTypes = {}

export default Welcome
