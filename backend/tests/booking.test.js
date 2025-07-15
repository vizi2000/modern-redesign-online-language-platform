const request = require('supertest');
const app = require('../src/index.js');

jest.mock('@prisma/client', () => {
  const mPrisma = {
    lessonBooking: {
      create: jest.fn(async ({ data }) => ({ id: 1, ...data }))
    }
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe('Booking route', () => {
  it('creates booking with auth', async () => {
    const token = 'Bearer ' + require('jsonwebtoken').sign({ userId: 1 }, 'secret');
    const res = await request(app)
      .post('/bookings')
      .set('Authorization', token)
      .send({ studentId: 1, tutorId: 1, time: new Date().toISOString() });
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });
});
