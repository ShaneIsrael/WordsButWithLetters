import React from 'react'
import PropTypes from 'prop-types'
import LeaderboardService from '../services/LeaderboardService'
import { Box, Button, Sheet, Table, Typography } from '@mui/joy'
import Appbar from '../components/appbar/Appbar'
import Cookies from 'js-cookie'
import { format } from 'date-fns'
import { getPTDate } from '../common/utils'
import { useAuthed } from '../hooks/useAuthed'
import { useNavigate } from 'react-router-dom'

const Leaderboard = (props) => {
  const [entries, setEntries] = React.useState([])
  const { isAuthenticated } = useAuthed()
  const navigate = useNavigate()

  const user = Cookies.get('user')

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
      <Appbar setModalOpen={false} hideInstructions />
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
            width: 450,
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
                  <th style={{ width: 100 }}>
                    <Typography level="h2" fontSize={28}>
                      Rank
                    </Typography>
                  </th>
                  <th style={{ width: 200 }}>
                    <Typography level="h2" fontSize={28}>
                      Player
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
                        fontSize={24}
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        color={user?.displayName === entry.User.displayName ? 'primary' : ''}
                        level="h2"
                        fontSize={24}
                      >
                        {entry.User.displayName}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        color={user?.displayName === entry.User.displayName ? 'primary' : ''}
                        level="h2"
                        fontSize={24}
                      >
                        {entry.score.toLocaleString('en-US')}
                      </Typography>
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
                onClick={() => (isAuthenticated ? navigate('/ranked') : navigate('/login'))}
              >
                {isAuthenticated ? 'Play Ranked' : 'Login'}
              </Button>
            </Box>
          )}
        </Sheet>
      </Box>
    </Box>
  )
}

Leaderboard.propTypes = {}

export default Leaderboard
