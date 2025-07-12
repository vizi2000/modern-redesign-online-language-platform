import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import Chatbot from '@/components/Chatbot.jsx'
import { 
  Globe, 
  Clock, 
  MessageCircle, 
  User, 
  Star, 
  Play, 
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Heart,
  Zap
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const languages = [
    { name: 'Angielski', flag: '🇬🇧', level: 'Wszystkie poziomy', price: '199 zł' },
    { name: 'Francuski', flag: '🇫🇷', level: 'Wszystkie poziomy', price: '199 zł' },
    { name: 'Niemiecki', flag: '🇩🇪', level: 'Wszystkie poziomy', price: '199 zł' },
    { name: 'Hiszpański', flag: '🇪🇸', level: 'Wszystkie poziomy', price: '199 zł' },
    { name: 'Włoski', flag: '🇮🇹', level: 'Wszystkie poziomy', price: '199 zł' }
  ]

  const testimonials = [
    {
      name: 'Andrii Borovskyi',
      text: 'Pani Klaudia Komisarek, jako nauczycielka języków obcych, już przy pierwszym spotkaniu sprawia, że nauka języka zamienia się w o wiele łatwiejszą ścieżkę. Luźna atmosfera i duża wiedza w zakresie metod nauczania sprawia, że z lekcji wynika czysta satysfakcja.',
      rating: 5
    },
    {
      name: 'J. Ziemba',
      text: 'Klaudia Komisarek prowadzi zajęcia indywidualne dla kadry zarządzającej w spółce Unterer OCW Sp z o.o. od marca 2024 roku. Zajęcia są organizowane w sposób przemyślany i przynoszą wymierne korzyści wpływające na rozwój biznesowy naszej spółki.',
      rating: 5
    },
    {
      name: 'Mikołaj Dudek',
      text: 'Pani Klaudia Komisarek naucza języków obcych, a w moim przypadku prowadzi zdalne lekcje języka francuskiego. Z całą pewnością mogę stwierdzić, że jest rzetelną i profesjonalną nauczycielką, która popiera umiejętności wiedzą zdobytą poprzez studia.',
      rating: 5
    }
  ]

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Bez stresu',
      description: 'Luźna atmosfera, własne tempo nauki'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Online 24/7',
      description: 'Nauka kiedy chcesz, gdzie chcesz'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Praktyczna komunikacja',
      description: 'Skupiamy się na mówieniu'
    },
    {
      icon: <User className="w-8 h-8" />,
      title: 'Indywidualne podejście',
      description: 'Każdy uczeń jest wyjątkowy'
    }
  ]

  const stats = [
    { number: '500+', label: 'Uczniów' },
    { number: '5+', label: 'Języków' },
    { number: '98%', label: 'Satysfakcji' },
    { number: '3', label: 'Lata doświadczenia' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50"></div>
        
        {/* Floating Words Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="relative w-full h-full">
            {/* Row 1 - Top */}
            <div className="absolute top-16 left-12 text-blue-300/40 text-lg font-medium animate-fade-in-out transform rotate-12" style={{animationDelay: '0s', animationDuration: '8s'}}>Hello</div>
            <div className="absolute top-24 right-20 text-indigo-300/40 text-xl font-semibold animate-fade-in-out transform -rotate-6" style={{animationDelay: '1s', animationDuration: '9s'}}>Bonjour</div>
            <div className="absolute top-32 left-1/3 text-slate-400/50 text-lg font-medium animate-fade-in-out transform rotate-3" style={{animationDelay: '2s', animationDuration: '10s'}}>Hola</div>
            <div className="absolute top-20 right-1/4 text-blue-400/40 text-base font-light animate-fade-in-out transform -rotate-12" style={{animationDelay: '3s', animationDuration: '7s'}}>Ciao</div>
            
            {/* Row 2 - Middle High */}
            <div className="absolute top-48 left-16 text-indigo-400/45 text-xl font-bold animate-fade-in-out transform rotate-8" style={{animationDelay: '4s', animationDuration: '11s'}}>Guten Tag</div>
            <div className="absolute top-56 right-32 text-slate-500/40 text-lg font-medium animate-fade-in-out transform -rotate-3" style={{animationDelay: '5s', animationDuration: '8s'}}>Learning</div>
            <div className="absolute top-44 left-2/3 text-blue-300/35 text-base font-light animate-fade-in-out transform rotate-15" style={{animationDelay: '6s', animationDuration: '9s'}}>Apprendre</div>
            
            {/* Row 3 - Middle */}
            <div className="absolute top-1/2 left-8 text-indigo-300/50 text-2xl font-bold animate-fade-in-out transform -rotate-8" style={{animationDelay: '7s', animationDuration: '10s'}}>Lernen</div>
            <div className="absolute top-1/2 right-16 text-slate-400/45 text-lg font-semibold animate-fade-in-out transform rotate-6" style={{animationDelay: '8s', animationDuration: '12s'}}>Imparare</div>
            <div className="absolute top-1/2 left-1/2 text-blue-400/40 text-xl font-medium animate-fade-in-out transform -rotate-4" style={{animationDelay: '9s', animationDuration: '8s'}}>Aprender</div>
            
            {/* Row 4 - Middle Low */}
            <div className="absolute bottom-1/3 left-20 text-indigo-400/40 text-lg font-bold animate-fade-in-out transform rotate-10" style={{animationDelay: '10s', animationDuration: '9s'}}>Knowledge</div>
            <div className="absolute bottom-1/3 right-24 text-slate-500/45 text-base font-medium animate-fade-in-out transform -rotate-7" style={{animationDelay: '11s', animationDuration: '10s'}}>Savoir</div>
            <div className="absolute bottom-1/3 left-1/3 text-blue-300/40 text-xl font-semibold animate-fade-in-out transform rotate-5" style={{animationDelay: '12s', animationDuration: '8s'}}>Wisdom</div>
            
            {/* Row 5 - Bottom */}
            <div className="absolute bottom-24 left-12 text-indigo-300/45 text-lg font-medium animate-fade-in-out transform -rotate-9" style={{animationDelay: '13s', animationDuration: '11s'}}>Education</div>
            <div className="absolute bottom-32 right-20 text-slate-400/50 text-base font-light animate-fade-in-out transform rotate-12" style={{animationDelay: '14s', animationDuration: '9s'}}>Educación</div>
            <div className="absolute bottom-28 left-2/3 text-blue-400/35 text-xl font-bold animate-fade-in-out transform -rotate-6" style={{animationDelay: '15s', animationDuration: '10s'}}>Éducation</div>
            <div className="absolute bottom-20 right-1/3 text-indigo-400/40 text-lg font-semibold animate-fade-in-out transform rotate-8" style={{animationDelay: '16s', animationDuration: '8s'}}>Bildung</div>
            
            {/* Additional scattered words */}
            <div className="absolute top-3/4 left-8 text-slate-500/35 text-base font-light animate-fade-in-out transform rotate-3" style={{animationDelay: '17s', animationDuration: '12s'}}>Study</div>
            <div className="absolute top-1/4 right-8 text-blue-300/40 text-lg font-medium animate-fade-in-out transform -rotate-10" style={{animationDelay: '18s', animationDuration: '9s'}}>Étudier</div>
            <div className="absolute bottom-1/2 left-1/4 text-indigo-300/45 text-xl font-bold animate-fade-in-out transform rotate-7" style={{animationDelay: '19s', animationDuration: '10s'}}>Studieren</div>
          </div>
        </div>
        
        {/* Liquid Glass Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-slate-200/20 to-blue-200/20 rounded-full blur-xl animate-float-slow" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-indigo-200/15 to-slate-200/15 rounded-full blur-xl animate-float-slow" style={{animationDelay: '6s'}}></div>
      </div>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200/50' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">
                Akademia Poliglotki
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Strona główna</a>
              <div className="relative group">
                <a href="#courses" className="text-slate-700 hover:text-blue-600 transition-colors flex items-center font-medium">
                  Kursy <ChevronDown className="w-4 h-4 ml-1" />
                </a>
              </div>
              <a href="#about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">O nas</a>
              <a href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Opinie</a>
              <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Kontakt</a>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌐</span>
              </div>
              <Button className="bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm">
                Rozpocznij naukę
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200/50">
              <nav className="flex flex-col space-y-4 pt-4">
                <a href="#home" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Strona główna</a>
                <a href="#courses" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Kursy</a>
                <a href="#about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">O nas</a>
                <a href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Opinie</a>
                <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Kontakt</a>
                <Button className="bg-gradient-to-r from-slate-700 to-blue-600 text-white w-full">
                  Rozpocznij naukę
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Naucz się języka
                  </span>
                  <br />
                  <span className="text-slate-800">tak, jak lubisz</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Online, wygodnie, bez stresu - z kubkiem kawy, z laptopem w domu, 
                  bez presji, ale z realnymi efektami.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl backdrop-blur-sm">
                  Zacznij za darmo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm">
                  <Play className="w-5 h-5 mr-2" />
                  Zobacz jak to działa
                </Button>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-medium">Ponad 500 zadowolonych uczniów</span>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10">
                {/* Liquid Glass Globe Effect */}
                <div className="w-80 h-80 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200/30 to-blue-200/30 rounded-full blur-sm animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-md animate-ping opacity-40"></div>
                  <div className="absolute inset-8 bg-gradient-to-r from-slate-400/80 to-blue-500/80 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl">
                    <Globe className="w-32 h-32 text-white animate-spin" style={{ animationDuration: '20s' }} />
                  </div>
                  
                  {/* Floating Flags */}
                  <div className="absolute top-4 left-4 text-3xl animate-bounce opacity-70" style={{ animationDelay: '0s' }}>🇬🇧</div>
                  <div className="absolute top-8 right-8 text-3xl animate-bounce opacity-70" style={{ animationDelay: '0.5s' }}>🇫🇷</div>
                  <div className="absolute bottom-12 left-8 text-3xl animate-bounce opacity-70" style={{ animationDelay: '1s' }}>🇩🇪</div>
                  <div className="absolute bottom-8 right-4 text-3xl animate-bounce opacity-70" style={{ animationDelay: '1.5s' }}>🇪🇸</div>
                  <div className="absolute top-1/2 left-0 text-3xl animate-bounce opacity-70" style={{ animationDelay: '2s' }}>🇮🇹</div>
                </div>
              </div>

              {/* Liquid Glass Elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-r from-slate-300/60 to-blue-400/60 rounded-2xl flex items-center justify-center animate-float backdrop-blur-md border border-white/30 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-r from-blue-300/60 to-indigo-400/60 rounded-2xl flex items-center justify-center animate-float backdrop-blur-md border border-white/30 shadow-lg" style={{ animationDelay: '1s' }}>
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-xl bg-white/80 backdrop-blur-xl text-slate-800 overflow-hidden relative border border-slate-200/50">
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full border border-slate-200/50">
                      <div className="text-slate-600">{feature.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white/60 backdrop-blur-xl relative z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-800">
                Uczymy języków <span className="bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">inaczej</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                W Akademii Poliglotki uczymy języków inaczej niż w szkole – bez stresu, 
                bez sztywnych reguł, za to z pasją i skutecznością. Nasz zespół to doświadczeni 
                lektorzy, którzy naprawdę kochają to, co robią.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Skupiamy się na tym, co naprawdę się przydaje – przede wszystkim na swobodnym 
                mówieniu i praktycznej komunikacji. Tworzymy atmosferę, w której nauka języka 
                staje się przyjemnością, a nie obowiązkiem.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="w-full h-32 bg-gradient-to-br from-slate-200/60 to-blue-200/60 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30">
                    <Users className="w-12 h-12 text-slate-600" />
                  </div>
                  <div className="w-full h-40 bg-gradient-to-br from-blue-200/60 to-indigo-200/60 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30">
                    <MessageCircle className="w-16 h-16 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="w-full h-40 bg-gradient-to-br from-indigo-200/60 to-slate-200/60 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30">
                    <Globe className="w-16 h-16 text-indigo-600" />
                  </div>
                  <div className="w-full h-32 bg-gradient-to-br from-slate-200/60 to-blue-200/60 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30">
                    <Award className="w-12 h-12 text-slate-600" />
                  </div>
                </div>
              </div>

              {/* Floating Quote */}
              <div className="absolute -top-4 -right-4 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl max-w-xs border border-slate-200/50">
                <p className="text-sm text-slate-600 italic">
                  "Nauka języka staje się przyjemnością, a nie obowiązkiem"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nasze kursy językowe</h2>
            <p className="text-xl text-gray-600">Wybierz język, który chcesz opanować</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {languages.map((language, index) => (
              <Card key={index} className="group hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{language.flag}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{language.name}</h3>
                  <Badge variant="secondary" className="mb-4">{language.level}</Badge>
                  <div className="text-2xl font-bold text-orange-600 mb-4">{language.price}</div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300">
                    Wybierz kurs
                  </Button>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Co mówią nasi uczniowie</h2>
            <p className="text-xl text-gray-300">Prawdziwe opinie od prawdziwych ludzi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-200 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">Uczeń Akademii Poliglotki</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Gotowy na pierwszą lekcję?</h2>
          <p className="text-xl mb-8 opacity-90">Dołącz do setek zadowolonych uczniów już dziś</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              <Zap className="w-5 h-5 mr-2" />
              Pierwsza lekcja gratis
            </Button>
            <div className="text-white/90">
              <span className="font-semibold">Gwarancja:</span> Bez zobowiązań, bez ukrytych kosztów
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Akademia Poliglotki</span>
              </div>
              <p className="text-gray-400">Języki obce online, wygodnie, bez stresu</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Oferta językowa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Język angielski</li>
                <li>Język francuski</li>
                <li>Język niemiecki</li>
                <li>Język hiszpański</li>
                <li>Język włoski</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Przejdź do</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Strona główna</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">O nas</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Kursy</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Opinie</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Kontakt</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Kontakt</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 kontakt@akademiapoliglotki.pl</p>
                <p>📱 +48 123 456 789</p>
                <p>🌐 www.akademiapoliglotki.pl</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Akademia Poliglotki. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
      
      {/* AI Chatbot */}
      <Chatbot />
    </div>
  )
}

export default App

