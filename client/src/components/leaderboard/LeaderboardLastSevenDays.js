import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import LeaderboardService from '../../services/LeaderboardService'
import { useAuthed } from '../../hooks/useAuthed'
import { Box, Button, Sheet, Table, Tooltip, Typography, useTheme } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { convertNumberToEmoji } from '../../common/utils'

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
          width: 525,
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
            sx={{ '& th': { background: '#0B0D0E' } }}
          >
            <thead>
              <tr>
                <th style={{ width: 80 }}>
                  <Typography level="h2" fontSize={28}>
                    Rank
                  </Typography>
                </th>
                <th style={{ width: 200 }}>
                  <Typography level="h2" fontSize={28}>
                    Player
                  </Typography>
                </th>
                <th style={{ width: 90 }}>
                  <Typography level="h2" fontSize={28}>
                    Games
                  </Typography>
                </th>
                <th>
                  <Typography level="h2" fontSize={28}>
                    Total Score
                  </Typography>
                </th>
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
                        fontSize={26}
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
                              fontSize: 22,
                              animation: 'waveAnimation 1s',
                              animationDelay: `calc(.06s * ${index})`,
                              animationIterationCount: 3,
                            }}
                          >
                            {c}
                          </Typography>
                        ))}
                      {user?.displayName !== displayName && (
                        <Typography level="h2" fontSize={22}>
                          {displayName}
                        </Typography>
                      )}
                    </td>
                    <td>
                      <Tooltip title={entry.score}>
                        <Typography color="primary" fontSize={22} fontWeight={500}>
                          {entry.games}
                        </Typography>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip title={entry.score}>
                        <Typography color={user?.displayName === displayName ? 'primary' : ''} fontSize={18}>
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
