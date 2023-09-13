'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4,
      },
      body: {
        type: Sequelize.TEXT,
      },
      archivedBody: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.STRING,
      },
      threadId: {
        type: Sequelize.UUIDV4,
      },
      parentId: {
        type: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments')
  },
}
