import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import LeaderboardService from '../../services/LeaderboardService'
import { useAuthed } from '../../hooks/useAuthed'
import { Box, Button, Sheet, Table, Tooltip, Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { convertNumberToEmoji } from '../../common/utils'

const Leaderboard = ({ title, type }) => {
  const navigate = useNavigate()

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
      const resp = (
        type === 'ranked'
          ? await LeaderboardService.getAllRankedEntriesToday()
          : await LeaderboardService.getAllCasualEntriesToday()
      ).data
      setEntries(resp.LeaderboardEntries.sort((a, b) => b.score - a.score))
    }
    fetch()
  }, [])

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
          height: 530,
          overflow: 'auto',
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        {entries && entries.length > 0 && (
          <Table borderAxis="none" color="primary" size="lg" stickyFooter={false} stickyHeader variant="plain">
            <thead>
              <tr>
                <th style={{ width: 70 }}>
                  <Typography level="h2" fontSize={28}>
                    Rank
                  </Typography>
                </th>
                <th style={{ width: 170 }}>
                  <Typography level="h2" fontSize={28}>
                    Player
                  </Typography>
                </th>
                <th style={{ width: 115 }}>
                  <Typography level="h2" fontSize={28}>
                    Word
                  </Typography>
                </th>
                <th>
                  <Typography level="h2" fontSize={28}>
                    Score
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => {
                const entryUser = type === 'ranked' ? entry.User : entry.CasualUser
                return (
                  <tr key={`entry_${index}`}>
                    <td>
                      <Typography
                        color={user?.displayName === entryUser.displayName ? 'primary' : ''}
                        level="h2"
                        fontSize={26}
                      >
                        {index + 1} .
                      </Typography>
                    </td>
                    <td>
                      {user?.displayName === entryUser.displayName &&
                        user?.displayName.split('').map((c, index) => (
                          <Typography
                            key={`dn_${c}_${index}`}
                            display="inline-block"
                            color="primary"
                            level="h1"
                            textAlign="center"
                            sx={{
                              fontSize: 22,
                              animation: 'waveAnimation 1s infinite',
                              animationDelay: `calc(.06s * ${index})`,
                            }}
                          >
                            {c}
                          </Typography>
                        ))}
                      {user?.displayName !== entryUser.displayName && (
                        <Typography level="h2" fontSize={22}>
                          {entryUser.displayName}
                        </Typography>
                      )}
                    </td>
                    <td>
                      <Tooltip title={entryUser.PuzzleSubmissions[0].bonusWord || '-----'}>
                        <Typography
                          color={user?.displayName === entryUser.displayName ? 'primary' : ''}
                          level={entryUser.PuzzleSubmissions[0].bonusWord ? 'h2' : ''}
                          fontSize={entryUser.PuzzleSubmissions[0].bonusWord ? 18 : 16}
                          letterSpacing={entryUser.PuzzleSubmissions[0].bonusWord ? '8px' : ''}
                        >
                          {entryUser.PuzzleSubmissions[0].bonusWord?.toUpperCase() || '❌❌❌❌'}
                        </Typography>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip title={entry.score}>
                        <Typography color={user?.displayName === entryUser.displayName ? 'primary' : ''} fontSize={18}>
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
                <Button
                  variant="soft"
                  sx={{ fontFamily: 'Bubblegum Sans', fontSize: 22, width: 200 }}
                  onClick={() => (isAuthenticated ? navigate('/ranked') : navigate('/login'))}
                >
                  {isAuthenticated ? 'Play Ranked' : 'Login'}
                </Button>
              </>
            ) : (
              <>
                <Typography color="success" level="h2" textAlign="center" fontSize={24}>
                  Complete the casual puzzle to be the first on the leaderboard
                </Typography>
                <Button
                  variant="soft"
                  sx={{ fontFamily: 'Bubblegum Sans', fontSize: 22, width: 200 }}
                  onClick={() => navigate('/casual')}
                >
                  Play Casual
                </Button>
              </>
            )}
          </Box>
        )}
      </Sheet>
    </>
  )
}

Leaderboard.propTypes = {}

export default Leaderboard
