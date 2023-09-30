const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../database/models')
const { isValidEmail } = require('../utils')
const { Op } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
const  { sendVerificationEmail } = require('../services/EmailService')

const isProduction = process.env.NODE_ENV === 'production'

const controller = {}

const COOKIE_PARAMS = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  // sameSite: 'None',
  sameSite: 'Strict',
  secure: true,
}

const signUserJwt = ({ id, email, displayName }) => jwt.sign({ id, email, displayName }, process.env.SECRET_KEY)

controller.register = async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body

    if (!isValidEmail(email)) return res.status(400).send('Invalid email format.')

    if (!(email && password && displayName))
      return res.status(400).send('Email, Password, and Display Name are required.')

    if (displayName.length < 5) return res.status(400).send('Display name must be at least 5 characters.')

    if (password.length < 5) return res.status(400).send('Password must be at least 5 characters.')

    const userLookup = await User.findOne({ where: { [Op.or]: { email, displayName } } })

    if (userLookup && userLookup.email === email.toLowerCase())
      return res.status(409).send('An account with that e-mail already exists.')
    if (userLookup && userLookup.displayName === displayName)
      return res.status(409).send('Display name already in use, please choose another.')

    const hash = await bcrypt.hash(password, 10)
    const token = uuidv4()

    sendVerificationEmail(email.toLowerCase(), token, displayName).then(async () => {
      await User.create({ email: email.toLowerCase(), displayName, password: hash, token, verified: isProduction ? false : true})
      return res.status(200).send('A verification email has been sent to that address. Please check your spam folder.')
    }).catch(err => {
      res.status(500).send('Unable to create account, please try again later.')
      next(err)
    })
    
  } catch (err) {
    next(err)
  }
}

controller.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!(email && password)) return res.status(400).send('Email & Password required.')

    const user = await User.findOne({ where: { email } })

    if (!user.verified) {
      return res.status(401).send('Awaiting email verification.')
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = signUserJwt(user)
      res.cookie('session', accessToken, COOKIE_PARAMS)
      return res
        .cookie(
          'user',
          JSON.stringify({
            id: user.id,
            displayName: user.displayName,
            email: user.email,
          }),
        )
        .sendStatus(200)
    }

    return res.status(400).send('Invalid email or password.')
  } catch (err) {
    next(err)
  }
}

controller.verifyEmail = async (req, res, next) => {
  try {
    const email = req.params.email
    const token = req.params.token
  
    if (!email || !token) {
      return res.status(400).send('Invalid verification link')
    }
    
    const user = await User.findOne({ where: { email, token }})

    if (!user) {
      return res.status(400).send('Invalid verification link')
    }

    user.verified = true
    user.token = null
    user.save()

    return res.status(200).send('verified!')

  } catch (err) {
    next (err)
  }
}

controller.logout = async (req, res, next) => {
  res.clearCookie('user')
  res.clearCookie('session')
  return res.status(200).json({ message: 'Successfully logged out!' })
}

module.exports = controller
