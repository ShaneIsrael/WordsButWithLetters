import { useTheme } from '@emotion/react'
import { Box, Button, Grid, Sheet, Typography } from '@mui/joy'
import clsx from 'clsx'
import _ from 'lodash'
import React from 'react'
import { toast } from 'sonner'
import useSound from 'use-sound'

import { useNavigate } from 'react-router-dom'
import { getPTDate, sleep } from '../common/utils'
import Appbar from '../components/appbar/Appbar'
import BonusWordComponent from '../components/board/BonusWordComponent'
import GameBoard from '../components/board/GameBoard'
import ScoreModifiers from '../components/board/ScoreModifiers'
import Clock from '../components/clock/Clock'
import TitleKeyboard from '../components/keyboard/TitleKeyboard'
import VKeyboard from '../components/keyboard/VKeyboard'
import ScoreOverview from '../components/overview/ScoreOverview'
import ShareButton from '../components/overview/ShareButton'
import PuzzleService from '../services/PuzzleService'
import wrongSfx from '../sounds/wrong.wav'

const MAX_BOARD_ROWS = 6
const BOARD_ROW_LENGTH = 5

function createWordMatrix(submission) {
  const rows = []
  for (let i = 0; i < MAX_BOARD_ROWS; i++) {
    if (!submission) {
      rows.push(new Array(BOARD_ROW_LENGTH).fill())
    } else {
      const word = submission[`word${i}`]
      rows.push(word ? word.toUpperCase().split('') : new Array(BOARD_ROW_LENGTH).fill())
    }
  }
  return rows
}

const PLAY_DATA = {
  activeRow: 0,
  wordMatrix: createWordMatrix(),
  banishedLetters: [],
  bonusWordFound: null,
  wordScores: [],
  puzzleComplete: false,
  finalTime: null,
}

const RankedPuzzle = (props) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [playInvalid] = useSound(wrongSfx, {
    volume: 0.2,
    interrupt: true,
  })

  const [puzzle, setPuzzle] = React.useState()
  const [playData, setPlayData] = React.useState(PLAY_DATA)
  const [puzzleSubmission, setPuzzleSubmission] = React.useState()
  const [date, setDate] = React.useState(getPTDate())

  const [puzzleComplete, setPuzzleComplete] = React.useState(false)
  const [failedAttempt, setFailedAttempt] = React.useState(0)
  const [submitting, setSubmitting] = React.useState(false)
  const [puzzleNumber, setPuzzleNumber] = React.useState()

  React.useEffect(() => {
    async function init() {
      const pNumber = (await PuzzleService.getTodaysPuzzleNumber()).data?.number

      const puzzle = (await PuzzleService.getTodaysRankedPuzzle()).data
      const submission = (await PuzzleService.getPuzzleSubmission()).data
      setPuzzle(puzzle.Puzzles?.[0])
      setPuzzleSubmission(submission)
      setPuzzleComplete(submission.puzzleComplete)
      setPuzzleNumber(pNumber)
    }
    init()
  }, [])

  const handleBegin = async () => {
    umami.track('Begin Ranked Button')
    if (!puzzle) {
      const submission = (await PuzzleService.createPuzzleSubmission()).data?.submission
      const rankedPuzzle = (await PuzzleService.getTodaysRankedPuzzle()).data
      setPuzzle(rankedPuzzle.Puzzles[0])
      setPuzzleSubmission(submission)
    }
  }

  const updatePlayData = (submission) => {
    if (submission) {
      setPlayData({
        activeRow: submission.activeRow,
        wordMatrix: createWordMatrix(submission),
        banishedLetters: submission.bonusLetters,
        bonusWordFound: submission.bonusWord,
        wordScores: submission.wordScores,
        puzzleComplete: submission.puzzleComplete,
        finalTime: submission.timeToComplete,
      })
    }
  }

  React.useEffect(() => {
    updatePlayData(puzzleSubmission)
  }, [puzzleSubmission])

  const handleKeyPress = (key) => {
    if (playData.banishedLetters?.indexOf(key) >= 0) return

    setPlayData((data) => ({
      ...data,
      wordMatrix: data.wordMatrix.map((row, rowIndex) => {
        const trow = row
        if (rowIndex === playData.activeRow) {
          for (let i = 0; i < puzzle.board.boardRowLength; i++) {
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
        const trow = row
        if (rowIndex === playData.activeRow) {
          for (let i = puzzle.board.boardRowLength; i >= 0; i--) {
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
    if (!submitting && !puzzle?.puzzleComplete) {
      const word = playData.wordMatrix[playData.activeRow]
      if (word.filter((l) => l).join('').length === 5) {
        setSubmitting(true)
        try {
          const response = (await PuzzleService.submitRanked(word.join(''), date)).data
          if (response.accepted) {
            setPuzzleSubmission(response.submission)
            if (response.submission.puzzleComplete) {
              umami.track('Ranked puzzle complete')
              toast.success(response.message || 'Puzzle Complete!')
              return sleep(1800).then(() => setPuzzleComplete(response.submission.puzzleComplete)) // Give final row animation time to complete.
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
    <Appbar puzzleCompleted={puzzleComplete}>
      <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <Box
            className="scene"
            sx={{ mb: '2px', width: { xs: 350, md: 534 }, height: { xs: puzzleComplete ? 380 : 349, md: 552 } }}
          >
            <Box className={clsx('card', puzzleSubmission && 'is-flipped')} sx={{ width: '100%', height: '100%' }}>
              <Sheet
                className={clsx('card-face')}
                sx={{
                  height: 'calc(100% - 2px)',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  background: theme.palette.mode === 'dark' ? 'rgba(11, 13, 14, 0.5)' : theme.palette.neutral[100],
                }}
              >
                {!puzzleSubmission && (
                  <>
                    <Typography
                      level="h3"
                      textAlign="center"
                      sx={{ width: '100%', fontWeight: 500, fontFamily: 'Bubblegum Sans', padding: 1 }}
                    >
                      Ranked Puzzle #{puzzleNumber}
                    </Typography>
                    <Grid container direction="column" gap={2} alignItems="center">
                      <Button onClick={handleBegin} size="lg">
                        <Typography level="h2" fontSize={22} sx={{ color: 'white' }}>
                          Begin Todays Ranked Puzzle
                        </Typography>
                      </Button>
                      <Typography level="h2" fontSize={22} sx={{ color: 'white' }}>
                        OR
                      </Typography>
                      <Button color="success" onClick={() => navigate('/casual')} size="lg">
                        <Typography level="h2" fontSize={22} sx={{ color: 'white' }}>
                          Play Todays Casual Puzzle
                        </Typography>
                      </Button>
                    </Grid>
                    <Box />
                  </>
                )}
              </Sheet>
              <Box className={clsx('card-face', 'card-back')}>
                <Grid container>
                  {puzzle && !puzzleComplete && (
                    <>
                      <GameBoard
                        hide={!puzzleSubmission}
                        rows={MAX_BOARD_ROWS}
                        activeRow={playData.activeRow}
                        rowLetters={playData.wordMatrix}
                        modifierLetters={puzzle?.board.scoreModifiers.reduce((prev, curr) => prev.concat(curr))}
                        rowHighlights={puzzle?.board.banishedIndexes}
                        onStart={handleBegin}
                        failedAttempt={failedAttempt}
                      />
                      <Box sx={{ ml: '4px' }}>
                        <Clock
                          seconds={puzzle?.board.timeToComplete || 300}
                          start={puzzleSubmission}
                          handleExpire={handleTimeExpire}
                          finalTime={playData.finalTime}
                          noLimit
                        />
                        <ScoreModifiers
                          modifiers={puzzle?.board.scoreModifiers}
                          disabledKeys={playData.banishedLetters}
                          hide={!puzzleSubmission}
                        />
                      </Box>
                    </>
                  )}
                  {puzzleComplete && (
                    <ScoreOverview progress={playData} scoreModifiers={puzzle?.board.scoreModifiers} />
                  )}
                </Grid>
                <div style={{ marginBottom: 4 }} />
                {puzzle && !puzzleComplete && (
                  <BonusWordComponent
                    letters={playData.banishedLetters}
                    maxLetters={puzzle?.board.banishedIndexes.length}
                    bonusWordFound={playData.bonusWordFound}
                  />
                )}
              </Box>
            </Box>
          </Box>

          {!puzzleComplete ? (
            <>
              {puzzleSubmission ? (
                <VKeyboard
                  onKeyPressed={handleKeyPress}
                  onDelete={handleDelete}
                  onEnter={handleSubmit}
                  onInvalidKey={handleInvalidKey}
                  disabledKeys={playData.banishedLetters}
                  highlightKeys={playData.wordMatrix[playData.activeRow]}
                  keyboardEnabled={puzzleSubmission && !puzzleComplete}
                  invalidAnimationOn={invalidKeyAnimationOn}
                />
              ) : (
                <TitleKeyboard />
              )}
            </>
          ) : (
            <ShareButton
              progress={playData}
              scoreModifiers={puzzle?.board.scoreModifiers}
              puzzleNumber={puzzleNumber}
            />
          )}
        </div>
      </Box>
    </Appbar>
  )
}

RankedPuzzle.propTypes = {}

export default RankedPuzzle
