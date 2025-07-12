import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { 
  ArrowLeft,
  BookOpen,
  Globe,
  Users,
  Clock,
  Star,
  CheckCircle,
  Target,
  MessageCircle,
  Calendar,
  Zap
} from 'lucide-react'

const WorkingCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)

  const courses = [
    {
      name: 'Angielski',
      flag: '🇬🇧',
      color: 'from-blue-500 to-indigo-600',
      description: 'Język międzynarodowej komunikacji, biznesu i technologii',
      speakers: '1.5 mld',
      difficulty: 'Średni',
      businessUse: '95%',
      whyLearn: [
        'Język biznesu i technologii',
        'Dostęp do 60% zawartości internetu',
        'Wymagany w większości ofert pracy',
        'Ułatwia naukę innych języków'
      ]
    },
    {
      name: 'Francuski',
      flag: '🇫🇷',
      color: 'from-purple-500 to-pink-600',
      description: 'Język kultury, dyplomacji i organizacji międzynarodowych',
      speakers: '280 mln',
      difficulty: 'Średni',
      businessUse: '75%',
      whyLearn: [
        'Język organizacji międzynarodowych',
        'Drugi język w Kanadzie',
        'Używany w 29 krajach',
        'Język kultury i sztuki'
      ]
    },
    {
      name: 'Niemiecki',
      flag: '🇩🇪',
      color: 'from-orange-500 to-red-600',
      description: 'Język największej gospodarki Europy i innowacji',
      speakers: '130 mln',
      difficulty: 'Średni-trudny',
      businessUse: '85%',
      whyLearn: [
        'Największa gospodarka w Europie',
        'Język nauki i technologii',
        'Wysokie zarobki w DACH',
        'Łatwiejszy dla Polaków'
      ]
    },
    {
      name: 'Hiszpański',
      flag: '🇪🇸',
      color: 'from-red-500 to-pink-600',
      description: 'Drugi najpopularniejszy język świata',
      speakers: '500 mln',
      difficulty: 'Łatwy-średni',
      businessUse: '70%',
      whyLearn: [
        'Używany w 21 krajach',
        'Szybko rozwijające się rynki',
        'Relatywnie łatwy do nauki',
        'Drugi język w USA'
      ]
    },
    {
      name: 'Włoski',
      flag: '🇮🇹',
      color: 'from-green-500 to-emerald-600',
      description: 'Język sztuki, designu i wysokiej kultury',
      speakers: '65 mln',
      difficulty: 'Średni',
      businessUse: '60%',
      whyLearn: [
        'Język mody i designu',
        'Kluczowy w gastronomii',
        'Brama do kultury renesansu',
        'Przydatny w turystyce'
      ]
    }
  ]

  const levels = [
    { code: 'A1', name: 'Początkujący', duration: '2-3 mies.', description: 'Zaczynasz od podstaw' },
    { code: 'A2', name: 'Podstawowy', duration: '3-4 mies.', description: 'Rozwijasz komunikację' },
    { code: 'B1', name: 'Średniozaawansowany', duration: '4-5 mies.', description: 'Osiągasz niezależność' },
    { code: 'B2', name: 'Zaawansowany', duration: '5-6 mies.', description: 'Swobodna komunikacja' },
    { code: 'C1', name: 'Biegły', duration: '6-8 mies.', description: 'Prawie native level' },
    { code: 'C2', name: 'Mistrz', duration: '8-12 mies.', description: 'Native speaker level' }
  ]

  // Detailed course view
  if (selectedCourse) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back button */}
          <div className="mb-8">
            <Button
              onClick={() => setSelectedCourse(null)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Powrót do wszystkich kursów</span>
            </Button>
          </div>

          {/* Course Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-8xl">{selectedCourse.flag}</span>
              <div>
                <h1 className="text-5xl font-bold text-slate-800 mb-2">
                  Kurs języka {selectedCourse.name.toLowerCase()}
                </h1>
                <p className="text-xl text-slate-600">
                  {selectedCourse.description}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 text-center">
              <CardContent className="p-6">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800">{selectedCourse.speakers}</div>
                <div className="text-slate-600 text-sm">użytkowników na świecie</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 text-center">
              <CardContent className="p-6">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800">{selectedCourse.difficulty}</div>
                <div className="text-slate-600 text-sm">poziom trudności</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800">{selectedCourse.businessUse}</div>
                <div className="text-slate-600 text-sm">wykorzystanie w biznesie</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800">2-12 mies.</div>
                <div className="text-slate-600 text-sm">czas nauki</div>
              </CardContent>
            </Card>
          </div>

          {/* Why Learn */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Dlaczego warto uczyć się {selectedCourse.name.toLowerCase()}?
            </h2>
            
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedCourse.whyLearn.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Levels */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Poziomy zaawansowania
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level, index) => (
                <Card key={level.code} className="bg-white/80 backdrop-blur-xl border border-slate-200/50 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{level.code}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{level.name}</h3>
                        <p className="text-slate-600 text-sm">{level.duration}</p>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-4">{level.description}</p>
                    <div className="text-2xl font-bold text-blue-600 mb-2">199 zł</div>
                    <Button className={`w-full bg-gradient-to-r ${selectedCourse.color} text-white`}>
                      Wybierz poziom {level.code}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Gotowy na pierwszą lekcję {selectedCourse.name.toLowerCase()}?
              </h2>
              <p className="text-orange-100 text-lg mb-8">
                Zacznij od bezpłatnej lekcji próbnej i przekonaj się, jak szybko możesz zrobić postępy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold">
                  <Zap className="w-5 h-5 mr-2" />
                  Bezpłatna lekcja próbna
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Zadaj pytanie
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  // Course listing view
  return (
    <section id="courses" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Nasze kursy językowe
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Wybierz język, który otworzy przed Tobą nowe możliwości. Każdy kurs prowadzony 
            jest indywidualnie, dostosowany do Twoich celów i tempa nauki.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course, index) => (
            <Card 
              key={course.name}
              className="group bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
              onClick={() => setSelectedCourse(course)}
            >
              <CardContent className="p-0">
                {/* Header with Flag */}
                <div className={`bg-gradient-to-r ${course.color} p-8 text-white text-center relative overflow-hidden`}>
                  <div className="text-7xl mb-4">{course.flag}</div>
                  <h2 className="text-3xl font-bold mb-2">{course.name}</h2>
                  <p className="text-white/90">{course.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-slate-600 mr-1" />
                        <span className="font-semibold text-slate-800">{course.speakers}</span>
                      </div>
                      <div className="text-slate-600 text-xs">użytkowników</div>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="w-4 h-4 text-slate-600 mr-1" />
                        <span className="font-semibold text-slate-800">{course.difficulty}</span>
                      </div>
                      <div className="text-slate-600 text-xs">trudność</div>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Kluczowe korzyści:</h4>
                    <ul className="space-y-1">
                      {course.whyLearn.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Business Usage */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">W biznesie</span>
                      <span className="text-sm font-bold text-slate-800">{course.businessUse}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                        style={{ width: course.businessUse }}
                      ></div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 mb-4">199 zł</div>
                    <Button className={`w-full bg-gradient-to-r ${course.color} text-white transform transition-all duration-300 group-hover:scale-105`}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Zobacz szczegóły kursu
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* General CTA */}
        <Card className="bg-gradient-to-r from-slate-700 to-blue-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Nie wiesz, który język wybrać?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Umów się na bezpłatną konsultację, podczas której pomożemy Ci wybrać 
              najlepszy język dla Twoich celów i przeprowadzimy test poziomu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-slate-800 hover:bg-slate-100 px-8 py-3 text-lg font-semibold">
                <Calendar className="w-5 h-5 mr-2" />
                Bezpłatna konsultacja
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
                Test poziomu języka
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default WorkingCourses