const { getAllRankedToday, getAllCasualToday } = require('../controllers/LeaderboardController')

module.exports = (app) => {
  app.get('/api/leaderboard/ranked', getAllRankedToday)
  app.get('/api/leaderboard/casual', getAllCasualToday)
}
