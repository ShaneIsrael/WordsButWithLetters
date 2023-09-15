import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '../components/wrappers/PageWrapper'
import VKeyboard from '../components/keyboard/VKeyboard'
import GameBoard from '../components/board/GameBoard'
import PuzzleService from '../services/PuzzleService'
// This is a test page used to place and test new components

const MAX_BOARD_ROWS = 6
const BOARD_ROW_LENGTH = 5

var alphabet = []
for (var i = 65; i <= 90; i++) {
  alphabet.push(String.fromCharCode(i))
}

function jumblify(word) {
  // Convert the word into an array of characters
  var wordArray = word.split('')

  // Randomly shuffle the characters using the Fisher-Yates algorithm
  for (var i = wordArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = wordArray[i]
    wordArray[i] = wordArray[j]
    wordArray[j] = temp
  }

  return wordArray
}

function createRowLetters() {
  let rows = []
  for (let i = 0; i < MAX_BOARD_ROWS; i++) {
    rows.push(new Array(BOARD_ROW_LENGTH).fill())
  }
  return rows
}

function createRowHighlights(rowHints) {
  let rows = []
  for (let i = 0; i < MAX_BOARD_ROWS; i++) {
    // odd rows only highlight 1 letter, even highlight 2
    if (rowHints[i].length > 0) {
      rows.push(
        rowHints[i].map((hint) => ({
          index: hint.index,
          color: 'yellow',
          animation: '',
        })),
      )
    } else {
      rows.push([])
    }
  }
  return rows
}

const TestPage3 = (props) => {
  const [disabledKeys, setDisabledKeys] = React.useState([])
  const [boardData, setBoardData] = React.useState()
  const [showPuzzle, setShowPuzzle] = React.useState(false)
  const [activeRow, setActiveRow] = React.useState(null)
  const [failedAttempts, setFailedAttempts] = React.useState(0)
  const [puzzleComplete, setPuzzleComplete] = React.useState(false)

  const handleKeyPress = (key) => {
    if (disabledKeys.indexOf(key) >= 0) return

    setBoardData((board) => ({
      ...board,
      rowLetters: board.rowLetters.map((row, rowIndex) => {
        let trow = row
        if (rowIndex === activeRow) {
          for (let i = 0; i < trow.length; i++) {
            const hint = board.rowHints[activeRow].filter((hint) => hint.index === i)[0]
            if (!trow[i] && !hint) {
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
    if (boardData.rowLetters[activeRow].filter((l) => l).length === 0) return

    setBoardData((board) => ({
      ...board,
      rowLetters: board.rowLetters.map((row, rowIndex) => {
        let trow = row
        if (rowIndex === activeRow) {
          for (let i = trow.length; i >= 0; i--) {
            const hint = board.rowHints[activeRow].filter((hint) => hint.index === i)[0]
            if (trow[i] !== undefined && !hint) {
              trow[i] = undefined
              break
            }
          }
        }
        return trow
      }),
    }))
  }

  const clearRow = () => {
    setBoardData((board) => ({
      ...board,
      rowLetters: board.rowLetters.map((row, rowIndex) => {
        let trow = row
        if (rowIndex === activeRow) {
          for (let i = trow.length; i >= 0; i--) {
            const hint = board.rowHints[activeRow].filter((hint) => hint.index === i)[0]
            if (trow[i] !== undefined && !hint) {
              trow[i] = undefined
            }
          }
        }
        return trow
      }),
    }))
  }

  const handleSubmit = () => {
    if (activeRow < MAX_BOARD_ROWS) {
      // if the row is not completely filled, do not allow submission
      if (boardData.rowLetters[activeRow].filter((l) => !l).length > 0) return

      const submittedWord = boardData.rowLetters[activeRow].join('')
      if (submittedWord === boardData.rowSolutions[activeRow]) {
        if (activeRow === MAX_BOARD_ROWS - 1) {
          setPuzzleComplete(true)
        }
        setActiveRow((prev) => prev + 1)
        setFailedAttempts(0)
      } else {
        // clearRow()
        setFailedAttempts((prev) => prev + 1)
      }
    }
  }

  React.useEffect(() => {
    if (boardData && activeRow < MAX_BOARD_ROWS) {
      setDisabledKeys(alphabet.filter((c) => !boardData.rowJumbled[activeRow].includes(c)))
    }
  }, [activeRow, boardData?.rowJumbled])

  React.useEffect(() => {
    if (failedAttempts > 0) {
      const tempRowHints = boardData.rowHints
      const solutionWord = boardData.rowSolutions[activeRow]
      while (true) {
        const randomIndex = Math.floor(Math.random() * BOARD_ROW_LENGTH)
        if (tempRowHints[activeRow].filter((rh) => rh.index === randomIndex).length === 0) {
          tempRowHints[activeRow].push({ index: randomIndex, letter: solutionWord[randomIndex] })
          break
        }
      }

      setBoardData((prev) => ({
        ...prev,
        rowHints: tempRowHints,
        rowLetters: prev.rowLetters.map((row, rowIndex) => {
          let trow = row
          if (rowIndex === activeRow) {
            for (let i = 0; i < trow.length; i++) {
              const hint = tempRowHints[activeRow].filter((hint) => hint.index === i)[0]
              if (hint) {
                trow[i] = hint.letter
              }
            }
          }
          return trow
        }),
        rowHighlights: createRowHighlights(tempRowHints),
      }))
    }
  }, [failedAttempts])

  React.useEffect(() => {
    async function setup() {
      const words = (await PuzzleService.getRandomWords(MAX_BOARD_ROWS)).data
      setBoardData({
        rowLetters: createRowLetters(),
        rowHints: words.map((x) => []),
        rowJumbled: words.map((word) => jumblify(word.toUpperCase())),
        rowSolutions: words.map((word) => word.toUpperCase()),
        // rowHighlights: createRowHighlights(),
      })
      setActiveRow(0)
    }
    setup()
  }, [])

  return (
    <PageWrapper>
      {boardData && (
        <>
          <GameBoard
            hide={!showPuzzle}
            rows={MAX_BOARD_ROWS}
            activeRow={activeRow}
            rowLetters={boardData.rowLetters}
            rowHighlights={boardData.rowHighlights}
            onStart={() => setShowPuzzle(true)}
            failedAttempt={failedAttempts}
            puzzleComplete={puzzleComplete}
          />

          <div style={{ marginBottom: 25 }} />
          <VKeyboard
            onKeyPressed={handleKeyPress}
            onDelete={handleDelete}
            disabledKeys={disabledKeys}
            highlightKeys={boardData.rowLetters[activeRow]}
            onEnter={handleSubmit}
          />
        </>
      )}
    </PageWrapper>
  )
}

TestPage3.propTypes = {}

export default TestPage3
