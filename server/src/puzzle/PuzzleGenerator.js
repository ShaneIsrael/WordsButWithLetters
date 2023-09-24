class PuzzleGenerator {
  /**
   *
   * @param {number} rows The number of rows in the puzzle
   * @param {number} rowLength The word size
   * @param {Array} scoreModifierSizes The number of modifiers [x1, x2, x3] e.x input [3, 3, 2]
   * @param {number} secondsToComplete The time the puzzle must be completed in
   */
  constructor(rows, rowLength, scoreModifierSizes, secondsToComplete = 300) {
    this.boardRows = rows
    this.boardRowLength = rowLength
    this.timeToComplete = secondsToComplete
    this.banishedIndexes = PuzzleGenerator.#initBanishedIndexes(rows, rowLength)
    this.scoreModifiers = PuzzleGenerator.#initScoreModifiers(
      scoreModifierSizes[0],
      scoreModifierSizes[1],
      scoreModifierSizes[2],
    )
  }

  getPuzzle() {
    return {
      ...this,
    }
  }

  static #initBanishedIndexes(rowCount, length) {
    function generateUniqueNumbers(n, numberOfUnques) {
      // Generate unique random numbers
      let numbers = []
      while (numbers.length < numberOfUnques) {
        let randomNum = Math.floor(Math.random() * n)
        if (!numbers.includes(randomNum)) {
          numbers.push(randomNum)
        }
      }

      return numbers
    }

    let rows = []
    for (let i = 0; i < rowCount - 1; i++) {
      // odd rows only highlight 1 letter, even highlight 2
      if (i % 2 !== 0) {
        rows.push([
          {
            index: generateUniqueNumbers(length, 1)[0],
            color: 'red',
            animation: 'skew-shake-infinite',
          },
        ])
      } else {
        rows.push(
          generateUniqueNumbers(length, 2).map((num) => ({
            index: num,
            color: 'red',
            animation: 'skew-shake-infinite',
          })),
        )
      }
    }
    rows.push([])
    return rows
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
