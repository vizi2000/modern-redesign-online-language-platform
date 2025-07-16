const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('./generated/prisma');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

function generateToken(user) {
  return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const {
    email,
    password,
    role,
    currentLevel,
    targetLevel,
    learningPreferences,
    availability,
    personalityTraits,
    learningGoals,
    budgetRange,
    teachingLevels,
    specializations,
    teachingMethods,
    teachingPersonality,
    hourlyRate,
  } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, role },
    });
    if (role === 'TUTOR') {
      await prisma.tutorProfile.create({
        data: {
          userId: user.id,
          qualification: '',
          availability: availability || '',
          teachingLevels,
          specializations,
          teachingMethods,
          teachingPersonality,
          hourlyRate,
        },
      });
    } else {
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
          currentLevel,
          targetLevel,
          learningPreferences,
          availability,
          personalityTraits,
          learningGoals,
          budgetRange,
        },
      });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Tutor Profiles CRUD
app.get('/api/tutors', async (_req, res) => {
  const tutors = await prisma.tutorProfile.findMany({ include: { user: true } });
  res.json(tutors);
});

app.get('/api/tutors/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const tutor = await prisma.tutorProfile.findUnique({ where: { id }, include: { user: true } });
  if (!tutor) return res.status(404).json({ error: 'Not found' });
  res.json(tutor);
});

app.post('/api/tutors', async (req, res) => {
  const {
    userId,
    qualification,
    availability,
    teachingLevels,
    specializations,
    teachingMethods,
    teachingPersonality,
    hourlyRate,
  } = req.body;
  try {
    const tutor = await prisma.tutorProfile.create({
      data: {
        userId,
        qualification,
        availability,
        teachingLevels,
        specializations,
        teachingMethods,
        teachingPersonality,
        hourlyRate,
      },
    });
    res.json(tutor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/tutors/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    qualification,
    availability,
    teachingLevels,
    specializations,
    teachingMethods,
    teachingPersonality,
    hourlyRate,
  } = req.body;
  try {
    const tutor = await prisma.tutorProfile.update({
      where: { id },
      data: {
        qualification,
        availability,
        teachingLevels,
        specializations,
        teachingMethods,
        teachingPersonality,
        hourlyRate,
      },
    });
    res.json(tutor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/tutors/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.tutorProfile.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Booking Requests CRUD
app.get('/api/bookings', async (_req, res) => {
  const bookings = await prisma.booking.findMany({ include: { student: true, tutor: true } });
  res.json(bookings);
});

app.get('/api/bookings/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const booking = await prisma.booking.findUnique({ where: { id }, include: { student: true, tutor: true } });
  if (!booking) return res.status(404).json({ error: 'Not found' });
  res.json(booking);
});

app.post('/api/bookings', async (req, res) => {
  const { studentId, tutorId, status } = req.body;
  try {
    const booking = await prisma.booking.create({ data: { studentId, tutorId, status } });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/bookings/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  try {
    const booking = await prisma.booking.update({ where: { id }, data: { status } });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.booking.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
