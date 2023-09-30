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
import { getPuzzleProgress, getUTCDate, setPuzzleProgress, sleep } from '../common/utils'
import ScoreOverview from '../components/overview/ScoreOverview'
import ShareButton from '../components/overview/ShareButton'
import Appbar from '../components/appbar/Appbar'
import wrongSfx from '../sounds/wrong.wav'
import useSound from 'use-sound'
import InstructionModal from '../components/modals/InstructionModal'
import { toast } from 'sonner'

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
  const [playInvalid] = useSound(wrongSfx,  {
    volume: 0.2,
    interrupt: true,
  })

  const [boardData, setBoardData] = React.useState({
    banishedIndexes: [[], [], [], [], []],
    scoreModifiers: [[], [], []],
  })
  const [playData, setPlayData] = React.useState(PLAY_DATA)
  const [showPuzzle, setShowPuzzle] = React.useState(false)
  const [puzzleComplete, setPuzzleComplete] = React.useState(false)
  const [failedAttempt, setFailedAttempt] = React.useState(0)
  const [submitting, setSubmitting] = React.useState(false)
  const [startModalOpen, setStartModalOpen] = React.useState(true)

  React.useEffect(() => {
    async function init() {
      const puzzleProgress = getPuzzleProgress(getUTCDate())
      if (puzzleProgress) {
        setBoardData(puzzleProgress.board)
        setPlayData(puzzleProgress.progress)
        setPuzzleComplete(puzzleProgress.progress.puzzleComplete)
        setShowPuzzle(true)
      }
    }
    init()
  }, [])

  const handleBegin = async () => {
    // only allow fetching the puzzle and setting the initial
    // local storage IF local storage does not have an entry for today
    if (!getPuzzleProgress(getUTCDate())) {
      const puzzleData = (await PuzzleService.getTodaysPuzzle()).data
      setBoardData(puzzleData.Puzzle.board)
      setPuzzleProgress(puzzleData.date, puzzleData.Puzzle.board, PLAY_DATA)
      setPuzzleComplete(false)
      setShowPuzzle(true)
    }
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
            if (trow[i]) {
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
    if (!puzzleComplete) {
      if (playData.wordMatrix[playData.activeRow].filter((l) => l).join('').length === 5) {
        setSubmitting(true)
        try {
          const response = (await PuzzleService.submit(playData)).data
          if (response.accepted) {
            setPuzzleProgress(response.date, response.board, response.progress)
            setPlayData(response.progress)
            if (response.progress.puzzleComplete) {
              return sleep(1800).then(() => setPuzzleComplete(response.progress.puzzleComplete)) // Give final row animation time to complete.
            }
            return setSubmitting(false)
          } else {
            toast.error(response.message)
            playInvalid()
            setFailedAttempt((prev) => prev + 1)
          }
          return setSubmitting(false)
        } catch (err) {
          console.error(err)
          return setSubmitting(false)
        }
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

  const [invalidKeyAnimationOn, setInvalidKeyAnimationOn] = React.useState(false)

  const handleInvalidKey = () => {
    playInvalid()
    setInvalidKeyAnimationOn(true)
    setTimeout(() => {
      setInvalidKeyAnimationOn(false)
    }, 50)
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Appbar />
      {!puzzleComplete && <InstructionModal open={startModalOpen} onClose={() => setStartModalOpen(false)} />}
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
                {!puzzleComplete && (
                  <>
                    <GameBoard
                      hide={!showPuzzle}
                      rows={MAX_BOARD_ROWS}
                      activeRow={playData.activeRow}
                      rowLetters={playData.wordMatrix}
                      modifierLetters={boardData.scoreModifiers.reduce((prev, curr) => prev.concat(curr))}
                      rowHighlights={boardData.banishedIndexes}
                      onStart={handleBegin}
                      failedAttempt={failedAttempt}
                    />
                    <Box sx={{ ml: '4px' }}>
                      <Clock
                        seconds={boardData.timeToComplete || 300}
                        start={showPuzzle}
                        handleExpire={handleTimeExpire}
                        finalTime={playData.finalTime}
                        noLimit
                      />
                      <ScoreModifiers
                        modifiers={boardData.scoreModifiers}
                        disabledKeys={playData.banishedLetters}
                        hide={!showPuzzle}
                      />
                    </Box>
                  </>
                )}
                {puzzleComplete && <ScoreOverview progress={playData} scoreModifiers={boardData.scoreModifiers} />}
              </Grid>
              <div style={{ marginBottom: 4 }} />
              {!puzzleComplete ? (
                <BonusWordComponent
                  letters={playData.banishedLetters}
                  maxLetters={boardData.banishedIndexes.length}
                  bonusWordFound={playData.bonusWordFound}
                />
              ) : (
                <ShareButton progress={playData} scoreModifiers={boardData.scoreModifiers} />
              )}
            </Box>
          </Box>
        </Box>

        {showPuzzle ? (
          <VKeyboard
            onKeyPressed={handleKeyPress}
            onDelete={handleDelete}
            onEnter={handleSubmit}
            onInvalidKey={handleInvalidKey}
            disabledKeys={playData.banishedLetters}
            highlightKeys={playData.wordMatrix[playData.activeRow]}
            keyboardEnabled={showPuzzle && !puzzleComplete}
            invalidAnimationOn={invalidKeyAnimationOn}
          />
        ) : (
          <TitleKeyboard />
        )}
      </PageWrapper>
    </Box>
  )
}

Puzzle.propTypes = {}

export default Puzzle
