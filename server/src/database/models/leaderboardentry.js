'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class LeaderboardEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Leaderboard, {
        foreignKey: 'leaderboardId',
      })
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      })
      this.belongsTo(models.CasualUser, {
        foreignKey: 'casualUserId',
      })
    }
  }
  LeaderboardEntry.init(
    {
      leaderboardId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Leaderboards',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      casualUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'CasualUsers',
          key: 'id',
        },
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'LeaderboardEntry',
    },
  )
  return LeaderboardEntry
}
