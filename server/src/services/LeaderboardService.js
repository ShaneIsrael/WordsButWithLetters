const { Puzzle, Leaderboard, LeaderboardEntry, Day, User, PuzzleSubmission } = require('../database/models')
const leaderboard = require('../database/models/leaderboard')
const { getTodaysDate } = require('../utils')

const service = {}

service.getTodaysRankedEntries = async () => {
  try {
    const today = await Day.findOne({
      where: {
        date: getTodaysDate(),
      },
      include: [{ model: Puzzle, where: { type: 'ranked' } }],
    })
    const leaderboard = await Leaderboard.findOne({
      attributes: ['createdAt'],
      where: {
        dayId: today.id,
        context: today.Puzzles[0].contextId,
      },
      include: [
        {
          model: LeaderboardEntry,
          attributes: ['score'],
          include: [
            {
              model: User,
              attributes: ['displayName'],
              include: [{ model: PuzzleSubmission, where: { dayId: today.id }, attributes: ['bonusWord'] }],
            },
          ],
        },
      ],
    })
    return leaderboard
  } catch (err) {
    throw err
  }
}

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
