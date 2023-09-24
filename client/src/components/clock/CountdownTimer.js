import { Grid, Typography } from '@mui/joy'
import { useCountdown } from '../../hooks/useCountdown'
import TimerIcon from '@mui/icons-material/Timer'
import React from 'react'

const CountdownTimer = ({ targetDate, onExpire, start }) => {
  const [minutes, seconds] = useCountdown(targetDate)
  const [expired, setExpired] = React.useState(false)

  React.useEffect(() => {
    if (start && minutes <= 0 && seconds === '00') {
      setExpired(true)
      onExpire()
    }
  }, [minutes, seconds, onExpire, start])

  return (
    <>
      <Grid container height="100%" justifyContent="center" alignItems="center" gap={0.5}>
        <Grid container xs={12} justifyContent="center">
          <TimerIcon sx={{ fontSize: 32 }} />
        </Grid>
        <Grid container gap={0.5}>
          <Typography level="h2" display="inline">
            {expired || minutes === 0 ? '--' : minutes}
          </Typography>
          <Typography level="h2" display="inline">
            :
          </Typography>
          <Typography level="h2" display="inline">
            {expired || seconds === 0 ? '--' : seconds}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default CountdownTimer
