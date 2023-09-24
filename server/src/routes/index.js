const { authorize } = require('../middleware/authorize')
const { Day, Puzzle } = require('../database/models')
const PuzzleGenerator = require('../puzzle/PuzzleGenerator')

module.exports = (app) => {
  app.get('/api', (req, res, next) =>
    res.status(200).json({
      message: 'Welcome to the API',
    }),
  )

  app.all('*', (req, res, next) =>
    res.status(404).json({
      message: 'Route un-available',
    }),
  )
}
