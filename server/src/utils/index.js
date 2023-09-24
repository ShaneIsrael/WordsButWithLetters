const validator = require('email-validator')
module.exports = {
  isValidEmail: (email) => validator.validate(email),
  getTodaysDate: () => new Date().toISOString().split('T')[0],
}
