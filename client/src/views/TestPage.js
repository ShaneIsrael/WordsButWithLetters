import React from 'react'
import PageWrapper from '../components/wrappers/PageWrapper'
import VKeyboard from '../components/keyboard/VKeyboard'
import GameBoard from '../components/board/GameBoard'
import PuzzleService from '../services/PuzzleService'
import RemovedLettersComponent from '../components/board/BonusWordComponent'
import _ from 'lodash'
import ScoreModifiers from '../components/board/ScoreModifiers'
import BonusWordComponent from '../components/board/BonusWordComponent'

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

function createBoardScoreModifiers() {
  function generateUniqueArrays(size1, size2, size3) {
    // Create an array with all alphabets (a-z)
    const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(97 + i).toUpperCase())

    // Function to get a random character from the alphabet
    const getRandomChar = () => {
      return alphabet[Math.floor(Math.random() * alphabet.length)]
    }

    const array1 = []
    const array2 = []
    const array3 = []

    // Generate unique characters for each array
    for (let i = 0; i < size1; i++) {
      let char
      do {
        char = getRandomChar()
      } while (array2.includes(char) || array3.includes(char))
      array1.push(char)
    }

    for (let i = 0; i < size2; i++) {
      let char
      do {
        char = getRandomChar()
      } while (array1.includes(char) || array3.includes(char))
      array2.push(char)
    }

    for (let i = 0; i < size3; i++) {
      let char
      do {
        char = getRandomChar()
      } while (array1.includes(char) || array2.includes(char))
      array3.push(char)
    }

    // Return the result as an object
    return [array1, array2, array3]
  }

  return generateUniqueArrays(3, 3, 2)
}

const TestPage = (props) => {
  const [disabledKeys, setDisabledKeys] = React.useState([])
  const [boardData, setBoardData] = React.useState({
    boardRowLetters: createBoardRowLetters(),
    boardRowHighlights: createBoardRowHighlights(),
    boardScoreModifiers: createBoardScoreModifiers(),
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
        return [...prev, ...lettersToRemove.map((l) => l.toUpperCase())]
      })
      setActiveRow((prev) => prev + 1)
    }
  }

  return (
    <PageWrapper>
      <ScoreModifiers modifiers={boardData.boardScoreModifiers} />
      <div style={{ marginBottom: 12 }} />
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
      <div style={{ marginBottom: 12 }} />
      <BonusWordComponent letters={disabledKeys} maxLetters={8} />
      <div style={{ marginBottom: 12 }} />
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
