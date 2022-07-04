'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Students', [
      {
				name: 'Lucas',
				email: 'lucas@gmail.com',
				ra: '1111111',
				cpf: '222222',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Fulano',
				email: 'fulano@gmail.com',
				ra: '3333333',
				cpf: '444444',
				createdAt: new Date(),
				updatedAt: new Date()
			}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};