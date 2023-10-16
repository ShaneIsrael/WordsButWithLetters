const { Op } = require('sequelize')
const { Puzzle, Leaderboard, LeaderboardEntry, Day, User, CasualUser, PuzzleSubmission } = require('../database/models')
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

service.getTodaysCasualEntries = async () => {
  try {
    const today = await Day.findOne({
      where: {
        date: getTodaysDate(),
      },
      include: [{ model: Puzzle, where: { type: 'casual' } }],
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
              model: CasualUser,
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

service.getLastSevenDaysScores = async (type = 'casual') => {
  try {
    const days = await Day.findAll({
      order: [['id', 'DESC']],
      limit: 7,
      include: [{ model: Puzzle, where: { type } }],
    })
    const contexts = days.map((d) => d.Puzzles[0].contextId)
    const boards = await Leaderboard.findAll({
      where: {
        context: {
          [Op.in]: contexts,
        },
      },
      include: [{ model: LeaderboardEntry, include: [User, CasualUser] }],
    })
    const scoreTally = {}
    boards.forEach((board) => {
      board.LeaderboardEntries.forEach((lbe) => {
        const user = type === 'casual' ? lbe.CasualUser : lbe.User
        const score = lbe.score
        if (!scoreTally[user.id]) scoreTally[user.id] = { score: lbe.score, displayName: user.displayName }
        else scoreTally[user.id].score += score
      })
    })
    const asArray = Object.keys(scoreTally).map((key) => scoreTally[key])
    const sortedByScore = asArray.sort((a, b) => b.score - a.score)
    return sortedByScore
  } catch (err) {
    throw err
  }
}

service.createLeaderboardEntry = async (score, userId, contextId, type) => {
  try {
    const leadboard = await Leaderboard.findOne({
      where: {
        context: contextId,
      },
    })
    // Dont create duplicate entries if one already exists.
    if (type === 'ranked') {
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
    } else {
      await LeaderboardEntry.findOrCreate({
        where: {
          leaderboardId: leadboard.id,
          casualUserId: userId,
        },
        defaults: {
          score,
          casualUserId: userId,
          leaderboardId: leaderboard.id,
        },
      })
    }
  } catch (err) {
    throw err
  }
}

module.exports = service
