const { Cron } = require('croner')
const logger = require('../utils/logger')
const { Day, Puzzle, Leaderboard } = require('../database/models')
const PuzzleGenerator = require('../puzzle/PuzzleGenerator')
const { getTodaysDate } = require('../utils')

async function GenerateLeaderboards(puzzles, dayId) {
  try {
    const leaderboardPromises = []
    puzzles.forEach(async (puzzle) => {
      // We only want to generate a puzzle for the ranked play
      // since we are not tracking for the casual play
      if (puzzle.type === 'ranked') {
        leaderboardPromises.push(
          Leaderboard.findOrCreate({
            where: {
              context: puzzle.contextId,
            },
            defaults: {
              dayId: dayId ? dayId : day.id,
              context: puzzle.contextId,
            },
          }),
        )
      }
    })
    await Promise.all(leaderboardPromises)
  } catch (err) {
    throw err
  }
}
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
    const casualRow = await Puzzle.create({
      dayId: dayId ? dayId : day.id,
      board: casualPuzzle.getPuzzle(),
      type: 'casual',
    })
    const rankedRow = await Puzzle.create({
      dayId: dayId ? dayId : day.id,
      board: rankedPuzzle.getPuzzle(),
      type: 'ranked',
    })

    await GenerateLeaderboards([casualRow, rankedRow], day.id)

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
      include: [Puzzle, Leaderboard],
    }).then((day) => {
      if (!day) {
        return GenerateDayAndPuzzle()
      } else {
        // If we are missing both puzzles and leaderboards
        if (day.Puzzles.length === 0 && day.Leaderboards.length === 0) {
          return GenerateDayAndPuzzle(day.id)
        }
        // If we are missing leaderboards but have puzzles
        if (day.Puzzles.length !== 0 && day.Leaderboards.length !== day.Puzzles.length) {
          return GenerateLeaderboards(day.Puzzles, day.id)
        }
      }
    })
  } catch (err) {
    logger.error(err)
  }
}

module.exports = {
  start,
}
