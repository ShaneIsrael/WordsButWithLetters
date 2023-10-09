import Api from './Api'

class LeaderboardService {
  getAllRankedEntriesToday() {
    return Api().get('/leaderboard/ranked')
  }
}

const service = new LeaderboardService()

export default service
