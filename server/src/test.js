const Puzzle = require('./puzzle/PuzzleGenerator')

const puzzle = new Puzzle(6, 5, [3, 3, 2])

const d = puzzle.getPuzzle()
console.log(d)
