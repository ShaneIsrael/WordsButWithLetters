const { getTodaysRankedEntries } = require('../services/LeaderboardService')

const controller = {}

controller.getAllRankedToday = async (req, res, next) => {
  try {
    const all = await getTodaysRankedEntries()
    return res.status(200).send(all)
  } catch (err) {
    throw err
  }
}

module.exports = controller
