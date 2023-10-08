const {
  getTodaysPuzzle,
  getTodaysRankedPuzzle,
  getTodaysPuzzleNumber,
  getPuzzleSubmission,
  createPuzzleSubmission,
  submitCasual,
  submitRanked,
} = require('../controllers/PuzzleController')
const { authorize } = require('../middleware/authorize')

module.exports = (app) => {
  app.get('/api/puzzle/today', getTodaysPuzzle)
  app.get('/api/puzzle/today/ranked', authorize, getTodaysRankedPuzzle)
  app.get('/api/puzzle/today/number', getTodaysPuzzleNumber)
  app.get('/api/puzzle/submission', authorize, getPuzzleSubmission)
  app.post('/api/puzzle/submission', authorize, createPuzzleSubmission)
  app.post('/api/puzzle/submit/casual', submitCasual)
  app.post('/api/puzzle/submit/ranked', authorize, submitRanked)
}
