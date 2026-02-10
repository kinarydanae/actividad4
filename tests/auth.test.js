const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// MOCK CONTROLLERS
const authController = {
  register: (req, res) => res.status(201).json({ msg: 'Usuario registrado' }),
  login: (req, res) => res.status(200).json({ token: 'fake-jwt-token' })
};

// RUTAS
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

describe('Auth Endpoints (mocked)', () => {
  const user = { email: 'testuser@example.com', password: '123456' };

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toBe('Usuario registrado');
  });

  it('should login the user and return token', async () => {
    const res = await request(app).post('/api/auth/login').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});