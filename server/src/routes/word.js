const { randomWord, validateWord } = require('../controllers/WordController')

module.exports = (app) => {
  app.get('/api/word/random', randomWord)
  app.get('/api/word/validate', validateWord)
}
