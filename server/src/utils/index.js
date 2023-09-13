const validator = require('email-validator')
module.exports = {
  isValidEmail: (email) => validator.validate(email),
}
