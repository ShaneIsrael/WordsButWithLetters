const { getTodaysPuzzle } = require('../controllers/puzzleController')

module.exports = (app) => {
  app.get('/api/puzzle/today', getTodaysPuzzle)
}
