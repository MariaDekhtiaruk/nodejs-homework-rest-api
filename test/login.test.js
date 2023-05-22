const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your Express app is exported from app.js

const { DB_HOST_TEST, PORT } = process.env;

describe('Login Endpoint', () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST_TEST)
      .then(() => console.log('DB connected!'))
      .catch((error) => {
        console.error(error);
      });
  });

  afterAll(async () => {
    await mongoose
      .disconnect(DB_HOST_TEST)
      .then(() => console.log('DB disconnected!'))
      .catch((error) => {
        console.error(error);
      });
  });

  it('simple test', () => {
    expect(5).toBe(5);
  });

  it('should return a user response with status 200', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'Maria2@mail.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
      token: expect.any(String),
    });
  });
});
