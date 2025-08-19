
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Auth Routes', () => {
  it('should register a user', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
  });

  it('should login a user', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });
});
