import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Mail, 
  CheckCircle, 
  Gift, 
  BookOpen, 
  Users, 
  Star,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Zap
} from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const benefits = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Tygodniowe porady',
      description: 'Praktyczne wskazówki do nauki języków'
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: 'Ekskluzywne materiały',
      description: 'Dodatkowe zasoby tylko dla subskrybentów'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Pierwsze informacje',
      description: 'O nowych kursach i promocjach'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Społeczność',
      description: 'Dostęp do grupy uczących się'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.includes('@')) return

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Track newsletter signup
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: 'main_newsletter',
        value: 1
      })
    }

    setIsSubscribed(true)
    setIsLoading(false)
  }

  if (isSubscribed) {
    return (
      <section id="newsletter" className="py-16 px-4 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Dziękujemy za subskrypcję! 🎉
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Sprawdź swoją skrzynkę email - wysłaliśmy Ci email powitalny z pierwszymi wskazówkami!
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">Co otrzymasz w ciągu 24 godzin:</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Przewodnik "5 błędów w nauce języków"</li>
                  <li>• Dostęp do ekskluzywnej grupy na Facebooku</li>
                  <li>• Plan nauki na pierwsze 30 dni</li>
                </ul>
              </div>
              <Button 
                onClick={() => document.getElementById('rezerwacja')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3"
              >
                Umów bezpłatną lekcję próbną
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="newsletter" className="py-16 px-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="flex items-center mb-4">
              <Sparkles className="w-8 h-8 mr-3 text-yellow-300" />
              <Badge className="bg-yellow-500 text-yellow-900 font-semibold">
                Dołącz do 2,500+ uczniów
              </Badge>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ucz się języków
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                skuteczniej
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Dołącz do naszego newslettera i otrzymuj cotygodniowe porady, 
              materiały do nauki oraz pierwsze informacje o nowych kursach!
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-blue-100 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full border-2 border-white flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>
                <span className="ml-3 text-blue-100 text-sm">2,500+ subskrybentów</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-300 mr-1" />
                <span className="text-blue-100 text-sm">4.9/5 ocena zadowolenia</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div>
            <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Zapisz się za darmo!
                  </h3>
                  <p className="text-slate-600">
                    Już w tym tygodniu otrzymasz pierwszy email z poradami
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Twój adres email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="np. anna@example.com"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Zapisuję...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Zapisz się do newslettera
                      </>
                    )}
                  </Button>
                </form>

                {/* Trust Signals */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Bez spamu
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      1x w tygodniu
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Wypisz się kiedy chcesz
                    </div>
                  </div>
                </div>

                {/* Bonus Offer */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Gift className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 text-sm">Bonus za zapisanie się!</h4>
                      <p className="text-yellow-700 text-xs mt-1">
                        Otrzymasz darmowy przewodnik "5 błędów w nauce języków" (wartość 49 zł)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter