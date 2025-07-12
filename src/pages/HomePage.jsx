import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import AboutTeacher from '@/components/AboutTeacher.jsx'
import Newsletter from '@/components/Newsletter.jsx'
import { 
  Globe, 
  Clock, 
  MessageCircle, 
  User, 
  Star, 
  Play, 
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Heart,
  Zap,
  Gift
} from 'lucide-react'

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            {/* Animated language words */}
            <div className="absolute top-16 left-12 text-blue-300/40 text-lg font-medium animate-fade-in-out transform rotate-12" style={{animationDelay: '0s', animationDuration: '8s'}}>Hello</div>
            <div className="absolute top-24 right-20 text-indigo-300/40 text-xl font-semibold animate-fade-in-out transform -rotate-6" style={{animationDelay: '1s', animationDuration: '9s'}}>Bonjour</div>
            <div className="absolute top-32 left-1/3 text-slate-400/50 text-lg font-medium animate-fade-in-out transform rotate-3" style={{animationDelay: '2s', animationDuration: '10s'}}>Hola</div>
            <div className="absolute top-20 right-1/4 text-blue-400/40 text-base font-light animate-fade-in-out transform -rotate-12" style={{animationDelay: '3s', animationDuration: '7s'}}>Ciao</div>
            <div className="absolute top-48 left-16 text-indigo-400/45 text-xl font-bold animate-fade-in-out transform rotate-8" style={{animationDelay: '4s', animationDuration: '11s'}}>Guten Tag</div>
          </div>
        </div>
        
        {/* Liquid Glass Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-slate-200/20 to-blue-200/20 rounded-full blur-xl animate-float-slow" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-indigo-200/15 to-slate-200/15 rounded-full blur-xl animate-float-slow" style={{animationDelay: '6s'}}></div>
      </div>

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
                <Link to="/rezerwacja">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl backdrop-blur-sm">
                    Zacznij za darmo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
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

      {/* About Teacher Section */}
      <AboutTeacher />

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

      {/* Quick Access Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Odkryj wszystkie możliwości
            </h2>
            <p className="text-lg text-slate-600">
              Sprawdź nasze kursy, materiały i narzędzia do nauki języków
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Courses */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Kursy językowe</h3>
                <p className="text-slate-600 mb-4">5 języków dostępnych z różnymi poziomami zaawansowania</p>
                <Link to="/kursy">
                  <Button variant="outline" className="w-full">
                    Zobacz kursy
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Free Materials */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Darmowe materiały</h3>
                <p className="text-slate-600 mb-4">6 wartościowych materiałów do pobrania za darmo</p>
                <Link to="/materialy">
                  <Button variant="outline" className="w-full">
                    Pobierz materiały
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Blog */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Blog o językach</h3>
                <p className="text-slate-600 mb-4">Artykuły, porady i motywacja do nauki</p>
                <Link to="/blog">
                  <Button variant="outline" className="w-full">
                    Czytaj blog
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Primary CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Gotowy na pierwszą lekcję?</h2>
          <p className="text-xl mb-8 opacity-90">Dołącz do setek zadowolonych uczniów już dziś</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/rezerwacja">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <Zap className="w-5 h-5 mr-2" />
                Pierwsza lekcja gratis
              </Button>
            </Link>
            <div className="text-white/90">
              <span className="font-semibold">Gwarancja:</span> Bez zobowiązań, bez ukrytych kosztów
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}

export default HomePage