import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import CoursePage from './CoursePage.jsx'
import { 
  ArrowLeft,
  BookOpen,
  Globe,
  Users,
  Clock,
  Star,
  TrendingUp,
  Award
} from 'lucide-react'

const AllCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  
  console.log('AllCourses component rendering')

  const courses = [
    {
      name: 'Angielski',
      flag: '🇬🇧',
      color: 'blue',
      popularity: 95,
      difficulty: 'Średni',
      businessUse: '95%',
      speakers: '1.5 mld',
      description: 'Język międzynarodowej komunikacji, biznesu i technologii',
      highlights: [
        'Najważniejszy język w biznesie',
        'Dostęp do 60% zawartości internetu',
        'Wymagany w większości ofert pracy',
        'Ułatwia naukę innych języków'
      ]
    },
    {
      name: 'Francuski',
      flag: '🇫🇷',
      color: 'purple',
      popularity: 75,
      difficulty: 'Średni',
      businessUse: '75%',
      speakers: '280 mln',
      description: 'Język dyplomacji, kultury i organizacji międzynarodowych',
      highlights: [
        'Język ONZ i organizacji międzynarodowych',
        'Drugi język w Kanadzie',
        'Używany w 29 krajach świata',
        'Język kultury i sztuki'
      ]
    },
    {
      name: 'Niemiecki',
      flag: '🇩🇪',
      color: 'yellow',
      popularity: 85,
      difficulty: 'Średni-trudny',
      businessUse: '85%',
      speakers: '130 mln',
      description: 'Język największej gospodarki Europy i innowacji technologicznych',
      highlights: [
        'Największa gospodarka w Europie',
        'Język nauki i technologii',
        'Wysokie zarobki w DACH',
        'Łatwiejszy dla Polaków'
      ]
    },
    {
      name: 'Hiszpański',
      flag: '🇪🇸',
      color: 'red',
      popularity: 70,
      difficulty: 'Łatwy-średni',
      businessUse: '70%',
      speakers: '500 mln',
      description: 'Drugi najpopularniejszy język świata z dynamicznym wzrostem',
      highlights: [
        'Używany w 21 krajach',
        'Szybko rozwijające się rynki',
        'Relatywnie łatwy do nauki',
        'Drugi język w USA'
      ]
    },
    {
      name: 'Włoski',
      flag: '🇮🇹',
      color: 'green',
      popularity: 60,
      difficulty: 'Średni',
      businessUse: '60%',
      speakers: '65 mln',
      description: 'Język sztuki, designu, mody i wysokiej kultury',
      highlights: [
        'Język mody i designu',
        'Kluczowy w gastronomii',
        'Brama do kultury renesansu',
        'Przydatny w turystyce luksusowej'
      ]
    }
  ]

  if (selectedCourse) {
    return (
      <div>
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-20 z-40 py-4">
          <div className="container mx-auto px-4">
            <Button
              onClick={() => setSelectedCourse(null)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Powrót do wszystkich kursów</span>
            </Button>
          </div>
        </div>
        <CoursePage {...selectedCourse} />
      </div>
    )
  }

  return (
    <section id="courses" className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Nasze kursy językowe
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Wybierz język, który otworzy przed Tobą nowe możliwości. Każdy kurs prowadzony 
            jest indywidualnie, dostosowany do Twoich celów i tempa nauki.
          </p>
          
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-slate-600">Języków</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">6</div>
              <div className="text-slate-600">Poziomów</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-slate-600">Uczniów</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-lg p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-slate-600">Satysfakcji</div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {courses.map((course, index) => (
            <Card 
              key={course.name}
              className="group bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
              onClick={() => setSelectedCourse(course)}
            >
              <CardContent className="p-0">
                {/* Header with Flag */}
                <div className={`bg-gradient-to-r ${
                  course.color === 'blue' ? 'from-blue-500 to-indigo-600' :
                  course.color === 'purple' ? 'from-purple-500 to-pink-600' :
                  course.color === 'yellow' ? 'from-yellow-500 to-orange-600' :
                  course.color === 'red' ? 'from-red-500 to-pink-600' :
                  'from-green-500 to-emerald-600'
                } p-8 text-white text-center relative overflow-hidden`}>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 text-6xl">{course.flag}</div>
                    <div className="absolute bottom-4 right-4 text-6xl opacity-50">{course.flag}</div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-7xl mb-4">{course.flag}</div>
                    <h2 className="text-3xl font-bold mb-2">{course.name}</h2>
                    <p className="text-white/90">{course.description}</p>
                  </div>
                  
                  {/* Popularity Badge */}
                  <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/30">
                    {course.popularity}% popularności
                  </Badge>
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
                        <TrendingUp className="w-4 h-4 text-slate-600 mr-1" />
                        <span className="font-semibold text-slate-800">{course.difficulty}</span>
                      </div>
                      <div className="text-slate-600 text-xs">trudność</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Kluczowe korzyści:</h4>
                    <ul className="space-y-1">
                      {course.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Business Usage */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">Wykorzystanie w biznesie</span>
                      <span className="text-sm font-bold text-slate-800">{course.businessUse}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          course.color === 'blue' ? 'from-blue-500 to-indigo-600' :
                          course.color === 'purple' ? 'from-purple-500 to-pink-600' :
                          course.color === 'yellow' ? 'from-yellow-500 to-orange-600' :
                          course.color === 'red' ? 'from-red-500 to-pink-600' :
                          'from-green-500 to-emerald-600'
                        }`}
                        style={{ width: course.businessUse }}
                      ></div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className={`w-full bg-gradient-to-r ${
                    course.color === 'blue' ? 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' :
                    course.color === 'purple' ? 'from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700' :
                    course.color === 'yellow' ? 'from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700' :
                    course.color === 'red' ? 'from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' :
                    'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  } text-white transform transition-all duration-300 group-hover:scale-105`}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Zobacz szczegóły kursu
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Porównanie kursów
          </h2>
          
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-800">Język</th>
                    <th className="text-center p-4 font-semibold text-slate-800">Użytkownicy</th>
                    <th className="text-center p-4 font-semibold text-slate-800">Trudność</th>
                    <th className="text-center p-4 font-semibold text-slate-800">Biznes</th>
                    <th className="text-center p-4 font-semibold text-slate-800">Popularność</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course.name} className="border-t border-slate-200 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{course.flag}</span>
                          <span className="font-medium text-slate-800">{course.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center text-slate-700">{course.speakers}</td>
                      <td className="p-4 text-center">
                        <Badge variant="secondary" className={
                          course.difficulty.includes('Łatwy') ? 'bg-green-100 text-green-800' :
                          course.difficulty.includes('trudny') ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {course.difficulty}
                        </Badge>
                      </td>
                      <td className="p-4 text-center font-semibold text-slate-800">{course.businessUse}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(course.popularity / 20) 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-slate-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
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
                <Clock className="w-5 h-5 mr-2" />
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

export default AllCourses