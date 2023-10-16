const { getAllRankedToday, getAllCasualToday, getLastSevenDays } = require('../controllers/LeaderboardController')

module.exports = (app) => {
  app.get('/api/leaderboard/ranked', getAllRankedToday)
  app.get('/api/leaderboard/casual', getAllCasualToday)
  app.get('/api/leaderboard/lastseven', getLastSevenDays)
}
