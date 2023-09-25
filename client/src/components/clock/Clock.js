import React from 'react'
import PropTypes from 'prop-types'
import { Sheet } from '@mui/joy'
import { useTheme } from '@emotion/react'
import CountdownTimer from './CountdownTimer'
import NoLimit from './NoLimit'

const Clock = ({ seconds, start, handleExpire, finalTime, noLimit }) => {
  const theme = useTheme()
  const [nowInMs, setNowInMs] = React.useState(0)
  const [secondsInMs, setSecondsInMs] = React.useState(0)
  const [finalMinutes, setFinalMinutes] = React.useState(null)
  const [finalSeconds, setFinalSeconds] = React.useState(null)

  React.useEffect(() => {
    if (start) {
      setNowInMs(new Date().getTime())
      setSecondsInMs(seconds * 1000)
    }
  }, [start, seconds])

  React.useEffect(() => {
    if (finalTime) {
      const mins = Math.floor(finalTime / 60)
      const secs = finalTime - mins * 60
      setFinalMinutes(mins)
      setFinalSeconds(secs)
    }
  }, [finalTime])

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
      {start && !noLimit && (
        <CountdownTimer
          targetDate={nowInMs + secondsInMs}
          onExpire={handleExpire}
          start={start}
          finalTimeMinutes={finalMinutes}
          finalTimeSeconds={finalSeconds}
        />
      )}
      {start && noLimit && <NoLimit />}
    </Sheet>
  )
}

Clock.propTypes = {}

export default Clock
