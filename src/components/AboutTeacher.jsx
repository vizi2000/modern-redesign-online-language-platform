import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { 
  User, 
  GraduationCap, 
  Award, 
  Globe, 
  Calendar, 
  MessageCircle, 
  Heart,
  BookOpen,
  Users,
  Clock,
  Star,
  CheckCircle,
  Target,
  Coffee
} from 'lucide-react'

const AboutTeacher = () => {
  const qualifications = [
    {
      title: 'Magister filologii angielskiej',
      institution: 'Uniwersytet Jagielloński',
      year: '2021',
      description: 'Specjalizacja: językoznawstwo i literatura angielska'
    },
    {
      title: 'Certyfikat TEFL',
      institution: 'International TEFL Academy',
      year: '2022',
      description: 'Teaching English as a Foreign Language - 120 godzin'
    },
    {
      title: 'Cambridge CPE Certificate',
      institution: 'Cambridge English',
      year: '2020',
      description: 'Certificate of Proficiency in English (poziom C2)'
    },
    {
      title: 'Certyfikat DELF B2',
      institution: 'Alliance Française',
      year: '2019',
      description: 'Diplôme d\'études en langue française'
    }
  ]

  const specializations = [
    'Konwersacje biznesowe',
    'Przygotowanie do egzaminów',
    'Język techniczny IT',
    'Prezentacje i public speaking',
    'Pisanie formal emails',
    'Negocjacje w języku obcym'
  ]

  const teachingPhilosophy = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Bez stresu',
      description: 'Wierzę, że najlepiej uczymy się w atmosferze bez presji, gdzie błędy są naturalne i pomocne w nauce.'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Praktyka przede wszystkim',
      description: 'Skupiam się na tym, żebyś od pierwszej lekcji mówił i używał języka w praktycznych sytuacjach.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Twoje cele są najważniejsze',
      description: 'Każdy program dostosowuję do Twoich konkretnych potrzeb i celów językowych.'
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Luźna atmosfera',
      description: 'Nauka języka może być przyjemna! Często uczymy się przy kawie, z uśmiechem na twarzy.'
    }
  ]

  const achievements = [
    { number: '500+', label: 'Zadowolonych uczniów', icon: <Users className="w-8 h-8" /> },
    { number: '3000+', label: 'Przeprowadzonych lekcji', icon: <Clock className="w-8 h-8" /> },
    { number: '98%', label: 'Średnia ocena', icon: <Star className="w-8 h-8" /> },
    { number: '3', label: 'Lata doświadczenia', icon: <Calendar className="w-8 h-8" /> }
  ]

  const languages = [
    { name: 'Polski', level: 'Język ojczysty', flag: '🇵🇱' },
    { name: 'Angielski', level: 'C2 (biegły)', flag: '🇬🇧' },
    { name: 'Francuski', level: 'B2 (zaawansowany)', flag: '🇫🇷' },
    { name: 'Niemiecki', level: 'B1 (średniozaawansowany)', flag: '🇩🇪' },
    { name: 'Hiszpański', level: 'A2 (podstawowy)', flag: '🇪🇸' }
  ]

  return (
    <section id="o-nauczycielu" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Poznaj swoją nauczycielkę
          </h2>
          <p className="text-xl text-slate-600">
            Klaudia Komisarek - Pasjonatka języków obcych i skutecznej nauki
          </p>
        </div>

        {/* Main Profile Section */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Left - Photo and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl sticky top-24">
              <CardContent className="p-8 text-center">
                {/* Profile Photo */}
                <div className="w-48 h-48 mx-auto mb-6 relative">
                  {/* Professional placeholder - represents teacher profile */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20"></div>
                    <div className="absolute inset-0 backdrop-blur-sm"></div>
                    
                    {/* Content */}
                    <div className="relative text-center text-white">
                      <GraduationCap className="w-16 h-16 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-sm font-bold drop-shadow-lg">Klaudia</div>
                      <div className="text-xs font-medium drop-shadow-lg">Komisarek</div>
                      <div className="text-xs opacity-90 mt-1 drop-shadow-lg">M.A. English</div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-4 left-3 w-2 h-2 bg-white/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-white/25 rounded-full"></div>
                  </div>
                  
                  {/* Professional badge */}
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full border-2 border-white shadow-lg">
                    <Award className="w-3 h-3 inline mr-1" />
                    Certified
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Klaudia Komisarek
                </h3>
                <p className="text-slate-600 mb-4">
                  Magister filologii angielskiej
                </p>
                
                {/* Language Badges */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {languages.slice(0, 3).map((lang, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {lang.flag} {lang.name}
                    </Badge>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-slate-600">Uczniów</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-sm text-slate-600">Satysfakcji</div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-slate-700 to-blue-600 text-white">
                  Umów bezpłatną konsultację
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right - Detailed Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-800">Moja historia</h3>
                </div>
                
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Cześć! Jestem Klaudia i od ponad 3 lat pomagam ludziom odkrywać piękno języków obcych. 
                    Moja przygoda z nauczaniem rozpoczęła się podczas studiów, kiedy zrozumiałam, że największą 
                    radość sprawia mi widzenie postępów moich uczniów.
                  </p>
                  
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Ukończyłam filologię angielską na Uniwersytecie Jagiellońskim, gdzie zgłębiałam nie tylko 
                    język, ale także kulturę i literaturę krajów anglojęzycznych. To dało mi szeroką perspektywę, 
                    którą dzielę się z uczniami podczas lekcji.
                  </p>
                  
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Przez lata pracy z setkami uczniów nauczyłam się jednej rzeczy - każdy uczy się inaczej. 
                    Dlatego każdy program dostosowuję indywidualnie, łącząc nowoczesne metody nauczania z 
                    tradycyjnym podejściem, gdzie potrzeba.
                  </p>
                  
                  <p className="text-slate-600 leading-relaxed">
                    Poza nauczaniem, jestem miłośniczką podróży (zwiedziłam już 23 kraje!), literatury i dobrej 
                    kawy. Wierzę, że nauka języka to nie tylko gramatyka, ale przede wszystkim otwieranie się 
                    na nowe kultury i sposoby myślenia.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Philosophy */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Heart className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-800">Moja filozofia nauczania</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {teachingPhilosophy.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">{item.title}</h4>
                        <p className="text-slate-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Qualifications Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Wykształcenie i certyfikaty</h3>
            <p className="text-lg text-slate-600">Solidne podstawy teoretyczne i praktyczne</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {qualifications.map((qual, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 mb-1">{qual.title}</h4>
                      <p className="text-blue-600 font-medium mb-1">{qual.institution}</p>
                      <p className="text-slate-500 text-sm mb-2">{qual.year}</p>
                      <p className="text-slate-600 text-sm">{qual.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Specjalizacje</h3>
            <p className="text-lg text-slate-600">Obszary, w których szczególnie mogę Ci pomóc</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {specializations.map((spec, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-800">{spec}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Languages Proficiency */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Języki, którymi się posługuję</h3>
            <p className="text-lg text-slate-600">Moje umiejętności językowe w skali CEFR</p>
          </div>
          
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{lang.flag}</span>
                      <div>
                        <h4 className="font-semibold text-slate-800">{lang.name}</h4>
                        <p className="text-slate-600 text-sm">{lang.level}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${
                            i < (lang.level.includes('C2') ? 5 : 
                                 lang.level.includes('C1') ? 4 : 
                                 lang.level.includes('B2') ? 4 : 
                                 lang.level.includes('B1') ? 3 : 
                                 lang.level.includes('A2') ? 2 : 5) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-slate-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Stats */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Moje osiągnięcia w liczbach</h3>
            <p className="text-lg text-slate-600">Rezultaty mojej pracy z uczniami</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-700 to-blue-600 text-white shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center text-white/80">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{achievement.number}</div>
                  <div className="text-blue-100 font-medium">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Gotowa/gotowy na pierwszą lekcję?</h3>
            <p className="text-orange-100 text-lg mb-8">
              Umów się na bezpłatną konsultację, podczas której omówimy Twoje cele 
              i stworzę spersonalizowany plan nauki.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition-all">
                <Calendar className="w-5 h-5 mr-2" />
                Umów bezpłatną konsultację
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all">
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

export default AboutTeacher