'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('PuzzleSubmissions', 'casualUserId', {
      type: Sequelize.INTEGER,
      after: 'userId',
      references: {
        model: 'CasualUsers',
        key: 'id',
      },
    })
    await queryInterface.changeColumn('PuzzleSubmissions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.addColumn('LeaderboardEntries', 'casualUserId', {
      type: Sequelize.INTEGER,
      after: 'userId',
      references: {
        model: 'CasualUsers',
        key: 'id',
      },
    })
    await queryInterface.changeColumn('LeaderboardEntries', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('PuzzleSubmissions', 'casualUserId')
    await queryInterface.changeColumn('PuzzleSubmissions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.removeColumn('LeaderboardEntries', 'casualUserId')
    await queryInterface.changeColumn('LeaderboardEntries', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  },
}
