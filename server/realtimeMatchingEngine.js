class RealtimeMatchingEngine {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async find_optimal_matches(studentId, maxSuggestions = 5) {
    if (!studentId) {
      throw new Error('studentId is required');
    }

    const student = await this.prisma.studentProfile.findUnique({
      where: { id: Number(studentId) },
    });
    if (!student) {
      throw new Error('Student not found');
    }

    const tutors = await this.prisma.tutorProfile.findMany({
      include: { user: true },
    });

    const matches = tutors.map((tutor) => ({
      tutor,
      match_score: 1,
    }));

    return matches
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, maxSuggestions);
  }
}

module.exports = RealtimeMatchingEngine;
