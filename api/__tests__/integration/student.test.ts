import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import StudentRepository from '../../src/repositories/studentRepository';

let repository: StudentRepository;

beforeAll(async () => {
  await connection.create();
  repository = getCustomRepository(StudentRepository);
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.truncate();
});

describe('Create student tests', () => {
  it('should be able to register a student', async () => {
    const result = await request(app)
      .post('/students')
      .send({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        ra: faker.random.number(),
        cpf: '14972418044',
      });

    expect(result.status).toBe(201);
  });

  it('should not be able to register a student with an existing "ra"', async () => {
    const ra = faker.random.number();
    const student = repository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      ra: ra,
      cpf: '88913964007',
    } as any);
    await repository.save(student);

    const result = await request(app)
      .post('/students')
      .send({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        ra: ra,
        cpf: '14972418044',
      });

    expect(result.status).toBe(422);
    expect(result.body.errors).toContainEqual(
      expect.objectContaining({
        input: 'ra',
        errors: ['Já existe um aluno cadastrado com o RA informado'],
      })
    );
  });

  it('should not be able to register a student with invalid data', async () => {
    const result = await request(app)
      .post('/students')
      .send({
        name: faker.helpers.repeatString('full name', 12),
        cpf: '123',
        ra: 'ddd',
        email: 'email',
      });

    expect(result.status).toBe(422);
    expect(result.body.errors).not.toBeUndefined();
    expect(result.body.errors).not.toBeNull();
  });

  it('should not be able to register a student with an invalid CPF', async () => {
    const result = await request(app).post('/students').send({
      name: faker.name.firstName(),
      cpf: '12345678910',
      ra: faker.random.number(),
      email: faker.internet.email(),
    });

    expect(result.status).toBe(422);
    expect(result.body.errors).toContainEqual(
      expect.objectContaining({ input: 'cpf', errors: ['cpf inválido'] })
    );
  });
});
