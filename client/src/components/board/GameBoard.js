import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Button, Grid, Sheet, Typography } from '@mui/joy'
import { useTheme } from '@emotion/react'
import useSound from 'use-sound'
import BoardRow from './BoardRow'
import wrongSfx from '../../sounds/wrong.wav'
import _ from 'lodash'

const GameBoard = ({
  hide,
  rows,
  activeRow,
  rowLetters,
  rowHighlights,
  onStart,
  failedAttempt,
  setFailedAttempt,
  puzzleComplete,
}) => {
  const theme = useTheme()

  const [invalidAnimationOn, setInvalidAnimationOn] = React.useState(false)

  const [playInvalid] = useSound(wrongSfx)

  React.useEffect(() => {
    if (
      (_.isNumber(failedAttempt) && failedAttempt > 0 && failedAttempt < rowLetters[0].length) ||
      (_.isBoolean(failedAttempt) && failedAttempt)
    ) {
      playInvalid()
    }
    if (failedAttempt > 0 || (_.isBoolean(failedAttempt) && failedAttempt)) {
      setInvalidAnimationOn(true)
      const timeout = setTimeout(() => {
        setInvalidAnimationOn(false)
        setFailedAttempt(false)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [failedAttempt])

  function getBoard() {
    if (!hide)
      return new Array(rows).fill().map((_, index) => (
        <div key={index} className={clsx({ invalid: invalidAnimationOn && index === activeRow })}>
          <BoardRow
            active={activeRow === index}
            completed={index < activeRow}
            letters={rowLetters[index]}
            highlightIndexes={rowHighlights[index]}
            puzzleComplete={puzzleComplete}
          />
        </div>
      ))
    return (
      <Button onClick={onStart} size="lg">
        Begin Todays Puzzle
      </Button>
    )
  }

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
        width: (390 / 5) * rowLetters[0]?.length || 5,
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
  puzzleComplete: PropTypes.bool,
  failedAttempt: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  setFailedAttempt: PropTypes.func,
}

GameBoard.defaultProps = {
  rows: 5,
  activeRow: 0,
  rowLetters: [],
  rowHighlights: [],
  onStart: () => {},
  puzzleComplete: false,
  failedAttempt: false,
  setFailedAttempt: () => {},
}

export default GameBoard
