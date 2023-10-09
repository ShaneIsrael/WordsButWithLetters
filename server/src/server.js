const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
const logger = require('./utils/logger')
const db = require('./database/models')

const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'

const PORT = isProduction ? 8080 : 3001

app.set('trust proxy', true)

app.use(
  morgan('combined', {
    skip(req, res) {
      return isProduction ? res.statusCode >= 200 : res.statusCode >= 500
    },
    stream: logger.stream,
  }),
)

// Body parser and helmet middleware
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// CORS middleware
app.use(
  cors({
    origin: process.env.DOMAIN,
    credentials: true,
  }),
)

// API Routes
require('./routes/auth')(app)
require('./routes/comment')(app)
require('./routes/word')(app)
require('./routes/puzzle')(app)
require('./routes/leaderboard')(app)
require('./routes')(app)

// Error Handler
app.use((err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.headers['x-real-ip']} - ${
      err.stack
    }`,
  )
  res.status(err.status || 500).send(err.message || 'Unexpected server error occurred.')
  next()
})

// Start cron jobs
require('./cron').start()
app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`))

module.exports = app
