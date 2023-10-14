const { createLeaderboardEntry } = require('../services/LeaderboardService')
const {
  fetchTodayAndPuzzle,
  fetchSubmission,
  createSubmission,
  fetchCasualSubmission,
  createCasualSubmission,
  validateSubmission,
} = require('../services/PuzzleService')
const { getTodaysDate } = require('../utils')

const controller = {}

controller.getTodaysCasualPuzzle = async (req, res, next) => {
  try {
    const today = await fetchTodayAndPuzzle('casual')
    const submission = await fetchCasualSubmission(req.casualUser.id, today.Puzzles[0].id, today.id)
    // only allow fetching of the puzzle if the user has already
    // created their submission, i.e click the "begin puzzle" button.
    return res.status(200).send(submission ? today : null)
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

controller.getCasualPuzzleSubmission = async (req, res, next) => {
  try {
    const today = await fetchTodayAndPuzzle('casual')
    const submission = await fetchCasualSubmission(req.casualUser.id, today.Puzzles[0].id, today.id)
    return res.status(200).send(submission)
  } catch (err) {
    next(err)
  }
}

controller.createCasualPuzzleSubmission = async (req, res, next) => {
  try {
    const today = await fetchTodayAndPuzzle('casual')
    console.log(req.casualUser)
    const [submission, created] = await createCasualSubmission(req.casualUser.id, today.Puzzles[0].id, today.id)
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
  const { word, date } = req.body
  try {
    const todaysDate = getTodaysDate()
    if (date !== todaysDate) {
      return res.status(400).send('Submission not valid. A new puzzle exists.')
    }
    const today = await fetchTodayAndPuzzle('casual')
    const submission = await fetchCasualSubmission(req.casualUser.id, today.Puzzles[0].id, today.id)
    if (submission.puzzleComplete) {
      return res.status(400).send('You have already completed this puzzle')
    }
    const [accepted, updatedSubmission, message] = await validateSubmission(word, submission, today.Puzzles[0])

    // create leaderboard entry
    if (updatedSubmission.puzzleComplete) {
      const finalScore = updatedSubmission.wordScores.reduce((prev, curr) => prev + curr, 0)
      await createLeaderboardEntry(finalScore, req.casualUser.id, today.Puzzles[0].contextId, 'casual')
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
    const [accepted, updatedSubmission, message] = await validateSubmission(word, submission, today.Puzzles[0])

    // create leaderboard entry
    if (updatedSubmission.puzzleComplete) {
      const finalScore = updatedSubmission.wordScores.reduce((prev, curr) => prev + curr, 0)
      await createLeaderboardEntry(finalScore, req.user.id, today.Puzzles[0].contextId, 'ranked')
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
