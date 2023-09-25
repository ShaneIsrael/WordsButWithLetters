import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/joy'
import TimerIcon from '@mui/icons-material/Timer'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'

const NoLimit = (props) => {
  return (
    <>
      <Grid container height="100%" justifyContent="center" alignItems="center" gap={0.5}>
        <Grid container xs={12} justifyContent="center">
          <TimerIcon sx={{ fontSize: 32 }} />
        </Grid>
        <Grid container>
          <AllInclusiveIcon sx={{ fontSize: 40 }} />
        </Grid>
      </Grid>
    </>
  )
}

NoLimit.propTypes = {}

export default NoLimit
