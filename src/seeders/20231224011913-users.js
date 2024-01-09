// src/seeders/[timestamp]-users.js

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        full_name: 'Leonardo',
        email: 'leo@test.com',
        is_confirmed: true,
        password: 'secretpassword',
        token: '122132',
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        full_name: 'JEduardo',
        email: 'edu@test.com',
        is_confirmed: true,
        password: '123pass',
        token: '1223342',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        full_name: 'duardo',
        email: 'edua@testa.com',
        is_confirmed: true,
        password: '123pass2',
        token: '122322',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        full_name: 'JEsduardo',
        email: 'edus@test2.com',
        is_confirmed: true,
        password: '123pass34',
        token: '12232',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        full_name: 'Aduardo',
        email: 'edua@test.com',
        is_confirmed: true,
        password: '1s23pass',
        is_confirmed: true,
        token: '122321223',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};