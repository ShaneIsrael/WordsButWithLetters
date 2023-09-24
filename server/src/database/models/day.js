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
      this.hasOne(models.Puzzle, {
        foreignKey: 'dayId',
      })
    }
  }
  Day.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
        defaultValue: getTodaysDate(),
      },
    },
    {
      sequelize,
      modelName: 'Day',
    },
  )
  return Day
}
