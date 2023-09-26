const { Cron } = require('croner')
const logger = require('../utils/logger')
const { Day, Puzzle } = require('../database/models')
const PuzzleGenerator = require('../puzzle/PuzzleGenerator')
const { getTodaysDate } = require('../utils')

async function GenerateDayAndPuzzle() {
  try {
    const day = await Day.create({
      date: getTodaysDate(),
    })
    const puzzle = new PuzzleGenerator(6, 5, [3, 3, 2], 300)
    await Puzzle.create({
      dayId: day.id,
      board: puzzle.getPuzzle(),
    })
    logger.info('Day & Puzzle generated successfully.')
  } catch (err) {
    logger.error('An error occurred generating the nightly day & puzzle.')
    throw err
  }
}

function start() {
  try {
    logger.info('Nightly cron initialized, will run at 12:00 AM UTC')
    Cron('0 0 0 * * *', { timezone: 'Etc/UTC' }, async () => {
      logger.info('Running Nightly cron..')
      await GenerateDayAndPuzzle().catch((err) => logger.error(err))
    })

    // Initialize a puzzle for today if one doesn't already exist
    Day.findOne({
      where: {
        date: getTodaysDate(),
      },
      include: [Puzzle],
    }).then((day) => {
      if (!day) {
        GenerateDayAndPuzzle()
      }
    })
  } catch (err) {
    logger.error(err)
  }
}

module.exports = {
  start,
}
