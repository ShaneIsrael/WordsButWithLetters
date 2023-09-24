import React from 'react'
import PageWrapper from '../components/wrappers/PageWrapper'
import VKeyboard from '../components/keyboard/VKeyboard'
import GameBoard from '../components/board/GameBoard'
import PuzzleService from '../services/PuzzleService'
import _ from 'lodash'
import ScoreModifiers from '../components/board/ScoreModifiers'
import BonusWordComponent from '../components/board/BonusWordComponent'
import { Box, Grid } from '@mui/joy'
import TitleKeyboard from '../components/keyboard/TitleKeyboard'

const MAX_BOARD_ROWS = 6
const BOARD_ROW_LENGTH = 5

function initBoardRows() {
  let rows = []
  for (let i = 0; i < MAX_BOARD_ROWS; i++) {
    rows.push(new Array(BOARD_ROW_LENGTH).fill())
  }
  return rows
}

const Puzzle = (props) => {
  const [boardData, setBoardData] = React.useState({
    banishedIndexes: [[], [], [], [], []],
    scoreModifiers: [[], [], []],
  })
  const [playData, setPlayData] = React.useState({
    activeRow: 0,
    wordMatrix: initBoardRows(),
    banishedLetters: [],
    bonusWordFound: '',
    wordScores: [],
  })
  const [showPuzzle, setShowPuzzle] = React.useState(false)
  const [failedAttempt, setFailedAttempt] = React.useState(false)

  const handleBegin = async () => {
    const puzzleData = (await PuzzleService.getTodaysPuzzle()).data
    setBoardData(puzzleData.Puzzle.board)
    setShowPuzzle(true)
  }

  const handleKeyPress = (key) => {
    if (playData.banishedLetters.indexOf(key) >= 0) return

    setPlayData((data) => ({
      ...data,
      wordMatrix: data.wordMatrix.map((row, rowIndex) => {
        let trow = row
        if (rowIndex === playData.activeRow) {
          for (let i = 0; i < trow.length; i++) {
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
          for (let i = trow.length; i >= 0; i--) {
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
    if (playData.activeRow < MAX_BOARD_ROWS) {
      // if the row is not completely filled, do not allow submission
      if (playData.wordMatrix[playData.activeRow].filter((l) => !l).length > 0) return

      const thisWord = playData.wordMatrix[playData.activeRow].join('').toLowerCase()
      const isValid = (await PuzzleService.validateWord(thisWord)).data

      if (!isValid?.valid) {
        setFailedAttempt(true)

        return
      }

      const indexesToRemove = boardData.banishedIndexes[playData.activeRow].map((i) => i.index)
      const lettersToRemove = _.uniq(thisWord.split('').filter((l, index) => indexesToRemove.includes(index)))

      setPlayData((prev) => ({
        ...prev,
        banishedLetters: prev.banishedLetters.concat([...lettersToRemove.map((l) => l.toUpperCase())]),
        activeRow: prev.activeRow + 1,
      }))
    }
  }

  React.useEffect(() => {
    async function checkForBonus() {
      for (let i = 0; i < 3; i += 1) {
        const wordToCheck = playData.banishedLetters.slice(i, 5 + i).join('')
        const isValid = (await PuzzleService.validateWord(wordToCheck)).data?.valid
        console.log(wordToCheck, isValid)
        if (isValid) {
          setPlayData((prev) => ({ ...prev, bonusWordFound: wordToCheck }))
          break
        }
      }
    }
    if (playData.banishedLetters.length === 8) {
      checkForBonus()
    }
  }, [playData.banishedLetters, playData.activeRow, playData.bonusWordFound])

  return (
    <PageWrapper>
      <Grid container>
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
        <Box sx={{ ml: '4px' }}>
          <ScoreModifiers modifiers={boardData.scoreModifiers} hide={!showPuzzle} />
        </Box>
      </Grid>

      <div style={{ marginBottom: 4 }} />
      <BonusWordComponent letters={playData.banishedLetters} maxLetters={8} bonusWordFound={playData.bonusWordFound} />
      <div style={{ marginBottom: 4 }} />
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
