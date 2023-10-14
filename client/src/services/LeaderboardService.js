import Api from './Api'

class LeaderboardService {
  getAllRankedEntriesToday() {
    return Api().get('/leaderboard/ranked')
  }
  getAllCasualEntriesToday() {
    return Api().get('/leaderboard/casual')
  }
}

const service = new LeaderboardService()

export default service
