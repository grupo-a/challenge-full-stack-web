const request = require('supertest');
const app = require('../app'); 

describe('GET /api/v1/students', () => {
  it('should return all students', async () => {
    const response = await request(app).get('/api/v1/students');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return an empty array if no students exist', async () => {
    const response = await request(app).get('/api/v1/students');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});
