import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import LeaderboardService from '../../services/LeaderboardService'
import { useAuthed } from '../../hooks/useAuthed'
import { Box, Button, Sheet, Table, Tooltip, Typography, styled, useTheme } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { convertNumberToEmoji } from '../../common/utils'

const Th = styled('th')(({ sx }) => ({ ...sx }))

const LeaderboardLastSevenDays = ({ title, type, hideAction, height }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const [entries, setEntries] = React.useState([
    // { score: 5000, User: { displayName: 'TheBestAround', PuzzleSubmissions: [{ bonusWord: 'BATHE' }] } },
  ])
  const { isAuthenticated } = useAuthed()

  const userCookie = Cookies.get(type === 'casual' ? 'casualUser' : 'user')

  let user
  try {
    user = userCookie ? JSON.parse(userCookie) : null
  } catch (err) {
    console.error(err)
  }

  React.useEffect(() => {
    async function fetch() {
      const resp = (await LeaderboardService.getLastSevenDaysScores(type)).data
      setEntries(resp)
    }
    fetch()
  }, [type])

  return (
    <>
      <Typography color="" level="h2" fontSize={32} textAlign="center">
        {title}
      </Typography>
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: {
            xs: 350,
            md: 550,
          },
          height,
          overflow: 'auto',
          boxShadow: 'md',
          background: theme.palette.mode === 'dark' ? 'rgba(11, 13, 14, 0.5)' : false,
        }}
        variant="outlined"
      >
        {entries && entries.length > 0 && (
          <Table
            borderAxis="none"
            color="primary"
            size="lg"
            stickyFooter={false}
            stickyHeader
            variant="plain"
            sx={{ '& th': { background: '#0B0D0E', height: { xs: 10, md: 48 } } }}
          >
            <thead>
              <tr>
                <Th
                  sx={{
                    width: {
                      xs: 55,
                      md: 80,
                    },
                  }}
                >
                  <Typography level="h2" fontSize={{ xs: 16, md: 28 }}>
                    Rank
                  </Typography>
                </Th>
                <Th
                  sx={{
                    width: {
                      xs: 106,
                      md: 200,
                    },
                  }}
                >
                  <Typography level="h2" fontSize={{ xs: 16, md: 28 }}>
                    Player
                  </Typography>
                </Th>
                <Th
                  sx={{
                    width: {
                      xs: 80,
                      md: 115,
                    },
                  }}
                >
                  <Typography level="h2" fontSize={{ xs: 16, md: 28 }}>
                    Games
                  </Typography>
                </Th>
                <Th>
                  <Typography level="h2" fontSize={{ xs: 16, md: 28 }}>
                    Total Score
                  </Typography>
                </Th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => {
                const displayName = entry.displayName
                return (
                  <tr key={`entry_${index}`}>
                    <td>
                      <Typography
                        color={user?.displayName === displayName ? (type === 'ranked' ? 'success' : 'primary') : ''}
                        level="h2"
                        fontSize={{
                          xs: 18,
                          md: 26,
                        }}
                      >
                        {index + 1} .
                      </Typography>
                    </td>
                    <td>
                      {user?.displayName === displayName &&
                        user?.displayName.split('').map((c, index) => (
                          <Typography
                            key={`dn_${c}_${index}`}
                            display="inline-block"
                            color={user?.displayName === displayName ? (type === 'ranked' ? 'success' : 'primary') : ''}
                            level="h1"
                            textAlign="center"
                            sx={{
                              fontSize: {
                                xs: 18,
                                md: 26,
                              },
                              animation: 'waveAnimation 1s',
                              animationDelay: `calc(.06s * ${index})`,
                              animationIterationCount: 3,
                            }}
                          >
                            {c}
                          </Typography>
                        ))}
                      {user?.displayName !== displayName && (
                        <Typography
                          level="h2"
                          fontSize={{
                            xs: 18,
                            md: 26,
                          }}
                        >
                          {displayName}
                        </Typography>
                      )}
                    </td>
                    <td>
                      <Tooltip title={entry.games}>
                        <Typography
                          level="h2"
                          color={user?.displayName === displayName ? (type === 'ranked' ? 'success' : 'primary') : ''}
                          fontSize={{
                            xs: 18,
                            md: 26,
                          }}
                          fontWeight={500}
                        >
                          {entry.games}
                        </Typography>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip title={entry.score}>
                        <Typography
                          color={user?.displayName === displayName ? 'primary' : ''}
                          fontSize={{
                            xs: 13,
                            md: 18,
                          }}
                        >
                          {convertNumberToEmoji(entry.score)}
                        </Typography>
                      </Tooltip>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
        {(!entries || entries.length === 0) && (
          <Box
            p={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height="100%"
            gap={3}
          >
            <Typography level="h2" textAlign="center" fontSize={42}>
              No Entries
            </Typography>
            {type === 'ranked' ? (
              <>
                <Typography color="success" level="h2" textAlign="center" fontSize={24}>
                  {isAuthenticated ? 'login and c' : 'C'}omplete the ranked puzzle to be the first on the leaderboard
                </Typography>
                {!hideAction && (
                  <Button
                    variant="soft"
                    sx={{ fontFamily: 'Bubblegum Sans', fontSize: 22, width: 200 }}
                    onClick={() => (isAuthenticated ? navigate('/ranked') : navigate('/login'))}
                  >
                    {isAuthenticated ? 'Play Ranked' : 'Login'}
                  </Button>
                )}
              </>
            ) : (
              <>
                <Typography
                  color={type === 'casual' ? 'primary' : 'success'}
                  level="h2"
                  textAlign="center"
                  fontSize={24}
                >
                  Complete the casual puzzle to be the first on the leaderboard
                </Typography>
                {!hideAction && (
                  <Button
                    variant="soft"
                    sx={{ fontFamily: 'Bubblegum Sans', fontSize: 22, width: 200 }}
                    onClick={() => navigate('/casual')}
                  >
                    Play Casual
                  </Button>
                )}
              </>
            )}
          </Box>
        )}
      </Sheet>
    </>
  )
}

LeaderboardLastSevenDays.propTypes = {}

export default LeaderboardLastSevenDays
