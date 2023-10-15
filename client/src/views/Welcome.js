import React from 'react'
import PropTypes from 'prop-types'
import Appbar from '../components/appbar/Appbar'
import { Button, Grid, Stack, Typography } from '@mui/joy'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { useNavigate } from 'react-router-dom'
import { useAuthed } from '../hooks/useAuthed'
import Cookies from 'js-cookie'
import { Fade } from '@mui/material'
import BackgroundSquares from '../components/misc/BackgroundSquares'
import ShootingStars from '../components/misc/ShootingStars'

const Welcome = (props) => {
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useAuthed()
  const [user, setUser] = React.useState()

  React.useEffect(() => {
    const userCookie = Cookies.get(!isAuthenticated ? 'casualUser' : 'user')

    let userJson
    try {
      userJson = userCookie ? JSON.parse(userCookie) : null
      setUser(userJson)
    } catch (err) {
      console.error(err)
    }
  }, [isAuthenticated])

  return (
    <Appbar>
      <ShootingStars />
      <Grid container justifyContent="center" spacing={4} mt={4}>
        <Grid xs={12} mb={4}>
          <Fade in={!loading} timeout={500}>
            <div>
              <Typography level="h1" textAlign="center" sx={{ fontSize: 64 }}>
                Welcome{' '}
                <Typography
                  color={isAuthenticated ? 'success' : 'primary'}
                  level="h1"
                  textAlign="center"
                  sx={{
                    fontSize: 64,
                  }}
                >
                  {user?.displayName}
                </Typography>
              </Typography>
              {!isAuthenticated && (
                <Typography
                  level="h1"
                  textAlign="center"
                  color="neutral.800"
                  sx={{ fontSize: 20, fontWeight: 'lighter' }}
                >
                  This is your casual play name provided automatically by us.
                </Typography>
              )}
              {isAuthenticated && (
                <Typography
                  level="h1"
                  textAlign="center"
                  color="neutral.800"
                  sx={{ fontSize: 20, fontWeight: 'lighter' }}
                >
                  Why not try and complete todays ranked puzzle?
                </Typography>
              )}
            </div>
          </Fade>
        </Grid>
        <Grid>
          <Fade in={!loading}>
            <Stack alignItems="center">
              <Button
                color="primary"
                sx={{ width: 200, height: 100, fontFamily: 'Bubblegum Sans', fontSize: 32, mb: 4 }}
                onClick={() => navigate('/casual')}
              >
                Play Casual
              </Button>
              <Leaderboard title="Todays Casual Leaderbaord" type={'casual'} hideAction />
            </Stack>
          </Fade>
        </Grid>
        <Grid>
          <Fade in={!loading}>
            <Stack alignItems="center">
              <Button
                color="success"
                sx={{ width: 200, height: 100, fontFamily: 'Bubblegum Sans', fontSize: 32, mb: 4 }}
                onClick={() => navigate('/ranked')}
              >
                Play Ranked
              </Button>
              <Leaderboard title="Todays Ranked Leaderboard" type={'ranked'} hideAction />
            </Stack>
          </Fade>
        </Grid>
      </Grid>
    </Appbar>
  )
}

Welcome.propTypes = {}

export default Welcome
