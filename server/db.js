import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const db = new Database(path.join(__dirname, 'matching.db'))

// Create tables
db.exec(`
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  current_level TEXT,
  target_level TEXT,
  learning_preferences TEXT,
  availability TEXT,
  personality_traits TEXT,
  learning_goals TEXT,
  budget_min REAL,
  budget_max REAL
);
CREATE TABLE IF NOT EXISTS tutors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  teaching_levels TEXT,
  teaching_methods TEXT,
  availability TEXT,
  teaching_personality TEXT,
  specializations TEXT,
  hourly_rate REAL
);
`)


const tutorCount = db.prepare('SELECT COUNT(*) AS count FROM tutors').get().count
if (tutorCount === 0) {
  const insert = db.prepare(`INSERT INTO tutors (name, teaching_levels, teaching_methods, availability, teaching_personality, specializations, hourly_rate) VALUES (@name,@teaching_levels,@teaching_methods,@availability,@teaching_personality,@specializations,@hourly_rate)`)
  const tutors = [
    {
      name: 'Anna Kowalska',
      teaching_levels: JSON.stringify(['A1','A2','B1']),
      teaching_methods: JSON.stringify(['visual','grammar']),
      availability: JSON.stringify(['Mon 18','Wed 18','Fri 16']),
      teaching_personality: JSON.stringify(['patient','friendly']),
      specializations: JSON.stringify(['travel','business']),
      hourly_rate: 80
    },
    {
      name: 'Piotr Nowak',
      teaching_levels: JSON.stringify(['B1','B2','C1']),
      teaching_methods: JSON.stringify(['audio','conversation']),
      availability: JSON.stringify(['Tue 17','Thu 19']),
      teaching_personality: JSON.stringify(['energetic','motivational']),
      specializations: JSON.stringify(['exam','business']),
      hourly_rate: 90
    },
    {
      name: 'Maria Wiśniewska',
      teaching_levels: JSON.stringify(['A2','B1','B2']),
      teaching_methods: JSON.stringify(['conversation','games']),
      availability: JSON.stringify(['Mon 9','Wed 9','Fri 9']),
      teaching_personality: JSON.stringify(['calm','friendly']),
      specializations: JSON.stringify(['kids','travel']),
      hourly_rate: 70
    }
  ]
  tutors.forEach(t => insert.run(t))
}

export { db }
