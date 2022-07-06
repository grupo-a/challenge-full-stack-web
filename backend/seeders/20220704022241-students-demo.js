'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Students', [
		{
			name: 'Lucas Magalhães',
			email: 'lucasdarosa.ti@gmail.com',
			ra: '20220705',
			cpf: '03387180012',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'Fulano',
			email: 'fulano@gmail.com',
			ra: '20220705',
			cpf: '03387180013',
			createdAt: new Date(),
			updatedAt: new Date()
		}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students', null, {});
  }
};