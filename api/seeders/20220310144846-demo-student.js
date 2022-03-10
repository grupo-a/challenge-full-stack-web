'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Students', [
      {
        name: 'Estudante A',
        email: 'a@email.com',
        cpf: '12345678912',
        createdAt: new Date(),
			  updatedAt: new Date()
      },
      {
        name: 'Estudante B',
        email: 'b@email.com',
        cpf: '12345678913',
        createdAt: new Date(),
			  updatedAt: new Date()
      },
      {
        name: 'Estudante C',
        email: 'c@email.com',
        cpf: '12345678914',
        createdAt: new Date(),
			  updatedAt: new Date()
      },
      {
        name: 'Estudante D',
        email: 'd@email.com',
        cpf: '12345678915',
        createdAt: new Date(),
			  updatedAt: new Date()
      },
      {
        name: 'Estudante E',
        email: 'e@email.com',
        cpf: '12345678919',
        createdAt: new Date(),
			  updatedAt: new Date()
      }
  ], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Students', null, {});
  }
};
