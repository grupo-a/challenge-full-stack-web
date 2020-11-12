import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import StudentRepository from '../../src/repositories/studentRepository';
import Student from '../../src/models/student';

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

describe('Update student tests', () => {
  let student: Student;
  beforeEach(async () => {
    student = await repository.save({
      name: 'João',
      email: 'joao@email.com',
      ra: '123456',
      cpf: '87130702079',
    });
  });

  it('should be able to update a student with valid data', async () => {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const email = faker.internet.email();

    const result = await request(app).put(`/students/${student.id}`).send({
      name,
      email,
    });

    const updatedStudent = await repository.findOne({
      where: {
        id: student.id,
      },
    });

    expect(result.status).toBe(200);
    expect(updatedStudent).toEqual({
      name,
      email,
      ra: student.ra,
      cpf: student.cpf,
      id: student.id,
    });
  });

  it('should not be able to update a students cpf and "ra"', async () => {
    const result = await request(app).put(`/students/${student.id}`).send({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      cpf: '64908893071',
      ra: faker.random.number(),
    });

    const updatedStudent = await repository.findOne({
      where: {
        id: student.id,
      },
    });

    expect(updatedStudent).toEqual(
      expect.objectContaining({
        cpf: student.cpf,
        ra: student.ra,
      })
    );
  });

  it('should not be able to update a student with invalid data', async () => {
    const result = await request(app)
      .put(`/students/${student.id}`)
      .send({
        name: faker.helpers.repeatString('invalid length name', 6),
        email: 'badEmail',
      });

    expect(result.status).toBe(422);
    expect(result.body.errors).toContainEqual(
      expect.objectContaining({
        input: 'name',
      })
    );
    expect(result.body.errors).toContainEqual(
      expect.objectContaining({
        input: 'email',
      })
    );
  });
});

describe('List student tests', () => {
  beforeEach(async () => {
    for (let i = 0; i < 3; i++) {
      await repository.save({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        cpf: `${faker.random.number()}`,
        ra: `${faker.random.number()}`,
      });
    }
  });

  it('should be able to list registered students', async () => {
    const result = await request(app).get('/students');

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(3);
  });

  it('should be able to list students filtered by name', async () => {
    for (let i = 0; i < 3; i++) {
      await repository.save({
        name: i < 2 ? `Igor ${i}` : faker.name.firstName(),
        email: faker.internet.email(),
        cpf: `${faker.random.number()}`,
        ra: `${faker.random.number()}`,
      });
    }

    const result = await request(app).get('/students').query({
      search: 'igor',
    });

    expect(result.body.length).toBe(2);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Igor 0',
        }),
        expect.objectContaining({
          name: 'Igor 1',
        }),
      ])
    );
  });
});
