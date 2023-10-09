'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Leaderboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Day, {
        foreignKey: 'dayId',
      })
      this.hasMany(models.LeaderboardEntry, {
        foreignKey: 'leaderboardId',
      })
    }
  }
  Leaderboard.init(
    {
      dayId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Days',
          key: 'id',
        },
      },
      context: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Leaderboard',
    },
  )
  return Leaderboard
}
