import React from 'react'
import { Grid, Sheet, Typography } from '@mui/joy'
import { useTheme } from '@emotion/react'
import MiniBoard from './MiniBoard'
import ScoreColumn from './ScoreColumn'
import BonusWord from './BonusWord'
import BonusWordScore from './BonusWordScore'

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
        width: '100%',
        height: 434,
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      <Grid container width="100%" justifyContent="center">
        <Grid xs={12}>
          <Typography level="h2" fontSize={34} textAlign="center">
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
          <Typography level="h2" fontSize={48} textAlign="center" mt={1.5}>
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
