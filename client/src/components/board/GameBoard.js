import { useTheme } from '@emotion/react'
import { Button, Grid, Sheet, Typography } from '@mui/joy'
import clsx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import useSound from 'use-sound'
import { sleep } from '../../common/utils'
import popSound from '../../sounds/pop.wav'
import BoardRow from './BoardRow'

const GameBoard = ({ hide, rows, activeRow, rowLetters, modifierLetters, rowHighlights, onStart, failedAttempt }) => {
  const theme = useTheme()

  const [invalidAnimationOn, setInvalidAnimationOn] = React.useState(false)

  React.useEffect(() => {
    setInvalidAnimationOn(true)
    const timeout = setTimeout(() => {
      setInvalidAnimationOn(false)
    }, 50)
    return () => clearTimeout(timeout)
  }, [failedAttempt])

  const [playSound] = useSound(popSound, {
    volume: 0.2,
    interrupt: true,
  })

  React.useEffect(() => {
    async function play() {
      for (let i = 0; i < 5; i += 1) {
        playSound()
        await sleep(300)
      }
    }
    activeRow !== 0 && play()
  }, [activeRow, playSound])

  function getBoard() {
    if (!hide)
      return new Array(rows).fill().map((_, index) => (
        <div key={`Row-${index}`} className={clsx({ invalid: invalidAnimationOn && index === activeRow })}>
          <BoardRow
            active={activeRow === index}
            completed={index < activeRow}
            letters={rowLetters[index]}
            modifierLetters={modifierLetters}
            highlightIndexes={rowHighlights.filter((rh) => rh[0] === index)}
          />
        </div>
      ))
    return (
      <Button onClick={onStart} size="lg">
        <Typography level="h2" fontSize={22}>
          Begin Todays Puzzle
        </Typography>
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
        gap: { xs: 0.5, md: 1 },
        padding: { xs: 1, md: 2 },
        borderTopLeftRadius: 8,
        width: { xs: 253, md: 390 },
        height: { xs: 269, md: 438 },
        background: theme.palette.mode === 'dark' ? 'rgba(11, 13, 14, 0.5)' : theme.palette.neutral[100],
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
  modifierLetters: PropTypes.array,
  onStart: PropTypes.func,
  failedAttempt: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
}

GameBoard.defaultProps = {
  rows: 5,
  activeRow: 0,
  rowLetters: [],
  rowHighlights: [],
  modifierLetters: [],
  onStart: () => {},
  setFailedAttempt: () => {},
}

export default GameBoard
