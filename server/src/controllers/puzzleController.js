const { isAuthenticated } = require('../middleware/authorize')
const puzzle = require('../routes/puzzle')
const { fetchTodaysPuzzle, validateSubmissionProgress } = require('../services/PuzzleService')
const { getTodaysDate } = require('../utils')

const controller = {}

controller.getTodaysPuzzle = async (req, res, next) => {
  try {
    const todaysPuzzle = await fetchTodaysPuzzle()
    return res.status(200).send(todaysPuzzle)
  } catch (err) {
    next(err)
  }
}

async function handleRankedSubmission(req, res, next) {
  try {
    return res.status(404).send('ranked submission currently under construction')
  } catch (err) {
    next(err)
  }
}

async function handleCasualSubmission(req, res, next) {
  const { puzzleProgress } = req.body
  if (!puzzleProgress) res.status(400).send('puzzleProgress is required.')
  try {
    if (puzzleProgress.puzzleCompleted) {
      return res.status(400).send('Invalid submission, puzzle already complete.')
    }
    const todaysPuzzle = await fetchTodaysPuzzle()
    const [accepted, progress] = await validateSubmissionProgress(puzzleProgress, todaysPuzzle.Puzzle.board)
    return res.status(200).send({
      accepted,
      date: todaysPuzzle.date,
      board: todaysPuzzle.Puzzle.board,
      progress,
    })
  } catch (err) {
    next(err)
  }
}

controller.submit = async (req, res, next) => {
  try {
    // So that we can use a single route for both authenticated and non-authenticated
    // subimssions. Else we would need to do annoying frontend logic to dictate what
    // route needs to be called.
    if (isAuthenticated(req.cookies?.session)) {
      return handleRankedSubmission(req, res, next)
    }
    return handleCasualSubmission(req, res, next)
  } catch (err) {
    next(err)
  }
}

module.exports = controller
