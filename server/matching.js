// Matching algorithm implementation based on MARKETPLACE_MODEL.md lines 314-391

class SmartMatchingAlgorithm {
  constructor() {
    this.weightFactors = {
      skill_compatibility: 0.25,
      learning_style_match: 0.20,
      schedule_compatibility: 0.20,
      personality_fit: 0.15,
      goal_alignment: 0.10,
      price_preference: 0.10
    };
  }

  // --- Helper scoring methods ---

  assess_skill_match(currentLevel, targetLevel, teachingLevels = [], specializations = []) {
    if (!currentLevel || !targetLevel) return 0;
    const hasTarget = teachingLevels.includes(targetLevel);
    const hasCurrent = teachingLevels.includes(currentLevel);
    if (hasTarget && hasCurrent) return 1;
    if (hasTarget || hasCurrent) return 0.7;
    return 0.3;
  }

  learning_style_compatibility(preferences = [], methods = []) {
    if (!Array.isArray(preferences) || !Array.isArray(methods) || preferences.length === 0) return 0;
    const overlap = preferences.filter(p => methods.includes(p)).length;
    return overlap / preferences.length;
  }

  schedule_overlap(studentAvailability = [], tutorAvailability = []) {
    if (!Array.isArray(studentAvailability) || !Array.isArray(tutorAvailability) || studentAvailability.length === 0) return 0;
    const overlap = studentAvailability.filter(t => tutorAvailability.includes(t)).length;
    return overlap / studentAvailability.length;
  }

  personality_compatibility(studentTraits = [], tutorTraits = []) {
    if (!Array.isArray(studentTraits) || !Array.isArray(tutorTraits) || studentTraits.length === 0) return 0;
    const overlap = studentTraits.filter(t => tutorTraits.includes(t)).length;
    return overlap / studentTraits.length;
  }

  goal_specialization_match(goals = [], specializations = []) {
    if (!Array.isArray(goals) || goals.length === 0) return 0;
    const overlap = goals.filter(g => specializations.includes(g)).length;
    return overlap / goals.length;
  }

  price_compatibility(budgetRange = {}, hourlyRate = 0) {
    if (!budgetRange.min || !budgetRange.max) return 0;
    if (hourlyRate >= budgetRange.min && hourlyRate <= budgetRange.max) return 1;
    const diff = hourlyRate < budgetRange.min ? budgetRange.min - hourlyRate : hourlyRate - budgetRange.max;
    const range = budgetRange.max - budgetRange.min;
    return Math.max(0, 1 - diff / range);
  }

  calculate_match_score(student, tutor) {
    const scores = {};

    scores.skill = this.assess_skill_match(
      student.current_level,
      student.target_level,
      tutor.teaching_levels,
      tutor.specializations
    );

    scores.style = this.learning_style_compatibility(
      student.learning_preferences,
      tutor.teaching_methods
    );

    scores.schedule = this.schedule_overlap(
      student.availability,
      tutor.availability
    );

    scores.personality = this.personality_compatibility(
      student.personality_traits,
      tutor.teaching_personality
    );

    scores.goals = this.goal_specialization_match(
      student.learning_goals,
      tutor.specializations
    );

    scores.price = this.price_compatibility(
      student.budget_range,
      tutor.hourly_rate
    );

    const factorMap = {
      skill: 'skill_compatibility',
      style: 'learning_style_match',
      schedule: 'schedule_compatibility',
      personality: 'personality_fit',
      goals: 'goal_alignment',
      price: 'price_preference'
    };

    let finalScore = 0;
    for (const key of Object.keys(scores)) {
      const weightKey = factorMap[key];
      finalScore += scores[key] * (this.weightFactors[weightKey] || 0);
    }

    return { finalScore, scores };
  }
}

class RealtimeMatchingEngine extends SmartMatchingAlgorithm {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async get_student_profile(studentId) {
    return this.prisma.studentProfile.findUnique({ where: { id: studentId } });
  }

  async get_available_tutors(/* preferredTimes */) {
    return this.prisma.tutorProfile.findMany();
  }

  predict_success_rate(student, tutor, matchScore) {
    return Math.min(1, Math.max(0, matchScore));
  }

  estimate_progress(student, tutor) {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const currentIndex = levels.indexOf(student.current_level);
    const targetIndex = levels.indexOf(student.target_level);
    if (currentIndex === -1 || targetIndex === -1 || targetIndex <= currentIndex) return 0;
    const months = (targetIndex - currentIndex) * 2;
    return months; // estimated months to reach goal
  }

  async find_optimal_matches(studentId, maxSuggestions = 5) {
    const student = await this.get_student_profile(studentId);
    const availableTutors = await this.get_available_tutors(student.preferred_times);

    const matches = [];
    for (const tutor of availableTutors) {
      const { finalScore, scores } = this.calculate_match_score(student, tutor);
      matches.push({
        tutor,
        match_score: finalScore,
        score_breakdown: scores,
        estimated_success_rate: this.predict_success_rate(student, tutor, finalScore),
        estimated_progress_timeline: this.estimate_progress(student, tutor)
      });
    }

    return matches
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, maxSuggestions);
  }
}

module.exports = { RealtimeMatchingEngine };

