const request = require('supertest');
const { sequelize } = require('../config/database');
const User = require('../models/User');

const express = require('express');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Controller', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      await User.create({
        username: 'admin_teste',
        email: 'test@email.com',
        password_hash: 'hash_dummy',
        full_name: 'Usuário Teste',
        is_active: true
      });

      const credentials = {
        username: 'admin_teste',
        password: 'admin123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.username).toBe(credentials.username);
    });

    it('should reject invalid credentials', async () => {
      const credentials = {
        username: 'usuario_inexistente',
        password: 'senha_errada'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Credenciais inválidas');
    });
  });
});