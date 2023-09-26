const { getWords, validateWord } = require('../services/WordService')

const controller = {}

controller.randomWord = (req, res, next) => {
  try {
    const { count } = req.query
    const randomIndexes = []
    const randomWords = []
    const words = getWords()
    while (randomIndexes.length < count) {
      let randomNum = Math.floor(Math.random() * words.length)
      if (!randomIndexes.includes(randomNum)) {
        randomIndexes.push(randomNum)
      }
    }
    for (let i = 0; i < randomIndexes.length; i++) {
      randomWords.push(words[randomIndexes[i]])
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
      valid: validateWord(word.toLowerCase()),
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
