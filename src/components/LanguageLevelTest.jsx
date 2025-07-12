import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, XCircle, Clock, Trophy, ArrowRight, RotateCcw, BookOpen } from 'lucide-react'

const LanguageLevelTest = () => {
  const [currentLanguage, setCurrentLanguage] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const languages = [
    { code: 'en', name: 'Angielski', flag: '🇬🇧' },
    { code: 'fr', name: 'Francuski', flag: '🇫🇷' },
    { code: 'de', name: 'Niemiecki', flag: '🇩🇪' },
    { code: 'es', name: 'Hiszpański', flag: '🇪🇸' },
    { code: 'it', name: 'Włoski', flag: '🇮🇹' }
  ]

  const questions = {
    en: [
      {
        id: 1,
        level: 'A1',
        question: 'Complete: "My name _____ John."',
        options: ['is', 'are', 'am', 'be'],
        correct: 0,
        points: 1
      },
      {
        id: 2,
        level: 'A1',
        question: 'Choose the correct plural: "One book, two _____"',
        options: ['book', 'books', 'bookes', 'bookies'],
        correct: 1,
        points: 1
      },
      {
        id: 3,
        level: 'A2',
        question: 'Complete: "I _____ to the cinema yesterday."',
        options: ['go', 'went', 'going', 'goed'],
        correct: 1,
        points: 2
      },
      {
        id: 4,
        level: 'A2',
        question: 'Which is correct?',
        options: ['He don\'t like coffee', 'He doesn\'t like coffee', 'He no like coffee', 'He not like coffee'],
        correct: 1,
        points: 2
      },
      {
        id: 5,
        level: 'B1',
        question: 'Complete: "If it rains tomorrow, I _____ stay home."',
        options: ['will', 'would', 'am', 'can'],
        correct: 0,
        points: 3
      },
      {
        id: 6,
        level: 'B1',
        question: 'Choose the best option: "I have been _____ English for three years."',
        options: ['study', 'studied', 'studying', 'studies'],
        correct: 2,
        points: 3
      },
      {
        id: 7,
        level: 'B2',
        question: 'Complete: "I wish I _____ more time to read."',
        options: ['have', 'had', 'will have', 'having'],
        correct: 1,
        points: 4
      },
      {
        id: 8,
        level: 'B2',
        question: 'Which sentence is grammatically correct?',
        options: [
          'The meeting has been postponed until next week.',
          'The meeting has postponed until next week.',
          'The meeting was postponed until next week.',
          'Both A and C are correct.'
        ],
        correct: 3,
        points: 4
      },
      {
        id: 9,
        level: 'C1',
        question: 'Complete: "_____ the weather, we decided to go hiking."',
        options: ['Despite', 'Although', 'Even though', 'Regardless of'],
        correct: 0,
        points: 5
      },
      {
        id: 10,
        level: 'C1',
        question: 'Choose the most sophisticated expression:',
        options: [
          'The project was very hard.',
          'The project posed significant challenges.',
          'The project was difficult.',
          'The project was tough.'
        ],
        correct: 1,
        points: 5
      }
    ],
    fr: [
      {
        id: 1,
        level: 'A1',
        question: 'Complétez: "Je _____ français."',
        options: ['suis', 'es', 'est', 'sommes'],
        correct: 0,
        points: 1
      },
      {
        id: 2,
        level: 'A1',
        question: 'Quel est le pluriel de "chat"?',
        options: ['chat', 'chats', 'chates', 'chattes'],
        correct: 1,
        points: 1
      },
      {
        id: 3,
        level: 'A2',
        question: 'Complétez: "Hier, j\'_____ au cinéma."',
        options: ['va', 'suis allé', 'vais', 'irai'],
        correct: 1,
        points: 2
      },
      {
        id: 4,
        level: 'B1',
        question: 'Complétez: "Si j\'avais de l\'argent, j\'_____ une voiture."',
        options: ['achète', 'achèterai', 'achèterais', 'ai acheté'],
        correct: 2,
        points: 3
      },
      {
        id: 5,
        level: 'C1',
        question: 'Quelle phrase est la plus soutenue?',
        options: [
          'Il faut qu\'on y aille.',
          'Il convient que nous nous y rendions.',
          'On doit y aller.',
          'Il faut partir là-bas.'
        ],
        correct: 1,
        points: 5
      }
    ]
  }

  const calculateResult = () => {
    const totalPoints = answers.reduce((sum, answer) => sum + answer.points, 0)
    const maxPoints = questions[currentLanguage]?.reduce((sum, q) => sum + q.points, 0) || 30
    const percentage = (totalPoints / maxPoints) * 100

    if (percentage >= 90) return { level: 'C2', name: 'Biegły', description: 'Doskonała znajomość języka' }
    if (percentage >= 80) return { level: 'C1', name: 'Zaawansowany', description: 'Bardzo dobra znajomość języka' }
    if (percentage >= 70) return { level: 'B2', name: 'Średniozaawansowany wyższy', description: 'Dobra znajomość języka' }
    if (percentage >= 60) return { level: 'B1', name: 'Średniozaawansowany', description: 'Podstawowa znajomość języka' }
    if (percentage >= 40) return { level: 'A2', name: 'Podstawowy', description: 'Elementarna znajomość języka' }
    return { level: 'A1', name: 'Początkujący', description: 'Minimalna znajomość języka' }
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const question = questions[currentLanguage][currentQuestion]
    const isCorrect = selectedAnswer === question.correct
    
    setAnswers(prev => [...prev, {
      questionId: question.id,
      selected: selectedAnswer,
      correct: question.correct,
      isCorrect,
      points: isCorrect ? question.points : 0
    }])

    if (currentQuestion < questions[currentLanguage].length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
    } else {
      setTestCompleted(true)
    }
  }

  const startTest = (language) => {
    setCurrentLanguage(language)
    setTestStarted(true)
    setCurrentQuestion(0)
    setAnswers([])
    setTestCompleted(false)
    setSelectedAnswer(null)
    setTimeLeft(300)
  }

  const resetTest = () => {
    setTestStarted(false)
    setTestCompleted(false)
    setCurrentLanguage('')
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setTimeLeft(300)
  }

  const currentQuestions = questions[currentLanguage] || []
  const result = testCompleted ? calculateResult() : null

  // Language Selection Screen
  if (!testStarted) {
    return (
      <section id="test-poziomowania" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Test poziomu języka
            </h2>
            <p className="text-xl text-slate-600 mb-6">
              Sprawdź swój poziom znajomości języka w 5 minut
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                5 minut
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                10 pytań
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Certyfikat CEFR
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language) => (
              <Card 
                key={language.code}
                className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => startTest(language.code)}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{language.flag}</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {language.name}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Test poziomu A1-C2
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    Rozpocznij test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-slate-200/50">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Jak działa test?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
              <div>
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mb-2 mx-auto">1</div>
                <p className="text-center">Wybierz język i rozpocznij 5-minutowy test</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mb-2 mx-auto">2</div>
                <p className="text-center">Odpowiedz na 10 pytań różnej trudności</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mb-2 mx-auto">3</div>
                <p className="text-center">Otrzymaj wynik i rekomendacje kursów</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Test Results Screen
  if (testCompleted && result) {
    const languageName = languages.find(l => l.code === currentLanguage)?.name || 'język'
    const correctAnswers = answers.filter(a => a.isCorrect).length
    const totalQuestions = currentQuestions.length

    return (
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Gratulacje! Test zakończony
            </h2>
            <p className="text-xl text-slate-600">
              Twój poziom języka {languageName.toLowerCase()}
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-2xl mb-8">
            <CardContent className="p-8 text-center">
              <Badge className="text-3xl px-6 py-3 mb-4 bg-gradient-to-r from-blue-500 to-indigo-600">
                {result.level}
              </Badge>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {result.name}
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                {result.description}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {correctAnswers}/{totalQuestions}
                  </div>
                  <div className="text-sm text-slate-600">Poprawne odpowiedzi</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((correctAnswers/totalQuestions)*100)}%
                  </div>
                  <div className="text-sm text-slate-600">Wynik procentowy</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {answers.reduce((sum, a) => sum + a.points, 0)}
                  </div>
                  <div className="text-sm text-slate-600">Punktów zdobytych</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-xl mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Rekomendowane kursy dla Ciebie
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2">Kurs indywidualny</h4>
                  <p className="text-sm text-blue-600 mb-3">
                    Dostosowany do Twojego poziomu {result.level}
                  </p>
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => document.getElementById('cennik')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Zobacz cennik
                  </Button>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-bold text-green-800 mb-2">Bezpłatna konsultacja</h4>
                  <p className="text-sm text-green-600 mb-3">
                    Omówimy Twoje cele i plan nauki
                  </p>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Umów konsultację
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-xl mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Szczegółowe wyniki
              </h3>
              <div className="space-y-3">
                {answers.map((answer, index) => {
                  const question = currentQuestions[index]
                  return (
                    <div key={question.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      {answer.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <div className="flex-1">
                        <Badge variant="outline" className="mr-2">{question.level}</Badge>
                        <span className="text-sm text-slate-600">
                          Pytanie {index + 1}: {answer.points} pkt
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={resetTest}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 mr-4"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Spróbuj ponownie
            </Button>
            <Button 
              onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Skontaktuj się z nami
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // Test Questions Screen
  const question = currentQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">
              Pytanie {currentQuestion + 1} z {currentQuestions.length}
            </span>
            <span className="text-sm text-slate-600">
              <Clock className="w-4 h-4 inline mr-1" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-xl">
          <CardContent className="p-8">
            <div className="mb-6">
              <Badge className="mb-4">{question?.level}</Badge>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                {question?.question}
              </h3>
            </div>

            <div className="space-y-3 mb-8">
              {question?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-medium mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={resetTest}
                className="border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Anuluj test
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50"
              >
                {currentQuestion < currentQuestions.length - 1 ? (
                  <>
                    Następne pytanie
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  'Zakończ test'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default LanguageLevelTest