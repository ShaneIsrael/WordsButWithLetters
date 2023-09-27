const { getTodaysPuzzle, getTodaysPuzzleNumber, submit } = require('../controllers/PuzzleController')

module.exports = (app) => {
  app.get('/api/puzzle/today', getTodaysPuzzle)
  app.get('/api/puzzle/today/number', getTodaysPuzzleNumber)
  app.post('/api/puzzle/submit', submit)
}
