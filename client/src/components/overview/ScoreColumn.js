import React from 'react'
import { Grid, Sheet, Typography, useTheme } from '@mui/joy'

const ScoreColumn = ({ wordScores, bonusScore }) => {
  const theme = useTheme()
  return (
    <Sheet
      sx={{
        minWidth: 20,
        borderRight: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
        borderTop: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
        height: '100%',
      }}
    >
      <Grid direction="column" height="100%" alignItems="center">
        <Grid
          sx={{ borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`, pt: 1, pb: '4px' }}
        >
          {wordScores.slice(0, 6).map((score, index) => (
            <Grid
              key={`${score || 0}_${index}`}
              container
              xs
              alignItems="center"
              width="100%"
              sx={{ height: 36, width: 'auto', mb: '2px', pl: 1, pr: 1 }}
            >
              <Typography level="h2" fontSize={24} textAlign="center">
                {score ? score.toLocaleString('en-US') : 0}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid
          key={`${bonusScore}`}
          container
          xs
          alignItems="center"
          widh="100%"
          sx={{
            height: 42,
            width: 'auto',
            pt: 1,
            pl: 1,
            pr: 1,
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
          }}
        >
          <Typography level="h2" fontSize={24} textAlign="center">
            {bonusScore || 0}
          </Typography>
        </Grid>
      </Grid>
    </Sheet>
  )
}

ScoreColumn.propTypes = {}

export default ScoreColumn
