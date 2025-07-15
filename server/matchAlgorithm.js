export class SmartMatchingAlgorithm {
  constructor() {
    this.weightFactors = {
      skill_compatibility: 0.25,
      learning_style_match: 0.20,
      schedule_compatibility: 0.20,
      personality_fit: 0.15,
      goal_alignment: 0.10,
      price_preference: 0.10
    }
  }

  calculateMatchScore(student, tutor) {
    const scores = {}
    scores.skill = this.assessSkillMatch(
      student.current_level,
      student.target_level,
      tutor.teaching_levels,
      tutor.specializations
    )
    scores.style = this.learningStyleCompatibility(
      student.learning_preferences,
      tutor.teaching_methods
    )
    scores.schedule = this.scheduleOverlap(
      student.availability,
      tutor.availability
    )
    scores.personality = this.personalityCompatibility(
      student.personality_traits,
      tutor.teaching_personality
    )
    scores.goals = this.goalSpecializationMatch(
      student.learning_goals,
      tutor.specializations
    )
    scores.price = this.priceCompatibility(
      student.budget_range,
      tutor.hourly_rate
    )
    const finalScore = Object.keys(scores).reduce((acc, key) => {
      const wkey = {
        skill: 'skill_compatibility',
        style: 'learning_style_match',
        schedule: 'schedule_compatibility',
        personality: 'personality_fit',
        goals: 'goal_alignment',
        price: 'price_preference'
      }[key]
      return acc + scores[key] * this.weightFactors[wkey]
    }, 0)
    return [finalScore, scores]
  }

  assessSkillMatch(current, target, tutorLevels, tutorSpecs) {
    const hasTarget = tutorLevels.includes(target)
    const hasCurrent = tutorLevels.includes(current)
    if (hasTarget) return 1
    if (hasCurrent) return 0.7
    return 0.4
  }

  learningStyleCompatibility(studentPrefs, tutorMethods) {
    return this.jaccard(studentPrefs, tutorMethods)
  }

  scheduleOverlap(studentAvail, tutorAvail) {
    return this.jaccard(studentAvail, tutorAvail)
  }

  personalityCompatibility(studentTraits, tutorTraits) {
    return this.jaccard(studentTraits, tutorTraits)
  }

  goalSpecializationMatch(goals, specs) {
    return this.jaccard(goals, specs)
  }

  priceCompatibility(budget, rate) {
    if (!budget) return 0.5
    if (rate >= budget.min && rate <= budget.max) return 1
    if (rate <= budget.max * 1.2) return 0.7
    return 0.2
  }

  jaccard(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || b.length === 0) return 0
    const setA = new Set(a)
    const setB = new Set(b)
    const intersection = [...setA].filter(x => setB.has(x)).length
    const union = new Set([...a, ...b]).size
    return intersection / union
  }
}

export class RealtimeMatchingEngine {
  constructor(db) {
    this.db = db
    this.algorithm = new SmartMatchingAlgorithm()
  }

  getStudentProfile(id) {
    const row = this.db.prepare('SELECT * FROM students WHERE id = ?').get(id)
    return row ? this.parseStudent(row) : null
  }

  getAvailableTutors() {
    const rows = this.db.prepare('SELECT * FROM tutors').all()
    return rows.map(r => this.parseTutor(r))
  }

  parseStudent(row) {
    return {
      id: row.id,
      name: row.name,
      current_level: row.current_level,
      target_level: row.target_level,
      learning_preferences: JSON.parse(row.learning_preferences || '[]'),
      availability: JSON.parse(row.availability || '[]'),
      personality_traits: JSON.parse(row.personality_traits || '[]'),
      learning_goals: JSON.parse(row.learning_goals || '[]'),
      budget_range: { min: row.budget_min, max: row.budget_max }
    }
  }

  parseTutor(row) {
    return {
      id: row.id,
      name: row.name,
      teaching_levels: JSON.parse(row.teaching_levels || '[]'),
      teaching_methods: JSON.parse(row.teaching_methods || '[]'),
      availability: JSON.parse(row.availability || '[]'),
      teaching_personality: JSON.parse(row.teaching_personality || '[]'),
      specializations: JSON.parse(row.specializations || '[]'),
      hourly_rate: row.hourly_rate
    }
  }

  calculate_match_score(student, tutor) {
    return this.algorithm.calculateMatchScore(student, tutor)
  }

  predict_success_rate(student, tutor) {
    const [score] = this.calculate_match_score(student, tutor)
    return Math.min(1, 0.5 + score / 2)
  }

  estimate_progress(student, tutor) {
    const [score] = this.calculate_match_score(student, tutor)
    return score > 0.8 ? '3 miesiące' : '6 miesięcy'
  }

  findOptimalMatches(student, maxSuggestions = 5) {
    const tutors = this.getAvailableTutors()
    const matches = tutors.map(tutor => {
      const [score, breakdown] = this.calculate_match_score(student, tutor)
      return {
        tutor,
        match_score: score,
        score_breakdown: breakdown,
        estimated_success_rate: this.predict_success_rate(student, tutor),
        estimated_progress_timeline: this.estimate_progress(student, tutor)
      }
    })
    matches.sort((a, b) => b.match_score - a.match_score)
    return matches.slice(0, maxSuggestions)
  }
}
