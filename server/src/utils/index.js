const validator = require('email-validator')
module.exports = {
  isValidEmail: (email) => validator.validate(email),
  getTodaysDate: () =>
    new Date().toLocaleString('fr-CA', { timeZone: 'America/Los_Angeles' }).match(/\d{4}-\d{2}-\d{2}/g)[0],
}
