const validator = require('email-validator')
const fs = require('fs')
const path = require('path')

module.exports = {
  isValidEmail: (email) => validator.validate(email),
  getTodaysDate: () =>
    new Date().toLocaleString('fr-CA', { timeZone: 'America/Los_Angeles' }).match(/\d{4}-\d{2}-\d{2}/g)[0],
  loadWordsFromFile: (filePath) => {
    try {
      const words = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8').split('\n')
      return words.filter((word) => word.trim() !== '')
    } catch (error) {
      console.error('Error loading words from file:', error.message)
      return []
    }
  },
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
}
