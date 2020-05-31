const request = require('supertest');
const server = require('../../src/server');
const faker = require('faker');

describe('Students', () => {
  it('should be able create new student', async () => {
    const response = await request(server).post('/students').send({
      name: faker.name.findName(),
      email: faker.internet.email(),
      cpf: '10020030040',
    });

    expect(response.status).toBe(201);
  });
});
