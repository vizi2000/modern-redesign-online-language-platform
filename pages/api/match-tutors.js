import { RealtimeMatchingEngine } from '../../server/matchAlgorithm.js'
import { db } from '../../server/db.js'

const engine = new RealtimeMatchingEngine(db)

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const student = req.body
  // Persist student data
  const stmt = db.prepare(`INSERT INTO students (name, current_level, target_level, learning_preferences, availability, personality_traits, learning_goals, budget_min, budget_max) VALUES (@name, @current_level, @target_level, @learning_preferences, @availability, @personality_traits, @learning_goals, @budget_min, @budget_max)`)
  const info = stmt.run({
    name: student.name || null,
    current_level: student.current_level || '',
    target_level: student.target_level || '',
    learning_preferences: JSON.stringify(student.learning_preferences || []),
    availability: JSON.stringify(student.availability || []),
    personality_traits: JSON.stringify(student.personality_traits || []),
    learning_goals: JSON.stringify(student.learning_goals || []),
    budget_min: student.budget_range?.min || 0,
    budget_max: student.budget_range?.max || 0
  })
  student.id = info.lastInsertRowid
  const matches = engine.findOptimalMatches(student)
  res.status(200).json(matches)
}
