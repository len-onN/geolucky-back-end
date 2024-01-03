// src/seeders/[timestamp]-users.js

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        full_name: 'Leonardo',
        email: 'leo@test.com',
        password: 'secretpassword',
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        full_name: 'JEduardo',
        email: 'edu@test.com',
        password: '123pass',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        full_name: 'duardo',
        email: 'edua@testa.com',
        password: '123pass2',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        full_name: 'JEsduardo',
        email: 'edus@test2.com',
        password: '123pass34',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        full_name: 'Aduardo',
        email: 'edua@test.com',
        password: '1s23pass',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};