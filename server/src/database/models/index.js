const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'production'
const config = require(__dirname + '/../config/database')[env]
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config.options)

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error)
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
