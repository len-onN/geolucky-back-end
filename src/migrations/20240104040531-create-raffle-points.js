// Arquivo de migração para create-raffle.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('raffles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      winner_point_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'points',
          key: 'id',
        },
      },
      drawn_lat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      drawn_lng: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('raffles');
  },
};
