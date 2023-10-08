const { Leaderboard, LeaderboardEntry } = require('../database/models')
const leaderboard = require('../database/models/leaderboard')

const service = {}

service.createLeaderboardEntry = async (score, userId, contextId) => {
  try {
    const leadboard = await Leaderboard.findOne({
      where: {
        context: contextId,
      },
    })
    // Dont create duplicate entries if one already exists.
    await LeaderboardEntry.findOrCreate({
      where: {
        leaderboardId: leadboard.id,
        userId,
      },
      defaults: {
        score,
        userId,
        leaderboardId: leaderboard.id,
      },
    })
  } catch (err) {
    throw err
  }
}

module.exports = service
