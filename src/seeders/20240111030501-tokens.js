// src/seeders/[timestamp]-users.js

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Tokens',
    [
      {
        is_confirmed: true,
        token: '122132',
        user_id: 1,
      },
      {
        is_confirmed: true,
        token: '122131',
        user_id: 2,
      },
      {
        is_confirmed: true,
        token: '1221334',
        user_id: 3,
      },
      {
        is_confirmed: true,
        token: '1222132',
        user_id: 4,
      },
      {
        is_confirmed: true,
        token: '1242132',
        user_id: 5,
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Tokens', null, {}),
};