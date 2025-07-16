-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN     "hourlyRate" INTEGER,
ADD COLUMN     "specializations" TEXT,
ADD COLUMN     "teachingLevels" TEXT,
ADD COLUMN     "teachingMethods" TEXT,
ADD COLUMN     "teachingPersonality" TEXT;

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "availability" TEXT,
ADD COLUMN     "budgetRange" TEXT,
ADD COLUMN     "currentLevel" TEXT,
ADD COLUMN     "learningGoals" TEXT,
ADD COLUMN     "learningPreferences" TEXT,
ADD COLUMN     "personalityTraits" TEXT,
ADD COLUMN     "targetLevel" TEXT;

