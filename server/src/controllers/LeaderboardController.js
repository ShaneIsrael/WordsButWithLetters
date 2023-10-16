const {
  getTodaysRankedEntries,
  getTodaysCasualEntries,
  getLastSevenDaysScores,
} = require('../services/LeaderboardService')

const controller = {}

controller.getAllRankedToday = async (req, res, next) => {
  try {
    const all = await getTodaysRankedEntries()
    return res.status(200).send(all)
  } catch (err) {
    next(err)
  }
}

controller.getAllCasualToday = async (req, res, next) => {
  try {
    const all = await getTodaysCasualEntries()
    return res.status(200).send(all)
  } catch (err) {
    next(err)
  }
}

controller.getLastSevenDays = async (req, res, next) => {
  const { type } = req.query
  try {
    const results = await getLastSevenDaysScores(type)
    return res.status(200).send(results)
  } catch (err) {
    next(err)
  }
}

module.exports = controller
