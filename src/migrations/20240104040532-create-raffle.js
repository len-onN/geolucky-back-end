// Arquivo de migração para create-raffle-points.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('raffle_points', {
      point_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'points',
          key: 'id',
        }
      },
      raffle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'raffles',
          key: 'id',
        }
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
    await queryInterface.dropTable('raffle_points');
  },
};
