const { Model } = require('sequelize')
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class CasualUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.PuzzleSubmission, {
        foreignKey: 'casualUserId',
      })
      this.hasMany(models.LeaderboardEntry, {
        foreignKey: 'casualUserId',
      })
    }
  }
  CasualUser.init(
    {
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      iphash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'CasualUser',
    },
  )
  return CasualUser
}
