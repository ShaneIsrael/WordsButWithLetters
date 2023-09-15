const { randomWord, validateWord } = require('../controllers/wordController')

module.exports = (app) => {
  app.get('/word/random', randomWord)
  app.get('/word/validate', validateWord)
}
