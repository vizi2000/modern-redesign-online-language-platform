import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Award, 
  Calendar,
  CheckCircle,
  Play,
  Download,
  MessageCircle,
  Globe,
  Target,
  TrendingUp,
  FileText,
  Headphones,
  Video,
  PenTool,
  ArrowRight,
  Heart,
  Zap
} from 'lucide-react'

const CoursePage = ({ language, flag, color = 'blue' }) => {
  const [selectedLevel, setSelectedLevel] = useState('B1')

  const courseData = {
    'Angielski': {
      description: 'Najbardziej popularny język świata - klucz do międzynarodowej kariery i podróży',
      whyLearn: [
        'Język biznesu i technologii',
        'Dostęp do 60% zawartości internetu',
        'Wymagany w większości ofert pracy',
        'Ułatwia naukę innych języków'
      ],
      countries: ['Wielka Brytania', 'USA', 'Kanada', 'Australia', 'Nowa Zelandia'],
      speakers: '1.5 miliarda ludzi',
      difficulty: 'Średni',
      businessUse: '95%'
    },
    'Francuski': {
      description: 'Język miłości i dyplomacji - otwiera drzwi do kultury, biznesu i organizacji międzynarodowych',
      whyLearn: [
        'Język organizacji międzynarodowych (ONZ, UE)',
        'Drugi język w Kanadzie',
        'Używany w 29 krajach',
        'Język kultury i sztuki'
      ],
      countries: ['Francja', 'Kanada', 'Belgia', 'Szwajcaria', 'Luksemburg'],
      speakers: '280 milionów ludzi',
      difficulty: 'Średni',
      businessUse: '75%'
    },
    'Niemiecki': {
      description: 'Język największej gospodarki Europy - idealny dla biznesu, nauki i technologii',
      whyLearn: [
        'Największa gospodarka w Europie',
        'Język nauki i technologii',
        'Wysokie zarobki w krajach niemieckojęzycznych',
        'Łatwiejszy dla Polaków niż angielski'
      ],
      countries: ['Niemcy', 'Austria', 'Szwajcaria', 'Luksemburg', 'Liechtenstein'],
      speakers: '130 milionów ludzi',
      difficulty: 'Średni-trudny',
      businessUse: '85%'
    },
    'Hiszpański': {
      description: 'Drugi najbardziej rozpowszechniony język - otwiera drzwi do Ameryki Łacińskiej i Hiszpanii',
      whyLearn: [
        'Używany w 21 krajach',
        'Szybko rozwijające się rynki w Ameryce Łacińskiej',
        'Relatywnie łatwy do nauki',
        'Drugi język w USA'
      ],
      countries: ['Hiszpania', 'Meksyk', 'Argentyna', 'Kolumbia', 'Peru'],
      speakers: '500 milionów ludzi',
      difficulty: 'Łatwy-średni',
      businessUse: '70%'
    },
    'Włoski': {
      description: 'Język sztuki, kultury i designu - idealny dla branż kreatywnych i luksusu',
      whyLearn: [
        'Język mody i designu',
        'Kluczowy w branży kulinarnej',
        'Brama do kultury renesansu',
        'Przydatny w turystyce'
      ],
      countries: ['Włochy', 'San Marino', 'Watykan', 'części Szwajcarii'],
      speakers: '65 milionów ludzi',
      difficulty: 'Średni',
      businessUse: '60%'
    }
  }

  const levels = {
    'A1': {
      name: 'Początkujący',
      description: 'Zaczynasz od podstaw',
      duration: '2-3 miesiące',
      hours: '40-60 godzin',
      skills: [
        'Podstawowe zwroty i przedstawianie się',
        'Liczby, dni tygodnia, miesiące',
        'Zakupy i restauracja - podstawy',
        'Krótkie, proste dialogi'
      ],
      canDo: [
        'Przedstawić się i innych',
        'Zadawać podstawowe pytania o dane osobowe',
        'Rozumieć proste, powoli wypowiadane komunikaty',
        'Pisać krótkie notatki i wiadomości'
      ]
    },
    'A2': {
      name: 'Podstawowy',
      description: 'Rozwijasz umiejętności komunikacyjne',
      duration: '3-4 miesiące',
      hours: '60-80 godzin',
      skills: [
        'Czas przeszły i przyszły',
        'Opisywanie doświadczeń i planów',
        'Podróże i transport',
        'Praca i zawód'
      ],
      canDo: [
        'Opisać swoją rodzinę, środowisko i potrzeby',
        'Rozumieć główne punkty prostych tekstów',
        'Komunikować się w rutynowych sytuacjach',
        'Opisać w prostych słowach swoje doświadczenia'
      ]
    },
    'B1': {
      name: 'Średniozaawansowany',
      description: 'Osiągasz niezależność językową',
      duration: '4-5 miesięcy',
      hours: '80-100 godzin',
      skills: [
        'Złożone struktury gramatyczne',
        'Wyrażanie opinii i argumentowanie',
        'Język biznesowy - podstawy',
        'Prezentacje i public speaking'
      ],
      canDo: [
        'Radzić sobie w większości sytuacji podróżnych',
        'Opisać doświadczenia, wydarzenia, marzenia',
        'Zrozumieć główne wątki programów TV/radia',
        'Napisać prosty tekst na znane tematy'
      ]
    },
    'B2': {
      name: 'Zaawansowany',
      description: 'Swobodna komunikacja w większości sytuacji',
      duration: '5-6 miesięcy',
      hours: '100-120 godzin',
      skills: [
        'Język specjalistyczny branżowy',
        'Negocjacje i prezentacje biznesowe',
        'Analiza i krytyczne myślenie',
        'Płynne rozmowy na abstrakcyjne tematy'
      ],
      canDo: [
        'Rozumieć główne idee złożonych tekstów',
        'Komunikować się płynnie z native speakerami',
        'Wytworzyć jasny, szczegółowy tekst',
        'Wyjaśnić stanowisko w sprawie kontrowersyjnej'
      ]
    },
    'C1': {
      name: 'Biegły',
      description: 'Prawie native speaker level',
      duration: '6-8 miesięcy',
      hours: '120-150 godzin',
      skills: [
        'Subtelności językowe i idiomy',
        'Język akademicki i naukowy',
        'Literatura i kultura wysoka',
        'Perfekcyjny język biznesowy'
      ],
      canDo: [
        'Rozumieć długie, złożone teksty',
        'Wyrażać się płynnie bez szukania słów',
        'Używać języka elastycznie w celach społecznych',
        'Tworzyć przejrzyste, dobrze napisane teksty'
      ]
    },
    'C2': {
      name: 'Mistrz',
      description: 'Poziom native speakera',
      duration: '8-12 miesięcy',
      hours: '150+ godzin',
      skills: [
        'Perfekcyjna znajomość idiomów',
        'Literatura i poezja',
        'Specjalistyczny żargon branżowy',
        'Humor i gra słów'
      ],
      canDo: [
        'Zrozumieć praktycznie wszystko co słyszysz',
        'Streszczać informacje z różnych źródeł',
        'Wyrażać się spontanicznie i precyzyjnie',
        'Rozróżniać subtelne odcienie znaczeniowe'
      ]
    }
  }

  const testimonials = [
    {
      name: 'Anna Kowalska',
      level: 'A2 → B2',
      text: 'W 6 miesięcy przeszłam z podstaw do zaawansowanego poziomu. Teraz swobodnie rozmawiam z klientami zagranicznymi.',
      company: 'Marketing Manager'
    },
    {
      name: 'Michał Nowak', 
      level: 'B1 → C1',
      text: 'Dzięki Klaudii dostałem pracę w międzynarodowej korporacji. Jej metoda nauczania to strzał w dziesiątkę!',
      company: 'IT Consultant'
    },
    {
      name: 'Joanna Wiśniewska',
      level: 'A1 → B1', 
      text: 'Zaczynałam od zera, a po roku mogę prowadzić prezentacje w pracy. Polecam każdemu!',
      company: 'Project Manager'
    }
  ]

  const info = courseData[language] || courseData['Angielski']

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-8xl">{flag}</span>
            <div>
              <h1 className="text-5xl font-bold text-slate-800 mb-2">
                Kurs języka {language.toLowerCase()}
              </h1>
              <p className="text-xl text-slate-600">
                {info.description}
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50">
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800">{info.speakers}</div>
                <div className="text-slate-600 text-sm">na świecie</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800">{info.difficulty}</div>
                <div className="text-slate-600 text-sm">poziom trudności</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800">{info.businessUse}</div>
                <div className="text-slate-600 text-sm">w biznesie</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800">2-12 mies.</div>
                <div className="text-slate-600 text-sm">czas nauki</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Learn This Language */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Dlaczego warto uczyć się {language.toLowerCase()}?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Kluczowe korzyści</h3>
                <ul className="space-y-3">
                  {info.whyLearn.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Gdzie się przyda</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Główne kraje:</h4>
                    <p className="text-slate-600">{info.countries.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Branże:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">IT & Tech</Badge>
                      <Badge variant="secondary">Biznes</Badge>
                      <Badge variant="secondary">Turystyka</Badge>
                      <Badge variant="secondary">Medycyna</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Level Selection */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Wybierz swój poziom
          </h2>
          
          {/* Level Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.keys(levels).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedLevel === level
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                }`}
              >
                {level} - {levels[level].name}
              </button>
            ))}
          </div>
          
          {/* Selected Level Details */}
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{selectedLevel}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">{levels[selectedLevel].name}</h3>
                      <p className="text-slate-600">{levels[selectedLevel].description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600 mb-2" />
                      <div className="font-semibold text-slate-800">{levels[selectedLevel].duration}</div>
                      <div className="text-slate-600 text-sm">czas nauki</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <BookOpen className="w-6 h-6 text-green-600 mb-2" />
                      <div className="font-semibold text-slate-800">{levels[selectedLevel].hours}</div>
                      <div className="text-slate-600 text-sm">lekcji</div>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 mb-3">Czego się nauczysz:</h4>
                  <ul className="space-y-2">
                    {levels[selectedLevel].skills.map((skill, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">Po ukończeniu będziesz mógł/mogła:</h4>
                  <ul className="space-y-2 mb-6">
                    {levels[selectedLevel].canDo.map((ability, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm">{ability}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg text-white">
                    <h4 className="font-bold mb-2">Cena kursu {selectedLevel}:</h4>
                    <div className="text-3xl font-bold mb-2">199 zł</div>
                    <div className="text-blue-100 text-sm mb-4">za lekcję 60 min</div>
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                      <Calendar className="w-4 h-4 mr-2" />
                      Zarezerwuj lekcję próbną
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Jak się uczymy?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Headphones className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">Słuchanie</h3>
                <p className="text-slate-600 text-sm">Prawdziwe nagrania, podcasty, filmy</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">Mówienie</h3>
                <p className="text-slate-600 text-sm">Konwersacje, prezentacje, symulacje</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">Czytanie</h3>
                <p className="text-slate-600 text-sm">Artykuły, książki, dokumenty biznesowe</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <PenTool className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">Pisanie</h3>
                <p className="text-slate-600 text-sm">Emaile, raporty, creative writing</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Historie sukcesów uczniów
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className="bg-green-100 text-green-800">{testimonial.level}</Badge>
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <p className="text-slate-700 italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Gotowy na pierwszą lekcję {language.toLowerCase()}?
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

export default CoursePage