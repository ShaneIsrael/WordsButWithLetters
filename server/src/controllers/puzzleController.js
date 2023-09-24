const { Day, Puzzle } = require('../database/models')
const { getTodaysDate } = require('../utils')

const controller = {}

controller.getTodaysPuzzle = async (req, res, next) => {
  try {
    const todaysDate = getTodaysDate()
    const today = await Day.findOne({
      where: {
        date: todaysDate,
      },
      include: [Puzzle],
    })

    res.status(200).send(today)
  } catch (err) {
    next(err)
  }
}

module.exports = controller
