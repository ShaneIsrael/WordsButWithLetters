import React from 'react'
import PropTypes from 'prop-types'
import LeaderboardService from '../services/LeaderboardService'
import { Box, Button, Sheet, Table, Tooltip, Typography } from '@mui/joy'
import Appbar from '../components/appbar/Appbar'
import Cookies from 'js-cookie'
import { format } from 'date-fns'
import { convertNumberToEmoji, getPTDate } from '../common/utils'
import { useAuthed } from '../hooks/useAuthed'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/wrappers/PageWrapper'

const Leaderboard = (props) => {
  const [entries, setEntries] = React.useState([
    // { score: 5000, User: { displayName: 'TheBestAround', PuzzleSubmissions: [{ bonusWord: 'BATHE' }] } },
  ])
  const { isAuthenticated } = useAuthed()
  const navigate = useNavigate()

  const userCookie = Cookies.get('user')
  let user
  try {
    user = userCookie ? JSON.parse(userCookie) : null
  } catch (err) {
    console.error(err)
  }

  React.useEffect(() => {
    async function fetch() {
      const resp = (await LeaderboardService.getAllRankedEntriesToday()).data
      setEntries(resp.LeaderboardEntries.sort((a, b) => b.score - a.score))
    }
    fetch()
  }, [])

  function formatDate(date) {
    const [year, month, day] = date.split('-')
    return format(new Date(year, month - 1, day), 'MMMM do, yyyy')
  }
  return (
    <Box sx={{ overflow: 'hidden', height: '100vh' }}>
      <Appbar hideInstructions />
      <PageWrapper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            mt: 4,
          }}
        >
          <Typography color="primary" level="h2" fontSize={42}>
            Ranked Leaderboard
          </Typography>
          <Typography color="" level="h2" fontSize={32}>
            {formatDate(getPTDate())}
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
              mt: 2,
            }}
            variant="outlined"
          >
            {entries && entries.length > 0 && (
              <Table borderAxis="none" color="primary" size="lg" stickyFooter={false} stickyHeader variant="plain">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>
                      <Typography level="h2" fontSize={28}>
                        Rank
                      </Typography>
                    </th>
                    <th style={{ width: 150 }}>
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
                  {entries.map((entry, index) => (
                    <tr key={`entry_${index}`}>
                      <td>
                        <Typography
                          color={user?.displayName === entry.User.displayName ? 'primary' : ''}
                          level="h2"
                          fontSize={26}
                        >
                          {index + 1} .
                        </Typography>
                      </td>
                      <td>
                        <Tooltip title={entry.User.displayName}>
                          <Typography
                            color={user?.displayName === entry.User.displayName ? 'primary' : ''}
                            level="h2"
                            fontSize={22}
                          >
                            {entry.User.displayName}
                          </Typography>
                        </Tooltip>
                      </td>
                      <td>
                        <Tooltip title={entry.User.PuzzleSubmissions[0].bonusWord || '-----'}>
                          <Typography
                            color={user?.displayName === entry.User.displayName ? 'primary' : ''}
                            level={entry.User.PuzzleSubmissions[0].bonusWord ? 'h2' : ''}
                            fontSize={entry.User.PuzzleSubmissions[0].bonusWord ? 18 : 16}
                            letterSpacing={entry.User.PuzzleSubmissions[0].bonusWord ? '8px' : ''}
                          >
                            {entry.User.PuzzleSubmissions[0].bonusWord?.toUpperCase() || '❌❌❌❌'}
                          </Typography>
                        </Tooltip>
                      </td>
                      <td>
                        <Tooltip title={entry.score}>
                          <Typography
                            color={user?.displayName === entry.User.displayName ? 'primary' : ''}
                            fontSize={18}
                          >
                            {convertNumberToEmoji(entry.score)}
                          </Typography>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
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
                <Typography color="success" level="h2" textAlign="center" fontSize={24}>
                  {isAuthenticated ? 'login and ' : ''}complete the ranked puzzle to be the first on the leaderboard
                </Typography>
                <Button
                  variant="soft"
                  sx={{ fontFamily: 'Bubblegum Sans', fontSize: 22, width: 200 }}
                  onClick={() => (isAuthenticated ? navigate('/') : navigate('/login'))}
                >
                  {isAuthenticated ? 'Play Ranked' : 'Login'}
                </Button>
              </Box>
            )}
          </Sheet>
        </Box>
      </PageWrapper>
    </Box>
  )
}

Leaderboard.propTypes = {}

export default Leaderboard
