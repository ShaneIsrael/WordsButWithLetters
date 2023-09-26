const { getTodaysPuzzle, submit } = require('../controllers/puzzleController')

module.exports = (app) => {
  app.get('/api/puzzle/today', getTodaysPuzzle)
  app.post('/api/puzzle/submit', submit)
}
