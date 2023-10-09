import React from 'react'
import PropTypes from 'prop-types'
import LeaderboardService from '../services/LeaderboardService'
import { Box, Sheet, Table, Typography } from '@mui/joy'
import Appbar from '../components/appbar/Appbar'
import Cookies from 'js-cookie'
import { format } from 'date-fns'
import { getPTDate } from '../common/utils'

const Leaderboard = (props) => {
  const [entries, setEntries] = React.useState()
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
          Leaderboard
        </Typography>
        <Typography color="primary" level="h2" fontSize={32}>
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
          {entries && (
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
        </Sheet>
      </Box>
    </Box>
  )
}

Leaderboard.propTypes = {}

export default Leaderboard
