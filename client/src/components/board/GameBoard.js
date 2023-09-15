import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Sheet, Typography } from '@mui/joy'
import BoardRow from './BoardRow'
import { useTheme } from '@emotion/react'

const GameBoard = ({ hide, rows, activeRow, rowLetters, rowHighlights, onStart }) => {
  const theme = useTheme()

  function getBoard() {
    if (!hide)
      return new Array(rows)
        .fill()
        .map((_, index) => (
          <BoardRow
            key={index}
            active={activeRow === index}
            letters={rowLetters[index]}
            highlightIndexes={rowHighlights[index]}
          />
        ))
    return (
      <Button onClick={onStart} size="lg">
        Begin Todays Puzzle
      </Button>
    )
  }

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        padding: 2,
        width: (366 / 5) * rowLetters[0]?.length || 5,
        height: (434 / 6) * rows,
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      {getBoard()}
    </Sheet>
  )
}

GameBoard.propTypes = {
  rows: PropTypes.number,
  activeRow: PropTypes.number,
  rowLetters: PropTypes.array,
  rowHighlights: PropTypes.array,
  onStart: PropTypes.func,
}

GameBoard.defaultProps = {
  rows: 5,
  activeRow: 0,
  rowLetters: [],
  rowHighlights: [],
  onStart: () => {},
}

export default GameBoard
