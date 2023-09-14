import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '../components/wrappers/PageWrapper'
import VKeyboard from '../components/keyboard/VKeyboard'
import GameBoard from '../components/board/GameBoard'

// This is a test page used to place and test new components

const MAX_BOARD_ROWS = 5
const BOARD_ROW_LENGTH = 5

const TestPage = (props) => {
  const [disabledKeys, setDisabledKeys] = React.useState([])
  const [boardData, setBoardData] = React.useState({
    boardRowLetters: [
      new Array(BOARD_ROW_LENGTH).fill(),
      new Array(BOARD_ROW_LENGTH).fill(),
      new Array(BOARD_ROW_LENGTH).fill(),
      new Array(BOARD_ROW_LENGTH).fill(),
      new Array(BOARD_ROW_LENGTH).fill(),
    ],
  })
  const [activeRow, setActiveRow] = React.useState(0)

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

  const handleSubmit = () => {
    if (activeRow < MAX_BOARD_ROWS) {
      // if the row is not completely filled, do not allow submission
      if (boardData.boardRowLetters[activeRow].filter((l) => !l).length > 0) return
      const randomLetter = boardData.boardRowLetters[activeRow][Math.floor(Math.random() * BOARD_ROW_LENGTH)]
      setDisabledKeys((prev) => [...prev, randomLetter])
      setActiveRow((prev) => prev + 1)
    }
  }

  return (
    <PageWrapper>
      <GameBoard rows={MAX_BOARD_ROWS} activeRow={activeRow} rowLetters={boardData.boardRowLetters} />
      <div style={{ marginBottom: 25 }} />
      <VKeyboard
        onKeyPressed={handleKeyPress}
        onDelete={handleDelete}
        disabledKeys={disabledKeys}
        highlightKeys={boardData.boardRowLetters[activeRow]}
        onEnter={handleSubmit}
      />
    </PageWrapper>
  )
}

TestPage.propTypes = {}

export default TestPage
