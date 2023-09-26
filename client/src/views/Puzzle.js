import React from 'react'
import PageWrapper from '../components/wrappers/PageWrapper'
import VKeyboard from '../components/keyboard/VKeyboard'
import GameBoard from '../components/board/GameBoard'
import PuzzleService from '../services/PuzzleService'
import _ from 'lodash'
import ScoreModifiers from '../components/board/ScoreModifiers'
import BonusWordComponent from '../components/board/BonusWordComponent'
import { Box, Button, Grid, Sheet, Typography } from '@mui/joy'
import TitleKeyboard from '../components/keyboard/TitleKeyboard'
import Clock from '../components/clock/Clock'
import clsx from 'clsx'
import { useTheme } from '@emotion/react'
import { getPuzzleProgress, getUTCDate, setPuzzleProgress } from '../common/utils'
import ScoreBoard from '../components/board/ScoreBoard'

const MAX_BOARD_ROWS = 6
const BOARD_ROW_LENGTH = 5

function initBoardRows() {
  let rows = []
  for (let i = 0; i < MAX_BOARD_ROWS; i++) {
    rows.push(new Array(BOARD_ROW_LENGTH).fill())
  }
  return rows
}

const PLAY_DATA = {
  activeRow: 0,
  wordMatrix: initBoardRows(),
  banishedLetters: [],
  bonusWordFound: '',
  wordScores: [],
  puzzleComplete: false,
  finalTime: null,
}

const Puzzle = (props) => {
  const theme = useTheme()

  const [boardData, setBoardData] = React.useState({
    banishedIndexes: [[], [], [], [], []],
    scoreModifiers: [[], [], []],
  })
  const [playData, setPlayData] = React.useState(PLAY_DATA)
  const [showPuzzle, setShowPuzzle] = React.useState(false)
  const [failedAttempt, setFailedAttempt] = React.useState(false)

  React.useEffect(() => {
    async function init() {
      const puzzleProgress = getPuzzleProgress(getUTCDate())
      if (puzzleProgress) {
        setBoardData(puzzleProgress.board)
        setPlayData(puzzleProgress.progress)
        setShowPuzzle(true)
      }
    }
    init()
  }, [])

  const handleBegin = async () => {
    const puzzleData = (await PuzzleService.getTodaysPuzzle()).data
    setBoardData(puzzleData.Puzzle.board)
    setPuzzleProgress(puzzleData.date, puzzleData.Puzzle.board, PLAY_DATA)
    setShowPuzzle(true)
  }

  const handleKeyPress = (key) => {
    if (playData.banishedLetters.indexOf(key) >= 0) return

    setPlayData((data) => ({
      ...data,
      wordMatrix: data.wordMatrix.map((row, rowIndex) => {
        let trow = row
        if (rowIndex === playData.activeRow) {
          for (let i = 0; i < boardData.boardRowLength; i++) {
            if (!trow[i]) {
              trow[i] = key
              break
            }
          }
        }
        return trow
      }),
    }))
  }

  const handleDelete = () => {
    // if no letters in the row, do nothing
    if (playData.activeRow === MAX_BOARD_ROWS) return
    if (playData.wordMatrix[playData.activeRow].filter((l) => l).length === 0) return

    setPlayData((data) => ({
      ...data,
      wordMatrix: data.wordMatrix.map((row, rowIndex) => {
        let trow = row
        if (rowIndex === playData.activeRow) {
          for (let i = boardData.boardRowLength; i >= 0; i--) {
            if (trow[i] !== undefined) {
              trow[i] = undefined
              break
            }
          }
        }
        return trow
      }),
    }))
  }

  const handleSubmit = async () => {
    if (!playData.puzzleComplete) {
      if (playData.wordMatrix[playData.activeRow].filter((l) => l).join('').length !== 5) {
        return
      }
      try {
        const response = (await PuzzleService.submit(playData)).data
        if (!response.accepted) {
          setFailedAttempt(true)
          return
        }
        setPuzzleProgress(response.date, response.board, response.progress)
        setPlayData(response.progress)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleTimeExpire = () => {
    setShowPuzzle(false)
    // On timeout, hit the timeout route (doesnt yet exist)
    // on the server which will force the server to compare
    // the timestamps and finalize the score if the time allotted
    // has in fact expired. This check will also be done on every
    // row submission.
  }

  return (
    <PageWrapper>
      <Box className="scene" sx={{ mb: '2px', width: 534, height: 552 }}>
        <Box className={clsx('card', showPuzzle && 'is-flipped')} sx={{ width: '100%', height: '100%' }}>
          <Sheet
            className={clsx('card-face')}
            sx={{
              height: 'calc(100% - 2px)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
            }}
          >
            <Button onClick={handleBegin} size="lg">
              <Typography level="h2" fontSize={22} sx={{ color: 'white' }}>
                Begin Todays Puzzle
              </Typography>
            </Button>
          </Sheet>
          <Box className={clsx('card-face', 'card-back')}>
            <Grid container>
              {!playData.puzzleComplete && (
                <GameBoard
                  hide={!showPuzzle}
                  rows={MAX_BOARD_ROWS}
                  activeRow={playData.activeRow}
                  rowLetters={playData.wordMatrix}
                  rowHighlights={boardData.banishedIndexes}
                  onStart={handleBegin}
                  failedAttempt={failedAttempt}
                  setFailedAttempt={setFailedAttempt}
                />
              )}
              {playData.puzzleComplete && (
                <ScoreBoard
                  finalScore={playData.wordScores.reduce((partialSum, a) => partialSum + a, 0)}
                  bonusWord={playData.bonusWordFound}
                />
              )}
              <Box sx={{ ml: '4px' }}>
                <Clock
                  seconds={boardData.timeToComplete || 300}
                  start={showPuzzle}
                  handleExpire={handleTimeExpire}
                  finalTime={playData.finalTime}
                  noLimit
                />
                <ScoreModifiers modifiers={boardData.scoreModifiers} hide={!showPuzzle} />
              </Box>
            </Grid>
            <div style={{ marginBottom: 4 }} />
            <BonusWordComponent
              letters={playData.banishedLetters}
              maxLetters={8}
              bonusWordFound={playData.bonusWordFound}
            />
          </Box>
        </Box>
      </Box>

      {showPuzzle ? (
        <VKeyboard
          onKeyPressed={handleKeyPress}
          onDelete={handleDelete}
          disabledKeys={playData.banishedLetters}
          highlightKeys={playData.wordMatrix[playData.activeRow]}
          onEnter={handleSubmit}
          keyboardEnabled={showPuzzle}
        />
      ) : (
        <TitleKeyboard />
      )}
    </PageWrapper>
  )
}

Puzzle.propTypes = {}

export default Puzzle
