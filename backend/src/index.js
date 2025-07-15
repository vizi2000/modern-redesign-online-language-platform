const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'secret';

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { email, password: hashed } });
    res.json({ id: user.id, email: user.email });
  } catch (e) {
    res.status(400).json({ error: 'User exists' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id }, SECRET);
  res.json({ token });
});

app.get('/students/:id', auth, async (req, res) => {
  const student = await prisma.studentProfile.findUnique({ where: { id: Number(req.params.id) } });
  if (!student) return res.status(404).json({ error: 'Not found' });
  res.json(student);
});

app.put('/students/:id', auth, async (req, res) => {
  const data = req.body;
  const student = await prisma.studentProfile.update({ where: { id: Number(req.params.id) }, data });
  res.json(student);
});

app.get('/tutors/:id', auth, async (req, res) => {
  const tutor = await prisma.tutorProfile.findUnique({ where: { id: Number(req.params.id) } });
  if (!tutor) return res.status(404).json({ error: 'Not found' });
  res.json(tutor);
});

app.put('/tutors/:id', auth, async (req, res) => {
  const data = req.body;
  const tutor = await prisma.tutorProfile.update({ where: { id: Number(req.params.id) }, data });
  res.json(tutor);
});

app.post('/bookings', auth, async (req, res) => {
  const { studentId, tutorId, time } = req.body;
  const booking = await prisma.lessonBooking.create({ data: { studentId, tutorId, time: new Date(time) } });
  res.json(booking);
});

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Backend running on ${port}`));
}
