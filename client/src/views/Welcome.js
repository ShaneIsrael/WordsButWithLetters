import React from 'react'
import PropTypes from 'prop-types'
import Appbar from '../components/appbar/Appbar'
import { Button, Grid, Stack, Typography, useTheme } from '@mui/joy'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { useNavigate } from 'react-router-dom'
import { useAuthed } from '../hooks/useAuthed'
import Cookies from 'js-cookie'
import { Fade } from '@mui/material'
import BackgroundSquares from '../components/misc/BackgroundSquares'
import ShootingStars from '../components/misc/ShootingStars'
import LeaderboardLastSevenDays from '../components/leaderboard/LeaderboardLastSevenDays'

const Welcome = (props) => {
  const navigate = useNavigate()
  const theme = useTheme()
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
      <Grid container justifyContent="center" spacing={2} mt={4}>
        <Grid xs={12}>
          <Fade in={!loading} timeout={500}>
            <div>
              <Typography level="h1" textAlign="center" sx={{ fontSize: 52 }}>
                Welcome{' '}
                <Typography
                  color={isAuthenticated ? 'success' : 'primary'}
                  level="h1"
                  textAlign="center"
                  sx={{
                    fontSize: 52,
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
                  Why not try and complete today's ranked puzzle?
                </Typography>
              )}
            </div>
          </Fade>
        </Grid>
        <Grid mt={4}>
          <Fade in={!loading}>
            <Stack alignItems="center" gap={1}>
              <Button
                color="primary"
                sx={{ width: 180, height: 90, fontFamily: 'Bubblegum Sans', fontSize: 29, mb: 6 }}
                onClick={() => navigate('/casual')}
              >
                Play Casual
              </Button>
              <Leaderboard title="Today's Casual Leaderboard" height={320} type={'casual'} hideAction />
              <LeaderboardLastSevenDays title="Top Last 7 Days" height={320} type={'casual'} hideAction />
            </Stack>
          </Fade>
        </Grid>
        <Grid mt={4}>
          <Fade in={!loading}>
            <Stack alignItems="center" gap={1}>
              <Button
                color="success"
                sx={{ width: 180, height: 90, fontFamily: 'Bubblegum Sans', fontSize: 29, mb: 6 }}
                onClick={() => navigate('/ranked')}
              >
                Play Ranked
              </Button>
              <Leaderboard title="Today's Ranked Leaderboard" height={320} type={'ranked'} hideAction />
              <LeaderboardLastSevenDays title="Top Last 7 Days" height={320} type={'ranked'} hideAction />
            </Stack>
          </Fade>
        </Grid>
      </Grid>
    </Appbar>
  )
}

Welcome.propTypes = {}

export default Welcome
