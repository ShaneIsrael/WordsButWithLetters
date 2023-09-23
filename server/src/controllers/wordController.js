const fs = require('fs')
const path = require('path')
const controller = {}

function loadWordsFromFile(filePath) {
  try {
    const words = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8').split('\n')
    return words.filter((word) => word.trim() !== '')
  } catch (error) {
    console.error('Error loading words from file:', error.message)
    return []
  }
}
const WORDS = loadWordsFromFile('../sgb-words.txt')
const WORDS_LENGTH = WORDS.length

controller.randomWord = (req, res, next) => {
  try {
    const { count } = req.query
    const randomIndexes = []
    const randomWords = []
    while (randomIndexes.length < count) {
      let randomNum = Math.floor(Math.random() * WORDS_LENGTH)
      if (!randomIndexes.includes(randomNum)) {
        randomIndexes.push(randomNum)
      }
    }
    for (let i = 0; i < randomIndexes.length; i++) {
      randomWords.push(WORDS[randomIndexes[i]])
    }

    return res.status(200).send(randomWords)
  } catch (err) {
    return next(err)
  }
}

controller.validateWord = (req, res, next) => {
  try {
    const { word } = req.query
    return res.status(200).send({
      valid: WORDS.includes(word.toLowerCase()),
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
