class PuzzleGenerator {
  /**
   *
   * @param {number} rows The number of rows in the puzzle
   * @param {number} rowLength The word size
   * @param {Array} scoreModifierSizes The number of modifiers [x1, x2, x3] e.x input [3, 3, 2]
   * @param {number} secondsToComplete The time the puzzle must be completed in
   */
  constructor(rows, rowLength, scoreModifierSizes, scoreMultipliers, secondsToComplete = 300) {
    this.boardRows = rows
    this.boardRowLength = rowLength
    this.timeToComplete = secondsToComplete
    this.banishedIndexes = PuzzleGenerator.#initBonusIndexes(rows, rowLength, 9)
    this.scoreModifiers = PuzzleGenerator.#initScoreModifiers(
      scoreModifierSizes[0],
      scoreModifierSizes[1],
      scoreModifierSizes[2],
    )
    this.scoreMultipliers = scoreMultipliers
  }

  getPuzzle() {
    return {
      ...this,
    }
  }

  static #initBonusIndexes(rowCount, length, numberOfIndexes) {
    function selectRandomLocations(array) {
      // Flatten the 2D array into a single array of all locations
      const allLocations = array.flatMap((row, rowIndex) => row.map((_, colIndex) => [rowIndex, colIndex]))

      // Shuffle the locations array
      const shuffledLocations = allLocations.sort(() => Math.random() - 0.5)

      // Select the first 9 unique locations
      const randomLocations = shuffledLocations.slice(0, numberOfIndexes)

      const counts = {}
      randomLocations.forEach(loc => counts[loc[0]] ? counts[loc[0]] += 1 : counts[loc[0]] = 1)
      // Regenerate if row contains all bonus indexes
      if (Object.keys(counts).find(c => counts[c] === 5)) return selectRandomLocations(array)

      return randomLocations
    }

    return selectRandomLocations(Array.from({ length: rowCount }).map(() => Array.from({ length: length }).fill()))
  }
  static #initScoreModifiers(size1, size2, size3) {
    // Create an array with all alphabets (a-z)
    const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(97 + i).toUpperCase())

    // Function to get a random character from the alphabet
    const getRandomChar = () => {
      return alphabet[Math.floor(Math.random() * alphabet.length)]
    }

    const array1 = []
    const array2 = []
    const array3 = []

    // Generate unique characters for each array
    for (let i = 0; i < size1; i++) {
      let char
      do {
        char = getRandomChar()
      } while (array1.includes(char) || array2.includes(char) || array3.includes(char))
      array1.push(char)
    }

    for (let i = 0; i < size2; i++) {
      let char
      do {
        char = getRandomChar()
      } while (array1.includes(char) || array2.includes(char) || array3.includes(char))
      array2.push(char)
    }

    for (let i = 0; i < size3; i++) {
      let char
      do {
        char = getRandomChar()
      } while (array1.includes(char) || array2.includes(char) || array3.includes(char))
      array3.push(char)
    }

    // Return the result as an object
    return [array1, array2, array3]
  }
}

module.exports = PuzzleGenerator
