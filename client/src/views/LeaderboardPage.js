import React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, Typography } from '@mui/joy'
import Appbar from '../components/appbar/Appbar'
import { format } from 'date-fns'
import { getPTDate } from '../common/utils'
import Leaderboard from '../components/leaderboard/Leaderboard'

const LeaderboardPage = (props) => {
  function formatDate(date) {
    const [year, month, day] = date.split('-')
    return format(new Date(year, month - 1, day), 'MMMM do, yyyy')
  }
  return (
    <Appbar hideInstructions>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography color="primary" level="h2" fontSize={42}>
          {formatDate(getPTDate())}
        </Typography>
        <Stack gap={2} sx={{ mt: 2 }}>
          <Leaderboard title="Ranked Leaderboard" type={'ranked'} />
          <Leaderboard title="Casual Leaderbaord" type={'casual'} />
        </Stack>
      </Box>
    </Appbar>
  )
}

LeaderboardPage.propTypes = {}

export default LeaderboardPage
