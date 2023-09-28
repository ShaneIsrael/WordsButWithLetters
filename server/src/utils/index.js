const validator = require('email-validator')
module.exports = {
  isValidEmail: (email) => validator.validate(email),
  getTodaysDate: () =>
    new Date().toLocaleString('fr-CA', { timeZone: 'America/Los_Angeles' }).split(' ')[0].replace(',', ''),
}
