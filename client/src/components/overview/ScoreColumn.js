import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Sheet, Typography, useTheme } from '@mui/joy'

const ScoreColumn = ({ wordScores }) => {
  const theme = useTheme()
  return (
    <Sheet
      sx={{
        p: 1,
        minWidth: 20,
        borderRight: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
        borderTop: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
      }}
    >
      <Grid container direction="column" height="100%" alignItems="center">
        {wordScores.slice(0, 6).map((score, index) => (
          <Grid key={`${score || 0}_${index}`} container xs alignItems="center" width="100%">
            <Typography level="h2" fontSize={24} textAlign="center">
              {score ? score.toLocaleString('en-US') : 0}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Sheet>
  )
}

ScoreColumn.propTypes = {}

export default ScoreColumn
