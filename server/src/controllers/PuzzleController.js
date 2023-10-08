const { createLeaderboardEntry } = require('../services/LeaderboardService')
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
    const today = await fetchTodayAndPuzzle('ranked')
    const submission = await fetchSubmission(req.user.id, today.Puzzles[0].id, today.id)
    // only allow fetching of the ranked puzzle if the user has already
    // created their submission, i.e click the "begin puzzle" button.
    return res.status(200).send(submission ? today : null)
  } catch (err) {
    next(err)
  }
}

controller.getPuzzleSubmission = async (req, res, next) => {
  try {
    const today = await fetchTodayAndPuzzle('ranked')
    const submission = await fetchSubmission(req.user.id, today.Puzzles[0].id, today.id)
    return res.status(200).send(submission)
  } catch (err) {
    next(err)
  }
}

controller.createPuzzleSubmission = async (req, res, next) => {
  try {
    const today = await fetchTodayAndPuzzle('ranked')
    const [submission, created] = await createSubmission(req.user.id, today.Puzzles[0].id, today.id)
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
      todaysPuzzle.Puzzles[0],
      todaysPuzzle.date,
    )
    return res.status(200).send({
      accepted,
      message,
      date: todaysPuzzle.date,
      puzzle: todaysPuzzle.Puzzles[0],
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
    const submission = await fetchSubmission(req.user.id, today.Puzzles[0].id, today.id)
    if (submission.puzzleComplete) {
      return res.status(400).send('You have already completed this puzzle')
    }
    const [accepted, updatedSubmission, message] = await validateRankedSubmission(word, submission, today.Puzzles[0])

    // create leaderboard entry
    if (updatedSubmission.puzzleComplete) {
      const finalScore = updatedSubmission.wordScores.reduce((prev, curr) => prev + curr, 0)
      await createLeaderboardEntry(finalScore, req.user.id, today.Puzzles[0].contextId)
    }

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
