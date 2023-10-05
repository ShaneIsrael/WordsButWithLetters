import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Button, Grid, Sheet, Typography } from '@mui/joy'
import { useTheme } from '@emotion/react'
import useSound from 'use-sound'
import BoardRow from './BoardRow'
import _ from 'lodash'
import popSound from '../../sounds/pop.wav'
import { sleep } from '../../common/utils'

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
        <div key={index} className={clsx({ invalid: invalidAnimationOn && index === activeRow })}>
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
        gap: 1,
        padding: 2,
        borderTopLeftRadius: 8,
        width: (390 / 5) * rowLetters[0]?.length || 5,
        height: (438 / 6) * rows,
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
