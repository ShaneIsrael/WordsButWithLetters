'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
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
        type: Sequelize.UUID,
      },
      parentId: {
        type: Sequelize.UUID,
        references: {
          model: 'Comments',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
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
