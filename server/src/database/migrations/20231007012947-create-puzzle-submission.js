'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PuzzleSubmissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dayId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      puzzleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      activeRow: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      bonusLetters: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      bonusWordFound: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      timeToComplete: {
        type: Sequelize.INTEGER,
      },
      puzzleComplete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      wordScores: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      word0: { type: Sequelize.STRING },
      word1: { type: Sequelize.STRING },
      word2: { type: Sequelize.STRING },
      word3: { type: Sequelize.STRING },
      word4: { type: Sequelize.STRING },
      word5: { type: Sequelize.STRING },
      bonusWord: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PuzzleSubmissions')
  },
}
