const { Day, Puzzle } = require('../database/models')
const { getTodaysDate } = require('../utils')

const controller = {}

controller.getTodaysPuzzle = async (req, res, next) => {
  try {
    // todays puzzle should ALWAYS be the latest puzzle
    const today = await Day.findOne({
      order: [['createdAt', 'DESC']],
      include: [Puzzle],
    })

    res.status(200).send(today)
  } catch (err) {
    next(err)
  }
}

module.exports = controller
