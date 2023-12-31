'use strict'
const { Model } = require('sequelize')
const { getTodaysDate } = require('../../utils')
module.exports = (sequelize, DataTypes) => {
  class Day extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Puzzle, {
        foreignKey: 'dayId',
      })
      this.hasMany(models.PuzzleSubmission, {
        foreignKey: 'dayId',
      })
      this.hasMany(models.Leaderboard, {
        foreignKey: 'dayId',
      })
    }
  }
  Day.init(
    {
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Day',
    },
  )
  return Day
}
