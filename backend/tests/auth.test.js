const request = require('supertest');
const app = require('../src/index.js');

jest.mock('@prisma/client', () => {
  const mPrisma = {
    user: {
      create: jest.fn(async ({ data }) => ({ id: 1, email: data.email })),
      findUnique: jest.fn(async ({ where }) => {
        if (where.email === 'user@example.com') return { id: 1, email: where.email, password: '$2a$10$hash' };
        return null;
      })
    }
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe('Auth routes', () => {
  it('registers a user', async () => {
    const res = await request(app).post('/auth/register').send({ email: 'a@b.com', password: 'pass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('a@b.com');
  });

  it('fails login with wrong creds', async () => {
    const res = await request(app).post('/auth/login').send({ email: 'wrong', password: 'pass' });
    expect(res.statusCode).toBe(401);
  });
});
