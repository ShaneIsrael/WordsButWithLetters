const Puzzle = require('./puzzle/Puzzle')

const puzzle = new Puzzle(6, 5, [3, 3, 2])

const d = puzzle.getPuzzle()
console.log(d)

const { Day } = require('./database/models')

const day = Day.create()

console.log(day)
