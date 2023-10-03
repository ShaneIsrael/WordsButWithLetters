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
 * @param {*} puzzle
 * @param {*} puzzleDate
 * @returns
 */
service.validateSubmissionProgress = async (puzzleProgress, puzzle, puzzleDate) => {
  let progress = puzzleProgress
  const board = puzzle.board
  const usedWords = progress.wordMatrix.map((word) => word.join(''))
  const currentWord = usedWords[progress.activeRow]

  console.log(progress.date, puzzleDate)
  if (progress.date !== puzzleDate) {
    progress.puzzleComplete = true
    return [true, progress, 'Puzzle no longer valid. A new puzzle exists.']
  }

  // if the row is not completely filled, do not allow submission
  if (currentWord.length !== 5) return [false, progress, 'Must be a 5 letter word']

  if (
    usedWords
      .filter((word) => word)
      .slice(0, -1)
      .includes(currentWord)
  )
    return [false, progress, 'Word already used']

  if (progress.banishedLetters.length > 0 && progress.banishedLetters.some((bl) => currentWord.includes(bl))) {
    return [false, progress, 'Invalid letters']
  }
  const thisWord = currentWord.toLowerCase()

  const isValid = validateWord(thisWord)
  if (!isValid) {
    return [false, progress, 'Word not in dictionary']
  }

  const indexesToRemove = board.banishedIndexes.filter((bi) => bi[0] === progress.activeRow).map((i) => i[1])
  const lettersToRemove = thisWord.split('').filter((l, index) => indexesToRemove.includes(index))
  progress.banishedLetters = progress.banishedLetters.concat([...lettersToRemove.map((l) => l.toUpperCase())])
  progress.wordScores.push(
    calculateWordScore(thisWord, board.scoreModifiers, board.scoreMultipliers, board.baseWordValue),
  )

  const [puzzleComplete, completeMessage] = service.validatePuzzleComplete(progress, board)

  if (puzzleComplete) {
    progress.puzzleComplete = true
    progress.completeMessage = completeMessage
    // check for bonus word
    for (let i = 0; i < 5; i += 1) {
      const wordToCheck = progress.banishedLetters.slice(i, 5 + i).join('')
      const bonusFound = validateWord(wordToCheck)
      if (bonusFound) {
        progress.bonusWordFound = wordToCheck
        progress.wordScores.push(
          calculateWordScore(wordToCheck, board.scoreModifiers, board.scoreMultipliers, board.baseBonusWordValue),
        )
        break
      }
    }
  }

  progress.activeRow += 1
  return [true, progress]
}

service.validatePuzzleComplete = (progress, board) => {
  if (progress.activeRow === board.boardRows - 1) return [true, 'Puzzle completed!']
  if (
    progress.banishedLetters.length > 0 &&
    ['A', 'E', 'I', 'O', 'U'].every((v) => progress.banishedLetters.includes(v))
  )
    return [true, 'All vowels are unusable. Puzzle completed!']
  return [false, null]
}

module.exports = service
