const fs = require('fs')
const path = require('path')
const service = {}

function loadWordsFromFile(filePath) {
  try {
    const words = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8').split('\n')
    return words.filter((word) => word.trim() !== '')
  } catch (error) {
    console.error('Error loading words from file:', error.message)
    return []
  }
}
const WORDS = loadWordsFromFile('../words.txt')

service.getWords = () => WORDS
service.validateWord = (word) => WORDS.includes(word.toLowerCase())
service.calculateWordScore = (word, modifiers, baseScore = 5) => {
  let totalMods = new Array(modifiers.length).fill(0) //[x2, x3, x4, ...xN] totals

  for (let i = 0; i < modifiers.length; i += 1) {
    for (let j = 0; j < word.length; j += 1) {
      if (modifiers[i].includes(word[j].toUpperCase())) {
        totalMods[i] += 1
      }
    }
  }

  // base word score
  let multiplierBase = 2
  let totalMultiplier = 0
  for (let i = 0; i < totalMods.length; i += 1) {
    totalMultiplier += multiplierBase * totalMods[i]
    multiplierBase += 1
  }

  if (totalMultiplier > 0) return baseScore * totalMultiplier
  return baseScore
}

module.exports = service
