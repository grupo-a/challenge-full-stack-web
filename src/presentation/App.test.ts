import app from './App'
import supertest from 'supertest'

test('Must respond in the root route', async () => {
    const result = await supertest(app).get('/')
    expect(result.status).toBe(200)
})
