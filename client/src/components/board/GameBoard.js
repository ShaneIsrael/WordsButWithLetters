import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Sheet } from '@mui/joy'
import BoardRow from './BoardRow'
import { useTheme } from '@emotion/react'

const GameBoard = ({ rows, activeRow, rowLetters }) => {
  const theme = useTheme()
  return (
    <Sheet
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: 2,
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      {new Array(rows).fill().map((_, index) => (
        <BoardRow key={index} active={activeRow === index} letters={rowLetters[index]} />
      ))}
    </Sheet>
  )
}

GameBoard.propTypes = {
  rows: PropTypes.number,
  activeRow: PropTypes.number,
  rowLetters: PropTypes.array,
}

GameBoard.defaultProps = {
  rows: 5,
  activeRow: 0,
  rowLetters: [],
}

export default GameBoard
