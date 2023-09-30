function selectRandomLocations(array) {
  // Flatten the 2D array into a single array of all locations
  const allLocations = array.flatMap((row, rowIndex) => row.map((_, colIndex) => [rowIndex, colIndex]))

  // Shuffle the locations array
  const shuffledLocations = allLocations.sort(() => Math.random() - 0.5)

  // Select the first 9 unique locations
  const randomLocations = shuffledLocations.slice(0, 9)

  return randomLocations
}

const array = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30],
]

const randomLocations = selectRandomLocations(array)
console.log(randomLocations)
