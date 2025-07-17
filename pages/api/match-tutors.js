export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end('Method Not Allowed')
  }

  const { studentId } = req.query

  // For demo purposes, return static tutor matches
  const tutors = [
    { id: 1, name: 'Anna Kowalska', qualification: 'Angielski C2', score: 98 },
    { id: 2, name: 'Piotr Nowak', qualification: 'Francuski C1', score: 92 },
    { id: 3, name: 'Maria Wiśniewska', qualification: 'Hiszpański C2', score: 88 }
  ]

  res.status(200).json({ studentId, tutors })
}
