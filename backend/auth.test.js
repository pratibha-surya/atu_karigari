
import request from 'supertest';
import app from '../server';  // Import your Express app

describe('Auth Routes', () => {
  it('should signup a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });
});
