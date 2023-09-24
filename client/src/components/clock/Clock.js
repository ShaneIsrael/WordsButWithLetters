import React from 'react'
import PropTypes from 'prop-types'
import { Sheet } from '@mui/joy'
import { useTheme } from '@emotion/react'
import CountdownTimer from './CountdownTimer'

const Clock = ({ minutes, start, handleExpire }) => {
  const theme = useTheme()
  const NOW_IN_MS = new Date().getTime()
  const SECONDS_IN_MS = minutes * 60 * 1000

  return (
    <Sheet
      variant="plain"
      sx={{
        borderTopRightRadius: 8,
        marginBottom: 0.5,
        padding: '14px 8px 8px 8px',
        width: 140,
        height: 100,
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      {start && <CountdownTimer targetDate={NOW_IN_MS + SECONDS_IN_MS} onExpire={handleExpire} />}
    </Sheet>
  )
}

Clock.propTypes = {}

export default Clock
