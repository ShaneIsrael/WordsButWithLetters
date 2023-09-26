import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Sheet, Typography } from '@mui/joy'
import { useTheme } from '@emotion/react'

const ScoreBoard = ({ finalScore, bonusWord, completeMessage }) => {
  const theme = useTheme()

  return (
    <Sheet
      variant="plain"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        padding: 2,
        borderTopLeftRadius: 8,
        width: 390,
        height: 434,
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      {completeMessage && (
        <>
          <Typography level="h1">{completeMessage}</Typography>
          <Divider />
        </>
      )}
      <Typography level="h1">Final Score</Typography>
      <Typography level="h2">{finalScore}</Typography>
      <Divider />
      <Typography level="h2">BONUS WORD</Typography>
      {bonusWord && (
        <Typography level="h2" fontSize={24}>
          {bonusWord}
        </Typography>
      )}
      {!bonusWord && (
        <Typography level="h2" fontSize={24}>
          No Bonus Word Found
        </Typography>
      )}
    </Sheet>
  )
}

ScoreBoard.propTypes = {}

export default ScoreBoard
