import React from 'react'
import PropTypes from 'prop-types'
import Appbar from '../components/appbar/Appbar'
import { Button, Grid, Stack, TabList, TabPanel, Tabs, Typography, useTheme } from '@mui/joy'
import Tab, { tabClasses } from '@mui/joy/Tab'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { useNavigate } from 'react-router-dom'
import { useAuthed } from '../hooks/useAuthed'
import Cookies from 'js-cookie'
import { Fade } from '@mui/material'
import BackgroundSquares from '../components/misc/BackgroundSquares'
import ShootingStars from '../components/misc/ShootingStars'
import LeaderboardLastSevenDays from '../components/leaderboard/LeaderboardLastSevenDays'
import useScaleFactor from '../hooks/useScaleFactor'
import { isMobile, isTablet, isDesktop } from 'react-device-detect'

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
      <Grid container justifyContent="center" gap={2} mt={4} mb={10}>
        <Grid xs={12}>
          <Fade in={!loading} timeout={500}>
            <div>
              <Typography
                level="h1"
                textAlign="center"
                sx={{
                  fontSize: {
                    xs: 38,
                    md: 54,
                  },
                }}
              >
                Welcome{' '}
                <Typography
                  color={isAuthenticated ? 'success' : 'primary'}
                  level="h1"
                  textAlign="center"
                  sx={{
                    fontSize: {
                      xs: 38,
                      md: 54,
                    },
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
                  sx={{
                    fontSize: {
                      xs: 16,
                      md: 22,
                    },
                    fontWeight: 'lighter',
                  }}
                >
                  This is your casual play name provided automatically by us.
                </Typography>
              )}
              {isAuthenticated && (
                <Typography
                  level="h1"
                  textAlign="center"
                  color="neutral.800"
                  sx={{
                    fontSize: {
                      xs: 16,
                      md: 22,
                    },
                    fontWeight: 'lighter',
                  }}
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
              {!isMobile || isTablet || isDesktop ? (
                <Button
                  color="primary"
                  sx={{
                    width: {
                      xs: 150,
                      md: 180,
                    },
                    height: {
                      xs: 75,
                      md: 90,
                    },
                    fontFamily: 'Bubblegum Sans',
                    fontSize: {
                      xs: 24,
                      md: 29,
                    },
                    mb: {
                      xs: 2,
                      md: 6,
                    },
                  }}
                  onClick={() => navigate('/casual')}
                >
                  Play Casual
                </Button>
              ) : (
                <Grid container gap={1}>
                  <Button
                    color="primary"
                    sx={{
                      width: {
                        xs: 150,
                        md: 180,
                      },
                      height: {
                        xs: 75,
                        md: 90,
                      },
                      fontFamily: 'Bubblegum Sans',
                      fontSize: {
                        xs: 24,
                        md: 29,
                      },
                      mb: {
                        xs: 2,
                        md: 6,
                      },
                    }}
                    onClick={() => navigate('/casual')}
                  >
                    Play Casual
                  </Button>
                  <Button
                    color="success"
                    sx={{
                      width: {
                        xs: 150,
                        md: 180,
                      },
                      height: {
                        xs: 75,
                        md: 90,
                      },
                      fontFamily: 'Bubblegum Sans',
                      fontSize: {
                        xs: 23,
                        md: 29,
                      },
                      mb: {
                        xs: 2,
                        md: 6,
                      },
                    }}
                    onClick={() => navigate('/ranked')}
                  >
                    Play Ranked
                  </Button>
                </Grid>
              )}
              <Tabs
                variant="plain"
                sx={{ background: 'rgba(0,0,0,0)' }}
                aria-label="Casual Leaderboard Tabs"
                defaultValue={0}
              >
                <TabList
                  sx={{
                    pt: 1,
                    justifyContent: 'center',
                    [`&& .${tabClasses.root}`]: {
                      flex: 'initial',
                      bgcolor: 'transparent',
                      '&:hover': {
                        bgcolor: 'transparent',
                      },
                      [`&.${tabClasses.selected}`]: {
                        color: 'primary.plainColor',
                        '&::after': {
                          height: 2,
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3,
                          bgcolor: 'primary.500',
                        },
                      },
                    },
                  }}
                >
                  <Tab sx={{ fontFamily: 'Bubblegum Sans', fontSize: 24 }}>Today's Scores</Tab>
                  <Tab sx={{ fontFamily: 'Bubblegum Sans', fontSize: 24 }}>Last 7 Days</Tab>
                </TabList>
                <TabPanel value={0}>
                  <Leaderboard
                    height={{
                      xs: 300,
                      md: 530,
                    }}
                    type={'casual'}
                    hideAction
                    noTitle
                  />
                </TabPanel>
                <TabPanel value={1}>
                  <LeaderboardLastSevenDays
                    height={{
                      xs: 300,
                      md: 530,
                    }}
                    type={'casual'}
                    hideAction
                    noTitle
                  />
                  <Typography textAlign="center" sx={{ fontSize: { xs: 12, md: 18 }, fontStyle: 'italic', mt: 1 }}>
                    Updated ~ every 10 minutes
                  </Typography>
                </TabPanel>
              </Tabs>
            </Stack>
          </Fade>
        </Grid>
        <Grid mt={{ xs: 0, sm: 4, md: 4 }}>
          <Fade in={!loading}>
            <Stack alignItems="center" gap={1}>
              {(isTablet || isDesktop) && (
                <Button
                  color="success"
                  sx={{
                    width: {
                      xs: 150,
                      md: 180,
                    },
                    height: {
                      xs: 75,
                      md: 90,
                    },
                    fontFamily: 'Bubblegum Sans',
                    fontSize: {
                      xs: 23,
                      md: 29,
                    },
                    mb: {
                      xs: 2,
                      md: 6,
                    },
                  }}
                  onClick={() => navigate('/ranked')}
                >
                  Play Ranked
                </Button>
              )}
              <Tabs
                variant="plain"
                sx={{ background: 'rgba(0,0,0,0)' }}
                aria-label="Casual Leaderboard Tabs"
                defaultValue={0}
              >
                <TabList
                  sx={{
                    pt: 1,
                    justifyContent: 'center',
                    [`&& .${tabClasses.root}`]: {
                      flex: 'initial',
                      bgcolor: 'transparent',
                      '&:hover': {
                        bgcolor: 'transparent',
                      },
                      [`&.${tabClasses.selected}`]: {
                        color: 'success.plainColor',
                        '&::after': {
                          height: 2,
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3,
                          bgcolor: 'success.500',
                        },
                      },
                    },
                  }}
                >
                  <Tab sx={{ fontFamily: 'Bubblegum Sans', fontSize: 24 }}>Today's Scores</Tab>
                  <Tab sx={{ fontFamily: 'Bubblegum Sans', fontSize: 24 }}>Last 7 Days</Tab>
                </TabList>
                <TabPanel value={0}>
                  <Leaderboard
                    height={{
                      xs: 300,
                      md: 530,
                    }}
                    type={'ranked'}
                    hideAction
                    noTitle
                  />
                </TabPanel>
                <TabPanel value={1}>
                  <LeaderboardLastSevenDays
                    height={{
                      xs: 300,
                      md: 530,
                    }}
                    type={'ranked'}
                    hideAction
                    noTitle
                  />
                  <Typography textAlign="center" sx={{ fontSize: { xs: 12, md: 18 }, fontStyle: 'italic', mt: 1 }}>
                    Updated ~ every 10 minutes
                  </Typography>
                </TabPanel>
              </Tabs>
            </Stack>
          </Fade>
        </Grid>
      </Grid>
    </Appbar>
  )
}

Welcome.propTypes = {}

export default Welcome
