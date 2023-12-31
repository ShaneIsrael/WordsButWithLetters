'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PuzzleSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Day, {
        foreignKey: 'dayId',
      })
      this.belongsTo(models.Puzzle, {
        foreignKey: 'puzzleId',
      })
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      })
      this.belongsTo(models.CasualUser, {
        foreignKey: 'casualUserId',
      })
    }
  }
  PuzzleSubmission.init(
    {
      dayId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Days',
          key: 'id',
        },
      },
      puzzleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Puzzles',
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
      activeRow: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      bonusLetters: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      bonusWordFound: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      timeToComplete: {
        type: DataTypes.INTEGER,
      },
      puzzleComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      wordScores: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      word0: { type: DataTypes.STRING },
      word1: { type: DataTypes.STRING },
      word2: { type: DataTypes.STRING },
      word3: { type: DataTypes.STRING },
      word4: { type: DataTypes.STRING },
      word5: { type: DataTypes.STRING },
      bonusWord: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'PuzzleSubmission',
    },
  )
  return PuzzleSubmission
}
