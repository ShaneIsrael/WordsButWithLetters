import React from 'react'
import PropTypes from 'prop-types'
import { Sheet } from '@mui/joy'
import { useTheme } from '@emotion/react'
import CountdownTimer from './CountdownTimer'

const Clock = ({ seconds, start, handleExpire }) => {
  const theme = useTheme()
  const [nowInMs, setNowInMs] = React.useState(0)
  const [secondsInMs, setSecondsInMs] = React.useState(0)

  React.useEffect(() => {
    if (start) {
      setNowInMs(new Date().getTime())
      setSecondsInMs(seconds * 1000)
    }
  }, [start, seconds])

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
      {start && <CountdownTimer targetDate={nowInMs + secondsInMs} onExpire={handleExpire} start={start} />}
    </Sheet>
  )
}

Clock.propTypes = {}

export default Clock
