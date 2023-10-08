const { Cron } = require('croner')
const logger = require('../utils/logger')
const { Day, Puzzle } = require('../database/models')
const PuzzleGenerator = require('../puzzle/PuzzleGenerator')
const { getTodaysDate } = require('../utils')

async function GenerateDayAndPuzzle(dayId) {
  try {
    let day
    if (!dayId) {
      day = await Day.create({
        date: getTodaysDate(),
      })
    }
    const casualPuzzle = new PuzzleGenerator(6, 5, 10, 60, [3, 3, 2], [2, 4, 8], 300)
    const rankedPuzzle = new PuzzleGenerator(6, 5, 10, 60, [3, 3, 2], [2, 4, 8], 300)
    await Puzzle.create({
      dayId: dayId ? dayId : day.id,
      board: casualPuzzle.getPuzzle(),
      type: 'casual',
    })
    await Puzzle.create({
      dayId: dayId ? dayId : day.id,
      board: rankedPuzzle.getPuzzle(),
      type: 'ranked',
    })
    logger.info('Day & Puzzle generated successfully.')
  } catch (err) {
    logger.error('An error occurred generating the nightly day & puzzle.')
    throw err
  }
}

function start() {
  try {
    logger.info('Nightly cron initialized, will run at 12:00 AM PST')
    Cron('0 0 0 * * *', { timezone: 'America/Los_Angeles' }, async () => {
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
      } else {
        GenerateDayAndPuzzle(day.id)
      }
    })
  } catch (err) {
    logger.error(err)
  }
}

module.exports = {
  start,
}
