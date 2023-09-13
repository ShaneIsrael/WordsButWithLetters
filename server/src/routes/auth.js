const { register, login, logout } = require('../controllers/authController')
const { authorize } = require('../middleware/authorize')

module.exports = (app) => {
  app.post('/auth/register', register)
  app.post('/auth/login', login)
  app.post('/auth/logout', authorize, logout)
}
