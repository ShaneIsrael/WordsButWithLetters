const jwt = require('jsonwebtoken')

const authorize = (req, res, next) => {
  const token = req.cookies.session

  if (!token) return res.sendStatus(403)

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY)
    req.user = data
    return next()
  } catch (err) {
    return res.sendStatus(403)
  }
}

const isAuthenticated = (sessionCookie) => {
  if (!sessionCookie) return false

  try {
    jwt.verify(sessionCookie, process.env.SECRET_KEY)
    return true
  } catch (err) {
    return false
  }
}

module.exports = {
  authorize,
  isAuthenticated,
}
