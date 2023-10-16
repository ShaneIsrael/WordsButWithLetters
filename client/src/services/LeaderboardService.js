import Api from './Api'

class LeaderboardService {
  getAllRankedEntriesToday() {
    return Api().get('/leaderboard/ranked')
  }
  getAllCasualEntriesToday() {
    return Api().get('/leaderboard/casual')
  }
  getLastSevenDaysScores(type = 'casual') {
    return Api().get('/leaderboard/lastseven', { params: { type } })
  }
}

const service = new LeaderboardService()

export default service
