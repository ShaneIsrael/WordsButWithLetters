const { getAllRankedToday } = require('../controllers/LeaderboardController')

module.exports = (app) => {
  app.get('/api/leaderboard/ranked', getAllRankedToday)
}
