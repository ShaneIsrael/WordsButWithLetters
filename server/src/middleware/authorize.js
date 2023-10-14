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

const authorizeCasual = (req, res, next) => {
  const token = req.cookies.casualSession

  if (!token) return res.sendStatus(403)

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY)
    req.casualUser = data
    return next()
  } catch (err) {
    return res.sendStatus(403)
  }
}

const verifyAdmin = (req, res, next) => {
  const email = req.user.email

  if (email !== 'sethwelch85@gmail.com') return res.sendStatus(401)

  return next()
}

const isAuthenticated = (sessionCookie) => {
  if (!sessionCookie) return false

  try {
    const data = jwt.verify(sessionCookie, process.env.SECRET_KEY)
    return data
  } catch (err) {
    return false
  }
}

module.exports = {
  authorize,
  authorizeCasual,
  isAuthenticated,
  verifyAdmin,
}
