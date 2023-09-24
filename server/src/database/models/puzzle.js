'use strict'
const { Model } = require('sequelize')
const ShortUniqueId = require('short-unique-id')
const uid = new ShortUniqueId()

module.exports = (sequelize, DataTypes) => {
  class Puzzle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Day, {
        foreignKey: 'dayId',
      })
    }
  }
  Puzzle.init(
    {
      dayId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Days',
          key: 'id',
        },
      },
      board: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      contextId: {
        type: DataTypes.STRING,
        defaultValue: uid.rnd(),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Puzzle',
    },
  )
  return Puzzle
}
