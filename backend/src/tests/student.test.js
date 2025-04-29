const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const token = jwt.sign(
  { id: 1, name: 'Test User' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

describe('GET /api/v1/students', () => {
  it('should return all students', async () => {
    const response = await request(app)
      .get('/api/v1/students')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return an empty array if no students exist', async () => {
    const response = await request(app)
      .get('/api/v1/students')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 401 if token is missing', async () => {
    const response = await request(app).get('/api/v1/students');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token não fornecido');
  });
});
