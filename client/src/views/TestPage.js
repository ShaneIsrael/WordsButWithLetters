import React from 'react'
import PageWrapper from '../components/wrappers/PageWrapper'
import VKeyboard from '../components/keyboard/VKeyboard'
import GameBoard from '../components/board/GameBoard'
import PuzzleService from '../services/PuzzleService'
import RemovedLettersComponent from '../components/board/RemovedLetters'
import _ from 'lodash'

// This is a test page used to place and test new components

const MAX_BOARD_ROWS = 6
const BOARD_ROW_LENGTH = 5

function generateTwoUniqueNumbers(n) {
  // Generate unique random numbers
  let numbers = []
  while (numbers.length < 2) {
    let randomNum = Math.floor(Math.random() * n)
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum)
    }
  }

  return numbers
}

function createBoardRowLetters() {
  let rows = []
  for (let i = 0; i < MAX_BOARD_ROWS; i++) {
    rows.push(new Array(BOARD_ROW_LENGTH).fill())
  }
  return rows
}

function createBoardRowHighlights() {
  let rows = []
  for (let i = 0; i < MAX_BOARD_ROWS - 1; i++) {
    // odd rows only highlight 1 letter, even highlight 2

    if (i % 2 !== 0) {
      rows.push([
        {
          index: generateTwoUniqueNumbers(BOARD_ROW_LENGTH)[0],
          color: 'red',
          animation: 'skew-shake-infinite',
        },
      ])
    } else {
      rows.push(
        generateTwoUniqueNumbers(BOARD_ROW_LENGTH).map((num) => ({
          index: num,
          color: 'red',
          animation: 'skew-shake-infinite',
        })),
      )
    }
  }
  rows.push([])
  return rows
}

const TestPage = (props) => {
  const [disabledKeys, setDisabledKeys] = React.useState([])
  const [boardData, setBoardData] = React.useState({
    boardRowLetters: createBoardRowLetters(),
    boardRowHighlights: createBoardRowHighlights(),
  })
  const [showPuzzle, setShowPuzzle] = React.useState(false)
  const [activeRow, setActiveRow] = React.useState(0)
  const [failedAttempt, setFailedAttempt] = React.useState(false)

  const handleKeyPress = (key) => {
    if (disabledKeys.indexOf(key) >= 0) return

    setBoardData((board) => ({
      ...board,
      boardRowLetters: board.boardRowLetters.map((row, rowIndex) => {
        let trow = row
        if (rowIndex === activeRow) {
          for (let i = 0; i < trow.length; i++) {
            if (!trow[i]) {
              trow[i] = key
              // setDisabledKeys((prev) => [...prev, key])
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
    if (activeRow === MAX_BOARD_ROWS) return
    if (boardData.boardRowLetters[activeRow].filter((l) => l).length === 0) return

    setBoardData((board) => ({
      ...board,
      boardRowLetters: board.boardRowLetters.map((row, rowIndex) => {
        let trow = row
        if (rowIndex === activeRow) {
          for (let i = trow.length; i >= 0; i--) {
            if (trow[i] !== undefined) {
              const letterRemoved = trow[i]
              trow[i] = undefined
              // setDisabledKeys((prev) => prev.filter((l) => l !== letterRemoved))
              break
            }
          }
        }
        return trow
      }),
    }))
  }

  const handleSubmit = async () => {
    if (activeRow < MAX_BOARD_ROWS) {
      // if the row is not completely filled, do not allow submission
      if (boardData.boardRowLetters[activeRow].filter((l) => !l).length > 0) return

      const thisWord = boardData.boardRowLetters[activeRow].join('').toLowerCase()
      const isValid = (await PuzzleService.validateWord(thisWord)).data

      if (!isValid?.valid) {
        setFailedAttempt(true)

        return
      }

      const indexesToRemove = boardData.boardRowHighlights[activeRow].map((i) => i.index)
      const lettersToRemove = _.uniq(thisWord.split('').filter((l, index) => indexesToRemove.includes(index)))

      setDisabledKeys((prev) => {
        return [...prev, ...lettersToRemove.map((l) => l.toUpperCase())].sort()
      })
      setActiveRow((prev) => prev + 1)
    }
  }

  return (
    <PageWrapper>
      <GameBoard
        hide={!showPuzzle}
        rows={MAX_BOARD_ROWS}
        activeRow={activeRow}
        rowLetters={boardData.boardRowLetters}
        rowHighlights={boardData.boardRowHighlights}
        onStart={() => setShowPuzzle(true)}
        failedAttempt={failedAttempt}
        setFailedAttempt={setFailedAttempt}
      />
      <div style={{ marginBottom: 25 }} />
      <RemovedLettersComponent letters={disabledKeys} />
      <div style={{ marginBottom: 25 }} />
      <VKeyboard
        onKeyPressed={handleKeyPress}
        onDelete={handleDelete}
        disabledKeys={disabledKeys}
        highlightKeys={boardData.boardRowLetters[activeRow]}
        onEnter={handleSubmit}
        disabled={!showPuzzle}
      />
    </PageWrapper>
  )
}

TestPage.propTypes = {}

export default TestPage
