const request = require('supertest');
const { sequelize } = require('../config/database');
const Student = require('../models/Student');

// Mock do app Express
const express = require('express');
const studentRoutes = require('../routes/studentRoutes');

const app = express();
app.use(express.json());
app.use('/api/students', studentRoutes);

describe('Student Controller', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await Student.destroy({ where: {} });
  });

  describe('POST /api/students', () => {
    it('should create a new student with valid data', async () => {
      const studentData = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        ra: '20240001',
        cpf: '123.456.789-00'
      };

      const response = await request(app)
        .post('/api/students')
        .send(studentData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(studentData.name);
      expect(response.body.data.email).toBe(studentData.email);
      expect(response.body.data.ra).toBe(studentData.ra);
    });

    it('should return error when creating student with duplicate RA', async () => {
      const studentData = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        ra: '20240001',
        cpf: '123.456.789-00'
      };

      // Primeira criação
      await request(app)
        .post('/api/students')
        .send(studentData);

      // Tentativa de duplicação
      const response = await request(app)
        .post('/api/students')
        .send(studentData)
        .expect(500);

      expect(response.body.success).toBe(false);
    });

    it('should return validation error for invalid email', async () => {
      const invalidStudentData = {
        name: 'João Silva',
        email: 'email-invalido',
        ra: '20240002',
        cpf: '123.456.789-00'
      };

      const response = await request(app)
        .post('/api/students')
        .send(invalidStudentData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('GET /api/students', () => {
    it('should return empty array when no students exist', async () => {
      const response = await request(app)
        .get('/api/students')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });

    it('should return all students', async () => {
      // Criar alunos de teste
      await Student.bulkCreate([
        {
          name: 'Aluno 1',
          email: 'aluno1@email.com',
          ra: '20240001',
          cpf: '111.222.333-44'
        },
        {
          name: 'Aluno 2',
          email: 'aluno2@email.com',
          ra: '20240002',
          cpf: '222.333.444-55'
        }
      ]);

      const response = await request(app)
        .get('/api/students')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(2);
      expect(response.body.count).toBe(2);
    });
  });

  describe('PUT /api/students/:id', () => {
    it('should update student name and email', async () => {
      const student = await Student.create({
        name: 'Aluno Original',
        email: 'original@email.com',
        ra: '20240003',
        cpf: '333.444.555-66'
      });

      const updateData = {
        name: 'Aluno Atualizado',
        email: 'atualizado@email.com'
      };

      const response = await request(app)
        .put(`/api/students/${student.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.email).toBe(updateData.email);
    });
  });

  describe('DELETE /api/students/:id', () => {
    it('should delete an existing student', async () => {
      const student = await Student.create({
        name: 'Aluno para Deletar',
        email: 'deletar@email.com',
        ra: '20240004',
        cpf: '444.555.666-77'
      });

      await request(app)
        .delete(`/api/students/${student.id}`)
        .expect(204);

      // Verificar se foi realmente deletado
      const deletedStudent = await Student.findByPk(student.id);
      expect(deletedStudent).toBeNull();
    });
  });
});