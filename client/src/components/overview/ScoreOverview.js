import React from 'react'
import { Grid, Sheet, Typography } from '@mui/joy'
import { useTheme } from '@emotion/react'
import MiniBoard from './MiniBoard'
import ScoreColumn from './ScoreColumn'
import BonusWord from './BonusWord'

const ScoreOverview = ({ progress, scoreModifiers }) => {
  const theme = useTheme()
  return (
    <Sheet
      variant="plain"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width: { xs: 350, md: 534 },
        height: { xs: 380, md: 548 },
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
        justifyContent: 'center',
      }}
    >
      <Grid container width="100%" justifyContent="center">
        <Grid xs={12}>
          <Typography level="h2" fontSize={{ xs: 24, md: 34 }} textAlign="center">
            Results!
          </Typography>
        </Grid>
        <Grid container>
          <Grid>
            <MiniBoard wordMatrix={progress.wordMatrix} scoreModifiers={scoreModifiers} />
            <BonusWord bonusWord={progress.bonusWordFound} scoreModifiers={scoreModifiers} />
          </Grid>
          <Grid>
            <ScoreColumn
              wordScores={progress.wordScores}
              bonusScore={progress.bonusWordFound ? progress.wordScores[progress.wordScores.length - 1] : null}
            />
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Typography level="h2" fontSize={{ xs: 28, md: 48 }} textAlign="center" mt={{ xs: 0.5, md: 1.5 }}>
            {progress.wordScores
              .filter((score) => score)
              .reduce((prev, curr) => prev + curr, 0)
              .toLocaleString('en-US')}
          </Typography>
        </Grid>
      </Grid>
    </Sheet>
  )
}

ScoreOverview.propTypes = {}

export default ScoreOverview
