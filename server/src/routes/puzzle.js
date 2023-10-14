const {
  getTodaysCasualPuzzle,
  getTodaysRankedPuzzle,
  getTodaysPuzzleNumber,
  getPuzzleSubmission,
  createPuzzleSubmission,
  getCasualPuzzleSubmission,
  createCasualPuzzleSubmission,
  submitCasual,
  submitRanked,
} = require('../controllers/PuzzleController')
const { authorize, authorizeCasual } = require('../middleware/authorize')

module.exports = (app) => {
  app.get('/api/puzzle/today/casual', authorizeCasual, getTodaysCasualPuzzle)
  app.get('/api/puzzle/today/ranked', authorize, getTodaysRankedPuzzle)
  app.get('/api/puzzle/today/number', getTodaysPuzzleNumber)
  app.get('/api/puzzle/submission', authorize, getPuzzleSubmission)
  app.post('/api/puzzle/submission', authorize, createPuzzleSubmission)
  app.post('/api/puzzle/submit/ranked', authorize, submitRanked)
  app.get('/api/puzzle/casual/submission', authorizeCasual, getCasualPuzzleSubmission)
  app.post('/api/puzzle/casual/submission', authorizeCasual, createCasualPuzzleSubmission)
  app.post('/api/puzzle/submit/casual', authorizeCasual, submitCasual)
}
