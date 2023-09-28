const _ = require('lodash')
const { Day, Puzzle } = require('../database/models')
const { validateWord, calculateWordScore } = require('./WordService')
const puzzle = require('../routes/puzzle')
const service = {}

/**
 * Fetches the Day and Puzzle
 * @returns Day and Puzzle
 */
service.fetchTodaysPuzzle = async () => {
  // todays puzzle should ALWAYS be the latest puzzle
  const today = await Day.findOne({
    order: [['createdAt', 'DESC']],
    include: [Puzzle],
  })
  return today
}

/**
 * Checks if the current submission is valid and updates the players progress
 * @param {*} puzzleProgress
 * @param {*} board
 * @returns
 */
service.validateSubmissionProgress = async (puzzleProgress, board) => {
  let progress = puzzleProgress
  const currentWordArray = progress.wordMatrix[progress.activeRow]
  // if the row is not completely filled, do not allow submission
  if (currentWordArray.filter((l) => !l).length > 0) return [false, progress]

  if (progress.banishedLetters.length > 0 && progress.banishedLetters.some((bl) => currentWordArray.includes(bl))) {
    return [false, progress]
  }
  const thisWord = currentWordArray
    .filter((l) => l)
    .join('')
    .toLowerCase()

  const isValid = thisWord.length === 5 && validateWord(thisWord)
  if (!isValid) {
    return [false, progress]
  }

  const indexesToRemove = board.banishedIndexes[progress.activeRow].map((i) => i.index)
  const lettersToRemove = thisWord.split('').filter((l, index) => indexesToRemove.includes(index))
  progress.banishedLetters = progress.banishedLetters.concat([...lettersToRemove.map((l) => l.toUpperCase())])
  progress.wordScores.push(calculateWordScore(thisWord, board.scoreModifiers, board.scoreMultipliers))

  const [puzzleComplete, completeMessage] = service.validatePuzzleComplete(progress, board)

  if (puzzleComplete) {
    progress.puzzleComplete = true
    progress.completeMessage = completeMessage
    // check for bonus word
    for (let i = 0; i < 3; i += 1) {
      const wordToCheck = progress.banishedLetters.slice(i, 5 + i).join('')
      const bonusFound = validateWord(wordToCheck)
      if (bonusFound) {
        progress.bonusWordFound = wordToCheck
        progress.wordScores.push(calculateWordScore(wordToCheck, board.scoreModifiers, board.scoreMultipliers, 50))
        break
      }
    }
  }

  progress.activeRow += 1
  return [true, progress]
}

service.validatePuzzleComplete = (progress, board) => {
  if (progress.activeRow === board.boardRows - 1) return [true, null]
  if (
    progress.banishedLetters.length > 0 &&
    ['A', 'E', 'I', 'O', 'U'].every((v) => progress.banishedLetters.includes(v))
  )
    return [true, 'No Available Vowels']
  return [false, null]
}

module.exports = service
