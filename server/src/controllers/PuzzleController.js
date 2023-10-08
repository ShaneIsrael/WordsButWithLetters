const { isAuthenticated } = require('../middleware/authorize')
const {
  fetchTodayAndPuzzle,
  fetchSubmission,
  createSubmission,
  validateRankedSubmission,
  validateSubmissionProgress,
} = require('../services/PuzzleService')
const { getTodaysDate } = require('../utils')

const controller = {}

controller.getTodaysPuzzle = async (req, res, next) => {
  try {
    const todaysPuzzle = await fetchTodayAndPuzzle()
    return res.status(200).send(todaysPuzzle)
  } catch (err) {
    next(err)
  }
}

controller.getTodaysRankedPuzzle = async (req, res, next) => {
  try {
    const todaysPuzzle = await fetchTodayAndPuzzle('ranked')
    const submission = await fetchSubmission(req.user.id, todaysPuzzle.Puzzle.id, todaysPuzzle.id)
    // only allow fetching of the ranked puzzle if the user has already
    // created their submission, i.e click the "begin puzzle" button.
    return res.status(200).send(submission ? todaysPuzzle : null)
  } catch (err) {
    next(err)
  }
}

controller.getPuzzleSubmission = async (req, res, next) => {
  try {
    const today = await fetchTodayAndPuzzle('ranked')
    const submission = await fetchSubmission(req.user.id, today.Puzzle.id, today.id)
    return res.status(200).send(submission)
  } catch (err) {
    next(err)
  }
}

controller.createPuzzleSubmission = async (req, res, next) => {
  try {
    const today = await fetchTodayAndPuzzle('ranked')
    const [submission, created] = await createSubmission(req.user.id, today.Puzzle.id, today.id)
    return res.status(200).send({ submission, created })
  } catch (err) {
    next(err)
  }
}

controller.getTodaysPuzzleNumber = async (req, res, next) => {
  try {
    const todaysPuzzle = await fetchTodayAndPuzzle()
    return res.status(200).send({ number: todaysPuzzle.id })
  } catch (err) {
    next(err)
  }
}

controller.submitCasual = async (req, res, next) => {
  const { puzzleProgress } = req.body
  if (!puzzleProgress) res.status(400).send('puzzleProgress is required.')
  try {
    if (puzzleProgress.puzzleCompleted) {
      return res.status(400).send('Invalid submission, puzzle already complete.')
    }
    const todaysPuzzle = await fetchTodayAndPuzzle()
    const [accepted, progress, message] = await validateSubmissionProgress(
      puzzleProgress,
      todaysPuzzle.Puzzle,
      todaysPuzzle.date,
    )
    return res.status(200).send({
      accepted,
      message,
      date: todaysPuzzle.date,
      puzzle: todaysPuzzle.Puzzle,
      progress,
    })
  } catch (err) {
    next(err)
  }
}

controller.submitRanked = async (req, res, next) => {
  const { word, date } = req.body
  try {
    const todaysDate = getTodaysDate()
    if (date !== todaysDate) {
      return res.status(400).send('Submission not valid. A new puzzle exists.')
    }
    const today = await fetchTodayAndPuzzle('ranked')
    const submission = await fetchSubmission(req.user.id, today.Puzzle.id, today.id)
    const [accepted, updatedSubmission, message] = await validateRankedSubmission(word, submission, today.Puzzle)
    updatedSubmission.save()

    return res.status(200).send({
      accepted,
      message,
      submission: updatedSubmission,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = controller
