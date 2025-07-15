# 🖥️ Backend Architecture Overview

This document summarizes the planned server stack, database schema, and key API endpoints for the Akademia Poliglotki platform. It also explains how the AI matching algorithm integrates with user profiles.

## Proposed Stack
- **Node.js** with Express for the REST API
- **PostgreSQL** as the primary database (SQLite for local development)
- **Redis** for caching and session storage
- **Nginx** reverse proxy (see `nginx.conf`)
- **Docker** containerization (see `Dockerfile`)
- Integrations with **EmailJS** and **Stripe** for communications and payments

## Database Schema
### Students
The student profile combines onboarding data and skill assessment results:
```javascript
const StudentRegistration = () => {
  const [profile, setProfile] = useState({
    personalInfo: { name: '', email: '', age: '', location: '', timezone: '' },
    learningGoals: { language: '', purpose: '', urgency: '', intensity: '' },
    availability: { daysOfWeek: [], timeSlots: [], frequency: '', duration: '' }
  });
};
```
```javascript
const StudentSkillProfile = {
  overallLevel: 'B1',
  skillBreakdown: { speaking: {}, listening: {}, reading: {}, writing: {} },
  learningStyle: { visual: 0.8, auditory: 0.6, kinesthetic: 0.4, analytical: 0.7 },
  personalityTraits: { extroversion: 0.3, openness: 0.8, conscientiousness: 0.9, patience: 0.6 }
};
```
These structures map to `students` and related tables storing personal info, goals, availability, skill metrics, and personality traits.

### Tutors
Tutor onboarding captures qualifications and availability:
```javascript
const TutorApplication = () => {
  const [tutorProfile, setTutorProfile] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '', timezone: '', photo: '', languages: [] },
    qualifications: { education: {}, certifications: {}, experience: {} },
    availability: { weeklyHours: 0, timeSlots: {}, blackoutDates: [], responseTime: '', cancellationPolicy: '' },
    teachingStyle: { approaches: [], materials: [], technologies: [], specializations: [] }
  });
};
```
A separate `tutor_ratings` table stores metrics such as overallRating and specialtyAreas.

## Key API Endpoints
| Method & Endpoint | Description |
|------------------|-------------|
| `POST /api/students` | Create student profile |
| `POST /api/tutors` | Register tutor profile |
| `GET /api/match/:studentId` | Return best tutor matches for a student |
| `POST /api/lessons` | Book lesson with a tutor |
| `POST /api/payments/checkout` | Stripe checkout session |
| `GET /api/ollama/*` | Proxy to AI chat service |

## AI Matching Integration
The matching service uses the profile data above to compute compatibility. The algorithm from `MARKETPLACE_MODEL.md` weights factors such as skill compatibility, learning style, schedule overlap, personality fit, goal alignment, and price preference:
```python
final_score = sum(
    scores[factor] * self.weight_factors[factor.replace('_', '_')]
    for factor in scores
)
```
Matches are generated in `RealtimeMatchingEngine.find_optimal_matches`, which retrieves a student's profile and scores available tutors accordingly.

Student and tutor records therefore need fields that feed directly into the scoring functions (e.g., `current_level`, `learning_preferences`, `teaching_methods`, availability, and hourly_rate). Updating these profiles triggers a new match calculation so users always receive relevant tutor suggestions.
