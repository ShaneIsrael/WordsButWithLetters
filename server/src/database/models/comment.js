'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, {
        foreignKey: 'parentId',
      })
      this.belongsTo(models.Comment, {
        foreignKey: 'parentId',
      })
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      })
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      body: DataTypes.TEXT,
      archivedBody: DataTypes.TEXT,
      type: DataTypes.STRING,
      threadId: {
        type: DataTypes.UUID,
      },
      parentId: {
        type: DataTypes.UUID,
        references: {
          model: 'Comments',
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
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  )
  return Comment
}
